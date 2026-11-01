import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const origin = process.argv[2] || 'http://127.0.0.1:8765';
const browser = await chromium.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true });
const report=[];
try {
 for(const file of ['index.html','kezelesek.html','rolunk.html','kapcsolat.html','adatkezeles.html','koszonjuk.html','hirlevel-koszonjuk.html']) {
  const page=await browser.newPage();const errors=[];const failed=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith(origin)&&r.status()>=400)failed.push(r.url());});
  await page.goto(origin+'/'+file,{waitUntil:'networkidle'});
  await page.evaluate(async()=>{for(const img of document.images)img.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
  const sizes=[];
  for(const width of [1440,870,375]) {
   await page.setViewportSize({width,height:900});
   await page.waitForTimeout(120);
   await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
   await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
   sizes.push(await page.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),h1:document.querySelectorAll('h1').length})));
  }
  const links=await page.locator('a[href]').evaluateAll(es=>es.map(e=>e.href).filter(u=>u.startsWith(location.origin)));
  for(const url of new Set(links)){const response=await page.request.get(url);if(!response.ok())failed.push(url);const hash=new URL(url).hash;if(hash){const html=await response.text();if(!html.includes('id="'+decodeURIComponent(hash.slice(1))+'"'))failed.push('Missing anchor '+url);}}
  report.push({file,errors,failed,sizes});await page.close();
 }
} finally {await browser.close();}
await fs.mkdir('.webprojekt/qa',{recursive:true});await fs.writeFile('.webprojekt/qa/public-verification.json',JSON.stringify(report,null,2));
const bad=report.some(r=>r.errors.length||r.failed.length||r.sizes.some(s=>s.overflow||s.brokenImages.length||s.h1!==1));
console.log(JSON.stringify(report,null,2));process.exitCode=bad?1:0;
