/**
 * Homepage copy, EN and FR. Edit the words here; the layout lives in
 * src/components/home/. Facts only: nothing here may be invented.
 * French: to be reviewed by a native speaker before launch.
 */
import type { Locale } from '../data/business';

export const home = {
  en: {
    meta: {
      title: 'Luxury Concierge Courchevel 1850 & Trois Vallées | CLC',
      description:
        'Luxury concierge in Courchevel 1850, 1650 and Le Praz: chalets, Geneva helicopter transfers, private chefs and ski instructors. Reply within 15 minutes.',
    },
    hero: {
      eyebrow: 'Courchevel 1850 · 1650 · 1550 · Le Praz · La Tania',
      title: 'Luxury concierge in Courchevel',
      lead: 'Courchevel Luxury Concierge is a luxury concierge in Courchevel that arranges everything around your stay: chalets and palace hotels, helicopter transfers, private chefs, ski instructors and staff. Tell us your dates and we send a personal proposal, quoted for you rather than taken from a price list.',
      imageAlt: 'Steaming outdoor hot tub on a chalet terrace facing snow-covered pine trees in Courchevel',
      tagline: 'Chalets, helicopters, chefs and every evening in between, arranged by one contact.',
      short: 'Tell us your dates. We reply within 15 minutes and send a personal proposal within 24 hours.',
    },
    quickStart: {
      title: 'Start with your dates',
      village: 'Village',
      villagePlaceholder: 'Choose a village',
      submit: 'Continue to my request',
      note: 'Next: the services you would like and how to reach you.',
    },
    proof: [
      { value: '15 min', label: 'Reply time, 8:00 to 22:00' },
      { value: '24/7', label: 'On call during the winter season' },
      { value: '12', label: 'Services, one contact' },
      { value: '5', label: 'Villages, plus the Trois Vallées' },
    ],
    services: {
      eyebrow: 'Services',
      title: 'Everything for your stay, arranged by one contact',
      intro: 'Each service is planned around your dates, your group and your village, and quoted personally.',
      more: 'Also arranged for you',
    },
    experiences: {
      eyebrow: 'Signature experiences',
      title: 'Ready-made ideas, tailored to you',
    },
    steps: {
      eyebrow: 'How it works',
      title: 'From the first message to the last run',
      items: [
        { title: 'Tell us your dates', text: 'Use the form, WhatsApp or a call. Village, group size and the services you have in mind are enough to start.' },
        { title: 'Receive your proposal', text: 'We reply within 15 minutes, then send a tailored proposal within 24 hours.' },
        { title: 'Arrive to everything ready', text: 'Transfers, chalet, chef, instructors and tables are confirmed before you land, and we stay on call during your stay.' },
      ],
      imageAlt: 'Two cars unloading gifts and shopping bags in front of a chalet in Courchevel',
    },
    villages: {
      eyebrow: 'Where we work',
      title: 'Every village of Courchevel',
      intro: 'We arrange services in all five villages of Courchevel and across the Trois Vallées, including Méribel and Val Thorens.',
      imageAlt: 'Wooden chalets with balconies and a gondola passing above in Courchevel',
    },
    guides: {
      eyebrow: 'Guides',
      title: 'Plan your stay in Courchevel',
      intro: 'Practical answers to the questions clients ask before they book, updated every season.',
      all: 'All guides',
    },
    seasonal: {
      text: 'Christmas and New Year 2026/27: the most sought-after chalets and tables are booked early.',
      link: 'Plan the festive season',
    },
    about: {
      eyebrow: 'About us',
      title: 'Local, discreet, one contact',
      text: 'We are based in Courchevel and work with chalets, chefs, instructors, drivers and pilots across the Trois Vallées. One contact looks after your stay from the first message to your departure, in confidence.',
      link: 'More about us',
      imageAlt: 'Land Rover Defender with luxury luggage in the snow, ready for a chalet arrival',
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Frequently asked',
      more: 'All questions',
    },
    final: {
      title: 'Tell us your dates. We take care of the rest.',
      text: 'A personal reply within 15 minutes, from 8:00 to 22:00.',
      imageAlt: 'The red Courchevel letters sculpture in the snow',
    },
  },

  fr: {
    meta: {
      title: 'Conciergerie de luxe à Courchevel 1850 | CLC',
      description:
        'Conciergerie de luxe à Courchevel 1850, 1650 et Le Praz : chalets, hélicoptère depuis Genève, chef à domicile, moniteurs de ski. Réponse sous 15 min.',
    },
    hero: {
      eyebrow: 'Courchevel 1850 · 1650 · 1550 · Le Praz · La Tania',
      title: 'Conciergerie de luxe à Courchevel',
      lead: 'Courchevel Luxury Concierge est une conciergerie de luxe à Courchevel qui organise tout votre séjour : chalets et palaces, transferts en hélicoptère, chefs à domicile, moniteurs de ski et personnel. Indiquez-nous vos dates et nous vous adressons une proposition personnalisée, établie pour vous plutôt que tirée d’une grille tarifaire.',
      imageAlt: 'Bain nordique fumant sur la terrasse d’un chalet face aux sapins enneigés à Courchevel',
      tagline: 'Chalets, hélicoptères, chefs et chaque soirée entre les deux, organisés par un seul interlocuteur.',
      short: 'Indiquez-nous vos dates : réponse sous 15 minutes, proposition personnalisée sous 24 heures.',
    },
    quickStart: {
      title: 'Commencez par vos dates',
      village: 'Village',
      villagePlaceholder: 'Choisir un village',
      submit: 'Continuer ma demande',
      note: 'Ensuite : les services souhaités et comment vous joindre.',
    },
    proof: [
      { value: '15 min', label: 'Délai de réponse, de 8 h à 22 h' },
      { value: '24 h/24', label: 'Disponibles pendant la saison d’hiver' },
      { value: '12', label: 'Services, un seul interlocuteur' },
      { value: '5', label: 'Villages, et les Trois Vallées' },
    ],
    services: {
      eyebrow: 'Services',
      title: 'Tout votre séjour, organisé par un seul interlocuteur',
      intro: 'Chaque prestation est pensée selon vos dates, votre groupe et votre village, et fait l’objet d’un devis personnalisé.',
      more: 'Également organisé pour vous',
    },
    experiences: {
      eyebrow: 'Expériences signature',
      title: 'Des idées de séjour, ajustées pour vous',
    },
    steps: {
      eyebrow: 'Comment nous travaillons',
      title: 'Du premier message à la dernière descente',
      items: [
        { title: 'Indiquez vos dates', text: 'Par le formulaire, WhatsApp ou téléphone. Le village, le nombre de personnes et les services souhaités suffisent pour commencer.' },
        { title: 'Recevez votre proposition', text: 'Nous répondons sous 15 minutes, puis envoyons une proposition sur mesure sous 24 heures.' },
        { title: 'Arrivez, tout est prêt', text: 'Transferts, chalet, chef, moniteurs et tables sont confirmés avant votre arrivée, et nous restons joignables pendant votre séjour.' },
      ],
      imageAlt: 'Deux voitures déchargeant cadeaux et sacs de shopping devant un chalet à Courchevel',
    },
    villages: {
      eyebrow: 'Où nous intervenons',
      title: 'Tous les villages de Courchevel',
      intro: 'Nous sommes présents dans les cinq villages de Courchevel et dans les Trois Vallées, dont Méribel et Val Thorens.',
      imageAlt: 'Chalets en bois avec balcons et une télécabine au-dessus, à Courchevel',
    },
    guides: {
      eyebrow: 'Guides',
      title: 'Préparer votre séjour à Courchevel',
      intro: 'Des réponses pratiques aux questions que l’on se pose avant de réserver, mises à jour à chaque saison.',
      all: 'Tous les guides',
    },
    seasonal: {
      text: 'Noël et Nouvel An 2026–2027 : les chalets et les tables les plus demandés se réservent tôt.',
      link: 'Organiser les fêtes',
    },
    about: {
      eyebrow: 'À propos',
      title: 'Local, discret, un seul interlocuteur',
      text: 'Nous sommes basés à Courchevel et travaillons avec des propriétaires de chalets, des chefs, des moniteurs, des chauffeurs et des compagnies d’hélicoptères dans les Trois Vallées. Un seul interlocuteur s’occupe de votre séjour, du premier message à votre départ, en toute confidentialité.',
      link: 'En savoir plus',
      imageAlt: 'Land Rover Defender et bagages de luxe dans la neige, prêts pour une arrivée au chalet',
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Questions fréquentes',
      more: 'Toutes les questions',
    },
    final: {
      title: 'Indiquez vos dates. Nous nous occupons du reste.',
      text: 'Une réponse personnelle sous 15 minutes, de 8 h à 22 h.',
      imageAlt: 'La sculpture des lettres rouges Courchevel dans la neige',
    },
  },
} as const satisfies Record<Locale, unknown>;
