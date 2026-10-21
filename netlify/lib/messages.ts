/**
 * Text of the client confirmation email, the concierge email and the
 * Telegram alert. Business facts come from src/data/business.ts.
 */
import { business, whatsappHref } from '../../src/data/business.ts';
import { nights, type Lead } from '../../src/lib/lead.ts';
import { bookingForLabels, contactLabels, formatDate, serviceLabel, villageLabels } from '../../src/lib/lead-labels.ts';

export const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const digits = (phone: string) => phone.replace(/[^\d]/g, '').replace(/^00/, '');

const copy = {
  en: {
    subject: 'We have your request | Courchevel Luxury Concierge',
    dear: (n: string) => `Dear ${n},`,
    thanks: (a: string, d: string, v: string) => `Thank you for your request for ${a} to ${d}, ${v}.`,
    promise: (via: string) => `We reply personally within 15 minutes, from 8:00 to 22:00, by ${via}, and send a tailored proposal within 24 hours.`,
    summary: 'Your request',
    dates: 'Dates', village: 'Village', guests: 'Guests', services: 'Services', message: 'Your message',
    guestsValue: (a: number, c: number) => `${a} adult${a > 1 ? 's' : ''}${c ? `, ${c} child${c > 1 ? 'ren' : ''}` : ''}`,
    nightsValue: (n: number) => `${n} night${n > 1 ? 's' : ''}`,
    urgent: 'Need us sooner? Message us on WhatsApp or call',
    sign: 'With our best regards,',
    footer: 'You receive this email because you sent a request on our website. We use your details only to answer it.',
  },
  fr: {
    subject: 'Nous avons bien reçu votre demande | Courchevel Luxury Concierge',
    dear: (n: string) => `Bonjour ${n},`,
    thanks: (a: string, d: string, v: string) => `Merci pour votre demande du ${a} au ${d}, ${v}.`,
    promise: (via: string) => `Nous vous répondons personnellement sous 15 minutes, de 8 h à 22 h, par ${via}, et vous envoyons une proposition sur mesure sous 24 heures.`,
    summary: 'Votre demande',
    dates: 'Dates', village: 'Village', guests: 'Personnes', services: 'Services', message: 'Votre message',
    guestsValue: (a: number, c: number) => `${a} adulte${a > 1 ? 's' : ''}${c ? `, ${c} enfant${c > 1 ? 's' : ''}` : ''}`,
    nightsValue: (n: number) => `${n} nuit${n > 1 ? 's' : ''}`,
    urgent: 'Besoin de nous joindre plus vite ? Écrivez-nous sur WhatsApp ou appelez le',
    sign: 'Bien cordialement,',
    footer: 'Vous recevez cet e-mail car vous avez envoyé une demande sur notre site. Vos données servent uniquement à y répondre.',
  },
};

/** Branded confirmation sent to the client, in their language. */
export function clientEmail(lead: Lead) {
  const c = copy[lead.locale];
  const l = lead.locale;
  const a = formatDate(lead.arrival, l);
  const d = formatDate(lead.departure, l);
  const v = villageLabels[l][lead.village];
  const via = contactLabels[l][lead.preferredContact];
  // French typography puts a space before the colon.
  const colon = l === 'fr' ? ' :' : ':';
  const rows: [string, string][] = [
    [c.dates, `${a} – ${d} (${c.nightsValue(nights(lead))})`],
    [c.village, v],
    [c.guests, c.guestsValue(lead.adults, lead.children)],
    [c.services, lead.services.map((s) => serviceLabel(s, l)).join(', ')],
    ...(lead.message ? ([[c.message, lead.message]] as [string, string][]) : []),
  ];

  const text = [
    c.dear(lead.name), '',
    c.thanks(a, d, v), c.promise(via), '',
    `${c.summary}${colon}`, ...rows.map(([k, val]) => `- ${k}${colon} ${val}`), '',
    `${c.urgent} ${business.phone.display}.`, whatsappHref(l), '',
    c.sign, business.name, business.url, '', c.footer,
  ].join('\n');

  const html = `<!doctype html><html lang="${l}"><body style="margin:0;background:#fbf8f3;font-family:Helvetica,Arial,sans-serif;color:#231b15">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fbf8f3"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e3d9cb">
<tr><td style="padding:32px 32px 8px;font-family:Georgia,'Times New Roman',serif;font-size:22px;letter-spacing:2px;text-transform:uppercase">Courchevel<br><span style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:4px">Luxury Concierge</span></td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;width:48px;background:#c9a15a;margin:16px 0"></div></td></tr>
<tr><td style="padding:8px 32px;font-size:15px;line-height:1.6">
<p>${esc(c.dear(lead.name))}</p>
<p>${esc(c.thanks(a, d, v))}</p>
<p>${esc(c.promise(via))}</p>
<p style="margin-top:24px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#7f6129">${esc(c.summary)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">
${rows.map(([k, val]) => `<tr><td style="padding:8px 12px 8px 0;border-top:1px solid #e3d9cb;color:#6b5d52;vertical-align:top;width:35%">${esc(k)}</td><td style="padding:8px 0;border-top:1px solid #e3d9cb;vertical-align:top">${esc(val).replace(/\n/g, '<br>')}</td></tr>`).join('\n')}
</table>
<p style="margin-top:24px">${esc(c.urgent)} <a href="tel:${business.phone.e164}" style="color:#7f6129">${esc(business.phone.display)}</a>.</p>
<p><a href="${esc(whatsappHref(l))}" style="display:inline-block;background:#231b15;color:#fbf8f3;text-decoration:none;padding:12px 20px;font-size:12px;letter-spacing:2px;text-transform:uppercase">WhatsApp</a></p>
<p style="margin-top:24px">${esc(c.sign)}<br>${esc(business.name)}</p>
</td></tr>
<tr><td style="padding:16px 32px 32px;font-size:11px;color:#6b5d52;line-height:1.5">${esc(c.footer)}<br><a href="${business.url}" style="color:#6b5d52">${business.url.replace('https://', '')}</a></td></tr>
</table></td></tr></table></body></html>`;

  return { subject: c.subject, text, html };
}

