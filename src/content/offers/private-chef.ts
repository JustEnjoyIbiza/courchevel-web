/**
 * Private chef (/services/private-chef/): the three formats, the steps and what we
 * arrange around the table. The page is about private chefs only (owner, 26 Oct 2026).
 * French: to be reviewed by a native speaker.
 */
import type { Offer } from '../../lib/offers';

export default {
  request: 'chef',
  en: {
    cards: {
      eyebrow: 'Private chef',
      title: 'Choose how often the chef cooks',
      note: 'Christmas and New Year: chefs are booked first, so ask as soon as your dates are fixed.',
      request: 'Request this',
      items: [
        { name: 'One dinner', line: 'A birthday, New Year’s Eve, or a Michelin-starred chef for the evening, on request.' },
        { name: 'Every evening', line: 'Dinner in the chalet each night, with menus planned for the week.' },
        { name: 'Full board', line: 'Breakfast before skiing and dinner every evening, for the whole stay.' },
      ],
    },
    steps: {
      title: 'How it works',
      items: [
        { name: 'Your brief', text: 'Guests, allergies, diets and the food you love, from Savoyard classics to a tasting menu.' },
        { name: 'A chef and menus within 24 hours', text: 'We propose a chef matched to your group, with sample menus for your evenings.' },
        { name: 'The chef takes over', text: 'Shops locally, cooks and serves, feeds the children first if you wish, and leaves the kitchen clean.' },
      ],
    },
    extras: {
      title: 'Around the table',
      items: [
        { name: 'Breakfast', text: 'Fresh bread, pastries and eggs before skiing.' },
        { name: 'A sommelier', text: 'For a dinner, a tasting or the week’s cellar.' },
        { name: 'Wine and champagne', text: 'Delivered to the chalet and topped up.' },
        { name: 'A stocked kitchen', text: 'Fridge and pantry filled to your list before you arrive.' },
      ],
    },
  },
  fr: {
    cards: {
      eyebrow: 'Chef privé',
      title: 'Choisissez le rythme du chef',
      note: 'Noël et Nouvel An : les chefs sont réservés en premier, demandez dès que vos dates sont fixées.',
      request: 'Demander cette formule',
      items: [
        { name: 'Un dîner', line: 'Un anniversaire, la Saint-Sylvestre ou un chef étoilé pour la soirée, sur demande.' },
        { name: 'Tous les soirs', line: 'Le dîner au chalet chaque soir, avec des menus pensés pour la semaine.' },
        { name: 'Pension complète', line: 'Le petit-déjeuner avant le ski et le dîner chaque soir, tout le séjour.' },
      ],
    },
    steps: {
      title: 'Comment ça se passe',
      items: [
        { name: 'Votre brief', text: 'Convives, allergies, régimes et cuisine préférée, des classiques savoyards au menu dégustation.' },
        { name: 'Un chef et des menus sous 24 heures', text: 'Nous proposons un chef adapté à votre groupe, avec des exemples de menus pour vos soirées.' },
        { name: 'Le chef prend le relais', text: 'Il fait les courses sur place, cuisine et sert, fait dîner les enfants d’abord si vous le souhaitez, et laisse la cuisine impeccable.' },
      ],
    },
    extras: {
      title: 'Autour de la table',
      items: [
        { name: 'Le petit-déjeuner', text: 'Pain frais, viennoiseries et œufs avant le ski.' },
        { name: 'Un sommelier', text: 'Pour un dîner, une dégustation ou la cave de la semaine.' },
        { name: 'Vins et champagne', text: 'Livrés au chalet et réassortis.' },
        { name: 'Une cuisine remplie', text: 'Réfrigérateur et placards garnis selon votre liste avant votre arrivée.' },
      ],
    },
  },
} satisfies Offer;
