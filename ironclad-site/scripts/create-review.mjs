import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { resolve, dirname, relative, join } from 'node:path';

// A file-based review copy works even when the environment disallows local servers.
const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const preview = join(root, 'design', 'preview');
const css = (await Promise.all((await readdir(join(dist, '_astro'))).filter(name => name.endsWith('.css')).map(name => readFile(join(dist, '_astro', name), 'utf8')))).join('\n');
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith('.html')) {
      const target = join(preview, relative(dist, path));
      const from = dirname(target);
      let html = await readFile(path, 'utf8');
      html = html.replace(/<link rel="stylesheet"[^>]*>/g, () => `<style>${css}</style>`);
      html = html.replace(/srcset="([^"]*)"/g, (_, candidates) => `srcset="${candidates.split(', ').map(candidate => candidate.replace(/^\/images\/([^ ]+)/, (match, name) => relative(from, join(root, 'public', 'images', name)))).join(', ')}"`);
      html = html.replace(/(href|src|data-fallback)="\/(?!\/)([^"#]*)(#[^"]*)?"/g, (match, attribute, url, hash = '') => {
        const asset = url.startsWith('images/') ? join(root, 'public', url)
          : url.startsWith('_astro/') ? join(dist, url)
          : join(preview, url.endsWith('.html') ? url : join(url, 'index.html'));
        return `${attribute}="${relative(from, asset)}${hash}"`;
      });
      await mkdir(from, { recursive: true });
      await writeFile(target, html);
    }
  }
}
await walk(dist);
console.log(`Review copy: ${join(preview, 'index.html')}`);
