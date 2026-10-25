# Transfer routes, times and prices: sources

Data: `src/content/transfers.ts` (shown on `/services/transfers/`). Researched 25 October 2026 from public
pages only (no quotes requested). **The page shows only the nearby airports and resorts a helicopter flies from**
(owner, 25 Oct: Geneva, Chambéry, Lyon, Grenoble, Annecy, Sion; Milan and Turin and four resorts folded). Nice,
Zurich, Paris, the stations, Verbier/Zermatt/St. Moritz and all jet routes and guide prices below are kept as
research only; jets appear as a short band without prices. **Every price on the page is a market reference until the owner confirms
or replaces it** with our partners' rates; set `pricesConfirmed = true` then. Re-check before 4 December.

## Rules for the prices

- One way, in euros, **VAT included** (prices shown to private clients in France must include VAT), for the
  whole helicopter, car or aircraft, shown as "from" prices next to the note that they vary.
- Never in schema, llms.txt or FAQ answers (FAQ text goes into the FAQPage schema).
- Where no premium price was published, the page says "On request".

## Helicopter (to Courchevel Altiport)

Prices: Héli Sécurité / MONACAIR grid, "from €X*, *indicative", basis and VAT not stated
(https://helisecurite.fr/en/destinations/courchevel, same grid on monacair.mc). They rose between July and
October 2026 (Geneva €2,750 → €3,100; Chambéry €2,300 → €2,700; Val d'Isère €1,300 → €1,700). PrivateFly gives
one-way ranges per aircraft from H125 to H155: Geneva €2,200-7,100, Chambéry €1,700-6,300, Lyon €2,550-9,200.

| Route | Flight time | From | Times from |
|---|---|---|---|
| Geneva | 30-35 min | €3,100 | Héli Sécurité, PrivateFly 30; Alpes Hélicoptères 35 |
| Chambéry | 25 min | €2,700 | all sources 25 |
| Lyon Saint-Exupéry | 40-45 min | €3,950 | Héli Sécurité 40; Alpes Hélicoptères 45 |
| Grenoble | 30-40 min | €3,100 | Héli Sécurité 30; Alpes Hélicoptères 40 |
| Annecy | 20-30 min | €2,000 | Héli Sécurité 20; PrivateFly 25; Alpes Hélicoptères 30 |
| Sion | 35-40 min | €3,950 | Héli Sécurité 35; Alpes Hélicoptères 40 |
| Milan | 50-60 min | on request | JSHS 50; Alpes Hélicoptères (Malpensa) 60 |
| Turin | 40 min | on request | Alpes Hélicoptères |
| Nice | 65-70 min | €4,800 | Héli Sécurité 65; Alpes Hélicoptères, PrivateFly 70 |
| Zurich | 90 min | on request | Alpes Hélicoptères |
| Méribel / Val Thorens | 8-10 / 15 min | on request | Héli Sécurité, Alpes Hélicoptères |
| Val d'Isère / Megève | 15-20 min | €1,700 / €1,450 | Héli Sécurité |
| Verbier / Zermatt / St. Moritz | 50 / 60 / 90 min | on request | Alpes Hélicoptères |

Altiport facts: helicopters land on the altiport's own helicopter area; open 0800-1800 UTC, night flights banned;
flight information service 0800-1545 UTC from the first Monday of December to early February, then 0800-1615 UTC
(eAIP of 1 Oct 2026, VAC LFLJ). Flights from Switzerland need customs with 24 h notice; non-Schengen flights not
authorised. Landing fees winter 2026/27 €300-675 TTC per landing by helicopter weight (mairie-courchevel.com,
TARIFS_VALIDES_2026-2027_HELICOS_HIVER.pdf); no operator says whether its price includes them.
Luggage: about 4 soft bags or 2 suitcases in an H125/H130 (PrivateFly).

## Chauffeured car (to Courchevel 1850)

Prices: C-Limousine grid updated 14 Oct 2026, VAT included (https://c-limousine.com/prix-transfert-van-courchevel/,
https://c-limousine.com/prix-transfert-station-inter-station-courchevel/): Vito 8 seats / V-Class 7 / S-Class 3.
The page shows V-Class and S-Class. Its grid is headed "ALLER / RETOUR"; it reads as one way in either direction
(prices match other premium one-way fares) but **confirm with the partner**. Other premium Geneva one-way prices:
Swiss Limousine Service V-Class CHF 745-820, S-Class CHF 910-950; GVA guide site V CHF 878, S CHF 1,062.
Standard (non-premium) reference: French Cab Car V-Class Geneva €480 weekdays, €580 weekends.

| Route | km | Time | V-Class / S-Class from |
|---|---|---|---|
| Geneva airport | 149 (lake road; 194 by motorway) | 2 h 15-2 h 45 (route planners 2 h 31-2 h 46) | €850 / €1,100 |
| Chambéry airport | 110 | 1 h 20-1 h 30 | €650 / €800 |
| Lyon Saint-Exupéry | 187 | 2 h 20-2 h 50 | €850 / €1,200 |
| Grenoble airport | 175 | 2 h 10-2 h 20 | €800 / €1,100 |
| Annecy | 95 | 1 h 35-1 h 40 | €600 / €800 |
| Milan (airport not stated) | 350-400 | 4 h 30-5 h (Fréjus or Mont Blanc) | €1,950 / €2,800 |
| Turin | 241 (Fréjus) | 3 h-3 h 10 | €1,400 / €1,700 |
| Nice airport | 525 | 6 h 10-6 h 30 | on request |
| Zurich airport | 420 | 5 h 10-5 h 30 | on request |
| Paris | 670 | about 7 h 10 | €2,300 / €3,600 |
| Moûtiers station | 24 | 30 min | €140 / €160 |
| Albertville station | 51 | 45-50 min | on request |
| Méribel | 31 | 35-40 min | €180 / on request |
| Val Thorens | 54-63 | 1 h 05-1 h 20 | €390 / €450 |

Distances and times: OSRM and Valhalla route planners (OpenStreetMap), 25 Oct 2026, no traffic or snow; Leader
Limousines, Alpine Ride. High-season Saturdays: up to about an hour more (Alps2Alps, ByCar; Alpine Ride says
15-30 min). Surcharges seen elsewhere: night +10-20%, Saturdays, holidays +10-15%. Tunnels 2026: Mont Blanc
€55.80 one way (night closures 22:00-06:00 on 14-17 Dec 2026), Fréjus €56.40.

## Private jets (guide prices)

LunaJets guide prices, "calculated 1 October 2026", whole aircraft, one way, crew, fuel and landing fees included,
VAT and de-icing not stated (https://www.lunajets.com/en/private-jet-charter/...). Its own pages disagree slightly
(London-Chambéry Phenom 300 €13,400 vs €13,600). Times are LunaJets estimates unless noted.

| Flight | Time | Aircraft | Guide from |
|---|---|---|---|
| Paris Le Bourget - Chambéry | 1 h-1 h 10 | light (Mustang) | €6,700 |
| London - Chambéry | 1 h 30-1 h 40 | light (Phenom 300) | €13,400 |
| London - Geneva | 1 h 25-1 h 35 | midsize (Citation XLS) | €11,400 |
| Brussels - Chambéry | 1 h 10-1 h 15 | light (Mustang) | €7,900 |
| Amsterdam - Chambéry | 1 h 25-1 h 35 | light (CJ2) | €9,800 |
| Nice - Chambéry | 45-55 min | light (Phenom 100) | €5,700 |
| Milan - Chambéry | 50 min | light (Phenom 100) | €6,000 |
| Zurich - Chambéry | 50 min | light (Phenom 300) | €8,300 |
| Istanbul - Chambéry | 2 h 55-3 h 05 | midsize (XLS) | €21,600 |
| Dubai - Chambéry or Geneva | 6 h 30 | super-midsize | on request (GlobalCharter's figure is given in both $ and €) |
| New York - Chambéry or Geneva | 8 h 30-9 h, one stop | super-midsize | on request |
| Paris - Courchevel Altiport | 1 h 25-1 h 30 | Pilatus PC-12 | €7,500 |
| Geneva - Courchevel Altiport | 20-40 min | Pilatus PC-12 | €4,900 (time: Alpine Airlines 18 min, LunaJets 40 min) |

Airports: Chambéry 2,020 m runway, business terminal, Saturday slot rules mid-December to mid-April (book a COHOR
number); Geneva takes every size, prior permission for every private flight. Altiport: 536 × 40 m runway, slope up
to 18.5% (mairie), propeller aircraft up to 5.7 t, pilots need the mountain rating or an altiport authorisation;
fixed-wing operators listed by the mairie: Alpine Airlines and Aérosavoie (Fly 7 also flies PC-12s there).
