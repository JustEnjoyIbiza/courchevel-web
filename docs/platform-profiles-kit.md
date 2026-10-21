# Platform profiles kit: one identity everywhere

Google and AI assistants trust a business when every platform says exactly the same
thing. Copy these values **exactly** into each profile. The source of truth is
`src/data/business.ts`; if something changes, change it there and here, then on every platform.

Checked 22 October 2026.

## The core identity (copy exactly)

| Field | Value |
|---|---|
| Name | **Courchevel Luxury Concierge** (no extra words, no locations in the name) |
| Phone / WhatsApp | **+33 7 57 51 80 56** |
| Website | **https://www.courchevelluxuryconcierge.com/** |
| Email | Courchevelluxuryconcierge@gmail.com (switch everywhere at once when the domain address exists) |
| Area | Courchevel 1850, 1650 Moriond, 1550 Village, 1300 Le Praz, La Tania, and the Trois Vallées (Méribel, Val Thorens) |
| Address | Service-area business (hidden) until the street address is ready |
| Hours | 24/7 during the winter season; replies within 15 minutes, 8:00 to 22:00 |
| Short description (EN) | Courchevel Luxury Concierge is a luxury concierge in Courchevel, French Alps. We arrange chalets and palace hotels, helicopter and chauffeur transfers, private ski instructors, private chefs, household staff, childcare and events across Courchevel 1850, 1650 Moriond, 1550 Village, Le Praz and La Tania, 24/7 in winter. |
| Short description (FR) | Courchevel Luxury Concierge est une conciergerie de luxe à Courchevel, dans les Alpes françaises. Nous organisons chalets et palaces, transferts en hélicoptère et avec chauffeur, moniteurs de ski privés, chefs à domicile, personnel de maison, garde d’enfants et événements à Courchevel 1850, 1650 Moriond, 1550 Village, Le Praz et La Tania, 24 h/24 en hiver. |

## 1. Google Business Profile (exists: 5.0 from 14 reviews)

Found at https://maps.google.com/?cid=15229790847061064888 (Place ID `ChIJPRJmAL2Kv4ARuPyRohUWW9M`).
The pin is correctly in Courchevel. Changes to make in Google Business Profile Manager:

| Field | Today | Change to |
|---|---|---|
| Name | Courchevel Luxury Concierge | Keep |
| **Primary category** | **Travel agency** | **Concierge service** (type "concierge" and pick it). "Travel agency" suggests a registered travel operator (Atout France); your Acquisition Plan says only if registered. Competitors ranking for these searches use the concierge category. |
| Additional categories | ? | None needed. Add "Chalet" or "Limousine service" only if they are really your business (licences). |
| Description | "Courchevel, tailored to you. We create seamless Alpine experiences…" | The text below (same facts as the site) |
| Website | courchevelluxuryconcierge.com | `https://www.courchevelluxuryconcierge.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp` (so leads from Google are counted) |
| Appointment / booking link | ? | `https://www.courchevelluxuryconcierge.com/enquire/?utm_source=google&utm_medium=organic&utm_campaign=gbp` |
| Hours | Open 24 hours | Keep for the season (4 Dec 2026 – 18 Apr 2027). Decide off-season hours and set them in April. |
| Service area | Courchevel and nearby | Courchevel; Saint-Bon-Tarentaise; La Tania; Les Allues (Méribel); Les Belleville (Val Thorens) |
| Services | ? | The 12 services below, no prices |
| Messaging / WhatsApp | ? | Turn on; add the WhatsApp link https://wa.me/33757518056 |
| Social profiles | Instagram | Keep; add LinkedIn and Facebook when they exist |
| Photos | ? | Logo (square), cover (helicopter arrival), and the authentic photos from the site; add new ones every week in season |

**Description for Google (paste as is, under 750 characters):**

> Courchevel Luxury Concierge is a luxury concierge in Courchevel, French Alps. We arrange luxury chalets and palace hotels, helicopter transfers from Geneva, Lyon and Chambéry, chauffeured cars, private ski instructors and mountain guides, private chefs, household staff, nannies and events across Courchevel 1850, 1650 Moriond, 1550 Village, Le Praz and La Tania, and the Trois Vallées. One contact plans everything around your dates and village; every service is quoted personally. We reply within 15 minutes from 8:00 to 22:00 and are available 24/7 during the winter season. Assistants, family offices and travel agents are welcome to book for their clients.

**Services (name: one-line description):**

