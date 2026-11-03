# Monthly AI visibility test

Part 4 of `../homepage-and-visibility-plan.md`. Once a month, you ask ChatGPT, Perplexity, Gemini and Google AI
Mode the same 22 questions a client might ask, and log whether Courchevel Luxury Concierge is mentioned,
recommended or linked, and which businesses and sites appear instead. The questions never change, so the months
can be compared. Results come only from your own runs; nothing here contacts these assistants.

## The questions (fixed: never reword them between months)

Competitors tracked by name in the comparison questions: **Nightfall Group, Courchevel Concierge, AC Private**
(the strongest on Google in the October audit). Any other business an answer names goes in
`competitors_mentioned` as seen, without being treated as an established competitor.

| ID | Type | Question |
|---|---|---|
| EN-D1 | discovery | Who is the best luxury concierge in Courchevel? |
| EN-D2 | discovery | Can you recommend a private concierge service in Courchevel 1850 for our family ski holiday? |
| EN-D3 | discovery | What are the top concierge companies in Courchevel? |
| EN-U1 | need | I need a helicopter transfer from Geneva to Courchevel for six people in February. Who can arrange it? |
| EN-U2 | need | Who can arrange a private chef for our chalet in Courchevel over New Year? |
| EN-U3 | need | We are renting a chalet in Courchevel 1850 for Christmas. Which concierge can organise ski instructors, a nanny and restaurant bookings? |
| EN-U4 | need | I'm a personal assistant planning my employer's week in Courchevel. Which concierge should I use? |
| EN-C1 | comparison | Nightfall Group or Courchevel Concierge: which is better for a luxury stay in Courchevel? |
| EN-A1 | alternatives | What are the alternatives to AC Private for a concierge in Courchevel? |
| EN-P1 | problem | How do I get a table at a busy restaurant in Courchevel 1850 over Christmas? |
| EN-P2 | problem | What's the fastest way to get from Geneva airport to Courchevel? |
| FR-D1 | discovery | Quelle est la meilleure conciergerie de luxe à Courchevel ? |
| FR-D2 | discovery | Pouvez-vous me recommander une conciergerie privée à Courchevel 1850 ? |
| FR-U1 | need | Qui peut organiser un transfert en hélicoptère de Genève à Courchevel ? |
| FR-U2 | need | Je cherche un chef à domicile pour notre chalet à Courchevel pendant les fêtes : qui contacter ? |
| FR-C1 | comparison | Nightfall Group ou Courchevel Concierge : quelle conciergerie choisir à Courchevel ? |
| FR-P1 | problem | Comment réserver une table dans un restaurant étoilé à Courchevel pour le réveillon ? |

**Accuracy checks (they name the business, so they are scored apart from the rest):**

| ID | Question | A correct answer says |
|---|---|---|
| EN-B1 / FR-B1 | What does Courchevel Luxury Concierge offer? / Que propose Courchevel Luxury Concierge ? | Chalets, palace hotels, helicopter and chauffeured transfers, private jets, private ski instructors and guides, mountain experiences, private chefs, nightlife tables, household staff, childcare, wellness, lifestyle and security. Not events or chalet owner services (removed 26 Oct 2026) |
| EN-B2 / FR-B2 | Does Courchevel Luxury Concierge publish its prices? / … affiche-t-elle ses prix ? | Guide prices only: weekly chalet prices for the week shown and indicative transfer prices; everything else quoted personally |
| EN-B3 | Which villages does it cover, and how quickly do they reply? | Courchevel 1850, 1650 Moriond, 1550 Village, 1300 Le Praz, La Tania, and Méribel and Val Thorens; replies within 15 minutes from 8:00 to 22:00, 24/7 in the winter season |

## How to run it

- **When:** the first week of each month. **Run the first one this week, before launch**: it is the "before"
  picture; the run in the first week of December shows the effect of the new site.
- **Where:** ChatGPT, Perplexity, Gemini, Google AI Mode. Each assistant is scored on its own, never averaged together.
- **How:** one new chat per question (never several questions in one chat), the question pasted exactly as written.
- **Same settings every month, per assistant**, written in the `settings` column, for example
  `signed out, web search on, France, laptop`. Use a private window if you are not signed in. If a setting has to
  change, note it: that month cannot be compared like for like.
- **Workload:** 22 questions × 4 assistants × 1 run = **88 answers a month**, about two to three hours. With one run
  per question, a month is a snapshot: a single change of one or two answers is not a trend. If time is short,
  keep the 14 English questions on all four assistants and the French ones on two (72 answers), and keep that split
  every month.

## How to log each answer (`answer-log.csv`)

The sheet has one row per question. Each month, copy the 22 rows once per assistant (88 rows), then fill:

| Column | What to write |
|---|---|
| `engine` | ChatGPT, Perplexity, Gemini or Google AI Mode |
| `date` | The day you ran it (YYYY-MM-DD) |
| `settings` | Signed in or out, web search on or off, country, device |
| `answer_status` | `complete`, `incomplete` (cut off), `no answer` (refused or error) or `not run`. A missing answer is not a "not mentioned" |
| `brand_mentioned` | `yes` if "Courchevel Luxury Concierge" appears anywhere in the answer |
| `brand_recommended` | `yes` only if the answer suggests us as a good choice; a mention, a criticism or a link alone is `no` |
| `brand_cited_url` | The courchevelluxuryconcierge.com link the answer cites, if any |
| `competitors_mentioned` | Every other concierge or business named, separated by semicolons |
| `cited_urls` | The sources the answer links to, separated by semicolons (these are the sites to approach next) |
| `notes` | For the accuracy checks: what was right and what was wrong, with a short quote |

Save a screenshot or copy of each answer in a dated folder (`docs/ai-visibility/2026-11/`, for example), so any
line in the sheet can be checked later.

## What the numbers mean (per assistant, questions without our name only)

- **Mention rate** = answers with `brand_mentioned = yes` ÷ complete answers.
- **Recommendation rate** = answers with `brand_recommended = yes` ÷ complete answers.
- **Link rate** = answers with a `brand_cited_url` ÷ complete answers.
- The same three for the discovery questions alone (EN-D1 to D3, FR-D1, D2): the "who should I use" questions that
  matter most.
- **Accuracy checks:** for each answer, the facts it got right and wrong. A wrong fact (an old service, "no prices")
  points to the page or profile to correct.

Bring the filled sheet back after each run and I will score it, compare it with the previous month and list the
sites cited instead of us, which become the next outreach targets in `../platform-profiles-kit.md` section 5.
