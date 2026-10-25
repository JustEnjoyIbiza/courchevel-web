/**
 * Copy for the short request forms (/enquire/<type>/) and the request each
 * page leads to: its button, form page and pre-written WhatsApp message.
 * Every page leads to the request that fits it; stays keep "Plan my stay".
 * French: to be reviewed by a native speaker.
 */
import type { Locale } from '../data/business';
import type { RequestType } from '../lib/requests';

interface TypeCopy {
  /** Button that leads to this request. */
  button: string;
  /** Button on one item of a list (e.g. one restaurant). Defaults to `button`. */
  itemButton?: string;
  h1: string;
  metaTitle: string;
  description: string;
  lead: string;
  itemHint?: string;
  fromHint?: string;
  toHint?: string;
  detailsHint: string;
  /** Opening of the WhatsApp message; the visitor completes the sentence. */
  whatsapp: (item?: string) => string;
}

interface RequestCopy {
  optional: string;
  requestLegend: string;
  contactLegend: string;
  stayingLabel: string;
  stayingHint: string;
  submit: string;
  upsellTitle: string;
  upsellLink: string;
  asideTitle: string;
  /** A stay at one hotel or chalet of a list: its button and WhatsApp opening. */
  stayItem: { button: string; whatsapp: (item: string) => string };
  types: Record<RequestType, TypeCopy>;
}

