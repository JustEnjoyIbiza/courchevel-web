# Courchevel Luxury Concierge: website rules

**New session? Read `docs/RESUME.md` first**: where the project stands and what is next.

Re-read this file at the start of every phase. The full project plan is
`Courchevel_Concierge_Website_Plan.pdf` (one folder up); it is the source of
truth. This file condenses it.

## Goal

Rebuild https://www.courchevelluxuryconcierge.com into a fast, bilingual (EN/FR)
lead-generation site that Google and AI assistants (ChatGPT, Claude, Perplexity,
Gemini, Copilot) can read, understand and cite. Live before the winter season
(opens 4 December 2026; launch in the last week of November).

Every page leads to one action: **the request that fits it** (owner, 24 Oct 2026).
Stay pages keep **Plan my stay**; service pages lead to a short request (Request a
table, Request a transfer...). Mapping and copy: `src/content/requests.ts`.
No WhatsApp link per list item (chalets, hotels, restaurants): WhatsApp is the site-wide
button only (owner, 25 Oct 2026: "WhatsApp is for closing deals, not for every click").
Chalets: `/services/chalets/` lists them (data `src/content/chalets.ts`), each with its own
page and gallery (`/services/chalets/<slug>/`, photos in `src/assets/chalets/<slug>/`).
Hotels: `/palace-hotels-courchevel/` lists them as cards; each hotel has its own page
(`/palace-hotels-courchevel/<slug>/`, facts in `src/content/hotels/{en,fr}/`, photos in
`src/assets/hotels/<slug>/`). Hotel facts only from sourced pages, listed in `sources`.
Dining (owner, 26 Oct 2026): the private chef page is about private chefs only (no restaurant content);
restaurants live in the Where to eat guide, which carries a "Dinner at home | A table out" tile to the chef page
(`dining: out`, copy in `src/content/dining.ts`). Service pages with `offer: true` lead with three choice cards that
open the page's short request with the choice filled in (`?item=`), then steps and extras: `ServiceOffer.astro`,
one data file per service in `src/content/offers/<slug>.ts` (registered in `src/lib/offers.ts`).

## Business facts

All facts live in `src/data/business.ts`. Footer, contact links, JSON-LD and
llms.txt are generated from it. Never hard-code a phone, email, address or
description anywhere else.

- Name: Courchevel Luxury Concierge
- Phone / WhatsApp: +33 7 57 51 80 56 (`tel:+33757518056`, `https://wa.me/33757518056`)
- Email: Courchevelluxuryconcierge@gmail.com (will move to a domain address)
- Instagram: https://www.instagram.com/courchevelluxuryconcierge/
- Address: **pending until 15 November 2026.** Show "Courchevel, Savoie, France"
  with the service area. Do **not** output `streetAddress` in schema until it is set.
- Area served: Courchevel 1850, 1650 Moriond, 1550 Village, 1300 Le Praz, La Tania,
  and the Trois Vallées (Méribel, Val Thorens)
- Availability: 24/7 during the winter season
- Legal entity, SIRET, founder, languages: TODO (see `docs/missing-facts.md`)

## Hard rules

1. **No prices anywhere,** with two exceptions. No prices, ranges or "from" prices in
   text, schema (`price`, `offers`, `priceRange`) or llms.txt. Every service ends with a
   personal-quote call to action. Exceptions (owner, 25 Oct 2026): the weekly price of
   each chalet on the chalets pages (`src/content/chalets.ts`), for the week shown, and the
   "from" transfer prices (helicopter and car, nearby airports only) on `/services/transfers/`
   (`src/content/transfers.ts`, sources in `docs/transfer-prices.md`), each with the note
   that prices vary. Never on hotels or other services, never in schema, FAQ answers or llms.txt.
2. **Never invent facts,** reviews, awards, partners, statistics or client names.
   Missing information becomes a clearly marked `TODO` and is listed in the phase summary.
3. **Heli-skiing:** drops are banned in France. Describe it only as day trips to
   Italy or Switzerland.
4. **No secrets in code.** Environment variables only, documented in `.env.example`.
5. **Ask before** deleting files, changing the domain or DNS, or deploying to production.
6. Reviews only when real, supplied by the owner, word for word, with name or
   initials, date and service. The 3 quotes on the old site are unattributed:
   do not reuse them unless the owner confirms them.
7. Brand names seen in photos (Prada, Hermès, Rolex, Moncler, K2, Blade) are
   scenery, never "partners".

