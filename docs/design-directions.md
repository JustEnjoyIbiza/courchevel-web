# Two design directions for the homepage

Both start from the current site: its warm gold, its serif/sans pairing and its
real Courchevel photos. Both follow the plan: quiet luxury, generous white space,
one serif + one sans, full-width real photography, no stock icons, no pop-ups,
mobile first with a sticky **Plan my stay** + WhatsApp bar.

**One problem with today's palette:** the gold `#d8a24a` on white has a contrast
ratio of about 2.3:1, below the 4.5:1 that accessibility (and Lighthouse) require
for text. Both directions keep gold for lines, icons and large accents only, and
use a darker tone for any gold text.

---

## Direction A: "Ivory & Brass" (evolution of the current site)

Warm, calm and close to what clients see today. Feels like a palace-hotel letterhead.

| Token | Colour | Use |
|---|---|---|
| `ivory` | `#FBF8F3` | Page background |
| `stone` | `#EFE8DE` | Alternate sections, cards |
| `ink` | `#231B15` | Text, headings |
| `taupe` | `#6B5D52` | Secondary text (6.0:1 on ivory) |
| `brass` | `#C9A15A` | Hairlines, numbers, large display accents only |
| `brass-deep` | `#8A6A2F` | Links and small gold text (4.7:1 on ivory) |
| `button` | `#231B15` with ivory text | Primary "Plan my stay" button |

- **Type:** Cormorant Garamond (headings, 500/600) + Manrope (text, 400/500), both self-hosted.
  Cormorant is lighter and more refined than today's Playfair; Manrope is kept for continuity.
- **Shapes:** square corners or 2 px radius, thin 1 px brass rules between sections, no shadows.
- **Photography:** full-bleed, natural colour, slight warm grade.

## Direction B: "Midnight & Snow" (higher contrast, more modern)

Dark ink hero and footer framing white "snow" sections. Feels like a private aviation or
watch brand, and suits evening and helicopter photography.

| Token | Colour | Use |
|---|---|---|
| `midnight` | `#0E1620` | Hero overlay, header on scroll, footer |
| `snow` | `#FFFFFF` | Main sections |
| `frost` | `#F2F4F6` | Alternate sections |
| `graphite` | `#1C232B` | Text on light |
| `slate` | `#5A6570` | Secondary text (5.9:1 on white) |
| `champagne` | `#D9B77E` | Accents on midnight only (9.5:1 on midnight) |
| `button` | `#D9B77E` with midnight text on dark; midnight with white text on light | Plan my stay |

- **Type:** Playfair Display (headings, kept from today, 600) + Inter (text, 400/500), self-hosted.
- **Shapes:** 6 px radius on buttons and cards, generous padding, no shadows.
- **Photography:** cooler grade; dusk, gondola and helicopter images lead.

---

## Homepage wireframe (same structure in both directions)

Mobile first. Each block lists what it contains and which existing photo fits it.

1. **Header:** logo left; `EN | FR` switch and **Plan my stay** right. On mobile, the menu
   collapses and a sticky bottom bar shows **Plan my stay** + **WhatsApp**.
2. **Hero (full-bleed photo):** H1 "Private concierge in Courchevel", a 2-sentence summary
   of who we are and the area covered, buttons **Plan my stay** and **WhatsApp us**.
   Photo: `car&helicopter.jpeg` (A) or `photo/helicopter.jpeg` (B).
3. **Proof strip:** four short facts in a row: "Replies within 15 minutes", "24/7 in season",
   "1850 · 1650 · 1550 · Le Praz · La Tania", "Since [YEAR]" (TODO).
4. **The 12 services:** a 2-column grid on mobile, 3 or 4 columns on desktop. Each tile has
   a photo, a name and one line, and links to its service page. No icons.
5. **Signature experiences:** Winter Retreat, VIP Party Package, Ski Explorer (kept from
   today), plus Family Week, Christmas & New Year, Corporate Retreat later. Horizontal
   scroll on mobile.
6. **How it works:** 3 steps: tell us your dates, receive a tailored proposal within
   24 hours, everything arranged before you land.
7. **Villages:** five cards (1850, 1650 Moriond, 1550 Village, Le Praz, La Tania), each
   linking to its village guide. Photo: `13.jpeg`, `17.jpeg`, `photo/2.jpeg`.
8. **Reviews:** shown only once real, attributed reviews are supplied. Hidden until then.
9. **About teaser:** founder photo and name, languages, years in Courchevel, link to About.
   Photo: `1.jpeg` if it is the founder (to confirm).
10. **FAQ:** 5 top questions with short answers (FAQPage schema), link to the full FAQ.
11. **Final CTA:** full-width photo (`photo/shopBags.jpeg` or `4.jpeg`), one line,
    **Plan my stay**.
12. **Footer:** name, phone, WhatsApp, email, Instagram, area served, legal links,
    language switch.

### Differences between A and B in the wireframe

| Block | A: Ivory & Brass | B: Midnight & Snow |
|---|---|---|
| Header | Ivory, ink text | Transparent over hero, turns midnight on scroll |
| Hero text | Ink text in an ivory panel overlapping the photo (bottom left) | White text directly on a darkened photo |
| Proof strip | Brass numbers on stone | Champagne text on midnight |
| Service tiles | Photo above, text below, thin brass rule | Text over photo with dark gradient |
| Footer | Stone background | Midnight background |

**Recommendation:** A. It keeps the brand clients already know, reads better in bright
daylight on phones (the main device on the slopes), and makes it easier to reach
Lighthouse accessibility 95+.
