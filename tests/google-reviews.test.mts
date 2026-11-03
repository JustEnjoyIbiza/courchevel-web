/** Google reviews parsing, with the Places API replaced by a fake fetch. */
import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { fetchReviews } from '../src/lib/google-reviews.ts';

const realFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = realFetch; });
const fake = (status: number, body: unknown) => {
  let seen: { url: string; headers: Record<string, string> } | undefined;
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    seen = { url: String(url), headers: init.headers as Record<string, string> };
    return new Response(JSON.stringify(body), { status });
  }) as typeof fetch;
  return () => seen!;
};

test('parses rating, count and reviews in the reviewer\'s own words', async () => {
  const seen = fake(200, {
    rating: 5, userRatingCount: 14, googleMapsUri: 'https://maps.google.com/?cid=1',
    reviews: [
      { rating: 5, text: { text: 'Translated' }, originalText: { text: 'Muy recomendable' }, relativePublishTimeDescription: '4 days ago', authorAttribution: { displayName: 'Asier', uri: 'https://www.google.com/maps/contrib/1' } },
      { rating: 4, text: { text: '' } },
    ],
  });
  const r = await fetchReviews('key', 'PLACE', 'en');
  assert.equal(r?.rating, 5);
  assert.equal(r?.count, 14);
  assert.equal(r?.reviews.length, 1, 'empty reviews are dropped');
  assert.equal(r?.reviews[0].text, 'Muy recomendable');
  assert.equal(r?.reviews[0].author, 'Asier');
  assert.match(seen().url, /places\/PLACE\?languageCode=en$/);
  assert.equal(seen().headers['X-Goog-Api-Key'], 'key');
});

test('returns null on API errors or when there are no ratings yet', async () => {
  fake(403, { error: 'denied' });
  assert.equal(await fetchReviews('key', 'PLACE', 'en'), null);
  fake(200, {});
  assert.equal(await fetchReviews('key', 'PLACE', 'fr'), null);
});
