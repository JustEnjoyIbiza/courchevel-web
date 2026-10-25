# Photo credits

Every photo in `src/assets/photos/` is either the owner's own or a venue's
photo used with the venue's agreement. If a venue or photographer asks for a
photo to be removed, delete it from the entry in
`src/content/guides/{en,fr}/where-to-eat.md`, then from `src/data/photos.ts`,
`src/content/hub-stories.ts` (alt text) and `src/assets/photos/`, and remove
it from Cloudinary.

## Owner's own photos

All other files in `src/assets/photos/`, including the Bagatelle, Le Cap Horn
and Le Chalet de Pierres photos on Where to eat. Taken by the owner; no credit
shown.

## Venue photos (Where to eat, "Ten tables to know")

Downloaded on 24 October 2026 from the Courchevel tourist office listings,
which serve the photos the venues supplied to the regional Apidae database.
Used on the owner's instruction: the owner worked with these venues last
winter and considers their agreement given (24 October 2026). A short written
OK from each venue (WhatsApp is enough) is still worth keeping here.
TODO: owner to add the date of each venue's OK.

| File | Venue | Credit shown | Source page | Original file |
| --- | --- | --- | --- | --- |
| le-1947-dining-room.jpeg | Le 1947 à Cheval Blanc | Photo: Cheval Blanc Courchevel | https://courchevel.com/en/a/le-1947-a-cheval-blanc-185096/ | https://static.apidae-tourisme.com/filestore/objets-touristiques/images/224/105/16411104.jpg |
| sylvestre-wahid-dish.jpeg (not shown since 25 Oct 2026: restaurant closed after the January 2026 fire) | Sylvestre Wahid, Les Grandes Alpes | Photo: Sylvestre, Les Grandes Alpes | https://courchevel.com/en/a/undefined-6078549 | https://static.apidae-tourisme.com/filestore/objets-touristiques/images/169/187/35765161.webp |
| le-strato-dusk.jpeg | Slalom 1850, Le Strato | Photo: Le Strato | https://courchevel.com/en/a/slalom-1850-185100/ | https://static.apidae-tourisme.com/filestore/objets-touristiques/images/101/233/4712805.jpg |
| le-chabichou-dining-room.jpeg | Le Chabichou | Photo: Le Chabichou | https://courchevel.com/en/a/restaurant-le-chabichou-185095 | https://static.apidae-tourisme.com/filestore/objets-touristiques/images/120/44/20982904.jpeg |
| loulou-courchevel-booth.jpeg | Loulou, Fouquet's Courchevel | Photo: Loulou Courchevel | https://courchevel.com/en/a/loulou-courchevel-5070860/ | https://static.apidae-tourisme.com/filestore/objets-touristiques/images/83/164/27763795.jpg |
| la-mangeoire-dining-room.jpeg | La Mangeoire | Photo: La Mangeoire | https://courchevel.com/en/a/la-mangeoire-5070732/ | https://static.apidae-tourisme.com/filestore/objets-touristiques/images/239/29/4660719.jpg |

Resized to at most 2,000 px on the long side before adding (Le Strato and La
Mangeoire kept at their original 1,280 px).

La Mangeoire (added 24 October 2026): the owner did not work with this venue
last winter and will ask for its permission. TODO: record the date of its OK.

## Venue photo from the venue's own website

| File | Venue | Credit shown | Source page | Original file |
| --- | --- | --- | --- | --- |
| la-soucoupe-terrace.jpeg | La Soucoupe | Photo: La Soucoupe | https://www.lasoucoupecourchevel.com/ | https://www.lasoucoupecourchevel.com/i/la-soucoupe/3/5/6/4/0/2/1/5/1/3/5/6/7/1646384812_127/b17c406be186575b5332bccaa4014e70.small_original.jpg |

Downloaded on 24 October 2026; used on the owner's instruction, permission to
be confirmed with the venue. Kept at its original 1,400 px. TODO: record the
date of La Soucoupe's OK.

## Hotel photos (the hotels page and each hotel's page)

3 to 15 photos per hotel in `src/assets/hotels/<slug>/` (NN-room.jpeg; 01 is the lead
photo on the card), downloaded on 25 October 2026 and resized to 1,600 px. The credit
line on each hotel page names the hotel. Used on the owner's instruction: the owner
works with these hotels and approved using their press photos with a credit
(25 October 2026). Photos where a guest or staff member is the subject, renderings
and other properties of the same groups were left out.

