"""
Builds the village maps used on /villages/ and each village page.

  src/assets/maps/valley-relief.png       relief map of the Courchevel valley (five villages)
  src/assets/maps/aerial-<slug>.jpg       aerial photo of each village, toned in the brand palette
  src/data/village-map-geo.ts             pistes, lifts and village positions in valley-map pixels

Sources: IGN shaded relief, BD Forêt V2 and orthophotos (Géoplateforme WMS, Licence Ouverte
Etalab), and OpenStreetMap pistes and lifts (pistes.json from fetch-ski-map-data.sh,
© OpenStreetMap contributors, ODbL). Village positions are OSM place nodes; Méribel uses
Chaudanne, its main lift base (start of the Saulire Express 1 gondola in OSM).

South is at the top, like the Slopes page map (looking up the valley from the villages).

Usage: python3 scripts/maps/build-village-maps.py <working folder with pistes.json>   (numpy, Pillow)
"""
import io
import json
import sys
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

work = Path(sys.argv[1])
root = Path(__file__).resolve().parents[2]
out_dir = root / 'src/assets/maps'
out_dir.mkdir(parents=True, exist_ok=True)

IVORY = np.array([251, 248, 243], float)
STONE = np.array([239, 232, 222], float)
TAUPE = np.array([107, 93, 82], float)
INK = np.array([35, 27, 21], float)
FOREST_COLOURS = [(26, 230, 230), (0, 147, 27), (255, 152, 51), (255, 64, 51), (135, 97, 250), (255, 209, 56)]

VILLAGES = {
    'courchevel-1850': (45.41410, 6.63499),
    'courchevel-1650-moriond': (45.41787, 6.65264),
    'courchevel-1550-village': (45.42216, 6.64351),
    'courchevel-1300-le-praz': (45.43255, 6.62196),
    'la-tania': (45.43217, 6.59640),
    'meribel': (45.39140, 6.56710),
    'val-thorens': (45.29791, 6.58227),
}
ALTIPORT = (45.39709, 6.63503)


def wms(layer, bbox, w, h, fmt='image/png', transparent=False):
    s, west, n, e = bbox
    url = (
        'https://data.geopf.fr/wms-r/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&STYLES=&CRS=EPSG:4326'
        f'&LAYERS={layer}&BBOX={s},{west},{n},{e}&WIDTH={w}&HEIGHT={h}&FORMAT={fmt}'
        + ('&TRANSPARENT=TRUE' if transparent else '')
    )
    with urllib.request.urlopen(url, timeout=120) as r:
        return Image.open(io.BytesIO(r.read()))


# --- Valley map ---------------------------------------------------------------
S, N, W, E = 45.395, 45.445, 6.585, 6.668
WIDTH = 1300
HEIGHT = round(WIDTH * (N - S) / ((E - W) * np.cos(np.radians((S + N) / 2))))


def px(lat, lon):
    x = (lon - W) / (E - W) * WIDTH
    y = (N - lat) / (N - S) * HEIGHT
    return round(WIDTH - x, 1), round(HEIGHT - y, 1)   # turned 180 degrees: south at the top


relief = np.array(wms('ELEVATION.ELEVATIONGRIDCOVERAGE.SHADOW', (S, W, N, E), WIDTH, HEIGHT)).astype(float)
shade = np.clip(relief[..., 3] / 62.0, 0, 1) ** 0.75
forest_rgba = np.array(wms('LANDCOVER.FORESTINVENTORY.V2', (S, W, N, E), WIDTH, HEIGHT, transparent=True).convert('RGBA'))
forest = np.zeros(shade.shape, bool)
for c in FOREST_COLOURS:
    forest |= (forest_rgba[..., 3] > 0) & np.all(np.abs(forest_rgba[..., :3].astype(int) - c) <= 2, axis=-1)

img = IVORY * (1 - shade[..., None] * 0.35) + STONE * (shade[..., None] * 0.35)
img = img * (1 - shade[..., None] * 0.62) + TAUPE * (shade[..., None] * 0.62)
img = np.where(forest[..., None], img * 0.86 + INK * 0.14, img)
yy, xx = np.mgrid[0:HEIGHT, 0:WIDTH]
edge = np.minimum.reduce([xx, WIDTH - 1 - xx, yy, HEIGHT - 1 - yy]).astype(float)
fade = np.clip(edge / 90.0, 0, 1)[..., None]
img = img * fade + IVORY * (1 - fade)

