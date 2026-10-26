/**
 * Netlify addresses (the private preview, deploy previews, branch deploys and the
 * site's own *.netlify.app name) must never be indexed: only the real domain should
 * appear in search results. Used by netlify/edge-functions/noindex-previews.ts.
 */
export const isPreviewHost = (hostname: string) => hostname === 'netlify.app' || hostname.endsWith('.netlify.app');
