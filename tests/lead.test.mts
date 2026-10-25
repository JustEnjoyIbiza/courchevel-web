/**
 * Tests for the lead function, with Supabase, Basin, Resend, Telegram and Turnstile
 * replaced by a fake fetch. Run: npm test
 */
import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { handleLead } from '../netlify/functions/lead.mts';
import { validateLead, validateRequest } from '../src/lib/lead.ts';

const NOW = new Date('2026-11-20T10:00:00Z');
const ENV = {
  SUPABASE_URL: 'https://example.supabase.co',
  SUPABASE_SERVICE_ROLE_KEY: 'service-key',
  RESEND_API_KEY: 'resend-key',
  LEAD_FROM_EMAIL: 'hello@courchevelluxuryconcierge.com',
  CONCIERGE_EMAIL: 'concierge@example.com',
  TELEGRAM_BOT_TOKEN: 'bot-token',
  TELEGRAM_CHAT_ID: '12345',
};

const valid = {
  locale: 'en',
  arrival: '2026-12-26',
  departure: '2027-01-02',
  village: '1850',
  adults: '4',
  children: '2',
  childrenAges: '5 and 9',
  services: ['chalets', 'transfers', 'childcare'],
  bookingFor: 'client',
  name: 'Anna Example',
  email: 'Anna@Example.com',
  phone: '+44 7700 900123',
  preferredContact: 'whatsapp',
  message: 'New Year for a family of six.',
  consent: 'on',
  started: String(NOW.getTime() - 60_000),
  utm_source: 'chatgpt.com',
  page: '/services/chalets/',
  website: '',
};

type Call = { url: string; init: RequestInit; body: any };
let calls: Call[] = [];
let failHosts: string[] = [];
const realFetch = globalThis.fetch;

beforeEach(() => {
  calls = [];
  failHosts = [];
  globalThis.fetch = (async (input: string | URL, init: RequestInit = {}) => {
    const url = String(input);
    let body: any = init.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch { /* keep string */ } }
    calls.push({ url, init, body });
    const host = new URL(url).host;
    if (failHosts.includes(host)) return new Response('down', { status: 500 });
    if (host === 'challenges.cloudflare.com') {
      const token = (init.body as URLSearchParams).get('response');
      return Response.json({ success: token === 'good-token' });
    }
    return new Response(host === 'api.resend.com' ? '{"id":"e1"}' : '', { status: host.endsWith('supabase.co') ? 201 : 200 });
  }) as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = realFetch;
});

const post = (body: unknown) =>
  new Request('https://site.test/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

test('valid lead is saved, emailed to concierge and client, and alerted on Telegram', async () => {
  const res = await handleLead(post(valid), ENV, NOW);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });

  const db = calls.find((c) => c.url === 'https://example.supabase.co/rest/v1/leads');
  assert.ok(db, 'saved to Supabase');
  assert.equal(db.body.email, 'anna@example.com');
  assert.deepEqual(db.body.services, ['chalets', 'transfers', 'childcare']);
  assert.equal(db.body.booking_for, 'client');
  assert.equal(db.body.utm_source, 'chatgpt.com');
  assert.equal(db.body.consent, true);
  assert.equal((db.init.headers as Record<string, string>).Authorization, 'Bearer service-key');

  const emails = calls.filter((c) => c.url === 'https://api.resend.com/emails');
  assert.equal(emails.length, 2);
  const concierge = emails.find((e) => e.body.to[0] === 'concierge@example.com')!;
  const client = emails.find((e) => e.body.to[0] === 'anna@example.com')!;
  assert.match(concierge.body.subject, /^New lead: Anna Example · 2026-12-26 → 2027-01-02 · Courchevel 1850 · 6 guests$/);
  assert.equal(concierge.body.reply_to, 'anna@example.com');
  assert.match(concierge.body.text, /wa\.me\/447700900123/);
  assert.match(client.body.subject, /We have your request/);
  assert.match(client.body.text, /7 nights/);
  assert.match(client.body.text, /within 15 minutes/);
  assert.doesNotMatch(client.body.html + client.body.text, /€|\bEUR\b/);

  const tg = calls.find((c) => c.url.startsWith('https://api.telegram.org/botbot-token/sendMessage'))!;
  assert.equal(tg.body.chat_id, '12345');
  assert.match(tg.body.text, /New lead<\/b> · Anna Example/);
});

