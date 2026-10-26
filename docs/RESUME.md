# Project resume: read this first in a new session

Last updated **25 October 2026** (sessions of 23–25 Oct, see below). This file replaces re-reading the
whole history. Rules live in `CLAUDE.md`; the owner's open items in `docs/owner-checklist.md`.

## In one paragraph

Rebuild of courchevelluxuryconcierge.com (old one-page site, archived in `audit/`) as a
bilingual EN/FR Astro 7 site on Netlify, built for leads, Google and AI assistants.
Phases 0–5 are built and committed. **Nothing is pushed to GitHub or deployed:** the live
site is still the old one. Launch is planned for **Tuesday 24 November 2026** (season opens
4 December). What is left is mostly the owner's: accounts, access, facts, then About and legal pages.

## Session of 25 October 2026

- f803a48: homepage hero line "The whole stay. Or just tonight." and a new intro that no longer
  repeats the brand name (owner's idea, EN/FR). On the preview.
- The owner wants a candid strategist, not an executor: challenge weak ideas, recommend one option,
  keep facts apart from judgment.
- **Telegram alerts, stopped halfway (owner had no Telegram access).** Built `npm run telegram --
  chats | test` (`scripts/telegram.mjs`); `.env` has empty `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID`
  lines. Next: owner creates the bot with @BotFather and a group "CLC Leads" with the bot in it, pastes
  the token in `.env` (TextEdit: no code editor on this Mac); then `chats` gives the group id, `test`
  sends a sample alert; then both variables in Netlify (token as a secret, Production, Deploy Previews,
  Branch deploys), redeploy the preview with `--skip-functions-cache`, one test request (ask first).
- Checked in Netlify (25 Oct): only `BASIN_FORM_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` are
  set. No alert, no Turnstile, no client email (Resend needs the domain email) yet.
- Agreed priorities after Telegram: Turnstile; the legal notice and privacy pages (neither exists; need
  the company details); founder and real reviews for trust; a "Just one thing?" row of request links
  under the homepage dates form (proposed, not built). Domain expires **30 Nov**: owner to renew.
- **Chalets page rebuilt for skimming:** the five official Palaces (Atout France list of 2 June 2026) and
  five five-star hotels (Aman Le Mélézin, Le Lana, Sivolière, Le Strato, Annapurna; star ratings from the
  Atout France register), each with the hotel's own photo (owner's OK; sources in `docs/photo-credits.md`)
  and an "Ask about this hotel" button that opens Plan my stay with the name in the message (`?item=`,
  edge function + script). Body cut to three steps. `highlights` is now a list of up to 3 sections.
  White 1921 (4★) and Les Grandes Alpes (closed since the fire of 27 Jan 2026) left out.
- **Chalets built (later on 25 Oct):** 14 chalets and apartments from the owner's agency brochures
  (`src/content/chalets.ts`): cards on `/services/chalets/` grouped by village, each card opening its
  own page `/services/chalets/<slug>/` with 10-16 photos (`src/assets/chalets/<slug>/`, room in the
  file name gives caption and alt). Weekly price for the week shown, with the note that prices vary:
  the only prices on the site (hard rule 1 updated; static check allows `[data-price]` only on chalet
  pages and only with `[data-price-note]`). One action per chalet: Check availability (Plan my stay
  with the name). Agency brochures and the commission note stay private.
- **Hotels moved to their own page** `/palace-hotels-courchevel/` (pages collection); the chalets
  page is chalets only. Homepage chalets tile split in two halves: Chalets | Palace hotels.
- **No WhatsApp per list item** anywhere (owner): only the site-wide button.
- Agency OK (it offered the brochures); owner checked the chalet pages on a phone. Capucine photos
  confirmed real. Open: ~70 MB of chalet photos in the repo; galleries could later get a lightbox.
- **Hotel pages built (later on 25 Oct):** the hotels page is now cards (5 palaces, 5 five-star
  hotels), each opening its own page with facts, restaurants, facilities, a gallery (3-15 official
  photos) and one Ask about this hotel button; no prices, no per-hotel WhatsApp. Facts from three
  research passes, each with sources in the file; uncertain items left out. Open: written OK from
  each hotel's press team; L'Apogée has only 3 photos (its site blocks access); Sivolière's room
  photos predate the relaunch.
- **Plan (owner, 25 Oct):** finish and polish everything here during the week of 26 October; move to
  GitHub only once it is all polished. Until then the work lives only on this Mac (latest full backup:
  `../courchevel-web-backup-2026-10-26.bundle`, at ab6c462, verified by a test restore; make a new one after each big session).
