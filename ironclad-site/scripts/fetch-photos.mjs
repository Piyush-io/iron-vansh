#!/usr/bin/env node
// Downloads the real photographs listed in src/data/photo-sources.json at 3840px and
// writes the responsive WebP set + manifest.json into public/images/photos/.
//
//   npm run photos                 fetch anything missing
//   npm run photos -- --force      re-download everything
//   npm run photos -- dawn mumbai  only these
//   --soft                         never fail the build (used by predev/prebuild)
//
// To use your own photograph instead, add  "file": "path/to/photo.jpg"  to its entry.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public/images/photos');
const sources = JSON.parse(await fs.readFile(path.join(root, 'src/data/photo-sources.json'), 'utf8'));
delete sources._readme;

const args = process.argv.slice(2);
const soft = args.includes('--soft');
const force = args.includes('--force');
const only = args.filter((a) => !a.startsWith('--'));
const WIDTHS = [640, 1280, 1920, 2560, 3840];

await fs.mkdir(outDir, { recursive: true });
const manifestPath = path.join(outDir, 'manifest.json');
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8').catch(() => '{}'));

const urlFor = (s) =>
  s.cdn ? `https://images.unsplash.com/${s.cdn}?auto=format&fit=max&w=3840&q=85&fm=jpg`
  : `https://unsplash.com/photos/${s.id}/download?force=true&w=3840`;

async function load(name, s) {
  if (s.file) return fs.readFile(path.resolve(root, s.file));
  const res = await fetch(urlFor(s), { redirect: 'follow', signal: AbortSignal.timeout(90_000), headers: { 'user-agent': 'ironclad-site-photo-fetch' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (!(res.headers.get('content-type') || '').startsWith('image/')) throw new Error(`not an image (${res.headers.get('content-type')})`);
  return Buffer.from(await res.arrayBuffer());
}

let failed = 0;
for (const [name, s] of Object.entries(sources)) {
  if (only.length && !only.includes(name)) continue;
  const have = manifest[name] && (await fs.stat(path.join(outDir, `${name}-${manifest[name].widths.at(-1)}.webp`)).catch(() => null));
  if (have && !force) { console.log(`✓ ${name} (cached)`); continue; }
  try {
    const buf = await load(name, s);
    const meta = await sharp(buf).rotate().metadata();
    const top = Math.min(meta.autoOrient?.width ?? meta.width, 3840);
    const widths = [...new Set([...WIDTHS.filter((w) => w < top), top])];
    for (const w of widths) {
      await sharp(buf).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: w >= 2560 ? 78 : 82, effort: 4 }).toFile(path.join(outDir, `${name}-${w}.webp`));
    }
    const h = Math.round(top * ((meta.autoOrient?.height ?? meta.height) / (meta.autoOrient?.width ?? meta.width)));
    manifest[name] = { width: top, height: h, widths };
    console.log(`✓ ${name}: ${widths.join(', ')}px${top < 3840 ? '  (source is smaller than 4K)' : ''}`);
  } catch (e) {
    failed++;
    console.warn(`✗ ${name}: ${e.cause?.code || e.message}`);
  }
}
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
if (failed) {
  console.warn(`\n${failed} photo(s) could not be fetched. The site still builds; those slots render as a neutral placeholder until you run \`npm run photos\` somewhere with open internet access.`);
  if (!soft) process.exit(1);
}
