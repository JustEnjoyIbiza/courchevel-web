# Illustrator brief: Courchevel piste illustration for the website

Written 23 October 2026 for Courchevel Luxury Concierge (courchevelluxuryconcierge.com).
Send this brief to the illustrator as it is. Questions go to the owner; technical questions about
the files can be answered by the web developer.

## 1. The project in one paragraph

We are a private luxury concierge in Courchevel, French Alps. Our new website has a page that tells
the Courchevel ski area as a descent: the visitor scrolls from the top of La Saulire (2,740 m) down
to the village of Le Praz (1,300 m), following the longest run in Courchevel. We need one elegant
illustration of that side of the mountain, in our brand style, on which a gold ski track draws
itself down the real route as the visitor scrolls, and the stops along the way light up.

It must feel like a luxury travel illustration (think a fine hotel's hand-drawn map or a vintage
ski poster made modern), not a technical piste map.

## 2. What to draw

The Courchevel valley seen from below and slightly to the side, so the descent reads from top to
bottom of the image:

- **La Saulire summit, 2,740 m** at the top, with the ridge line. The Saulire cable car (top
  station 2,710 m, bottom station 2,077 m) as a fine line.
- **The descent route** (the one that will be animated): Combe de la Saulire, then the Verdons
  slopes, Plantrey, Brigues and Amoureux, down to Le Praz. It is graded red, 7.9 km long, 1,440 m
  of vertical (source: Les 3 Vallées, "longest descents").
- **Courchevel 1850** (with a hint of the altiport just above it), **1650 Moriond**,
  **1550 Village** and **1300 Le Praz** as small, refined village clusters (roofs, a few chalets,
  pine trees). Le Praz sits by the forest; the Olympic ski jumps at Le Praz may appear as a detail.
- **Forest** on the lower slopes, snow above the tree line, a quiet sky.
- Optional, very light: the gondolas linking Le Praz and 1550 Village to 1850.
- Do **not** draw lift names, piste numbers, legends, people, logos or brand names.

**Geography sources you may use** (to place things correctly, not to copy):
IGN Géoportail topographic maps (geoportail.gouv.fr), OpenStreetMap / OpenSnowMap piste lines
(opensnowmap.org; data © OpenStreetMap contributors, ODbL), and the public Les 3 Vallées piste map
as a visual reference only. **Do not trace or copy the official piste map** (it is copyrighted).
The illustration must be your own original drawing.

## 3. Style

- **Palette (exact colours only):**
  - Ivory `#FBF8F3` (snow, background)
  - Stone `#EFE8DE` (shadows on snow, soft areas)
  - Ink `#231B15` (lines, forest, rock, roofs)
  - Taupe `#6B5D52` (secondary lines, distant ridges)
  - Brass `#C9A15A` (the ski track and stop markers only)
  - Brass deep `#7F6129` (optional accents)
- **Line work:** fine, confident ink lines; restrained hatching for rock and shadow. Calm, airy,
  lots of white (ivory) space. No gradients, glows, drop shadows or 3D effects.
- **Mood:** quiet luxury, early morning light, freshly groomed snow.
- **No text inside the artwork.** The website adds the names and altitudes in its own typeface
  (Cormorant Garamond), so labels stay translatable (English and French).

## 4. Format and technical requirements (important)

The file is animated on the website, so it must be built this way:

1. **Format:** one SVG file (vector), plus the source file (Illustrator `.ai` or Figma).
2. **Canvas:** portrait, `viewBox="0 0 1000 2400"` (tall, so the descent runs top to bottom).
   The summit sits near the top (y ≈ 150), Le Praz near the bottom (y ≈ 2250).
3. **Layers / groups with these exact IDs:**
   - `mountain`: everything static (ridges, snow, rock, forest, villages, sky).
   - `route`: **one single open path**, no fill, stroke Brass `#C9A15A`, about 3 px wide, drawn
     **from the summit to Le Praz in that direction** (start point at La Saulire). This path is
     the ski track that draws itself on scroll. Smooth curves; it may zig-zag gently like ski
     turns, but it must follow the real route.
   - `stop-saulire`, `stop-cable-car`, `stop-1850`, `stop-1650`, `stop-1550`, `stop-le-praz`:
     one small marker each (a circle about 14 px, stroke Brass, no fill), placed on or beside the
     route at those places. The website lights them up as the visitor passes.
4. **Light file:** under 300 KB after optimisation (SVGO or similar); no embedded bitmaps,
   no fonts, no filters, no masks if avoidable; text converted to nothing (there should be none).
5. **Optional second version:** a simplified mobile crop of the same artwork
   (`viewBox="0 0 600 1800"`) with the same IDs.

## 5. Deliverables

- `courchevel-descent.svg` (and optionally `courchevel-descent-mobile.svg`), with the IDs above.
- The editable source file.
- A PNG preview at 2000 px tall.
- **Rights:** full, exclusive, worldwide commercial rights for the website and our marketing
  (website, social media, print), transferred in writing on final payment. Please confirm you used
  no traced or third-party artwork.

## 6. Process and timing

1. A pencil or grey sketch of the composition first, for approval (2 to 3 days).
2. Line work in ink, then colour, with one round of changes at each step.
3. Final files **by 13 November 2026**, so the page can be tested on the preview site before the
   launch on 24 November.

## 7. Facts checked (for your reference)

| Place | Altitude |
|---|---|
| La Saulire (summit) | 2,740 m |
| Saulire cable car, top / bottom | 2,710 m / 2,077 m |
| Courchevel 1850 | 1,850 m |
| Courchevel 1650 Moriond | 1,650 m |
| Courchevel 1550 Village | 1,550 m |
| Courchevel 1300 Le Praz | 1,300 m |

Sources: Les 3 Vallées (les3vallees.com), official Courchevel piste map, S3V press release 2024.

## 8. Where to find an illustrator (for the owner)

- **Top quality:** Behance (search "illustrated ski map", "hand-drawn resort map") or Dribbble.
- **Faster, lower budget:** Malt (France) or Fiverr Pro, filtered for "map illustration" with
  vector portfolios.
- Ask for 2 or 3 examples of maps or mountain illustrations they drew themselves, and for their
  timing and a fixed quote against this brief.

## 9. What happens when the files arrive (for the developer)

`src/components/SkiAreaPage.astro` already animates a simple brass track with CSS scroll-driven
animations (no JavaScript). The illustration replaces that line: the `route` path gets the same
`stroke-dashoffset` animation on the `--descent` view timeline, and each `stop-*` marker fades to
filled Brass over its section's range. Reduced motion and unsupported browsers show the full
illustration with the route drawn. Keep the page under the Lighthouse 95 budget (inline the
optimised SVG once, or load it as an `<img>` plus a small inline route overlay).
