import assert from 'node:assert/strict';
import {createNewsletterHandler} from '../netlify/functions/newsletter.mjs';
let calls=[];
const handler=createNewsletterHandler(async(url,options)=>{calls.push({url,options});return Response.json({success:true});});
const endpoint='https://elizahomework.netlify.app/.netlify/functions/newsletter';
const fields={'fields[name]':'Minta Anna','fields[email]':'anna@example.com','newsletter-consent':'yes','ml-submit':'1','anticsrf':'true',website:''};
const request=(overrides={},headers={})=>new Request(endpoint,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded',Origin:'https://elizahomework.netlify.app',...headers},body:new URLSearchParams({...fields,...overrides})});
assert.equal((await handler(new Request(endpoint))).status,405);
const valid=await handler(request());assert.equal(valid.status,303);assert.equal(valid.headers.get('location'),'/hirlevel-koszonjuk.html');assert.equal(calls.length,1);assert.equal(new URLSearchParams(calls[0].options.body).get('fields[email]'),'anna@example.com');
for(const [overrides,headers,status] of [[{website:'bot.invalid'},{},400],[{'newsletter-consent':''},{},400],[{'fields[email]':'wrong'},{},400],[{'fields[name]':'  '},{},400],[{},{Origin:'https://other.invalid'},403],[{},{'Content-Type':'application/json'},415],[{'fields[name]':'a'.repeat(9000)},{},413]]){assert.equal((await handler(request(overrides,headers))).status,status);assert.equal(calls.length,1,'Rejected requests must not reach MailerLite');}
assert.equal((await createNewsletterHandler(async()=>Response.json({success:false}))(request())).status,422);
assert.equal((await createNewsletterHandler(async()=>new Response('Unavailable',{status:503}))(request())).status,502);
assert.equal((await createNewsletterHandler(async()=>{throw Error('offline')})(request())).status,502);
assert.equal((await createNewsletterHandler(async()=>new Response('<html>Error</html>'))(request())).status,502);
console.log('OK: accepted provider response; server honeypot, consent and fields; no forwarding of rejected data; upstream errors do not claim success. All provider requests mocked.');