test('French lead gets the confirmation in French', async () => {
  await handleLead(post({ ...valid, locale: 'fr' }), ENV, NOW);
  const client = calls.find((c) => c.url.includes('resend') && c.body.to[0] === 'anna@example.com')!;
  assert.match(client.body.subject, /Nous avons bien reçu votre demande/);
  assert.match(client.body.text, /Bonjour Anna Example/);
  assert.match(client.body.text, /7 nuits/);
});

test('honeypot and too-fast submissions look successful but do nothing', async () => {
  assert.equal((await handleLead(post({ ...valid, website: 'http://spam' }), ENV, NOW)).status, 200);
  assert.equal((await handleLead(post({ ...valid, started: String(NOW.getTime() - 500) }), ENV, NOW)).status, 200);
  assert.equal(calls.length, 0);
});

test('invalid input returns field errors and calls nothing', async () => {
  const res = await handleLead(post({ ...valid, email: 'nope', departure: '2026-12-20', services: [], consent: '' }), ENV, NOW);
  assert.equal(res.status, 422);
  const body = await res.json();
  assert.deepEqual(Object.keys(body.fields).sort(), ['consent', 'departure', 'email', 'services']);
  assert.equal(body.fields.departure, 'order');
  assert.equal(calls.length, 0);
});

test('a normal form post (no JavaScript) redirects to the thank-you page', async () => {
  const form = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...valid, locale: 'fr' })) {
    if (Array.isArray(v)) v.forEach((x) => form.append(k, x));
    else form.append(k, v);
  }
  const req = new Request('https://site.test/api/lead', { method: 'POST', body: form });
  const res = await handleLead(req, ENV, NOW);
  assert.equal(res.status, 303);
  assert.equal(res.headers.get('location'), '/fr/enquire/thanks/');
  const db = calls.find((c) => c.url.includes('supabase'))!;
  assert.deepEqual(db.body.services, ['chalets', 'transfers', 'childcare']);
});

test('invalid form post (no JavaScript) redirects back to the form with an error', async () => {
  const req = new Request('https://site.test/api/lead', { method: 'POST', body: new URLSearchParams({ locale: 'en', name: 'X' }) });
  const res = await handleLead(req, ENV, NOW);
  assert.equal(res.status, 303);
  assert.equal(res.headers.get('location'), '/enquire/?error=invalid#form');
});

test('lead still succeeds when the database is down but the concierge is emailed', async () => {
  failHosts = ['example.supabase.co'];
  const res = await handleLead(post(valid), ENV, NOW);
  assert.equal(res.status, 200);
});

test('when nobody can be reached the visitor is told to use WhatsApp', async () => {
  failHosts = ['example.supabase.co', 'api.resend.com', 'api.telegram.org'];
  const res = await handleLead(post(valid), ENV, NOW);
  assert.equal(res.status, 503);
  assert.equal((await res.json()).error, 'unavailable');
});

test('with only Basin configured, the lead is forwarded to Basin as JSON', async () => {
  const res = await handleLead(post(valid), { BASIN_FORM_URL: 'https://usebasin.com/f/test123' }, NOW);
  assert.equal(res.status, 200);
  const basin = calls.find((c) => c.url === 'https://usebasin.com/f/test123')!;
  assert.ok(basin, 'sent to Basin');
  assert.equal((basin.init.headers as Record<string, string>).Accept, 'application/json');
  assert.equal(basin.body.email, 'anna@example.com');
  assert.equal(basin.body.services, 'chalets, transfers, childcare');
  assert.equal(basin.body.utm_source, 'chatgpt.com');
});

