/**
 * Outbound calls for a lead: Supabase (store), Resend (emails), Telegram (alert),
 * Cloudflare Turnstile (spam check). Plain fetch, no SDKs, so the function stays
 * small and every call can be mocked in tests. Each call has a timeout.
 */
import type { AnyLead, RequestLead } from '../../src/lib/lead.ts';
import { requestSummary } from '../../src/lib/request-labels.ts';

export type Env = Record<string, string | undefined>;

export type Outcome = 'ok' | 'skipped' | 'failed';

const TIMEOUT_MS = 8000;

async function call(url: string, init: RequestInit): Promise<Response> {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${new URL(url).host} ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res;
}

const source = (lead: AnyLead) => ({
  locale: lead.locale,
  page: lead.page || null,
  referrer: lead.referrer || null,
  utm_source: lead.utmSource || null,
  utm_medium: lead.utmMedium || null,
  utm_campaign: lead.utmCampaign || null,
});

/** A short request's own fields, as stored in the `request` column and sent to Basin. */
const requestFields = (lead: RequestLead) => ({
  item: lead.item,
  from: lead.from,
  to: lead.to,
  date: lead.date,
  date_to: lead.dateTo,
  time: lead.time,
  flight: lead.flight,
  guests: lead.guests,
  details: lead.details,
  staying: lead.staying,
});

/**
 * Insert the lead into the Supabase `leads` table (service role key, server only).
 * Short requests need supabase/migrations/002_short_requests.sql; stays work with 001 alone.
 */
export async function saveLead(lead: AnyLead, env: Env): Promise<Outcome> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return 'skipped';
  const row =
    lead.kind === 'request'
      ? {
          request_type: lead.requestType,
          request: requestFields(lead),
          arrival: lead.date || null,
          departure: lead.dateTo || null,
          services: [lead.service],
          name: lead.name,
          email: lead.email,
          phone: lead.phone || null,
          preferred_contact: lead.preferredContact,
          message: lead.details || null,
          consent: true,
          ...source(lead),
        }
      : {
          arrival: lead.arrival,
          departure: lead.departure,
          dates_flexible: lead.datesFlexible,
          village: lead.village,
          adults: lead.adults,
          children: lead.children,
          children_ages: lead.childrenAges || null,
          services: lead.services,
          experience: lead.experience || null,
          budget: lead.budget || null,
          booking_for: lead.bookingFor,
          name: lead.name,
          email: lead.email,
          phone: lead.phone || null,
          preferred_contact: lead.preferredContact,
          message: lead.message || null,
          consent: true,
          ...source(lead),
        };
  await call(`${env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  });
  return 'ok';
}

/** Send one email through Resend. */
export async function sendEmail(
  env: Env,
  msg: { to: string; subject: string; text: string; html: string; replyTo?: string },
): Promise<Outcome> {
  if (!env.RESEND_API_KEY || !env.LEAD_FROM_EMAIL || !msg.to) return 'skipped';
  await call('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Courchevel Luxury Concierge <${env.LEAD_FROM_EMAIL}>`,
      to: [msg.to],
      subject: msg.subject,
      text: msg.text,
      html: msg.html,
      ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
    }),
  });
  return 'ok';
}

/** Alert the concierge on Telegram. */
export async function sendTelegram(env: Env, html: string): Promise<Outcome> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return 'skipped';
  await call(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: html, parse_mode: 'HTML', disable_web_page_preview: true }),
  });
  return 'ok';
}

/**
 * Forward the lead to the Basin form (usebasin.com): Basin stores it and emails
 * the concierge, so leads arrive even before Supabase and Resend are set up.
 */
export async function sendBasin(lead: AnyLead, env: Env): Promise<Outcome> {
  if (!env.BASIN_FORM_URL) return 'skipped';
  const contact = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone || '',
    preferred_contact: lead.preferredContact,
  };
  const tracking = {
    locale: lead.locale,
    page: lead.page || '',
    referrer: lead.referrer || '',
    utm_source: lead.utmSource || '',
    utm_medium: lead.utmMedium || '',
    utm_campaign: lead.utmCampaign || '',
  };
  const payload =
    lead.kind === 'request'
      ? { request_type: lead.requestType, summary: requestSummary(lead, 'en'), ...contact, services: lead.service, ...requestFields(lead), guests: lead.guests ?? '', ...tracking }
      : {
          ...contact,
          arrival: lead.arrival,
          departure: lead.departure,
          dates_flexible: lead.datesFlexible ? 'yes' : 'no',
          village: lead.village,
          adults: lead.adults,
          children: lead.children,
          children_ages: lead.childrenAges || '',
          services: lead.services.join(', '),
          experience: lead.experience || '',
          budget: lead.budget || '',
          booking_for: lead.bookingFor,
          message: lead.message || '',
          ...tracking,
        };
  await call(env.BASIN_FORM_URL, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return 'ok';
}

/** Verify a Cloudflare Turnstile token. Returns true when Turnstile is not configured. */
export async function verifyTurnstile(env: Env, token: string, ip: string | null): Promise<boolean> {
  if (!env.TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
  if (ip) body.set('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
