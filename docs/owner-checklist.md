# Owner checklist: everything that needs you

One list for the end-of-project review. Updated as each phase finishes.
Details behind each item: `missing-facts.md` (Phase 0), `phase-2-report.md`, `lead-system-setup.md`, `audit-2026-10-22.md`.

## Needed to launch

Full plan, dates and exact DNS records: `launch-plan.md`.

- [ ] **Renew the domain at GoDaddy and turn on auto-renew. It expires 30 November 2026** (6 days after the planned launch). Owner plans it for Monday 26 October
- [ ] **Search Console**: a verification record already exists on the domain. Who owns that property? Add us as a user (or we create a new Domain property)
- [ ] Go-ahead for launch day (planned Tuesday 24 November): switch the Netlify primary domain to www, then merge
- [ ] **GitHub access** to push the rebuild branch (sign in to GitHub in the app's browser pane, or a token on this Mac)
- [ ] **Netlify access**: check build settings, add environment variables, see the preview
- [ ] **Accounts for the lead system**: Supabase, Resend (with DNS records for the domain), Telegram bot, Cloudflare Turnstile. Guide: `lead-system-setup.md`. Basin is set up (23 Oct): `BASIN_FORM_URL` is set in Netlify and Basin emails leads to the Courchevel Gmail (verified). Switch to the domain email when it exists.
- [ ] **Legal pages** (written 26 Oct: `/mentions-legales/`, `/privacy/`, `/cookies/`, EN/FR). They show
  "To be confirmed" until these are set in `src/data/business.ts` (`legal`), and the launch check fails until then:
  1. Legal name of the business (company name, or your own name as an individual entrepreneur)
  2. Legal form (SAS, SARL, EI, micro-entreprise…)
  3. Share capital (companies only)
  4. Registered office address
  5. SIRET
  6. RCS city and number (companies only)
  7. Intra-EU VAT number, if any
  8. Director of publication (usually the legal representative)
- [ ] **Check with your accountant or lawyer** (each can add a line to the legal notice; not legal advice):
  - Rental intermediation (loi Hoguet): commission on chalet rentals usually requires a professional card
    (CCI) or working as the agent of an agency that holds one. If so: card number and guarantee on the site.
  - Travel packages (Code du tourisme): selling combined services (e.g. stay + transfer) at your own price may
    require Atout France registration (IM number), a financial guarantee and professional insurance.
  - Consumer mediator: businesses selling to consumers must offer one and name it on the site (Code de la
    consommation, L.612-1).
- [x] **Transfer prices** (`/services/transfers/`, built 25 Oct). **Confirmed by you on 25 Oct ("we can change later").** The page shows market reference prices from
  published price lists (helicopter and car; sources in `docs/transfer-prices.md`) with a "Draft"
  line, and the launch check fails until you confirm them. Re-checked 25 Oct (cars at the market median,
  helicopters at the lowest current H125 price): make sure your partners will honour them. For each route: keep, or send your partners' price
  (one way, per helicopter or car, **VAT included**). Also: which helicopter and car partners you use, and whether
  their prices include the altiport landing fee
- [ ] Confirm the retention periods in the privacy policy: requests without a booking 3 years after last contact;
  booked stays 5 years after the relationship; invoices 10 years
- [ ] Accept the data processing agreement (DPA) in each provider's account: Netlify, Supabase, Basin (and Resend,
  Cloudflare, Google Analytics when they are switched on)
- [ ] **Street address** (due 15 November). Until then the site and schema show Courchevel, Savoie, France only
- [ ] **Domain email** (e.g. hello@courchevelluxuryconcierge.com) for sending lead emails; needed by Resend
- [ ] Netlify's registered address for the mentions légales host section

## Decisions

- [x] Prices: none anywhere, except the weekly price of each chalet on the chalets page, with a note that prices vary (owner, 25 Oct 2026). Agency OK for prices, photos and chalet names: it offered the brochures for this (25 Oct)
- [ ] Languages: EN + FR now. Russian, Ukrainian and Arabic later?
- [x] Concierge alerts by Telegram (chosen 25 Oct). Paused 26 Oct: bot created, token not added yet (phone elsewhere). Meanwhile turn on Gmail notifications for lead emails
- [ ] The form's budget field is free text ("in your own words"), so no price bands appear on the site. OK?
- [ ] Keep "Winter Retreat", "VIP Party Package", "Ski Explorer" in English on the French site, or translate them like the three new experiences?
- [ ] Titles use the short brand "CLC" after the "|" to stay under 60 characters. OK, or prefer "Courchevel Concierge"?

## Your experience, in your words

- [ ] Answer the questions in `personal-touch-questions.md` (voice notes are fine; start with About and the homepage). Also tells us if the example week in 1850 is how you would really do it

