/**
 * Homepage copy, EN and FR. Edit the words here; the layout lives in
 * src/components/home/. Facts only: nothing here may be invented.
 * French: to be reviewed by a native speaker before launch.
 */
import type { Locale } from '../data/business';

export const home = {
  en: {
    meta: {
      title: 'Courchevel Luxury Concierge | Private Concierge',
      description:
        'Private concierge in Courchevel 1850, 1650 and Le Praz: chalets, helicopter transfers, private chefs, ski instructors and events. Plan your stay.',
    },
    hero: {
      eyebrow: 'Courchevel 1850 · 1650 · 1550 · Le Praz · La Tania',
      title: 'Private concierge in Courchevel',
      lead: 'Courchevel Luxury Concierge arranges everything around your stay in Courchevel: chalets and palace hotels, helicopter transfers, private chefs, ski instructors and staff. Tell us your dates and we send a personal proposal, quoted for you rather than taken from a price list.',
      imageAlt: 'View from a chauffeured Rolls-Royce of a helicopter waiting on the snow for its passengers',
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
    },
    experiences: {
      eyebrow: 'Signature experiences',
      title: 'Ready-made ideas, tailored to you',
    },
    steps: {
      eyebrow: 'How it works',
      title: 'From first message to the last run',
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
      title: 'Courchevel Luxury Concierge | Conciergerie privée',
      description:
        'Conciergerie privée à Courchevel 1850, 1650 et Le Praz : chalets, transferts en hélicoptère, chefs privés et moniteurs de ski. Organisez votre séjour.',
    },
    hero: {
      eyebrow: 'Courchevel 1850 · 1650 · 1550 · Le Praz · La Tania',
      title: 'Conciergerie privée à Courchevel',
      lead: 'Courchevel Luxury Concierge organise tout votre séjour à Courchevel : chalets et palaces, transferts en hélicoptère, chefs privés, moniteurs de ski et personnel. Indiquez-nous vos dates et nous vous adressons une proposition personnelle, établie pour vous et non tirée d’une grille tarifaire.',
      imageAlt: 'Vue depuis une Rolls-Royce avec chauffeur d’un hélicoptère attendant ses passagers sur la neige',
    },
    proof: [
      { value: '15 min', label: 'Délai de réponse, de 8h à 22h' },
      { value: '24/7', label: 'Disponibles pendant la saison d’hiver' },
      { value: '12', label: 'Services, un seul interlocuteur' },
      { value: '5', label: 'Villages, et les Trois Vallées' },
    ],
    services: {
      eyebrow: 'Services',
      title: 'Tout votre séjour, organisé par un seul interlocuteur',
      intro: 'Chaque prestation est pensée selon vos dates, votre groupe et votre village, et fait l’objet d’un devis personnalisé.',
    },
    experiences: {
      eyebrow: 'Expériences signature',
      title: 'Des idées prêtes, adaptées à vous',
    },
    steps: {
      eyebrow: 'Comment ça marche',
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
      intro: 'Nous organisons nos services dans les cinq villages de Courchevel et dans les Trois Vallées, dont Méribel et Val Thorens.',
      imageAlt: 'Chalets en bois avec balcons et une télécabine au-dessus, à Courchevel',
    },
    about: {
      eyebrow: 'À propos',
      title: 'Local, discret, un seul interlocuteur',
      text: 'Nous sommes basés à Courchevel et travaillons avec des chalets, chefs, moniteurs, chauffeurs et pilotes dans les Trois Vallées. Un seul interlocuteur s’occupe de votre séjour, du premier message à votre départ, en toute confidentialité.',
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
      text: 'Une réponse personnelle sous 15 minutes, de 8h à 22h.',
      imageAlt: 'La sculpture des lettres rouges Courchevel dans la neige',
    },
  },
} as const satisfies Record<Locale, unknown>;
