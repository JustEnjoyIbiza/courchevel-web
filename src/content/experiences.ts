/**
 * Signature experiences: ready-made starting points, always adapted and
 * quoted personally. The first three come from the original site; the
 * last three were added in Phase 2.
 * French: to be reviewed by a native speaker.
 */
import type { Locale } from '../data/business';
import type { PhotoKey } from '../data/photos';

export interface Experience {
  id: string;
  name: Record<Locale, string>;
  detail: Record<Locale, string>;
  text: Record<Locale, string>;
  /** What the experience usually combines. */
  includes: Record<Locale, string[]>;
  /** Unlocalized service paths it draws on. */
  services: string[];
  image?: PhotoKey;
  imageAlt?: Record<Locale, string>;
}

export const experiences: Experience[] = [
  {
    id: 'winter-retreat',
    name: { en: 'Winter Retreat', fr: 'Winter Retreat' },
    detail: { en: '3 to 5 nights in a chalet', fr: '3 à 5 nuits en chalet' },
    text: {
      en: 'A chalet stay with arrival transfers, ski planning and a concierge on call throughout.',
      fr: 'Un séjour en chalet avec transferts, journées de ski organisées et un concierge joignable à tout moment.',
    },
    includes: {
      en: [
        'A chalet or palace hotel chosen for your group and dates',
        'Arrival and departure transfers by helicopter or chauffeured car',
        'Lift passes, equipment fitting and a private instructor',
        'Fridge, cellar and rooms prepared before you arrive',
        'A concierge on call throughout your stay',
      ],
      fr: [
        'Un chalet ou un palace choisi pour votre groupe et vos dates',
        'Transferts aller et retour en hélicoptère ou en voiture avec chauffeur',
        'Forfaits, réglage du matériel et moniteur privé',
        'Réfrigérateur, cave et chambres préparés avant votre arrivée',
        'Un concierge joignable pendant tout le séjour',
      ],
    },
    services: ['/services/chalets/', '/services/transfers/', '/services/ski/'],
    image: 'stone-chalet',
    imageAlt: { en: 'Stone and wood chalet in fresh snow in Courchevel', fr: 'Chalet en pierre et bois sous la neige fraîche à Courchevel' },
  },
  {
    id: 'vip-party',
    name: { en: 'VIP Party Package', fr: 'VIP Party Package' },
    detail: { en: 'Après-ski and VIP tables', fr: 'Après-ski et tables VIP' },
    text: {
      en: 'Après-ski access, champagne and VIP table reservations, booked ahead of your evenings.',
      fr: 'Tables d’après-ski, champagne et demandes de tables VIP, préparés avant vos soirées.',
    },
    includes: {
      en: [
        'Après-ski and nightclub table requests, subject to availability',
        'Champagne and table arrangements agreed with the venue in advance',
        'A pre-party dinner by a private chef in your chalet',
        'Chauffeured cars to the venue and back',
      ],
      fr: [
        'Demandes de tables en après-ski et en club, sous réserve de disponibilité',
        'Champagne et installation de la table convenus à l’avance avec l’établissement',
        'Un dîner avant la soirée, préparé par un chef privé au chalet',
        'Voitures avec chauffeur pour l’aller et le retour',
      ],
    },
    services: ['/services/nightlife/', '/services/private-chef/', '/services/transfers/'],
    image: 'lantern',
    imageAlt: { en: 'Red lantern and clock in falling snow in Courchevel village', fr: 'Lanterne rouge et horloge sous la neige dans le village de Courchevel' },
  },
  {
    id: 'ski-explorer',
    name: { en: 'Ski Explorer', fr: 'Ski Explorer' },
    detail: { en: 'Private guide', fr: 'Guide privé' },
    text: {
      en: 'A private instructor or certified mountain guide and a ski day planned around your level.',
      fr: 'Un moniteur privé ou un guide de haute montagne diplômé, et une journée de ski pensée pour votre niveau.',
    },
    includes: {
      en: [
        'A private instructor or certified mountain guide matched to your level',
        'A day planned across the Trois Vallées around snow and weather',
        'Lunch reserved in a mountain restaurant on your route',
        'Heli-skiing day trips to Italy or Switzerland on request',
      ],
      fr: [
        'Un moniteur privé ou un guide de haute montagne diplômé adapté à votre niveau',
        'Une journée dans les Trois Vallées, pensée selon la neige et la météo',
        'Une table réservée dans un restaurant d’altitude sur votre itinéraire',
        'Journées d’héliski en Italie ou en Suisse sur demande',
      ],
    },
    services: ['/services/ski/', '/services/experiences/', '/services/private-chef/'],
    image: 'gondola',
    imageAlt: { en: 'Courchevel gondola cabin against the evening sky', fr: 'Télécabine de Courchevel sur fond de ciel du soir' },
  },
  {
    id: 'family-week',
    name: { en: 'Family Week', fr: 'Semaine en famille' },
    detail: { en: 'A week with children', fr: 'Une semaine avec des enfants' },
    text: {
      en: 'A family chalet with ski lessons for every age, a nanny for the evenings and a house ready for small children.',
      fr: 'Un chalet familial, des cours de ski pour chaque âge, une nounou pour les soirées et une maison prête pour les plus petits.',
    },
    includes: {
      en: [
        'A chalet with the space and layout your family needs',
        'Ski lessons for children and private instructors for adults',
        'A nanny or evening babysitter, matched to the children’s ages',
        'Cots, high chairs and children’s food ready on arrival',
        'Activities for days off the slopes',
      ],
      fr: [
        'Un chalet dont l’espace et l’agencement conviennent à votre famille',
        'Cours de ski pour les enfants et moniteurs privés pour les adultes',
        'Une nounou ou une baby-sitter le soir, selon l’âge des enfants',
        'Lits bébé, chaises hautes et repas des enfants prêts à l’arrivée',
        'Des activités pour les journées sans ski',
      ],
    },
    services: ['/services/childcare/', '/services/chalets/', '/services/ski/'],
    image: 'wooden-chalets',
    imageAlt: { en: 'Wooden chalets in the snow below a gondola in Courchevel', fr: 'Chalets en bois sous la neige au pied d’une télécabine à Courchevel' },
  },
  {
    id: 'christmas-new-year',
    name: { en: 'Christmas and New Year', fr: 'Noël et Nouvel An' },
    detail: { en: 'The festive fortnight', fr: 'Les deux semaines de fêtes' },
    text: {
      en: 'A chalet decorated before you arrive, Christmas dinner by a private chef and New Year’s Eve planned well in advance.',
      fr: 'Un chalet décoré avant votre arrivée, un dîner de Noël préparé par un chef privé et un réveillon du Nouvel An organisé bien à l’avance.',
    },
    includes: {
      en: [
        'Christmas tree, decoration and gifts delivered to the chalet',
        'Christmas Eve and Christmas Day menus by a private chef',
        'Restaurant and club table requests for New Year’s Eve, subject to availability',
        'Transfers timed around the busiest travel days',
      ],
      fr: [
        'Sapin, décoration et cadeaux livrés au chalet',
        'Menus du réveillon et du jour de Noël par un chef privé',
        'Demandes de tables au restaurant et en club pour le 31 décembre, sous réserve de disponibilité',
        'Transferts organisés autour des jours de départ les plus chargés',
      ],
    },
    services: ['/services/chalets/', '/services/private-chef/', '/services/lifestyle/'],
    image: 'gift-delivery',
    imageAlt: { en: 'Gifts being delivered to a chalet in the snow in Courchevel', fr: 'Livraison de cadeaux à un chalet sous la neige à Courchevel' },
  },
  {
    id: 'corporate-retreat',
    name: { en: 'Corporate Retreat', fr: 'Séminaire en montagne' },
    detail: { en: 'Teams and leadership groups', fr: 'Équipes et comités de direction' },
    text: {
      en: 'A chalet or hotel for your team, with space to meet, time on the mountain and dinners planned around the programme.',
      fr: 'Un chalet ou un hôtel pour votre équipe, avec un espace de réunion, du temps en montagne et des dîners pensés autour du programme.',
    },
    includes: {
      en: [
        'Accommodation with a room suited to meetings',
        'Group transfers from Geneva, Lyon or Chambéry',
        'Ski instructors grouped by level, and activities for non-skiers',
        'Private dinners and one evening event for the whole group',
        'One contact for your assistant or event team',
      ],
      fr: [
        'Un hébergement avec une pièce adaptée aux réunions',
        'Transferts de groupe depuis Genève, Lyon ou Chambéry',
        'Moniteurs de ski par niveau et activités pour ceux qui ne skient pas',
        'Dîners privés et une soirée pour tout le groupe',
        'Un seul interlocuteur pour votre assistant ou votre équipe événementielle',
      ],
    },
    services: ['/services/events/', '/services/transfers/', '/services/experiences/'],
    image: 'hot-tub',
    imageAlt: { en: 'Outdoor hot tub among snowy pine trees in Courchevel', fr: 'Bain nordique en plein air parmi les sapins enneigés à Courchevel' },
  },
];
