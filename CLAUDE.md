# Courchevel Luxury Concierge: website rules

Re-read this file at the start of every phase. The full project plan is
`Courchevel_Concierge_Website_Plan.pdf` (one folder up); it is the source of
truth. This file condenses it.

## Goal

Rebuild https://www.courchevelluxuryconcierge.com into a fast, bilingual (EN/FR)
lead-generation site that Google and AI assistants (ChatGPT, Claude, Perplexity,
Gemini, Copilot) can read, understand and cite. Live before the winter season
(opens 4 December 2026; launch in the last week of November).

Every page leads to one action: **Plan my stay**.

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

1. **No prices anywhere.** No prices, ranges or "from" prices in text, schema
   (`price`, `offers`, `priceRange`) or llms.txt. Every service ends with a
   personal-quote call to action.
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
- Leads: Netlify Function -> Supabase table `leads`; email via Resend;
  concierge alert via WhatsApp Cloud API or Telegram (decision pending)
- GA4 only after cookie consent (CNIL); Search Console + Bing Webmaster Tools
- Images: Astro image pipeline, AVIF/WebP, width/height set, lazy below the fold
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
- Square corners, 1 px rules, no shadows, no icons.
- Photos go in `src/assets/photos/` with descriptive file names and are rendered with
  `<Picture formats={['avif','webp']}>` and a descriptive alt text in both languages.
- Internal links to pages that may not exist yet use `SmartLink`.

## QA

Run before calling a phase done (Node on PATH, `npm run build`, then `npx astro preview`):
Lighthouse mobile on every page, the static checks (titles, descriptions, H1, canonical,
hreflang, links, schema, prices, images), a JavaScript-off pass and a keyboard pass.
Results go in `docs/phase-N-report.md`.

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

3-step form: (1) dates, village, adults/children; (2) services from the 12
categories; (3) name, email, phone, preferred contact, booking for
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
- **No prices anywhere**

## Working protocol

Work in phases (0 setup, 1 design + homepage, 2 content pages, 3 lead system,
4 AI/SEO layer, 5 launch). At the end of each phase: build, run that phase's
checks, fix failures, commit with a clear message, and summarise what is needed
from the owner. Do not start the next phase until the owner approves.

Production (`main`) keeps serving the old site until the Phase 5 launch.
Rebuild work happens on `rebuild/*` branches.
