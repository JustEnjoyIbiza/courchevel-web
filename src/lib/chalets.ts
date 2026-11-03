/**
 * Chalet pages: each chalet's address and its photos. Photos live in
 * src/assets/chalets/<slug>/ as NN-<room>.jpeg (01 is the lead photo, also used
 * on the card); the room gives the caption and alt text (chaletsCopy.rooms).
 */
import type { ImageMetadata } from 'astro';
import { chalets, chaletsCopy, type Chalet } from '../content/chalets';
import type { Locale } from '../data/business';
import { anchor } from './anchors';
import { localize } from './routes';

export const ROOMS = [
  'exterior', 'view', 'terrace', 'living', 'lounge', 'dining', 'kitchen', 'bar', 'bedroom', 'kids', 'bathroom',
  'pool', 'spa', 'hot-tub', 'sauna', 'hammam', 'massage', 'gym', 'cinema', 'games', 'ski-room',
] as const;
export type Room = (typeof ROOMS)[number];

export interface ChaletPhoto {
  src: ImageMetadata;
  room: Room;
}

const files = import.meta.glob<ImageMetadata>('../assets/chalets/*/*.jpeg', { eager: true, import: 'default' });

export const chaletSlug = (c: Chalet) => anchor(c.name);
export const chaletPath = (c: Chalet, locale: Locale) => localize(`/services/chalets/${chaletSlug(c)}/`, locale);
export const chaletBySlug = (slug: string) => chalets.find((c) => chaletSlug(c) === slug);

/** The chalet's photos in file order; fails the build on a missing folder or an unknown room. */
export function chaletPhotos(c: Chalet): ChaletPhoto[] {
  const dir = `/chalets/${chaletSlug(c)}/`;
  const photos = Object.entries(files)
    .filter(([path]) => path.includes(dir))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src]) => {
      const room = path.match(/\/\d+-([a-z-]+)\.jpeg$/)?.[1] as Room;
      if (!ROOMS.includes(room)) throw new Error(`Unknown room in ${path}`);
      return { src, room };
    });
  if (!photos.length) throw new Error(`No photos in src/assets${dir}`);
  return photos;
}

/** "Chalet Neve, Courchevel 1850: hot tub" */
export function photoAltText(c: Chalet, room: Room, locale: Locale) {
  const copy = chaletsCopy[locale];
  return `${c.name}, ${copy.areas[c.area]}${locale === 'fr' ? ' : ' : ': '}${copy.rooms[room].toLowerCase()}`;
}
