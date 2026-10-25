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
  'chalet-living-room': { en: 'Chalet living room in Courchevel with exposed beams, a stone fireplace and a chandelier', fr: 'Salon d’un chalet à Courchevel avec poutres apparentes, cheminée en pierre et lustre' },
  'chalet-lounge': { en: 'Chalet lounge prepared for guests, with a lit chandelier above the stone fireplace', fr: 'Salon de chalet prêt pour l’arrivée des invités, lustre allumé au-dessus de la cheminée en pierre' },
  'stone-chalet-deep-snow': { en: 'Stone and wood chalet with balconies in deep snow among pine trees in Courchevel', fr: 'Chalet en pierre et bois avec balcons, dans la neige profonde entre les sapins de Courchevel' },
  'private-jet': { en: 'Cream leather seats and a table laid for a meal in a private jet cabin', fr: 'Fauteuils en cuir crème et table dressée dans la cabine d’un jet privé' },
  'dining-table': { en: 'Wooden dining table set for dinner by a window facing snow-covered peaks', fr: 'Table en bois dressée pour le dîner devant une fenêtre ouverte sur les sommets enneigés' },
  'party-table': { en: 'Long table dressed for a private party under a mirror-ball chandelier', fr: 'Longue table dressée pour une soirée privée sous un lustre à boules à facettes' },
  'apres-ski': { en: 'Skiers gathered on a sunny après-ski terrace below snowy peaks in Courchevel', fr: 'Skieurs réunis sur une terrasse d’après-ski ensoleillée, sous les sommets enneigés de Courchevel' },
  'skiers': { en: 'Two skiers on a groomed slope in front of wooden chalets in Courchevel', fr: 'Deux skieurs sur une piste damée devant des chalets en bois à Courchevel' },
  'husky': { en: 'Husky from a sled-dog team standing in the snow, other dogs waiting behind', fr: 'Husky d’un attelage de chiens de traîneau dans la neige, les autres chiens attendant derrière' },
  'boutiques-night': { en: 'Chalet-style boutiques lit up at night in Courchevel 1850, with a Christmas tree in front', fr: 'Boutiques de style chalet illuminées la nuit à Courchevel 1850, un sapin de Noël devant' },
  'restaurant-view': { en: 'Round table under a crystal chandelier in a mountain restaurant with a wide view of the Alps', fr: 'Table ronde sous un lustre en cristal dans un restaurant d’altitude avec une large vue sur les Alpes' },
  'van-snow': { en: 'Black chauffeured van parked on snow with mountain peaks behind', fr: 'Van noir avec chauffeur garé sur la neige, sommets en arrière-plan' },
  'lunch-table': { en: 'Lunch table on a sunny mountain terrace facing a snow-covered peak', fr: 'Table de déjeuner sur une terrasse d’altitude ensoleillée, face à un sommet enneigé' },
  'christmas-tree': { en: 'Decorated Christmas tree against snow-covered mountains in Courchevel', fr: 'Sapin de Noël décoré devant les montagnes enneigées de Courchevel' },
  'fire-pit': { en: 'Mountain terrace with a lit fire pit and lounge seats for a group', fr: 'Terrasse d’altitude avec un brasero allumé et des assises pour un groupe' },
  'van-interior': { en: 'Open door of a chauffeured van showing cream leather seats and a blanket, mountains behind', fr: 'Portière ouverte d’un van avec chauffeur, sièges en cuir crème et plaid, montagnes en arrière-plan' },
  'paraglider': { en: 'Paraglider flying over the valley above a gondola and snowy slopes', fr: 'Parapente au-dessus de la vallée, d’une télécabine et des pistes enneigées' },
  'courchevel-gondola': { en: 'Courchevel gondola cabin with the snowflake logo against snowy peaks', fr: 'Cabine de télécabine aux couleurs de Courchevel, logo flocon, devant les sommets enneigés' },
  bagatelle: { en: 'The Bagatelle arch on the restaurant’s terrace, facing snow-covered peaks above Courchevel 1850', fr: 'L’arche Bagatelle sur la terrasse du restaurant, face aux sommets enneigés au-dessus de Courchevel 1850' },
  'cap-horn': { en: 'The Cap Horn Courchevel 1954 sign in front of a busy sunny terrace', fr: 'L’enseigne Cap Horn Courchevel 1954 devant une terrasse ensoleillée et animée' },
  'chalet-de-pierres': { en: 'Le Chalet de Pierres on the Verdons slope in Courchevel 1850, with a gondola passing above the trees', fr: 'Le Chalet de Pierres sur la piste des Verdons à Courchevel 1850, une télécabine passant au-dessus des sapins' },
  'le-1947': { en: 'The white, sculptural dining room of Le 1947 at Cheval Blanc Courchevel, with snowy trees outside', fr: 'La salle blanche et sculpturale du 1947 au Cheval Blanc Courchevel, les sapins enneigés derrière les fenêtres' },
  'sylvestre-wahid': { en: 'A dish from Sylvestre Wahid served on a carved, mountain-shaped stand', fr: 'Un plat de Sylvestre Wahid servi sur un socle sculpté en forme de montagne' },
  'le-strato': { en: 'Le Strato hotel in Courchevel 1850 lit up at dusk, with deep snow in front', fr: 'L’hôtel Le Strato à Courchevel 1850 illuminé à la tombée du jour, devant une épaisse couche de neige' },
  'le-chabichou': { en: 'The dining room of Le Chabichou in Courchevel 1850, with a crystal chandelier and a wood-panelled ceiling', fr: 'La salle du Chabichou à Courchevel 1850, avec un lustre en cristal et un plafond lambrissé' },
  loulou: { en: 'A booth at Loulou Courchevel with tartan walls, carved wood and a table set for dinner', fr: 'Une alcôve chez Loulou Courchevel, murs en tartan, bois sculpté et table dressée pour le dîner' },
  'la-soucoupe': { en: 'The busy sunny terrace of La Soucoupe at the top of La Loze, facing snow-covered peaks', fr: 'La terrasse ensoleillée et animée de La Soucoupe au sommet de La Loze, face aux sommets enneigés' },
  'la-mangeoire': { en: 'The dining room of La Mangeoire in Courchevel 1850, with candlelit tables and deep velvet armchairs', fr: 'La salle de La Mangeoire à Courchevel 1850, tables éclairées à la bougie et profonds fauteuils de velours' },
  'matsuhisa': { en: 'The wood-panelled dining room of Matsuhisa at Les Airelles, Courchevel 1850, with banquettes and leather armchairs', fr: 'La salle boisée de Matsuhisa aux Airelles, Courchevel 1850, avec banquettes et fauteuils en cuir' },
};

