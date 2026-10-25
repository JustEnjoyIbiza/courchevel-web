/**
 * Progressive enhancement for the short request forms: the item (restaurant,
 * experience...) and service pre-filled from the URL, the same validation as
 * the server (validateRequest) shown inline, and a JSON submit to /api/lead.
 * Without this script the form still works as a normal form post.
 */
import { track, getUtm } from './analytics';
import { validateRequest } from '../lib/lead';
import { requestCopy } from '../content/requests';
import { whatsappHref, type Locale } from '../data/business';
import type { RequestType } from '../lib/requests';

type Errors = Record<string, string>;

export function initRequestForm(form: HTMLFormElement) {
  const errors = JSON.parse(form.dataset.errors || '{}') as Errors;
  const locale = (form.dataset.locale === 'fr' ? 'fr' : 'en') as Locale;
  const type = (form.elements.namedItem('requestType') as HTMLInputElement).value as RequestType;
  const submit = form.querySelector<HTMLButtonElement>('.form-submit')!;
  const alertBox = form.querySelector<HTMLElement>('.form-alert')!;
  const setHidden = (name: string, value: string) => {
    const el = form.querySelector<HTMLInputElement>(`input[type=hidden][name="${name}"]`);
    if (el) el.value = value;
  };
  let started = false;

  const params = new URLSearchParams(location.search);
  const utm = { ...getUtm() };
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign']) if (params.get(k)) utm[k] = params.get(k)!;
  Object.entries(utm).forEach(([k, v]) => setHidden(k, v));
  setHidden('page', location.pathname + location.search);
  setHidden('referrer', document.referrer.slice(0, 300));
  setHidden('started', String(Date.now()));

  // ?item=Bagatelle from a restaurant or experience button; ?service=owners for general requests.
  const item = (params.get('item') ?? '').slice(0, 120).trim();
  const itemInput = form.querySelector<HTMLInputElement>('#rq-item');
  if (item && itemInput) itemInput.value = item;
  // ?from=Geneva%20airport&to=Courchevel from a route on the transfers page;
  // ?staying=Chalet%20Neve from "Add a private chef" on a chalet page.
  for (const name of ['from', 'to', 'staying']) {
    const value = (params.get(name) ?? '').slice(0, 80).trim();
    const input = form.querySelector<HTMLInputElement>(`#rq-${name}`);
    if (value && input && !input.value) input.value = value;
  }
  const service = params.get('service');
  if (service) setHidden('service', service.slice(0, 30));

  // The WhatsApp links on the page carry the same item.
  if (item) {
    const text = requestCopy[locale].types[type].whatsapp(item);
    document.querySelectorAll<HTMLAnchorElement>('a[data-request-whatsapp]').forEach((a) => (a.href = whatsappHref(locale, text)));
  }

  const serverError = params.get('error');
  if (serverError) showAlert(errors[serverError] ?? errors.invalid);

  // Keep the last day on or after the first.
  const date = form.querySelector<HTMLInputElement>('#rq-date');
  const dateTo = form.querySelector<HTMLInputElement>('#rq-dateTo');
  date?.addEventListener('change', () => {
    if (dateTo && date.value) dateTo.min = date.value;
  });

  form.noValidate = true;

  const values = () => {
    const data: Record<string, string> = {};
    new FormData(form).forEach((v, k) => (data[k] = String(v)));
    return data;
  };

  function setError(name: string, code: string | null) {
    const msg = form.querySelector<HTMLElement>(`#err-${name}`);
    form.querySelectorAll<HTMLInputElement>(`[name="${name}"]`).forEach((el) => (code ? el.setAttribute('aria-invalid', 'true') : el.removeAttribute('aria-invalid')));
    if (msg) {
      msg.textContent = code ? (name === 'phone' && code === 'required' ? errors.phone : name === 'consent' ? errors.consent : (errors[code] ?? errors.invalid)) : '';
      msg.hidden = !code;
    }
  }

  function showErrors(found: Errors): boolean {
    form.querySelectorAll<HTMLElement>('.field-error').forEach((el) => {
      const name = el.id.replace(/^err-/, '');
      if (!found[name]) setError(name, null);
    });
    const names = Object.keys(found);
    names.forEach((n) => setError(n, found[n]));
    const first = form.querySelector<HTMLElement>('[aria-invalid="true"]');
    first?.focus();
    return names.length === 0;
  }

  // Clear an error as soon as the field is corrected.
  const recheck = (e: Event) => {
    const el = e.target as HTMLInputElement;
    if (!el.name) return;
    const name = el.name === 'preferredContact' ? 'phone' : el.name;
    if (form.querySelector(`[name="${name}"][aria-invalid="true"]`) && !validateRequest(values()).errors[name]) setError(name, null);
  };
  form.addEventListener('input', recheck);
  form.addEventListener('change', recheck);

  form.addEventListener('input', () => {
    if (started) return;
    started = true;
    track('form_start', { form: 'request', request_type: type });
  });

  function showAlert(text: string) {
    alertBox.textContent = text;
    alertBox.classList.remove('hidden');
    alertBox.focus();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = values();
    if (!showErrors(validateRequest(data).errors)) return;

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
        track('form_submit', { form: 'request', request_type: type });
        location.assign(form.dataset.thanks || '/enquire/thanks/');
        return;
      }
      if (body.fields) {
        showErrors(body.fields);
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