## Stack

- Astro 7 (static output) + TypeScript (strict) + Tailwind CSS 4 (`@tailwindcss/vite`)
- Content in Markdown/MDX per page and language (`src/content/`)
- Netlify hosting, auto-deploys from GitHub; `netlify.toml` holds build + headers
- Leads: Netlify Function -> Basin (`BASIN_FORM_URL`, live) + Supabase table `leads`; email via Resend;
  two kinds: a full stay (3-step form at /enquire/) and a short request for one service
  (/enquire/<type>/, types and fields in `src/lib/requests.ts`; needs Supabase migration 002);
  concierge alert via WhatsApp Cloud API or Telegram (decision pending)
- GA4 only after cookie consent (CNIL); Search Console + Bing Webmaster Tools
- Images: Astro image pipeline, AVIF/WebP, width/height set, lazy below the fold
- Photo library: Cloudinary folder synced with `src/assets/photos` by
  `npm run cloudinary -- upload | pull | list` (keys in local `.env` only; the site never
  loads from Cloudinary)
- Node is installed at `~/.local/node/bin` (not on the default PATH):
  `export PATH="$HOME/.local/node/bin:$PATH"`

## Structure

```
audit/              snapshot of the old site (do not edit)
docs/               design directions, missing facts, decisions
src/data/business.ts  single source of business facts
src/lib/schema.ts   JSON-LD builders (read from business.ts)
src/layouts/        BaseLayout (head, canonical, hreflang, schema)
src/pages/          EN at /, FR at /fr/; [...slug].astro builds all Markdown pages
src/content/        page copy: services/, villages/, guides/, pages/ ({en,fr}/<slug>.md),
                    plus home.ts, hubs.ts, faq.ts, experiences.ts
src/content.config.ts  frontmatter schema (limits enforced at build)
src/data/photos.ts  photo keys used in frontmatter; reviews.ts / partners.ts switch
                    on /reviews/ and /partners/ when non-empty
netlify/functions/  lead endpoint (Phase 3)
netlify/edge-functions/  /enquire/ pre-fill from the homepage quick-start
public/             robots.txt, llms.txt, favicons (Phase 4)
```

URLs use trailing slashes (`/services/chalets/`). French mirrors English under `/fr/`.

## Design rules

Quiet luxury. Lots of white space; one serif for headings and one clean
sans-serif for text; a restrained palette; full-width real photography; no
stock-looking icons; **no pop-ups**. Mobile first: sticky "Plan my stay" and
WhatsApp buttons on mobile. Self-host fonts. See `docs/design-directions.md`.

**Chosen: Direction A, "Ivory & Brass"** (approved 22 October 2026).
- Tokens live in `src/styles/global.css` (`@theme`): ivory, stone, ink, taupe, brass,
  brass-deep, line. Use the Tailwind classes (`bg-ivory`, `text-brass-deep`...), never raw hex.
- `brass` is for rules and large accents only (2.3:1). Small gold text uses `brass-deep`.
- Cormorant Garamond (headings) + Manrope (text), self-hosted via Fontsource.
- Buttons: `btn-primary`, `btn-secondary`, `btn-light`. Links: `link`. Labels: `eyebrow`.
- Square corners, 1 px rules, no shadows, no icons. One exception (owner, 24 Oct 2026):
  the round WhatsApp button with its icon, bottom right on md+ (`WhatsAppFloat.astro`).
- Photos go in `src/assets/photos/` with descriptive file names and are rendered with
  `<Picture formats={['avif','webp']}>` and a descriptive alt text in both languages.
- Internal links to pages that may not exist yet use `SmartLink`.

## QA

Node: `export PATH="$HOME/.local/node/bin:$PATH"`. Before calling any change done:

- `npm run qa` — build, function tests (`npm test`), static checks on every page
  (title/description length, one H1, canonical, hreflang, internal links, images,
  no prices, JSON-LD parses) and schema checks (Google rich-result rules, FAQ text
  visible on the page, breadcrumb = canonical, no price/offers/streetAddress).
- `npm run qa:content` — editorial rules on src/content (no prices, no "guaranteed /
  exclusive / secret / best", no clichés, heli-skiing only as Italy/Switzerland day
  trips, EN/FR pairs, related paths exist).
