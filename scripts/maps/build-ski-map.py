"""
Builds the relief map of the Courchevel valley used on /courchevel-ski-area/.

Inputs (fetched with fetch-ski-map-data.sh into a working folder):
  relief.png   IGN shaded relief (ELEVATION.ELEVATIONGRIDCOVERAGE.SHADOW), Licence Ouverte Etalab
  forest.png   IGN BD Forêt V2 (LANDCOVER.FORESTINVENTORY.V2), Licence Ouverte Etalab
  pistes.json  OpenStreetMap pistes and lifts via Overpass, © OpenStreetMap contributors, ODbL
All three cover the same box: lat 45.376-45.438, lon 6.598-6.665, 1100 x 1450 px.

Outputs:
  src/assets/maps/courchevel-relief.png   the tinted relief, in brand colours
  src/data/ski-map-geo.ts                 pistes, lifts, the descent and the stops in image pixels

The map is turned 180 degrees (south at the top), as if looking up the valley from
Le Praz, so the descent from La Saulire runs down the page.

Usage: python3 scripts/maps/build-ski-map.py <working folder>   (needs numpy and Pillow)
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

work = Path(sys.argv[1])
root = Path(__file__).resolve().parents[2]

S, N, W, E = 45.376, 45.438, 6.598, 6.665
WIDTH, HEIGHT = 1100, 1450

IVORY = np.array([251, 248, 243], float)
STONE = np.array([239, 232, 222], float)
TAUPE = np.array([107, 93, 82], float)
INK = np.array([35, 27, 21], float)

# BD Forêt V2 legend colours that are real forest (conifers, broadleaf, larch, mixed);
# moorland, grassland and water are left as snow.
FOREST_COLOURS = [(26, 230, 230), (0, 147, 27), (255, 152, 51), (255, 64, 51), (135, 97, 250), (255, 209, 56)]


def px(lat, lon):
    """Pixel position after the 180-degree turn."""
    x = (lon - W) / (E - W) * WIDTH
    y = (N - lat) / (N - S) * HEIGHT
    return round(WIDTH - x, 1), round(HEIGHT - y, 1)


# --- Relief image -----------------------------------------------------------
relief = np.array(Image.open(work / 'relief.png')).astype(float)
shade = np.clip(relief[..., 3] / 62.0, 0, 1) ** 0.75

forest_rgba = np.array(Image.open(work / 'forest.png'))
forest = np.zeros(shade.shape, bool)
for c in FOREST_COLOURS:
    forest |= (forest_rgba[..., 3] > 0) & np.all(np.abs(forest_rgba[..., :3].astype(int) - c) <= 2, axis=-1)

rng = np.random.default_rng(1850)
# Snow: ivory, shaded towards stone then taupe on the slopes facing away from the light.
img = IVORY * (1 - shade[..., None] * 0.35) + STONE * (shade[..., None] * 0.35)
img = img * (1 - shade[..., None] * 0.62) + TAUPE * (shade[..., None] * 0.62)
# Forest floor: a light ink wash so the forest areas read as a whole.
img = np.where(forest[..., None], img * 0.86 + INK * 0.14, img)
# Soft fade to the page colour at the edges.
yy, xx = np.mgrid[0:HEIGHT, 0:WIDTH]
edge = np.minimum.reduce([xx, WIDTH - 1 - xx, yy, HEIGHT - 1 - yy]).astype(float)
fade = np.clip(edge / 90.0, 0, 1)[..., None]
img = img * fade + IVORY * (1 - fade)

base = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))

# Trees: soft dots drawn at 2x and scaled down, only inside forest, denser in the shade.
from PIL import ImageDraw
big = base.resize((WIDTH * 2, HEIGHT * 2), Image.LANCZOS).convert('RGBA')
layer = Image.new('RGBA', big.size, (0, 0, 0, 0))
draw = ImageDraw.Draw(layer)
ys, xs = np.nonzero(forest)
n = len(xs) // 5
pick = rng.integers(0, len(xs), n)
for i in pick:
    x, y = xs[i] + rng.random(), ys[i] + rng.random()
    r = 1.3 + rng.random() * 1.1
    a = int(255 * (0.45 + 0.4 * shade[ys[i], xs[i]]) * fade[ys[i], xs[i], 0])
    draw.ellipse((2 * x - r, 2 * y - r, 2 * x + r, 2 * y + r), fill=(35, 27, 21, a))
big = Image.alpha_composite(big, layer).convert('RGB')
out = big.resize((WIDTH, HEIGHT), Image.LANCZOS).rotate(180)
(root / 'src/assets/maps').mkdir(parents=True, exist_ok=True)
out.save(root / 'src/assets/maps/courchevel-relief.png', optimize=True)

# --- Vector layers ----------------------------------------------------------
data = json.load(open(work / 'pistes.json'))
ways = {e['id']: e for e in data['elements'] if e['type'] == 'way'}


def line(geom, step=1):
    pts = [px(p['lat'], p['lon']) for p in geom][::step]
    if geom and pts[-1] != px(geom[-1]['lat'], geom[-1]['lon']):
        pts.append(px(geom[-1]['lat'], geom[-1]['lon']))
    return 'M' + ' L'.join(f'{x} {y}' for x, y in pts)


inside = lambda g: any(S <= p['lat'] <= N and W <= p['lon'] <= E for p in g)
pistes = [
    {'d': line(w['geometry'], 2), 'level': w['tags'].get('piste:difficulty', 'intermediate')}
    for w in ways.values()
    if w.get('tags', {}).get('piste:type') == 'downhill' and inside(w['geometry'])
]
lifts = [
    {'d': line([w['geometry'][0], w['geometry'][-1]])}
    for w in ways.values()
    if w.get('tags', {}).get('aerialway') in ('cable_car', 'gondola', 'chair_lift', 'mixed_lift') and inside(w['geometry'])
]

# The official longest descent (Les 3 Vallées): Combe de la Saulire, Verdons, Plantrey,
# Brigues, down to Le Praz. OSM way ids, in order, from the summit down.
ROUTE_WAYS = [103030217, 103030216, 29458906, 655035721, 655035732, 102067071, 329041293, 329041292, 141824178, 675296963, 675296962]
summit = (45.38247, 6.60934)   # La Saulire, OSM node 324040107
le_praz = (45.43255, 6.62196)  # Courchevel Le Praz, OSM place node
route_pts = [px(*summit)]
for wid in ROUTE_WAYS:
    for p in ways[wid]['geometry']:
        q = px(p['lat'], p['lon'])
        if q != route_pts[-1]:
            route_pts.append(q)
route_pts.append(px(*le_praz))
route = 'M' + ' L'.join(f'{x} {y}' for x, y in route_pts)

stops = {
    'stop-saulire': px(*summit),
    'stop-cable-car': px(45.3964, 6.6195),   # Saulire cable car, bottom station (OSM way 94157939)
    'stop-1850': px(45.4141, 6.63499),
    'stop-1650': px(45.41787, 6.65264),
    'stop-1550': px(45.42216, 6.64351),
    'stop-le-praz': px(*le_praz),
}
altiport = px(45.39709, 6.63503)

ts = f'''/**
 * Generated by scripts/maps/build-ski-map.py. Do not edit by hand.
 * Pixel coordinates on src/assets/maps/courchevel-relief.png ({WIDTH} x {HEIGHT}, south at the top).
 * Pistes and lifts: © OpenStreetMap contributors (ODbL). Relief and forests: IGN (Licence Ouverte).
 */
export const mapSize = {{ width: {WIDTH}, height: {HEIGHT} }};
export const pistes = {json.dumps(pistes)} as {{ d: string; level: string }}[];
export const lifts = {json.dumps(lifts)} as {{ d: string }}[];
export const route = {json.dumps(route)};
export const stops: Record<string, [number, number]> = {json.dumps({k: list(v) for k, v in stops.items()})};
export const altiport: [number, number] = {json.dumps(list(altiport))};
'''
(root / 'src/data/ski-map-geo.ts').write_text(ts)
print('relief', out.size, '| pistes', len(pistes), '| lifts', len(lifts), '| route points', len(route_pts))
print('stops', stops)
