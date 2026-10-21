/**
 * FAQ entries. `home: true` marks the ones shown on the homepage.
 * The full list (30-40 questions) is written in Phase 2.
 * Answers use only facts from the plan; season dates from courchevel.com.
 */
import { business, type Locale } from './business';

export interface Faq {
  q: Record<Locale, string>;
  a: Record<Locale, string>;
  home?: boolean;
}

export const faqs: Faq[] = [
  {
    home: true,
    q: { en: 'Do you publish prices?', fr: 'Publiez-vous vos tarifs ?' },
    a: {
      en: 'No. Every stay is different, so each service is quoted personally after we know your dates, group and village. Send us your request and you receive a tailored proposal within 24 hours.',
      fr: 'Non. Chaque séjour est différent : chaque prestation fait l’objet d’un devis personnalisé une fois vos dates, votre groupe et votre village connus. Envoyez-nous votre demande et recevez une proposition sur mesure sous 24 heures.',
    },
  },
  {
    home: true,
    q: { en: 'Which areas do you cover?', fr: 'Quelles zones couvrez-vous ?' },
    a: {
      en: `We work in all of Courchevel: 1850, 1650 Moriond, 1550 Village, 1300 Le Praz and La Tania, and across the Trois Vallées, including Méribel and Val Thorens.`,
      fr: `Nous intervenons dans tout Courchevel : 1850, 1650 Moriond, 1550 Village, 1300 Le Praz et La Tania, ainsi que dans les Trois Vallées, dont Méribel et Val Thorens.`,
    },
  },
  {
    home: true,
    q: { en: 'How quickly do you reply?', fr: 'Sous quel délai répondez-vous ?' },
    a: {
      en: `${business.replyPromise.en}, by WhatsApp, phone or email, whichever you prefer. During the winter season we are available 24/7 for clients in resort.`,
      fr: `${business.replyPromise.fr}, par WhatsApp, téléphone ou e-mail selon votre préférence. Pendant la saison d’hiver, nous sommes disponibles 24h/24 pour nos clients sur place.`,
    },
  },
  {
    home: true,
    q: { en: 'Can you arrange heli-skiing from Courchevel?', fr: 'Pouvez-vous organiser de l’héliski depuis Courchevel ?' },
    a: {
      en: 'Yes, as day trips. Helicopter drops for skiing are banned in France, so heli-skiing days take you to Italy or Switzerland with a certified mountain guide, and back to Courchevel the same day.',
      fr: 'Oui, à la journée. La dépose en hélicoptère pour le ski est interdite en France : les journées d’héliski se déroulent donc en Italie ou en Suisse avec un guide de haute montagne diplômé, avec retour à Courchevel le soir même.',
    },
  },
  {
    home: true,
    q: { en: 'When is the 2026/27 ski season in Courchevel?', fr: 'Quand a lieu la saison de ski 2026/27 à Courchevel ?' },
    a: {
      en: 'The resort opens on 4 December 2026 and closes on 18 April 2027. Christmas, New Year and February half-term are the busiest weeks, so chalets for those dates are best booked early.',
      fr: 'La station ouvre le 4 décembre 2026 et ferme le 18 avril 2027. Noël, le Nouvel An et les vacances de février sont les semaines les plus demandées : mieux vaut réserver les chalets tôt pour ces dates.',
    },
  },
  {
    home: true,
    q: { en: 'Can I book on behalf of a client or my employer?', fr: 'Puis-je réserver pour un client ou mon employeur ?' },
    a: {
      en: 'Yes. Personal assistants, family offices and travel agents can send a request for a client. Tell us who you are booking for and we deal with you directly, with full discretion.',
      fr: 'Oui. Assistants personnels, family offices et agences de voyage peuvent nous adresser une demande pour un client. Indiquez-nous pour qui vous réservez : nous traitons directement avec vous, en toute discrétion.',
    },
  },
];
