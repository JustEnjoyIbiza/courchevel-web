/**
 * Adds `X-Robots-Tag: noindex` to pages served on a *.netlify.app address (the
 * preview, deploy previews, branch deploys), so search engines only ever index
 * www.courchevelluxuryconcierge.com. Requests on the real domain pass straight
 * through. Static files are excluded; pages are what matter for indexing.
 */
import { isPreviewHost } from '../../src/lib/preview-host.ts';

export const config = {
  path: '/*',
  excludedPath: ['/_astro/*', '/*.css', '/*.js', '/*.png', '/*.jpg', '/*.jpeg', '/*.webp', '/*.avif', '/*.svg', '/*.ico', '/*.woff2'],
};

interface Context {
  next(): Promise<Response>;
}

export default async (req: Request, context: Context): Promise<Response | undefined> => {
  if (!isPreviewHost(new URL(req.url).hostname)) return;
  const res = await context.next();
  const headers = new Headers(res.headers);
  headers.set('x-robots-tag', 'noindex');
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
};
