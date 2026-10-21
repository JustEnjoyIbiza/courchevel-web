/**
 * Interface strings shared by every page (header, footer, buttons).
 * Page copy lives with each page or in src/content/.
 * French text: to be reviewed by a native speaker before launch.
 */
import type { Locale } from '../data/business';

export const ui = {
  en: {
    skip: 'Skip to content',
    planMyStay: 'Plan my stay',
    whatsapp: 'WhatsApp',
    whatsappUs: 'WhatsApp us',
    call: 'Call',
    email: 'Email',
    menu: 'Menu',
    close: 'Close',
    languageName: 'English',
    switchTo: 'Français',
    switchToLabel: 'Voir cette page en français',
    nav: {
      services: 'Services',
      experiences: 'Experiences',
      villages: 'Villages',
      about: 'About',
      faq: 'FAQ',
    },
    footer: {
      contact: 'Contact',
      area: 'Area served',
      explore: 'Explore',
      legal: 'Legal',
      legalNotice: 'Legal notice',
      privacy: 'Privacy policy',
      cookies: 'Cookie policy',
      pricing: 'Every service is quoted personally. We do not publish prices.',
      rights: 'All rights reserved.',
    },
    breadcrumbHome: 'Home',
  },
  fr: {
    skip: 'Aller au contenu',
    planMyStay: 'Organiser mon séjour',
    whatsapp: 'WhatsApp',
    whatsappUs: 'Écrivez-nous sur WhatsApp',
    call: 'Appeler',
    email: 'E-mail',
    menu: 'Menu',
    close: 'Fermer',
    languageName: 'Français',
    switchTo: 'English',
    switchToLabel: 'View this page in English',
    nav: {
      services: 'Services',
      experiences: 'Expériences',
      villages: 'Villages',
      about: 'À propos',
      faq: 'FAQ',
    },
    footer: {
      contact: 'Contact',
      area: 'Zone d’intervention',
      explore: 'Découvrir',
      legal: 'Informations légales',
      legalNotice: 'Mentions légales',
      privacy: 'Politique de confidentialité',
      cookies: 'Politique cookies',
      pricing: 'Chaque prestation fait l’objet d’un devis personnalisé. Nous ne publions pas de tarifs.',
      rights: 'Tous droits réservés.',
    },
    breadcrumbHome: 'Accueil',
  },
} as const satisfies Record<Locale, unknown>;

export const t = (locale: Locale) => ui[locale];