Sources, per hotel:
- Cheval Blanc Courchevel: the hotel's image library (images.prismic.io/lvmh-chevalblanc)
- Airelles Courchevel: airelles.com (assets.airelles.com), Courchevel images only
- Fouquet's Courchevel: hotelsbarriere.com (a.storyblok.com)
- L'Apogée Courchevel: the hotel's own site was unreachable. Lead photo from
  journaldespalaces.com (© Romain Reglade / L'Apogée), the second from its Michelin Guide
  listing (© L'Apogée Courchevel), the lounge from journaldespalaces.com. TODO: ask the
  hotel (Oetker Collection) for press photos; the gallery has only 3.
- Le K2 Palace: lek2palace.com gallery (Stéphane Berthe); its 3D room renderings left out
- Aman Le Mélézin: aman.com gallery
- Le Lana: lelana.com gallery
- Sivolière: hotel-la-sivoliere.com; the new spa exists only as renderings, left out.
  The room photos date from before the 2026 relaunch and may differ.
- Le Strato: hotelstrato.com (hapidam image library)
- Annapurna: annapurna-courchevel.com gallery (no spa photos in it)

TODO: a short written OK from each hotel's press team (email is enough) before launch.
If a hotel asks for removal: delete its folder in `src/assets/hotels/` and its files in
`src/content/hotels/{en,fr}/`.

## Chalet photos (chalet cards and each chalet's page)

10 to 16 photos per chalet in `src/assets/chalets/<slug>/` (NN-room.jpeg; 01 is
the lead photo on the card), taken from the brochures the owner sent on
25 October 2026 (Google Drive PDFs from the owner's partner agency), resized to
1,600 px. Floor plans, near-duplicates and the residence restaurants (Titan) left
out. Used on the owner's instruction; no credit shown, so the agency is not
named on the site. The brochures themselves stay private.
Agency OK: the agency offered the PDFs to the owner for this use (owner, 25 Oct 2026).
Apartment Capucine's photos are real photographs (owner, 25 Oct 2026).
If a chalet is withdrawn: remove it from `src/content/chalets.ts` and delete its
folder in `src/assets/chalets/`.

| Folder | Chalet | Brochure (private, Google Drive file id) |
| --- | --- | --- |
| chalet-solstice | Chalet Solstice, 1850 | 1OjqS1UI_GEVuFVwpmSrNRiaNXA8kl8AA |
| chalet-neve | Chalet Neve, 1850 | 1ZZLW9cmN7ZsgKb19Sd_NtDlse2M-D6wF |
| chalet-shemshak | Chalet Shemshak, 1850 | 1n6z9BPvZliRtZGMgmVWygEtfaxO-Q2I9 |
| chalet-ellis | Chalet Ellis, 1850 | 1_i0j6_qJuEHZZsqy5n4t6cH1r7ByvG20 |
| penthouse-ivory | Penthouse Ivory, 1850 | 12iGtb41XVscCzuicbJqneFRpeaqYbOss |
| chalet-fleur | Chalet Fleur, 1850 | 1xB90yqNBMkZT433JJoAlUpkZOx3PoYcT |
| chalet-elia | Chalet Elia, 1850 | 1VWZyj-bJ1VqL9jrYfCStaktA18c7aAf- |
| chalet-sylvia | Chalet Sylvia, 1850 | 1LyY4JtOAoYE8czRwA31HJrdkwy3PHx_b |
| chalet-king | Chalet King, 1850 | 1PUMd65pRr7X70KEVimZ-fld5LYRqkKdC |
| chalet-titan | Chalet Titan, 1650 | 1serBlAEJ0ifDQRxIebm0UmPoHebVQIDD |
| chalet-philip | Chalet Philip, 1650 | 15nG7O57B93cRykQrIN3fbz_MEg0SRI8a |
| chalet-ibis | Chalet Ibis, Le Praz | 1oUYtW2-Nd1sPAFGORnkYXpIvGUVQUXP0 |
| chalet-hugo | Chalet Hugo, Méribel | 1ly1mSVUPwlC59K7Z1pOJQMzjw5xtZTTc |
| apartment-capucine | Apartment Capucine, Méribel | 16GdV8V0SqXM-SbMJ6BW5EvQ4JLz9R7ve |
