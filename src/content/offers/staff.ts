/**
 * Household staff (/services/staff/): a butler or chalet manager, daily housekeeping and
 * serving staff for an evening as cards. Staff requests use the general form (no choice
 * field), so each card writes its choice into the request details and tags the lead with
 * the staff service. French: to be reviewed by a native speaker.
 */
import type { Offer } from '../../lib/offers';

export default {
  request: 'general',
  service: 'staff',
  prefill: 'details',
  en: {
    cards: {
      eyebrow: 'Household staff',
      title: 'Choose the help you need',
      note: 'Christmas and New Year: experienced staff are booked early, so ask as soon as your dates are fixed.',
      request: 'Request this',
      items: [
        { name: 'A butler or chalet manager', line: 'Your first point of contact in the house, or a manager who runs the property, the suppliers and the team.' },
        { name: 'Daily housekeeping', line: 'Cleaning, linen, towels and turndown in the evening, with laundry and garment care.' },
        { name: 'Serving staff for an evening', line: 'A head waiter and serving staff for a dinner or celebration, working alongside your chef.' },
      ],
    },
    steps: {
      title: 'How it works',
      items: [
        { name: 'The house and your group', text: 'The chalet, the number of guests and the level of service you expect.' },
        { name: 'A staffing proposal within 24 hours', text: 'Each role, the working hours and how the team fits around your days on the slopes.' },
        { name: 'A briefed team', text: 'Staff know your guests, children, allergies, routines and privacy before you arrive.' },
      ],
    },
    extras: {
      title: 'In the house',
      items: [
        { name: 'Laundry and garment care', text: 'Washing, ironing and pressing; delicate pieces go to a specialist cleaner.' },
        { name: 'The ski room', text: 'Gloves, boots and base layers dried for the next morning.' },
        { name: 'Packing', text: 'Cases packed at the end of the stay, anything left behind sent on.' },
        { name: 'For owners', text: 'Staff for your holiday weeks or the whole season, briefed on your house.' },
      ],
    },
  },
  fr: {
    cards: {
      eyebrow: 'Personnel de maison',
      title: 'Choisissez l’aide dont vous avez besoin',
      note: 'Noël et Nouvel An : le personnel expérimenté est réservé tôt, contactez-nous dès vos dates arrêtées.',
      request: 'Demander',
      items: [
        { name: 'Un majordome ou un intendant', line: 'Votre interlocuteur au quotidien dans la maison, ou un intendant qui dirige la propriété, les fournisseurs et l’équipe.' },
        { name: 'Le ménage quotidien', line: 'Ménage, linge de lit, serviettes et service de couverture le soir, avec blanchisserie et entretien des vêtements.' },
        { name: 'Du personnel pour une soirée', line: 'Un maître d’hôtel et du personnel de service pour un dîner ou une célébration, aux côtés de votre chef.' },
      ],
    },
    steps: {
      title: 'Comment ça se passe',
      items: [
        { name: 'La maison et votre groupe', text: 'Le chalet, le nombre d’hôtes et le niveau de service souhaité.' },
        { name: 'Une proposition de personnel sous 24 heures', text: 'Chaque poste, les horaires et l’organisation de l’équipe autour de vos journées sur les pistes.' },
        { name: 'Une équipe briefée', text: 'Le personnel connaît vos hôtes, les enfants, les allergies, vos habitudes et vos attentes de discrétion avant votre arrivée.' },
      ],
    },
    extras: {
      title: 'Dans la maison',
      items: [
        { name: 'Blanchisserie et entretien', text: 'Lavage, repassage et défroissage ; les pièces délicates partent chez un pressing spécialisé.' },
        { name: 'Le local à skis', text: 'Gants, chaussures et sous-vêtements techniques séchés pour le lendemain matin.' },
        { name: 'Les valises', text: 'Préparées en fin de séjour, et les objets oubliés envoyés.' },
        { name: 'Pour les propriétaires', text: 'Du personnel pour vos semaines de vacances ou toute la saison, présenté à votre maison.' },
      ],
    },
  },
} satisfies Offer;
