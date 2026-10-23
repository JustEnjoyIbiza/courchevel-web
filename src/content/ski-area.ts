/**
 * /courchevel-ski-area/ copy, EN and FR. The page follows the official longest
 * descent in Courchevel, La Saulire (2,740 m) to Le Praz (1,300 m).
 * Facts checked 23 October 2026 against official sources:
 *  - Altitudes, longest descent (7.878 km, red), Combe de la Saulire (red):
 *    les3vallees.com (resort page, longest descents, panoramic views) and the
 *    official Courchevel piste map (les3vallees.com/media/download/plan-courchevel.pdf).
 *  - Saulire cable car 2,077 m to 2,710 m, glazed cabins from December 2024,
 *    only lift access to the Combe de la Saulire and Grand Couloir: S3V press release 2024.
 *  - 150 km of marked pistes, snowmaking on more than half: courchevel.com/en/le-ski-alpin/
 *  - 600 km in the 3 Vallées: Les 3 Vallées press kit 2025/26.
 *  - Jean Blanc, L'Éclipse, Grand Couloir, lift hours, season, under-5s free:
 *    skipasscourchevel.com (official ski pass office) and les3vallees.com.
 * Not published (unverified or conflicting): exact lift and piste counts,
 * altiport altitude, Éclipse length beyond "more than 3 km".
 * French: to be reviewed by a native speaker.
 */
import type { Locale } from '../data/business';
import type { PhotoKey } from '../data/photos';

/** "Last updated" date shown on the page and used for the sitemap. */
export const skiAreaUpdated = new Date('2026-10-23');

/** Top and bottom of the descent, used by the altitude meter. */
export const descent = { top: 2740, bottom: 1300 };

interface Stop {
  id: string;
  altitude: number;
  eyebrow: string;
  title: string;
  line: string;
  text: string;
  facts: string[];
  links: { href: string; label: string }[];
  photo?: PhotoKey;
}

interface SkiAreaCopy {
  title: string;
  shortTitle: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  tagline: string;
  scrollHint: string;
  answer: string;
  numbers: { value: string; label: string }[];
  descentLabel: string;
  altitudeLabel: string;
  heroPhoto: PhotoKey;
  stops: Stop[];
  practicalEyebrow: string;
  practicalTitle: string;
  practical: { label: string; value: string }[];
  arrangeEyebrow: string;
  arrangeTitle: string;
  arrangeText: string;
  faqs: { q: string; a: string }[];
  sourcesNote: string;
}

