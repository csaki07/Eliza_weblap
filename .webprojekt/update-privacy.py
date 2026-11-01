from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
public = root / 'public'
version = '2026-11-01-tervezet'
content = '''<p class="overline">Frissítve: 2026. november 1. · Egyeztetési változat</p>
<aside class="privacy-draft" aria-label="A tájékoztató állapota"><strong>Oktatási mintaprojekt, működő űrlapokkal.</strong><p>Az Eliza Beauty Salon ezen a webcímen egy oktatási házi feladat bemutatója. Az űrlapok valódi adatokat továbbítanak. Az adatkezelő teljes neve és postai kapcsolattartási címe még nincs megadva, ezért ez a tájékoztató nem végleges. A bemutatott szalonnév, cím és telefonszám nem azonosítja az oldal tényleges üzemeltetőjét.</p></aside>
<h2>1. Kapcsolattartás és az adatkezelő</h2>
<p>Az oldal üzemeltetője kezeli a Netlify- és MailerLite-fiókot, valamint a beküldött adatokat. Teljes neve és postai kapcsolattartási címe még kiegészítendő. Adatkezelési kérdéssel, törlési kéréssel vagy hozzájárulásod visszavonásával a kapcsolattartási elérhetőség még nincs megadva; ezt a tájékoztatót ezzel is ki kell egészíteni. Az oldal címe: <a href="https://elizahomework.netlify.app/">elizahomework.netlify.app</a>.</p>
<h2>2. Kapcsolati űrlapok</h2>
<p>A főoldalon és az aloldalakon található kapcsolati űrlap a nevedet, e-mail-címedet és az üzenetedet kéri. A cél a megkeresésed fogadása és megválaszolása. Az oktatási oldalon a beküldés nem jelent tényleges kozmetikai időpontfoglalást.</p>
<p>Az adatkezelés jogalapja az űrlap külön jelölőnégyzetével adott hozzájárulásod (GDPR 6. cikk (1) a)). Az adatközlés önkéntes; a szükséges mezők és a hozzájárulás nélkül az űrlap nem küldhető el. Az adatokat a Netlify Forms fogadja és tárolja, és a beküldésről az üzemeltető Gmail-postafiókjába értesítés érkezik. A tájékoztató megismert változatának azonosítóját és a jelölőnégyzet értékét is továbbítja az űrlap.</p>
<p>A lezárt érdeklődések adatait legfeljebb 6 hónapig őrizzük meg; korábbi visszavonás vagy indokolt törlési kérés esetén előbb töröljük. Ez a Netlifyban és a kapcsolódó levelezésben tárolt példányokra egyaránt vonatkozik. A törlést az üzemeltető végzi, nem az oldal automatikus időzítője.</p>
<p>Kérjük, ne küldj egészségügyi adatot, diagnózist vagy más különleges személyes adatot az üzenetben.</p>
<h2>3. Arcápolási Kisokos és hírlevél</h2>
<p>A hírlevélre jelentkezéskor a neved és e-mail-címed kerül a MailerLite rendszerébe, a Netlify szerveroldali ellenőrzésén keresztül. A cél az Arcápolási Kisokos automatikus megküldése és arcápolási tippek, hírek küldése. A feliratkozáshoz külön, előre nem bejelölt hozzájárulás szükséges; ez nem feltétele a kapcsolati üzenet elküldésének. Jogalap: hozzájárulás, GDPR 6. cikk (1) a).</p>
<p>A feliratkozást a MailerLite által küldött e-mailben meg kell erősítened (double opt-in). A feliratkozás és a megerősítés technikai adatait a szolgáltató kezeli. A levelekben megnyitás- és kattintáskövetés működik: a szolgáltató rögzítheti a megnyitás, a hivatkozásra kattintás és ezek időpontjának adatait a hírlevelek eredményességének mérésére. A megnyitási adatokat a levelezőprogramok adatvédelmi funkciói is befolyásolhatják.</p>
<p>Az aktív hírlevél-adatkezelés leiratkozásig tart. Minden hírlevélben találsz leiratkozási hivatkozást, és a fenti kapcsolati e-mailen is visszavonhatod a hozzájárulást. A leiratkozás megszünteti a további hírlevélküldést; a MailerLite-ban fennmaradhat leiratkozott státuszú rekord, ezért a teljes adattörlést külön is kérheted. Az üzemeltetőnek a leiratkozott rekordok és a hozzájárulás igazolásához szükséges adatok további megőrzését még pontosítania kell.</p>
<h2>4. Közreműködő szolgáltatók</h2>
<ul><li><strong>Netlify:</strong> a weboldal tárhelye, a kapcsolati űrlapok fogadása és a hírlevélkérés szerveroldali továbbítása. <a href="https://www.netlify.com/privacy/">Adatvédelmi információk</a>; <a href="https://www.netlify.com/dpa/">adatfeldolgozási feltételek</a>.</li>
<li><strong>MailerLite:</strong> feliratkozók nyilvántartása, megerősítő és automatikus levelek, hírlevélküldés és levélstatisztikák. <a href="https://www.mailerlite.com/legal/privacy-policy">Adatvédelmi információk</a>; <a href="https://www.mailerlite.com/legal/data-processing-agreement">adatfeldolgozási feltételek</a>.</li>
<li><strong>Google / Gmail:</strong> a kapcsolati űrlap értesítéseinek és a válaszleveleknek a kezelése a megadott Gmail-postafiókban. <a href="https://policies.google.com/privacy?hl=hu">Google adatvédelmi irányelvek</a>.</li></ul>
<p>A szolgáltatók nemzetközi infrastruktúrát és további közreműködőket használhatnak, ezért nem állítjuk, hogy az adatok kizárólag Magyarországon vagy az EU-ban maradnak. A fiókokra irányadó szerződő jogalanyt, adatfeldolgozási feltételeket és az EGT-n kívüli továbbítás alkalmazott garanciáit az üzemeltetőnek még ellenőriznie és ebben a tájékoztatóban pontosítania kell.</p>
<h2>5. Az oldal megtekintése, sütik és biztonság</h2>
<p>A tárhelyszolgáltató a weboldal kiszolgálásához és védelméhez technikai adatokat dolgozhat fel, például IP-címet, a kérés időpontját, a kért oldalt és böngészőadatokat. A technikai védelem célja a működőképes, biztonságos oldal fenntartása; ennek jogalapja a kapcsolódó jogos érdek (GDPR 6. cikk (1) f)). A szolgáltatói naplók konkrét megőrzési idejét még egyeztetni kell.</p>
<p>A weboldal saját kódjában nincs Google Analytics, Facebook Pixel vagy marketingcélú sütikezelés. A betűkészletek helyben tároltak, nem a Google Fonts szolgáltatásról töltődnek be. A hírlevelekben végzett követés ettől különálló adatkezelés, amelyet a 3. pont ismertet. Az űrlapok rejtett spamcsapdát (honeypot) használnak, a weboldal HTTPS-kapcsolaton érhető el. Ezek az intézkedések önmagukban nem helyettesítik a fiókok megfelelő védelmét.</p>
<h2>6. A jogaid és a kérelem intézése</h2>
<p>Kérhetsz tájékoztatást és hozzáférést az adataidhoz, helyesbítést, a feltételek fennállásakor törlést vagy az adatkezelés korlátozását. Hozzájáruláson alapuló, automatizált adatkezelésnél az adathordozhatóság joga is megillethet. Jogos érdeken alapuló adatkezelés ellen tiltakozhatsz. A hozzájárulás bármikor visszavonható, ami a visszavonás előtti adatkezelés jogszerűségét nem érinti.</p>
<p>Az adatkezelési kérelmek fogadására szolgáló elérhetőség még kiegészítendő. Indokolatlan késedelem nélkül, főszabály szerint a beérkezéstől számított egy hónapon belül válaszolunk. Összetett vagy több kérelmet érintő esetben ez további két hónappal meghosszabbítható; ennek okáról az első hónapon belül tájékoztatást kell adni. A joggyakorlás főszabály szerint díjmentes. Kétség esetén kizárólag a személyazonosság ellenőrzéséhez szükséges további információ kérhető.</p>
<p>A weboldal nem végez a GDPR 22. cikke szerinti, joghatással vagy hasonlóan jelentős hatással járó automatizált döntéshozatalt. A hírlevélstatisztikák gyűjtését a 3. pont tartalmazza.</p>
<h2>7. Panasz és jogorvoslat</h2>
<p>Adatkezelési panasszal a Nemzeti Adatvédelmi és Információszabadság Hatósághoz fordulhatsz. Cím: 1055 Budapest, Falk Miksa utca 9–11.; levelezési cím: 1363 Budapest, Pf. 9. Az aktuális elérhetőségeket és a beadvány benyújtásának módját a <a href="https://www.naih.hu/ugyfelszolgalat-kapcsolat">NAIH hivatalos oldalán</a> találod. Az egyszerű e-mail nem alkalmas hatósági eljárás kezdeményezésére. Bírósági jogorvoslat is igénybe vehető.</p>
<h2>8. A dokumentum állapota</h2>
<p>Ez a csatolt sablon alapján, a weboldal tényleges működéséhez igazított egyeztetési változat. A nem használt regisztrációs, nyereményjátékos és analitikai részeket elhagytuk. A véglegesítéshez hiányzik az adatkezelő azonosítása, a szolgáltatói fiókok szerződéses adatainak és a technikai megőrzési időknek az ellenőrzése. Az oktatási cél nem mentesít a valódi személyes adatok kezelésével járó kötelezettségek alól.</p>'''

