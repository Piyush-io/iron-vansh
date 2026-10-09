// Real photography, fetched at 3840px by `npm run photos` (runs automatically before dev/build)
// from the sources in photo-sources.json, into public/images/photos/ with a manifest of the
// widths actually available. Until a photo has been fetched its slot renders a neutral placeholder.
import fs from 'node:fs';
import path from 'node:path';
import sources from './photo-sources.json';

export type PhotoName = Exclude<keyof typeof sources, '_readme'>;
export const productPhoto = { pms: 'mumbai', ventures: 'glass', latius: 'giftcity' } as const satisfies Record<string, PhotoName>;

interface Entry { width: number; height: number; widths: number[] }
let manifest: Record<string, Entry> | undefined;
const read = (): Record<string, Entry> => {
  try { return JSON.parse(fs.readFileSync(path.resolve('public/images/photos/manifest.json'), 'utf8')); } catch { return {}; }
};

export function getPhoto(name: PhotoName) {
  manifest ??= read();
  const m = manifest[name];
  const src = sources[name];
  const url = (w: number) => `/images/photos/${name}-${w}.webp`;
  return {
    alt: src.alt,
    page: src.page,
    ready: !!m,
    width: m?.width ?? 3840,
    height: m?.height ?? 2160,
    src: m ? url(m.widths.includes(1920) ? 1920 : m.widths.at(-1)!) : '',
    srcset: m ? m.widths.map((w) => `${url(w)} ${w}w`).join(', ') : '',
  };
}