/** Services hub: the line under each service name and the photo it is shown with. */
export const serviceStories: Record<string, { line: L; photo: PhotoKey }> = {
  chalets: { photo: 'chalet-living-room', line: { en: 'A home on the mountain, ready before you land.', fr: 'Une maison à la montagne, prête avant votre atterrissage.' } },
  transfers: { photo: 'private-jet', line: { en: 'From the airport to the altiport, timed to your flight.', fr: 'De l’aéroport à l’altiport, calé sur votre vol.' } },
  'private-chef': { photo: 'dining-table', line: { en: 'Dinner by the fire, cooked for your table alone.', fr: 'Le dîner au coin du feu, préparé pour votre seule table.' } },
  ski: { photo: 'skiers', line: { en: 'Your pace, your level, your instructor.', fr: 'Votre rythme, votre niveau, votre moniteur.' } },
  experiences: { photo: 'husky', line: { en: 'The afternoons you talk about at dinner.', fr: 'Les après-midi dont on parle au dîner.' } },
  nightlife: { photo: 'apres-ski', line: { en: 'The right table, the right night, a driver waiting.', fr: 'La bonne table, le bon soir, un chauffeur qui attend.' } },
  staff: { photo: 'chalet-lounge', line: { en: 'A household that runs quietly around you.', fr: 'Une maison qui tourne en silence autour de vous.' } },
  childcare: { photo: 'wooden-chalets', line: { en: 'Children looked after, parents free to ski.', fr: 'Les enfants entre de bonnes mains, les parents libres de skier.' } },
  wellness: { photo: 'hot-tub', line: { en: 'Recovery comes to the chalet.', fr: 'Le bien-être vient jusqu’au chalet.' } },
  events: { photo: 'party-table', line: { en: 'Birthdays, proposals and New Year’s Eve, set in the snow.', fr: 'Anniversaires, demandes en mariage et Saint-Sylvestre, dans la neige.' } },
  lifestyle: { photo: 'boutiques-night', line: { en: 'Errands, gifts and discreet protection, taken care of.', fr: 'Courses, cadeaux et protection discrète, pris en charge.' } },
  owners: { photo: 'stone-chalet-deep-snow', line: { en: 'Your chalet looked after while you are away.', fr: 'Votre chalet entre de bonnes mains en votre absence.' } },
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
    featureEyebrow: { en: 'The highest village', fr: 'Le village le plus haut' },
    courchevelTitle: { en: 'Four more villages, four characters', fr: 'Quatre autres villages, quatre caractères' },
    beyondEyebrow: { en: 'Beyond Courchevel', fr: 'Au-delà de Courchevel' },
    beyondTitle: { en: 'Elsewhere in the Trois Vallées', fr: 'Ailleurs dans les Trois Vallées' },
    glanceTitle: { en: 'At a glance', fr: 'En un coup d’œil' },
    explore: { en: 'Explore the village', fr: 'Découvrir le village' },
  },
} as const;