export const requestCopy: Record<Locale, RequestCopy> = {
  en: {
    optional: 'optional',
    requestLegend: 'Your request',
    contactLegend: 'Your details',
    stayingLabel: 'Where are you staying?',
    stayingHint: 'Chalet, hotel or village, if you know it.',
    submit: 'Send my request',
    upsellTitle: 'Planning the whole stay?',
    upsellLink: 'Tell us your dates and we arrange everything else.',
    asideTitle: 'Prefer to message?',
    stayItem: { button: 'Ask about this stay', whatsapp: (item) => `Hello, I'd like to arrange a stay at ${item} from ` },
    types: {
      table: {
        button: 'Request a table',
        h1: 'Request a table',
        metaTitle: 'Request a Table in Courchevel | CLC',
        description: 'Tell us the restaurant, the date and how many guests. We request the table and reply within 15 minutes, 8:00 to 22:00.',
        lead: 'Tell us where you would like to eat, when and how many you are. We request the table for you and confirm as soon as the restaurant does.',
        itemHint: 'Leave blank and we suggest one for your evening.',
        detailsHint: 'An occasion, allergies, a table on the terrace…',
        whatsapp: (item) => (item ? `Hello, I'd like to request a table at ${item} on ` : "Hello, I'd like to request a restaurant table in Courchevel on "),
      },
      vip: {
        button: 'Request a VIP table',
        h1: 'Request a VIP table',
        metaTitle: 'Request a VIP Table in Courchevel | CLC',
        description: 'Après-ski, club or a festive dinner: tell us the venue, the night and your group. We request the table and reply within 15 minutes.',
        lead: 'Tell us the venue, the night and the size of your group. We request the table and the guest list, and confirm as soon as the venue does.',
        itemHint: 'Leave blank and we suggest the right place for the night.',
        detailsHint: 'Bottles, a birthday, a driver for the evening…',
        whatsapp: (item) => (item ? `Hello, I'd like to request a VIP table at ${item} on ` : "Hello, I'd like to request a VIP table in Courchevel on "),
      },
      transfer: {
        button: 'Request a transfer',
        h1: 'Request a transfer',
        metaTitle: 'Request a Transfer to Courchevel | CLC',
        description: 'Car, van or helicopter: tell us where from, when and how many. We arrange the transfer and reply within 15 minutes, 8:00 to 22:00.',
        lead: 'Tell us where you are coming from, when and how many are travelling. We arrange the car or helicopter and time it to your flight or train.',
        fromHint: 'For example: Geneva airport',
        toHint: 'For example: Courchevel 1850',
        detailsHint: 'Luggage, ski bags, child seats, car or helicopter…',
        whatsapp: () => "Hello, I'd like a transfer to Courchevel from ",
      },
      instructor: {
        button: 'Request an instructor',
        h1: 'Request a ski instructor',
        metaTitle: 'Request a Ski Instructor in Courchevel | CLC',
        description: 'Private ski instructors and mountain guides: tell us the days, how many skiers and their levels. A reply within 15 minutes.',
        lead: 'Tell us the days, how many will ski and their levels. We match each skier with a qualified private instructor and confirm the bookings.',
        detailsHint: 'For example: two adults, intermediate; one child aged 7, beginner.',
        whatsapp: () => "Hello, I'd like a private ski instructor from ",
      },
      chef: {
        button: 'Request a private chef',
        h1: 'Request a private chef',
        metaTitle: 'Request a Private Chef in Courchevel | CLC',
        description: 'A private chef for one dinner or the whole week in your chalet: tell us the evenings and the guests. A reply within 15 minutes.',
        lead: 'Tell us the evenings, how many guests and the kind of meal you have in mind. We find the right chef and send you a proposal.',
        detailsHint: 'An occasion, dietary requirements, a favourite cuisine…',
        whatsapp: () => "Hello, I'd like a private chef in my chalet on ",
      },
      experience: {
        button: 'Request an experience',
        itemButton: 'Request this experience',
        h1: 'Request an experience',
        metaTitle: 'Request an Experience in Courchevel | CLC',
        description: 'Dog sledding, paragliding, snowmobiles, scenic flights: tell us what, when and for how many. A reply within 15 minutes.',
        lead: 'Tell us what you would like to do, when and how many of you. We book it with a qualified local provider and arrange the transfer.',
        itemHint: 'Leave blank and we suggest ideas for your group.',
        detailsHint: 'Ages, experience, anything we should know…',
        whatsapp: (item) => (item ? `Hello, I'd like to arrange this experience: ${item}, on ` : "Hello, I'd like to arrange an experience in Courchevel on "),
      },
      nanny: {
        button: 'Request a nanny',
        h1: 'Request a nanny',
        metaTitle: 'Request a Nanny in Courchevel | CLC',
        description: 'Babysitting and nannies in your chalet: tell us the days, the children and their ages. We reply within 15 minutes, 8:00 to 22:00.',
        lead: 'Tell us the days, how many children and their ages. We find the right nanny and confirm before you arrive.',
        detailsHint: 'Ages, the times you need, languages…',
        whatsapp: () => "Hello, I'd like a nanny in Courchevel from ",
      },
      treatment: {
        button: 'Request a treatment',
        h1: 'Request a treatment',
        metaTitle: 'Request a Massage or Treatment | CLC',
        description: 'A massage or treatment in your chalet or a spa: tell us the date and how many people. We reply within 15 minutes, 8:00 to 22:00.',
        lead: 'Tell us the treatment, the date and how many people. A therapist comes to your chalet, or we book time in a spa.',
        itemHint: 'Massage, sports recovery, facial…',
        detailsHint: 'A preferred time, injuries, a couples’ treatment…',
        whatsapp: (item) => (item ? `Hello, I'd like to book this treatment: ${item}, on ` : "Hello, I'd like a massage or treatment in my chalet on "),
      },
      event: {
        button: 'Plan an event',
        h1: 'Plan an event',
        metaTitle: 'Plan an Event in Courchevel | CLC',
        description: 'Birthdays, proposals, New Year’s Eve, corporate retreats: tell us the date and the number of guests. A reply within 15 minutes.',
        lead: 'Tell us the occasion, the date and how many guests. We come back with ideas, venues and a personal proposal.',
        itemHint: 'Birthday, proposal, New Year’s Eve, retreat…',
        detailsHint: 'The atmosphere you have in mind, venue ideas…',
        whatsapp: (item) => (item ? `Hello, I'm planning this event in Courchevel: ${item}, on ` : "Hello, I'm planning an event in Courchevel on "),
      },
      general: {
        button: 'Make a request',
        h1: 'Make a request',
        metaTitle: 'Make a Request | Courchevel Luxury Concierge',
        description: 'Shopping, errands, staff, security or your chalet: tell us what you need. A personal reply within 15 minutes, 8:00 to 22:00.',
        lead: 'Tell us what you need, as briefly or as fully as you like. We reply personally and take it from there.',
        detailsHint: 'For example: a gift delivered to the chalet on the 24th.',
        whatsapp: () => 'Hello, I have a request: ',
      },
    },
  },
  fr: {
    optional: 'facultatif',
    requestLegend: 'Votre demande',
    contactLegend: 'Vos coordonnées',
    stayingLabel: 'Où logez-vous ?',
    stayingHint: 'Chalet, hôtel ou village, si vous le savez.',
    submit: 'Envoyer ma demande',
    upsellTitle: 'Vous organisez tout le séjour ?',
    upsellLink: 'Indiquez-nous vos dates, nous nous occupons du reste.',
    asideTitle: 'Vous préférez écrire ?',
    stayItem: { button: 'Demander ce séjour', whatsapp: (item) => `Bonjour, je souhaite organiser un séjour (${item}) du ` },
    types: {
      table: {
        button: 'Demander une table',
        h1: 'Demander une table',
        metaTitle: 'Réserver une table à Courchevel | CLC',
        description: 'Indiquez le restaurant, la date et le nombre de convives. Nous demandons la table et répondons sous 15 minutes, de 8 h à 22 h.',
        lead: 'Dites-nous où vous souhaitez dîner, quand et combien vous serez. Nous demandons la table pour vous et confirmons dès que le restaurant le fait.',
        itemHint: 'Laissez vide et nous vous proposons une adresse pour la soirée.',
        detailsHint: 'Une occasion, des allergies, une table en terrasse…',
        whatsapp: (item) => (item ? `Bonjour, je souhaite réserver une table chez ${item} le ` : 'Bonjour, je souhaite réserver une table de restaurant à Courchevel le '),
      },
      vip: {
        button: 'Demander une table VIP',
        h1: 'Demander une table VIP',
        metaTitle: 'Table VIP à Courchevel | CLC',
        description: 'Après-ski, club ou dîner festif : indiquez l’établissement, le soir et votre groupe. Nous demandons la table et répondons sous 15 minutes.',
        lead: 'Indiquez l’établissement, le soir et la taille de votre groupe. Nous demandons la table et la liste d’invités, et confirmons dès que l’établissement le fait.',
        itemHint: 'Laissez vide et nous vous proposons le bon endroit pour la soirée.',
        detailsHint: 'Bouteilles, un anniversaire, un chauffeur pour la soirée…',
        whatsapp: (item) => (item ? `Bonjour, je souhaite une table VIP chez ${item} le ` : 'Bonjour, je souhaite une table VIP à Courchevel le '),
      },
      transfer: {
        button: 'Demander un transfert',
        h1: 'Demander un transfert',
        metaTitle: 'Transfert vers Courchevel | CLC',
        description: 'Voiture, van ou hélicoptère : indiquez le départ, la date et le nombre de passagers. Nous organisons le transfert et répondons sous 15 minutes.',
        lead: 'Indiquez d’où vous venez, quand et combien vous êtes. Nous organisons la voiture ou l’hélicoptère, calés sur votre vol ou votre train.',
        fromHint: 'Par exemple : aéroport de Genève',
        toHint: 'Par exemple : Courchevel 1850',
        detailsHint: 'Bagages, housses de ski, sièges enfant, voiture ou hélicoptère…',
        whatsapp: () => 'Bonjour, je souhaite un transfert vers Courchevel depuis ',
      },
      instructor: {
        button: 'Demander un moniteur',
        h1: 'Demander un moniteur de ski',
        metaTitle: 'Demander un moniteur de ski | CLC',
        description: 'Moniteurs de ski privés et guides : indiquez les jours, le nombre de skieurs et leur niveau. Réponse sous 15 minutes, de 8 h à 22 h.',
        lead: 'Indiquez les jours, le nombre de skieurs et leur niveau. Nous associons chacun à un moniteur privé diplômé et confirmons les réservations.',
        detailsHint: 'Par exemple : deux adultes, niveau intermédiaire ; un enfant de 7 ans, débutant.',
        whatsapp: () => 'Bonjour, je souhaite un moniteur de ski privé du ',
      },
      chef: {
        button: 'Demander un chef privé',
        h1: 'Demander un chef privé',
        metaTitle: 'Chef privé à Courchevel | CLC',
        description: 'Un chef privé pour un dîner ou toute la semaine au chalet : indiquez les soirs et le nombre de convives. Réponse sous 15 minutes.',
        lead: 'Indiquez les soirs, le nombre de convives et le repas que vous imaginez. Nous trouvons le bon chef et vous envoyons une proposition.',
        detailsHint: 'Une occasion, des régimes particuliers, une cuisine préférée…',
        whatsapp: () => 'Bonjour, je souhaite un chef privé au chalet le ',
      },
      experience: {
        button: 'Demander une activité',
        itemButton: 'Demander cette activité',
        h1: 'Demander une activité',
        metaTitle: 'Activités à Courchevel | CLC',
        description: 'Chiens de traîneau, parapente, motoneige, survols : dites-nous quoi, quand et pour combien. Réponse sous 15 minutes, de 8 h à 22 h.',
        lead: 'Dites-nous ce que vous aimeriez faire, quand et combien vous serez. Nous réservons auprès d’un prestataire local qualifié et organisons le transfert.',
        itemHint: 'Laissez vide et nous vous proposons des idées pour votre groupe.',
        detailsHint: 'Âges, expérience, ce que nous devons savoir…',
        whatsapp: (item) => (item ? `Bonjour, je souhaite organiser cette activité : ${item}, le ` : 'Bonjour, je souhaite organiser une activité à Courchevel le '),
      },
      nanny: {
        button: 'Demander une nounou',
        h1: 'Demander une nounou',
        metaTitle: 'Nounou à Courchevel | CLC',
        description: 'Garde d’enfants et nounous au chalet : indiquez les jours, les enfants et leur âge. Nous répondons sous 15 minutes, de 8 h à 22 h.',
        lead: 'Indiquez les jours, le nombre d’enfants et leur âge. Nous trouvons la bonne nounou et confirmons avant votre arrivée.',
        detailsHint: 'Âges, horaires souhaités, langues…',
        whatsapp: () => 'Bonjour, je souhaite une nounou à Courchevel du ',
      },
      treatment: {
        button: 'Demander un soin',
        h1: 'Demander un soin',
        metaTitle: 'Massage ou soin à Courchevel | CLC',
        description: 'Un massage ou un soin au chalet ou au spa : indiquez la date et le nombre de personnes. Nous répondons sous 15 minutes, de 8 h à 22 h.',
        lead: 'Indiquez le soin, la date et le nombre de personnes. Un praticien vient à votre chalet, ou nous réservons un créneau au spa.',
        itemHint: 'Massage, récupération sportive, soin du visage…',
        detailsHint: 'Un horaire préféré, des blessures, un soin en duo…',
        whatsapp: (item) => (item ? `Bonjour, je souhaite réserver ce soin : ${item}, le ` : 'Bonjour, je souhaite un massage ou un soin au chalet le '),
      },
      event: {
        button: 'Organiser un événement',
        h1: 'Organiser un événement',
        metaTitle: 'Organiser un événement à Courchevel | CLC',
        description: 'Anniversaires, demandes en mariage, Saint-Sylvestre, séminaires : indiquez la date et le nombre d’invités. Réponse sous 15 minutes.',
        lead: 'Indiquez l’occasion, la date et le nombre d’invités. Nous revenons vers vous avec des idées, des lieux et une proposition personnalisée.',
        itemHint: 'Anniversaire, demande en mariage, Saint-Sylvestre, séminaire…',
        detailsHint: 'L’ambiance que vous imaginez, des idées de lieux…',
        whatsapp: (item) => (item ? `Bonjour, j’organise cet événement à Courchevel : ${item}, le ` : 'Bonjour, j’organise un événement à Courchevel le '),
      },
      general: {
        button: 'Faire une demande',
        h1: 'Faire une demande',
        metaTitle: 'Faire une demande | Courchevel Luxury Concierge',
        description: 'Shopping, courses, personnel, sécurité ou votre chalet : dites-nous ce dont vous avez besoin. Réponse personnelle sous 15 minutes.',
        lead: 'Dites-nous ce dont vous avez besoin, en quelques mots ou en détail. Nous vous répondons personnellement et prenons le relais.',
        detailsHint: 'Par exemple : un cadeau livré au chalet le 24.',
        whatsapp: () => 'Bonjour, j’ai une demande : ',
      },
    },
  },
};

