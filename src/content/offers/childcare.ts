/**
 * Family and childcare (/services/childcare/): a nanny for the stay and evening babysitting
 * (open the nanny request with the type of care filled in), and ski lessons for children
 * (open the instructor request). Facts as on the page: group lessons usually from 3, the
 * Village des Enfants nursery in 1850 from 18 months. French: to be reviewed by a native speaker.
 */
import type { Offer } from '../../lib/offers';

export default {
  request: 'nanny',
  en: {
    cards: {
      eyebrow: 'Family and childcare',
      title: 'Choose the care your children need',
      note: 'Christmas, February and Easter: nannies and children’s ski lessons fill early, so book several weeks ahead.',
      request: 'Request this',
      items: [
        { name: 'A nanny for the stay', line: 'Full days while you ski, mornings only or evenings, with identity, references and experience checked.' },
        { name: 'Evening babysitting', line: 'A babysitter who arrives before you leave, follows your bedtime routine and stays until you return.' },
        { name: 'Ski lessons for children', line: 'Group lessons usually from 3 years old, or private lessons for shy beginners and siblings of different ages.', request: 'instructor' },
      ],
    },
    steps: {
      title: 'How it works',
      items: [
        { name: 'Your children', text: 'Ages, routines, naps, meals, allergies and the languages spoken at home.' },
        { name: 'A proposal within 24 hours', text: 'A nanny whose experience fits your children; meet or speak before the first day if you wish.' },
        { name: 'On call all stay', text: 'An extra evening, a lesson moved, or a doctor if a child is unwell: one message is enough.' },
      ],
    },
    extras: {
      title: 'Ready on arrival',
      items: [
        { name: 'Baby equipment', text: 'Cots, high chairs, baby baths, stair gates and buggies suited to snow.' },
        { name: 'Car seats', text: 'Fitted for your transfer from the airport.' },
        { name: 'Activities off the slopes', text: 'Ice skating, the Aquamotion aquatic centre, sledging and snowshoe walks.' },
        { name: 'Drop-off and collection', text: 'Between the chalet, ski school and activities.' },
      ],
    },
  },
  fr: {
    cards: {
      eyebrow: 'Famille et enfants',
      title: 'Choisissez la garde qui convient',
      note: 'Noël, février et Pâques : nounous et cours de ski pour enfants se remplissent vite, réservez plusieurs semaines à l’avance.',
      request: 'Demander',
      items: [
        { name: 'Une nounou pour le séjour', line: 'Journées entières pendant que vous skiez, matinées seulement ou soirées, avec identité, références et expérience vérifiées.' },
        { name: 'Baby-sitting le soir', line: 'Une baby-sitter qui arrive avant votre départ, respecte le rituel du coucher et reste jusqu’à votre retour.' },
        { name: 'Cours de ski pour enfants', line: 'Cours collectifs généralement dès 3 ans, ou cours particuliers pour les débutants timides et les fratries d’âges différents.', request: 'instructor' },
      ],
    },
    steps: {
      title: 'Comment ça se passe',
      items: [
        { name: 'Vos enfants', text: 'Âges, habitudes, siestes, repas, allergies et langues parlées à la maison.' },
        { name: 'Une proposition sous 24 heures', text: 'Une nounou dont l’expérience correspond à vos enfants ; rencontrez-la ou parlez-lui avant le premier jour si vous le souhaitez.' },
        { name: 'Joignables tout le séjour', text: 'Une soirée en plus, un cours déplacé, ou un médecin si un enfant est souffrant : un message suffit.' },
      ],
    },
    extras: {
      title: 'Prêt à votre arrivée',
      items: [
        { name: 'Le matériel bébé', text: 'Lits bébé, chaises hautes, baignoires, barrières d’escalier et poussettes adaptées à la neige.' },
        { name: 'Les sièges auto', text: 'Installés pour votre transfert depuis l’aéroport.' },
        { name: 'Les activités hors des pistes', text: 'Patinoire, centre aquatique Aquamotion, luge et balades en raquettes.' },
        { name: 'L’accompagnement', text: 'Entre le chalet, l’école de ski et les activités.' },
      ],
    },
  },
} satisfies Offer;
