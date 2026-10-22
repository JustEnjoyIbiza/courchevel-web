# Project resume: read this first in a new session

Last updated **22 October 2026**, end of Phase 5 prep. This file replaces re-reading the
whole history. Rules live in `CLAUDE.md`; the owner's open items in `docs/owner-checklist.md`.

## In one paragraph

Rebuild of courchevelluxuryconcierge.com (old one-page site, archived in `audit/`) as a
bilingual EN/FR Astro 7 site on Netlify, built for leads, Google and AI assistants.
Phases 0–5 are built and committed. **Nothing is pushed to GitHub or deployed:** the live
site is still the old one. Launch is planned for **Tuesday 24 November 2026** (season opens
4 December). What is left is mostly the owner's: accounts, access, facts, then About and legal pages.

## Where the work is

- Repo: this folder, branch **`rebuild/phase-0-setup`**, remote `JustEnjoyIbiza/courchevel-web`
  (no push access yet). `main` = old site, which Netlify serves in production.
- Backup of the whole repo (all branches, history): `../courchevel-web-backup-2026-10-22.bundle`
  (restore: `git clone <bundle> courchevel-web`).
- Plans (source of truth): `../Courchevel_Concierge_Website_Plan.pdf`,
  `../Courchevel Concierge — Client Acquisition Plan.pdf`.

| Commit | What |
|---|---|
| d536f4f | Phase 0: audit of the old site, Astro setup, CLAUDE.md, business.ts |
| 7ebfc87 | Phase 1: Direction A "Ivory & Brass" design system, homepage EN/FR |
| 91fd520 | Phase 2: 12 services, villages, guides, FAQ, About, experiences |
| 9d8ed29 | Phase 3: 3-step lead form, Netlify Function, Supabase, Resend, Telegram, Turnstile |
| 12b7f8a | Phase 4: robots, llms.txt, sitemap lastmod, IndexNow, CSP, redirects |
| e72e031 | Audit fixes, new planning pages, Méribel/Val Thorens, Google reviews, Instagram |
| 256e2c5 | Phase 5: launch plan, DNS checklist, launch-check script |

## How to work here

```
export PATH="$HOME/.local/node/bin:$PATH"   # Node 24, not on the default PATH
npm run qa            # build + tests + static + schema checks (must be 0 failures)
npm run qa:content    # editorial rules on src/content
node scripts/qa/link-graph.mjs dist   # internal-link graph
npx astro preview --port 4321         # serve dist locally
npm run qa:launch -- <url> [--production]  # only on Netlify (preview or production)
```

Lighthouse and browser checks used scripts kept outside the repo; re-create if needed
(Lighthouse mobile per sitemap URL; puppeteer-core with `/Applications/Google Chrome.app`).
Commits: author "Alin Letca" <alin.letca2010@gmail.com>, ending with the Co-Authored-By line.

## State of quality (22 Oct)

- 77 pages built (74 indexable, EN + FR pairs). Lighthouse mobile **74/74 pass** (perf 97–100,
  others 100, LCP ≤ 2.4 s). Static 3,987 checks, schema, content lint, link graph: 0 issues.
  14 function tests pass. CSP: no violations. No horizontal scroll down to 320 px.
- Full audit and Lighthouse table: `docs/audit-2026-10-22.md`.

## Key decisions already made (do not reopen)

- Direction A "Ivory & Brass"; no prices anywhere; no invented facts/reviews; heli-skiing only
  as Italy/Switzerland day trips.
- Owner (22 Oct): build everything without stopping between phases; collect questions in
  `owner-checklist.md`; About and legal pages last; leads not needed for 1–2 weeks.
  **Always ask before touching the live site, DNS, accounts or a production deploy.**
- Canonical host is **www**. Netlify primary domain must be switched to www before merging
  (otherwise a redirect loop with `netlify.toml`).
- Google Business Profile is the owner's 5.0★ / 14 reviews profile: Place ID
  `ChIJPRJmAL2Kv4ARuPyRohUWW9M`, CID `15229790847061064888`. (4.6★ was a competitor,
  "Courchevel Concierge Since 1987"). Rating is never hard-coded: shown live from the
  Places API when `GOOGLE_PLACES_API_KEY` is set; no AggregateRating schema.
