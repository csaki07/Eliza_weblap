import {chromium} from 'file:///C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import path from 'node:path';import http from 'node:http';import assert from 'node:assert/strict';
const base=path.resolve('public');
const server=http.createServer((req,res)=>{
 const file=path.resolve(base,decodeURIComponent(new URL(req.url,'http://localhost').pathname.slice(1))||'index.html');
 if(!file.startsWith(base+path.sep)||!fs.existsSync(file)){res.writeHead(404);res.end();return;}
 const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2'};
 res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(fs.readFileSync(file));
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try{
 for(const javaScriptEnabled of [true,false]){
  const context=await browser.newContext({javaScriptEnabled});const page=await context.newPage();
  await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  for(const file of ['index','kezelesek','rolunk','kapcsolat']){
   await page.goto(origin+'/'+file+'.html');
   const form=page.locator('[data-contact-form]');
   await form.locator('[name="name"]').fill('Minta Anna');await form.locator('[name="email"]').fill('anna@example.com');await form.locator('textarea').fill('Minta érdeklődés.');
   const consent=form.locator('[name="privacy-consent"]');
   assert.equal(await consent.isChecked(),false);
   assert.equal(await form.evaluate(f=>f.checkValidity()),false);
   await consent.check();assert.equal(await form.evaluate(f=>f.checkValidity()),true);
   assert.equal(await form.locator('[name="privacy-version"]').inputValue(),'2026-11-01-tervezet');
   assert.equal(await form.locator('a[href="adatkezeles.html"]').count(),1);
  }
  await page.goto(origin+'/index.html');const newsletter=page.locator('[data-mailerlite-form]');
  assert.equal(await newsletter.locator('[name="newsletter-consent"]').isChecked(),false);
  await context.close();
 }
 const page=await browser.newPage();
 for(const width of [1440,375]){
  await page.setViewportSize({width,height:900});await page.goto(origin+'/adatkezeles.html');await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('main h1').count(),1);
  assert.equal(await page.locator('main h2').count(),8);
  assert(await page.locator('.privacy-draft').isVisible());
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  fs.mkdirSync('.webprojekt/qa',{recursive:true});await page.screenshot({path:'.webprojekt/qa/privacy-'+width+'.png',fullPage:true});
 }
 console.log('OK: four contact forms require unchecked consent with and without JS; newsletter stays separate; privacy page fits desktop/mobile. No forms submitted.');
}finally{await browser.close();server.close();}
