const MAILERLITE_ACTION = 'https://assets.mailerlite.com/jsonp/2759868/forms/202938457911198866/subscribe';
function errorResponse(status, message) {
  return new Response(`<!doctype html><html lang="hu"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Feliratkozás | Eliza Beauty Salon</title><style>body{margin:0;padding:64px 24px;background:#FAF6F2;color:#2E2626;font:18px/1.6 system-ui,sans-serif}main{max-width:640px;margin:auto}h1{font:normal 40px/1.15 Georgia,serif}a{color:#8E4A5A}</style><main><h1>A feliratkozás nem történt meg.</h1><p>${message}</p><p><a href="/#hirlevel">Vissza az űrlaphoz</a></p></main></html>`, {status,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
}
export function createNewsletterHandler(send = globalThis.fetch) {
 return async function newsletter(request) {
  if(request.method!=='POST'){const r=errorResponse(405,'A feliratkozáshoz használd a főoldali űrlapot.');r.headers.set('Allow','POST');return r;}
  const origin=request.headers.get('origin');
  if(origin&&origin!==new URL(request.url).origin)return errorResponse(403,'Kérlek, a weboldal saját űrlapjáról küldd el a feliratkozást.');
  if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/x-www-form-urlencoded'))return errorResponse(415,'Nem megfelelő űrlapformátum.');
  const raw=await request.text();if(new TextEncoder().encode(raw).length>8192)return errorResponse(413,'Az űrlap adatai túl hosszúak.');
  const values=new URLSearchParams(raw);
  if(values.getAll('website').some(value=>value.trim()))return errorResponse(400,'A spamellenőrzés miatt a kérés nem került továbbításra.');
  const name=(values.get('fields[name]')||'').trim(),email=(values.get('fields[email]')||'').trim();
  if(name.length<2||name.length>120||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return errorResponse(400,'Kérlek, add meg a nevedet és egy érvényes e-mail-címet.');
  if(values.get('newsletter-consent')!=='yes')return errorResponse(400,'A hírlevélhez szükséges a feliratkozási hozzájárulás.');
  if(values.get('ml-submit')!=='1'||values.get('anticsrf')!=='true')return errorResponse(400,'Hiányos feliratkozási kérés. Kérlek, töltsd újra az oldalt.');
  const body=new URLSearchParams({'fields[name]':name,'fields[email]':email,'ml-submit':'1',anticsrf:'true',ajax:'1'});
  try {
   const response=await send(MAILERLITE_ACTION,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},body:body.toString(),redirect:'error',signal:AbortSignal.timeout(10000)});
   if(!response.ok)return errorResponse(502,'A hírlevélküldő most nem fogadta el a kérést. Kérlek, próbáld újra később.');
   const text=await response.text();let data;
   try{data=JSON.parse(text);}catch{const jsonp=text.match(/^\s*mlWebformSubmitted\s*\((\{[\s\S]*\})\)\s*;?\s*$/);if(!jsonp)throw new Error('Unexpected provider response');data=JSON.parse(jsonp[1]);}
   if(data.success!==true)return errorResponse(422,'A MailerLite nem fogadta el a feliratkozást. Ellenőrizd az e-mail-címedet, és próbáld újra.');
   return new Response(null,{status:303,headers:{Location:'/hirlevel-koszonjuk.html','Cache-Control':'no-store'}});
  }catch{return errorResponse(502,'A hírlevélküldő átmenetileg nem érhető el. Kérlek, próbáld újra később.');}
 };
}
export default createNewsletterHandler();
