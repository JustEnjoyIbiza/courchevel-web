/** How the transfer routes (src/content/transfers.ts) read on the page, and where each one leads. */
import type { Locale } from '../data/business';
import type { Minutes } from '../content/transfers';
import { localize } from './routes';

const tag = (locale: Locale) => (locale === 'fr' ? 'fr-FR' : 'en-GB');

/** 25 -> "25 min", 150 -> "2 h 30", 60 -> "1 h" */
const clock = (m: number) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ` ${String(m % 60).padStart(2, '0')}` : ''}`);

/** [30, 35] -> "30–35 min", [135, 165] -> "2 h 15–2 h 45", [25, 25] -> "25 min" */
export function duration([a, b]: Minutes): string {
  if (a === b) return clock(a);
  if (b < 60) return `${a}–${b} min`;
  return `${clock(a)}–${clock(b)}`;
}

/** 149 -> "149", [350, 400] -> "350–400" */
export const distance = (km: number | [number, number], locale: Locale) => {
  const n = new Intl.NumberFormat(tag(locale));
  return Array.isArray(km) ? km.map((v) => n.format(v)).join('–') : n.format(km);
};

/** The transfer request, opened with the route: to Courchevel, or from Courchevel to another resort. */
export function routeRequestHref(locale: Locale, place: string, fromCourchevel = false): string {
  const q = new URLSearchParams(fromCourchevel ? { from: 'Courchevel', to: place } : { from: place, to: 'Courchevel' });
  return `${localize('/enquire/transfer/', locale)}?${q}`;
}
