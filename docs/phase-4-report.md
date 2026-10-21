# Phase 4 report: AI and SEO layer

22 October 2026.

## What was built

| Item | Where | Notes |
|---|---|---|
| robots.txt | `/robots.txt` (src/pages/robots.txt.ts) | Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, GPTBot, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot(-Extended) allowed; `/api/` closed; sitemap linked |
| llms.txt | `/llms.txt` | Generated from the same data as the site: key facts, 12 services, 6 experiences, 5 villages, 4 guides, home FAQs |
| Sitemap | `/sitemap-index.xml` | 58 URLs with hreflang pairs and `lastmod` from each page's `updated:` date; thank-you and 404 excluded |
| IndexNow | `netlify/plugins/indexnow`, `/<key>.txt` | Pings Bing with every URL after each production deploy (needs `INDEXNOW_KEY`) |
| hreflang, canonical, Open Graph | every page | EN/FR + x-default; OG image per page (page photo or default) |
| 301 redirects | `netlify.toml` | bare domain → www, `/index.html` → `/`, old `/assets/*` and `/css/*` → `/` |
| 404 page | `/404.html` | Bilingual, not indexed |
| Security headers | `netlify.toml` + CSP meta | HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy; CSP with per-page hashes, only Turnstile and GA4 allowed as third parties |
| Asset caching | `netlify.toml` | `/_astro/*` cached for a year (fingerprinted) |
| Reusable checks | `npm run qa`, `npm run qa:content` | Build + tests + static checks + schema checks; editorial checks |

## Quality gates on every page

| Gate | Result |
|---|---|
| Lighthouse mobile ≥ 95 on all four scores, LCP < 2.5 s, CLS < 0.1 | **58/58 pages pass** (table below) |
| Static checks: title, description, H1, canonical, hreflang, links, images, no prices | **Pass**: 2,818 checks, 0 failures |
| Schema: Google rich-result rules, FAQ text visible, breadcrumb = canonical, no price/offers | **Pass**: 58 BreadcrumbList, 24 Service, 8 Article, 46 FAQPage, 6 LocalBusiness, 0 issues |
| CSP: no violations, no console errors (10 pages incl. form, menu, 404) | **Pass** (one font inlined as data: was blocked; fixed by never inlining fonts) |
| Editorial check on all content | **Pass**: 0 issues |
| Function tests | **12/12 pass** |
| Google Rich Results Test / Schema.org validator online | **Not run**: needs the public preview URL |
| Redirects on the real domain | **Not run**: needs the Netlify deploy |

## Lighthouse, mobile, every page

