# Owner checklist: everything that needs you

One list for the end-of-project review. Updated as each phase finishes.
Details behind each item: `missing-facts.md` (Phase 0), `phase-2-report.md`, `lead-system-setup.md`, `audit-2026-10-22.md`.

## Needed to launch

Full plan, dates and exact DNS records: `launch-plan.md`.

- [ ] **Renew the domain at GoDaddy and turn on auto-renew. It expires 30 November 2026** (6 days after the planned launch)
- [ ] **Search Console**: a verification record already exists on the domain. Who owns that property? Add us as a user (or we create a new Domain property)
- [ ] Go-ahead for launch day (planned Tuesday 24 November): switch the Netlify primary domain to www, then merge
- [ ] **GitHub access** to push the rebuild branch (sign in to GitHub in the app's browser pane, or a token on this Mac)
- [ ] **Netlify access**: check build settings, add environment variables, see the preview
- [ ] **Accounts for the lead system**: Supabase, Resend (with DNS records for the domain), Telegram bot, Cloudflare Turnstile. Guide: `lead-system-setup.md`. Basin is set up (23 Oct) and emails leads to the Courchevel Gmail once `BASIN_FORM_URL` is set in Netlify. **Click Basin's verification link in that Gmail inbox**; switch to the domain email when it exists.
- [ ] **Legal**: legal entity name and form, SIRET, VAT number if any, *directeur de la publication*, registered address. Then we write mentions légales, privacy and cookie pages
- [ ] **Street address** (due 15 November). Until then the site and schema show Courchevel, Savoie, France only
- [ ] **Domain email** (e.g. hello@courchevelluxuryconcierge.com) for sending lead emails; needed by Resend
- [ ] Netlify's registered address for the mentions légales host section

## Decisions

- [ ] Prices: the site follows the Website Plan (no prices anywhere). The Acquisition Plan wanted "from" prices. Confirm
- [ ] Languages: EN + FR now. Russian, Ukrainian and Arabic later?
- [ ] Concierge alerts by Telegram (built) or WhatsApp Cloud API (not built, needs a Meta business account)
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
- [ ] Milan helicopter time ("around an hour") is an estimate

## Content and photos

- [ ] Native French review of every French page and of the emails
- [ ] Photo rights for the 12 photos in use; replacements for the 5 stock or non-Courchevel photos
- [ ] 20–40 more real photos (chalet interiors, chef, team, arrivals, childcare, events, each village)
- [ ] Logo as SVG or a large transparent PNG

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
