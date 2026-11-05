/**
 * Chalets and apartments available this winter, shown first on the Chalets and
 * palace hotels page. Facts, weeks and prices come from the brochures the owner
 * sent on 25 Oct 2026 (sources: docs/photo-credits.md); nothing here may be
 * added that the brochure does not say. Each chalet has its own page with its
 * photos (src/assets/chalets/<slug>/, see src/lib/chalets.ts). Agency brochures
 * and terms stay private: never linked from the site.
 *
 * Prices: the only prices on the site (owner's decision, 25 Oct 2026). Each is
 * the price for the week shown, in euros, as quoted to the owner; the section
 * intro says they vary. Update every season, and remove chalets no longer offered.
 * French: to be reviewed by a native speaker.
 */
import type { Locale } from '../data/business';

export type ChaletArea = '1850' | '1650' | 'le-praz' | 'meribel';

export interface Chalet {
  name: string;
  area: ChaletArea;
  /** Living area in m², or a range [min, max]. */
  size?: number | [number, number];
  bedrooms: number;
  /** A children's bunk room on top of the bedrooms. */
  bunkRoom?: boolean;
  /** Number of guests, e.g. '12' or '10–14'. */
  guests: string;
  skiInOut?: boolean;
  /** Price for the week, in euros. */
  price: number;
  /** The week the price applies to: arrival and departure, YYYY-MM-DD. */
  week: [string, string];
  text: Record<Locale, string>;
}

/** Shown in this order: Courchevel first, then Méribel. */
export const chaletAreas: ChaletArea[] = ['1850', '1650', 'le-praz', 'meribel'];

/** When these details came in (the brochures of 25 Oct 2026): "Last updated" on each chalet page and its sitemap date. Change it with the details. */
export const chaletsChecked = new Date('2026-10-25');

