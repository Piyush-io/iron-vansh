// Real photography. `npm run photos` (runs before dev/build) downloads each source at 3840px into
// public/images/photos/ and records the widths in manifest.json. When a photo has not been
// downloaded yet, the page loads it straight from Unsplash's CDN in the visitor's browser instead.
import fs from 'node:fs';
import path from 'node:path';
import sources from './photo-sources.json';

export type PhotoName = Exclude<keyof typeof sources, '_readme'>;
export const productPhoto = { pms: 'sealink', ventures: 'desk', latius: 'nyc' } as const satisfies Record<string, PhotoName>;

const WIDTHS = [640, 1280, 1920, 2560, 3840];
interface Entry { width: number; height: number; widths: number[] }
interface Source { alt: string; page: string; cdn?: string; id?: string; pexels?: string; file?: string }
let manifest: Record<string, Entry> | undefined;
const read = (): Record<string, Entry> => {
  try { return JSON.parse(fs.readFileSync(path.resolve('public/images/photos/manifest.json'), 'utf8')); } catch { return {}; }
};

// Unsplash and Pexels serve any width of a photo from their CDNs; Unsplash short ids go through its download redirect.
const remote = (s: Source, w: number) =>
  s.pexels ? `https://images.pexels.com/photos/${s.pexels}/pexels-photo-${s.pexels}.jpeg?auto=compress&cs=tinysrgb&w=${w}`
  : s.cdn ? `https://images.unsplash.com/${s.cdn}?auto=format&fit=max&w=${w}&q=80`
  : s.id ? `https://unsplash.com/photos/${s.id}/download?w=${w}` : '';

export function getPhoto(name: PhotoName) {
  manifest ??= read();
  const m = manifest[name];
  const s = sources[name] as Source;
  if (m) {
    const url = (w: number) => `/images/photos/${name}-${w}.webp`;
    return { alt: s.alt, ready: true, width: m.width, height: m.height,
      src: url(m.widths.includes(1920) ? 1920 : m.widths.at(-1)!), srcset: m.widths.map((w) => `${url(w)} ${w}w`).join(', ') };
  }
  const ok = !!(s.cdn || s.id || s.pexels);
  return { alt: s.alt, ready: ok, width: 3840, height: 2560,
    src: ok ? remote(s, 1920) : '', srcset: ok ? WIDTHS.map((w) => `${remote(s, w)} ${w}w`).join(', ') : '' };
}
