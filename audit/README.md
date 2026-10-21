# Audit of the current site

Snapshot taken **21 October 2026** from https://courchevelluxuryconcierge.com
(repo `JustEnjoyIbiza/courchevel-web`, commit `9e1e89d` on `main`).

The live HTML is byte-identical to the repo's `index.html`, so this folder is a
complete copy of the site as it was before the rebuild.

| File | What it is |
|---|---|
| `original-site/` | The whole old site (index.html, css/, assets/), moved here with `git mv` so history is kept |
| `live-homepage.html` | The homepage exactly as Netlify served it |
| `live-headers.txt` | HTTP response headers of the homepage |
| `live-www-redirect.txt` | Response for `https://www.` (301 to the bare domain) |
| `live-missing-files.txt` | Status of robots.txt, sitemap.xml, llms.txt, /fr/, /services/ (all 404) |
| `content.md` | Every piece of text on the site, word for word |
| `redirects.md` | Old URLs and where they should 301 to after launch |

Google Search Console: **no access yet**. TODO: check whether a property exists
for the domain and export queries/pages before launch (see missing facts).

## 1. Pages and URLs

The site is **one page**. Everything else is an anchor on `/`.

| URL | Status | Notes |
|---|---|---|
| `https://courchevelluxuryconcierge.com/` | 200 | The only page |
| `https://www.courchevelluxuryconcierge.com/` | 301 to bare domain | The plan uses `www.` as canonical: flip this at launch |
| `/#hero`, `/#about`, `/#services`, `/#packages`, `/#gallery`, `/#testimonials`, `/#contact` | anchors | No redirects needed |
| `/css/styles.css`, `/assets/*.jpeg`, `/assets/photo/*.jpeg`, `/assets/logo.png` | 200 | May be indexed in Google Images; see `redirects.md` |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt` | 404 | Netlify's default 404 page |

## 2. Head and SEO

| Item | Current value | Plan requirement |
|---|---|---|
| `<html lang>` | `en` | EN + FR with hreflang |
| `<title>` | `Courchevel Luxury Concierge` (27 chars) | Unique, keyword-led, under 60 chars |
| Meta description | "Courchevel Luxury Concierge — ski, transfers, VIP lifestyle and 24/7 concierge in Courchevel and the Three Valleys." (115 chars) | OK length; rewrite answer-first |
| Canonical | none | Required |
| Open Graph / Twitter | none | Required |
| JSON-LD schema | none | Organization + LocalBusiness + Service + FAQPage + BreadcrumbList |
| Headings | 1 x H1, **0 x H2**, H3 on cards; section titles are `<div>`s | One H1, real H2/H3 outline |
| Favicon | none | Add |
| robots.txt / sitemap / llms.txt | 404 | Required |
| Analytics | none (cookie text says no tracking) | GA4 after consent |

## 3. Technical

- **Stack:** hand-written HTML (343 lines) + one CSS file (731 lines) + inline JS. No build step, no `netlify.toml`.
- **Hosting:** Netlify (moved from GitHub Pages on 16 Oct 2026; CNAME removed). HTTPS on, Brotli, Netlify Edge cache.
- **Security headers:** only `strict-transport-security: max-age=31536000`. Missing CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- **Fonts:** Google Fonts (Playfair Display 600/700, Manrope 400/500/700), loaded from Google's CDN. Self-host them in the rebuild (faster and no IP transfer to Google under GDPR).
- **Images:** 28 JPEGs + a 1024 px PNG logo, 11 MB total, 94–324 KB each, no WebP/AVIF, no responsive sizes. All photos are CSS backgrounds with `aria-hidden`, so Google Images and AI crawlers cannot see them. The 184 KB logo is shown at about 40 px.
- **Page weight:** HTML 18 KB. Every gallery and card photo loads on first view (no lazy loading).

## 4. Lead capture

- **Form:** posts JSON with `fetch` to Basin (`https://usebasin.com/f/34a5258d7b37`). Without JavaScript the form does nothing.
- **Fields:** `name`, `dates` (free text), `service` (free text), `guests`, `budget` (optional), `message`, plus hidden `_subject` and `source`.
- **Critical: no email and no phone field.** A visitor who uses only the form cannot be answered. This should be fixed on the live site now, even before the rebuild launches.
- No consent checkbox, no honeypot, no captcha/Turnstile, no UTM capture, no confirmation email to the client.
- **WhatsApp:** `https://wa.me/33757518056` with pre-filled "Hi I'd like to book a VIP concierge experience in Courchevel" (header bar and hero). Works.
- **Email:** `mailto:Courchevelluxuryconcierge@gmail.com` (footer icon only). No visible phone number or `tel:` link anywhere.
- Instagram: `https://www.instagram.com/courchevelluxuryconcierge/`.

## 5. Legal and compliance

- Privacy policy and cookie notice exist only as short pop-ups (modals) in the footer, English only.
- The privacy text says the site collects "email/phone", but the form asks for neither. The text needs correcting.
- No mentions légales (legally required in France), no named publisher, no SIRET, no host details.
- No cookie banner. Correct today, as there is no analytics; one becomes required once GA4 is added.

## 6. Content

Full text in `content.md`. In short:

