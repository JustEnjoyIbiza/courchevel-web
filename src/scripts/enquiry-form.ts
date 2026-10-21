/**
 * Progressive enhancement for the Plan my stay form: one step at a time,
 * inline errors, JSON submit to /api/lead, pre-selection from the URL.
 * Without this script the form still works as a normal form post.
 */
import { track, getUtm } from './analytics';

type Errors = Record<string, string>;

export function initEnquiryForm(form: HTMLFormElement) {
  const errors = JSON.parse(form.dataset.errors || '{}') as Errors;
  const steps = [...form.querySelectorAll<HTMLFieldSetElement>('.form-step')];
  const progress = form.querySelector<HTMLElement>('.step-progress');
  const back = form.querySelector<HTMLButtonElement>('.form-back')!;
  const next = form.querySelector<HTMLButtonElement>('.form-next')!;
  const submit = form.querySelector<HTMLButtonElement>('.form-submit')!;
  const alertBox = form.querySelector<HTMLElement>('.form-alert')!;
  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | RadioNodeList | null;
  const setHidden = (name: string, value: string) => {
    const el = form.querySelector<HTMLInputElement>(`input[type=hidden][name="${name}"]`);
    if (el) el.value = value;
  };
  let current = 0;
  let started = false;

  // Hidden context fields.
  const params = new URLSearchParams(location.search);
  const utm = { ...getUtm() };
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign']) if (params.get(k)) utm[k] = params.get(k)!;
  Object.entries(utm).forEach(([k, v]) => setHidden(k, v));
  setHidden('page', location.pathname + location.search);
  setHidden('referrer', document.referrer.slice(0, 300));
  setHidden('started', String(Date.now()));

  // Pre-select from ?service=chalets or ?experience=winter-retreat.
  const service = params.get('service');
  if (service) form.querySelectorAll<HTMLInputElement>(`input[name=services][value="${CSS.escape(service)}"]`).forEach((i) => (i.checked = true));
  const experience = params.get('experience');
  if (experience) setHidden('experience', experience.slice(0, 40));

  // Server-side errors from a no-JS post redirect (?error=...).
  const serverError = params.get('error');
  if (serverError) showAlert(errors[serverError] ?? errors.invalid);

  // Keep departure after arrival.
  const arrival = form.querySelector<HTMLInputElement>('#arrival')!;
  const departure = form.querySelector<HTMLInputElement>('#departure')!;
  arrival.addEventListener('change', () => {
    if (arrival.value) {
      const d = new Date(arrival.value);
      d.setDate(d.getDate() + 1);
      departure.min = d.toISOString().slice(0, 10);
    }
  });

  // Clear an error as soon as the field is corrected.
  const recheck = (e: Event) => {
    const el = e.target as HTMLInputElement;
    if (!el.name) return;
    const name = el.name === 'preferredContact' ? 'phone' : el.name;
    if (form.querySelector(`[name="${name}"][aria-invalid="true"]`) && !checkField(name)) setError(name, null);
  };
  form.addEventListener('input', recheck);
  form.addEventListener('change', recheck);

  form.addEventListener('input', () => {
    if (started) return;
    started = true;
    track('form_start', { form: 'plan_my_stay' });
  });

  // Switch to step mode.
  form.noValidate = true;
  show(0);

  next.addEventListener('click', () => {
    if (validateStep(current)) show(current + 1);
  });
  back.addEventListener('click', () => show(current - 1));

  function show(i: number) {
    current = Math.max(0, Math.min(steps.length - 1, i));
    steps.forEach((s, n) => {
      s.hidden = n !== current;
      s.classList.toggle('mt-14', false);
    });
    form.dataset.step = String(current + 1); // drives button visibility in global.css
    progress?.querySelectorAll<HTMLElement>('.step-progress-item').forEach((el, n) => {
      el.classList.toggle('border-ink', n <= current);
      el.classList.toggle('text-ink', n === current);
      el.classList.toggle('border-line', n > current);
    });
    if (started) {
      steps[current].querySelector('legend')?.setAttribute('tabindex', '-1');
      (steps[current].querySelector('legend') as HTMLElement | null)?.focus();
      form.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }

  function setError(name: string, code: string | null) {
    const msg = form.querySelector<HTMLElement>(`#err-${name}`);
    const inputs = form.querySelectorAll<HTMLInputElement>(`[name="${name}"]`);
    inputs.forEach((el) => (code ? el.setAttribute('aria-invalid', 'true') : el.removeAttribute('aria-invalid')));
    if (msg) {
      msg.textContent = code ? (errors[code] ?? errors.invalid) : '';
      msg.hidden = !code;
    }
  }

  function checkField(name: string): string | null {
    const el = field(name);
    if (name === 'services') return form.querySelectorAll('input[name=services]:checked').length ? null : 'services';
    if (name === 'consent') return (el as HTMLInputElement).checked ? null : 'consent';
    if (name === 'village') return (el as RadioNodeList).value ? null : 'required';
    if (name === 'phone') {
      const pref = (field('preferredContact') as RadioNodeList).value;
      const v = (el as HTMLInputElement).value.trim();
      if (!v && pref !== 'email') return 'phone';
      if (v && !/^\+?[\d\s().-]{6,24}$/.test(v)) return 'invalid';
      return null;
    }
    if (name === 'departure' && arrival.value && departure.value && departure.value <= arrival.value) return 'order';
    if (name === 'arrival' && arrival.value && arrival.value < arrival.min) return 'range';
    const input = el as HTMLInputElement;
    if (input.validity.valueMissing) return 'required';
    if (!input.validity.valid) return 'invalid';
    return null;
  }

  const stepFields: string[][] = [
    ['arrival', 'departure', 'village', 'adults', 'children'],
    ['services'],
    ['name', 'email', 'phone', 'consent'],
  ];

  function validateStep(i: number): boolean {
    let first: string | null = null;
    for (const name of stepFields[i]) {
      const code = checkField(name);
      setError(name, code);
      if (code && !first) first = name;
    }
    if (first) {
      const target = form.querySelector<HTMLElement>(`[name="${first}"]`);
      target?.focus();
      return false;
    }
    return true;
  }

  function showAlert(text: string) {
    alertBox.textContent = text;
    alertBox.classList.remove('hidden');
    alertBox.focus();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    for (let i = 0; i < steps.length; i++) {
      if (!validateStep(i)) {
        show(i);
        validateStep(i);
        return;
      }
    }

    const data: Record<string, string | string[]> = {};
    new FormData(form).forEach((value, key) => {
      if (key === 'services') (data.services = (data.services as string[]) || []).push(String(value));
      else data[key] = String(value);
    });

    const label = submit.textContent;
    submit.disabled = true;
    submit.textContent = form.dataset.sending || '…';
    alertBox.classList.add('hidden');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Errors };
      if (res.ok && body.ok) {
        track('form_submit', { form: 'plan_my_stay', services: (data.services as string[]).join(',') });
        location.assign(form.dataset.thanks || '/enquire/thanks/');
        return;
      }
      if (body.fields) {
        const names = Object.keys(body.fields);
        const stepOf = (n: string) => stepFields.findIndex((f) => f.includes(n));
        names.forEach((n) => setError(n, n === 'services' ? 'services' : n === 'consent' ? 'consent' : body.fields![n]));
        show(Math.min(...names.map(stepOf).filter((x) => x >= 0)));
        showAlert(errors.invalid);
      } else {
        showAlert(errors[body.error === 'captcha' ? 'captcha' : 'unavailable']);
      }
    } catch {
      showAlert(errors.unavailable);
    } finally {
      submit.disabled = false;
      submit.textContent = label;
    }
  });
}