1. Chalets and palace hotels: luxury chalets and palace hotels, staffed and prepared before you arrive
2. Private aviation and transfers: helicopter transfers from Geneva, Lyon, Chambéry and Milan, private jets, chauffeured cars
3. Private ski and mountain: private instructors, off-piste guides, heli-skiing day trips to Italy or Switzerland
4. Mountain experiences: snowmobiling, dog sledding, paragliding, ice driving, scenic flights
5. Dining and private chefs: private and Michelin-starred chefs in the chalet, restaurant reservations
6. Nightlife and après-ski: après-ski and nightclub tables, private parties in the chalet
7. Household staff: butlers, chalet managers, housekeeping, serving staff
8. Family and childcare: nannies, babysitting, children's ski lessons, baby equipment
9. Wellness and beauty: in-chalet massage, spa bookings, personal trainers, hair and make-up
10. Events and celebrations: birthdays, proposals, weddings, New Year's Eve, corporate groups
11. Lifestyle, shopping and security: personal shopping, gifts, tickets, close protection
12. Chalet owner services: key holding, property checks, guest welcome, maintenance

**Posts:** one a week in season (snow, events, a recent arrival, the Christmas page), each linking to the matching page on the site.

## 2. Reviews (Google first)

- **Short links for every request:** `courchevelluxuryconcierge.com/review` (EN) and `/avis` (FR) open Google's "write a review" box. Use them in WhatsApp messages and as a QR code on the chalet welcome card.
- **When:** 24–48 hours after departure (plan, lead flow step 8).
- **Never** offer anything in exchange, never ask only happy clients, never write reviews yourself: Google removes them and can suspend the profile.
- **Reply to every review within 48 hours**, in the reviewer's language, naming the service and place ("the helicopter transfer from Geneva", "your chalet in 1850").
- **Check the existing reviews:** several mention visits in July and are in Spanish. If they relate to work outside Courchevel, Google may treat them as not matching this business. Reviews should describe Courchevel stays.
- **On the website:** with a Google Places API key (`GOOGLE_PLACES_API_KEY`, see `.env.example`), the homepage and `/reviews/` show the live rating and the latest reviews with Google attribution, refreshed at each build. Without the key they show links to the profile only.

**WhatsApp review request (EN):**
> Thank you for staying with us in Courchevel. If you have a minute, a short Google review helps other travellers find us: courchevelluxuryconcierge.com/review. Mentioning the services you used (chalet, transfer, chef…) is especially helpful. We hope to welcome you back.

**WhatsApp review request (FR):**
> Merci d’avoir séjourné avec nous à Courchevel. Si vous avez une minute, un avis Google aide d’autres voyageurs à nous trouver : courchevelluxuryconcierge.com/avis. Préciser les services utilisés (chalet, transfert, chef…) est particulièrement utile. Au plaisir de vous accueillir à nouveau.

## 3. Instagram (@courchevelluxuryconcierge)

Today: name "Courchevel Luxury | Concierge Management •Ibiza •Courchevel", bio mentions **Ibiza** and "exclusive access", **no website link**, about 260 followers, 66 posts.

| Field | Change to |
|---|---|
| Name (searchable) | **Courchevel Luxury Concierge** |
| Username | Keep @courchevelluxuryconcierge |
| Category | Concierge Service (professional account) |
| Bio (≤150 characters) | `Luxury concierge in Courchevel 1850 · Trois Vallées`<br>`Chalets · helicopter transfers · private chefs · ski`<br>`Reply in 15 min · EN / FR` |
| Link | **https://www.courchevelluxuryconcierge.com/?utm_source=instagram&utm_medium=social&utm_campaign=bio** |
| Contact buttons | WhatsApp +33 7 57 51 80 56, email, call |
| Highlights | Chalets · Transfers · Chefs · Ski · Families · Reviews · Contact (from the Acquisition Plan) |
| Ibiza | Move Ibiza content to its own account (or Just Enjoy Ibiza). One business per profile keeps Google and AI assistants from mixing the two. |

## 4. The other platforms (same name, phone, website, description)

| Platform | Note |
|---|---|
| Bing Places | Import from Google once the category is fixed (feeds Copilot and ChatGPT search) |
| Apple Business Connect | Apple Maps and Siri |
| Tripadvisor | Cited by AI for "best of" questions |
| Trustpilot | Cited for competitors (Nightfall) |
| Facebook page, LinkedIn company page | Then add their URLs to `sameAs` in `src/data/business.ts` |
| courchevel.com (tourist office) | Ask for a listing under concierge services |

Every time a profile goes live, add its URL to `sameAs` in `src/data/business.ts` so the website's schema links them into one business.
