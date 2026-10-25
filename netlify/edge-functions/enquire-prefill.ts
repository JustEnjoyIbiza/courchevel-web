/**
 * /enquire/?arrival=…&village=… — writes the homepage quick-start answers (or the
 * hotel or chalet chosen in a list, ?item=…) into the Plan my stay form, so they
 * arrive pre-filled even without JavaScript.
 * Requests without quick-start values pass straight through to the static page.
 */
import { hasPrefill, parsePrefill, prefillHtml } from '../../src/lib/prefill.ts';

export const config = { path: ['/enquire/', '/fr/enquire/'] };

interface Context {
  next(): Promise<Response>;
}

export default async (req: Request, context: Context): Promise<Response | undefined> => {
  const url = new URL(req.url);
  if (!url.search) return;
  const prefill = parsePrefill(url.searchParams, new Date().toISOString().slice(0, 10));
  if (!hasPrefill(prefill)) return;

  const res = await context.next();
  if (!res.ok || !(res.headers.get('content-type') ?? '').includes('text/html')) return res;
  const headers = new Headers(res.headers);
  headers.delete('content-length');
  headers.set('cache-control', 'private, no-store');
  const locale = url.pathname.startsWith('/fr/') ? 'fr' : 'en';
  return new Response(prefillHtml(await res.text(), prefill, locale), { status: res.status, headers });
};
