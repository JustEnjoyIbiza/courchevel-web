# Phase 1 report: design system and homepage

22 October 2026. Direction A, "Ivory & Brass".

## What was built

- **Design system** in `src/styles/global.css` (Tailwind 4 `@theme`): colours, fonts,
  type scale, section spacing, buttons (`btn-primary`, `btn-secondary`, `btn-light`), links,
  eyebrow labels, brass rules.
- **Fonts** self-hosted: Cormorant Garamond 500/600 + Manrope (variable). No requests to Google.
- **Components:** `SiteHeader` (nav, EN/FR switch, Plan my stay, no-JS mobile menu),
  `SiteFooter` (all contact details from `business.ts`), `MobileCTA` (sticky Plan my stay +
  WhatsApp bar on phones), `Wordmark` (logo as live text), `SmartLink` (links only to pages
  that exist).
- **Homepage** EN `/` and FR `/fr/`: hero, proof strip, 12 services, 3 signature experiences,
  how it works, villages, about, FAQ (6 questions with FAQPage schema), final CTA. A reviews
  section appears automatically once real reviews are added to `src/data/reviews.ts`.
- **Plan my stay** EN `/enquire/` and FR `/fr/enquire/`: WhatsApp, phone and email for now.
  The 3-step form arrives in Phase 3.
- **Photos:** 12 authentic photos from the old site, renamed descriptively and served as
  AVIF/WebP at several sizes with alt text. Stock or non-Courchevel photos were not used.
- **Icons:** the logo monogram cropped from `logo.png` for favicon and Apple touch icon.

## Quality gates

Lighthouse, mobile emulation, local static build (`astro preview`):

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 99 | 100 | 100 | 100 | 2.0 s | 0 |
| `/fr/` | 99 | 100 | 100 | 100 | 2.0 s | 0 |
| `/enquire/` | 100 | 100 | 100 | 100 | 1.4 s | 0 |
| `/fr/enquire/` | 100 | 100 | 100 | 100 | 1.4 s | 0.013 |

| Gate | Result |
|---|---|
| Lighthouse mobile >= 95 on all four scores | Pass |
| LCP < 2.5 s, CLS < 0.1 | Pass (TBT 0 ms on every page) |
| All text visible with JavaScript off | Pass (H1, copy and FAQ answers present; menu works) |
| One H1, unique title < 60, description < 155, canonical | Pass (160 automated checks, 0 failures) |
| hreflang EN/FR + x-default, targets exist | Pass |
| No broken internal links | Pass (links to Phase 2 pages render as text until those pages exist) |
| JSON-LD parses; no price, offers or streetAddress | Pass |
| No prices anywhere in the text | Pass |
| Images have alt, width and height | Pass |
| Keyboard: skip link first, visible focus, menu reachable | Pass |
| WhatsApp link uses wa.me with a pre-filled message | Pass |
| Rich Results Test / Schema.org validator | **Not run**: needs a public URL. Run on the Netlify preview |
| Lighthouse on real network (Netlify) | **Not run**: needs a deploy preview |

## Notes and open points

- French copy was written by Claude and needs a native speaker's review.
- Headline claims used: "reply within 15 minutes, 8:00 to 22:00", "proposal within 24 hours",
  "24/7 in season". They come from the plan; confirm they are true before launch.
- Photo rights for the 12 photos used are still to be confirmed (missing facts, item 21).
- The 1.4–2.0 s LCP is measured locally with Lighthouse's simulated slow 4G.
