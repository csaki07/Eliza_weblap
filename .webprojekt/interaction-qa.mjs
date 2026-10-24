import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const files = (await fs.readdir('.')).filter(f => /^koncepcio-.*\.html$/.test(f)).sort();
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const report = [];
function assert(test, message) { if (!test) throw new Error(message); }
try {
  for (const file of files) {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' });
    const posts = [];
    page.on('request', r => { if (r.method() === 'POST') posts.push(r.url()); });
    await page.goto(pathToFileURL(path.resolve(file)).href, { waitUntil: 'networkidle' });
    const menu = page.locator('button[aria-expanded]').first();
    await menu.click();
    assert(await menu.getAttribute('aria-expanded') === 'true', `${file}: menu did not open`);
    await page.keyboard.press('Escape');
    assert(await menu.getAttribute('aria-expanded') === 'false', `${file}: Escape did not close menu`);
    const faq = page.locator('details').filter({ has: page.locator('summary', { hasText: 'Időpont nélkül' }) }).first();
    await faq.locator('summary').click();
    assert(await faq.evaluate(el => el.open), `${file}: FAQ did not open`);
    const statuses = [];
    for (const form of await page.locator('form').all()) {
      await form.locator('button[type="submit"]').click();
      assert(!await form.evaluate(el => el.checkValidity()), `${file}: empty form accepted`);
      for (const field of await form.locator('input,textarea').all()) {
        const type = await field.getAttribute('type');
        if (type === 'checkbox') await field.check();
        else if (type === 'email') await field.fill('demo@example.invalid');
        else if (await field.evaluate(el => el.tagName === 'TEXTAREA')) await field.fill('Kizárólag próbaüzenet az űrlap működésének ellenőrzéséhez.');
        else await field.fill('Teszt Vendég');
      }
      await form.locator('button[type="submit"]').click();
      const status = await form.locator('[role="status"]').innerText();
      assert(/bemutató/i.test(status) && /nem/i.test(status), `${file}: missing honest demo status`);
      statuses.push(status);
    }
    const needs = page.locator('[data-need]');
    if (await needs.count()) {
      await needs.first().click();
      assert(await needs.first().getAttribute('aria-current') === 'true', `${file}: need selection inactive`);
      assert(await page.locator('.service.selected').count() === 1, `${file}: service selection inactive`);
    }
    assert(posts.length === 0, `${file}: unexpected POST request`);
    report.push({ file, menu: 'pass', escape: 'pass', faq: 'pass', emptyValidation: 'pass', demoForms: statuses, posts });
    await page.close();
    const offline = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await offline.route('https://**/*', r => r.abort());
    const errors = [];
    offline.on('pageerror', e => errors.push(e.message));
    await offline.goto(pathToFileURL(path.resolve(file)).href, { waitUntil: 'load' });
    const fallback = await offline.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth + 1, headingSize: parseFloat(getComputedStyle(document.querySelector('h1')).fontSize) }));
    assert(!fallback.overflow && fallback.headingSize >= 40 && !errors.length, `${file}: external CSS/font fallback failed`);
    report.at(-1).withoutExternalServices = fallback;
    await offline.close();
  }
} finally { await browser.close(); }
await fs.writeFile('.webprojekt/qa/interactions.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
