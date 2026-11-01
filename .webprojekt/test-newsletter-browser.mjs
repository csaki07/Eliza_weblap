import {chromium} from 'file:///C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import path from 'node:path';import http from 'node:http';import assert from 'node:assert/strict';
import {createNewsletterHandler} from '../netlify/functions/newsletter.mjs';
let sent=[];
const handle=createNewsletterHandler(async(url,options)=>{sent.push({url,body:options.body});return Response.json({success:true});});
const server=http.createServer(async(req,res)=>{
 const address=server.address();const url=new URL(req.url,'http://127.0.0.1:'+address.port);
 if(url.pathname==='/.netlify/functions/newsletter'){
  const chunks=[];for await(const c of req)chunks.push(c);
  const response=await handle(new Request(url,{method:req.method,headers:req.headers,body:Buffer.concat(chunks)}));res.writeHead(response.status,Object.fromEntries(response.headers));res.end(await response.text());return;
 }
 const file=path.resolve('public',url.pathname.slice(1)||'index.html');if(!file.startsWith(path.resolve('public')+path.sep)||!fs.existsSync(file)){res.writeHead(404);res.end();return;}
 const types={'.html':'text/html','.js':'text/javascript','.webp':'image/webp','.woff2':'font/woff2','.svg':'image/svg+xml'};
 let data=fs.readFileSync(file);
 // Test fixture only: allow the otherwise intentionally blocked local preview submission.
 if(file.endsWith('site.js'))data=Buffer.from(data.toString().replaceAll("location.protocol==='file:'||['localhost','127.0.0.1'].includes(location.hostname)",'false'));
 res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try{for(const javascript of [true,false]){
 const c=await b.newContext({javaScriptEnabled:javascript});const p=await c.newPage();
 await p.goto('http://127.0.0.1:'+server.address().port+'/index.html');
 await p.locator('#newsletter-name').fill('Minta Anna');await p.locator('#newsletter-email').fill('anna@example.com');await p.locator('[name="newsletter-consent"]').check();
 await Promise.all([p.waitForURL('**/hirlevel-koszonjuk.html'),p.locator('#newsletter-form button').click()]);
 assert.equal(new URLSearchParams(sent.at(-1).body).get('fields[email]'),'anna@example.com');console.log('OK: native POST and accepted-only confirmation with JavaScript '+javascript+'; MailerLite mocked.');await c.close();
}}finally{await b.close();server.close();}
