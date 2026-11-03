/**
 * Partners we may name publicly: chalets, hotels, ski schools, chefs,
 * suppliers. Add one only with that partner's written permission.
 * The /partners/ page is built only while this list is not empty.
 */
import type { Locale } from './business';

export interface Partner {
  name: string;
  type: Record<Locale, string>;
  url?: string;
  /** One line on what we do together, in the partner's approved words. */
  note?: Record<Locale, string>;
}

export const partners: Partner[] = [];