- **Hero:** badge "Ski • Transfers • VIP • Lifestyle — Available 24/7", H1, one paragraph, buttons "Book VIP Access — WhatsApp" and "View services".
- **About:** two generic paragraphs. No founder, no team, no years in business, no languages.
- **6 services:** Private Ski & Guides, Exclusive Chalets, VIP Transfers, Luxury Dining, Private Events & Parties, Wellness & Spa. One sentence each, no own page.
- **3 Signature Experiences** (keep them, per plan): Winter Retreat (3–5 nights in chalet), VIP Party Package, Ski Explorer.
- **Gallery:** 9 images with `aria-label`s only.
- **Testimonials:** 3 short quotes with **no name, initials, date or service**. Under the plan they cannot be shown or marked up as reviews unless the client confirms they are real and gives attribution.
- Area line: "Courchevel (Le Praz, 1550, 1650, 1850) and the Three Valleys". No La Tania.
- Phrases to avoid repeating without proof: "guaranteed VIP table reservations", "secret pistes", "We reply in minutes".

## 7. Photos

Reviewed one by one. **Ownership and rights must be confirmed for every photo before reuse.**

| File | Shows | Used for | Verdict |
|---|---|---|---|
| `assets/1.jpeg` | Man in cream knitwear in front of a South Pacific Helicopters helicopter on snow | Gallery 6 | Founder? Confirm who it is. Logo of another company |
| `assets/3.jpeg` | Rear of a beige Mercedes G-Class on a snowy street | unused | Good for transfers |
| `assets/4.jpeg` | Red "Courchevel" letters sculpture in the snow | unused | Strong local proof |
| `assets/5.jpeg` | Prada store sign in the snow | Gallery 8 | Brand sign: fine as resort scene, never as "partner" |
| `assets/6.jpeg` | Hermès store sign | Gallery 9 | Same as above |
| `assets/7.jpeg` | Rolex sign on a chalet facade | unused | Same as above |
| `assets/8.jpeg` | K2 Palace entrance with a Tesla | unused | Hotel name: only with permission or as fact |
| `assets/9.jpeg` | Gondola cabin at dusk | unused | Good mood shot |
| `assets/10.jpeg` | Clock and red lantern in falling snow | unused | Good mood shot |
| `assets/11.jpeg` | Large log chalet | Chalets card | **Looks North American, not Courchevel.** Replace |
| `assets/12.jpeg` | Mountain restaurant terrace with orange chairs | Hero + Dining card | Good, likely local |
| `assets/13.jpeg` | Wooden chalets with a gondola | Gallery 1 | Good, local |
| `assets/14.jpeg` | Two champagne flutes, garland, valley view | Events card + Gallery 2 | **Valley does not look like Courchevel; likely stock** |
| `assets/15.jpeg` | Two gondola cabins over trees | Gallery 3 | Good |
| `assets/16.jpeg` | Moncler store facade | Gallery 4 | Brand sign (as above) |
| `assets/17.jpeg` | Stone and wood chalet in snow | Gallery 5 | Good, local |
| `assets/photo/1.jpeg` | Family of four on skis, mountain panorama | Ski card + Ski Explorer | **Looks like stock.** Confirm or replace |
| `assets/photo/2.jpeg` | White wooden chalet in snowy pines | unused | Good |
| `assets/photo/car&helicopter.jpeg` | View from a Rolls-Royce dashboard to a helicopter on snow | Transfers card | Excellent, authentic |
| `assets/photo/champagne&view.jpeg` | Dom Pérignon bottles with the **Matterhorn** behind | VIP Party Package | **Not Courchevel (Zermatt/Cervinia).** Replace |
| `assets/photo/coffee.jpeg` | Strudel, coffee and martini on a terrace with mountains | unused | Location unclear |
| `assets/photo/helicopter.jpeg` | Black helicopter landing between snowy pines | unused | Good |
| `assets/photo/helicopters.jpeg` | Two Blade helicopters on a pad | unused | Operator logo visible |
| `assets/photo/jacuzzi&view.jpeg` | Steaming outdoor hot tub, snowy pines | Wellness card | Looks professional; confirm rights |
| `assets/photo/luggage.jpeg` | Defender with luxury luggage in the snow | unused | Good for arrival service |
| `assets/photo/mountainView.jpeg` | Striped-cushion terrace table with Alpine panorama | Winter Retreat | **Looks AI-generated or stock.** Replace |
| `assets/photo/shopBags.jpeg` | Two cars unloading dozens of shopping bags and gifts at a chalet | unused | Excellent, authentic (lifestyle/Christmas) |
| `assets/photo/van.jpeg` | Interior of a Mercedes V-Class | unused | Good for transfers |
| `assets/logo.png` | Logo, 1024×1024 PNG | Header + footer | Need an SVG or a high-res transparent PNG |

## 8. Keep, fix, drop

**Keep:** business name, WhatsApp number and link format, Instagram, the 3 Signature Experiences,
the authentic photos (car&helicopter, shopBags, luggage, van, 3, 4, 9, 10, 12, 13, 15, 17, photo/2,
photo/helicopter), the warm palette as a starting point.

**Fix:** form (email + phone + consent), privacy text, headings, alt text, image formats, `www.` canonical.

**Drop or replace:** photos that are not Courchevel or look like stock (11, 14, photo/1,
champagne&view, mountainView), unattributed testimonials, unproven claims.
