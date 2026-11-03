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
      /** The H1: the company's name, as on the old site (owner, 26 Oct 2026); the second line in brass. */
      headline: ['Courchevel', 'Luxury Concierge'],
      /** The introduction under the hero: names the company once, the sentence search engines and AI assistants quote. */
      lead: 'Courchevel Luxury Concierge arranges every part of your time in Courchevel, from a private chalet and a helicopter arrival to a VIP table, a ski instructor or a private chef. Share the full picture, or simply what you need next: one contact takes it from there, with discretion.',
      imageAlt: 'Steaming outdoor hot tub on a chalet terrace facing snow-covered pine trees in Courchevel',
      short: 'Tell us your dates. We reply within 15 minutes and send a personal proposal within 24 hours.',
      whatsapp: 'Or message us on WhatsApp',
    },
    /** One quiet line of facts under the introduction (replaces the counters). */
    trust: {
      rating: (r: string, n: number) => `${r} on Google · ${n} reviews`,
      reply: 'Replies within 15 minutes, 8:00 to 22:00',
      season: '24/7 in the winter season',
      based: 'Based in Courchevel',
    },
    quickStart: {
      title: 'Start with your dates',
      village: 'Village',
      villagePlaceholder: 'Choose a village',
      submit: 'Continue to my request',
      note: 'Next: the services you would like and how to reach you.',
      /** Under the form: straight to a short request, for visitors who need one thing. */
      oneThing: {
        label: 'Just one thing?',
        links: [
          { type: 'table', text: 'A table' },
          { type: 'transfer', text: 'A transfer' },
          { type: 'instructor', text: 'A ski instructor' },
          { type: 'chef', text: 'A private chef' },
          { type: 'general', text: 'Something else' },
        ],
      },
    },
    services: {
      eyebrow: 'Services',
      title: 'Everything for your stay, arranged by one contact',
      intro: 'Each service is planned around your dates, your group and your village, and quoted personally.',
      more: 'Also arranged for you',
      /** Fills the rest of the index's last row, with the Plan my stay button. */
      other: { title: 'Something else in mind?', text: 'Tell us your dates and what you would like, even if it is not on this list.' },
      /** The chalets tile, split in two halves with a photo each: chalets | palace hotels. */
      split: {
        chalets: { label: 'Chalets', line: 'Available this winter' },
        hotels: {
          label: 'Palaces',
          line: 'Palaces and five-star hotels',
          alt: 'The turreted facade of Les Airelles in Courchevel 1850 at dusk, lit from within, above fresh snow',
          credit: 'Photo: Airelles Courchevel',
        },
      },
    },
    experiences: {
      eyebrow: 'Experiences',
      title: 'Beyond the slopes',
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
    /** Before you come: the villages and four guides as short link rows, and the festive season line. */
    plan: {
      eyebrow: 'Before you come',
      title: 'Plan your stay in Courchevel',
      villages: 'Where we work',
      villagesNote: 'All five villages of Courchevel, and across the Trois Vallées.',
      villagesAll: 'All villages',
      guides: 'Guides',
      guidesAll: 'All guides',
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
      /** Shown once the founder's details are in src/data/business.ts. */
      founder: { contact: 'Your contact', since: (y: number) => `In Courchevel since ${y}`, speaks: (l: string) => `Speaks ${l}` },
      rating: {
        eyebrow: 'Google reviews',
        outOf: 'out of 5',
        count: (n: number) => `from ${n} reviews`,
        checked: (d: string) => `As of ${d}`,
        read: 'Read the reviews on Google',
      },
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
      headline: ['Courchevel', 'Luxury Concierge'],
      lead: 'Courchevel Luxury Concierge organise chaque moment de votre séjour à Courchevel, du chalet privé et de l’arrivée en hélicoptère à la table VIP, au moniteur de ski ou au chef à domicile. Racontez-nous tout, ou seulement ce dont vous avez besoin maintenant : un seul interlocuteur s’en charge, avec discrétion.',
      imageAlt: 'Bain nordique fumant sur la terrasse d’un chalet face aux sapins enneigés à Courchevel',
      short: 'Indiquez-nous vos dates : réponse sous 15 minutes, proposition personnalisée sous 24 heures.',
      whatsapp: 'Ou écrivez-nous sur WhatsApp',
    },
    trust: {
      rating: (r: string, n: number) => `${r} sur Google · ${n} avis`,
      reply: 'Réponse sous 15 minutes, de 8 h à 22 h',
      season: '24 h/24 pendant la saison d’hiver',
      based: 'Basés à Courchevel',
    },
    quickStart: {
      title: 'Commencez par vos dates',
      village: 'Village',
      villagePlaceholder: 'Choisir un village',
      submit: 'Continuer ma demande',
      note: 'Ensuite : les services souhaités et comment vous joindre.',
      oneThing: {
        label: 'Juste une chose ?',
        links: [
          { type: 'table', text: 'Une table' },
          { type: 'transfer', text: 'Un transfert' },
          { type: 'instructor', text: 'Un moniteur de ski' },
          { type: 'chef', text: 'Un chef à domicile' },
          { type: 'general', text: 'Autre chose' },
        ],
      },
    },
    services: {
      eyebrow: 'Services',
      title: 'Tout votre séjour, organisé par un seul interlocuteur',
      intro: 'Chaque prestation est pensée selon vos dates, votre groupe et votre village, et fait l’objet d’un devis personnalisé.',
      more: 'Également organisé pour vous',
      other: { title: 'Autre chose en tête ?', text: 'Indiquez-nous vos dates et ce que vous souhaitez, même si ce n’est pas dans cette liste.' },
      split: {
        chalets: { label: 'Chalets', line: 'Disponibles cet hiver' },
        hotels: {
          label: 'Palaces',
          line: 'Palaces et hôtels cinq étoiles',
          alt: 'La façade à tourelles des Airelles à Courchevel 1850 au crépuscule, éclairée de l’intérieur, au-dessus de la neige fraîche',
          credit: 'Photo : Airelles Courchevel',
        },
      },
    },
    experiences: {
      eyebrow: 'Expériences',
      title: 'Au-delà des pistes',
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
    plan: {
      eyebrow: 'Avant de venir',
      title: 'Préparer votre séjour à Courchevel',
      villages: 'Où nous intervenons',
      villagesNote: 'Les cinq villages de Courchevel, et toutes les Trois Vallées.',
      villagesAll: 'Tous les villages',
      guides: 'Guides',
      guidesAll: 'Tous les guides',
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
      founder: { contact: 'Votre interlocuteur', since: (y: number) => `À Courchevel depuis ${y}`, speaks: (l: string) => `Parle ${l}` },
      rating: {
        eyebrow: 'Avis Google',
        outOf: 'sur 5',
        count: (n: number) => `${n} avis`,
        checked: (d: string) => `Au ${d}`,
        read: 'Lire les avis sur Google',
      },
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
