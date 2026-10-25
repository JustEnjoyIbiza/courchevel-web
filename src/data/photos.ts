/**
 * Photo registry. Content files refer to photos by key (`image: helicopter`),
 * so writers never deal with import paths. Only authentic photos belong here
 * (see audit/README.md, section 7). Rights still to be confirmed by the owner.
 */
import rollsRoyceHelicopter from '../assets/photos/rolls-royce-helicopter-arrival.jpeg';
import helicopter from '../assets/photos/helicopter-landing-pines.jpeg';
import giftDelivery from '../assets/photos/chalet-gift-delivery.jpeg';
import luggage from '../assets/photos/defender-luggage-snow.jpeg';
import whiteChalet from '../assets/photos/white-chalet-pines.jpeg';
import stoneChalet from '../assets/photos/stone-chalet-snow.jpeg';
import woodenChalets from '../assets/photos/wooden-chalets-gondola.jpeg';
import terrace from '../assets/photos/mountain-restaurant-terrace.jpeg';
import gondola from '../assets/photos/gondola-dusk.jpeg';
import lantern from '../assets/photos/lantern-snowfall.jpeg';
import sculpture from '../assets/photos/courchevel-sculpture.jpeg';
import hotTub from '../assets/photos/outdoor-hot-tub-pines.jpeg';
// Owner's own photos, added 23 October 2026
import chaletLivingRoom from '../assets/photos/chalet-living-room-fireplace.jpeg';
import chaletLounge from '../assets/photos/chalet-lounge-chandelier.jpeg';
import stoneChaletDeepSnow from '../assets/photos/stone-chalet-deep-snow.jpeg';
import privateJet from '../assets/photos/private-jet-cabin.jpeg';
import diningTable from '../assets/photos/dining-table-mountain-window.jpeg';
import partyTable from '../assets/photos/party-table-mirror-ball.jpeg';
import apresSki from '../assets/photos/apres-ski-terrace-sun.jpeg';
import skiers from '../assets/photos/skiers-below-chalets.jpeg';
import husky from '../assets/photos/husky-sled-dog-snow.jpeg';
import boutiquesNight from '../assets/photos/courchevel-1850-boutiques-night.jpeg';
import restaurantView from '../assets/photos/restaurant-chandelier-mountain-view.jpeg';
import vanSnow from '../assets/photos/black-van-snow-peaks.jpeg';
import lunchTable from '../assets/photos/terrace-lunch-table-peak.jpeg';
import christmasTree from '../assets/photos/christmas-tree-mountains.jpeg';
import firePit from '../assets/photos/terrace-fire-pit.jpeg';
import vanInterior from '../assets/photos/van-leather-seats-open-door.jpeg';
import paraglider from '../assets/photos/paraglider-over-valley.jpeg';
import courchevelGondola from '../assets/photos/courchevel-gondola-cabin.jpeg';
import bagatelle from '../assets/photos/bagatelle-arch-mountain-terrace.jpeg';
import capHorn from '../assets/photos/cap-horn-1954-sign.jpeg';
import chaletDePierres from '../assets/photos/chalet-de-pierres-gondola.jpeg';
// Venue photos from the Courchevel tourist office listings, used with the
// venues' agreement (owner, 24 Oct 2026). Sources: docs/photo-credits.md
import le1947 from '../assets/photos/le-1947-dining-room.jpeg';
import sylvestreWahid from '../assets/photos/sylvestre-wahid-dish.jpeg';
import leStrato from '../assets/photos/le-strato-dusk.jpeg';
import leChabichou from '../assets/photos/le-chabichou-dining-room.jpeg';
import loulou from '../assets/photos/loulou-courchevel-booth.jpeg';
import laSoucoupe from '../assets/photos/la-soucoupe-terrace.jpeg';
import laMangeoire from '../assets/photos/la-mangeoire-dining-room.jpeg';
import matsuhisa from '../assets/photos/matsuhisa-courchevel-dining-room.jpeg';

export const photos = {
  'rolls-royce-helicopter': rollsRoyceHelicopter,
  helicopter,
  'gift-delivery': giftDelivery,
  luggage,
  'white-chalet': whiteChalet,
  'stone-chalet': stoneChalet,
  'wooden-chalets': woodenChalets,
  terrace,
  gondola,
  lantern,
  sculpture,
  'hot-tub': hotTub,
  'chalet-living-room': chaletLivingRoom,
  'chalet-lounge': chaletLounge,
  'stone-chalet-deep-snow': stoneChaletDeepSnow,
  'private-jet': privateJet,
  'dining-table': diningTable,
  'party-table': partyTable,
  'apres-ski': apresSki,
  skiers,
  husky,
  'boutiques-night': boutiquesNight,
  'restaurant-view': restaurantView,
  'van-snow': vanSnow,
  'lunch-table': lunchTable,
  'christmas-tree': christmasTree,
  'fire-pit': firePit,
  'van-interior': vanInterior,
  paraglider,
  'courchevel-gondola': courchevelGondola,
  bagatelle,
  'cap-horn': capHorn,
  'chalet-de-pierres': chaletDePierres,
  'le-1947': le1947,
  'sylvestre-wahid': sylvestreWahid,
  'le-strato': leStrato,
  'le-chabichou': leChabichou,
  loulou,
  'la-soucoupe': laSoucoupe,
  'la-mangeoire': laMangeoire,
  matsuhisa,
} as const;

export type PhotoKey = keyof typeof photos;
export const photoKeys = Object.keys(photos) as [PhotoKey, ...PhotoKey[]];
