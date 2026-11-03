/**
 * The Google rating shown on the homepage: live from the Places API at build time
 * when GOOGLE_PLACES_API_KEY is set, otherwise the figure last checked by hand in
 * src/data/business.ts (`profiles.google.rating`), with its date.
 */
import { getGoogleReviews } from './google-reviews';
import { business, type Locale } from '../data/business';

export interface Rating {
  value: number;
  count: number;
  /** YYYY-MM-DD when the figure comes from business.ts; null when it is live. */
  checked: string | null;
}

export async function googleRating(locale: Locale): Promise<Rating> {
  const live = await getGoogleReviews(locale);
  if (live) return { value: live.rating, count: live.count, checked: null };
  const { value, count, checked } = business.profiles.google.rating;
  return { value, count, checked };
}
