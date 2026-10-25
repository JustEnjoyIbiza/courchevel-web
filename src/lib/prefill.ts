/**
 * Pre-filling the Plan my stay form from the homepage quick-start
 * (/enquire/?arrival=2026-12-26&departure=2027-01-02&village=1850&adults=4&children=2)
 * and from a hotel or chalet in a list (/enquire/?service=chalets&item=Cheval%20Blanc).
 *
 * Used twice: by the Netlify Edge Function, which writes the values into the
 * HTML so it works without JavaScript, and by the form script as a fallback.
 * Anything malformed is dropped, so only safe, valid values reach the page.
 */
import { VILLAGES, type Village } from './lead.ts';

export interface Prefill {
  arrival?: string;
  departure?: string;
  village?: Village;
  adults?: string;
  children?: string;
  /** A hotel or chalet name; opens the message. */
  item?: string;
}

export const PREFILL_KEYS = ['arrival', 'departure', 'village', 'adults', 'children', 'item'] as const;

const DATE = /^\d{4}-\d{2}-\d{2}$/;
/** Names only: letters, digits, spaces and the punctuation hotel names use. */
const ITEM = /^[\p{L}\p{N} '’.,&()-]{1,80}$/u;

/**
 * The sentence the message opens with when the form is reached from a hotel or
 * chalet. Kept here, not in src/content, because the edge function uses it too.
 */
export const itemMessage: Record<'en' | 'fr', (item: string) => string> = {
  en: (item) => `I'd like to ask about ${item}.`,
  fr: (item) => `Je souhaite des informations sur ${item}.`,
};

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function count(value: string | null, min: number): string | undefined {
  if (!value || !/^\d{1,2}$/.test(value)) return undefined;
  const n = Number(value);
  return n >= min && n <= 99 ? String(n) : undefined;
}

/** Valid values only. `today` is YYYY-MM-DD; past dates and a departure before arrival are dropped. */
export function parsePrefill(params: URLSearchParams, today: string): Prefill {
  const p: Prefill = {};
  const arrival = params.get('arrival') ?? '';
  const departure = params.get('departure') ?? '';
  if (DATE.test(arrival) && !Number.isNaN(Date.parse(arrival)) && arrival >= today) p.arrival = arrival;
  if (DATE.test(departure) && !Number.isNaN(Date.parse(departure)) && departure > (p.arrival ?? today)) p.departure = departure;
  const village = params.get('village') ?? '';
  if ((VILLAGES as readonly string[]).includes(village)) p.village = village as Village;
  const adults = count(params.get('adults'), 1);
  if (adults) p.adults = adults;
  const children = count(params.get('children'), 0);
  if (children) p.children = children;
  const item = (params.get('item') ?? '').trim().replace(/\s+/g, ' ');
  if (ITEM.test(item)) p.item = item;
  return p;
}

export const hasPrefill = (p: Prefill) => Object.keys(p).length > 0;

/**
 * Write the values into the form's HTML (edge function). Matches the inputs
 * rendered by EnquiryForm.astro; values are already validated, so they are
 * safe to place in attributes.
 */
export function prefillHtml(html: string, p: Prefill, locale: 'en' | 'fr' = 'en'): string {
  let out = html;
  const setValue = (name: string, value: string | undefined) => {
    if (!value) return;
    out = out.replace(new RegExp(`<input([^>]*\\bname="${name}"[^>]*?)\\s*/?>`), (_tag, attrs: string) => {
      const kept = attrs.replace(/\svalue="[^"]*"/, '');
      return `<input${kept} value="${value}">`;
    });
  };
  setValue('arrival', p.arrival);
  setValue('departure', p.departure);
  setValue('adults', p.adults);
  setValue('children', p.children);
  if (p.village) {
    out = out.replace(new RegExp(`<input([^>]*\\bname="village"[^>]*\\bvalue="${p.village}"[^>]*?)\\s*/?>`), (_tag, attrs: string) => `<input${attrs} checked>`);
  }
  if (p.item) {
    const text = escapeHtml(itemMessage[locale](p.item));
    out = out.replace(/(<textarea[^>]*\bname="message"[^>]*>)<\/textarea>/, (_tag, open: string) => `${open}${text}</textarea>`);
  }
  return out;
}
