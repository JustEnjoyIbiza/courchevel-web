/**
 * The 12 services, in the order and scope of the plan ("Site structure").
 * Every service is on request: no prices, ever.
 * French: to be reviewed by a native speaker.
 */
import type { Locale } from './business';

export interface Service {
  slug: string;
  name: Record<Locale, string>;
  summary: Record<Locale, string>;
}

export const services: Service[] = [
  {
    slug: 'chalets',
    name: { en: 'Chalets and palace hotels', fr: 'Chalets et palaces' },
    summary: {
      en: 'Ultra-luxury chalets and palace hotels, staffed and prepared before you arrive.',
      fr: 'Chalets d’exception et palaces, avec personnel, préparés avant votre arrivée.',
    },
  },
  {
    slug: 'transfers',
    name: { en: 'Private aviation and transfers', fr: 'Aviation privée et transferts' },
    summary: {
      en: 'Helicopter transfers from Geneva, Lyon, Chambéry and Milan, private jets and chauffeured cars.',
      fr: 'Transferts en hélicoptère depuis Genève, Lyon, Chambéry et Milan, jets privés et voitures avec chauffeur.',
    },
  },
  {
    slug: 'ski',
    name: { en: 'Private ski and mountain', fr: 'Ski privé et montagne' },
    summary: {
      en: 'Certified private instructors, off-piste guides and heli-skiing day trips to Italy or Switzerland.',
      fr: 'Moniteurs privés diplômés, guides hors-piste et journées d’héliski en Italie ou en Suisse.',
    },
  },
  {
    slug: 'experiences',
    name: { en: 'Mountain experiences', fr: 'Expériences en montagne' },
    summary: {
      en: 'Snowmobiling, dog sledding, paragliding, ice driving and scenic helicopter flights.',
      fr: 'Motoneige, chiens de traîneau, parapente, conduite sur glace et survols en hélicoptère.',
    },
  },
  {
    slug: 'private-chef',
    name: { en: 'Dining and private chefs', fr: 'Gastronomie et chefs privés' },
    summary: {
      en: 'Michelin-starred and private chefs in your chalet, sommeliers and priority restaurant tables.',
      fr: 'Chefs étoilés et chefs privés dans votre chalet, sommeliers et tables prioritaires.',
    },
  },
  {
    slug: 'nightlife',
    name: { en: 'Nightlife and après-ski', fr: 'Soirées et après-ski' },
    summary: {
      en: 'Après-ski and nightclub tables, guest lists and private parties in your chalet.',
      fr: 'Tables en après-ski et en club, listes d’invités et soirées privées au chalet.',
    },
  },
  {
    slug: 'staff',
    name: { en: 'Household staff', fr: 'Personnel de maison' },
    summary: {
      en: 'Butlers, chalet managers, daily housekeeping, serving staff and garment care.',
      fr: 'Majordomes, chalet managers, ménage quotidien, service à table et entretien du linge.',
    },
  },
  {
    slug: 'childcare',
    name: { en: 'Family and childcare', fr: 'Famille et enfants' },
    summary: {
      en: 'Certified multilingual nannies, evening babysitting, kids’ ski lessons and baby equipment.',
      fr: 'Nounous diplômées multilingues, baby-sitting le soir, cours de ski enfants et matériel bébé.',
    },
  },
  {
    slug: 'wellness',
    name: { en: 'Wellness and beauty', fr: 'Bien-être et beauté' },
    summary: {
      en: 'In-chalet massage, spa bookings, personal trainers, yoga, hair and make-up.',
      fr: 'Massages au chalet, réservations de spa, coachs sportifs, yoga, coiffure et maquillage.',
    },
  },
  {
    slug: 'events',
    name: { en: 'Events and celebrations', fr: 'Événements et célébrations' },
    summary: {
      en: 'Birthdays, proposals, weddings, New Year’s Eve and corporate groups.',
      fr: 'Anniversaires, demandes en mariage, mariages, Réveillon et groupes d’entreprise.',
    },
  },
  {
    slug: 'lifestyle',
    name: { en: 'Lifestyle, shopping and security', fr: 'Lifestyle, shopping et sécurité' },
    summary: {
      en: 'Personal shopping, gifts and errands, event tickets and close protection.',
      fr: 'Personal shopping, cadeaux et courses, billetterie et protection rapprochée.',
    },
  },
  {
    slug: 'owners',
    name: { en: 'Chalet owner services', fr: 'Services aux propriétaires' },
    summary: {
      en: 'Key holding, property checks, guest welcome, cleaning and year-round maintenance.',
      fr: 'Gardiennage des clés, visites de contrôle, accueil des hôtes, ménage et entretien à l’année.',
    },
  },
];
