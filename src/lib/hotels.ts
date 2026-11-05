/**
 * Hotel pages: each hotel's address, entries and photos. Facts live in
 * src/content/hotels/<locale>/<slug>.md; photos in src/assets/hotels/<slug>/ as
 * NN-<room>.jpeg (01 is the lead photo, also used on the card); the room gives
 * the caption and alt text (hotelsCopy.rooms).
 */
import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { hotelsCopy } from '../content/hotels-page';
import type { Locale } from '../data/business';
import { localize, splitId } from './routes';

export type Hotel = CollectionEntry<'hotels'>;
export type HotelRoom = keyof (typeof hotelsCopy)['en']['rooms'];

export interface HotelPhoto {
  src: ImageMetadata;
  room: HotelRoom;
}

const files = import.meta.glob<ImageMetadata>('../assets/hotels/*/*.jpeg', { eager: true, import: 'default' });

export const hotelSlug = (h: Hotel) => splitId(h.id).slug;
export const hotelPath = (slug: string, locale: Locale) => localize(`/palace-hotels-courchevel/${slug}/`, locale);

/** Guides, the tourist office and press: sources, but not a hotel's own website. */
const thirdParty = /(^|\.)(michelin\.com|courchevel\.com|journaldespalaces\.com|france\.fr)$/;

/** The hotel's own website: its first source that is not a guide or press page (none if only those). */
export const hotelWebsite = (h: Hotel) => h.data.sources.find((u) => !thirdParty.test(new URL(u).hostname));

/** The hotels in one language: palaces first, then five-star hotels, each in their set order. */
export async function getHotels(locale: Locale): Promise<Hotel[]> {
  const rank = { palace: 0, 'five-star': 1 } as const;
  return (await getCollection('hotels'))
    .filter((h) => splitId(h.id).locale === locale)
    .sort((a, b) => rank[a.data.kind] - rank[b.data.kind] || a.data.order - b.data.order);
}

/** The hotel's photos in file order; fails the build on a missing folder or an unknown room. */
export function hotelPhotos(slug: string): HotelPhoto[] {
  const dir = `/hotels/${slug}/`;
  const photos = Object.entries(files)
    .filter(([path]) => path.includes(dir))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src]) => {
      const room = path.match(/\/\d+-([a-z-]+)\.jpeg$/)?.[1] as HotelRoom;
      if (!(room in hotelsCopy.en.rooms)) throw new Error(`Unknown room in ${path}`);
      return { src, room };
    });
  if (!photos.length) throw new Error(`No photos in src/assets${dir}`);
  return photos;
}

/** "Cheval Blanc Courchevel, Courchevel 1850: suite" */
export function hotelAlt(h: Hotel, room: HotelRoom, locale: Locale) {
  return `${h.data.name}, Courchevel 1850${locale === 'fr' ? ' : ' : ': '}${hotelsCopy[locale].rooms[room].toLowerCase()}`;
}
