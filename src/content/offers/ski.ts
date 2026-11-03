/**
 * Private ski and mountain (/services/ski/): private lessons, off-piste with a guide,
 * and a heli-skiing day (Italy or Switzerland only: heli-drops are banned in France;
 * it opens the experience request, like the heli-skiing guide). Then the steps and
 * what we prepare before the first run. French: to be reviewed by a native speaker.
 */
import type { Offer } from '../../lib/offers';

export default {
  request: 'instructor',
  en: {
    cards: {
      eyebrow: 'Private ski and mountain',
      title: 'Choose your day on the mountain',
      note: 'Christmas, New Year and February: the most requested instructors are booked weeks ahead, so ask as soon as your dates are fixed.',
      request: 'Request this',
      items: [
        { name: 'Private lessons', line: 'A state-certified instructor for skiing or snowboarding, by the half-day, day or week, for adults and children.' },
        { name: 'Off-piste with a guide', line: 'A high-mountain guide who reads the snowpack, chooses the route and brings the safety equipment.' },
        {
          name: 'A heli-skiing day',
          line: 'Heli-drops are banned in France, so the day takes you to Italy or Switzerland with a certified guide.',
          request: 'experience',
          item: 'Heli-skiing day trip to Italy or Switzerland',
        },
      ],
    },
    steps: {
      title: 'How it works',
      items: [
        { name: 'Your skiers', text: 'Ages, levels, languages and what each person would like from the week.' },
        { name: 'Instructors within 24 hours', text: 'We match each skier, or each level, with a certified instructor or guide.' },
        { name: 'Ready on the first morning', text: 'Passes and equipment are waiting at the chalet before your first lesson.' },
      ],
    },
    extras: {
      title: 'Before the first run',
      items: [
        { name: 'Ski passes', text: 'Courchevel or the whole Trois Vallées, ready at the chalet.' },
        { name: 'Equipment', text: 'Skis, boots and helmets delivered in your sizes.' },
        { name: 'Boot fitting', text: 'At the chalet or with a specialist.' },
        { name: 'Lunch on the slopes', text: 'Tables at mountain restaurants you can ski to, timed around your lesson.' },
      ],
    },
  },
  fr: {
    cards: {
      eyebrow: 'Ski privé et montagne',
      title: 'Choisissez votre journée en montagne',
      note: 'Noël, Nouvel An et février : les moniteurs les plus demandés sont réservés des semaines à l’avance, demandez dès que vos dates sont fixées.',
      request: 'Demander',
      items: [
        { name: 'Cours privés', line: 'Un moniteur diplômé d’État, à ski ou en snowboard, à la demi-journée, à la journée ou à la semaine, pour adultes et enfants.' },
        { name: 'Hors-piste avec un guide', line: 'Un guide de haute montagne qui lit le manteau neigeux, choisit l’itinéraire et apporte le matériel de sécurité.' },
        {
          name: 'Une journée d’héliski',
          line: 'La dépose en hélicoptère est interdite en France : la journée se passe en Italie ou en Suisse, avec un guide diplômé.',
          request: 'experience',
          item: 'Journée d’héliski en Italie ou en Suisse',
        },
      ],
    },
    steps: {
      title: 'Comment ça se passe',
      items: [
        { name: 'Vos skieurs', text: 'Âges, niveaux, langues et envies de chacun pour la semaine.' },
        { name: 'Des moniteurs sous 24 heures', text: 'Nous associons chaque skieur, ou chaque niveau, à un moniteur ou un guide diplômé.' },
        { name: 'Prêts dès le premier matin', text: 'Forfaits et matériel vous attendent au chalet avant le premier cours.' },
      ],
    },
    extras: {
      title: 'Avant la première descente',
      items: [
        { name: 'Les forfaits', text: 'Courchevel ou toutes les Trois Vallées, prêts au chalet.' },
        { name: 'Le matériel', text: 'Skis, chaussures et casques livrés à vos tailles.' },
        { name: 'Le réglage des chaussures', text: 'Au chalet ou chez un spécialiste.' },
        { name: 'Le déjeuner sur les pistes', text: 'Des tables dans les restaurants d’altitude accessibles à ski, calées sur votre cours.' },
      ],
    },
  },
} satisfies Offer;
