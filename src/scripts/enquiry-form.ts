/**
 * Progressive enhancement for the Plan my stay form: one step at a time,
 * inline errors, JSON submit to /api/lead, pre-selection from the URL.
 * Without this script the form still works as a normal form post.
 */
import { track, getUtm } from './analytics';
import { parsePrefill, itemMessage } from '../lib/prefill';

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
  let summaryOn = false;
  const summary = form.querySelector<HTMLElement>('.stay-summary');

  // Hidden context fields.
  const params = new URLSearchParams(location.search);
  const utm = { ...getUtm() };
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign']) if (params.get(k)) utm[k] = params.get(k)!;
  Object.entries(utm).forEach(([k, v]) => setHidden(k, v));
  setHidden('page', location.pathname + location.search);
  setHidden('referrer', document.referrer.slice(0, 300));
  setHidden('started', String(Date.now()));

  // Homepage quick-start answers (the edge function also writes these into the HTML).
  const prefill = parsePrefill(params, new Date().toISOString().slice(0, 10));
  for (const key of ['arrival', 'departure', 'adults', 'children'] as const) {
    const input = form.querySelector<HTMLInputElement>(`#${key}`);
    if (input && prefill[key]) input.value = prefill[key];
  }
  if (prefill.village) form.querySelectorAll<HTMLInputElement>(`input[name=village][value="${prefill.village}"]`).forEach((i) => (i.checked = true));
  const message = form.querySelector<HTMLTextAreaElement>('#message');
  if (prefill.item && message && !message.value) message.value = itemMessage[form.dataset.locale === 'fr' ? 'fr' : 'en'](prefill.item);

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

  function show(i: number, focus = started) {
    current = Math.max(0, Math.min(steps.length - 1, i));
    steps.forEach((s, n) => {
      s.hidden = n !== current;
      s.classList.toggle('mt-14', false);
    });
    form.dataset.step = String(current + 1); // drives button visibility in global.css
    if (current === 1 && summaryOn) renderSummary();
    progress?.querySelectorAll<HTMLElement>('.step-progress-item').forEach((el, n) => {
      el.classList.toggle('border-ink', n <= current);
      el.classList.toggle('text-ink', n === current);
      el.classList.toggle('border-line', n > current);
    });
    if (focus) {
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

  /** One line on step 2 recalling step 1: "26 Dec 2026 – 2 Jan 2027 · Courchevel 1850 · 4 adults, 2 children". */
  function renderSummary() {
    if (!summary) return;
    const words = JSON.parse(form.dataset.summary || '{}') as Record<'adults' | 'children', [string, string]>;
    const fmt = new Intl.DateTimeFormat(form.dataset.locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
    const date = (v: string) => fmt.format(new Date(`${v}T00:00:00Z`));
    const count = (name: 'adults' | 'children') => Number((field(name) as HTMLInputElement).value || 0);
    const people = (name: 'adults' | 'children') => `${count(name)} ${words[name][count(name) === 1 ? 0 : 1]}`;
    const village = form.querySelector('input[name=village]:checked')?.closest('label')?.textContent?.trim();
    const parts = [`${date(arrival.value)} – ${date(departure.value)}`, village, people('adults') + (count('children') ? `, ${people('children')}` : '')];
    summary.querySelector('.stay-summary-text')!.textContent = parts.filter(Boolean).join(' · ');
    summary.classList.replace('hidden', 'flex');
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

  // The homepage quick-start already answered step 1: open on the services,
  // with the answers recalled and a link back to change them.
  if (prefill.arrival && prefill.departure && prefill.village && stepFields[0].every((name) => !checkField(name))) {
    summaryOn = true;
    show(1);
  }
  summary?.querySelector('.stay-summary-change')?.addEventListener('click', () => show(0, true));
}
