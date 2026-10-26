/**
 * Nightlife and après-ski (/services/nightlife/): après-ski tables, nightclub tables and a
 * party in the chalet as cards (each opens the VIP table request with the choice filled in;
 * every venue confirms subject to availability), the steps and what we arrange around the
 * night. French: to be reviewed by a native speaker.
 */
import type { Offer } from '../../lib/offers';

export default {
  request: 'vip',
  en: {
    cards: {
      eyebrow: 'Nightlife and après-ski',
      title: 'Choose your evening',
      note: 'Christmas, New Year’s Eve and the February holidays are the peak nights: ask as early as possible.',
      request: 'Request this',
      items: [
        { name: 'Après-ski table', line: 'A table on the slopes or at the foot of the pistes as the lifts close, so you arrive straight from the last run.' },
        { name: 'Nightclub table', line: 'A VIP table and guest-list places in Courchevel 1850, requested for your group and time; each venue confirms subject to availability.' },
        { name: 'A party in your chalet', line: 'DJ, bartenders, a private chef and decoration, then the clean-up the next morning; house rules checked with the owner first.', item: 'Private party in our chalet' },
      ],
    },
    steps: {
      title: 'How it works',
      items: [
        { name: 'Your night', text: 'The date, your group and the kind of evening you have in mind.' },
        { name: 'Tables requested for you', text: 'Après-ski, dinner and club, each confirmed by the venue, subject to availability.' },
        { name: 'A driver waiting', text: 'From dinner to the club and back to the chalet, wherever you are staying.' },
      ],
    },
    extras: {
      title: 'Around the night',
      items: [
        { name: 'Dinner first', text: 'A table at an hour that leaves time to get ready after skiing.' },
        { name: 'A driver for the evening', text: 'With room for coats and for guests who join later.' },
        { name: 'An evening babysitter', text: 'At the chalet, so parents can go out without watching the clock.' },
        { name: 'The next morning', text: 'Breakfast at the chalet, and ski lessons moved if needed.' },
      ],
    },
  },
  fr: {
    cards: {
      eyebrow: 'Soirées et après-ski',
      title: 'Choisissez votre soirée',
      note: 'Noël, le réveillon du Nouvel An et les vacances de février sont les soirées les plus demandées : demandez le plus tôt possible.',
      request: 'Demander',
      items: [
        { name: 'Table d’après-ski', line: 'Une table sur les pistes ou au pied des pistes à la fermeture des remontées : vous arrivez directement de la dernière descente.' },
        { name: 'Table en club', line: 'Une table VIP et des places sur liste d’invités à Courchevel 1850, demandées pour votre groupe et l’heure choisie ; chaque établissement confirme selon disponibilité.' },
        { name: 'Une soirée au chalet', line: 'DJ, barmen, chef privé et décoration, puis le rangement le lendemain matin ; règlement du chalet vérifié avec le propriétaire.', item: 'Soirée privée dans notre chalet' },
      ],
    },
    steps: {
      title: 'Comment ça se passe',
      items: [
        { name: 'Votre soirée', text: 'La date, votre groupe et l’ambiance souhaitée.' },
        { name: 'Des tables demandées pour vous', text: 'Après-ski, dîner et club, chacun confirmé par l’établissement, selon disponibilité.' },
        { name: 'Un chauffeur qui attend', text: 'Du dîner au club, puis le retour au chalet, où que vous logiez.' },
      ],
    },
    extras: {
      title: 'Autour de la soirée',
      items: [
        { name: 'Le dîner avant', text: 'Une table à une heure qui laisse le temps de se préparer après le ski.' },
        { name: 'Un chauffeur pour la soirée', text: 'Avec de la place pour les manteaux et les invités qui vous rejoignent.' },
        { name: 'Une baby-sitter le soir', text: 'Au chalet, pour sortir sans regarder l’heure.' },
        { name: 'Le lendemain matin', text: 'Petit-déjeuner au chalet, et cours de ski décalés si besoin.' },
      ],
    },
  },
} satisfies Offer;
