/**
 * Cloudinary as the photo library. The site still serves photos through the
 * Astro image pipeline (AVIF/WebP, sizes set at build), so pages stay fast and
 * the CSP stays 'self'. This script keeps src/assets/photos and a Cloudinary
 * folder in step:
 *
 *   npm run cloudinary -- upload   send local photos to Cloudinary (skips ones already there)
 *   npm run cloudinary -- pull     download photos added in Cloudinary (never overwrites)
 *   npm run cloudinary -- list     show what is in the Cloudinary folder
 *
 * Keys come from .env (see .env.example). Pulled photos still need a key in
 * src/data/photos.ts before a page can use them.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import { extname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const PHOTO_DIR = fileURLToPath(new URL('../src/assets/photos/', import.meta.url));
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

/** Cloudinary signature: sorted params as k=v joined by &, then the secret, SHA-1. */
export function sign(params, secret) {
  const toSign = Object.keys(params)
    .filter((k) => params[k] !== undefined && params[k] !== '')
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&');
  return createHash('sha1').update(toSign + secret).digest('hex');
}

/** Public ID for a local file: folder plus the file name without extension. */
export function publicIdFor(file, folder) {
  return `${folder}/${basename(file, extname(file))}`;
}

function config() {
  const { CLOUDINARY_CLOUD_NAME: cloud, CLOUDINARY_API_KEY: key, CLOUDINARY_API_SECRET: secret } = process.env;
  const missing = Object.entries({ CLOUDINARY_CLOUD_NAME: cloud, CLOUDINARY_API_KEY: key, CLOUDINARY_API_SECRET: secret })
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length) {
    console.error(`Missing in .env: ${missing.join(', ')} (see .env.example).`);
    process.exit(1);
  }
  return { cloud, key, secret, folder: process.env.CLOUDINARY_FOLDER || 'courchevel' };
}

async function localPhotos() {
  return (await readdir(PHOTO_DIR)).filter((f) => IMAGE_EXT.has(extname(f).toLowerCase())).sort();
}

async function upload(c) {
  for (const file of await localPhotos()) {
    // overwrite=false: an existing public ID comes back with existing: true and is left alone.
    const params = {
      public_id: publicIdFor(file, c.folder),
      asset_folder: c.folder,
      overwrite: 'false',
      timestamp: Math.floor(Date.now() / 1000),
    };
    const form = new FormData();
    for (const [k, v] of Object.entries(params)) form.append(k, String(v));
    form.append('api_key', c.key);
    form.append('signature', sign(params, c.secret));
    form.append('file', new Blob([await readFile(join(PHOTO_DIR, file))]), file);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${c.cloud}/image/upload`, { method: 'POST', body: form });
    const body = await res.json();
    if (!res.ok) throw new Error(`${file}: ${body.error?.message ?? res.status}`);
    console.log(`${body.existing ? 'already there' : 'uploaded'}  ${file} -> ${body.public_id}`);
  }
}

async function remotePhotos(c) {
  const auth = { Authorization: `Basic ${Buffer.from(`${c.key}:${c.secret}`).toString('base64')}` };
  const base = `https://api.cloudinary.com/v1_1/${c.cloud}/resources`;
  // Dynamic-folder accounts (the default since 2024) list by asset folder; older
  // fixed-folder accounts by public ID prefix.
  let res = await fetch(`${base}/by_asset_folder?asset_folder=${encodeURIComponent(c.folder)}&max_results=500`, { headers: auth });
  if (!res.ok) res = await fetch(`${base}/image/upload?prefix=${encodeURIComponent(c.folder + '/')}&max_results=500`, { headers: auth });
  const body = await res.json();
  if (!res.ok) throw new Error(body.error?.message ?? `HTTP ${res.status}`);
  return body.resources.filter((r) => r.resource_type === 'image');
}

async function list(c) {
  const items = await remotePhotos(c);
  for (const r of items) console.log(`${r.public_id}.${r.format}  ${r.width}x${r.height}`);
  console.log(`${items.length} photo(s) in "${c.folder}".`);
}

async function exists(path) {
  return access(path).then(() => true, () => false);
}

async function pull(c) {
  const added = [];
  for (const r of await remotePhotos(c)) {
    const file = `${basename(r.public_id)}.${r.format === 'jpg' ? 'jpeg' : r.format}`;
    const dest = join(PHOTO_DIR, file);
    if (await exists(dest)) continue;
    const res = await fetch(r.secure_url);
    if (!res.ok) throw new Error(`${r.public_id}: HTTP ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    added.push(file);
    console.log(`downloaded  ${file}`);
  }
  console.log(added.length ? `\nAdd these to src/data/photos.ts to use them on a page.` : 'Nothing new to download.');
}

const commands = { upload, pull, list };

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const run = commands[process.argv[2]];
  if (!run) {
    console.error('Usage: npm run cloudinary -- upload | pull | list');
    process.exit(1);
  }
  run(config()).catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
