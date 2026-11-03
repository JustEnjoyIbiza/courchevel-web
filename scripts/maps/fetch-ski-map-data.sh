#!/bin/zsh
# Downloads the data for scripts/maps/build-ski-map.py into a working folder.
#   relief.png   IGN shaded relief            (Licence Ouverte Etalab)
#   forest.png   IGN BD Forêt V2               (Licence Ouverte Etalab)
#   pistes.json  OSM pistes and lifts (Overpass, © OpenStreetMap contributors, ODbL)
# Usage: scripts/maps/fetch-ski-map-data.sh <working folder>
# Then:  python3 scripts/maps/build-ski-map.py <working folder>   (needs numpy and Pillow)
set -e
out=${1:?working folder}
mkdir -p "$out"
BBOX="45.376,6.598,45.438,6.665"   # lat/lon box, same as build-ski-map.py
WMS="https://data.geopf.fr/wms-r/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&STYLES=&CRS=EPSG:4326&BBOX=$BBOX&WIDTH=1100&HEIGHT=1450&FORMAT=image/png"
curl -sf -o "$out/relief.png" "$WMS&LAYERS=ELEVATION.ELEVATIONGRIDCOVERAGE.SHADOW"
curl -sf -o "$out/forest.png" "$WMS&LAYERS=LANDCOVER.FORESTINVENTORY.V2&TRANSPARENT=TRUE"

# Overpass is often busy: retry with backoff, then try a mirror.
query='[out:json][timeout:120];(way["piste:type"="downhill"](45.37,6.58,45.45,6.70);way["aerialway"](45.37,6.58,45.45,6.70););out geom tags;'
for endpoint in https://overpass-api.de/api/interpreter https://maps.mail.ru/osm/tools/overpass/api/interpreter; do
  for wait in 5 15 45; do
    if curl -sf -A "CourchevelLuxuryConcierge-site-build/1.0" --max-time 180 -o "$out/pistes.json" --data-urlencode "data=$query" "$endpoint" \
      && head -c 1 "$out/pistes.json" | grep -q '{'; then
      echo "Data ready in $out"; exit 0
    fi
    sleep $wait
  done
done
echo "Overpass unavailable, try again later" >&2; exit 1
