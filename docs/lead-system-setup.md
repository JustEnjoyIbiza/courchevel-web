# Lead system: connecting the real accounts

The code is finished and tested with stand-ins. To make leads real, create these
accounts (all have free tiers that cover this site), then put the keys in
**Netlify → Site configuration → Environment variables**. Never put keys in the code.

About 45 minutes in total.

## 0. Basin (done 23 Oct 2026): leads work with this alone

Form "Courchevel Luxury Concierge – Plan my stay" in the owner's Basin account
(project "Just Enjoy Ibiza Boats"). Basin keeps every lead for 365 days and emails
**Courchevelluxuryconcierge@gmail.com** only (owner's choice, 23 Oct), until the domain email
exists; then change it in Basin → form → Notifications → "Send emails to". The Gmail address
must be verified first: open Basin's verification email in that inbox and click the link.

| Netlify variable | Value |
|---|---|
| `BASIN_FORM_URL` | `https://usebasin.com/f/ba03d712d447` |

Basin's spam filter reads the message text: a test worded "TEST… ignore… safe to
delete" went to Spam (no email is sent for spam on the current plan), a normally
worded one reached the Inbox. Check Basin's Spam folder now and then.
The old site's form (`/f/34a5258d7b37`) is separate and stays until launch.


## 1. Supabase (lead database), about 10 min

1. Create a project at supabase.com. Choose an **EU region (Paris, eu-west-3)** so data stays in the EU.
2. SQL Editor → New query → paste `supabase/migrations/001_leads.sql` → Run.
3. Project Settings → API: copy the **Project URL** and the **service_role** key.

| Netlify variable | Value |
|---|---|
| `SUPABASE_URL` | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key (secret: never in the browser or the code) |

Leads appear in Table Editor → `leads`. Change `status` there as each lead moves on:
new → contacted → proposal_sent → booked / lost.

## 2. Resend (emails), about 15 min

1. Create an account at resend.com.
2. Domains → add `courchevelluxuryconcierge.com` and add the DNS records it shows
   (where the domain is managed). Wait for "Verified".
3. API Keys → create a key with "Sending access".

| Netlify variable | Value |
|---|---|
| `RESEND_API_KEY` | the API key |
| `LEAD_FROM_EMAIL` | e.g. `hello@courchevelluxuryconcierge.com` (must be on the verified domain) |
| `CONCIERGE_EMAIL` | where new-lead emails go (today: Courchevelluxuryconcierge@gmail.com) |

## 3. Telegram alert, about 5 min

1. In Telegram, message **@BotFather** → `/newbot` → pick a name → copy the **token**.
2. Send any message to your new bot from the phone that should receive alerts.
3. Open `https://api.telegram.org/bot<TOKEN>/getUpdates` in a browser and copy `chat.id`.

| Netlify variable | Value |
|---|---|
| `TELEGRAM_BOT_TOKEN` | the bot token |
| `TELEGRAM_CHAT_ID` | the chat id |

## 4. Cloudflare Turnstile (spam protection), about 5 min

1. dash.cloudflare.com → Turnstile → Add widget → domain `courchevelluxuryconcierge.com`
   (add `localhost` too for testing), mode **Managed**.

| Netlify variable | Value |
|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | site key (public, shown in the page) |
| `TURNSTILE_SECRET_KEY` | secret key |

Without these two, the form still has the honeypot and minimum-fill-time checks.

## 5. Google Analytics 4 (optional, after launch)

Create a GA4 property and set `PUBLIC_GA4_MEASUREMENT_ID` (G-XXXXXXX). The cookie
banner then appears automatically; GA loads only after a visitor accepts.
Events sent: `form_start`, `form_submit`, `whatsapp_click`, `phone_click`, `email_click`
(`guide_download` arrives with the Winter Guide PDF, if we make one).

## How a lead flows

1. Visitor sends the form (with or without JavaScript) → `POST /api/lead`.
2. Spam checks: hidden honeypot field, at least 3 seconds to fill, Turnstile.
3. Validation (same rules in the browser and on the server: `src/lib/lead.ts`).
4. In parallel: row in Supabase, copy to Basin, email to the concierge (reply-to = client),
   Telegram alert, confirmation email to the client in their language.
5. The visitor sees the thank-you page as soon as **at least one** of database, Basin,
   concierge email or Telegram worked. If all fail, the form asks them to use WhatsApp.

## Testing after setup

On the Netlify preview, send a test request and check, within 30 seconds:
a new row in Supabase, the concierge email, the Telegram alert, and the client
confirmation. Then delete the test row.