- **Telegram paused (26 Oct):** the owner's phone is in another city. The bot "CLC Alerts" exists and
  the owner said hello to it, but the token is not in `.env` or Netlify. When resuming: steps in
  `docs/lead-system-setup.md` (private chat works; `npm run telegram -- chats`). If the token was seen by
  anyone else, send /revoke to @BotFather for a new one. Stopgap meanwhile: Gmail app notifications on
  the phone for Basin's lead emails, so the 15-minute promise holds.
- Owner renews the domain on Monday 26 Oct.
- **26 Oct, legal pages:** legal notice, privacy policy and cookie policy written (EN/FR, pages collection,
  `legal:` frontmatter renders `LegalFacts.astro` from `business.legal`). Company details still missing show
  "To be confirmed" ([data-pending]); `launch-check.mjs` fails until they are filled. GA cookies capped at 13
  months. Owner list and three regulatory questions in `docs/owner-checklist.md` (Legal pages).
- **26 Oct:** homepage "Just one thing?" links under the dates form (table, transfer, instructor,
  chef, something else). Lighthouse mobile on the preview (performance / accessibility / best
  practices / SEO): home 98/100/100/100, chalets 98/100/100/100, chalet page 98/100/100/100, hotels
  99/100/100/100, hotel page 99/100/100/100; LCP 1.7-2.1 s, CLS 0, TBT 0 ms.
- **Transfers page rebuilt (owner, 25 Oct: "the prices are mostly fixed"):** `/services/transfers/` shows each
  route with helicopter time and price per helicopter and road time with V-Class / S-Class prices.
  Data `src/content/transfers.ts`, components `TransferRoutes.astro` / `JetBand.astro` (`transfers: true`),
  sources `docs/transfer-prices.md`. Second price exception in hard rule 1.
  Prices are **market references** until the owner confirms (`pricesConfirmed`); the page shows a Draft line and
  the launch check fails until then. Each row opens the transfer request with from/to filled in (`?from=&to=`).
  Body cut to three short sections. **Then trimmed (owner, same day):** only the nearby airports a helicopter
  flies from (Geneva, Chambéry, Lyon, Grenoble, Annecy, Sion), Milan/Turin and four resorts folded (`<details>`,
  rows in `TransferRouteList.astro`); the jet table became a short band without prices (`JetBand.astro`).
  **Prices re-checked (owner found them inflated, 25 Oct):** second pass on live pages only. Cars now at the median
  of ~30 companies' premium fares (were 15-85% above it); helicopters at the lowest current H125 price (were
  Héli Sécurité's October grid, up to 31% above 2026/27 broker prices). Méribel (€600) and Val Thorens (€990) helicopter prices added. Tables in
  `docs/transfer-prices.md`. Owner confirmed them the same day ("we can change later"): `pricesConfirmed = true`, no draft line.
  Getting to Courchevel guide corrected: Geneva 2 h 15-2 h 45, Lyon 2 h 20-2 h 50,
  Milan 4 h 30-5 h by road and 50 min-1 h by helicopter, runway 536 m, slope up to 18.5%, no non-Schengen flights.
- **26 Oct, private chef page rebuilt** (owner: shorter, clearer, better conversion; keep the restaurant guide
  separate): three format cards (One dinner / Every evening / Full board), each opening the chef request with the
  format in a new "Format" field (`?item=`); three steps; four "around the table" lines. Then (owner, same day):
  the chef page is chefs only, titled "Private chef in Courchevel" (menus: "Private chef"); no restaurant tile, FAQ
  or link there. The "Dinner at home | A table out" tile stays on Where to eat only (`dining: out`). Body cut to two
  short sections; restaurant prose removed. Lighthouse mobile 99/100/100/100. Waiting on the owner: chef and food
  photos, one or two real menus, how chefs are charged (per dinner or per day, groceries). Each chalet page now
  has "Add a private chef" under Check availability (chef request with the chalet in "Where are you staying?", `?staying=`).
- **26 Oct, chalet owner services removed** (owner: not offered): `/services/owners/` deleted (EN/FR), the service
  dropped from `src/data/services.ts` (11 services now; Plan my stay lists 11 categories), the services-hub line
  "Own a chalet in Courchevel?", the request mapping, hub story, and the staff page's related link (now childcare).
  "Twelve kinds of service" became eleven. Household staff for owners stays on the staff page.
