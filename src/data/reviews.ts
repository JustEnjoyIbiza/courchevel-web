/**
 * Real client reviews only: word for word, with the client's permission,
 * name or initials, date and service. Never invent or edit a review.
 * The section on the homepage stays hidden while this list is empty.
 */
import type { Locale } from './business';

export interface Review {
  text: string;
  author: string;
  date: string;
  service: Record<Locale, string>;
}

export const reviews: Review[] = [];