/** What a page's button asks for. `stay` keeps the 3-step Plan my stay form. */
export interface PageRequest {
  type: RequestType | 'stay';
  /** Service slug to file the request under (or pre-select in the stay form). */
  service?: string;
  /** Pre-filled item (restaurant, experience, occasion). */
  item?: Record<Locale, string>;
  /** Button label when the type's default does not fit the page. */
  label?: Record<Locale, string>;
  /** WhatsApp opening when the type's default does not fit the page. */
  whatsapp?: Record<Locale, string>;
}

/** Content pages by "collection/slug". Pages not listed lead to Plan my stay. */
export const pageRequests: Record<string, PageRequest> = {
  'services/chalets': { type: 'stay', service: 'chalets' },
  'pages/palace-hotels-courchevel': { type: 'stay', service: 'chalets' },
  'services/transfers': { type: 'transfer' },
  'services/private-chef': { type: 'chef' },
  'services/ski': { type: 'instructor' },
  'services/experiences': { type: 'experience' },
  'services/nightlife': { type: 'vip' },
  'services/childcare': { type: 'nanny' },
  'services/wellness': { type: 'treatment' },
  'services/events': { type: 'event' },
  'services/lifestyle': { type: 'general', service: 'lifestyle' },
  'services/staff': {
    type: 'general',
    service: 'staff',
    label: { en: 'Request staff', fr: 'Demander du personnel' },
    whatsapp: { en: "Hello, I'm looking for chalet staff from ", fr: 'Bonjour, je cherche du personnel de chalet du ' },
  },
  'services/owners': {
    type: 'general',
    service: 'owners',
    label: { en: 'Talk to us about your chalet', fr: 'Parlons de votre chalet' },
    whatsapp: { en: "Hello, I own a chalet in Courchevel and I'd like to talk about ", fr: 'Bonjour, je suis propriétaire d’un chalet à Courchevel et je souhaite parler de ' },
  },
  'guides/where-to-eat': { type: 'table' },
  'guides/getting-to-courchevel': { type: 'transfer' },
  'guides/heli-skiing-from-courchevel': { // day trips to Italy or Switzerland only: heli-drops are banned in France
    type: 'experience',
    item: { en: 'Heli-skiing day trip to Italy or Switzerland', fr: 'Journée d’héliski en Italie ou en Suisse' },
    label: { en: 'Plan a heli-ski day', fr: 'Organiser une journée d’héliski' },
  },
  'pages/corporate-retreats-courchevel': {
    type: 'event',
    service: 'events',
    item: { en: 'Corporate retreat', fr: 'Séminaire d’entreprise' },
    label: { en: 'Plan a retreat', fr: 'Organiser un séminaire' },
  },
};
