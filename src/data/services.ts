/**
 * The services, in the order and scope of the plan ("Site structure"). Chalet
 * owner services and events were removed on 26 Oct 2026 (owner: not offered);
 * palace hotels became a service of their own the same day (owner: like the
 * homepage tile, Chalets | Palace hotels), so 11. A service whose page is not
 * under /services/ sets `path`; use servicePath() for links.
 * Service summaries carry no prices (the only prices are the two exceptions in CLAUDE.md).
 * French: to be reviewed by a native speaker.
 */
import type { Locale } from './business';

export interface Service {
  slug: string;
  name: Record<Locale, string>;
  summary: Record<Locale, string>;
  /** The page, when it is not /services/<slug>/. */
  path?: string;
}

export const services: Service[] = [
  {
    slug: 'chalets',
    name: { en: 'Chalets', fr: 'Chalets' },
    summary: {
      en: 'Private chalets and apartments in Courchevel and Méribel, staffed and prepared before you arrive.',
      fr: 'Chalets et appartements privés à Courchevel et Méribel, avec personnel, préparés avant votre arrivée.',
    },
  },
  {
    slug: 'palace-hotels',
    path: '/palace-hotels-courchevel/',
    name: { en: 'Palace hotels', fr: 'Palaces' },
    summary: {
      en: 'The five palaces of Courchevel and five more five-star hotels, each with its own page.',
      fr: 'Les cinq palaces de Courchevel et cinq autres hôtels cinq étoiles, chacun avec sa page.',
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
    slug: 'lifestyle',
    name: { en: 'Lifestyle, shopping and security', fr: 'Art de vivre, shopping et sécurité' },
    summary: {
      en: 'Personal shopping, gifts and errands, event tickets and close protection.',
      fr: 'Shopping privé, cadeaux et courses, billetterie et protection rapprochée.',
    },
  },
];

/** '/services/chalets/', or the service's own page ('/palace-hotels-courchevel/'); unlocalized. */
export const servicePath = (s: Service) => s.path ?? `/services/${s.slug}/`;
