/**
 * Tests for the homepage quick-start pre-fill: URL parsing, the HTML rewrite
 * and the edge function. Run: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parsePrefill, prefillHtml } from '../src/lib/prefill.ts';
import prefillEdge from '../netlify/edge-functions/enquire-prefill.ts';

const TODAY = '2026-11-20';
const q = (s: string) => new URLSearchParams(s);

// The inputs exactly as EnquiryForm.astro renders them (minified build output).
const FORM =
  '<form id="form"><input class="mt-2 block" id="arrival" name="arrival" type="date" required min="2026-10-23" aria-describedby="err-arrival">' +
  '<input class="mt-2 block" id="departure" name="departure" type="date" required min="2026-10-23" aria-describedby="err-departure">' +
  '<input type="radio" name="village" value="1850" required class="size-4 accent-ink">' +
  '<input type="radio" name="village" value="le-praz" class="size-4 accent-ink">' +
  '<input class="mt-2 block" id="adults" name="adults" type="number" inputmode="numeric" min="1" max="99" value="2" required aria-describedby="err-adults">' +
  '<input class="mt-2 block" id="children" name="children" type="number" inputmode="numeric" min="0" max="99" value="0" aria-describedby="err-children"></form>';

test('valid quick-start values are kept', () => {
  assert.deepEqual(parsePrefill(q('arrival=2026-12-26&departure=2027-01-02&village=1850&adults=4&children=2'), TODAY), {
    arrival: '2026-12-26',
    departure: '2027-01-02',
    village: '1850',
    adults: '4',
    children: '2',
  });
});

test('past dates, departure before arrival, unknown villages and bad counts are dropped', () => {
  assert.deepEqual(parsePrefill(q('arrival=2026-11-01&departure=2026-11-10'), TODAY), {});
  assert.deepEqual(parsePrefill(q('arrival=2026-12-26&departure=2026-12-20'), TODAY), { arrival: '2026-12-26' });
  assert.deepEqual(parsePrefill(q('village=paris&adults=0&children=-1'), TODAY), {});
  assert.deepEqual(parsePrefill(q('adults=100&children=abc&arrival=2026-13-45'), TODAY), {});
  assert.deepEqual(parsePrefill(q('village="><script>&adults=3'), TODAY), { adults: '3' });
  assert.deepEqual(parsePrefill(q('children=0'), TODAY), { children: '0' });
});

test('values are written into the form HTML', () => {
  const html = prefillHtml(FORM, { arrival: '2026-12-26', departure: '2027-01-02', village: 'le-praz', adults: '4', children: '2' });
  assert.match(html, /id="arrival" name="arrival"[^>]* value="2026-12-26">/);
  assert.match(html, /id="departure" name="departure"[^>]* value="2027-01-02">/);
  assert.match(html, /name="adults"[^>]* value="4">/);
  assert.doesNotMatch(html, /value="2" required/, 'old default replaced, not duplicated');
  assert.match(html, /name="children"[^>]* value="2">/);
  assert.match(html, /value="le-praz" class="size-4 accent-ink" checked>/);
  assert.doesNotMatch(html, /value="1850"[^>]*checked/);
  assert.equal((html.match(/<input/g) ?? []).length, 6);
});

test('edge function: passes through without quick-start values, rewrites with them', async () => {
  const page = () => new Response(FORM, { headers: { 'content-type': 'text/html; charset=utf-8', 'content-length': String(FORM.length) } });
  const context = { next: async () => page() };

  assert.equal(await prefillEdge(new Request('https://site.test/enquire/'), context), undefined);
  assert.equal(await prefillEdge(new Request('https://site.test/enquire/?service=chalets'), context), undefined);

  const future = new Date(Date.now() + 30 * 86_400_000).toISOString().slice(0, 10);
  const res = await prefillEdge(new Request(`https://site.test/enquire/?arrival=${future}&village=1850&adults=5`), context);
  assert.ok(res);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('content-length'), null);
  const html = await res.text();
  assert.match(html, new RegExp(`name="arrival"[^>]* value="${future}">`));
  assert.match(html, /value="1850" required class="size-4 accent-ink" checked>/);
  assert.match(html, /name="adults"[^>]* value="5">/);
});