export const skiArea: Record<Locale, SkiAreaCopy> = {
  en: {
    title: 'The Courchevel ski area, from summit to village',
    shortTitle: 'The ski area',
    metaTitle: 'Courchevel Ski Area: Slopes, Lifts and Runs | CLC',
    description: 'Ski Courchevel from La Saulire at 2,740 m down to Le Praz at 1,300 m: the slopes, lifts, famous runs, season dates and how we arrange your ski days.',
    eyebrow: 'The slopes',
    tagline: '1,440 metres of descent, from La Saulire to Le Praz.',
    scrollHint: 'Scroll down the mountain',
    answer: 'Courchevel has 150 km of marked pistes and is part of the Trois Vallées, about 600 km of linked skiing. Its longest run starts at the top of La Saulire, 2,740 m, and ends in Le Praz at 1,300 m: 7.9 km and 1,440 m of vertical. This page follows that descent, stop by stop.',
    numbers: [
      { value: '150 km', label: 'Marked pistes in Courchevel' },
      { value: '600 km', label: 'Pistes across the Trois Vallées' },
      { value: '1,440 m', label: 'From La Saulire to Le Praz' },
      { value: '7.9 km', label: 'The longest descent' },
    ],
    descentLabel: 'The descent from La Saulire to Le Praz',
    altitudeLabel: 'Altitude',
    heroPhoto: 'gondola',
    stops: [
      {
        id: 'la-saulire',
        altitude: 2740,
        eyebrow: 'The summit',
        title: 'La Saulire',
        line: 'The top of Courchevel, where the Trois Vallées open up.',
        text: 'The Saulire cable car climbs from 2,077 m to 2,710 m in fully glazed cabins, rebuilt and reopened in December 2024. From the top, the slopes run back down to Courchevel and over to Méribel on the other side.',
        facts: [
          'Grand Couloir: a black run, left ungroomed but avalanche-controlled, reached only by the Saulire cable car',
          'Combe de la Saulire: the long red run that starts the descent to Le Praz',
          'The Méribel side links to the rest of the Trois Vallées',
        ],
        links: [
          { href: '/services/ski/', label: 'Private instructors and guides' },
          { href: '/meribel/', label: 'Méribel' },
        ],
      },
      {
        id: 'cable-car-station',
        altitude: 2077,
        eyebrow: 'Above the village',
        title: 'The Saulire cable car station',
        line: 'Wide red slopes, and the first terrace of the day.',
        text: 'Below the summit, the descent follows the Combe de la Saulire and the Verdons slopes back towards Courchevel 1850. This is where many skiers stop for lunch: Le Chalet de Pierres sits on the Verdons slope at the Jardin Alpin, a long-standing address for Savoyard cooking on a sunny terrace.',
        facts: [
          'The cable car base station sits at 2,077 m',
          'Mountain restaurants on and beside the pistes, booked ahead in the school holidays',
        ],
        links: [{ href: '/guides/where-to-eat/', label: 'Where to eat in Courchevel' }],
        photo: 'terrace',
      },
      {
        id: 'courchevel-1850',
        altitude: 1850,
        eyebrow: 'The heart of the resort',
        title: 'Courchevel 1850',
        line: 'The snow front, the ski schools and the altiport above.',
        text: 'The main lifts leave from the snow front at the Croisette, where several ski schools have their meeting points. The altiport sits just above the village, and the Jardin Alpin lift serves the chalets around it.',
        facts: [
          'Jardin Alpin lift: 8:35 am to 7:10 pm',
          'Ski school meeting points on the snow front',
        ],
        links: [
          { href: '/courchevel-1850/', label: 'Courchevel 1850' },
          { href: '/guides/courchevel-with-kids/', label: 'Courchevel with children' },
        ],
        photo: 'sculpture',
      },
      {
        id: 'courchevel-1650-moriond',
        altitude: 1650,
        eyebrow: 'Sunny and relaxed',
        title: 'Courchevel 1650 Moriond',
        line: 'Wide, gentle slopes and real village life.',
        text: 'Moriond has its own ski sector with wide slopes popular with families, linked to 1850 and the rest of the Trois Vallées by the pistes and the free shuttles.',
        facts: ['A calmer base, still connected to the whole ski area'],
        links: [{ href: '/courchevel-1650-moriond/', label: 'Courchevel 1650 Moriond' }],
        photo: 'wooden-chalets',
      },
      {
        id: 'courchevel-1550-village',
        altitude: 1550,
        eyebrow: 'Quiet and close',
        title: 'Courchevel 1550 Village',
        line: 'A gondola to 1850, and a pool for the afternoon.',
        text: 'Courchevel Village is quieter, with large family chalets and Aquamotion, the resort’s aquatic centre. The Grangettes gondola links it to 1850 in a few minutes.',
        facts: ['Grangettes gondola to 1850: 7:45 am to 11:30 pm as a village link'],
        links: [{ href: '/courchevel-1550-village/', label: 'Courchevel 1550 Village' }],
        photo: 'white-chalet',
      },
      {
        id: 'courchevel-1300-le-praz',
        altitude: 1300,
        eyebrow: 'The end of the run',
        title: 'Courchevel 1300 Le Praz',
        line: 'Forest runs, Olympic ski jumps and the gondola home.',
        text: 'The longest descent ends here, 7.9 km and 1,440 m below La Saulire. Two black runs also finish in Le Praz: Jean Blanc, a narrow forest run, and L’Éclipse, redeveloped for the 2023 Alpine World Ski Championships. The Praz gondola takes you back up to 1850.',
        facts: [
          'Jean Blanc: black, 2.4 km, 770 m of vertical, average gradient 32%',
          'L’Éclipse: black, more than 3 km, built for the 2023 World Championships speed events',
          'Praz gondola to 1850: 7:45 am to 11:30 pm as a village link',
        ],
        links: [{ href: '/courchevel-1300-le-praz/', label: 'Courchevel 1300 Le Praz' }],
        photo: 'stone-chalet',
      },
    ],
    practicalEyebrow: 'Before you ski',
    practicalTitle: 'Practical notes',
    practical: [
      { label: 'Season 2026/27', value: 'Courchevel opens on 4 December 2026 and closes on 18 April 2027. The links across the Trois Vallées open on 5 December.' },
      { label: 'Lift hours', value: 'Lifts open at 9:00 am and close at 4:30 pm in early winter, 5:00 pm from mid-February.' },
      { label: 'Children under 5', value: 'Ski for free on presentation of proof of age; bring a passport or identity card.' },
      { label: 'Snow', value: 'Snowmaking covers more than half of the Courchevel slopes.' },
      { label: 'Piste map', value: 'The official Courchevel piste map is published by Les 3 Vallées; we send it with your ski plan.' },
    ],
    arrangeEyebrow: 'Your ski days',
    arrangeTitle: 'We arrange the skiing around you',
    arrangeText: 'Lift passes ready before you arrive, skis and boots fitted at the chalet, a private instructor matched to each skier, and a certified mountain guide for the Grand Couloir or a day off the pistes. Lunch is booked on your route.',
    faqs: [
      { q: 'How big is the Courchevel ski area?', a: 'Courchevel has 150 km of marked pistes and is part of the Trois Vallées, about 600 km of linked skiing with Méribel, Les Menuires and Val Thorens.' },
      { q: 'What is the longest run in Courchevel?', a: 'The descent from the top of La Saulire, 2,740 m, to Le Praz, 1,300 m: 7.9 km and 1,440 m of vertical, graded red, by the Combe de la Saulire and the Verdons slopes.' },
      { q: 'What is the hardest run in Courchevel?', a: 'The Grand Couloir, a black run reached only by the Saulire cable car. It is left ungroomed but avalanche-controlled, and we recommend skiing it with a guide or instructor the first time.' },
      { q: 'Do young children need a lift pass in Courchevel?', a: 'Children under 5 ski for free on presentation of proof of age, collected at the ticket office. We arrange passes for the rest of the family before you arrive.' },
      { q: 'When does the Courchevel ski area open?', a: 'For the 2026/27 season, from 4 December 2026 to 18 April 2027, depending on snow conditions.' },
    ],
    sourcesNote: 'Figures from Courchevel Tourisme, the S3V lift company, Les 3 Vallées and the official Courchevel ski pass office, checked in October 2026. Lift times and dates can change during the season.',
  },
  fr: {
    title: 'Le domaine skiable de Courchevel, du sommet au village',
    shortTitle: 'Le domaine skiable',
    metaTitle: 'Domaine skiable de Courchevel : pistes et remontées | CLC',
    description: 'Skiez Courchevel de la Saulire à 2 740 m jusqu’au Praz à 1 300 m : pistes, remontées, pistes mythiques, dates de saison et vos journées de ski organisées.',
    eyebrow: 'Les pistes',
    tagline: '1 440 mètres de descente, de la Saulire au Praz.',
    scrollHint: 'Descendez la montagne',
    answer: 'Courchevel compte 150 km de pistes balisées et fait partie des Trois Vallées, environ 600 km de ski relié. Sa plus longue piste part du sommet de la Saulire, à 2 740 m, et arrive au Praz, à 1 300 m : 7,9 km et 1 440 m de dénivelé. Cette page suit cette descente, étape par étape.',
    numbers: [
      { value: '150 km', label: 'De pistes balisées à Courchevel' },
      { value: '600 km', label: 'De pistes dans les Trois Vallées' },
      { value: '1 440 m', label: 'De la Saulire au Praz' },
      { value: '7,9 km', label: 'La plus longue descente' },
    ],
    descentLabel: 'La descente de la Saulire au Praz',
    altitudeLabel: 'Altitude',
    heroPhoto: 'gondola',
    stops: [
      {
        id: 'la-saulire',
        altitude: 2740,
        eyebrow: 'Le sommet',
        title: 'La Saulire',
        line: 'Le sommet de Courchevel, où s’ouvrent les Trois Vallées.',
        text: 'Le téléphérique de la Saulire monte de 2 077 m à 2 710 m dans des cabines entièrement vitrées, reconstruit et rouvert en décembre 2024. Du sommet, les pistes redescendent vers Courchevel et, de l’autre côté, vers Méribel.',
        facts: [
          'Grand Couloir : piste noire non damée mais sécurisée, accessible uniquement par le téléphérique de la Saulire',
          'Combe de la Saulire : la longue piste rouge qui ouvre la descente vers Le Praz',
          'Le versant de Méribel rejoint le reste des Trois Vallées',
        ],
        links: [
          { href: '/services/ski/', label: 'Moniteurs privés et guides' },
          { href: '/meribel/', label: 'Méribel' },
        ],
      },
      {
        id: 'cable-car-station',
        altitude: 2077,
        eyebrow: 'Au-dessus du village',
        title: 'La gare du téléphérique de la Saulire',
        line: 'De larges pistes rouges, et la première terrasse de la journée.',
        text: 'Sous le sommet, la descente suit la Combe de la Saulire puis les pistes des Verdons vers Courchevel 1850. Beaucoup de skieurs s’arrêtent ici pour déjeuner : Le Chalet de Pierres, sur la piste des Verdons au Jardin Alpin, est une adresse de longue date pour la cuisine savoyarde, sur une terrasse ensoleillée.',
        facts: [
          'La gare de départ du téléphérique se trouve à 2 077 m',
          'Des restaurants d’altitude sur les pistes, à réserver à l’avance pendant les vacances scolaires',
        ],
        links: [{ href: '/guides/where-to-eat/', label: 'Où manger à Courchevel' }],
        photo: 'terrace',
      },
      {
        id: 'courchevel-1850',
        altitude: 1850,
        eyebrow: 'Le cœur de la station',
        title: 'Courchevel 1850',
        line: 'Le front de neige, les écoles de ski et l’altiport au-dessus.',
        text: 'Les principales remontées partent du front de neige de la Croisette, où plusieurs écoles de ski ont leurs points de rendez-vous. L’altiport domine le village, et la remontée du Jardin Alpin dessert les chalets alentour.',
        facts: [
          'Remontée du Jardin Alpin : de 8 h 35 à 19 h 10',
          'Points de rendez-vous des écoles de ski sur le front de neige',
        ],
        links: [
          { href: '/courchevel-1850/', label: 'Courchevel 1850' },
          { href: '/guides/courchevel-with-kids/', label: 'Courchevel en famille' },
        ],
        photo: 'sculpture',
      },
      {
        id: 'courchevel-1650-moriond',
        altitude: 1650,
        eyebrow: 'Ensoleillé et détendu',
        title: 'Courchevel 1650 Moriond',
        line: 'De larges pistes douces et une vraie vie de village.',
        text: 'Moriond a son propre secteur skiable, avec de larges pistes appréciées des familles, relié à 1850 et au reste des Trois Vallées par les pistes et les navettes gratuites.',
        facts: ['Une base plus calme, reliée à tout le domaine'],
        links: [{ href: '/courchevel-1650-moriond/', label: 'Courchevel 1650 Moriond' }],
        photo: 'wooden-chalets',
      },
      {
        id: 'courchevel-1550-village',
        altitude: 1550,
        eyebrow: 'Calme et proche',
        title: 'Courchevel 1550 Village',
        line: 'Une télécabine vers 1850, et une piscine pour l’après-midi.',
        text: 'Courchevel Village est plus calme, avec de grands chalets familiaux et Aquamotion, le centre aquatique de la station. La télécabine des Grangettes le relie à 1850 en quelques minutes.',
        facts: ['Télécabine des Grangettes vers 1850 : de 7 h 45 à 23 h 30 en liaison entre villages'],
        links: [{ href: '/courchevel-1550-village/', label: 'Courchevel 1550 Village' }],
        photo: 'white-chalet',
      },
      {
        id: 'courchevel-1300-le-praz',
        altitude: 1300,
        eyebrow: 'La fin de la descente',
        title: 'Courchevel 1300 Le Praz',
        line: 'Pistes en forêt, tremplins olympiques et télécabine du retour.',
        text: 'La plus longue descente se termine ici, 7,9 km et 1 440 m sous la Saulire. Deux pistes noires arrivent aussi au Praz : Jean Blanc, étroite et en forêt, et L’Éclipse, réaménagée pour les Championnats du monde de ski alpin 2023. La télécabine du Praz vous remonte à 1850.',
        facts: [
          'Jean Blanc : noire, 2,4 km, 770 m de dénivelé, pente moyenne de 32 %',
          'L’Éclipse : noire, plus de 3 km, conçue pour les épreuves de vitesse des Mondiaux 2023',
          'Télécabine du Praz vers 1850 : de 7 h 45 à 23 h 30 en liaison entre villages',
        ],
        links: [{ href: '/courchevel-1300-le-praz/', label: 'Courchevel 1300 Le Praz' }],
        photo: 'stone-chalet',
      },
    ],
    practicalEyebrow: 'Avant de skier',
    practicalTitle: 'Informations pratiques',
    practical: [
      { label: 'Saison 2026/27', value: 'Courchevel ouvre le 4 décembre 2026 et ferme le 18 avril 2027. Les liaisons des Trois Vallées ouvrent le 5 décembre.' },
      { label: 'Horaires des remontées', value: 'Ouverture à 9 h, fermeture à 16 h 30 en début d’hiver et à 17 h à partir de mi-février.' },
      { label: 'Enfants de moins de 5 ans', value: 'Forfait gratuit sur présentation d’un justificatif d’âge ; prévoyez un passeport ou une carte d’identité.' },
      { label: 'Neige', value: 'La neige de culture couvre plus de la moitié des pistes de Courchevel.' },
      { label: 'Plan des pistes', value: 'Le plan officiel des pistes de Courchevel est publié par Les 3 Vallées ; nous vous l’envoyons avec votre programme de ski.' },
    ],
    arrangeEyebrow: 'Vos journées de ski',
    arrangeTitle: 'Nous organisons le ski autour de vous',
    arrangeText: 'Forfaits prêts avant votre arrivée, skis et chaussures ajustés au chalet, un moniteur privé adapté à chaque skieur, et un guide de haute montagne diplômé pour le Grand Couloir ou une journée hors-piste. Le déjeuner est réservé sur votre itinéraire.',
    faqs: [
      { q: 'Quelle est la taille du domaine skiable de Courchevel ?', a: 'Courchevel compte 150 km de pistes balisées et fait partie des Trois Vallées, environ 600 km de ski relié avec Méribel, Les Menuires et Val Thorens.' },
      { q: 'Quelle est la plus longue piste de Courchevel ?', a: 'La descente du sommet de la Saulire, 2 740 m, jusqu’au Praz, 1 300 m : 7,9 km et 1 440 m de dénivelé, classée rouge, par la Combe de la Saulire et les pistes des Verdons.' },
      { q: 'Quelle est la piste la plus difficile de Courchevel ?', a: 'Le Grand Couloir, une piste noire accessible uniquement par le téléphérique de la Saulire. Elle n’est pas damée mais elle est sécurisée, et nous conseillons de la skier la première fois avec un guide ou un moniteur.' },
      { q: 'Les jeunes enfants ont-ils besoin d’un forfait à Courchevel ?', a: 'Les enfants de moins de 5 ans skient gratuitement sur présentation d’un justificatif d’âge, en caisse. Nous préparons les forfaits du reste de la famille avant votre arrivée.' },
      { q: 'Quand ouvre le domaine skiable de Courchevel ?', a: 'Pour la saison 2026/27, du 4 décembre 2026 au 18 avril 2027, selon l’enneigement.' },
    ],
    sourcesNote: 'Chiffres de Courchevel Tourisme, de la S3V, des 3 Vallées et du bureau officiel des forfaits de Courchevel, vérifiés en octobre 2026. Horaires et dates peuvent évoluer pendant la saison.',
  },
};
