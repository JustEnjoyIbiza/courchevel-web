# What we still need from the owner

Phase 0 list, 22 October 2026. Everything here is a `TODO` in the code until answered.
Ordered by what blocks the build first.

## A. Decisions (the two plans disagree)

| # | Question | Website Plan says | Acquisition Plan says | Default used until decided |
|---|---|---|---|---|
| A1 | Show prices? | Never, anywhere | "From" prices on hero offers, Google profile, llms.txt | **No prices** |
| A2 | Languages at launch | EN + FR | EN + RU + FR, plus UK and AR landing pages | **EN + FR**, structure ready for more |
| A3 | Lead storage | Supabase via Netlify Function | Netlify Forms into the CRM | **Supabase** |
| A4 | Launch date | Last week of November | 15 November | **Last week of November** |
| A5 | Concierge alert channel | WhatsApp Cloud API or Telegram | Telegram also used for RU clients | **Telegram bot** (faster to set up) |
| A6 | Design direction | | | See `design-directions.md` (recommend A) |
| A7 | Canonical host | `www.` | | **`www.`**, bare domain 301s to it |

## B. Legal (blocks the mentions légales page and launch)

1. Legal entity name and legal form (SAS, EI, micro-entreprise…)
2. SIRET number (and VAT number, if any)
3. Name of the *directeur de la publication*
4. Registered address of the entity (can differ from the public address)
5. RC Pro insurance in place? Insurer name (optional on the site)
6. Which activities need licences: carte professionnelle (Loi Hoguet) for chalet
   bookings, Atout France registration for packages, VTC for driving. The wording
   on the chalet and transfer pages depends on the answer (see Acquisition Plan, Phase 0).

## C. Identity

7. Street address (due **15 November 2026**). Until then: service-area business, no street address.
8. Domain email (e.g. `hello@courchevelluxuryconcierge.com`): is it being set up? Which provider?
9. Logo as SVG, or a transparent PNG at least 512 px. Brand colours, if any are fixed.
10. Approve the 50-word business description in `src/data/business.ts` (EN and FR).
11. Telegram: is the same number on Telegram?

## D. People and proof

12. Founder: name, photo, short story, languages spoken, year he started in Courchevel.
    Is the man in front of the helicopter (`audit/original-site/assets/1.jpeg`) the founder?
13. Team: names, roles, languages, photos (optional).
14. Reviews: real reviews with name or initials, date and service, and permission to show them.
    Are the 3 quotes on the current site from real clients? Who?
15. Partners: chalets, hotels, ski schools, chefs and suppliers we may name, each with permission.
16. Years in business, number of clients or stays (only if true and countable).

## E. Operations

17. Who answers leads, and in which hours? (The plan assumes 8:00 to 22:00, reply within 15 minutes.)
18. Where should new-lead emails go? (Defaults to the gmail address.)
19. Which of the 12 services are offered **today**, and which only on request through partners?
20. Signature Experiences: keep Winter Retreat, VIP Party Package and Ski Explorer as they are?
    Add Family Week, Christmas & New Year, Corporate Retreat?

## F. Photos

21. Who owns each photo, and may we use it? (Full list in `audit/README.md`, section 7.)
22. Replacements for photos that are not Courchevel or look like stock:
    `11.jpeg` (log chalet), `14.jpeg` (champagne and valley), `photo/1.jpeg` (ski family),
    `photo/champagne&view.jpeg` (Matterhorn), `photo/mountainView.jpeg` (terrace).
23. 20–40 more real photos: chalet interiors, a chef at work, the team, arrivals,
    childcare, events, each village.

## G. Accounts and access

24. GitHub: write access for pushing the rebuild branch (sign in to GitHub in the browser
    pane, or add an SSH key / token on this Mac).
25. Netlify: access to the site (to check build settings and add environment variables).
    Are branch deploys or deploy previews on?
26. Google Search Console and Bing Webmaster Tools: do properties exist? Access for the audit.
27. Google Business Profile: does one exist? Who owns it?
28. Supabase, Resend and Cloudflare (Turnstile) accounts: existing ones, or create new?
29. Basin form (`usebasin.com/f/34a5258d7b37`): who receives its emails? It stays live until launch.

## H. Urgent fix on the live site (before the rebuild)

30. The current contact form has **no email or phone field**, so form leads cannot be
    answered. Approve a small fix on `main` (add email + phone, required) now?
