import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = process.cwd();
const out = path.join(root, '.webprojekt', 'qa');
await fs.mkdir(out, { recursive: true });
const requested = process.argv.slice(2);
const files = requested.length ? requested : ['index.html', ...(await fs.readdir(root)).filter(f => /^koncepcio-.*\.html$/.test(f)).sort()];
if (!requested.length && files.length !== 4) throw new Error(`Expected navigator and three concepts, found ${files.length}`);
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const report = [];
try {
  for (const file of files) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(pathToFileURL(path.join(root, file)).href, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      const imgs = [...document.images];
      for (const img of imgs) img.loading = 'eager';
      await Promise.all(imgs.map(img => img.decode().catch(() => {})));
    });
    const sizes = [];
    for (const width of [1440, 768, 375]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1000 : 812 });
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 20)); }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(450);
      const result = await page.evaluate(() => {
        const imgs = [...document.images];
        const ids = [...document.querySelectorAll('[id]')].map(e => e.id);
        const anchors = [...document.querySelectorAll('a[href^="#"]')].map(e => e.getAttribute('href')).filter(h => h !== '#');
        return {
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          brokenImages: imgs.filter(i => !i.complete || !i.naturalWidth).map(i => i.getAttribute('src')),
          missingAnchors: anchors.filter(h => !document.getElementById(decodeURIComponent(h.slice(1)))),
          duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i),
          h1: document.querySelectorAll('h1').length,
          h1Size: parseFloat(getComputedStyle(document.querySelector('h1')).fontSize),
          lang: document.documentElement.lang,
          unlabeledInputs: [...document.querySelectorAll('input:not([type="hidden"]),textarea,select')].filter(el => !el.labels?.length && !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby')).map(el => el.name || el.id || el.type),
          fonts: document.fonts.check('500 24px "Cormorant Garamond"') && document.fonts.check('400 16px "Jost"')
        };
      });
      sizes.push({ width, ...result });
      if (width !== 768) await page.screenshot({ path: path.join(out, file.replace('.html', `-${width}.png`)), fullPage: true });
    }
    const localLinks = await page.locator('a[href]').evaluateAll(es => es.map(e => e.getAttribute('href')).filter(h => !/^(#|https?:|mailto:|tel:|javascript:)/.test(h)));
    const missingFiles = [];
    for (const link of localLinks) {
      try { await fs.access(path.resolve(root, decodeURIComponent(link.split('#')[0]))); } catch { missingFiles.push(link); }
    }
    report.push({ file, title: await page.title(), errors, missingFiles, sizes });
    await page.close();
  }
} finally { await browser.close(); }
await fs.writeFile(path.join(out, 'report.json'), JSON.stringify(report, null, 2));
const failed = report.some(r => r.errors.length || r.missingFiles.length || r.sizes.some(s => s.overflow || s.brokenImages.length || s.missingAnchors.length || s.duplicateIds.length || s.unlabeledInputs.length || s.h1 !== 1 || s.h1Size < 40 || s.lang !== 'hu'));
console.log(JSON.stringify(report, null, 2));
process.exitCode = failed ? 1 : 0;