- **26 Oct, events and corporate groups removed** (owner: not offered): `/services/events/` and
  `/corporate-retreats-courchevel/` deleted (EN/FR), the "event" request type and `/enquire/event/` removed, the
  Corporate Retreat package dropped from Experiences, footer and hub links removed, the 50-word business
  description no longer says "events" (update it on Google and other profiles too). FAQ: the birthday / proposal /
  company event question removed, "Can you organise a private party in our chalet?" kept (owner); topic renamed
  "Nightlife and parties". 10 services now. Related links repointed (staff, childcare, Where to eat, Christmas page).
- **26 Oct, services page cut down** (owner: it repeated the homepage): `/services/` is now the stage-by-stage list
  of all 10 services, each with a small photo, name, italic line and one-sentence description, the whole row linking
  to the service; the three large chapters and the photo tiles are gone (`HubPage.astro`). Mobile ~11,700 → ~6,500 px.
- **26 Oct, Palace hotels a service of their own** (owner: like the homepage tile): "Chalets" (→ `/services/chalets/`)
  and "Palace hotels" (→ `/palace-hotels-courchevel/`, `path` in `src/data/services.ts`, links via `servicePath()`).
  11 services; Plan my stay has a Palace hotels choice; hotel pages and the hotels page tag requests `palace-hotels`.
  Body links that said "chalets and palace hotels" now link to both pages. The homepage index skips Palace hotels
  (it is the second half of the chalets tile).
- **26 Oct, homepage audit and the final plan:** `docs/homepage-and-visibility-plan.md` (new homepage order, on-site
  SEO and AI fixes incl. three contradictions found, off-site steps for the owner, monthly measuring, timeline to
  launch). **Parts 1 and 2 built on the preview the same evening:** hero with one H1 ("Luxury concierge in
  Courchevel" small + "The whole stay. Or just tonight."), one button and a WhatsApp text link; the phone bar
  waits until the hero has scrolled away (`ctaAfter`, MobileCTA); a ~45-word introduction naming the company
  once + one trust line (Google rating, reply time, 24/7, based in Courchevel); the dates form moved after "How
  it works"; "About us" with a Google rating card (live via Places API, else `profiles.google.rating` with its
  date; launch check fails after 45 days), founder and quotes slots; villages and four guides as link rows;
  FAQ gains "What does a luxury concierge in Courchevel do?". Fixes: prices wording (About, FAQ, How to choose),
  Méribel 45 km / ~1 h, carousel gutter, counters (and "12 services") removed, noindex on *.netlify.app
  (edge function + tests).
- **26 Oct, consistency sweep and owner kits:** llms.txt no longer says "no published prices" (guide prices for
  chalets and transfers); legal notice mentions transfer prices; "private events" / "single events" wording removed
  (1850 village page, staff page, vs-hotel-concierge guide). `docs/platform-profiles-kit.md` rewritten for the 11
  services (GBP description EN/FR, services, four December posts, review requests and replies, courchevel.com text,
  partner and press messages). Monthly AI visibility test set up in `docs/ai-visibility/` (22 fixed questions,
  answer log CSV, routine; results only from the owner's runs).
- **26 Oct, service pages, same treatment as the chef page (owner):** the chef block became reusable:
  `ServiceOffer.astro` + one data file per service in `src/content/offers/<slug>.ts` (registered in
  `src/lib/offers.ts`), shown with `offer: true`; cards open the page's request with `?item=` (a card may open
  another request, e.g. heli-skiing → experience). **Private ski and mountain done:** cards Private lessons,
  Off-piste with a guide, A heli-skiing day (Italy or Switzerland); steps; extras (passes, equipment, boot fitting,
  lunch on the slopes); instructor request gains a "Lessons or guide" field; body 488 → 251 words, facts 4,
  "includes" removed. Next: experiences, nightlife, staff, childcare, wellness, lifestyle.
- Where to eat: Sylvestre Wahid (destroyed by the fire, no reopening announced, still 2★ in the guide)
  replaced in the ten tables by Matsuhisa at Les Airelles; marked closed in the Michelin table. Aman's
  restaurant is Akari (not Nama). The unused `sylvestre-wahid-dish.jpeg` is still in the repo (ask before
  deleting). Owner to confirm Le Strato and Annapurna, and Matsuhisa under "places our guests ask for".

## Session of 23–24 October 2026 (owner working live, preview updated after each step)

All committed on `rebuild/phase-0-setup`, deployed to the private preview, nothing pushed.