test('Basin down and nothing else configured: the visitor is told to use WhatsApp', async () => {
  failHosts = ['usebasin.com'];
  const res = await handleLead(post(valid), { BASIN_FORM_URL: 'https://usebasin.com/f/test123' }, NOW);
  assert.equal(res.status, 503);
});

test('with no integrations configured the function refuses, unless dry run is on', async () => {
  assert.equal((await handleLead(post(valid), {}, NOW)).status, 503);
  assert.equal((await handleLead(post(valid), { LEAD_DRY_RUN: '1' }, NOW)).status, 200);
});

test('Turnstile: missing or bad token is rejected, good token passes', async () => {
  const env = { ...ENV, TURNSTILE_SECRET_KEY: 'secret' };
  assert.equal((await handleLead(post(valid), env, NOW)).status, 400);
  assert.equal((await handleLead(post({ ...valid, 'cf-turnstile-response': 'bad' }), env, NOW)).status, 400);
  assert.equal((await handleLead(post({ ...valid, 'cf-turnstile-response': 'good-token' }), env, NOW)).status, 200);
});

test('names with HTML are escaped in emails and alerts', async () => {
  await handleLead(post({ ...valid, name: '<script>x</script> Ann' }), ENV, NOW);
  const html = calls.filter((c) => c.url.includes('resend')).map((c) => c.body.html).join('');
  assert.doesNotMatch(html, /<script>x/);
  assert.match(html, /&lt;script&gt;x/);
  const tg = calls.find((c) => c.url.includes('telegram'))!;
  assert.doesNotMatch(tg.body.text, /<script>/);
});

test('validation rules: phone needed for WhatsApp/phone replies, not for email; no past dates', () => {
  assert.equal(validateLead({ ...valid, phone: '' }, NOW).errors.phone, 'required');
  assert.equal(validateLead({ ...valid, phone: '', preferredContact: 'email' }, NOW).ok, true);
  assert.equal(validateLead({ ...valid, arrival: '2026-11-01' }, NOW).errors.arrival, 'range');
  assert.equal(validateLead({ ...valid, village: 'paris' }, NOW).errors.village, 'invalid');
  assert.equal(validateLead({ ...valid, services: ['chalets', 'yachts'] }, NOW).lead?.services.join(), 'chalets');
});

// Short requests: one service, one date (src/lib/requests.ts).
const table = {
  locale: 'en',
  requestType: 'table',
  item: 'Bagatelle',
  date: '2026-12-28',
  time: '13:00',
  guests: '6',
  details: 'A birthday lunch.',
  staying: 'Chalet in 1850',
  name: 'Anna Example',
  email: 'anna@example.com',
  phone: '+44 7700 900123',
  preferredContact: 'whatsapp',
  consent: 'on',
  started: String(NOW.getTime() - 60_000),
  page: '/guides/where-to-eat/',
  website: '',
};

test('a table request is saved, emailed and alerted with its summary', async () => {
  const res = await handleLead(post(table), ENV, NOW);
  assert.equal(res.status, 200);

  const db = calls.find((c) => c.url.endsWith('/rest/v1/leads'))!;
  assert.equal(db.body.request_type, 'table');
  assert.equal(db.body.request.item, 'Bagatelle');
  assert.equal(db.body.request.guests, 6);
  assert.equal(db.body.arrival, '2026-12-28');
  assert.deepEqual(db.body.services, ['nightlife']);
  assert.equal(db.body.village, undefined);

  const concierge = calls.find((c) => c.url.includes('resend') && c.body.to[0] === 'concierge@example.com')!;
  assert.match(concierge.body.subject, /^New request: Table · Bagatelle · .*28 December 2026, 13:00 · Guests: 6 · Anna Example$/);
  const client = calls.find((c) => c.url.includes('resend') && c.body.to[0] === 'anna@example.com')!;
  assert.match(client.body.text, /Restaurant: Bagatelle/);
  assert.doesNotMatch(client.body.text, /nights|proposal within 24 hours/);

  const tg = calls.find((c) => c.url.includes('telegram'))!;
  assert.match(tg.body.text, /New request<\/b> · Anna Example/);
  assert.match(tg.body.text, /Table · Bagatelle/);
  assert.match(tg.body.text, /Staying at: Chalet in 1850/);
});

