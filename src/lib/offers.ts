/**
 * The offer block on a service page (`offer: true`, ServiceOffer.astro): three
 * cards, each opening the page's short request with the choice filled in
 * (?item=), then how it works in three steps and four extras. One data file per
 * service in src/content/offers/<slug>.ts. No prices.
 */
import type { Locale } from '../data/business';
import type { RequestType } from './requests';
import privateChef from '../content/offers/private-chef';
import ski from '../content/offers/ski';
import experiences from '../content/offers/experiences';

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

export type Offer = { request: RequestType } & Record<Locale, OfferCopy>;

export const offers: Record<string, Offer> = { 'private-chef': privateChef, ski, experiences };
