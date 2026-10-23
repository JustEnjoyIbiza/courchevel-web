/**
 * The emotional layer of the Services, Experiences and Villages hubs: one
 * italic line per item, the photo it is shown with, and section headings.
 * Every line restates facts already on the site (no new claims, no prices).
 * French: to be reviewed by a native speaker.
 */
import type { Locale } from '../data/business';
import type { PhotoKey } from '../data/photos';

type L = Record<Locale, string>;

/** Alt text per photo, matching the pages that already use it. */
export const photoAlt: Record<PhotoKey, L> = {
  'rolls-royce-helicopter': {
    en: 'Helicopter waiting on a snow-covered landing area in the Alps, seen from the front seat of a chauffeured car',
    fr: 'Hélicoptère posé sur une aire enneigée dans les Alpes, vu depuis l’avant d’une voiture avec chauffeur',
  },
  helicopter: { en: 'Helicopter on a snowy landing area among pine trees in the Alps', fr: 'Hélicoptère se posant sur une hélisurface enneigée entourée de sapins dans les Alpes' },
  'gift-delivery': { en: 'Two cars unloading gifts and shopping bags in front of a chalet in Courchevel', fr: 'Deux voitures déchargeant cadeaux et sacs de shopping devant un chalet à Courchevel' },
  luggage: { en: 'Land Rover Defender with luxury luggage in the snow, ready for a chalet arrival', fr: 'Land Rover Defender et bagages de luxe dans la neige, prêts pour une arrivée au chalet' },
  'white-chalet': { en: 'White wooden chalet among snow-covered pine trees in Courchevel', fr: 'Chalet en bois blanc entouré de sapins enneigés à Courchevel' },
  'stone-chalet': { en: 'Stone and wood chalet in fresh snow in Courchevel', fr: 'Chalet en pierre et bois sous la neige fraîche à Courchevel' },
  'wooden-chalets': { en: 'Wooden chalets with balconies and a gondola passing above in Courchevel', fr: 'Chalets en bois avec balcons et une télécabine au-dessus, à Courchevel' },
  terrace: { en: 'Sunny terrace of a mountain restaurant above the slopes in Courchevel', fr: 'Terrasse ensoleillée d’un restaurant d’altitude au-dessus des pistes de Courchevel' },
  gondola: { en: 'Gondola cabin above snow-covered pine trees at dusk in Courchevel', fr: 'Télécabine au-dessus des sapins enneigés de Courchevel, à la tombée du jour' },
  lantern: { en: 'Lantern glowing in falling snow on a winter evening', fr: 'Lanterne allumée sous la neige un soir d’hiver' },
  sculpture: { en: 'The red Courchevel letters sculpture in the snow', fr: 'La sculpture des lettres rouges Courchevel dans la neige' },
  'hot-tub': { en: 'Steaming outdoor hot tub on a chalet terrace facing snow-covered pine trees in Courchevel', fr: 'Bain nordique fumant sur la terrasse d’un chalet face aux sapins enneigés à Courchevel' },
};

/** Services hub: the line under each service name and the photo it is shown with. */
export const serviceStories: Record<string, { line: L; photo: PhotoKey }> = {
  chalets: { photo: 'stone-chalet', line: { en: 'A home on the mountain, ready before you land.', fr: 'Une maison à la montagne, prête avant votre atterrissage.' } },
  transfers: { photo: 'rolls-royce-helicopter', line: { en: 'From the airport to the altiport, timed to your flight.', fr: 'De l’aéroport à l’altiport, calé sur votre vol.' } },
  'private-chef': { photo: 'terrace', line: { en: 'Dinner by the fire, cooked for your table alone.', fr: 'Le dîner au coin du feu, préparé pour votre seule table.' } },
  ski: { photo: 'gondola', line: { en: 'Your pace, your level, your instructor.', fr: 'Votre rythme, votre niveau, votre moniteur.' } },
  experiences: { photo: 'helicopter', line: { en: 'The afternoons you talk about at dinner.', fr: 'Les après-midi dont on parle au dîner.' } },
  nightlife: { photo: 'lantern', line: { en: 'The right table, the right night, a driver waiting.', fr: 'La bonne table, le bon soir, un chauffeur qui attend.' } },
  staff: { photo: 'white-chalet', line: { en: 'A household that runs quietly around you.', fr: 'Une maison qui tourne en silence autour de vous.' } },
  childcare: { photo: 'wooden-chalets', line: { en: 'Children looked after, parents free to ski.', fr: 'Les enfants entre de bonnes mains, les parents libres de skier.' } },
  wellness: { photo: 'hot-tub', line: { en: 'Recovery comes to the chalet.', fr: 'Le bien-être vient jusqu’au chalet.' } },
  events: { photo: 'sculpture', line: { en: 'Birthdays, proposals and New Year’s Eve, set in the snow.', fr: 'Anniversaires, demandes en mariage et Saint-Sylvestre, dans la neige.' } },
  lifestyle: { photo: 'gift-delivery', line: { en: 'Errands, gifts and discreet protection, taken care of.', fr: 'Courses, cadeaux et protection discrète, pris en charge.' } },
  owners: { photo: 'luggage', line: { en: 'Your chalet looked after while you are away.', fr: 'Votre chalet entre de bonnes mains en votre absence.' } },
};

/** The three services told as large chapters at the top of the Services hub. */
export const featuredServiceSlugs = ['chalets', 'transfers', 'private-chef'];

