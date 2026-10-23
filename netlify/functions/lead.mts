/**
 * POST /api/lead — receives the Plan my stay form.
 *
 * Accepts JSON (the form with JavaScript) or a normal form post (JavaScript
 * off, answered with a redirect to the thank-you page).
 *
 * Steps: spam checks (honeypot, minimum fill time, Turnstile) -> validation ->
 * in parallel: save to Supabase, forward to Basin, email the concierge, email
 * the client, Telegram alert. The request succeeds when the concierge is
 * reached by at least one channel (database, Basin, email or alert), so a lead is never lost
 * because one service is down.
 */
import { validateLead } from '../../src/lib/lead.ts';
import { clientEmail, conciergeEmail, telegramAlert } from '../lib/messages.ts';
import { saveLead, sendBasin, sendEmail, sendTelegram, verifyTurnstile, type Env, type Outcome } from '../lib/integrations.ts';

export const config = { path: '/api/lead', method: ['POST'] };

/** Forms filled faster than this are almost certainly bots. */
const MIN_FILL_MS = 3000;

type Fields = Record<string, string | string[]>;

async function readFields(req: Request): Promise<{ fields: Fields; isJson: boolean }> {
  const type = req.headers.get('content-type') ?? '';
  if (type.includes('application/json')) {
    return { fields: (await req.json()) as Fields, isJson: true };
  }
  const form = await req.formData();
  const fields: Fields = {};
  for (const key of new Set(form.keys())) {
    const all = form.getAll(key).map(String);
    fields[key] = key === 'services' ? all : all[0];
  }
  return { fields, isJson: false };
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const redirect = (to: string) => new Response(null, { status: 303, headers: { Location: to } });

export async function handleLead(req: Request, env: Env, now = new Date()): Promise<Response> {
  let fields: Fields;
  let isJson: boolean;
  try {
    ({ fields, isJson } = await readFields(req));
  } catch {
    return json(400, { ok: false, error: 'bad_request' });
  }

  const locale = fields.locale === 'fr' ? 'fr' : 'en';
  const base = locale === 'fr' ? '/fr' : '';
  const thanks = `${base}/enquire/thanks/`;
  const done = () => (isJson ? json(200, { ok: true }) : redirect(thanks));

  // Spam: hidden honeypot field filled, or the form was submitted too fast.
  // Answer as if it worked, so bots learn nothing.
  const started = Number(fields.started ?? 0);
  if (String(fields.website ?? '').trim() !== '' || (started > 0 && now.getTime() - started < MIN_FILL_MS)) {
    return done();
  }

  const ip = req.headers.get('x-nf-client-connection-ip');
  if (!(await verifyTurnstile(env, String(fields['cf-turnstile-response'] ?? ''), ip))) {
    return isJson ? json(400, { ok: false, error: 'captcha' }) : redirect(`${base}/enquire/?error=captcha#form`);
  }

  // Without JavaScript the hidden "page" field is empty: fall back to the Referer header.
  if (!fields.page) {
    try {
      const ref = new URL(req.headers.get('referer') ?? '');
      fields.page = ref.pathname + ref.search;
    } catch {
      /* no referer */
    }
  }

  const result = validateLead(fields as Record<string, string | string[]>, now);
  if (!result.ok || !result.lead) {
    return isJson ? json(422, { ok: false, error: 'invalid', fields: result.errors }) : redirect(`${base}/enquire/?error=invalid#form`);
  }
  const lead = result.lead;

  const concierge = conciergeEmail(lead);
  const client = clientEmail(lead);
  const tasks: Record<string, Promise<Outcome>> = {
    db: saveLead(lead, env),
    basin: sendBasin(lead, env),
    conciergeEmail: sendEmail(env, { to: env.CONCIERGE_EMAIL ?? '', ...concierge, replyTo: lead.email }),
    alert: sendTelegram(env, telegramAlert(lead)),
    clientEmail: sendEmail(env, { to: lead.email, ...client, replyTo: env.CONCIERGE_EMAIL }),
  };
  const names = Object.keys(tasks);
  const settled = await Promise.allSettled(Object.values(tasks));
  const outcome: Record<string, Outcome> = {};
  settled.forEach((r, i) => {
    outcome[names[i]] = r.status === 'fulfilled' ? r.value : 'failed';
    if (r.status === 'rejected') console.error(`lead: ${names[i]} failed:`, r.reason instanceof Error ? r.reason.message : r.reason);
  });
  console.log('lead received', JSON.stringify({ locale, village: lead.village, outcome }));

  const reached = outcome.db === 'ok' || outcome.basin === 'ok' || outcome.conciergeEmail === 'ok' || outcome.alert === 'ok';
  const nothingConfigured = Object.values(outcome).every((o) => o === 'skipped');

  if (reached || (nothingConfigured && env.LEAD_DRY_RUN === '1')) return done();

  // Nobody was reached: tell the visitor to use WhatsApp instead.
  return isJson ? json(503, { ok: false, error: nothingConfigured ? 'not_configured' : 'unavailable' }) : redirect(`${base}/enquire/?error=unavailable#form`);
}

export default async (req: Request) => handleLead(req, process.env);
