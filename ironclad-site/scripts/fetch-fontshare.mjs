// Downloads Fontshare fonts (ITF Free Font License: free for commercial use, web embedding allowed)
// listed in design/font-candidates/fonts.json into design/font-candidates/<slug>-<weight>[-italic].woff2.
// Runs on GitHub's runners (.github/workflows/refs.yml); the build environment cannot reach fontshare.com.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'design/font-candidates');
const { fonts } = JSON.parse(await fs.readFile(path.join(dir, 'fonts.json'), 'utf8'));
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
for (const f of fonts) {
  const q = `${f.slug}@${f.weights.join(',')}${f.italic ? ',' + f.weights.map((w) => w + 1).join(',') : ''}`;
  try {
    const css = await (await fetch(`https://api.fontshare.com/v2/css?f[]=${q}&display=swap`, { headers: { 'user-agent': UA } })).text();
    const faces = [...css.matchAll(/@font-face\s*{([^}]*)}/g)].map((m) => m[1]);
    let n = 0;
    for (const face of faces) {
      const url = face.match(/url\(['"]?([^'")]+\.woff2)['"]?\)/)?.[1];
      const weight = face.match(/font-weight:\s*(\d+)/)?.[1];
      const italic = /font-style:\s*italic/.test(face);
      if (!url || !weight) continue;
      const res = await fetch(url.startsWith('//') ? 'https:' + url : url, { headers: { 'user-agent': UA } });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      await fs.writeFile(path.join(dir, `${f.slug}-${weight}${italic ? '-italic' : ''}.woff2`), Buffer.from(await res.arrayBuffer()));
      n++;
    }
    console.log(`✓ ${f.slug}: ${n} files`);
  } catch (e) { console.warn(`✗ ${f.slug}: ${e.message}`); }
}
