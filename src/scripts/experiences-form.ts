/**
 * Progressive enhancement for the short enquiry form on /experiences/.
 * Without this script the form posts to /api/lead and the function redirects to
 * the thank-you page. With it: inline validation, a sending state, an inline
 * thank-you message and clear errors, plus the experience chosen in a drawer
 * ("Enquire about this experience" links carry ?experience=<id>#enquire).
 */
import { track, getUtm } from './analytics';

type Errors = Record<string, string>;

export function initExperiencesForm(form: HTMLFormElement) {
  const errors = JSON.parse(form.dataset.errors || '{}') as Errors;
  const titles = JSON.parse(form.dataset.titles || '{}') as Record<string, string>;
  const alertBox = form.querySelector<HTMLElement>('.form-alert')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
  const success = document.getElementById(form.dataset.success || '')!;
  const chosen = form.querySelector<HTMLElement>('.chosen-experience')!;
  const set = (name: string, value: string) => {
    const el = form.elements.namedItem(name) as HTMLInputElement | null;
    if (el) el.value = value;
  };

  set('page', location.pathname);
  set('referrer', document.referrer.slice(0, 300));
  set('started', String(Date.now()));
  Object.entries(getUtm()).forEach(([k, v]) => set(k, v));

  const choose = (id: string | null) => {
    if (!id || !titles[id]) return;
    set('experience', id);
    chosen.querySelector('span')!.textContent = titles[id];
    chosen.hidden = false;
  };
  choose(new URLSearchParams(location.search).get('experience'));

  // Drawer CTAs: choose the experience, close the drawer, scroll to the form (no reload).
  document.querySelectorAll<HTMLAnchorElement>('a[data-experience]').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      choose(a.dataset.experience!);
      a.closest<HTMLElement>('[popover]')?.hidePopover();
      form.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      (form.elements.namedItem('name') as HTMLInputElement).focus({ preventScroll: true });
    }),
  );

  const arrival = form.elements.namedItem('arrival') as HTMLInputElement;
  const departure = form.elements.namedItem('departure') as HTMLInputElement;

  function check(name: string): string | null {
    const el = form.elements.namedItem(name) as HTMLInputElement;
    if (name === 'consent') return el.checked ? null : 'consent';
    if (el.validity.valueMissing) return 'required';
    if (name === 'arrival' && el.value && el.min && el.value < el.min) return 'range';
    if (name === 'departure' && arrival.value && el.value && el.value <= arrival.value) return 'order';
    if (name === 'phone' && el.value && !/^\+?[\d\s().-]{6,24}$/.test(el.value.trim())) return 'invalid';
    if (!el.validity.valid) return 'invalid';
    return null;
  }

  function show(name: string, code: string | null) {
    const el = form.elements.namedItem(name) as HTMLInputElement;
    const msg = form.querySelector<HTMLElement>(`#xp-err-${name}`);
    if (code) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
    if (msg) {
      msg.textContent = code ? errors[code] ?? errors.invalid : '';
      msg.hidden = !code;
    }
  }

  const fields = ['name', 'email', 'phone', 'arrival', 'departure', 'adults', 'consent'];
  form.addEventListener('input', (e) => {
    const name = (e.target as HTMLInputElement).name;
    if (fields.includes(name) && form.querySelector(`[name="${name}"][aria-invalid="true"]`)) show(name, check(name));
  });
  arrival.addEventListener('change', () => {
    if (arrival.value) {
      const d = new Date(arrival.value);
      d.setDate(d.getDate() + 1);
      departure.min = d.toISOString().slice(0, 10);
    }
  });

  let started = false;
  form.addEventListener('input', () => {
    if (!started) track('form_start', { form: 'experiences' });
    started = true;
  }, { once: true });

  form.noValidate = true;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let first: string | null = null;
    for (const name of fields) {
      const code = check(name);
      show(name, code);
      if (code && !first) first = name;
    }
    if (first) {
      alertBox.textContent = errors.summary;
      alertBox.hidden = false;
      (form.elements.namedItem(first) as HTMLElement).focus();
      return;
    }
    alertBox.hidden = true;

    const data: Record<string, string | string[]> = {};
    new FormData(form).forEach((v, k) => {
      if (k === 'services') (data.services = (data.services as string[]) || []).push(String(v));
      else data[k] = String(v);
    });
    if (data.phone) data.preferredContact = 'whatsapp';

    const label = submit.textContent;
    submit.disabled = true;
    submit.textContent = form.dataset.sending || '…';
    form.setAttribute('aria-busy', 'true');
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Errors };
      if (res.ok && body.ok) {
        track('form_submit', { form: 'experiences', experience: String(data.experience || '') });
        form.hidden = true;
        success.hidden = false;
        success.focus();
        return;
      }
      if (body.fields) {
        Object.entries(body.fields).forEach(([n, code]) => fields.includes(n) && show(n, n === 'consent' ? 'consent' : code));
        alertBox.textContent = errors.summary;
      } else {
        alertBox.textContent = errors[body.error === 'captcha' ? 'captcha' : 'unavailable'];
      }
      alertBox.hidden = false;
      alertBox.focus();
    } catch {
      alertBox.textContent = errors.unavailable;
      alertBox.hidden = false;
      alertBox.focus();
    } finally {
      submit.disabled = false;
      submit.textContent = label;
      form.removeAttribute('aria-busy');
    }
  });
}