/** Villages hub: a line and a photo per village (photos chosen so none repeats on the page). */
export const villageStories: Record<string, { line: L; photo: PhotoKey }> = {
  'courchevel-1850': { photo: 'gondola', line: { en: 'The altiport, the palace hotels and the Croisette, a short walk apart.', fr: 'L’altiport, les palaces et la Croisette, à quelques pas les uns des autres.' } },
  'courchevel-1650-moriond': { photo: 'wooden-chalets', line: { en: 'Sunshine, wide slopes and real village life.', fr: 'Du soleil, de larges pistes et une vraie vie de village.' } },
  'courchevel-1550-village': { photo: 'white-chalet', line: { en: 'Quiet streets, family chalets and a gondola up to 1850.', fr: 'Des rues calmes, des chalets familiaux et la télécabine vers 1850.' } },
  'courchevel-1300-le-praz': { photo: 'stone-chalet', line: { en: 'Stone, wood and forest, below the Olympic ski jumps.', fr: 'La pierre, le bois et la forêt, au pied des tremplins olympiques.' } },
  'la-tania': { photo: 'hot-tub', line: { en: 'A small village among the trees, between Courchevel and Méribel.', fr: 'Un petit village dans les arbres, entre Courchevel et Méribel.' } },
  meribel: { photo: 'lantern', line: { en: 'The heart of the Trois Vallées, over the Saulire on skis.', fr: 'Le cœur des Trois Vallées, de l’autre côté de la Saulire, skis aux pieds.' } },
  'val-thorens': { photo: 'helicopter', line: { en: 'The highest resort in the Trois Vallées, for a day at altitude.', fr: 'La station la plus haute des Trois Vallées, pour une journée en altitude.' } },
};

/** Experiences hub: a short scene per experience. */
export const experienceMoments: Record<string, L> = {
  'winter-retreat': { en: 'The fire is lit, the fridge is full and the ski passes are on the table.', fr: 'Le feu est allumé, le réfrigérateur est plein et les forfaits sont sur la table.' },
  'vip-party': { en: 'Après-ski on the terrace, dinner in the village, and your table waiting.', fr: 'L’après-ski en terrasse, le dîner au village, et votre table qui vous attend.' },
  'ski-explorer': { en: 'First lifts with a guide who has read the snow before you.', fr: 'Les premières remontées avec un guide qui a lu la neige avant vous.' },
  'family-week': { en: 'Lessons in the morning, sledging in the afternoon, a nanny for the evening.', fr: 'Les cours le matin, la luge l’après-midi, une nounou pour la soirée.' },
  'christmas-new-year': { en: 'The tree decorated before you arrive, the table set for the 24th.', fr: 'Le sapin décoré avant votre arrivée, la table dressée pour le 24.' },
  'corporate-retreat': { en: 'Meetings in the morning, the mountain after lunch, dinner together.', fr: 'Les réunions le matin, la montagne après le déjeuner, le dîner ensemble.' },
};

/** Section copy for the three hubs. */
export const hubCopy = {
  services: {
    chaptersEyebrow: { en: 'At the heart of every stay', fr: 'Au cœur de chaque séjour' },
    moreEyebrow: { en: 'And everything around it', fr: 'Et tout ce qui l’entoure' },
    moreTitle: { en: 'Nine more ways we look after you', fr: 'Neuf autres façons de prendre soin de vous' },
    discover: { en: 'Discover', fr: 'Découvrir' },
    alsoTitle: { en: 'Also arranged for', fr: 'Également pour' },
  },
  experiences: {
    eyebrow: { en: 'Signature experience', fr: 'Expérience signature' },
    plan: { en: 'Plan this experience', fr: 'Organiser cette expérience' },
    includes: { en: 'Usually includes', fr: 'Comprend en général' },
    weekTitle: { en: 'See how a whole week fits together', fr: 'Voir comment s’organise une semaine entière' },
    weekText: {
      en: 'An example stay in Courchevel 1850, day by day, from the helicopter arrival to the last dinner.',
      fr: 'Un exemple de séjour à Courchevel 1850, jour après jour, de l’arrivée en hélicoptère au dernier dîner.',
    },
    weekLink: { en: 'A week in Courchevel 1850', fr: 'Une semaine à Courchevel 1850' },
  },
  villages: {
    beyondEyebrow: { en: 'Beyond Courchevel', fr: 'Au-delà de Courchevel' },
    beyondTitle: { en: 'Elsewhere in the Trois Vallées', fr: 'Ailleurs dans les Trois Vallées' },
    glanceTitle: { en: 'At a glance', fr: 'En un coup d’œil' },
    explore: { en: 'Explore the village', fr: 'Découvrir le village' },
    tourEyebrow: { en: 'Find your village', fr: 'Trouvez votre village' },
    tourTitle: { en: 'Five villages, one valley', fr: 'Cinq villages, une vallée' },
    tourText: {
      en: 'Each village seen from above, and where it sits on the mountain. Scroll down the valley, from 1850 to La Tania.',
      fr: 'Chaque village vu du ciel, et sa place sur la montagne. Descendez la vallée, de 1850 à La Tania.',
    },
    mapAlt: {
      en: 'Relief map of the Courchevel valley with its forests, pistes and lifts, and the five villages marked in gold',
      fr: 'Carte en relief de la vallée de Courchevel avec ses forêts, ses pistes et ses remontées, et les cinq villages marqués en or',
    },
    mapNote: {
      en: 'South at the top, looking up the valley. Relief, forests and aerial photographs: IGN. Pistes and lifts: © OpenStreetMap contributors.',
      fr: 'Le sud en haut, en remontant la vallée. Relief, forêts et photographies aériennes : IGN. Pistes et remontées : © les contributeurs d’OpenStreetMap.',
    },
    aerialAlt: { en: 'Aerial photograph of', fr: 'Photographie aérienne de' },
  },
} as const;
