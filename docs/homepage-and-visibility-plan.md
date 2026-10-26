# Homepage and visibility plan (26 October 2026)

**Status (26 Oct, evening):** Parts 1 and 2 built on the preview (not committed until the owner approves).
Homepage on a phone 14,800 → ~11,100 px, laptop 11,100 → ~9,200 px, ~710 words. Still open: the founder
block and real quotes (they appear automatically once supplied in `src/data/business.ts` and
`src/data/reviews.ts`), and a sharper landscape hero photo (none suitable in the owner's folder: the
landscape shots carry another company's branding or show faces).

Goal: clients find the site (Google, Google Maps, AI assistants) and, once on it, feel looked after and send
a request. Built on the homepage audit of 26 Oct (phone and laptop walk-through) and `audit-2026-10-22.md`
(Google competitors, keywords, off-site plan).

## Where we stand

- **Homepage:** fast (Lighthouse 98), clean, honest, but long (14,800 px on a phone, 13 sections, ~1,000 words),
  asks before it introduces (form on screen 2; 7 "Plan my stay" and 5 WhatsApp links), and the story runs
  backwards (the introduction comes after the form). No face, no visible rating.
- **Visibility:** a search for the exact name "Courchevel Luxury Concierge" (search engines used by AI
  assistants, checked 26 Oct) does not return the site: it returns Expedia, Airelles and Le Collectionist. On
  Google, the October audit found Nightfall, Courchevel Concierge, AC Private, Homebooker ranking for "luxury
  concierge Courchevel". The new site fixes the on-page side; being found depends mostly on Google Business
  Profile, reviews, Bing and third-party mentions.
- **Contradictions found** (AI assistants quote facts; contradictions cost trust):
  - "We do not publish prices" (About EN/FR, homepage FAQ, How to choose a concierge EN/FR) vs the weekly
    chalet prices and transfer "from" prices now on the site.
  - Méribel by road: transfers table 31 km / 35-40 min vs Méribel page 45 km / 1 h. The 31 km route is the Col
    de la Loze, bikes only and closed in winter; the car route via Moûtiers is about 45 km.
  - Homepage counter "12 services": there are 11.

## How clients find a concierge in Courchevel

1. **Google Maps and the local pack** ("concierge Courchevel"): Google Business Profile (5.0 from 14 reviews
   on 22 Oct) is the first asset.
2. **Google search:** the homepage for the name and "luxury concierge Courchevel"; service pages and guides for
   needs ("helicopter Geneva Courchevel", "private chef Courchevel", "where to eat Courchevel").
3. **AI assistants** (ChatGPT, Perplexity, Gemini, Google AI Mode, Copilot): they recommend businesses they can
   find in the Google and Bing indexes, described the same way everywhere, with reviews and mentions on other
   sites. They quote clear, factual sentences.

## Part 1: the new homepage (built here)

The story: feeling → who → what → moments → how → proof → plan → questions → invitation.

| # | Section | For the client | For Google and AI |
|---|---|---|---|
| 1 | **Hero.** "The whole stay. Or just tonight." large, "Luxury concierge in Courchevel" small above it, both inside the H1; one line; one button (Plan my stay) and a WhatsApp text link. The sticky bar appears only after the hero. | One calm invitation instead of four buttons | Keyword stays in the H1 |
| 2 | **Introduction** (~40 words, names the company once) + one trust line: ★ 5.0 on Google · replies in 15 minutes · 24/7 in season · based in Courchevel | Who you are, in one breath | The sentence AI assistants quote; entity name on the page |
| 3 | **Services** (tiles + list, 11 services) | Unchanged, the strongest section | Descriptive links to every service |
| 4 | **Moments** (3 experiences; carousel margin fixed on phones) | Desire | Links to experiences |
| 5 | **How it works** (3 short steps) **+ the dates form** and "Just one thing?" | The request comes once they want it | — |
| 6 | **Proof and people:** Google rating card, 2-3 real client quotes, the founder (photo, first name, languages, years in Courchevel) | Trust in a person | E-E-A-T, Person schema (founder) |
| 7 | **Before you come:** one row of village links (1850, 1650 Moriond, 1550 Village, 1300 Le Praz, La Tania, Méribel, Val Thorens), 4 guide links, the Christmas line | Practical, short | Keeps local keywords and internal links at a quarter of the height |
| 8 | **FAQ** (5-6): adds "What does a luxury concierge in Courchevel do?", corrects "Do you publish prices?" | Quick answers | Questions people ask AI; FAQPage schema (no rich result on Google for commercial sites since 2023, still read by AI) |
| 9 | **Final invitation** | — | — |

Target: about 9,000 px on a phone (from 14,800), fewer and clearer words, the request asked twice (hero and
after "how it works") plus the closing band.

## Part 2: on-site SEO and AI fixes (built here, before launch)

- Fix the contradictions above (prices wording on About, FAQ and the How to choose guide; Méribel 45 km / about
  1 h in the transfers table; 11 services).
- Previews marked noindex, so Google never indexes the test site.
- Founder as Person in the business schema when supplied; every new profile added to `sameAs`. No
  aggregateRating in schema (Google ignores self-served stars; the rating is shown visibly instead).
- Sharper landscape hero photo for laptops (today 1,000 px wide, shown at 1,440), keeping LCP under 2 s.
- Keep: titles and descriptions (keyword-led, EN and FR), hreflang, sitemap, robots and llms.txt open to AI
  crawlers, IndexNow.

## Part 3: off-site (the owner; the biggest effect on being found)

1. **Today:** renew the domain (expires 30 Nov). Without it, everything is lost.
2. **Google Business Profile:** website link to the new homepage at launch, primary category "Concierge
   service", the 11 services, 10+ real photos, the kit description, a weekly post in season, answers in Q&A;
   address once ready (15 Nov).
3. **Reviews:** ask every past client this week; aim for 30 by Christmas; reply to each within 48 hours.
4. **Google Search Console and Bing Webmaster Tools access** (Bing feeds ChatGPT search and Copilot).
5. **Bing Places and Apple Business Connect** (Apple Maps, Siri), same name, phone, description.
6. **courchevel.com listing** (tourist office, via Apidae): the most trusted local link, often cited by AI.
7. **One review platform** (Trustpilot or Tripadvisor), a LinkedIn company page, a Facebook page.
8. **Mentions:** partners (chalet agency, helicopter operator, chefs) link to the site; pitch the founder to
   the travel press and blogs listed in `audit-2026-10-22.md` section 7.

## Part 4: measuring (monthly from launch)

- Search Console: impressions and clicks for the name, "concierge Courchevel", "conciergerie Courchevel".
- Google Business Profile: calls, website clicks, direction requests.
- AI test: 20 prompts (EN and FR) in ChatGPT, Perplexity, Gemini and Google AI Mode; log whether we are
  mentioned and which sites are cited instead (next outreach targets).
- Leads by page and source (form data, UTM; GA4 after consent).

## Timeline

| When | Built here | Owner |
|---|---|---|
| Week of 26 Oct | Parts 1 and 2 on the preview | Domain; ask past clients for reviews; GBP update; founder photo and bio; 2-3 quotes |
| 1-15 Nov | Founder, quotes and rating card in; final copy | Bing Places, Apple, courchevel.com, one review platform; GBP address |
| 16-23 Nov | Full checks, launch rehearsal | Search Console and Bing access; go-ahead |
| 24 Nov | Launch (301s from the old site) | — |
| From launch | Monthly report (Part 4) | Weekly GBP post, review replies |

## Needed from the owner

Founder photo, first name, languages and year started in Courchevel; 2-3 client quotes word for word with
initials; confirmation that the Google rating is still 5.0 and the review count; Google Business Profile and
Search Console access; the domain renewed.
