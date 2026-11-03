/**
 * Mountain experiences (/services/experiences/): snowmobiling, dog sledding and flights
 * as cards (each opens the experience request with the activity filled in), the steps,
 * and the other activities. Facts as on the page (700 m circuit, Val Thorens ice circuit
 * about 800 m at about 2,200 m, Forum ice rink). French: to be reviewed by a native speaker.
 */
import type { Offer } from '../../lib/offers';

export default {
  request: 'experience',
  en: {
    cards: {
      eyebrow: 'Mountain experiences',
      title: 'Choose your time off skis',
      note: 'Flights depend on wind and visibility: we check the forecast the evening before and keep a back-up plan.',
      request: 'Request this',
      items: [
        { name: 'Snowmobiling', line: 'A guided outing on the ski area once the slopes have closed, or first rides on a secure 700 m circuit.' },
        { name: 'Dog sledding', line: 'Sit back as a passenger, or drive your own team with a musher beside you, on forest trails by day or at dusk.' },
        { name: 'In the air', line: 'Tandem paragliding with a state-certified pilot, a scenic helicopter flight or a hot-air balloon, when the wind allows.', item: 'Paragliding or a scenic flight' },
      ],
    },
    steps: {
      title: 'How it works',
      items: [
        { name: 'Who is coming', text: 'Ages, experience and what appeals to each person.' },
        { name: 'A programme within 24 hours', text: 'Each activity at the time of day that suits it, around your ski days.' },
        { name: 'Changed in time', text: 'If the weather closes a flight, it becomes another activity the same day.' },
      ],
    },
    extras: {
      title: 'Also on the list',
      items: [
        { name: 'Ice driving', text: 'On the Val Thorens circuit, around 800 m long at 2,200 m, with an instructor.' },
        { name: 'Ski-joëring and horse riding', text: 'Towed on skis by a horse, or guided rides on winter trails.' },
        { name: 'Snowshoe walks', text: 'Quiet guided walks through the forest.' },
        { name: 'For families', text: 'Floodlit sledging from 1850 to 1550, and the Forum ice rink in 1850.' },
      ],
    },
  },
  fr: {
    cards: {
      eyebrow: 'Expériences en montagne',
      title: 'Choisissez votre moment hors des pistes',
      note: 'Les vols dépendent du vent et de la visibilité : nous consultons la météo la veille au soir et prévoyons une alternative.',
      request: 'Demander',
      items: [
        { name: 'Motoneige', line: 'Une sortie encadrée sur le domaine une fois les pistes fermées, ou une initiation sur un circuit sécurisé de 700 m.' },
        { name: 'Chiens de traîneau', line: 'En passager, ou aux commandes de votre attelage avec un musher à vos côtés, sur des sentiers en forêt, de jour ou à la tombée du jour.' },
        { name: 'Dans les airs', line: 'Parapente biplace avec un moniteur diplômé d’État, survol en hélicoptère ou montgolfière, quand le vent le permet.', item: 'Parapente ou survol' },
      ],
    },
    steps: {
      title: 'Comment ça se passe',
      items: [
        { name: 'Qui vous accompagne', text: 'Les âges, l’expérience et les envies de chacun.' },
        { name: 'Un programme sous 24 heures', text: 'Chaque activité au bon moment de la journée, autour de vos journées de ski.' },
        { name: 'Adapté à temps', text: 'Si la météo annule un vol, il devient une autre activité le jour même.' },
      ],
    },
    extras: {
      title: 'Aussi au programme',
      items: [
        { name: 'La conduite sur glace', text: 'Sur le circuit de Val Thorens, environ 800 m à 2 200 m d’altitude, avec un instructeur.' },
        { name: 'Ski joëring et balades à cheval', text: 'À skis, tracté par un cheval, ou en balade accompagnée sur les sentiers d’hiver.' },
        { name: 'Les raquettes', text: 'Des balades accompagnées et paisibles en forêt.' },
        { name: 'En famille', text: 'La piste de luge éclairée de 1850 à 1550, et la patinoire du Forum à 1850.' },
      ],
    },
  },
} satisfies Offer;
