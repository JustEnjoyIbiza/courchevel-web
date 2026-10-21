/**
 * Tests for the lead function, with Supabase, Resend, Telegram and Turnstile
 * replaced by a fake fetch. Run: npm test
 */
import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { handleLead } from '../netlify/functions/lead.mts';
import { validateLead } from '../src/lib/lead.ts';

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
