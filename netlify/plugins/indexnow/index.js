/**
 * After a successful production deploy, tell Bing (and other IndexNow engines)
 * which URLs exist, so new and updated pages are picked up within hours.
 * Needs the INDEXNOW_KEY environment variable; does nothing otherwise.
 */
import fs from 'node:fs';
import path from 'node:path';

export const onSuccess = async ({ constants, utils }) => {
  const key = process.env.INDEXNOW_KEY;
  if (process.env.CONTEXT !== 'production' || !key) {
    console.log('IndexNow: skipped (not production or no INDEXNOW_KEY)');
    return;
  }
  const dir = constants.PUBLISH_DIR;
  const urls = fs
    .readdirSync(dir)
    .filter((f) => /^sitemap-\d+\.xml$/.test(f))
    .flatMap((f) => [...fs.readFileSync(path.join(dir, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  if (!urls.length) return;
  const host = new URL(urls[0]).host;
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls.slice(0, 10000) }),
    });
    console.log(`IndexNow: submitted ${urls.length} URLs, status ${res.status}`);
  } catch (err) {
    // Never fail a deploy because of IndexNow.
    utils.status.show({ title: 'IndexNow ping failed', summary: String(err) });
  }
};
