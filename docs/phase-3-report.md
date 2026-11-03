# Phase 3 report: lead system

22 October 2026.

## What was built

- **Plan my stay form** (`/enquire/`, `/fr/enquire/`): 3 steps (stay, services, details) with the plan's fields: dates (+ flexible), village, adults, children and ages, the 12 services, booking for (myself / client / company), free-text budget, message, name, email, phone, preferred reply channel, consent. WhatsApp, phone and email alongside.
  - With JavaScript: one step at a time, inline errors that clear when fixed, pre-selection from `?service=` and `?experience=` (every service page and experience links with it), JSON submit.
  - Without JavaScript: one long form with native validation, normal POST, redirect to the thank-you page.
- **Thank-you pages** (`/enquire/thanks/`, FR), not indexed and not in the sitemap.
- **Netlify Function** `netlify/functions/lead.mts` (`POST /api/lead`): honeypot, minimum fill time, Cloudflare Turnstile, shared validation (`src/lib/lead.ts`), then in parallel: Supabase insert, concierge email (reply-to = client), Telegram alert, branded client confirmation in EN or FR. Succeeds when at least one of database / concierge email / alert worked.
- **Supabase table**: `supabase/migrations/001_leads.sql` (status pipeline, follow-up date, notes, UTM/page/language, consent timestamp, Row Level Security on).
- **Analytics**: GA4 loads only after cookie consent; banner appears only once `PUBLIC_GA4_MEASUREMENT_ID` is set. Events: form_start, form_submit, whatsapp_click, phone_click, email_click. First-touch UTM (or the referring site, e.g. chatgpt.com) is stored for the visit and attached to the lead.
- Sticky mobile bar shows WhatsApp only on the form and thank-you pages.

## Quality gates

| Gate | Result |
|---|---|
| Function tests (`npm test`): valid lead, FR confirmation, honeypot, too-fast, invalid input, no-JS post, partial outage, total outage, not configured, Turnstile, HTML escaping, validation rules | **12/12 pass** |
| Browser test with JS: pre-selection, step errors, step navigation, submit, thank-you page, lead stored with UTM and page | **Pass** |
| Browser test without JS (FR): all steps visible, POST, redirect, lead stored with page | **Pass** |
| Lighthouse mobile `/enquire/` and `/fr/enquire/` | **98 / 100 / 100 / 100**, LCP 2.0 s, CLS 0–0.015 |
| Static checks on all 60 pages | **Pass** (2,796 checks) |
| Test lead reaches database, email and alert in < 30 s | **Not yet**: needs the real accounts (`lead-system-setup.md`) and a Netlify preview |

Thank-you pages score 63 for SEO in Lighthouse only because they are deliberately `noindex`.
