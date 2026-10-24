/**
 * A page's call to action: the button label, where it leads and the
 * WhatsApp message that fits the page (src/content/requests.ts).
 */
import { whatsappHref, type Locale } from '../data/business';
import { requestCopy, pageRequests, type PageRequest } from '../content/requests';
import { t } from '../i18n/ui';
import { localize } from './routes';

export interface Cta {
  label: string;
  href: string;
  whatsapp: string;
}

export function requestCta(locale: Locale, req: PageRequest = { type: 'stay' }, itemOverride?: string): Cta {
  if (req.type === 'stay') {
    return {
      label: req.label?.[locale] ?? t(locale).planMyStay,
      href: localize('/enquire/', locale) + (req.service ? `?service=${req.service}` : ''),
      whatsapp: whatsappHref(locale, req.whatsapp?.[locale]),
    };
  }
  const copy = requestCopy[locale].types[req.type];
  const item = itemOverride ?? req.item?.[locale];
  const query = new URLSearchParams();
  if (item) query.set('item', item);
  if (req.service) query.set('service', req.service);
  const qs = query.toString();
  return {
    label: req.label?.[locale] ?? (itemOverride ? (copy.itemButton ?? copy.button) : copy.button),
    href: localize(`/enquire/${req.type}/`, locale) + (qs ? `?${qs}` : ''),
    whatsapp: whatsappHref(locale, req.whatsapp?.[locale] ?? copy.whatsapp(item)),
  };
}

/** The call to action of a content page, e.g. ('guides', 'where-to-eat'). */
export const pageCta = (locale: Locale, collection: string, slug: string) => requestCta(locale, pageRequests[`${collection}/${slug}`]);
