#!/usr/bin/env node
// Downloads the real photographs listed in src/data/photo-sources.json at 3840px and
// writes the responsive WebP set + manifest.json into public/images/photos/.
//
//   npm run photos                 fetch anything missing
//   npm run photos -- --force      re-download everything
//   npm run photos -- dawn mumbai  only these
//   --soft                         never fail the build (used by predev/prebuild)
//   --scout                        save the shortlist in photo-candidates.json at 1280px into design/photo-scout/
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

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const get = (url, accept = 'image/avif,image/webp,image/*,*/*;q=0.8') =>
  fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(90_000), headers: { 'user-agent': UA, accept } });
const cdnUrl = (base, w) => base.includes('images.pexels.com')
  ? `${base}?auto=compress&cs=tinysrgb&w=${w}`
  : `${base}${base.includes('?') ? '&' : '?'}auto=format&fit=max&w=${w}&q=85&fm=jpg`;

// Turn a short unsplash.com id into its images.unsplash.com address, trying three routes.
async function resolve(s) {
  if (s.cdn) return `https://images.unsplash.com/${s.cdn}`;
  if (s.pexels) return `https://images.pexels.com/photos/${s.pexels}/pexels-photo-${s.pexels}.jpeg`;
  const errors = [];
  try {
    const r = await get(`https://unsplash.com/napi/photos/${s.id}`, 'application/json');
    if (r.ok) { const j = await r.json(); if (j?.urls?.raw) return j.urls.raw.split('?')[0]; }
    errors.push(`napi HTTP ${r.status}`);
  } catch (e) { errors.push(`napi ${e.cause?.code || e.message}`); }
  try {
    const r = await get(`https://unsplash.com/photos/${s.id}/download?w=640`);
    if (r.ok && r.url.includes('images.unsplash.com')) return r.url.split('?')[0];
    errors.push(`download HTTP ${r.status}`);
  } catch (e) { errors.push(`download ${e.cause?.code || e.message}`); }
  try {
    const r = await get(s.page || `https://unsplash.com/photos/${s.id}`, 'text/html');
    const m = r.ok && (await r.text()).match(/https:\/\/images\.unsplash\.com\/photo-[\w-]+/);
    if (m) return m[0];
    errors.push(`page HTTP ${r.status}`);
  } catch (e) { errors.push(`page ${e.cause?.code || e.message}`); }
  throw new Error(errors.join('; '));
}

async function load(s, width = 3840) {
  if (s.file) return { buf: await fs.readFile(path.resolve(root, s.file)) };
  const base = await resolve(s);
  const res = await get(cdnUrl(base, width));
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${res.url}`);
  if (!(res.headers.get('content-type') || '').startsWith('image/')) throw new Error(`not an image (${res.headers.get('content-type')})`);
  return { buf: Buffer.from(await res.arrayBuffer()), cdn: base.includes('images.unsplash.com') ? base.replace('https://images.unsplash.com/', '') : undefined };
}

if (args.includes('--scout')) {
  const list = JSON.parse(await fs.readFile(path.join(root, 'src/data/photo-candidates.json'), 'utf8').catch(() => '{}'));
  delete list._readme;
  const dir = path.join(root, 'design/photo-scout');
  await fs.mkdir(dir, { recursive: true });
  for (const [name, s] of Object.entries(list)) {
    try {
      const { buf, cdn } = await load(s, 1280);
      const meta = await sharp(buf).metadata();
      await sharp(buf).rotate().resize({ width: 1280, withoutEnlargement: true }).jpeg({ quality: 78 }).toFile(path.join(dir, `${name}.jpg`));
      console.log(`✓ scout ${name} (${meta.width}x${meta.height}) ${cdn}`);
    } catch (e) { console.warn(`✗ scout ${name}: ${e.message}`); }
  }
  process.exit(0);
}

let failed = 0;
for (const [name, s] of Object.entries(sources)) {
  if (only.length && !only.includes(name)) continue;
  const have = manifest[name] && (await fs.stat(path.join(outDir, `${name}-${manifest[name].widths.at(-1)}.webp`)).catch(() => null));
  if (have && !force) { console.log(`✓ ${name} (cached)`); continue; }
  try {
    const { buf, cdn } = await load(s);
    const meta = await sharp(buf).rotate().metadata();
    const top = Math.min(meta.autoOrient?.width ?? meta.width, 3840);
    const widths = [...new Set([...WIDTHS.filter((w) => w < top), top])];
    for (const w of widths) {
      await sharp(buf).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: w >= 2560 ? 78 : 82, effort: 4 }).toFile(path.join(outDir, `${name}-${w}.webp`));
    }
    const h = Math.round(top * ((meta.autoOrient?.height ?? meta.height) / (meta.autoOrient?.width ?? meta.width)));
    manifest[name] = { width: top, height: h, widths, ...(cdn ? { cdn } : {}) };
    console.log(`✓ ${name}: ${widths.join(', ')}px${top < 3840 ? '  (source is smaller than 4K)' : ''}`);
  } catch (e) {
    failed++;
    console.warn(`✗ ${name}: ${e.cause?.code || e.message}`);
    if (e.cause) console.warn(`  ${e.cause.message || e.cause}`);
  }
}
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
if (failed) {
  console.warn(`\n${failed} photo(s) could not be fetched. The site still builds; those photos load from Unsplash's CDN in the browser instead. Re-run \`npm run photos\` to make them local.`);
  if (!soft) process.exit(1);
}