p = public / 'adatkezeles.html'
s = p.read_text(encoding='utf-8')
s = re.sub(r'(<div class="wrap legal-copy">).*?(</div></section></main>)', lambda m:m[1]+content+m[2],s,flags=re.S)
s = s.replace('Itt olvashatsz a bemutató űrlapok működéséről és a végleges tájékoztató előkészítéséről.', 'Ismerd meg, mi történik a kapcsolati űrlapon és a hírlevélre jelentkezéskor megadott adataiddal.')
p.write_text(s,encoding='utf-8')

for p in public.glob('*.html'):
    s=p.read_text(encoding='utf-8')
    s=s.replace('Adatkezelési tájékoztató (előkészületben)','Adatkezelési tájékoztató')
    s=s.replace('A teljes adatkezelési tájékoztató előkészítés alatt áll.', 'Oktatási mintaprojekt, valódi adatküldéssel. Adatkezelési kapcsolattartási elérhetőség még nincs megadva. A tájékoztató egyeztetési változat, az adatkezelő azonosítása még hiányzik.')
    if 'data-contact-form' in s and 'name="privacy-consent"' not in s:
        label='<input type="hidden" name="privacy-version" value="'+version+'"><label class="check"><input type="checkbox" name="privacy-consent" value="yes" required><span>Elolvastam az <a href="adatkezeles.html">adatkezelési tájékoztatót</a>, és hozzájárulok, hogy a megadott adataimat a megkeresésem megválaszolásához kezeljék. Tudomásul veszem, hogy ez oktatási mintaprojekt; az adatkezelő azonosítása még hiányzik.</span></label>'
        s=re.sub(r'<p class="small muted" style="margin-bottom:24px">Az adataidat.*?</p>',lambda m:label,s,flags=re.S)
    s=s.replace('Hozzájárulok, hogy e-mailben arcápolási tippeket és híreket kapjak az Eliza Beauty Salontól. Az <a href="adatkezeles.html">adatkezelési információkat</a> elolvastam. Bármikor leiratkozhatok.', 'Elolvastam az <a href="adatkezeles.html">adatkezelési tájékoztatót</a>, és hozzájárulok a Kisokos és az Eliza oktatási projekt arcápolási hírleveleinek küldéséhez, valamint a levelek megnyitásának és a linkekre kattintásnak a méréséhez. Bármikor leiratkozhatok. Az adatkezelő azonosítása még hiányzik.')
    p.write_text(s,encoding='utf-8')

