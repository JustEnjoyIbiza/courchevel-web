/**
 * The offer block on a service page (`offer: true`, ServiceOffer.astro): three
 * cards, each opening the page's short request with the choice filled in
 * (?item=, or ?details= for forms without a choice field), then how it works in
 * three steps and four extras. One data file per
 * service in src/content/offers/<slug>.ts. No prices.
 */
import type { Locale } from '../data/business';
import type { RequestType } from './requests';
import privateChef from '../content/offers/private-chef';
import ski from '../content/offers/ski';
import experiences from '../content/offers/experiences';
import nightlife from '../content/offers/nightlife';
import staff from '../content/offers/staff';
import childcare from '../content/offers/childcare';
import wellness from '../content/offers/wellness';

export interface OfferCard {
  name: string;
  line: string;
  /** What fills the request's first field; defaults to the name. */
  item?: string;
  /** Another request than the offer's own (e.g. heli-skiing opens the experience request). */
  request?: RequestType;
}

export interface OfferCopy {
  cards: { eyebrow: string; title: string; note: string; request: string; items: OfferCard[] };
  steps: { title: string; items: { name: string; text: string }[] };
  extras: { title: string; items: { name: string; text: string }[] };
}

export type Offer = {
  request: RequestType;
  /** Tags the lead with this service (general requests, e.g. 'staff'). */
  service?: string;
  /** The request field a card fills: `item` (default), or `details` for forms without a choice field. */
  prefill?: 'item' | 'details';
} & Record<Locale, OfferCopy>;

export const offers: Record<string, Offer> = { 'private-chef': privateChef, ski, experiences, nightlife, staff, childcare, wellness };
