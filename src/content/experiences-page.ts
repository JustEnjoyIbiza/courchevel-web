/**
 * /experiences/ (EN) and /fr/experiences/ (FR): copy for the Experiences page.
 * Owner's brief of 23 October 2026, used word for word except:
 *  - title and description shortened to the site's SEO limits (under 60 / 155 characters);
 *  - "breathtaking" and "inoubliable" replaced (banned clichés in content-lint);
 *  - detail-drawer copy written from facts already on the site (services/experiences,
 *    services/ski, guides/heli-skiing, guides/where-to-eat, guides/courchevel-with-kids).
 * French: to be reviewed by a native speaker.
 */
import type { Locale } from '../data/business';
import type { PhotoKey } from '../data/photos';

export interface ExperienceCard {
  id: string;
  title: string;
  short: string;
  /** Fuller copy shown in the detail drawer. */
  detail: string[];
  /** "Good to know" line in the drawer: safety, conditions, who it suits. */
  note: string;
  photo?: PhotoKey;
  alt?: string;
}

interface ExperiencesPageCopy {
  metaTitle: string;
  description: string;
  breadcrumb: string;
  hero: { eyebrow: string; h1: string; h1Sub: string; body: string; primary: string; secondary: string; alt: string };
  intro: { h2: string; text: string; note: string; detail: string };
  gridEyebrow: string;
  gridTitle: string;
  discover: string;
  close: string;
  goodToKnow: string;
  enquireAbout: string;
  experiences: ExperienceCard[];
  featured: { eyebrow: string; h2: string; text: string; cta: string; alt: string };
  trustTitle: string;
  trust: { title: string; text: string }[];
  enquiry: {
    h2: string;
    text: string;
    cta: string;
    fields: { name: string; email: string; phone: string; arrival: string; departure: string; guests: string; message: string };
    interestedIn: string;
    consent: string;
    privacy: string;
    sending: string;
    successTitle: string;
    successText: string;
    errors: Record<'required' | 'invalid' | 'range' | 'order' | 'consent' | 'unavailable' | 'captcha' | 'summary', string>;
  };
  conditions: string;
  speak: string;
}

