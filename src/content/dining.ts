/**
 * The private chef page (/services/private-chef/, `dining: in`) and its pairing
 * with the restaurant guide (/guides/where-to-eat/, `dining: out`): the three
 * formats (each opens the chef request with the format filled in), the steps,
 * what we arrange around the table, and the "Dinner at home | A table out" tile
 * shown on both pages (owner, 26 Oct 2026: pair the pages, keep them separate).
 * No prices. French: to be reviewed by a native speaker.
 */
import type { Locale } from '../data/business';
import type { PhotoKey } from '../data/photos';

export type DiningSide = 'in' | 'out';

/** The out half shows the restaurant photo, except on the guide, whose header already uses it. */
export const diningPhotos: Record<DiningSide, PhotoKey> = { in: 'chalet-lounge', out: 'restaurant-view' };
export const diningOutOnGuide: PhotoKey = 'lunch-table';

export const diningCopy = {
  en: {
    formats: {
      eyebrow: 'Private chef',
      title: 'Choose how often the chef cooks',
      festive: 'Christmas and New Year: chefs are booked first, so ask as soon as your dates are fixed.',
      items: [
        { name: 'One dinner', line: 'A birthday, New Year’s Eve, or a Michelin-starred chef for the evening, on request.' },
        { name: 'Every evening', line: 'Dinner in the chalet each night, with menus planned for the week.' },
        { name: 'Full board', line: 'Breakfast before skiing and dinner every evening, for the whole stay.' },
      ],
      request: 'Request this',
    },
    steps: {
      title: 'How it works',
      items: [
        { name: 'Your brief', text: 'Guests, allergies, diets and the food you love, from Savoyard classics to a tasting menu.' },
        { name: 'A chef and menus within 24 hours', text: 'We propose a chef matched to your group, with sample menus for your evenings.' },
        { name: 'The chef takes over', text: 'Shops locally, cooks and serves, feeds the children first if you wish, and leaves the kitchen clean.' },
      ],
    },
    around: {
      title: 'Around the table',
      items: [
        { name: 'Breakfast', text: 'Fresh bread, pastries and eggs before skiing.' },
        { name: 'A sommelier', text: 'For a dinner, a tasting or the week’s cellar.' },
        { name: 'Wine and champagne', text: 'Delivered to the chalet and topped up.' },
        { name: 'A stocked kitchen', text: 'Fridge and pantry filled to your list before you arrive.' },
      ],
    },
    split: {
      eyebrow: 'Dinner in Courchevel',
      title: 'At home or out tonight?',
      here: 'On this page',
      in: { label: 'Dinner at home', line: 'A private chef in your chalet', alt: 'Chalet living room with a stone fireplace, wooden beams and a chandelier' },
      out: { label: 'A table out', line: 'Ten restaurants we book', alt: 'Round table under a crystal chandelier with a wide view of the Alps', altGuide: 'Lunch table on a sunny mountain terrace below a snowy peak' },
    },
  },
  fr: {
    formats: {
      eyebrow: 'Chef privé',
      title: 'Choisissez le rythme du chef',
      festive: 'Noël et Nouvel An : les chefs sont réservés en premier, demandez dès que vos dates sont fixées.',
      items: [
        { name: 'Un dîner', line: 'Un anniversaire, la Saint-Sylvestre ou un chef étoilé pour la soirée, sur demande.' },
        { name: 'Tous les soirs', line: 'Le dîner au chalet chaque soir, avec des menus pensés pour la semaine.' },
        { name: 'Pension complète', line: 'Le petit-déjeuner avant le ski et le dîner chaque soir, tout le séjour.' },
      ],
      request: 'Demander cette formule',
    },
    steps: {
      title: 'Comment ça se passe',
      items: [
        { name: 'Votre brief', text: 'Convives, allergies, régimes et cuisine préférée, des classiques savoyards au menu dégustation.' },
        { name: 'Un chef et des menus sous 24 heures', text: 'Nous proposons un chef adapté à votre groupe, avec des exemples de menus pour vos soirées.' },
        { name: 'Le chef prend le relais', text: 'Il fait les courses sur place, cuisine et sert, fait dîner les enfants d’abord si vous le souhaitez, et laisse la cuisine impeccable.' },
      ],
    },
    around: {
      title: 'Autour de la table',
      items: [
        { name: 'Le petit-déjeuner', text: 'Pain frais, viennoiseries et œufs avant le ski.' },
        { name: 'Un sommelier', text: 'Pour un dîner, une dégustation ou la cave de la semaine.' },
        { name: 'Vins et champagne', text: 'Livrés au chalet et réassortis.' },
        { name: 'Une cuisine remplie', text: 'Réfrigérateur et placards garnis selon votre liste avant votre arrivée.' },
      ],
    },
    split: {
      eyebrow: 'Dîner à Courchevel',
      title: 'Au chalet ou au restaurant ce soir ?',
      here: 'Sur cette page',
      in: { label: 'Dîner au chalet', line: 'Un chef privé chez vous', alt: 'Salon de chalet avec cheminée en pierre, poutres en bois et lustre' },
      out: { label: 'Au restaurant', line: 'Dix tables que nous réservons', alt: 'Table ronde sous un lustre en cristal, avec une large vue sur les Alpes', altGuide: 'Table de déjeuner sur une terrasse ensoleillée, sous un sommet enneigé' },
    },
  },
} satisfies Record<Locale, unknown>;
