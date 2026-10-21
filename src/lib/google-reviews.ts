/**
 * Google Business Profile rating and reviews, fetched at build time from the
 * Places API (New) with GOOGLE_PLACES_API_KEY. Every Netlify build refreshes
 * them (schedule a daily build hook to keep them current).
 *
 * Without a key, or if Google is unreachable, this returns null and the site
 * shows links to the profile instead: never stale or invented numbers.
 *
 * Google's terms: show the author name with a link to their profile, and
 * credit Google. We do NOT turn these into Review/AggregateRating schema:
 * Google's guidelines exclude reviews collected on other sites.
 */
import { business } from '../data/business.ts';

export interface GoogleReview {
  author: string;
  authorUrl?: string;
  rating: number;
  text: string;
  /** e.g. "2 days ago", in the requested language. */
  when: string;
  publishTime?: string;
}

export interface GoogleReviews {
  rating: number;
  count: number;
  mapsUrl: string;
  reviews: GoogleReview[];
}

interface PlacesResponse {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    relativePublishTimeDescription?: string;
    publishTime?: string;
    authorAttribution?: { displayName?: string; uri?: string };
  }[];
}

const cache = new Map<string, Promise<GoogleReviews | null>>();

export function getGoogleReviews(locale: 'en' | 'fr' = 'en'): Promise<GoogleReviews | null> {
  const key = (import.meta.env?.GOOGLE_PLACES_API_KEY ?? process.env.GOOGLE_PLACES_API_KEY) as string | undefined;
  const placeId = business.profiles.google.placeId;
  if (!key || !placeId) return Promise.resolve(null);
  if (!cache.has(locale)) cache.set(locale, fetchReviews(key, placeId, locale));
  return cache.get(locale)!;
}

export async function fetchReviews(key: string, placeId: string, locale: 'en' | 'fr'): Promise<GoogleReviews | null> {
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${locale}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri',
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.warn(`[google-reviews] Places API ${res.status}: ${(await res.text()).slice(0, 200)}`);
      return null;
    }
    const data = (await res.json()) as PlacesResponse;
    if (!data.rating || !data.userRatingCount) return null;
    return {
      rating: data.rating,
      count: data.userRatingCount,
      mapsUrl: data.googleMapsUri ?? business.profiles.google.mapsUrl,
      reviews: (data.reviews ?? [])
        .filter((r) => (r.originalText?.text ?? r.text?.text)?.trim())
        .map((r) => ({
          author: r.authorAttribution?.displayName ?? 'Google user',
          authorUrl: r.authorAttribution?.uri,
          rating: r.rating ?? 5,
          // The reviewer's own words, in the language they wrote in.
          text: (r.originalText?.text ?? r.text?.text ?? '').trim(),
          when: r.relativePublishTimeDescription ?? '',
          publishTime: r.publishTime,
        })),
    };
  } catch (err) {
    console.warn('[google-reviews] unavailable:', err instanceof Error ? err.message : err);
    return null;
  }
}
