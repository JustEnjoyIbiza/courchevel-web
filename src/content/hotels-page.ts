/**
 * Words around the hotel cards and on each hotel's page (the hotels' own facts
 * live in src/content/hotels/). French: to be reviewed by a native speaker.
 */
import type { Locale } from '../data/business';

export const hotelsCopy = {
  en: {
    groups: {
      palace: {
        eyebrow: 'Palace hotels',
        title: 'The five palaces of Courchevel',
        intro: 'Atout France awards the Palace distinction to a small number of five-star hotels. Courchevel has five, all in 1850.',
      },
      'five-star': {
        eyebrow: 'Five-star hotels',
        title: 'Five more hotels to know',
        intro: 'Five-star hotels with their own character, three of them with direct access to the slopes.',
      },
    },
    kinds: { palace: 'Palace', 'five-star': 'Five-star hotel' },
    see: 'See the hotel',
    crumb: 'Palace hotels',
    button: 'Ask about this hotel',
    buttonNote: 'Tell us your dates and your group: we reply within 24 hours with the options that fit, and propose the closest alternatives if the hotel is full.',
    facts: 'At a glance',
    restaurants: 'Restaurants and bars',
    tenTables: 'In our ten tables',
    features: 'Also on site',
    around: 'What we arrange around your stay',
    aroundItems: [
      'Transfers by car or helicopter, timed to your arrival',
      'Ski passes, lessons and equipment ready when you arrive',
      'Tables in the hotel’s restaurants and across the resort',
      'Requests during your stay, from in-room set-ups to late changes',
    ],
    photos: 'Photos',
    checked: (date: string) => `Facts checked on ${date} from the hotel’s own information. Restaurants and opening dates can change; we confirm them for your dates.`,
    all: 'All hotels',
    more: { palace: 'The other palaces', 'five-star': 'Other five-star hotels' },
    rooms: {
      exterior: 'Exterior', view: 'View', terrace: 'Terrace', lounge: 'Lounge', suite: 'Suite', bedroom: 'Bedroom', bathroom: 'Bathroom',
      restaurant: 'Restaurant', bar: 'Bar', pool: 'Pool', spa: 'Spa', gym: 'Gym', kids: 'For children', cinema: 'Cinema', chalet: 'Chalet',
    },
  },
  fr: {
    groups: {
      palace: {
        eyebrow: 'Palaces',
        title: 'Les cinq palaces de Courchevel',
        intro: 'Atout France attribue la distinction Palace à un petit nombre d’hôtels cinq étoiles. Courchevel en compte cinq, tous à 1850.',
      },
      'five-star': {
        eyebrow: 'Hôtels cinq étoiles',
        title: 'Cinq autres hôtels à connaître',
        intro: 'Des cinq étoiles au caractère bien à eux, dont trois avec accès direct aux pistes.',
      },
    },
    kinds: { palace: 'Palace', 'five-star': 'Hôtel cinq étoiles' },
    see: 'Voir l’hôtel',
    crumb: 'Palaces',
    button: 'Demander cet hôtel',
    buttonNote: 'Indiquez-nous vos dates et votre groupe : nous répondons sous 24 heures avec les options adaptées, et proposons les alternatives les plus proches si l’hôtel est complet.',
    facts: 'L’essentiel',
    restaurants: 'Restaurants et bars',
    tenTables: 'Parmi nos dix tables',
    features: 'Également sur place',
    around: 'Ce que nous organisons autour du séjour',
    aroundItems: [
      'Transferts en voiture ou en hélicoptère, calés sur votre arrivée',
      'Forfaits, cours et matériel de ski prêts à votre arrivée',
      'Tables dans les restaurants de l’hôtel et dans toute la station',
      'Demandes pendant le séjour, de la préparation de la chambre aux changements de dernière minute',
    ],
    photos: 'Photos',
    checked: (date: string) => `Informations vérifiées le ${date} auprès de l’hôtel. Restaurants et dates d’ouverture peuvent changer ; nous les confirmons pour vos dates.`,
    all: 'Tous les hôtels',
    more: { palace: 'Les autres palaces', 'five-star': 'Autres hôtels cinq étoiles' },
    rooms: {
      exterior: 'Extérieur', view: 'Vue', terrace: 'Terrasse', lounge: 'Salon', suite: 'Suite', bedroom: 'Chambre', bathroom: 'Salle de bains',
      restaurant: 'Restaurant', bar: 'Bar', pool: 'Piscine', spa: 'Spa', gym: 'Salle de sport', kids: 'Pour les enfants', cinema: 'Cinéma', chalet: 'Chalet',
    },
  },
} satisfies Record<Locale, unknown>;
