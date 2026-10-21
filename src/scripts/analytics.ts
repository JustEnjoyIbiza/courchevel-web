/**
 * Analytics, consent-first (CNIL): GA4 is loaded only after the visitor
 * accepts in the cookie banner, and only if PUBLIC_GA4_MEASUREMENT_ID is set.
 * Before consent, track() calls are dropped, nothing is stored or sent.
 *
 * Also keeps the first UTM parameters of the visit in sessionStorage (no
 * cookie, no tracking) so the enquiry form can record where a lead came from.
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = 'clc-consent';
const UTM_KEY = 'clc-utm';
const GA_ID = import.meta.env.PUBLIC_GA4_MEASUREMENT_ID as string | undefined;

export type Consent = 'granted' | 'denied' | null;

const safe = <T>(fn: () => T, fallback: T): T => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

export const getConsent = (): Consent => safe(() => localStorage.getItem(CONSENT_KEY) as Consent, null);

export function setConsent(value: 'granted' | 'denied') {
  safe(() => localStorage.setItem(CONSENT_KEY, value), undefined);
  if (value === 'granted') loadGa();
}

let loaded = false;
function loadGa() {
  if (loaded || !GA_ID || getConsent() !== 'granted') return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
}

/** GA4 event, e.g. track('whatsapp_click'). No-op without consent. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (getConsent() !== 'granted' || !window.gtag) return;
  window.gtag('event', event, { page_path: location.pathname, ...params });
}

/** First-touch UTM parameters of this visit. */
export function getUtm(): Record<string, string> {
  return safe(() => JSON.parse(sessionStorage.getItem(UTM_KEY) || '{}'), {});
}

function captureUtm() {
  const p = new URLSearchParams(location.search);
  const utm: Record<string, string> = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign']) {
    const v = p.get(k);
    if (v) utm[k] = v.slice(0, 100);
  }
  // Visits from AI assistants rarely carry UTMs; keep the referrer host instead.
  if (!utm.utm_source && document.referrer) {
    const host = safe(() => new URL(document.referrer).hostname, '');
    if (host && host !== location.hostname) utm.utm_source = host;
  }
  if (Object.keys(utm).length && !sessionStorage.getItem(UTM_KEY)) {
    safe(() => sessionStorage.setItem(UTM_KEY, JSON.stringify(utm)), undefined);
  }
}

export function initAnalytics() {
  safe(captureUtm, undefined);
  loadGa();
  // Clicks on links marked data-event="whatsapp_click" | "phone_click" | "email_click".
  document.addEventListener('click', (e) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-event]');
    if (el?.dataset.event) track(el.dataset.event);
  });
}
