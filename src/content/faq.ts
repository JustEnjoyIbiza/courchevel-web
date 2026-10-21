/**
 * All FAQ questions, grouped by topic. `home: true` marks the ones shown on
 * the homepage. Facts only: no prices, nothing invented.
 * Season dates from courchevel.com. Geneva distance (149 km, about 2 h 15)
 * and Moûtiers station (about 30 minutes) from booking.courchevel.com.
 * Winter equipment rule (1 November to 31 March, 3PMSF tyres or chains)
 * from info.gouv.fr. French: to be reviewed by a native speaker.
 */
import { business, type Locale } from '../data/business';

export interface FaqItem {
  q: string;
  a: string;
  home?: boolean;
}

export interface FaqGroup {
  topic: string;
  items: FaqItem[];
}

export const faq: Record<Locale, FaqGroup[]> = {
  en: [
    {
      topic: 'How it works',
      items: [
        {
          home: true,
          q: 'Do you publish prices?',
          a: 'No. Every stay is different, so each service is quoted personally after we know your dates, group and village. Send us your request and you receive a tailored proposal within 24 hours.',
        },
        {
          home: true,
          q: 'Which areas do you cover?',
          a: 'We work in all of Courchevel: 1850, 1650 Moriond, 1550 Village, 1300 Le Praz and La Tania, and across the Trois Vallées, including Méribel and Val Thorens.',
        },
        {
          home: true,
          q: 'How quickly do you reply?',
          a: `${business.replyPromise.en}, by WhatsApp, phone or email, whichever you prefer. During the winter season we are available 24/7 for clients in resort.`,
        },
        {
          home: true,
          q: 'Can I book on behalf of a client or my employer?',
          a: 'Yes. Personal assistants, family offices and travel agents can send a request for a client. Tell us who you are booking for and we deal with you directly, with full discretion.',
        },
        {
          q: 'What happens after I send a request?',
          a: 'We reply to confirm we have it, ask only the questions that matter, then send a tailored proposal within 24 hours. Once you approve it, we make the bookings and keep you updated by the channel you prefer.',
        },
        {
          q: 'How far ahead should I contact you?',
          a: 'As soon as your dates are fixed, especially for Christmas, New Year and February. Many requests can still be arranged at short notice in January and March, and we will tell you honestly what remains possible.',
        },
        {
          q: 'Do you keep my details and plans confidential?',
          a: 'Yes. We share with each provider only what they need to deliver their part of your stay. Many clients and their assistants prefer that we use a first name or an agreed reference, and we are happy to work that way.',
        },
      ],
    },
    {
      topic: 'Chalets and hotels',
      items: [
        {
          q: 'How far ahead should I book a chalet for Christmas or New Year in Courchevel?',
          a: 'As early as you can. The largest chalets in Courchevel 1850 are often reserved many months before the season, so send your request as soon as your festive dates are fixed.',
        },
        {
          q: 'Which Courchevel village suits a luxury chalet?',
          a: 'Courchevel 1850 has the highest concentration of luxury chalets and the palace hotels, close to the altiport and the busiest restaurants. Families looking for more space and calm often prefer 1650 Moriond, 1550 Village or Le Praz.',
        },
        {
          q: 'Do you rent out chalets yourselves?',
          a: 'No. We are not a letting agency: we find and arrange the right chalet with its owners, agencies or hotels, who remain your contractual partner for the stay. Our role is to choose well, prepare everything and look after you while you are there.',
        },
        {
          q: 'Can you book a palace hotel instead of a chalet?',
          a: 'Yes. For shorter stays, couples or groups who want a spa and restaurants on site, a palace or five-star hotel often makes more sense. We arrange the rooms or suites and handle the requests around your stay.',
        },
        {
          q: 'Can we stay for less than a week in high season?',
          a: 'Sometimes. Many chalets let by the week from Saturday or Sunday in high season, while hotels and some chalets accept shorter stays. Short stays are easier to arrange in January and March.',
        },
        {
          q: 'Can you prepare the chalet before we arrive?',
          a: 'Yes. We stock the fridge and cellar to your list, brief the staff on allergies and preferences, prepare rooms for children and set up a Christmas tree for festive stays, so the chalet is ready when you walk in.',
        },
      ],
    },
    {
      topic: 'Getting there and transfers',
      items: [
        {
          q: 'How far is Courchevel from Geneva?',
          a: 'About 150 km by road, which takes around 2 hours 15 minutes in good conditions and longer on busy Saturdays or in snow. By helicopter the flight is far shorter, weather permitting.',
        },
        {
          q: 'Which airport is closest to Courchevel?',
          a: 'Chambéry is the closest international airport, at around an hour and a half by road. Geneva and Lyon have more flights and are both a little over two hours away by road, and many private jets use them.',
        },
        {
          q: 'Can you arrange a helicopter transfer from Geneva to Courchevel?',
          a: 'Yes. We book the flight with licensed helicopter operators from Geneva, Lyon, Chambéry or Milan to Courchevel Altiport, and arrange a car to meet you on landing. Flights depend on the weather, so we always keep a road option ready.',
        },
        {
          q: 'Can a private jet land at Courchevel Altiport?',
          a: 'Generally not. The altiport has a short, steep runway that only small aircraft flown by specially qualified pilots can use, so most private jets land at Geneva, Chambéry or Lyon, then continue by helicopter or chauffeured car.',
        },
        {
          q: 'Do I need snow chains or winter tyres to drive to Courchevel?',
          a: 'Yes. From 1 November to 31 March, vehicles in the Savoie mountain zones must have winter tyres marked with the 3PMSF symbol or carry chains or snow socks. In heavy snow, road signs can also make chains compulsory, so carry them whatever your tyres.',
        },
        {
          q: 'Can I get to Courchevel by train?',
          a: 'Yes. The nearest station is Moûtiers, about 30 minutes from the resort by road. We can arrange a chauffeured car to meet you on the platform.',
        },
        {
          q: 'Do you drive clients yourselves?',
          a: 'No. All road transfers are carried out by licensed chauffeur partners, and flights by licensed operators. We book them, share your arrival details and keep track of your flight so the driver is waiting.',
        },
      ],
    },
    {
      topic: 'Skiing',
      items: [
        {
          home: true,
          q: 'Can you arrange heli-skiing from Courchevel?',
          a: 'Yes, as day trips. Helicopter drops for skiing are banned in France, so heli-skiing days take you to Italy or Switzerland with a certified mountain guide, and back to Courchevel the same day.',
        },
        {
          q: 'How far ahead should I book a private ski instructor?',
          a: 'For Christmas, New Year and February, as soon as your dates are confirmed, as experienced private instructors are booked early. If you like an instructor, tell us and we will ask for the same person each day.',
        },
        {
          q: 'Can you arrange ski passes and equipment before we arrive?',
          a: 'Yes. We arrange lift passes for the area you want to ski and organise equipment hire with a fitting at your chalet or hotel where the shop offers it. Your skis and boots are then ready on the first morning.',
        },
        {
          q: 'Can you find an off-piste guide in Courchevel?',
          a: 'Yes. Off-piste skiing is done with a certified mountain guide, who chooses the routes according to snow and avalanche conditions on the day. We arrange the guide and any avalanche safety equipment you need.',
        },
        {
          q: 'Is there anything to do for guests who do not ski?',
          a: 'A great deal. We arrange snowshoe walks, dog sledding, spa days, scenic helicopter flights, shopping and long lunches in mountain restaurants that can be reached by gondola.',
        },
      ],
    },
    {
      topic: 'Dining',
      items: [
        {
          q: 'Can you get a table at the most sought-after restaurants in Courchevel 1850 in high season?',
          a: 'Often, if you ask early. We request tables as soon as your dates are set, including for the busiest festive evenings, but no table can be promised until the restaurant confirms it. If your first choice is full, we suggest alternatives for the same evening.',
        },
        {
          q: 'Is there a dress code in Courchevel restaurants?',
          a: 'Few places publish a strict one, but evenings in the palace hotels and the leading restaurants of 1850 are smart. Lunch on the mountain is relaxed and ski clothing is normal. We check the venue’s expectations when we book.',
        },
        {
          q: 'Can you arrange a private chef in our chalet?',
          a: 'Yes. We arrange private chefs for a single dinner or the whole stay, including chefs with Michelin-starred experience, and a sommelier if you wish. Send us your preferences and any allergies, and the chef proposes menus before you arrive.',
        },
        {
          q: 'Can you cater for allergies and special diets?',
          a: 'Yes. We pass allergies and diets to every chef and restaurant involved, and confirm in writing what they can accommodate. Kosher, halal, vegan and medical diets are worth mentioning when you first send your request.',
        },
      ],
    },
    {
      topic: 'Families',
      items: [
        {
          q: 'Can you arrange a nanny who speaks our language?',
          a: 'We look for one as soon as you tell us the language and the children’s ages. Nannies who speak English and French are the easiest to find, and we tell you honestly if another language may be hard to match for your dates.',
        },
        {
          q: 'From what age can children take ski lessons in Courchevel?',
          a: 'Ski schools in Courchevel usually take children from around three years old, in small groups or in private lessons. For younger or nervous children, a private instructor at a gentle pace often works better.',
        },
        {
          q: 'Can you arrange evening babysitting?',
          a: 'Yes. We arrange babysitters for evenings in your chalet or hotel, so you can dine out. For the festive weeks, book them at the same time as your restaurant tables.',
        },
        {
          q: 'Can the chalet be equipped for babies and young children?',
          a: 'Yes. We ask for cots, high chairs, stair gates and baby baths to be in place before you arrive, and can stock nappies, formula and the food your children prefer.',
        },
      ],
    },
    {
      topic: 'Events and nightlife',
      items: [
        {
          q: 'Can you book a nightclub table for New Year’s Eve in Courchevel?',
          a: 'We request tables in the clubs and après-ski venues you choose, subject to availability, and New Year’s Eve fills first. Send your request early with the number of guests, and we confirm as soon as the venue does.',
        },
        {
          q: 'Is there a dress code in Courchevel nightclubs?',
          a: 'Clubs in 1850 generally expect smart evening wear, and door policies are at the venue’s discretion. Après-ski venues on the slopes are relaxed, and ski clothing is normal there.',
        },
        {
          q: 'Can you organise a private party in our chalet?',
          a: 'Yes. We arrange the chef and waiting staff, drinks, music, decoration and transport home for your guests, and coordinate it all with the chalet staff so the evening runs quietly in the background.',
        },
        {
          q: 'Can you organise a birthday, proposal or company event in Courchevel?',
          a: 'Yes. Tell us the occasion, the number of guests and the feeling you want, and we propose a setting and a plan, from a private dinner on the mountain to a gathering for a whole team.',
        },
      ],
    },
    {
      topic: 'Season and practical',
      items: [
        {
          home: true,
          q: 'When is the 2026/27 ski season in Courchevel?',
          a: 'The resort opens on 4 December 2026 and closes on 18 April 2027. Christmas, New Year and February half-term are the busiest weeks, so chalets for those dates should be booked early.',
        },
        {
          q: 'When is the quietest time to visit Courchevel?',
          a: 'January, outside the festive fortnight, and March are usually calmer, with easier restaurant tables and more choice of chalets. March also brings longer, sunnier days.',
        },
        {
          q: 'What should I do if someone falls ill or is injured during the stay?',
          a: 'In an emergency, call 112 first. We can then help with the practical side, such as arranging transport to a medical centre, rescheduling lessons and keeping your family or office informed.',
        },
      ],
    },
  ],
  fr: [
    {
      topic: 'Fonctionnement',
      items: [
        {
          home: true,
          q: 'Publiez-vous vos tarifs ?',
          a: 'Non. Chaque séjour est différent : chaque prestation fait l’objet d’un devis personnalisé une fois vos dates, votre groupe et votre village connus. Envoyez-nous votre demande et recevez une proposition sur mesure sous 24 heures.',
        },
        {
          home: true,
          q: 'Quelles zones couvrez-vous ?',
          a: 'Nous intervenons dans tout Courchevel : 1850, 1650 Moriond, 1550 Village, 1300 Le Praz et La Tania, ainsi que dans les Trois Vallées, dont Méribel et Val Thorens.',
        },
        {
          home: true,
          q: 'Sous quel délai répondez-vous ?',
          a: `${business.replyPromise.fr}, par WhatsApp, téléphone ou e-mail selon votre préférence. Pendant la saison d’hiver, nous sommes disponibles 24 h/24 pour nos clients sur place.`,
        },
        {
          home: true,
          q: 'Puis-je réserver pour un client ou mon employeur ?',
          a: 'Oui. Assistants personnels, family offices et agences de voyage peuvent nous adresser une demande pour un client. Indiquez-nous pour qui vous réservez : nous traitons directement avec vous, en toute discrétion.',
        },
        {
          q: 'Que se passe-t-il une fois ma demande envoyée ?',
          a: 'Nous accusons réception, vous posons uniquement les questions utiles, puis vous adressons une proposition sur mesure sous 24 heures. Dès votre accord, nous effectuons les réservations et vous tenons informé par le canal de votre choix.',
        },
        {
          q: 'Combien de temps à l’avance faut-il vous contacter ?',
          a: 'Dès que vos dates sont arrêtées, surtout pour Noël, le Nouvel An et février. En janvier et en mars, beaucoup de demandes restent possibles à court terme, et nous vous disons franchement ce qui est encore réalisable.',
        },
        {
          q: 'Mes informations et mon séjour restent-ils confidentiels ?',
          a: 'Oui. Chaque prestataire ne reçoit que les informations nécessaires à sa mission. De nombreux clients et leurs assistants préfèrent que nous utilisions un prénom ou une référence convenue, et nous travaillons volontiers ainsi.',
        },
      ],
    },
    {
      topic: 'Chalets et hôtels',
      items: [
        {
          q: 'Combien de temps à l’avance réserver un chalet pour Noël ou le Nouvel An à Courchevel ?',
          a: 'Le plus tôt possible. Les plus grands chalets de Courchevel 1850 sont souvent réservés de longs mois avant la saison : envoyez-nous votre demande dès que vos dates de fêtes sont fixées.',
        },
        {
          q: 'Quel village de Courchevel choisir pour un chalet de luxe ?',
          a: 'Courchevel 1850 concentre le plus grand nombre de chalets de luxe et les palaces, à proximité de l’altiport et des restaurants les plus courus. Les familles en quête d’espace et de calme préfèrent souvent 1650 Moriond, 1550 Village ou Le Praz.',
        },
        {
          q: 'Louez-vous vous-mêmes des chalets ?',
          a: 'Non. Nous ne sommes pas une agence de location : nous trouvons et organisons le chalet adapté auprès de ses propriétaires, des agences ou des hôtels, qui restent votre interlocuteur contractuel pour le séjour. Notre rôle est de bien choisir, de tout préparer et de veiller sur vous sur place.',
        },
        {
          q: 'Pouvez-vous réserver un palace plutôt qu’un chalet ?',
          a: 'Oui. Pour un séjour court, un couple ou un groupe qui souhaite spa et restaurants sur place, un palace ou un cinq-étoiles est souvent plus adapté. Nous réservons chambres ou suites et prenons en charge les demandes autour de votre séjour.',
        },
        {
          q: 'Peut-on séjourner moins d’une semaine en haute saison ?',
          a: 'Parfois. En haute saison, beaucoup de chalets se louent à la semaine, du samedi ou du dimanche, tandis que les hôtels et certains chalets acceptent des séjours plus courts. Les courts séjours sont plus faciles à organiser en janvier et en mars.',
        },
        {
          q: 'Pouvez-vous préparer le chalet avant notre arrivée ?',
          a: 'Oui. Nous garnissons réfrigérateur et cave selon votre liste, informons le personnel de vos allergies et préférences, préparons les chambres des enfants et installons un sapin pour les fêtes : le chalet est prêt dès votre arrivée.',
        },
      ],
    },
    {
      topic: 'Accès et transferts',
      items: [
        {
          q: 'À quelle distance Courchevel se trouve-t-il de Genève ?',
          a: 'Environ 150 km par la route, soit 2 h 15 environ dans de bonnes conditions, davantage les samedis chargés ou par temps de neige. En hélicoptère, le trajet est bien plus court, si la météo le permet.',
        },
        {
          q: 'Quel est l’aéroport le plus proche de Courchevel ?',
          a: 'Chambéry est l’aéroport international le plus proche, à environ une heure et demie de route. Genève et Lyon offrent davantage de vols et se trouvent à deux heures de route environ, voire un peu plus ; de nombreux jets privés y atterrissent.',
        },
        {
          q: 'Pouvez-vous organiser un transfert en hélicoptère depuis Genève ?',
          a: 'Oui. Nous réservons le vol auprès d’opérateurs d’hélicoptères agréés depuis Genève, Lyon, Chambéry ou Milan jusqu’à l’altiport de Courchevel, avec une voiture à l’atterrissage. Les vols dépendent de la météo : nous prévoyons donc toujours une solution par la route.',
        },
        {
          q: 'Un jet privé peut-il atterrir à l’altiport de Courchevel ?',
          a: 'En général, non. L’altiport dispose d’une piste courte et très pentue, réservée aux petits avions et à des pilotes spécialement qualifiés. La plupart des jets privés se posent donc à Genève, Chambéry ou Lyon, puis le trajet se poursuit en hélicoptère ou en voiture avec chauffeur.',
        },
        {
          q: 'Faut-il des chaînes ou des pneus hiver pour monter à Courchevel ?',
          a: 'Oui. Du 1er novembre au 31 mars, les véhicules circulant dans les zones de montagne de Savoie doivent être équipés de pneus hiver portant le marquage 3PMSF ou transporter des chaînes ou des chaussettes à neige. Par fortes chutes de neige, la signalisation peut aussi imposer les chaînes : emportez-les quels que soient vos pneus.',
        },
        {
          q: 'Peut-on venir à Courchevel en train ?',
          a: 'Oui. La gare la plus proche est celle de Moûtiers, à environ 30 minutes de route de la station. Nous pouvons prévoir une voiture avec chauffeur à votre arrivée sur le quai.',
        },
        {
          q: 'Conduisez-vous vous-mêmes vos clients ?',
          a: 'Non. Les transferts par la route sont assurés par des chauffeurs partenaires titulaires des autorisations requises, et les vols par des opérateurs agréés. Nous les réservons, leur transmettons vos horaires et suivons votre vol pour que le chauffeur vous attende.',
        },
      ],
    },
    {
      topic: 'Ski',
      items: [
        {
          home: true,
          q: 'Pouvez-vous organiser de l’héliski depuis Courchevel ?',
          a: 'Oui, à la journée. La dépose en hélicoptère pour le ski est interdite en France : les journées d’héliski se déroulent donc en Italie ou en Suisse avec un guide de haute montagne diplômé, avec retour à Courchevel le soir même.',
        },
        {
          q: 'Combien de temps à l’avance réserver un moniteur de ski privé ?',
          a: 'Pour Noël, le Nouvel An et février, dès que vos dates sont confirmées : les moniteurs privés expérimentés sont réservés tôt. Si un moniteur vous plaît, dites-le-nous et nous le demanderons pour chaque journée.',
        },
        {
          q: 'Pouvez-vous préparer forfaits et matériel avant notre arrivée ?',
          a: 'Oui. Nous organisons les forfaits pour le domaine souhaité et la location du matériel, avec essayage au chalet ou à l’hôtel lorsque le magasin le propose. Skis et chaussures sont prêts dès le premier matin.',
        },
        {
          q: 'Pouvez-vous trouver un guide hors-piste à Courchevel ?',
          a: 'Oui. Le hors-piste se pratique avec un guide de haute montagne diplômé, qui choisit les itinéraires selon la neige et le risque d’avalanche du jour. Nous réservons le guide et le matériel de sécurité nécessaire.',
        },
        {
          q: 'Que proposer aux personnes qui ne skient pas ?',
          a: 'Le choix ne manque pas : balades en raquettes, chiens de traîneau, journées spa, survols en hélicoptère, shopping et longs déjeuners dans des restaurants d’altitude accessibles en télécabine.',
        },
      ],
    },
    {
      topic: 'Gastronomie',
      items: [
        {
          q: 'Pouvez-vous obtenir une table dans les restaurants les plus réputés de Courchevel 1850 en haute saison ?',
          a: 'Souvent, si vous vous y prenez tôt. Nous demandons les tables dès que vos dates sont connues, y compris pour les soirées de fêtes, mais aucune table n’est acquise avant la confirmation du restaurant. Si votre premier choix est complet, nous vous proposons d’autres adresses pour le même soir.',
        },
        {
          q: 'Y a-t-il un code vestimentaire dans les restaurants de Courchevel ?',
          a: 'Rares sont les établissements qui en imposent un strict, mais les soirées dans les palaces et les grandes tables de 1850 appellent une tenue soignée. Au déjeuner en altitude, la tenue de ski est de mise. Nous vérifions les usages de chaque adresse lors de la réservation.',
        },
        {
          q: 'Pouvez-vous organiser un chef privé dans notre chalet ?',
          a: 'Oui. Nous organisons des chefs privés pour un dîner ou pour tout le séjour, y compris, sur demande et selon disponibilité, des chefs issus de maisons étoilées, et un sommelier si vous le souhaitez. Indiquez-nous vos goûts et allergies : le chef vous soumet ses menus avant votre arrivée.',
        },
        {
          q: 'Pouvez-vous tenir compte des allergies et régimes particuliers ?',
          a: 'Oui. Nous transmettons allergies et régimes à chaque chef et restaurant concerné, et vous confirmons par écrit ce qu’ils peuvent proposer. Pour une cuisine casher, halal, végétalienne ou un régime médical, mieux vaut le préciser dès votre demande.',
        },
      ],
    },
    {
      topic: 'Familles',
      items: [
        {
          q: 'Pouvez-vous trouver une nounou qui parle notre langue ?',
          a: 'Nous la cherchons dès que vous nous indiquez la langue et l’âge des enfants. Les nounous anglophones et francophones sont les plus faciles à trouver, et nous vous prévenons franchement si une autre langue risque d’être difficile pour vos dates.',
        },
        {
          q: 'À partir de quel âge les enfants peuvent-ils prendre des cours de ski à Courchevel ?',
          a: 'Les écoles de ski de Courchevel accueillent généralement les enfants dès 3 ans environ, en petits groupes ou en cours particuliers. Pour les plus jeunes ou les plus timides, un moniteur privé qui avance à leur rythme est souvent la solution la plus adaptée.',
        },
        {
          q: 'Pouvez-vous organiser du baby-sitting le soir ?',
          a: 'Oui. Nous trouvons des baby-sitters pour vos soirées au chalet ou à l’hôtel, pour que vous puissiez dîner dehors. Pendant les fêtes, réservez-les en même temps que vos tables.',
        },
        {
          q: 'Le chalet peut-il être équipé pour les bébés et les jeunes enfants ?',
          a: 'Oui. Nous demandons que lits bébé, chaises hautes, barrières d’escalier et baignoires soient installés avant votre arrivée, et pouvons prévoir couches, lait infantile et les aliments préférés de vos enfants.',
        },
      ],
    },
    {
      topic: 'Événements et soirées',
      items: [
        {
          q: 'Pouvez-vous réserver une table en club pour le réveillon du Nouvel An à Courchevel ?',
          a: 'Nous demandons des tables dans les clubs et lieux d’après-ski de votre choix, sous réserve de disponibilité, et le 31 décembre est le premier soir à afficher complet. Envoyez votre demande tôt avec le nombre d’invités : nous confirmons dès que l’établissement le fait.',
        },
        {
          q: 'Y a-t-il un code vestimentaire dans les clubs de Courchevel ?',
          a: 'Les clubs de 1850 attendent en général une tenue de soirée soignée, et l’entrée reste à la discrétion de l’établissement. Les lieux d’après-ski sur les pistes sont décontractés, et la tenue de ski y est courante.',
        },
        {
          q: 'Pouvez-vous organiser une soirée privée dans notre chalet ?',
          a: 'Oui. Nous organisons le chef et le service, les boissons, la musique, la décoration et le retour de vos invités, en coordination avec le personnel du chalet, pour une soirée qui se déroule en toute discrétion.',
        },
        {
          q: 'Pouvez-vous organiser un anniversaire, une demande en mariage ou un événement d’entreprise ?',
          a: 'Oui. Indiquez-nous l’occasion, le nombre d’invités et l’atmosphère souhaitée : nous vous proposons un lieu et un déroulé, d’un dîner privé en montagne à un rassemblement pour toute une équipe.',
        },
      ],
    },
    {
      topic: 'Saison et informations pratiques',
      items: [
        {
          home: true,
          q: 'Quand a lieu la saison de ski 2026–2027 à Courchevel ?',
          a: 'La station ouvre le 4 décembre 2026 et ferme le 18 avril 2027. Noël, le Nouvel An et les vacances de février sont les semaines les plus demandées : mieux vaut réserver les chalets tôt pour ces dates.',
        },
        {
          q: 'Quelle est la période la plus calme à Courchevel ?',
          a: 'Janvier, en dehors des deux semaines de fêtes, et mars sont généralement plus calmes : les tables sont plus faciles à obtenir et le choix de chalets plus large. En mars, les journées sont aussi plus longues et plus ensoleillées.',
        },
        {
          q: 'Que faire si quelqu’un tombe malade ou se blesse pendant le séjour ?',
          a: 'En cas d’urgence, appelez d’abord le 112. Nous nous chargeons ensuite des aspects pratiques : transport vers un centre médical, report des cours et information de votre famille ou de votre bureau.',
        },
      ],
    },
  ],
};

/** Every question for a locale, flattened. */
export const allFaqs = (locale: Locale) => faq[locale].flatMap((g) => g.items);
