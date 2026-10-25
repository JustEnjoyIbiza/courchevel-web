/**
 * The services, in the order and scope of the plan ("Site structure"). Chalet
 * owner services were removed on 26 Oct 2026 (owner: not offered), leaving 11.
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
    name: { en: 'Private chef', fr: 'Chef privé' },
    summary: {
      en: 'A chef in your chalet for one dinner, every evening or full board, Michelin-starred chefs on request.',
      fr: 'Un chef dans votre chalet pour un dîner, tous les soirs ou en pension complète, chefs étoilés sur demande.',
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
      fr: 'Majordomes, intendants, ménage quotidien, service à table et entretien du linge.',
    },
  },
  {
    slug: 'childcare',
    name: { en: 'Family and childcare', fr: 'Famille et enfants' },
    summary: {
      en: 'Vetted nannies, evening babysitting, children’s ski lessons and baby equipment.',
      fr: 'Nounous sélectionnées, baby-sitting le soir, cours de ski enfants et matériel bébé.',
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
      fr: 'Anniversaires, demandes en mariage, mariages, réveillon du Nouvel An et groupes d’entreprise.',
    },
  },
  {
    slug: 'lifestyle',
    name: { en: 'Lifestyle, shopping and security', fr: 'Art de vivre, shopping et sécurité' },
    summary: {
      en: 'Personal shopping, gifts and errands, event tickets and close protection.',
      fr: 'Shopping privé, cadeaux et courses, billetterie et protection rapprochée.',
    },
  },
];
