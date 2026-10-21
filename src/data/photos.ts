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
} as const;

export type PhotoKey = keyof typeof photos;
export const photoKeys = Object.keys(photos) as [PhotoKey, ...PhotoKey[]];
