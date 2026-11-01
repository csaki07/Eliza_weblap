# Főoldali hírlevél — MailerLite

A meglévő főoldali design változatlan; az űrlap a felhasználó által megadott MailerLite-űrlaphoz kapcsolódik.

- Megosztott űrlap: https://preview.mailerlite.io/forms/2759868/202938457911198866/share
- Fiókazonosító: 2759868; űrlapazonosító: 202938457911198866.
- A megosztott HTML eredeti beküldési címe dashboard.mailerlite.com; ennek átirányított, tényleges fogadója az assets.mailerlite.com/jsonp/2759868/forms/202938457911198866/subscribe végpont.
- E-mail mező: `fields[email]`; név: a MailerLite alapértelmezett `fields[name]` mezője. A megosztott űrlapon jelenleg csak e-mail mező látszik; ha a MailerLite-szerkesztőben is látni szeretnéd a nevet, add hozzá a Name mezőt is.
- Rejtett szolgáltatói mezők: `ml-submit=1`, `anticsrf=true`.

## Szerveroldali spamcsapda

A főoldal a `/.netlify/functions/newsletter` címre POST-ol. A `netlify/functions/newsletter.mjs` ellenőrzi az elrejtett `website` honeypot mezőt, a hozzájárulást, a név és e-mail alapformátumát, a tartalomtípust és a kérésméretet. Elutasított kérésnél egyáltalán nem hívja meg a MailerLite-ot. A `website` mező a botoknak szánt csapda; a látogatóknak nem kell kitölteniük.

A funkció kizárólag a rögzített MailerLite-űrlaphoz továbbít, URL-kódolt POST-tal. Nem kell API-kulcs; a funkció nem tárol feliratkozói adatot és nem naplózza a nevet/e-mailt. A végső feliratkozói listát és státuszt a MailerLite kezeli. Csak `success: true` szolgáltatói válasz után irányít a `public/hirlevel-koszonjuk.html` oldalra. Ez noindex és nincs a sitemapben. Hiba esetén nem mutat sikerüzenetet.

A honeypot a weboldal saját beküldési útvonalát védi. Nem akadályozhatja meg, hogy valaki közvetlenül a nyilvános MailerLite-végpontot támadja; a szolgáltatói oldalon double opt-in és szükség esetén reCAPTCHA adhat további védelmet. Ha később reCAPTCHA-t kapcsolsz be a MailerLite-űrlapon, a kapcsolódó kódot is hozzá kell igazítani; jelenleg a megadott űrlap nem tartalmaz CAPTCHA-t.

## Netlify

A gyökér `netlify.toml` a `public` publish könyvtárat és a `netlify/functions` funkciókönyvtárat rögzíti. Csak a public mappa kézi feltöltése nem elég a hírlevélhez; a Git-alapú deploy a szerverfüggvényt is telepíti. A kontakt-űrlapok továbbra is Netlify Formsot használnak.

## MailerLite-ban maradó beállítások

A fiók csoportját és double opt-in állapotát nem módosítottuk, mert a hozzáférés ebben a beszélgetésben nem érhető el. A Kisokos PDF-je elkészült az `output/pdf/eliza-arcapolasi-kisokos.pdf` fájlban, de automatikus levele nincs beállítva. MailerLite-ban a kapcsolódó csoporthoz csatlakozást indító automatizmus és a PDF-re mutató e-mail szükséges. Az oldal nem ígér azonnali kézbesítést addig, amíg ez nincs kész.

## Teszt

`node .webprojekt/test-newsletter.mjs`: honeypot, hozzájárulás, mezők, rossz eredet/tartalomtípus, méretkorlát, szolgáltatói hibák és sikerág, helyettesített külső válasszal.

`node .webprojekt/test-newsletter-browser.mjs`: natív HTTP POST és visszajelző oldal JavaScripttel és nélküle, helyi HTTP-szerver és helyettesített MailerLite-válasz. Nem küldtünk érvényes e-mail-címmel tesztfeliratkozást. A publikus végpont elérhetőségét csak szándékosan hiányos kéréssel ellenőriztük.
