/**
 * Lifestyle, shopping and security (/services/lifestyle/): personal shopping, last-minute
 * requests and errands, and close protection as cards. Lifestyle requests use the general
 * form (no choice field), so each card writes its choice into the request details and tags
 * the lead with the lifestyle service. Facts as on the page: security only through
 * CNAPS-authorised partners. French: to be reviewed by a native speaker.
 */
import type { Offer } from '../../lib/offers';

export default {
  request: 'general',
  service: 'lifestyle',
  prefill: 'details',
  en: {
    cards: {
      eyebrow: 'Lifestyle, shopping and security',
      title: 'Tell us what you need',
      note: 'Many requests arrive late in the evening or on the day itself, and that is expected.',
      request: 'Request this',
      items: [
        { name: 'Personal shopping', line: 'A shopper who knows the boutiques of Courchevel 1850, with private appointments when the house allows and selections brought to your chalet.' },
        { name: 'Last-minute requests', line: 'Errands, the pharmacy, flowers, a forgotten charger or a cake for tonight: we tell you quickly what is possible.', item: 'An errand or last-minute request' },
        { name: 'Close protection', line: 'Close protection and residential security through licensed, CNAPS-authorised partners, planned in confidence.', item: 'Close protection or residential security' },
      ],
    },
    steps: {
      title: 'How it works',
      items: [
        { name: 'One message', text: 'What you need, where you are and by when, in a few words.' },
        { name: 'A reply within 15 minutes', text: 'From 8:00 to 22:00, with what is possible and how quickly; on call 24/7 in the winter season.' },
        { name: 'Handled discreetly', text: 'Bought, collected, wrapped or delivered to your chalet; security requests are discussed in confidence.' },
      ],
    },
    extras: {
      title: 'Also taken care of',
      items: [
        { name: 'Watches and jewellery', text: 'Private viewings, availability checked across boutiques and secure delivery.' },
        { name: 'Gifts', text: 'Bought, wrapped and delivered to your chalet or to friends; at Christmas, ready under the tree.' },
        { name: 'Tickets', text: 'Concerts, sporting events and shows, through official channels.' },
        { name: 'Pet care', text: 'Walks, sitting while you ski or dine, grooming and a vet if needed.' },
      ],
    },
  },
  fr: {
    cards: {
      eyebrow: 'Art de vivre, shopping et sécurité',
      title: 'Dites-nous ce dont vous avez besoin',
      note: 'Beaucoup de demandes arrivent tard le soir ou le jour même, et c’est bien normal.',
      request: 'Demander',
      items: [
        { name: 'Shopping privé', line: 'Un personal shopper qui connaît les boutiques de Courchevel 1850, avec des rendez-vous privés lorsque la maison le permet et des sélections apportées au chalet.' },
        { name: 'Demandes de dernière minute', line: 'Courses, pharmacie, fleurs, un chargeur oublié ou un gâteau pour ce soir : nous vous disons vite ce qui est possible.', item: 'Une course ou une demande de dernière minute' },
        { name: 'Protection rapprochée', line: 'Protection rapprochée et sécurité résidentielle par des partenaires agréés et autorisés par le CNAPS, organisées en toute confidentialité.', item: 'Protection rapprochée ou sécurité résidentielle' },
      ],
    },
    steps: {
      title: 'Comment ça se passe',
      items: [
        { name: 'Un message', text: 'Ce dont vous avez besoin, où vous êtes et pour quand, en quelques mots.' },
        { name: 'Une réponse sous 15 minutes', text: 'De 8 h à 22 h, avec ce qui est possible et dans quel délai ; joignables 24 h/24 pendant la saison d’hiver.' },
        { name: 'En toute discrétion', text: 'Acheté, récupéré, emballé ou livré au chalet ; les demandes de sécurité sont étudiées en toute confidentialité.' },
      ],
    },
    extras: {
      title: 'Également pris en charge',
      items: [
        { name: 'Montres et joaillerie', text: 'Présentations privées, disponibilité vérifiée d’une boutique à l’autre et livraison sécurisée.' },
        { name: 'Cadeaux', text: 'Achetés, emballés et livrés à votre chalet ou à vos amis ; à Noël, prêts au pied du sapin.' },
        { name: 'Billetterie', text: 'Concerts, événements sportifs et spectacles, par les canaux officiels.' },
        { name: 'Vos animaux', text: 'Promenades, garde pendant le ski ou le dîner, toilettage et vétérinaire si nécessaire.' },
      ],
    },
  },
} satisfies Offer;
