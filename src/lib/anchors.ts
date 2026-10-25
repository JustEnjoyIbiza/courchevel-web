/** In-page anchors shared by the lists on content pages. */

/** 'Le Chalet de Pierres' -> 'le-chalet-de-pierres' */
export const anchor = (name: string) =>
  name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Id of the heading of the n-th highlights list on a page (0-based). */
export const highlightsTitleId = (index: number) => (index ? `highlights-title-${index + 1}` : 'highlights-title');