## About page (end of project)

- [ ] Founder name, photo, short story, languages, year started in Courchevel
- [ ] Reviews name **Iván**: is he the founder? (Then he becomes the named person on About and in the schema)
- [ ] Is the man in front of the helicopter (`audit/original-site/assets/1.jpeg`) the founder?
- [ ] Team names and roles (optional)

## Proof

- [ ] Real reviews: word for word, name or initials, date, service, permission. `/reviews/` and the homepage reviews appear automatically
- [ ] Partners who agree to be named. `/partners/` appears automatically
- [ ] Are the 3 quotes on the old site from real clients?

## Promises the copy makes (confirm or tell us to change)

- [ ] Reply within 15 minutes, 8:00 to 22:00; proposal within 24 hours; 24/7 in season
- [ ] Chalets are rented from the owner/agency or booked with the hotel; we arrange and coordinate
- [ ] A chauffeured car on standby for every helicopter arrival
- [ ] Staff briefed not to share photos of the chalet or guests
- [ ] Owner services: written property-check reports with photos; no letting or rent collection
- [ ] Coaches, nannies and security only through qualified / CNAPS-authorised partners
- [ ] Lead times mentioned ("several weeks", "two to three weeks")
- [ ] Which of the 12 services are offered today vs on request through partners

## Facts to re-check close to launch

- [ ] Méribel / Val Thorens road distances from Courchevel (sums of verified segments)
- [ ] Michelin listings in Méribel and Val Thorens (L'Ekrin, Les Explorateurs); Le Farçon chef name
- [ ] Le Praz restaurants: village page and dining guide name different places; agree on one list
- [ ] Heli-skiing destinations in Italy and Switzerland (Verbier landing sites, Valgrisenche, La Thuile)
- [ ] GDPR wording on the assistants page ("data handled in line with GDPR")

- [ ] Michelin Guide 2026 list on the Where to Eat guide (guide.michelin.com)
- [ ] Courchevel Altiport operating this winter
- [ ] Named restaurants open for 2026/27 (La Cortona, L'Oeil de Bœuf, Le Cap Horn especially)
- [ ] 2026/27 events and Eurostar ski train dates on the Season guide
- [ ] ESF age groups, free lift pass under 5, Les Marmots and La Tanière des Croès day care
- [ ] Transfer prices and times on `/services/transfers/` (operators raised helicopter prices between July and October)

## Content and photos

- [ ] **Private chef page** (rebuilt 26 Oct): 6-8 photos of plates and chefs at work from your chefs, one or two real menus, and how chefs are charged (per dinner or per day; groceries at cost or included)

- [ ] Native French review of every French page and of the emails
- [ ] Photo rights for the 12 photos in use; replacements for the 5 stock or non-Courchevel photos
- [ ] 20–40 more real photos (chalet interiors, chef, team, arrivals, childcare, each village)
- [ ] Logo as SVG or a large transparent PNG
- [ ] **Illustrated piste map for the Slopes page**: send `Courchevel piste illustration - brief for illustrator.docx` (in the Courchevel folder; source `docs/ski-map-illustrator-brief.md`) to 2–3 illustrators, pick one; final SVG by 13 November
- [ ] **Your own run on film (December)**: helmet or chest camera, La Saulire to Le Praz by the Combe de la Saulire and Verdons; becomes the scroll-controlled video on the Slopes page (no drone over the ski area without authorisation)

## Off-site (plan step 4, independent of the website). Ranked in `audit-2026-10-22.md`, section 7

- [x] Google Business Profile exists (5.0 from 14 reviews, found 22 Oct). Now fix it with `platform-profiles-kit.md`:
  - [ ] Primary category "Travel agency" → "Concierge service"
  - [ ] Description → the kit's text (same facts as the site)
  - [ ] Website and booking links with UTM tags; WhatsApp messaging on; 12 services
  - [ ] Check the Spanish July reviews describe Courchevel stays
- [ ] Instagram: name "Courchevel Luxury Concierge", bio from the kit, **add the website link**, move Ibiza content to its own account
- [ ] Google Places API key (`GOOGLE_PLACES_API_KEY`) so the site shows the live rating and reviews
- [ ] Print the QR code for courchevelluxuryconcierge.com/review on the chalet welcome card
- [ ] Bing Places, Apple Business Connect, Tripadvisor with exactly the same name, phone and description
- [ ] Ask past clients for Google reviews
- [ ] Baseline AI prompt test (20 prompts) saved before launch
- [ ] Trustpilot profile; courchevel.com tourist office listing (Apidae)
- [ ] LinkedIn company page and founder profile (for schema `sameAs` and E-E-A-T)
- [ ] Outreach list in the audit (luxury travel sites, ski guides, the founder as expert source)
