/**
 * Wellness and beauty (/services/wellness/): a massage in the chalet, a treatment in a hotel
 * spa, and hair and make-up before an evening, each opening the treatment request with the
 * choice filled in. Facts as on the page: same-day massage often possible in January and March,
 * trainers with the French professional card. French: to be reviewed by a native speaker.
 */
import type { Offer } from '../../lib/offers';

export default {
  request: 'treatment',
  en: {
    cards: {
      eyebrow: 'Wellness and beauty',
      title: 'Choose your treatment',
      note: 'Christmas, New Year and February: therapists and spa times go quickly, so send your preferred days early.',
      request: 'Request this',
      items: [
        { name: 'Massage in your chalet', line: 'A therapist with a table, oils and fresh linen: relaxing, deep-tissue or sports recovery, often after the lifts close.', item: 'Massage in our chalet' },
        { name: 'A hotel spa', line: 'A treatment, hammam time or a day package in a Courchevel hotel spa, with a transfer straight from the slopes.', item: 'Treatment in a hotel spa' },
        { name: 'Hair and make-up', line: 'Hairdressers and make-up artists at the chalet before a dinner or New Year’s Eve, with a timetable so everyone is ready on time.' },
      ],
    },
    steps: {
      title: 'How it works',
      items: [
        { name: 'What and when', text: 'The treatment, how many people, the time that suits your ski day, and any injury, pregnancy or medical condition.' },
        { name: 'A proposal within 24 hours', text: 'A therapist, trainer or stylist matched to your request. In January and March, a massage the same day is often possible.' },
        { name: 'Around your days', text: 'Sessions fit between ski lessons, meals and transfers. To move one or book the same therapist again, one message is enough.' },
      ],
    },
    extras: {
      title: 'Also arranged',
      items: [
        { name: 'Couples and groups', text: 'Two therapists side by side, or two or three for a group, so nobody waits until late evening.' },
        { name: 'Personal training', text: 'In the chalet gym or outdoors, with coaches who hold the French professional card.' },
        { name: 'Private yoga and Pilates', text: 'In the morning before the lifts open, or at sunset.' },
        { name: 'Manicure and pedicure', text: 'At the chalet, before an evening out or on a rest day.' },
      ],
    },
  },
  fr: {
    cards: {
      eyebrow: 'Bien-être et beauté',
      title: 'Choisissez votre soin',
      note: 'Noël, Nouvel An et février : praticiens et créneaux de spa partent vite, envoyez vos jours préférés le plus tôt possible.',
      request: 'Demander',
      items: [
        { name: 'Massage au chalet', line: 'Un praticien avec table, huiles et linge propre : massage relaxant, profond ou récupération sportive, souvent après la fermeture des pistes.' },
        { name: 'Un spa d’hôtel', line: 'Un soin, un moment au hammam ou une formule à la journée dans le spa d’un hôtel de Courchevel, avec le transfert depuis les pistes.', item: 'Soin dans un spa d’hôtel' },
        { name: 'Coiffure et maquillage', line: 'Coiffeurs et maquilleurs au chalet avant un dîner ou le réveillon du Nouvel An, avec un planning pour que chacun soit prêt à l’heure.' },
      ],
    },
    steps: {
      title: 'Comment ça se passe',
      items: [
        { name: 'Quoi et quand', text: 'Le soin, le nombre de personnes, l’heure qui convient à votre journée de ski, et toute blessure, grossesse ou problème de santé.' },
        { name: 'Une proposition sous 24 heures', text: 'Un praticien, un coach ou un coiffeur choisi selon votre demande. En janvier et en mars, un massage le jour même est souvent possible.' },
        { name: 'Au rythme de vos journées', text: 'Les séances s’organisent entre cours de ski, repas et transferts. Pour en déplacer une ou retrouver le même praticien, un message suffit.' },
      ],
    },
    extras: {
      title: 'Également organisé',
      items: [
        { name: 'En duo ou en groupe', text: 'Deux praticiens côte à côte, ou deux ou trois pour un groupe, afin que personne n’attende la fin de soirée.' },
        { name: 'Coaching sportif', text: 'Dans la salle de sport du chalet ou en extérieur, avec des coachs titulaires de la carte professionnelle.' },
        { name: 'Yoga et Pilates en privé', text: 'Le matin avant l’ouverture des pistes, ou au coucher du soleil.' },
        { name: 'Manucure et pédicure', text: 'Au chalet, avant une soirée ou un jour sans ski.' },
      ],
    },
  },
} satisfies Offer;
