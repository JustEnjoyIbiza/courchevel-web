/**
 * Villages of Courchevel and the neighbouring Trois Vallées resorts we serve.
 * Each has its own guide page. `group` keeps Courchevel villages apart from
 * Méribel and Val Thorens (the homepage lists Courchevel only).
 * French: to be reviewed by a native speaker.
 */
import type { Locale } from './business';

export interface Village {
  slug: string;
  name: string;
  /** Approximate altitude of the village centre, in metres. */
  altitude: number;
  group: 'courchevel' | 'trois-vallees';
  summary: Record<Locale, string>;
}

export const villages: Village[] = [
  {
    slug: 'courchevel-1850',
    altitude: 1850,
    group: 'courchevel',
    name: 'Courchevel 1850',
    summary: {
      en: 'The highest village, with the altiport, most of the palace hotels and the busiest restaurants.',
      fr: 'Le village le plus haut, avec l’altiport, la plupart des palaces et les restaurants les plus courus.',
    },
  },
  {
    slug: 'courchevel-1650-moriond',
    altitude: 1650,
    group: 'courchevel',
    name: 'Courchevel 1650 Moriond',
    summary: {
      en: 'Sunny and relaxed, with its own ski area and wide slopes popular with families.',
      fr: 'Ensoleillé et détendu, avec son propre secteur skiable et de larges pistes appréciées des familles.',
    },
  },
  {
    slug: 'courchevel-1550-village',
    altitude: 1550,
    group: 'courchevel',
    name: 'Courchevel 1550 Village',
    summary: {
      en: 'A quiet village linked to 1850 by gondola, with large family chalets.',
      fr: 'Un village calme relié à 1850 par télécabine, avec de grands chalets familiaux.',
    },
  },
  {
    slug: 'courchevel-1300-le-praz',
    altitude: 1300,
    group: 'courchevel',
    name: 'Courchevel 1300 Le Praz',
    summary: {
      en: 'The original village of stone and wood, with the Olympic ski jumps and a gondola up to 1850.',
      fr: 'Le village d’origine, en pierre et bois, avec les tremplins olympiques et une télécabine vers 1850.',
    },
  },
  {
    slug: 'la-tania',
    altitude: 1400,
    group: 'courchevel',
    name: 'La Tania',
    summary: {
      en: 'A small, quiet village in the forest between Courchevel and Méribel.',
      fr: 'Un petit village tranquille en forêt, entre Courchevel et Méribel.',
    },
  },
  {
    slug: 'meribel',
    name: 'Méribel',
    altitude: 1450,
    group: 'trois-vallees',
    summary: {
      en: 'The neighbouring resort at the heart of the Trois Vallées, reached on skis over the Saulire or by road.',
      fr: 'La station voisine, au cœur des Trois Vallées, accessible à ski par la Saulire ou par la route.',
    },
  },
  {
    slug: 'val-thorens',
    name: 'Val Thorens',
    altitude: 2300,
    group: 'trois-vallees',
    summary: {
      en: 'The highest resort in the Trois Vallées, for a day of high-altitude skiing from Courchevel.',
      fr: 'La station la plus haute des Trois Vallées, pour une journée de ski en altitude depuis Courchevel.',
    },
  },
];
