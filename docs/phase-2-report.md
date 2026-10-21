# Phase 2 report: content pages

22 October 2026. 58 pages in total (29 EN + 29 FR).

## What was built

| Section | EN URL | Pages (EN + FR) | Source files |
|---|---|---|---|
| Services hub | `/services/` | 2 | `src/content/hubs.ts` |
| 12 service pages | `/services/<slug>/` | 24 | `src/content/services/{en,fr}/*.md` |
| Villages hub | `/villages/` | 2 | `src/content/hubs.ts` |
| 5 village guides | `/courchevel-1850/` … `/la-tania/` | 10 | `src/content/villages/{en,fr}/*.md` |
| Guides hub | `/guides/` | 2 | `src/content/hubs.ts` |
| 4 practical guides | `/guides/<slug>/` | 8 | `src/content/guides/{en,fr}/*.md` |
| Signature experiences (6) | `/experiences/` | 2 | `src/content/experiences.ts` |
| FAQ (40 questions per language, 8 topics) | `/faq/` | 2 | `src/content/faq.ts` |
| About | `/about/` | 2 | `src/content/pages/{en,fr}/about.md` |
| Reviews | `/reviews/` | **built automatically once real reviews are added** | `src/data/reviews.ts` |
| Partners | `/partners/` | **built automatically once partners agree to be named** | `src/data/partners.ts` |

Plus the Phase 1 homepage and Plan my stay page (4).

Every content page follows the plan's order: direct answer first, key facts, what we
arrange, details, FAQ, 3 related pages, "Last updated", Plan my stay. Schema per page:
BreadcrumbList on all; Service on service pages (no price); Article on guides;
FAQPage wherever there is a FAQ; LocalBusiness on Home, Plan my stay and About.

To edit text: open the Markdown file for that page and language. Frontmatter limits
(title < 60, description < 155, exactly 3 related pages) are enforced by the build.

## Quality gates

| Gate | Result |
|---|---|
| Static checks (titles, descriptions, H1, canonical, hreflang, links, schema, prices, images) on all 58 pages | **Pass**: 2,736 checks, 0 failures |
| Lighthouse mobile, 12 representative pages (each template, both languages) | **Pass**: performance 98–100, accessibility 100, best practices 100, SEO 100 |
| LCP < 2.5 s, CLS < 0.1 | **Pass**: LCP 1.4–2.4 s (Experiences 2.4 s is the closest), CLS ≤ 0.028 |
| Readable with JavaScript off | **Pass** (checked on service, village, guide, FAQ, About) |
| Every page has an EN/FR pair and hreflang | **Pass** (22 Markdown pairs + hubs) |
| Editorial check: no prices, no "guaranteed/exclusive/secret", no clichés, heli-skiing only as Italy/Switzerland day trips | **Pass** after fixes |
| Rich Results Test / Schema.org validator | **Not run**: needs a public URL (Netlify preview) |

## For the owner to confirm before launch

**Business practices the copy describes** (true for most concierges, but they are promises):
1. Chalets: "we search, shortlist and arrange; the chalet is rented from its owner/agency or the hotel". This matches the legal advice in the Acquisition Plan.
2. Transfers: a chauffeured car is kept on standby for every helicopter arrival in case of bad weather.
3. Staff are briefed not to share photos of the chalet or guests.
4. Owner services: written property-check reports with photos; letting/rent collection is left to the owner's agency.
5. Coaches, nannies and security staff only through qualified / CNAPS-authorised partners.
6. Typical lead times ("several weeks", "two to three weeks" for some services).

**Facts to re-check close to launch** (sources are listed in the writers' notes):
7. **Michelin Guide 2026 list** on the Where to Eat guide (star counts, the Baumanière 1850 → Slalom 1850 name change, Le Sarkara reported closed for 2026/27). Check at guide.michelin.com.
8. **Courchevel Altiport is operating** this winter (one source mentioned works; the resort lists it as open all year).
9. Restaurants named on village and dining pages are open for 2026/27 (La Cortona, L'Oeil de Bœuf, Le Cap Horn in particular).
10. 2026/27 events and dates on the Season guide (from courchevel.com), and the Eurostar ski train dates.
11. ESF age groups, the free lift pass for under-5s, day-care centres (Les Marmots, La Tanière des Croès).
12. Milan helicopter time ("around an hour") is an estimate; no Courchevel-specific source.

**Still missing** (pages are written so these can be added without restructuring):
13. Founder name, photo, story, languages and year started (About page has a hidden TODO).
14. Real reviews (then `/reviews/` and the homepage reviews section appear).
15. Partners who agree to be named (then `/partners/` appears).
16. Native French review of all FR pages.
17. Photo rights for the 12 photos in use.