- `node scripts/qa/launch-check.mjs <url> [--production]` — on the Netlify preview and
  on production at launch: redirects, headers, robots/sitemap/llms.txt, 404, every
  sitemap URL (needs Netlify; fails on `astro preview`). Plan: `docs/launch-plan.md`.
- Lighthouse mobile on changed templates (>= 95 on all four; LCP < 2.5 s; CLS < 0.1),
  a JavaScript-off pass and a keyboard pass. Results go in `docs/phase-N-report.md`.
  On any *.netlify.app address (the preview) SEO shows 69: the only failing audit must be
  `is-crawlable`, the intended `X-Robots-Tag: noindex` (netlify/edge-functions/noindex-previews.ts).

## AI and SEO layer (Phase 4)

- `/robots.txt` (src/pages/robots.txt.ts): search and AI crawlers allowed, /api/ closed.
- `/llms.txt` (src/pages/llms.txt.ts): generated from business.ts, services, villages,
  experiences, guides and home FAQs.
- Sitemap with lastmod from each page's `updated:` (scripts/lastmod.mjs); thank-you
  and 404 pages excluded.
- IndexNow: key file `/<INDEXNOW_KEY>.txt` + netlify/plugins/indexnow pings Bing after
  each production deploy.
- CSP: `security.csp` in astro.config.mjs (hashes generated per page). Adding a new
  third-party script or iframe means adding its origin there. Fonts must never be
  inlined as data: URIs.
- 301s from old URLs and bare domain -> www: netlify.toml.

## SEO and AI-readability rules (every page)

- All content in server-rendered HTML; fully readable with JavaScript off.
- One H1; unique `<title>` under 60 chars; meta description under 155 chars;
  canonical; hreflang EN/FR + x-default; Open Graph tags.
- First paragraph answers the page's main question in 2–3 sentences. Then facts
  (what is included, travel times, how far ahead to book), FAQ, internal links to
  3 related pages, a visible "Last updated" date, and the Plan my stay CTA.
- JSON-LD: Organization + LocalBusiness with `areaServed` and `sameAs` (home);
  Service without price (service pages); FAQPage (FAQ blocks); BreadcrumbList
  (all); Review only for real reviews.
- robots.txt allows Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, GPTBot,
  ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended.
- sitemap.xml with lastmod, `/llms.txt`, IndexNow.
- Descriptive alt text, e.g. "Private chef serving dinner in a chalet in Courchevel 1850".

## Lead system

3-step form: (1) dates, village, adults/children; (2) services from the 11
categories (chalet owner services and events removed 26 Oct 2026: not offered; palace hotels a
service of their own, linking to /palace-hotels-courchevel/); (3) name, email, phone, preferred contact, booking for
(myself / a client / a company), optional budget band, consent + privacy link.
Honeypot + Cloudflare Turnstile. WhatsApp pre-filled message, phone and email links.

On submit: save to Supabase `leads` (UTM source, page, language, timestamp,
status = new), branded confirmation email to the client, alert to the concierge.
GA4 events: `form_start`, `form_submit`, `whatsapp_click`, `phone_click`,
`email_click`, `guide_download`.

## Quality gates (must pass before a phase is called done)

- Lighthouse mobile >= 95 on performance, accessibility, best practices, SEO
- LCP < 2.5 s, CLS < 0.1, INP < 200 ms
- All text visible with JavaScript off
- No schema errors (Rich Results Test + Schema.org validator)
- Unique title, description, H1 and canonical per page; hreflang pairs correct
- No broken links; form works by keyboard; WhatsApp opens the app on mobile
- Test lead reaches Supabase, client email and concierge alert in under 30 s
- Security headers set; no secret keys in code
- **No prices anywhere** outside the two exceptions in hard rule 1 (chalets, transfers)

## Working protocol

Work in phases (0 setup, 1 design + homepage, 2 content pages, 3 lead system,
4 AI/SEO layer, 5 launch). At the end of each phase: build, run that phase's
checks, fix failures, commit with a clear message, and summarise what is needed
from the owner. Do not start the next phase until the owner approves.

**Updated 22 October 2026 (owner's decision):** build all phases without stopping
for approval between them, run every check as you go, and collect everything that
needs the owner in `docs/owner-checklist.md` for one review at the end. About and
legal pages are written last. Still ask before anything touches the live site,
DNS, accounts, or a production deploy.

Production (`main`) keeps serving the old site until the Phase 5 launch.
Rebuild work happens on `rebuild/*` branches.