export const chalets: Chalet[] = [
  {
    name: 'Chalet Solstice',
    area: '1850',
    size: 254,
    bedrooms: 5,
    guests: '10',
    price: 59500,
    week: ['2027-01-02', '2027-01-09'],
    text: {
      en: 'A few metres from the slopes and close to the resort centre. Open-plan living with floor-to-ceiling windows and a fireplace; pool, hammam, massage room and wet bar on the lowest floor.',
      fr: 'À quelques mètres des pistes et près du centre de la station. Séjour ouvert aux baies vitrées toute hauteur, avec cheminée ; piscine, hammam, salle de massage et bar au niveau inférieur.',
    },
  },
  {
    name: 'Chalet Neve',
    area: '1850',
    size: 412,
    bedrooms: 6,
    guests: '12',
    skiInOut: true,
    price: 88000,
    week: ['2027-01-02', '2027-01-09'],
    text: {
      en: 'On the Bellecôte piste, in traditional Alpine style with spacious living areas and a fireplace. Indoor hot tub, sauna, hammam, gym, massage room, bar and TV lounge.',
      fr: 'Sur la piste de Bellecôte, dans un style alpin traditionnel, avec de grands espaces de vie et une cheminée. Bain à remous intérieur, sauna, hammam, salle de sport, salle de massage, bar et salon TV.',
    },
  },
  {
    name: 'Chalet Shemshak',
    area: '1850',
    bedrooms: 5,
    guests: '13',
    skiInOut: true,
    price: 132000,
    week: ['2027-01-03', '2027-01-10'],
    text: {
      en: 'Fully staffed, with private chef, butler, chauffeur and daily housekeeping. A large indoor pool, Jacuzzi, hammam, sauna, gym and massage room.',
      fr: 'Avec personnel complet : chef privé, majordome, chauffeur et ménage quotidien. Grande piscine intérieure, jacuzzi, hammam, sauna, salle de sport et salle de massage.',
    },
  },
  {
    name: 'Chalet Ellis',
    area: '1850',
    size: 717,
    bedrooms: 6,
    guests: '14',
    price: 133000,
    week: ['2027-01-02', '2027-01-09'],
    text: {
      en: 'In the Cospillot area, three to five minutes from the centre and the slopes. An indoor pool suspended above the spa, with Jacuzzi, sauna, hammam, massage room, gym, cinema, wine cellar and private bar.',
      fr: 'Dans le quartier du Cospillot, à trois à cinq minutes du centre et des pistes. Une piscine intérieure suspendue au-dessus du spa, avec jacuzzi, sauna, hammam, salle de massage, salle de sport, cinéma, cave à vin et bar privé.',
    },
  },
  {
    name: 'Penthouse Ivory',
    area: '1850',
    size: 680,
    bedrooms: 7,
    guests: '12–14',
    price: 173500,
    week: ['2027-01-02', '2027-01-09'],
    text: {
      en: 'A penthouse over three floors, with fireplace, balcony, bar and pool table. Its own Jacuzzi, sauna and massage room, plus the residence’s 600 m² spa with a 22-metre indoor pool.',
      fr: 'Un penthouse sur trois niveaux, avec cheminée, balcon, bar et billard. Jacuzzi, sauna et salle de massage privés, ainsi que le spa de 600 m² de la résidence et sa piscine intérieure de 22 mètres.',
    },
  },
  {
    name: 'Chalet Fleur',
    area: '1850',
    size: 890,
    bedrooms: 6,
    guests: '12',
    price: 178000,
    week: ['2027-01-02', '2027-01-09'],
    text: {
      en: 'In the Nogentil area, around 150 metres from the Pralong slopes, with soaring ceilings and panoramic views. Indoor pool, Jacuzzi, sauna, hammam, gym, massage area and cinema.',
      fr: 'Dans le quartier de Nogentil, à environ 150 mètres des pistes du Pralong, avec de hauts plafonds et une vue panoramique. Piscine intérieure, jacuzzi, sauna, hammam, salle de sport, espace massage et cinéma.',
    },
  },
  {
    name: 'Chalet Elia',
    area: '1850',
    size: 890,
    bedrooms: 5,
    bunkRoom: true,
    guests: '10–14',
    price: 193000,
    week: ['2027-01-02', '2027-01-09'],
    text: {
      en: 'In central Courchevel 1850: open-plan living under vaulted ceilings, with fireplace, balcony, bar and cinema room. Indoor pool, sunken Jacuzzi, sauna, hammam, gym and massage room; lift and garage parking.',
      fr: 'Au centre de Courchevel 1850 : séjour ouvert sous de hauts plafonds voûtés, avec cheminée, balcon, bar et salle de cinéma. Piscine intérieure, jacuzzi encastré, sauna, hammam, salle de sport et salle de massage ; ascenseur et garage.',
    },
  },
  {
    name: 'Chalet Sylvia',
    area: '1850',
    size: 709,
    bedrooms: 6,
    guests: '12–14',
    price: 193000,
    week: ['2027-01-02', '2027-01-09'],
    text: {
      en: 'Over four levels, with a wood-burning fireplace, views of the Bellecôte glacier and a large terrace. Heated pool with poolside bar, outdoor hot tub, hammam, sauna, gym, massage room, cinema and games room.',
      fr: 'Sur quatre niveaux, avec cheminée à bois, vue sur le glacier de Bellecôte et grande terrasse. Piscine chauffée avec bar, bain à remous extérieur, hammam, sauna, salle de sport, salle de massage, cinéma et salle de jeux.',
    },
  },
  {
    name: 'Chalet King',
    area: '1850',
    size: 1237,
    bedrooms: 7,
    guests: '14',
    skiInOut: true,
    price: 253000,
    week: ['2027-01-02', '2027-01-09'],
    text: {
      en: 'Fully staffed, with private chef, chalet manager, housekeepers and chauffeur. A large indoor pool, Jacuzzi, sauna, hammam, gym, massage room, beauty salon, wine cellar and billiards room.',
      fr: 'Avec personnel complet : chef privé, chalet manager, femmes de chambre et chauffeur. Grande piscine intérieure, jacuzzi, sauna, hammam, salle de sport, salle de massage, salon de beauté, cave à vin et salle de billard.',
    },
  },
  {
    name: 'Chalet Titan',
    area: '1650',
    size: [135, 195],
    bedrooms: 4,
    bunkRoom: true,
    guests: '10',
    skiInOut: true,
    price: 20390,
    week: ['2027-01-30', '2027-02-06'],
    text: {
      en: 'An apartment in the heart of 1650 for 8 adults and 2 children: open-plan lounge, long dining table, modern kitchen and balconies, with the residence’s pool, sauna, hammam, massage rooms and gym.',
      fr: 'Un appartement au cœur de 1650 pour 8 adultes et 2 enfants : salon ouvert, grande table, cuisine moderne et balcons, avec la piscine, le sauna, le hammam, les salles de massage et la salle de sport de la résidence.',
    },
  },
  {
    name: 'Chalet Philip',
    area: '1650',
    size: 220,
    bedrooms: 5,
    guests: '10',
    price: 54100,
    week: ['2027-01-02', '2027-01-09'],
    text: {
      en: 'Five en-suite master suites in the Belvédère area, with open-plan living around a fireplace, a bar and a terrace with mountain views. Shared spa with indoor pool, outdoor Jacuzzi, sauna, hammam and gym.',
      fr: 'Cinq suites avec salle de bains dans le quartier du Belvédère, un séjour ouvert autour d’une cheminée, un bar et une terrasse avec vue sur les montagnes. Spa partagé avec piscine intérieure, jacuzzi extérieur, sauna, hammam et salle de sport.',
    },
  },
  {
    name: 'Chalet Ibis',
    area: 'le-praz',
    size: 400,
    bedrooms: 5,
    guests: '12',
    price: 13700,
    week: ['2027-01-30', '2027-02-06'],
    text: {
      en: 'In the village of Le Praz, five to seven minutes from the lifts. Open-plan living around a central fireplace with forest views, a private sauna, spa facilities and a ski room.',
      fr: 'Dans le village du Praz, à cinq à sept minutes des remontées. Séjour ouvert autour d’une cheminée centrale avec vue sur la forêt, sauna privé, espace bien-être et local à skis.',
    },
  },
  {
    name: 'Chalet Hugo',
    area: 'meribel',
    bedrooms: 6,
    guests: '8–15',
    price: 15000,
    week: ['2027-01-30', '2027-02-06'],
    text: {
      en: 'In the quiet hamlet of Le Gittaz, a 10-minute walk from the Olympe gondola. Top-floor living with a marble and wood fireplace and a small balcony; indoor pool, hot tub, sauna and steam room.',
      fr: 'Dans le hameau tranquille du Gittaz, à 10 minutes à pied de la télécabine de l’Olympe. Séjour au dernier étage avec cheminée en marbre et bois et petit balcon ; piscine intérieure, bain à remous, sauna et hammam.',
    },
  },
  {
    name: 'Apartment Capucine',
    area: 'meribel',
    size: 198,
    bedrooms: 5,
    guests: '10–12',
    skiInOut: true,
    price: 21500,
    week: ['2027-01-30', '2027-02-06'],
    text: {
      en: 'At the Rond Point in Méribel: open-plan living with fireplace and a 130 m² terrace with hot tub. Shared residence spa with swimming pool, sauna, steam room and gym.',
      fr: 'Au Rond-Point de Méribel : séjour ouvert avec cheminée et terrasse de 130 m² avec bain à remous. Spa de la résidence avec piscine, sauna, hammam et salle de sport.',
    },
  },
];

