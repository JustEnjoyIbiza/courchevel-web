/**
 * The "Dinner at home | A table out" tile on the restaurant guide (/guides/where-to-eat/,
 * `dining: out`), leading to the private chef page. The chef page itself is about private
 * chefs only (owner, 26 Oct 2026); its cards and steps are in src/content/offers/private-chef.ts.
 * French: to be reviewed by a native speaker.
 */
import type { Locale } from '../data/business';
import type { PhotoKey } from '../data/photos';

export type DiningSide = 'in' | 'out';

/** The out half shows the restaurant photo, except on the guide, whose header already uses it. */
export const diningPhotos: Record<DiningSide, PhotoKey> = { in: 'chalet-lounge', out: 'restaurant-view' };
export const diningOutOnGuide: PhotoKey = 'lunch-table';

export const diningCopy = {
  en: {
    split: {
      eyebrow: 'Dinner in Courchevel',
      title: 'At home or out tonight?',
      here: 'On this page',
      in: { label: 'Dinner at home', line: 'A private chef in your chalet', alt: 'Chalet living room with a stone fireplace, wooden beams and a chandelier' },
      out: { label: 'A table out', line: 'Ten restaurants we book', alt: 'Round table under a crystal chandelier with a wide view of the Alps', altGuide: 'Lunch table on a sunny mountain terrace below a snowy peak' },
    },
  },
  fr: {
    split: {
      eyebrow: 'Dîner à Courchevel',
      title: 'Au chalet ou au restaurant ce soir ?',
      here: 'Sur cette page',
      in: { label: 'Dîner au chalet', line: 'Un chef privé chez vous', alt: 'Salon de chalet avec cheminée en pierre, poutres en bois et lustre' },
      out: { label: 'Au restaurant', line: 'Dix tables que nous réservons', alt: 'Table ronde sous un lustre en cristal, avec une large vue sur les Alpes', altGuide: 'Table de déjeuner sur une terrasse ensoleillée, sous un sommet enneigé' },
    },
  },
} satisfies Record<Locale, unknown>;
