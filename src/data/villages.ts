/**
 * Villages of Courchevel. Each gets its own guide page in Phase 2.
 * French: to be reviewed by a native speaker.
 */
import type { Locale } from './business';

export interface Village {
  slug: string;
  name: string;
  summary: Record<Locale, string>;
}

export const villages: Village[] = [
  {
    slug: 'courchevel-1850',
    name: 'Courchevel 1850',
    summary: {
      en: 'The highest village, with the altiport, most of the palace hotels and the busiest restaurants.',
      fr: 'Le village le plus haut, avec l’altiport, la plupart des palaces et les restaurants les plus courus.',
    },
  },
  {
    slug: 'courchevel-1650-moriond',
    name: 'Courchevel 1650 Moriond',
    summary: {
      en: 'Sunny and relaxed, with its own ski area and wide slopes popular with families.',
      fr: 'Ensoleillé et détendu, avec son propre domaine et de larges pistes appréciées des familles.',
    },
  },
  {
    slug: 'courchevel-1550-village',
    name: 'Courchevel 1550 Village',
    summary: {
      en: 'A quiet village linked to 1850 by gondola, with large family chalets.',
      fr: 'Un village calme relié à 1850 par télécabine, avec de grands chalets familiaux.',
    },
  },
  {
    slug: 'courchevel-1300-le-praz',
    name: 'Courchevel 1300 Le Praz',
    summary: {
      en: 'The original village of stone and wood, with the Olympic ski jumps and a gondola up to 1850.',
      fr: 'Le village d’origine, en pierre et bois, avec les tremplins olympiques et une télécabine vers 1850.',
    },
  },
  {
    slug: 'la-tania',
    name: 'La Tania',
    summary: {
      en: 'A small, quiet village in the forest between Courchevel and Méribel.',
      fr: 'Un petit village tranquille en forêt, entre Courchevel et Méribel.',
    },
  },
];
