/** How a chalet's facts, price and week read on the page, in each language. */
import { chaletsCopy, type Chalet } from '../content/chalets';
import type { Locale } from '../data/business';

const tag = (locale: Locale) => (locale === 'fr' ? 'fr-FR' : 'en-GB');

/** "412 m² · 6 bedrooms · 12 guests · Ski-in, ski-out" */
export function chaletFacts(x: Chalet, locale: Locale): string {
  const c = chaletsCopy[locale];
  const n = new Intl.NumberFormat(tag(locale));
  const size = x.size === undefined ? '' : `${(Array.isArray(x.size) ? x.size : [x.size]).map((v) => n.format(v)).join('–')} m²`;
  return [size, c.bedrooms(x.bedrooms) + (x.bunkRoom ? ` + ${c.bunkRoom}` : ''), c.guests(x.guests), x.skiInOut ? c.skiInOut : '']
    .filter(Boolean)
    .join(' · ');
}

/** "€88,000" / "88 000 €" */
export const euros = (amount: number, locale: Locale) =>
  new Intl.NumberFormat(tag(locale), { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);

/** "2–9 January 2027" */
export const weekRange = (x: Chalet, locale: Locale) =>
  new Intl.DateTimeFormat(tag(locale), { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).formatRange(new Date(x.week[0]), new Date(x.week[1]));