| Commit | What |
|---|---|
| 11b644c | Cloudinary photo library sync (`npm run cloudinary -- upload \| pull \| list`, keys in local `.env`) |
| 552bf1c | 18 owner photos on service, guide and planning pages (EN/FR alt text) |
| f762c3a, ae2e71c | WhatsApp button pinned bottom right on md+, round with icon (owner's design exception) |
| 058e2d8 | Plan my stay opens on step 2 when the homepage quick-start answered step 1 |
| f07529c | Concierge-checklist guide off the homepage, rewritten to lead with how we work |
| eee6d3e | Named venues: 13 hotels (chalets page), tables guests ask for (nightlife), balloon + horse riding |
| 7ee32b7, 67eb355, 612f9d5 | Where to eat: "Ten tables to know" right after the answer, a photo for each (credits in `docs/photo-credits.md`); Barrière Les Neiges is now Fouquet's Courchevel |
| 53346d6 | Calls to action per page + 10 short request forms (`/enquire/<type>/`), see `src/content/requests.ts` |
| a8882e1 | Supabase connected (new Courchevel project, migrations 001 + 002, test lead saved) |

Open from this session:
- Venue photo permissions: record each venue's OK in `docs/photo-credits.md` (La Soucoupe and La Mangeoire
  were not worked with last winter; the owner is asking).
- Delete the test lead "TEST – Claude" in Supabase (owner's action); a matching Basin email arrived.
- `Photos /` (owner's 90 originals, 28 MB) sits untracked in the repo root: keep out of git or move it.
- Not re-measured since these changes: Lighthouse mobile on the changed templates (Where to eat, request pages).
- French copy added in this session (alt texts, requests, venues) needs the native-speaker review.
- Ideas raised, not built: village required in the homepage quick-start (so it always skips step 1);
  per-item request buttons on the nightlife and hotel lists (currently prose); no-JS pre-fill of ?item=.


- **Private preview (23 Oct):** https://preview--courchevel-luxury-concierge.netlify.app, a CLI draft
  deploy on the production Netlify site (alias `preview`, not production; live site untouched).
  Redeploy after changes: `npx netlify deploy --build --site d05bccf4-0865-430f-82d7-8febd6ed5430
  --alias preview` (netlify-cli is not a project dependency; install it anywhere). Drafts send no
  noindex header: don't link the URL publicly. Netlify env set so far: `BASIN_FORM_URL` (all contexts),
  `SUPABASE_URL` (all contexts) and `SUPABASE_SERVICE_ROLE_KEY` (secret `sb_secret_` key; Production,
  Deploy Previews, Branch deploys).
- **Supabase (24 Oct):** project "Courchevel Luxury Concierge", West EU (Paris), ref `aqonenwnonefcsbkjgmt`,
  in the owner's "Just Enjoy Ibiza" organization. Migrations 001 + 002 applied; a test table request
  (name "TEST – Claude") saved from the preview and can be deleted. The organization's other project,
  "Just Enjoy Ibiza Data Base", belongs to the Ibiza business and has its own `leads` table: never run
  Courchevel migrations there.

- Repo: this folder, branch **`rebuild/phase-0-setup`**, remote `JustEnjoyIbiza/courchevel-web`
  (no push access yet). `main` = old site, which Netlify serves in production.
- Backup of the whole repo (all branches, history): `../courchevel-web-backup-2026-10-25.bundle` (older: 2026-10-22)
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
   - ~~Homepage quick-start~~ **done 23 Oct**: `src/components/home/QuickStart.astro` (plain GET,
     no script) → `/enquire/?arrival=…&village=…&adults=…`, pre-filled by the edge function
     `netlify/edge-functions/enquire-prefill.ts` (JS off) and `enquiry-form.ts` (JS on); shared
     parser `src/lib/prefill.ts`. The JS-off pre-fill only runs on Netlify: test it on the preview.
     Lighthouse note: the first run in a fresh Chrome scores the home ~82 (CLS 0.35) because
     Lighthouse's full-page screenshot resizes the page and the hero date inputs re-lay out;
     with `disableFullPageScreenshot` or any second run it is 99 / CLS 0, and real loads record
     no layout shift. Judge the home on a second run.
   - ~~Guide "A week in Courchevel 1850"~~ **done 23 Oct**: `guides/{en,fr}/a-week-in-courchevel-1850.md`,
     labelled as an example (invented group: two couples, children 6 and 9), built only from facts
     already on the site; linked from the 1850 village page, chalets, private-chef and experiences
     (EN + FR) and listed in the home guides section. Gates pass; Lighthouse 99/100/100/100.
     Owner to check: the day-by-day plan reads like something you would really arrange.
   - ~~Personal-touch question sheet~~ **written 23 Oct**, now waiting on the owner's answers
     (`docs/personal-touch-questions.md`, 37 questions numbered A/H/S/V/G): 2–3 questions per
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
