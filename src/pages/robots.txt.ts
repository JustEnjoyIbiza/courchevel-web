/**
 * robots.txt: open to search engines and to AI search/assistant crawlers
 * (plan, AI protocol rule 1). Only the lead endpoint is closed.
 */
import type { APIRoute } from 'astro';

const aiAndSearchBots = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
];

export const GET: APIRoute = ({ site }) => {
  const groups = aiAndSearchBots.map((bot) => `User-agent: ${bot}\nAllow: /\nDisallow: /api/`).join('\n\n');
  const body = `# Courchevel Luxury Concierge
# Search engines and AI assistants are welcome to read and cite this site.

${groups}

User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${new URL('/sitemap-index.xml', site).href}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