rng = np.random.default_rng(1650)
base = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))
big = base.resize((WIDTH * 2, HEIGHT * 2), Image.LANCZOS).convert('RGBA')
layer = Image.new('RGBA', big.size, (0, 0, 0, 0))
draw = ImageDraw.Draw(layer)
ys, xs = np.nonzero(forest)
for i in rng.integers(0, len(xs), len(xs) // 5):
    x, y = xs[i] + rng.random(), ys[i] + rng.random()
    r = 1.3 + rng.random() * 1.1
    a = int(255 * (0.45 + 0.4 * shade[ys[i], xs[i]]) * fade[ys[i], xs[i], 0])
    draw.ellipse((2 * x - r, 2 * y - r, 2 * x + r, 2 * y + r), fill=(35, 27, 21, a))
valley = Image.alpha_composite(big, layer).convert('RGB').resize((WIDTH, HEIGHT), Image.LANCZOS).rotate(180)
valley.save(out_dir / 'valley-relief.png', optimize=True)

data = json.load(open(work / 'pistes.json'))
ways = [e for e in data['elements'] if e['type'] == 'way']
inside = lambda g: any(S <= p['lat'] <= N and W <= p['lon'] <= E for p in g)
line = lambda g: 'M' + ' L'.join('%s %s' % px(p['lat'], p['lon']) for p in g[::2] + [g[-1]])
pistes = [line(w['geometry']) for w in ways if w.get('tags', {}).get('piste:type') == 'downhill' and inside(w['geometry'])]
lifts = [
    'M%s %s L%s %s' % (*px(w['geometry'][0]['lat'], w['geometry'][0]['lon']), *px(w['geometry'][-1]['lat'], w['geometry'][-1]['lon']))
    for w in ways
    if w.get('tags', {}).get('aerialway') in ('cable_car', 'gondola', 'chair_lift', 'mixed_lift') and inside(w['geometry'])
]
markers = {slug: list(px(*ll)) for slug, ll in VILLAGES.items() if S <= ll[0] <= N and W <= ll[1] <= E}

# --- Aerial photos ------------------------------------------------------------
AW, AH = 1200, 900
HALF_LAT = 0.0055                                   # about 1.2 km tall
for slug, (lat, lon) in VILLAGES.items():
    half_lon = HALF_LAT * AW / AH / np.cos(np.radians(lat))
    photo = wms('ORTHOIMAGERY.ORTHOPHOTOS', (lat - HALF_LAT, lon - half_lon, lat + HALF_LAT, lon + half_lon), AW, AH, 'image/jpeg')
    a = np.array(photo.convert('RGB')).astype(float)
    lum = a[..., 0] * 0.299 + a[..., 1] * 0.587 + a[..., 2] * 0.114
    lo, hi = np.percentile(lum, [2, 98])
    t = np.clip((lum - lo) / (hi - lo), 0, 1) ** 0.9
    # Ink in the shadows, taupe in the middle tones, ivory in the light.
    toned = np.where(
        t[..., None] < 0.5,
        INK * (1 - t[..., None] * 2) + TAUPE * (t[..., None] * 2),
        TAUPE * (1 - (t[..., None] - 0.5) * 2) + IVORY * ((t[..., None] - 0.5) * 2),
    )
    Image.fromarray(np.clip(toned, 0, 255).astype(np.uint8)).save(out_dir / f'aerial-{slug}.jpg', quality=86, optimize=True)
    print('aerial', slug)

ts = f'''/**
 * Generated by scripts/maps/build-village-maps.py. Do not edit by hand.
 * Valley map: src/assets/maps/valley-relief.png ({WIDTH} x {HEIGHT}, south at the top).
 * Pistes and lifts: © OpenStreetMap contributors (ODbL). Relief, forests and aerial photos: IGN (Licence Ouverte).
 */
export const valleySize = {{ width: {WIDTH}, height: {HEIGHT} }};
export const valleyPistes: string[] = {json.dumps(pistes)};
export const valleyLifts: string[] = {json.dumps(lifts)};
/** Village positions on the valley map (villages outside it are not listed). */
export const valleyMarkers: Record<string, [number, number]> = {json.dumps(markers)};
export const valleyAltiport: [number, number] = {json.dumps(list(px(*ALTIPORT)))};
'''
(root / 'src/data/village-map-geo.ts').write_text(ts)
print('valley', valley.size, '| pistes', len(pistes), '| lifts', len(lifts), '| markers', markers)