export const chaletsCopy = {
  en: {
    nav: 'On this page',
    eyebrow: 'Chalets and apartments',
    title: 'Available this winter',
    intro:
      'Prices are for the week shown, as quoted to us in October 2026. They change with dates and availability, and we confirm the exact price for yours. If a chalet is taken, we propose the closest alternatives.',
    areas: { '1850': 'Courchevel 1850', '1650': 'Courchevel 1650 Moriond', 'le-praz': 'Courchevel 1300 Le Praz', meribel: 'Méribel' },
    bedrooms: (n: number) => `${n} bedrooms`,
    bunkRoom: 'bunk room',
    guests: (g: string) => `${g} guests`,
    skiInOut: 'Ski-in, ski-out',
    perWeek: 'per week',
    see: 'See the chalet',
    hotelsLine: 'Prefer a hotel?',
    hotelsLink: 'The five palaces and five-star hotels',
    // Chalet page
    crumb: 'Chalets',
    metaTitle: (name: string, area: string) => `${name}, ${area} | CLC`,
    metaTail: 'Photos and availability.',
    priceNote: 'For the week shown, as quoted to us in October 2026. Prices change with dates and availability; we confirm the exact price for yours.',
    takenNote: 'If it is taken for your dates, we propose the closest alternatives.',
    button: 'Check availability',
    chef: { label: 'Add a private chef', line: 'One dinner, every evening or full board, cooked in the chalet.' },
    photos: 'Photos',
    all: 'All chalets',
    more: (area: string) => `More in ${area}`,
    rooms: {
      exterior: 'Exterior', view: 'View', terrace: 'Terrace', living: 'Living room', lounge: 'Lounge', dining: 'Dining room',
      kitchen: 'Kitchen', bar: 'Bar', bedroom: 'Bedroom', kids: "Children's room", bathroom: 'Bathroom', pool: 'Pool', spa: 'Spa',
      'hot-tub': 'Hot tub', sauna: 'Sauna', hammam: 'Hammam', massage: 'Massage room', gym: 'Gym', cinema: 'Cinema room',
      games: 'Games room', 'ski-room': 'Ski room',
    },
  },
  fr: {
    nav: 'Sur cette page',
    eyebrow: 'Chalets et appartements',
    title: 'Disponibles cet hiver',
    intro:
      'Les prix indiqués valent pour la semaine mentionnée, tels qu’ils nous ont été communiqués en octobre 2026. Ils varient selon les dates et les disponibilités, et nous confirmons le prix exact pour les vôtres. Si un chalet n’est pas libre, nous vous proposons les alternatives les plus proches.',
    areas: { '1850': 'Courchevel 1850', '1650': 'Courchevel 1650 Moriond', 'le-praz': 'Courchevel 1300 Le Praz', meribel: 'Méribel' },
    bedrooms: (n: number) => `${n} chambres`,
    bunkRoom: 'dortoir enfants',
    guests: (g: string) => `${g} personnes`,
    skiInOut: 'Skis aux pieds',
    perWeek: 'la semaine',
    see: 'Voir le chalet',
    hotelsLine: 'Vous préférez l’hôtel ?',
    hotelsLink: 'Les cinq palaces et les hôtels cinq étoiles',
    crumb: 'Chalets',
    metaTitle: (name: string, area: string) => `${name} à ${area} | CLC`,
    metaTail: 'Photos et disponibilités.',
    priceNote: 'Pour la semaine indiquée, tel qu’il nous a été communiqué en octobre 2026. Les prix varient selon les dates et les disponibilités ; nous confirmons le prix exact pour les vôtres.',
    takenNote: 'S’il n’est pas libre à vos dates, nous vous proposons les alternatives les plus proches.',
    button: 'Vérifier les disponibilités',
    chef: { label: 'Ajouter un chef privé', line: 'Un dîner, tous les soirs ou en pension complète, préparé au chalet.' },
    photos: 'Photos',
    all: 'Tous les chalets',
    more: (area: string) => `Autres chalets à ${area}`,
    rooms: {
      exterior: 'Extérieur', view: 'Vue', terrace: 'Terrasse', living: 'Séjour', lounge: 'Salon', dining: 'Salle à manger',
      kitchen: 'Cuisine', bar: 'Bar', bedroom: 'Chambre', kids: 'Chambre d’enfants', bathroom: 'Salle de bains', pool: 'Piscine', spa: 'Spa',
      'hot-tub': 'Bain à remous', sauna: 'Sauna', hammam: 'Hammam', massage: 'Salle de massage', gym: 'Salle de sport', cinema: 'Salle de cinéma',
      games: 'Salle de jeux', 'ski-room': 'Local à skis',
    },
  },
} satisfies Record<Locale, unknown>;