/** Full lead details for the concierge (always in English). */
export function conciergeEmail(lead: Lead) {
  const v = villageLabels.en[lead.village];
  const guests = lead.adults + lead.children;
  const subject = `New lead: ${lead.name} · ${lead.arrival} → ${lead.departure} · ${v} · ${guests} guest${guests > 1 ? 's' : ''}`;
  const rows: [string, string][] = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone || '-'],
    ['Preferred contact', contactLabels.en[lead.preferredContact]],
    ['Booking for', bookingForLabels.en[lead.bookingFor]],
    ['Dates', `${formatDate(lead.arrival, 'en')} → ${formatDate(lead.departure, 'en')} (${nights(lead)} nights)${lead.datesFlexible ? ', flexible' : ''}`],
    ['Village', v],
    ['Guests', `${lead.adults} adults, ${lead.children} children${lead.childrenAges ? ` (ages: ${lead.childrenAges})` : ''}`],
    ['Services', lead.services.map((s) => serviceLabel(s, 'en')).join(', ')],
    ['Experience', lead.experience || '-'],
    ['Budget', lead.budget || '-'],
    ['Message', lead.message || '-'],
    ['Language', lead.locale.toUpperCase()],
    ['Page', lead.page || '-'],
    ['Source', [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(' / ') || lead.referrer || 'direct'],
  ];
  const wa = lead.phone ? `https://wa.me/${digits(lead.phone)}` : '';
  const text = [subject, '', ...rows.map(([k, val]) => `${k}: ${val}`), '', wa && `WhatsApp: ${wa}`, `Reply by email: ${lead.email}`, '', 'Promise: reply within 15 minutes (8:00 to 22:00), proposal within 24 hours.'].filter((x) => x !== '').join('\n');
  const html = `<!doctype html><html><body style="font-family:Helvetica,Arial,sans-serif;color:#231b15">
<h2 style="font-family:Georgia,serif;font-weight:normal">${esc(subject)}</h2>
<p>${wa ? `<a href="${esc(wa)}">WhatsApp the client</a> · ` : ''}<a href="mailto:${esc(lead.email)}">Email the client</a>${lead.phone ? ` · <a href="tel:${esc(lead.phone.replace(/\s/g, ''))}">Call</a>` : ''}</p>
<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px">
${rows.map(([k, val]) => `<tr><td style="border-top:1px solid #e3d9cb;color:#6b5d52;vertical-align:top">${esc(k)}</td><td style="border-top:1px solid #e3d9cb;vertical-align:top">${esc(val).replace(/\n/g, '<br>')}</td></tr>`).join('\n')}
</table>
<p style="color:#6b5d52;font-size:12px">Promise to the client: reply within 15 minutes (8:00 to 22:00), proposal within 24 hours.</p>
</body></html>`;
  return { subject, text, html };
}

/** Short Telegram alert (HTML parse mode). */
export function telegramAlert(lead: Lead) {
  const guests = `${lead.adults}A${lead.children ? ` + ${lead.children}C` : ''}`;
  const lines = [
    `<b>New lead</b> · ${esc(lead.name)} (${lead.locale.toUpperCase()})`,
    `${esc(lead.arrival)} → ${esc(lead.departure)} · ${esc(villageLabels.en[lead.village])} · ${guests}`,
    esc(lead.services.map((s) => serviceLabel(s, 'en')).join(', ')),
    `Prefers: ${contactLabels.en[lead.preferredContact]}${lead.bookingFor !== 'myself' ? ` · for ${lead.bookingFor}` : ''}`,
    lead.phone ? `☎ ${esc(lead.phone)} · <a href="https://wa.me/${digits(lead.phone)}">WhatsApp</a>` : '',
    `✉ ${esc(lead.email)}`,
    lead.message ? `“${esc(lead.message.slice(0, 300))}${lead.message.length > 300 ? '…' : ''}”` : '',
    '<i>Reply within 15 minutes.</i>',
  ];
  return lines.filter(Boolean).join('\n');
}