- `/reviews/` and `/partners/` build only when real data exists.
- `/review` and `/avis` 302 to Google's write-a-review box.

## Facts found that matter

- Domain at **GoDaddy, expires 30 Nov 2026** → owner must renew (top of the checklist).
- DNS already points to Netlify (apex A 75.2.60.5, www CNAME courchevel-luxury-concierge.netlify.app):
  no DNS change for the site; only email records (Resend) — see `docs/launch-plan.md` §3.
- A Google site-verification TXT exists → a Search Console property exists; owner unknown.
- Instagram bio mixes Ibiza; profile fixes in `docs/platform-profiles-kit.md`.
- Reviews mention "Iván": maybe the founder (asked in the checklist).

## Next steps (in order)

0. **Owner's request for the next session (22 Oct): start with these two builds.**
   - Homepage quick-start: dates + village + group size near the hero, continuing into
     `/enquire/` with those fields pre-filled (EN + FR, works without JavaScript, keep
     Lighthouse ≥ 95 and the CSP intact).
   - Guide "A week in Courchevel 1850" (EN + FR, `src/content/guides/`): a day-by-day example
     of a stay arranged by us, clearly labelled as an example, no prices, no invented clients,
     linked from the 1850 village page, the home guides section and related services.
   Then run every gate (`npm run qa`, `qa:content`, link graph, Lighthouse on home and the guide).
   - **Personal-touch question sheet** (`docs/personal-touch-questions.md`): 2–3 questions per
     page, in priority order (About, homepage, 12 service pages, village pages; guides/FAQ only
     a fact check). The owner answers by voice notes or rough notes (EN, FR or ES); we then weave
     the answers into the pages in the owner's voice, anonymised, keeping every gate passing.
     Why: first-hand experience is what Google (E-E-A-T) and AI assistants reward and what
     persuades clients; it is not a full rewrite.

1. **Waiting on the owner** (`docs/owner-checklist.md`, "Needed to launch"): domain renewal,
   GitHub push access, Netlify access, lead accounts (`docs/lead-system-setup.md`), legal facts,
   About facts, Search Console access.
2. **About page** (`src/content/pages/{en,fr}/about.md`) once founder facts arrive.
3. **Legal pages**: mentions légales, privacy policy, cookie policy (EN/FR), linked from the
   footer and the form consent. Need entity name, SIRET, VAT, directeur de la publication,
   address, Netlify host details.
4. **Preview** (~16 Nov): push branch, open PR, run `qa:launch` on the deploy preview, test lead.
5. **Launch day** 24 Nov: follow `docs/launch-plan.md` §5.2 — only with the owner's go-ahead.
6. **Conversion improvements** from `docs/competitor-review-2026-10-22.md` (ranked list):
   homepage quick-start form and "A week in 1850" example guide can be built now;
   rating, founder, real anonymised requests and fee model need the owner.
7. After launch: daily build hook (Google reviews refresh), Search Console/Bing, off-site plan
   (audit §7), AI prompt test at day 30.

## Docs map

| File | Use |
|---|---|
| `CLAUDE.md` | Rules, stack, structure, QA, protocol |
| `docs/owner-checklist.md` | Everything waiting on the owner |
| `docs/launch-plan.md` | DNS, Netlify, deploy, rollback |
| `docs/competitor-review-2026-10-22.md` | 6 competitors scored, ranked conversion improvements |
| `docs/audit-2026-10-22.md` | Audit findings, competitors, off-site plan, Lighthouse table |
| `docs/platform-profiles-kit.md` | Same identity on Google, Instagram, other platforms |
| `docs/lead-system-setup.md` | Creating Supabase, Resend, Telegram, Turnstile |
| `docs/missing-facts.md` | Facts still unknown (Phase 0) |
| `docs/phase-N-report.md` | What each phase built and checked |
| `audit/` | Snapshot of the old site (do not edit) |
