/**
 * IndexNow key file at /<INDEXNOW_KEY>.txt, proving to Bing that we own the
 * site. Only generated when the key is set.
 */
import type { APIRoute, GetStaticPaths } from 'astro';

export const getStaticPaths = (() => {
  const key = import.meta.env.INDEXNOW_KEY as string | undefined;
  return key && /^[a-zA-Z0-9-]{8,128}$/.test(key) ? [{ params: { indexnowKey: key } }] : [];
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => new Response(params.indexnowKey, { headers: { 'Content-Type': 'text/plain' } });
