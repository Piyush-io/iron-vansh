// Captures reference pages listed in design/refs/targets.json: JPEG screenshots (desktop 1440, mobile 390)
// and, where asked, the rendered HTML. Run by .github/workflows/refs.yml (needs open internet).
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'design/refs');
const { pages } = JSON.parse(await fs.readFile(path.join(dir, 'targets.json'), 'utf8'));
const browser = await chromium.launch();
for (const t of pages) {
  for (const [label, viewport, mobile] of [['desktop', { width: 1440, height: 900 }, false], ['mobile', { width: 390, height: 844 }, true]]) {
    if (t.shots === false && label === 'mobile') continue;
    const ctx = await browser.newContext({ viewport, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1,
      userAgent: mobile ? undefined : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36' });
    const page = await ctx.newPage();
    try {
      await page.goto(t.url, { waitUntil: 'networkidle', timeout: 60_000 }).catch(() => page.goto(t.url, { waitUntil: 'load', timeout: 60_000 }));
      await page.waitForTimeout(1500);
      // scroll through so lazy content and scroll animations render
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < Math.min(h, 14000); y += 600) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(150); }
      await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(800);
      if (t.shots !== false) {
        const full = await page.evaluate(() => document.documentElement.scrollHeight);
        await page.screenshot({ path: path.join(dir, `${t.name}-${label}.jpg`), type: 'jpeg', quality: 70,
          fullPage: full <= 12000, clip: full > 12000 ? { x: 0, y: 0, width: viewport.width, height: 12000 } : undefined });
      }
      if (t.html && label === 'desktop') await fs.writeFile(path.join(dir, `${t.name}.html`), await page.content());
      console.log(`✓ ${t.name} ${label}`);
    } catch (e) { console.warn(`✗ ${t.name} ${label}: ${e.message.split('\n')[0]}`); }
    await ctx.close();
  }
}
await browser.close();
