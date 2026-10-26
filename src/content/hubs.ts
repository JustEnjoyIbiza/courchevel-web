/**
 * Copy for the hub pages (/services/, /villages/, /guides/, /experiences/, /faq/).
 * French: to be reviewed by a native speaker.
 */
import type { Locale } from '../data/business';

/** "Last updated" date shown on the hub and FAQ pages. Change it when their copy changes. */
export const hubsUpdated = new Date('2026-10-23');

export type HubKey = 'services' | 'villages' | 'guides' | 'experiences' | 'faq';

interface HubCopy {
  title: string;
  metaTitle: string;
  description: string;
  answer: string;
}

export const hubs: Record<HubKey, Record<Locale, HubCopy>> = {
  services: {
    en: {
      title: 'Concierge services in Courchevel',
      metaTitle: 'Concierge Services in Courchevel | CLC',
      description: 'Chalets, helicopter transfers, private chefs, ski instructors, staff, childcare and wellness in Courchevel, arranged by one contact and quoted personally.',
      answer: 'We arrange ten kinds of service for stays in Courchevel and the Trois Vallées, from chalets and helicopter transfers to private chefs, nannies and nightlife. One contact plans everything around your dates and village, and every service is quoted personally.',
    },
    fr: {
      title: 'Services de conciergerie de luxe à Courchevel',
      metaTitle: 'Conciergerie de luxe à Courchevel : services | CLC',
      description: 'Chalets, transferts en hélicoptère, chefs privés, moniteurs de ski, personnel, garde d’enfants et bien-être à Courchevel, sur devis personnalisé.',
      answer: 'Nous organisons dix types de prestations pour les séjours à Courchevel et dans les Trois Vallées, des chalets et transferts en hélicoptère aux chefs privés, nounous et soirées. Un seul interlocuteur organise tout selon vos dates et votre village, et chaque prestation fait l’objet d’un devis personnalisé.',
    },
  },
  villages: {
    en: {
      title: 'The villages of Courchevel',
      metaTitle: 'Courchevel Villages: 1850, 1650, 1550, Le Praz | CLC',
      description: 'Courchevel 1850, 1650 Moriond, 1550 Village, 1300 Le Praz and La Tania: who each village suits, how to get there and what we arrange there.',
      answer: 'Courchevel is five villages on one ski area: 1850, 1650 Moriond, 1550 Village, 1300 Le Praz and the neighbouring La Tania. Each has its own character, from the palace hotels of 1850 to the quieter family chalets lower down, and we arrange services in all of them.',
    },
    fr: {
      title: 'Les villages de Courchevel',
      metaTitle: 'Villages de Courchevel : 1850, 1650, 1550, Le Praz | CLC',
      description: 'Courchevel 1850, 1650 Moriond, 1550 Village, 1300 Le Praz et La Tania : l’esprit de chaque village, comment y accéder et ce que nous y organisons.',
      answer: 'Courchevel, ce sont cinq villages sur un même domaine skiable : 1850, 1650 Moriond, 1550 Village, 1300 Le Praz et La Tania, sa voisine. Chacun a son caractère, des palaces de 1850 aux chalets familiaux plus calmes en contrebas, et nous intervenons dans chacun d’eux.',
    },
  },
  guides: {
    en: {
      title: 'Courchevel guides',
      metaTitle: 'Courchevel Travel Guides | Courchevel Luxury Concierge',
      description: 'Practical guides to Courchevel: getting there from Geneva, Lyon and Chambéry, holidays with children, season dates and events, and where to eat.',
      answer: 'Practical answers to the questions clients ask before a stay in Courchevel: how to get there, what to plan with children, when the season runs and where to eat. Each guide is updated every season.',
    },
    fr: {
      title: 'Guides de Courchevel',
      metaTitle: 'Guides pratiques de Courchevel | CLC',
      description: 'Guides pratiques de Courchevel : venir depuis Genève, Lyon ou Chambéry, séjour en famille, dates de saison et événements, où manger.',
      answer: 'Des réponses pratiques aux questions que l’on se pose avant un séjour à Courchevel : comment venir, que prévoir avec des enfants, quand ouvre la saison et où manger. Les guides sont mis à jour à chaque saison.',
    },
  },
  experiences: {
    en: {
      title: 'Signature experiences',
      metaTitle: 'Signature Experiences in Courchevel | CLC',
      description: 'Ready-made ideas for a stay in Courchevel: Winter Retreat, VIP Party Package, Ski Explorer, Family Week, Christmas and New Year.',
      answer: 'Our signature experiences are starting points rather than fixed packages: each one bundles the services that usually go together, then we adapt it to your dates, group and village. Every experience is quoted personally.',
    },
    fr: {
      title: 'Expériences signature',
      metaTitle: 'Expériences signature à Courchevel | CLC',
      description: 'Des idées de séjour à Courchevel : Winter Retreat, VIP Party Package, Ski Explorer, Semaine en famille, Noël et Nouvel An.',
      answer: 'Nos expériences signature sont des points de départ, pas des forfaits figés : chacune réunit les services qui vont souvent ensemble, puis nous l’adaptons à vos dates, votre groupe et votre village. Chaque expérience fait l’objet d’un devis personnalisé.',
    },
  },
  faq: {
    en: {
      title: 'Frequently asked questions',
      metaTitle: 'Courchevel Concierge FAQ | Courchevel Luxury Concierge',
      description: 'Answers about booking a concierge in Courchevel: how it works, chalets, transfers, skiing, dining, families, nightlife and the season.',
      answer: 'Short, direct answers to the questions clients ask most often about planning a stay in Courchevel with us. If your question is not here, send it on WhatsApp and we reply within 15 minutes, from 8:00 to 22:00.',
    },
    fr: {
      title: 'Questions fréquentes',
      metaTitle: 'FAQ conciergerie Courchevel | Courchevel Luxury Concierge',
      description: 'Réponses sur la réservation d’une conciergerie à Courchevel : fonctionnement, chalets, transferts, ski, gastronomie, familles, soirées et saison.',
      answer: 'Des réponses courtes et directes aux questions les plus fréquentes pour organiser un séjour à Courchevel avec nous. Votre question n’y est pas ? Envoyez-la sur WhatsApp, nous répondons sous 15 minutes, de 8 h à 22 h.',
    },
  },
};
