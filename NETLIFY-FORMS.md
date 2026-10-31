# Kapcsolati űrlap — Netlify Forms

A `public/kapcsolat.html` oldalon a korábbi bemutató űrlap valódi, statikus Netlify Forms-űrlapra cserélődött. Név: `kapcsolat`. Mezők: `name`, `email`, `message`; rejtett `form-name=kapcsolat` és spamcsapda `bot-field`.

Natív HTML POST a `/koszonjuk.html` útvonalra, `data-netlify="true"` és `netlify-honeypot="bot-field"` jelöléssel. A Netlify deploy közben dolgozza fel a statikus űrlapot. Nincs külön backend vagy AJAX; JavaScript nélkül is működik. A helyi előnézetben a JavaScript megakadályozza a véletlen beküldést, és jelzi, hogy nem történt adatküldés. A többi oldal bemutató űrlapjai nem változtak.

## Netlify felületén

1. A projektben: Forms → Enable form detection.
2. Ezután új deploy szükséges, hogy a Netlify felismerje a `kapcsolat` nevű űrlapot.
3. A beérkezések a Forms alatt látszanak. E-mail értesítés külön állítható: Forms → Submission notifications → Add notification. Nem állítottunk be címzettet, és nem változtattunk fiókbeállítást.

Köszönőoldal: `public/koszonjuk.html`, `noindex, follow`; nem szerepel a sitemapben. Külön egyeztetés szükséges az időponthoz, a köszönőoldal nem állít automatikus foglalást.

Az adatkezelési oldal és a lábléc tájékoztatása frissült a Kapcsolat űrlap tényleges működéséhez. A teljes adatkezelési tájékoztató (adatkezelő, jogalap, megőrzési idő, érintetti jogok) továbbra is előkészítés alatt áll; nem találtunk ki jogi vagy vállalkozási adatokat.

## Ellenőrzés

A POST törzsét és a köszönőoldalra jutást elfogott, teljesen helyi hálózati kérésekkel teszteltük JavaScripttel és nélküle. Valódi beküldés nem történt. Az éles Netlify-felismerést és a beérkezett tesztüzenetet a fiókban lehet ellenőrizni; önmagában a köszönőoldal betöltése nem bizonyít beérkezést.

Dokumentáció: https://docs.netlify.com/manage/forms/setup/


## Egységes időpontkérők

A főoldal, Kezelések és Rólunk oldal időpontkérője is ugyanazt az egységes `kapcsolat` Netlify-űrlapot használja, azonos mezőkkel és spamcsapdával. Csak a hírlevél maradt bemutató. A `site.js?v=forms-v2` hivatkozás a régi bemutató-kezelő böngészőcache-ét kerüli meg. A helyi file:// előnézet nem küld adatot; az éles Netlify-URL-en kell tesztelni.