css=public/'assets/site.css'
s=css.read_text(encoding='utf-8')
if '/* Privacy notice */' not in s:
    s+='\n/* Privacy notice */\n.privacy-draft{padding:24px;background:var(--color-brand-surface);border-radius:16px;margin:24px 0}.privacy-draft p{margin-top:12px}.legal-copy a,.check a{text-decoration:underline;text-underline-offset:3px}.legal-copy ul{padding-left:24px}.legal-copy li+li{margin-top:16px}.appointment-form .check{margin-bottom:24px}\n'
css.write_text(s,encoding='utf-8')

# Reviewable text without changing the user's original Word attachment.
plain=re.sub(r'</(?:p|h2|li|aside)>','\n\n',content)
plain=re.sub(r'<[^>]+>','',plain)
(root/'ADATKEZELES-TERVEZET.md').write_text('# Adatkezelési tájékoztató – egyeztetési változat\n\n'+plain+'\n\n## Üzemeltetői teendők\n\n- Az adatkezelő neve és kapcsolattartási adatai nélkül nem végleges.\n- A 6 hónapos törlést a Netlifyban és a Gmailben is el kell végezni.\n- MailerLite: a leiratkozás nem teljes adattörlés; a megőrzést és a hozzájárulás bizonyítását pontosítani kell.\n- A szolgáltatói szerződő felek, nemzetközi adattovábbítási garanciák és naplómegőrzés ellenőrzendő.\n- A honlap egyéb szalonadatai oktatási mintaadatok.\n',encoding='utf-8')
print('Updated privacy draft, footer links and required contact consent in public pages.')