| Page | Perf | A11y | Best pr. | SEO | LCP | CLS | Result |
|---|---|---|---|---|---|---|---|
| `/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/about/` | 99 | 100 | 100 | 100 | 2.1 s | 0.000 | Pass |
| `/courchevel-1300-le-praz/` | 99 | 100 | 100 | 100 | 2.0 s | 0.032 | Pass |
| `/courchevel-1550-village/` | 98 | 100 | 100 | 100 | 2.3 s | 0.000 | Pass |
| `/courchevel-1650-moriond/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/courchevel-1850/` | 99 | 100 | 100 | 100 | 1.7 s | 0.010 | Pass |
| `/enquire/` | 100 | 100 | 100 | 100 | 1.5 s | 0.000 | Pass |
| `/experiences/` | 97 | 100 | 100 | 100 | 2.4 s | 0.016 | Pass |
| `/faq/` | 100 | 100 | 100 | 100 | 1.5 s | 0.000 | Pass |
| `/fr/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/fr/about/` | 99 | 100 | 100 | 100 | 2.1 s | 0.009 | Pass |
| `/fr/courchevel-1300-le-praz/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/fr/courchevel-1550-village/` | 98 | 100 | 100 | 100 | 2.3 s | 0.000 | Pass |
| `/fr/courchevel-1650-moriond/` | 99 | 100 | 100 | 100 | 2.0 s | 0.008 | Pass |
| `/fr/courchevel-1850/` | 99 | 100 | 100 | 100 | 1.7 s | 0.011 | Pass |
| `/fr/enquire/` | 99 | 100 | 100 | 100 | 1.6 s | 0.015 | Pass |
| `/fr/experiences/` | 97 | 100 | 100 | 100 | 2.4 s | 0.015 | Pass |
| `/fr/faq/` | 100 | 100 | 100 | 100 | 1.5 s | 0.000 | Pass |
| `/fr/guides/` | 100 | 100 | 100 | 100 | 1.5 s | 0.038 | Pass |
| `/fr/guides/courchevel-with-kids/` | 99 | 100 | 100 | 100 | 1.7 s | 0.000 | Pass |
| `/fr/guides/getting-to-courchevel/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/fr/guides/season-dates-and-events/` | 99 | 100 | 100 | 100 | 2.1 s | 0.000 | Pass |
| `/fr/guides/where-to-eat/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/fr/la-tania/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/fr/services/` | 100 | 100 | 100 | 100 | 1.5 s | 0.000 | Pass |
| `/fr/services/chalets/` | 98 | 100 | 100 | 100 | 2.3 s | 0.000 | Pass |
| `/fr/services/childcare/` | 100 | 100 | 100 | 100 | 1.5 s | 0.028 | Pass |
| `/fr/services/events/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/fr/services/experiences/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/fr/services/lifestyle/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/fr/services/nightlife/` | 99 | 100 | 100 | 100 | 2.1 s | 0.000 | Pass |
| `/fr/services/owners/` | 99 | 100 | 100 | 100 | 2.0 s | 0.009 | Pass |
| `/fr/services/private-chef/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/fr/services/ski/` | 99 | 100 | 100 | 100 | 1.7 s | 0.000 | Pass |
| `/fr/services/staff/` | 99 | 100 | 100 | 100 | 2.1 s | 0.006 | Pass |
| `/fr/services/transfers/` | 99 | 100 | 100 | 100 | 2.0 s | 0.005 | Pass |
| `/fr/services/wellness/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/fr/villages/` | 100 | 100 | 100 | 100 | 1.5 s | 0.000 | Pass |
| `/guides/` | 100 | 100 | 100 | 100 | 1.5 s | 0.000 | Pass |
| `/guides/courchevel-with-kids/` | 99 | 100 | 100 | 100 | 1.7 s | 0.000 | Pass |
| `/guides/getting-to-courchevel/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/guides/season-dates-and-events/` | 99 | 100 | 100 | 100 | 2.1 s | 0.029 | Pass |
| `/guides/where-to-eat/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/la-tania/` | 99 | 100 | 100 | 100 | 2.0 s | 0.010 | Pass |
| `/services/` | 100 | 100 | 100 | 100 | 1.5 s | 0.013 | Pass |
| `/services/chalets/` | 98 | 100 | 100 | 100 | 2.3 s | 0.000 | Pass |
| `/services/childcare/` | 100 | 100 | 100 | 100 | 1.5 s | 0.000 | Pass |
| `/services/events/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/services/experiences/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/services/lifestyle/` | 99 | 100 | 100 | 100 | 2.0 s | 0.009 | Pass |
| `/services/nightlife/` | 99 | 100 | 100 | 100 | 2.1 s | 0.000 | Pass |
| `/services/owners/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/services/private-chef/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/services/ski/` | 99 | 100 | 100 | 100 | 1.7 s | 0.000 | Pass |
| `/services/staff/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/services/transfers/` | 99 | 100 | 100 | 100 | 2.0 s | 0.007 | Pass |
| `/services/wellness/` | 99 | 100 | 100 | 100 | 2.0 s | 0.000 | Pass |
| `/villages/` | 100 | 100 | 100 | 100 | 1.5 s | 0.000 | Pass |