test('a French transfer request gets the French labels', async () => {
  await handleLead(post({ ...table, locale: 'fr', requestType: 'transfer', item: '', from: 'Aéroport de Genève', to: 'Courchevel 1850', flight: 'EZY123' }), ENV, NOW);
  const client = calls.find((c) => c.url.includes('resend') && c.body.to[0] === 'anna@example.com')!;
  assert.match(client.body.text, /Départ : Aéroport de Genève/);
  assert.match(client.body.text, /Passagers : 6/);
});

test('request validation: required fields, dates, guests and service', () => {
  const missing = validateRequest({ ...table, date: '', guests: '' }, NOW);
  assert.deepEqual(Object.keys(missing.errors).sort(), ['date', 'guests']);
  assert.equal(validateRequest({ ...table, date: '2026-11-01' }, NOW).errors.date, 'range');
  assert.equal(validateRequest({ ...table, requestType: 'instructor', dateTo: '2026-12-27' }, NOW).errors.dateTo, 'end');
  assert.equal(validateRequest({ ...table, time: '25:00' }, NOW).errors.time, 'invalid');
  assert.equal(validateRequest({ ...table, requestType: 'yacht' }, NOW).errors.requestType, 'invalid');
  // Optional item, fields of other types ignored.
  const ok = validateRequest({ ...table, item: '', from: 'Geneva' }, NOW);
  assert.equal(ok.ok, true);
  assert.equal(ok.lead?.from, '');
  // General requests need a description; the service can be chosen among the allowed ones.
  assert.equal(validateRequest({ ...table, requestType: 'general', details: '' }, NOW).errors.details, 'required');
  assert.equal(validateRequest({ ...table, requestType: 'general', service: 'staff' }, NOW).lead?.service, 'staff');
  assert.equal(validateRequest({ ...table, requestType: 'general', service: 'chalets' }, NOW).lead?.service, 'lifestyle');
});

test('an invalid request posted without JavaScript goes back to its own form', async () => {
  const req = new Request('https://site.test/api/lead', { method: 'POST', body: new URLSearchParams({ locale: 'fr', requestType: 'table', name: 'X' }) });
  const res = await handleLead(req, ENV, NOW);
  assert.equal(res.status, 303);
  assert.equal(res.headers.get('location'), '/fr/enquire/table/?error=invalid#form');
});

test('Basin receives the request type, summary and fields', async () => {
  await handleLead(post(table), { BASIN_FORM_URL: 'https://usebasin.com/f/test123' }, NOW);
  const basin = calls.find((c) => c.url === 'https://usebasin.com/f/test123')!;
  assert.equal(basin.body.request_type, 'table');
  assert.match(basin.body.summary, /^Table · Bagatelle/);
  assert.equal(basin.body.item, 'Bagatelle');
  assert.equal(basin.body.guests, 6);
});

test('a new-style Supabase secret key goes in the apikey header only', async () => {
  await handleLead(post(valid), { ...ENV, SUPABASE_SERVICE_ROLE_KEY: 'sb_secret_abc' }, NOW);
  const db = calls.find((c) => c.url.endsWith('/rest/v1/leads'))!;
  const headers = db.init.headers as Record<string, string>;
  assert.equal(headers.apikey, 'sb_secret_abc');
  assert.equal(headers.Authorization, undefined);
});
