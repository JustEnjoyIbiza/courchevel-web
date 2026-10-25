/**
 * Routes, times and prices on the transfers page (/services/transfers/), shown by
 * TransferRoutes.astro, then the short private-jet band (JetBand.astro). Only the
 * nearby airports and resorts a helicopter flies from (owner, 25 Oct 2026); the
 * wider research (Nice, Zurich, Paris, stations, jet routes and guide prices) is
 * kept in docs/transfer-prices.md with the sources for every figure.
 *
 * Prices (owner, 25 Oct 2026: the second exception to "no prices"): one way, in euros,
 * VAT included, for the whole helicopter or car, as "from" prices next to the note
 * that they vary. Never in schema, llms.txt or FAQ answers.
 *
 * The prices below are market references from published price lists (helicopters:
 * Héli Sécurité; cars: C-Limousine), not yet our partners' rates. Until the owner
 * confirms or replaces them, `pricesConfirmed` stays false: the page shows a draft
 * line ([data-pending]) and the launch check fails.
 *
 * Times are in minutes, [shortest, longest], in normal conditions. Road distances
 * and times run to Courchevel 1850.
 * French: to be reviewed by a native speaker.
 */
import type { Locale } from '../data/business';

export const pricesConfirmed = false;

export const routeGroups = ['airports', 'italy', 'resorts'] as const;
export type RouteGroup = (typeof routeGroups)[number];
/** Groups shown folded, opened with a tap (owner: keep the page short). */
export const foldedGroups: RouteGroup[] = ['italy', 'resorts'];
export type Minutes = [number, number];

export interface TransferRoute {
  id: string;
  group: RouteGroup;
  name: Record<Locale, string>;
  /** Road distance in km, or a range when the route depends on the tunnel. */
  km?: number | [number, number];
  /** Flight time to Courchevel Altiport; `from` = price per helicopter. */
  heli: { time: Minutes; from?: number };
  /** Driving time; `van` = Mercedes V-Class (up to 7), `saloon` = Mercedes S-Class (up to 3). */
  car?: { time: Minutes; van?: number; saloon?: number };
}

export const routes: TransferRoute[] = [
  { id: 'geneva', group: 'airports', name: { en: 'Geneva airport', fr: 'Aéroport de Genève' }, km: 149, heli: { time: [30, 35], from: 3100 }, car: { time: [135, 165], van: 850, saloon: 1100 } },
  { id: 'chambery', group: 'airports', name: { en: 'Chambéry airport', fr: 'Aéroport de Chambéry' }, km: 110, heli: { time: [25, 25], from: 2700 }, car: { time: [80, 90], van: 650, saloon: 800 } },
  { id: 'lyon', group: 'airports', name: { en: 'Lyon Saint-Exupéry airport', fr: 'Aéroport de Lyon Saint-Exupéry' }, km: 187, heli: { time: [40, 45], from: 3950 }, car: { time: [140, 170], van: 850, saloon: 1200 } },
  { id: 'grenoble', group: 'airports', name: { en: 'Grenoble airport', fr: 'Aéroport de Grenoble' }, km: 175, heli: { time: [30, 40], from: 3100 }, car: { time: [130, 140], van: 800, saloon: 1100 } },
  { id: 'annecy', group: 'airports', name: { en: 'Annecy airport', fr: 'Aéroport d’Annecy' }, km: 95, heli: { time: [20, 30], from: 2000 }, car: { time: [95, 100], van: 600, saloon: 800 } },
  { id: 'sion', group: 'airports', name: { en: 'Sion airport', fr: 'Aéroport de Sion' }, heli: { time: [35, 40], from: 3950 } },

  { id: 'milan', group: 'italy', name: { en: 'Milan, Malpensa or Linate', fr: 'Milan, Malpensa ou Linate' }, km: [350, 400], heli: { time: [50, 60] }, car: { time: [270, 300], van: 1950, saloon: 2800 } },
  { id: 'turin', group: 'italy', name: { en: 'Turin', fr: 'Turin' }, km: 241, heli: { time: [40, 40] }, car: { time: [180, 190], van: 1400, saloon: 1700 } },

  { id: 'meribel', group: 'resorts', name: { en: 'Méribel', fr: 'Méribel' }, km: 31, heli: { time: [8, 10] }, car: { time: [35, 40], van: 180 } },
  { id: 'val-thorens', group: 'resorts', name: { en: 'Val Thorens', fr: 'Val Thorens' }, km: 60, heli: { time: [15, 15] }, car: { time: [65, 80], van: 390, saloon: 450 } },
  { id: 'val-disere', group: 'resorts', name: { en: 'Val d’Isère', fr: 'Val d’Isère' }, heli: { time: [15, 20], from: 1700 } },
  { id: 'megeve', group: 'resorts', name: { en: 'Megève', fr: 'Megève' }, heli: { time: [15, 20], from: 1450 } },
];