export const experiencesPage: Record<Locale, ExperiencesPageCopy> = {
  en: {
    metaTitle: 'Luxury Experiences in Courchevel | CLC',
    description: 'Private experiences in Courchevel: personalised skiing, mountain guiding, scenic flights, Alpine dinners and family days. Arranged around you.',
    breadcrumb: 'Experiences',
    hero: {
      eyebrow: 'Courchevel, personally curated',
      h1: 'Beyond the slopes.',
      h1Sub: 'Exceptional experiences in Courchevel',
      body: 'Private experiences shaped around the way you want to spend your time in the mountains.',
      primary: 'Plan my stay',
      secondary: 'Discover experiences',
      alt: 'White wooden chalet among snow-covered pine trees in Courchevel',
    },
    intro: {
      h2: 'The mountain, your way.',
      text: 'Courchevel offers far more than exceptional skiing. From a private day with a mountain guide to a candlelit dinner above the valley, I arrange the moments that make a stay feel effortless, personal and genuinely memorable.',
      note: 'Every experience is arranged on request and subject to weather and availability.',
      detail: 'Courchevel concierge · private experiences in Courchevel',
    },
    gridEyebrow: 'Experiences',
    gridTitle: 'Nine ways to spend your days',
    discover: 'Discover',
    close: 'Close',
    goodToKnow: 'Good to know',
    enquireAbout: 'Enquire about this experience',
    experiences: [
      {
        id: 'private-skiing',
        title: 'Skiing, made personal',
        short: 'The right instructor changes everything. Private lessons designed around your level, confidence and the kind of skiing you enjoy most.',
        detail: [
          'As a luxury ski concierge in Courchevel, I match each skier with a state-certified private instructor, by the half-day, the day or for the whole stay, so the same person can follow your progress.',
          'Passes are ready before you arrive, and skis and boots are fitted at the chalet the evening before. Lunch can be booked on your route, timed around the lesson.',
        ],
        note: 'For every level, from a first week on skis to confident skiers refining their technique. Book early for Christmas, New Year and February.',
        photo: 'gondola',
        alt: 'Gondola cabin above snow-covered pine trees at dusk in Courchevel',
      },
      {
        id: 'off-piste-guiding',
        title: 'Beyond the marked runs',
        short: 'For confident skiers, explore the quieter side of the Three Valleys with an experienced mountain guide and a route chosen for the day’s conditions.',
        detail: [
          'Off-piste skiing is outside the patrolled area, so these days are led by a certified IFMGA mountain guide, who chooses the route according to the snowpack, the weather and the avalanche bulletin.',
          'Before setting out, the guide checks each person’s transceiver, shovel and probe. The plan can change, shorten or be postponed if the conditions are not right.',
        ],
        note: 'For strong, confident skiers only. Snow and conditions vary from day to day; the guide decides what is suitable on the morning.',
      },
      {
        id: 'paragliding',
        title: 'A different perspective',
        short: 'Float above the valleys on a tandem flight and see Courchevel from a perspective few people ever experience.',
        detail: [
          'A tandem flight with a state-certified pilot, taking off above the resort and landing lower down the valley.',
          'Flights depend on the wind and the light, so I hold a second slot whenever possible and arrange the transfer to the take-off point.',
        ],
        note: 'No experience needed. Flights are confirmed on the day according to the weather.',
      },
      {
        id: 'scenic-flights',
        title: 'Above the Alps',
        short: 'A private panoramic flight by helicopter or plane for a sweeping view of the Alps, from the Courchevel altiport.',
        detail: [
          'Courchevel Altiport sits just above Courchevel 1850. Scenic flights last from about 15 minutes to an hour, over the Three Valleys or towards the Mont Blanc massif, and land back at the altiport.',
          'Flights are operated by licensed aviation partners; I arrange the timing, the car to the altiport and a back-up plan if the weather closes in.',
        ],
        note: 'Flights operate in daylight and suitable weather only.',
        photo: 'helicopter',
        alt: 'Helicopter on a snowy landing area among pine trees in the Alps',
      },
      {
        id: 'groomer-dinner',
        title: 'Dinner above the valley',
        short: 'After the lifts close, travel into the mountains by snow groomer for a private Alpine dinner beneath the stars.',
        detail: [
          'Some mountain restaurants open for dinner on certain evenings, with access by snow groomer once the slopes have closed. I check which ones are open for your dates and arrange the journey up and back.',
          'Dietary requirements, a birthday cake or a particular bottle are passed on in advance, so the evening runs without you having to ask.',
        ],
        note: 'Available on selected evenings only, subject to the restaurant’s opening and the conditions on the mountain.',
        photo: 'lantern',
        alt: 'Lantern glowing in falling snow on a winter evening',
      },
      {
        id: 'dog-sledding',
        title: 'Through the silent forest',
        short: 'A peaceful journey behind a team of huskies, through snow-covered forest and open mountain scenery.',
        detail: [
          'Sit back as a passenger, or learn to drive your own team with a musher beside you. Rides follow forest trails, by day or at dusk.',
          'I work with local mushers, check each provider’s minimum age before booking and arrange the transfer from your chalet.',
        ],
        note: 'Suitable for most ages as passengers; driving a team suits older children and adults.',
      },
      {
        id: 'mountain-evenings',
        title: 'The mountain after dark',
        short: 'Snowmobiles, a hidden chalet, a private Savoyard dinner and the warmth of a mountain evening shared with the people you love.',
        detail: [
          'Once the slopes have closed and the light is fading, a guided snowmobile outing leads to a mountain chalet for a Savoyard dinner, then back down to the village.',
          'For a quieter evening, the same warmth can come to you: a private chef cooks at your chalet while the fire is lit.',
        ],
        note: 'Snowmobile outings run after the lifts close and depend on the conditions on the mountain.',
        photo: 'stone-chalet',
        alt: 'Stone and wood chalet in fresh snow in Courchevel',
      },
      {
        id: 'wellness',
        title: 'Time to slow down',
        short: 'Private treatments, restorative spa time and carefully planned moments of calm after a day in the mountains.',
        detail: [
          'A massage therapist comes to your chalet with a table, oils and fresh linen: relaxing, deep-tissue and sports recovery, couples’ treatments or the whole group one after another.',
          'If you prefer to go out, I book time in the spas of the palace hotels or at Aquamotion, with a car from the slopes.',
        ],
        note: 'Tell me about injuries, pregnancy or medical conditions in advance, so the right practitioner is chosen.',
        photo: 'hot-tub',
        alt: 'Steaming outdoor hot tub on a chalet terrace facing snow-covered pine trees in Courchevel',
      },
      {
        id: 'family-days',
        title: 'For every generation',
        short: 'Thoughtful days for families—from children’s skiing and sledging to gentle snowshoe walks and experiences everyone can enjoy together.',
        detail: [
          'Ski school starts from 18 months in nursery groups and from 3 years in the snow gardens; a nanny can collect the youngest at lunchtime.',
          'Afternoons can be sledging, an hour at the Forum ice rink, a swim at Aquamotion or a short snowshoe walk in the forest, planned around naps and appetites.',
        ],
        note: 'Children under 5 ski on a free lift pass with proof of age. Book ski school early for the school holidays.',
        photo: 'wooden-chalets',
        alt: 'Wooden chalets with balconies and a gondola passing above in Courchevel',
      },
    ],
    featured: {
      eyebrow: 'The art of a well-planned stay',
      h2: 'Nothing needs to feel complicated.',
      text: 'Tell me how you would like your days to feel—slow and restorative, adventurous and active, or a little of both. I will shape the details around you, from the first morning on the slopes to the last dinner of your stay.',
      cta: 'Start planning',
      alt: 'Sunny terrace of a mountain restaurant above the slopes in Courchevel',
    },
    trustTitle: 'How I work',
    trust: [
      { title: 'Personal, not packaged', text: 'Every stay is shaped around your people, your pace and your preferences.' },
      { title: 'Local knowledge', text: 'Thoughtful recommendations and trusted partners across Courchevel and the Three Valleys.' },
      { title: 'Carefully arranged', text: 'Clear communication, considered details and discreet support throughout your stay.' },
    ],
    enquiry: {
      h2: 'Begin with a conversation.',
      text: 'Share your dates, the people travelling with you and the kind of time you would like to have in Courchevel. I will come back to you with considered ideas.',
      cta: 'Plan my stay',
      fields: {
        name: 'Full name',
        email: 'Email address',
        phone: 'Phone or WhatsApp',
        arrival: 'Arrival date',
        departure: 'Departure date',
        guests: 'Number of guests',
        message: 'What would make this stay special?',
      },
      interestedIn: 'Experience',
      consent: 'I agree that my details are used to reply to this enquiry.',
      privacy: 'Your details are used only to reply to your enquiry.',
      sending: 'Sending…',
      successTitle: 'Thank you.',
      successText: 'Your enquiry has arrived. I will reply personally, within 15 minutes between 8:00 and 22:00.',
      errors: {
        required: 'Please fill in this field.',
        invalid: 'Please check this field.',
        range: 'Please choose a date from today onwards.',
        order: 'The departure date must be after the arrival date.',
        consent: 'Please confirm so that I can reply.',
        unavailable: 'Your enquiry could not be sent just now. Please message us on WhatsApp; we reply within minutes.',
        captcha: 'The security check did not complete. Please try again.',
        summary: 'Please check the highlighted fields.',
      },
    },
    conditions: 'All experiences are arranged on request and subject to weather, operational conditions and availability.',
    speak: 'Speak with us',
  },
  fr: {
    metaTitle: 'Expériences de luxe à Courchevel | CLC',
    description: 'Expériences privées à Courchevel : ski personnalisé, guide de montagne, vols panoramiques, dîners alpins et journées en famille. Pensées pour vous.',
    breadcrumb: 'Expériences',
    hero: {
      eyebrow: 'Courchevel, pensé pour vous',
      h1: 'Au-delà des pistes.',
      h1Sub: 'Expériences d’exception à Courchevel',
      body: 'Des expériences privées pensées autour de votre façon de vivre la montagne.',
      primary: 'Créer mon séjour',
      secondary: 'Découvrir les expériences',
      alt: 'Chalet en bois blanc entouré de sapins enneigés à Courchevel',
    },
    intro: {
      h2: 'La montagne, à votre façon.',
      text: 'Courchevel offre bien plus qu’un ski d’exception. D’une journée privée avec un guide de montagne à un dîner à la lueur des bougies au-dessus de la vallée, j’organise les moments qui rendent chaque séjour simple, personnel et vraiment mémorable.',
      note: 'Chaque expérience est organisée sur demande, selon les conditions météorologiques et les disponibilités.',
      detail: 'Conciergerie de luxe à Courchevel · expériences privées à Courchevel',
    },
    gridEyebrow: 'Expériences',
    gridTitle: 'Neuf façons de vivre vos journées',
    discover: 'Découvrir',
    close: 'Fermer',
    goodToKnow: 'Bon à savoir',
    enquireAbout: 'Demander cette expérience',
    experiences: [
      {
        id: 'private-skiing',
        title: 'Le ski, à votre rythme',
        short: 'Le bon moniteur change tout. Des cours privés adaptés à votre niveau, votre confiance et votre façon de skier.',
        detail: [
          'Je trouve pour chaque skieur un moniteur privé diplômé d’État, à la demi-journée, à la journée ou pour tout le séjour, afin que la même personne suive vos progrès.',
          'Les forfaits sont prêts avant votre arrivée, skis et chaussures ajustés au chalet la veille. Le déjeuner peut être réservé sur votre itinéraire, calé sur le cours.',
        ],
        note: 'Pour tous les niveaux, de la première semaine à ski aux skieurs confirmés qui affinent leur technique. Réservez tôt pour Noël, le Nouvel An et février.',
        photo: 'gondola',
        alt: 'Télécabine au-dessus des sapins enneigés de Courchevel, à la tombée du jour',
      },
      {
        id: 'off-piste-guiding',
        title: 'Au-delà des pistes balisées',
        short: 'Pour les skieurs confirmés, découvrez le versant plus sauvage des Trois Vallées avec un guide de montagne expérimenté et un itinéraire adapté aux conditions du jour.',
        detail: [
          'Le hors-piste se pratique en dehors du domaine sécurisé : ces journées sont encadrées par un guide de haute montagne diplômé (UIAGM), qui choisit l’itinéraire selon le manteau neigeux, la météo et le bulletin d’avalanche.',
          'Avant le départ, le guide vérifie le DVA, la pelle et la sonde de chacun. Le programme peut changer, être raccourci ou reporté si les conditions ne s’y prêtent pas.',
        ],
        note: 'Réservé aux skieurs confirmés et à l’aise. La neige et les conditions varient chaque jour ; le guide décide le matin même de ce qui est adapté.',
      },
      {
        id: 'paragliding',
        title: 'Une autre perspective',
        short: 'Survolez les vallées en parapente biplace et découvrez Courchevel sous un angle rare et spectaculaire.',
        detail: [
          'Un vol biplace avec un pilote diplômé d’État, au départ des hauteurs de la station, avec un atterrissage plus bas dans la vallée.',
          'Les vols dépendent du vent et de la lumière : je réserve un second créneau dès que possible et organise le transfert jusqu’au décollage.',
        ],
        note: 'Aucune expérience nécessaire. Les vols sont confirmés le jour même selon la météo.',
      },
      {
        id: 'scenic-flights',
        title: 'Au-dessus des Alpes',
        short: 'Un vol panoramique privé en hélicoptère ou en avion pour admirer les Alpes depuis les airs, au départ de l’altiport de Courchevel.',
        detail: [
          'L’altiport de Courchevel domine Courchevel 1850. Les vols panoramiques durent d’environ 15 minutes à une heure, au-dessus des Trois Vallées ou vers le massif du Mont-Blanc, avec retour à l’altiport.',
          'Les vols sont assurés par des partenaires aériens agréés ; j’organise l’horaire, la voiture jusqu’à l’altiport et une solution de repli si la météo se dégrade.',
        ],
        note: 'Vols uniquement de jour et par météo favorable.',
        photo: 'helicopter',
        alt: 'Hélicoptère se posant sur une hélisurface enneigée entourée de sapins dans les Alpes',
      },
      {
        id: 'groomer-dinner',
        title: 'Dîner au-dessus de la vallée',
        short: 'Après la fermeture des pistes, partez en dameuse vers la montagne pour un dîner alpin privé sous les étoiles.',
        detail: [
          'Certains restaurants d’altitude ouvrent le soir, accessibles en dameuse une fois les pistes fermées. Je vérifie lesquels sont ouverts à vos dates et organise la montée comme la descente.',
          'Régimes alimentaires, gâteau d’anniversaire ou bouteille particulière sont transmis à l’avance : la soirée se déroule sans que vous ayez à demander.',
        ],
        note: 'Certains soirs seulement, selon l’ouverture du restaurant et les conditions en montagne.',
        photo: 'lantern',
        alt: 'Lanterne allumée sous la neige un soir d’hiver',
      },
      {
        id: 'dog-sledding',
        title: 'À travers la forêt silencieuse',
        short: 'Une parenthèse paisible derrière un attelage de huskies, entre forêt enneigée et paysages de montagne.',
        detail: [
          'Installez-vous en passager, ou apprenez à conduire votre propre attelage aux côtés d’un musher. Les balades suivent des sentiers forestiers, de jour ou à la tombée de la nuit.',
          'Je travaille avec des mushers locaux, vérifie l’âge minimum de chaque prestataire avant de réserver et organise le transfert depuis votre chalet.',
        ],
        note: 'Accessible à la plupart des âges en passager ; la conduite d’un attelage convient aux grands enfants et aux adultes.',
      },
      {
        id: 'mountain-evenings',
        title: 'La montagne après la tombée de la nuit',
        short: 'Motoneige, chalet caché, dîner savoyard privé et la chaleur d’une soirée en montagne à partager avec ceux que vous aimez.',
        detail: [
          'Une fois les pistes fermées et la lumière déclinante, une sortie guidée en motoneige mène à un chalet d’altitude pour un dîner savoyard, avant le retour au village.',
          'Pour une soirée plus calme, la même chaleur peut venir à vous : un chef cuisine à votre chalet, au coin du feu.',
        ],
        note: 'Les sorties en motoneige ont lieu après la fermeture des remontées, selon les conditions en montagne.',
        photo: 'stone-chalet',
        alt: 'Chalet en pierre et bois sous la neige fraîche à Courchevel',
      },
      {
        id: 'wellness',
        title: 'Le temps de ralentir',
        short: 'Soins privés, moments de spa et parenthèses de détente soigneusement organisées après une journée en montagne.',
        detail: [
          'Un masseur vient à votre chalet avec table, huiles et linge frais : massage relaxant, profond ou de récupération, soins en duo ou pour tout le groupe, les uns après les autres.',
          'Si vous préférez sortir, je réserve vos soins dans les spas des palaces ou à Aquamotion, avec une voiture depuis les pistes.',
        ],
        note: 'Signalez-moi à l’avance blessures, grossesse ou problèmes de santé, afin de choisir le bon praticien.',
        photo: 'hot-tub',
        alt: 'Bain nordique fumant sur la terrasse d’un chalet face aux sapins enneigés à Courchevel',
      },
      {
        id: 'family-days',
        title: 'Pour tous les âges',
        short: 'Des journées pensées pour les familles : ski pour les enfants, luge, balades en raquettes et expériences à partager ensemble.',
        detail: [
          'L’école de ski accueille les enfants dès 18 mois en groupes d’éveil et dès 3 ans dans les jardins des neiges ; une nounou peut récupérer les plus petits à midi.',
          'L’après-midi : luge, une heure à la patinoire du Forum, une baignade à Aquamotion ou une courte balade en raquettes en forêt, au rythme des siestes et des envies.',
        ],
        note: 'Les moins de 5 ans skient avec un forfait gratuit sur justificatif d’âge. Réservez l’école de ski tôt pour les vacances scolaires.',
        photo: 'wooden-chalets',
        alt: 'Chalets en bois avec balcons et une télécabine au-dessus, à Courchevel',
      },
    ],
    featured: {
      eyebrow: 'L’art d’un séjour bien pensé',
      h2: 'Rien ne devrait être compliqué.',
      text: 'Dites-moi comment vous souhaitez vivre vos journées : douces et reposantes, sportives et aventureuses, ou un peu des deux. Je m’occupe de chaque détail, de votre première matinée sur les pistes à votre dernier dîner.',
      cta: 'Commencer à organiser mon séjour',
      alt: 'Terrasse ensoleillée d’un restaurant d’altitude au-dessus des pistes de Courchevel',
    },
    trustTitle: 'Ma façon de travailler',
    trust: [
      { title: 'Personnel, jamais standardisé', text: 'Chaque séjour s’adapte à vos envies, votre rythme et vos proches.' },
      { title: 'Une connaissance locale', text: 'Des recommandations choisies avec soin et des partenaires de confiance à Courchevel et dans les Trois Vallées.' },
      { title: 'Organisé avec attention', text: 'Une communication claire, des détails maîtrisés et une présence discrète tout au long du séjour.' },
    ],
    enquiry: {
      h2: 'Tout commence par une conversation.',
      text: 'Partagez vos dates, les personnes qui voyagent avec vous et la façon dont vous souhaitez vivre Courchevel. Je reviendrai vers vous avec des idées soigneusement sélectionnées.',
      cta: 'Créer mon séjour',
      fields: {
        name: 'Nom complet',
        email: 'Adresse e-mail',
        phone: 'Téléphone ou WhatsApp',
        arrival: 'Date d’arrivée',
        departure: 'Date de départ',
        guests: 'Nombre de voyageurs',
        message: 'Qu’est-ce qui rendrait ce séjour spécial ?',
      },
      interestedIn: 'Expérience',
      consent: 'J’accepte que mes informations soient utilisées pour répondre à cette demande.',
      privacy: 'Vos informations sont utilisées uniquement pour répondre à votre demande.',
      sending: 'Envoi…',
      successTitle: 'Merci.',
      successText: 'Votre demande est bien arrivée. Je vous réponds personnellement, sous 15 minutes entre 8 h et 22 h.',
      errors: {
        required: 'Merci de remplir ce champ.',
        invalid: 'Merci de vérifier ce champ.',
        range: 'Merci de choisir une date à partir d’aujourd’hui.',
        order: 'La date de départ doit suivre la date d’arrivée.',
        consent: 'Merci de confirmer pour que je puisse vous répondre.',
        unavailable: 'Votre demande n’a pas pu être envoyée pour le moment. Écrivez-nous sur WhatsApp, nous répondons en quelques minutes.',
        captcha: 'La vérification de sécurité n’a pas abouti. Merci de réessayer.',
        summary: 'Merci de vérifier les champs signalés.',
      },
    },
    conditions: 'Toutes les expériences sont organisées sur demande, selon la météo, les conditions d’exploitation et les disponibilités.',
    speak: 'Nous contacter',
  },
};