export const transfersCopy = {
  en: {
    eyebrow: 'Routes and prices',
    title: 'From the nearby airports',
    note: 'Times in normal conditions. Indicative prices for winter 2026/27: one way, for the whole helicopter or car, VAT included. Your quote confirms the final price for your date and luggage.',
    draft: 'Draft: market reference prices, to be replaced with our partners’ rates before launch.',
    groups: { airports: 'Nearby airports', italy: 'Milan and Turin', resorts: 'Between resorts' },
    count: (n: number) => `${n} routes`,
    show: 'Show',
    hide: 'Hide',
    cols: { from: 'From', heli: 'Helicopter', car: 'Chauffeured car' },
    km: (km: string) => `${km} km by road`,
    from: 'from',
    van: 'V-Class',
    saloon: 'S-Class',
    onRequest: 'On request',
    request: 'Request this route',
    requestShort: 'Request',
    requestFor: (text: string) => `, ${text.toLowerCase()}`,
    limits: [
      'Helicopters fly in daylight and good visibility only, about 9:00 to 16:45 in midwinter, with a car on standby for every flight.',
      'A light helicopter takes about four soft bags: skis and large cases follow by car.',
      'Allow up to an hour more by road on high-season Saturdays.',
    ],
    photos: {
      heli: 'Black helicopter on a snowy landing area among pine trees',
      car: 'Black Mercedes V-Class parked on snow with mountain peaks behind',
    },
    jets: {
      eyebrow: 'Private jets',
      title: 'Flying private',
      intro: 'Jets cannot land at Courchevel. We arrange the flight to the nearest airport and time the helicopter or car to your landing.',
      places: [
        { name: 'Chambéry', text: 'The closest airport for jets, with a business-aviation terminal. Then 25 minutes by helicopter.' },
        { name: 'Geneva', text: 'Takes every size of aircraft and the most flights. Then 30 to 35 minutes by helicopter.' },
        { name: 'Courchevel Altiport', text: 'Small propeller planes such as the Pilatus PC‑12 land in the resort itself, from inside the Schengen area.' },
      ],
    },
  },
  fr: {
    eyebrow: 'Trajets et prix',
    title: 'Depuis les aéroports proches',
    note: 'Durées dans des conditions normales. Prix indicatifs pour l’hiver 2026/27 : aller simple, pour l’hélicoptère ou la voiture entière, TTC. Votre devis confirme le prix final selon la date et les bagages.',
    draft: 'Brouillon : prix de référence du marché, à remplacer par les tarifs de nos partenaires avant la mise en ligne.',
    groups: { airports: 'Aéroports proches', italy: 'Milan et Turin', resorts: 'Entre stations' },
    count: (n: number) => `${n} trajets`,
    show: 'Afficher',
    hide: 'Masquer',
    cols: { from: 'Départ', heli: 'Hélicoptère', car: 'Voiture avec chauffeur' },
    km: (km: string) => `${km} km par la route`,
    from: 'dès',
    van: 'Classe V',
    saloon: 'Classe S',
    onRequest: 'Sur demande',
    request: 'Demander ce trajet',
    requestShort: 'Demander',
    requestFor: (text: string) => ` : ${text.toLowerCase()}`,
    limits: [
      'Les hélicoptères ne volent que de jour et par bonne visibilité, de 9 h à 16 h 45 environ au cœur de l’hiver, avec une voiture prête pour chaque vol.',
      'Un hélicoptère léger emporte environ quatre sacs souples : skis et grosses valises suivent en voiture.',
      'Comptez jusqu’à une heure de plus par la route les samedis de haute saison.',
    ],
    photos: {
      heli: 'Hélicoptère noir posé sur une aire enneigée, entre les sapins',
      car: 'Mercedes Classe V noire garée sur la neige, sommets en arrière-plan',
    },
    jets: {
      eyebrow: 'Jets privés',
      title: 'Voyager en jet privé',
      intro: 'Les jets ne peuvent pas se poser à Courchevel. Nous organisons le vol jusqu’à l’aéroport le plus proche et calons l’hélicoptère ou la voiture sur votre atterrissage.',
      places: [
        { name: 'Chambéry', text: 'L’aéroport le plus proche pour les jets, avec un terminal d’aviation d’affaires. Puis 25 minutes en hélicoptère.' },
        { name: 'Genève', text: 'Accueille tous les gabarits et le plus grand nombre de vols. Puis 30 à 35 minutes en hélicoptère.' },
        { name: 'Altiport de Courchevel', text: 'Les petits avions à hélice comme le Pilatus PC‑12 se posent dans la station même, depuis l’espace Schengen.' },
      ],
    },
  },
} satisfies Record<Locale, unknown>;
