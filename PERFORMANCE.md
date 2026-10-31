# Mobilos teljesítményoptimalizálás

## PageSpeed kiindulás

[2026. október 31-i mobiljelentés](https://pagespeed.web.dev/analysis/https-elizahomework-netlify-app/43qbagjcj8?form_factor=mobile): teljesítmény 94, kisegítő lehetőségek 100, bevált módszerek 100, SEO 100. FCP 1,6 s, LCP 2,9 s, TBT 0 ms, CLS 0, Speed Index 2,7 s.

Mért lehetőségek: renderelést blokkoló CSS és Google Fonts (becsült 480 ms), fölöslegesen letöltött képpixelek (becsült 96 KiB), Netlify által beszúrt HUD script gyorsítótárazása (11 KiB).

## Javítások

- `public/fonts/`: saját kiszolgálású, latin és latin-ext WOFF2 betűkészletek a magyar ékezetekhez, eredeti licencekkel. A használt betűcsaládok és súlyok változatlanok; font-display: swap. Két latin fájl preloadot kapott.
- Az öt HTML-oldal a kis méretű teljes stíluslapot tömörítve, közvetlenül a headben tartalmazza, ezért nincs külön renderelést blokkoló CSS-kérés. A szerkeszthető forrás továbbra is `public/assets/site.css`.
- Mobilon a hero képei négyzetes, a főoldali kezelési kártyák 3:2, a gondoskodás képe 4:3 kivágást kapott picture/source elemmel, 480 és 768 px-es WebP fájlokból. A vágás a korábbi object-fit megjelenést követi; desktopon megmarad az eredeti fotó. A mobilos hero megfelelő srcset előtöltést kapott.
- `public/_headers`: Netlify cache-szabályok a fontokhoz, képekhez, eszközökhöz és HTML-hez. A szerver által beszúrt HUD script szabályait ez nem írja felül.
- `public/assets/site.js`: a fejléc osztálya csak állapotváltáskor módosul, nem minden scroll eseménynél.
- Az adatkezelési oldal és a meta description a saját kiszolgálású fontokat írja le.

## Ellenőrzés

Azonos helyi szerveren, három hideg böngészőkörnyezettel mérve, 412×823 px, 1,75 DPR, 150 ms hálózati késleltetés, 200000 bájt/s letöltés és négyszeres CPU-lassítás mellett:

- LCP-medián előtte: 1.972 s; utána: 1.412 s; javulás: 28.4%.
- Ez összehasonlítható helyi mérés, nem Lighthouse-pontszám és nem új nyilvános PageSpeed-mérés. A Python tesztszerver tömörítése eltér a Netlifytól.
- Öt oldal ellenőrizve 1440, 870 és 375 px-en: nincs 404, törött kép, kilógás vagy JavaScript-hiba.
- A főoldal indulásakor nincs külső fontkérés; mindkét betűcsalád magyar karakterekkel is betöltődik.
- A SEO-szkript továbbra is hibamentes. A jóváhagyott animációk megmaradtak.

## Karbantartás és újramérés

CSS- vagy mobilkép-módosítás után futtasd a `.webprojekt/optimize-performance.py` szkriptet: ez újragenerálja a headbe ágyazott stílust és a mobilképeket. A font-face forrása `.webprojekt/local-fonts.css`. Ne szerkeszd külön a headbe másolt CSS-t.

A fontfájlok hosszú cache-élettartamúak; későbbi fontcserekor új fájlnevet kell használni. A kép cache egy hét; képfrissítéskor célszerű verziózott fájlnév.

Publikálás után új mobilos PageSpeed-vizsgálat szükséges. A Netlify HUD/toolbar csak hosting-beállításból kezelhető; ebben a munkában nem módosult a Netlify-fiók. Nem ígérhető konkrét új pontszám.

Referencia: [Google web.dev – LCP optimalizálása](https://web.dev/articles/optimize-lcp).


## A második jelentés ellenőrzése

A felhasználó által bemásolt, 2026. október 31. 18:10 CET időpontú mérés a `/kezelesek` oldalt vizsgálta: 94 pont, LCP 3,0 s. A nyilvános főoldalon és kezelési oldalon végzett közvetlen ellenőrzés még Google Fonts CSS-t, külső site.css-t és az optimalizált picture elemek hiányát mutatta. Tehát ez nem a helyben javított változat mérése. A Kezelések további két fotójához is készült 4:3 mobilos kivágás. A változások publikálása után mind a főoldalt, mind a /kezelesek URL-t újra kell mérni.


## Speed Index második finomítás

A megadott új PageSpeed mérés: teljesítmény 97, FCP 1,1 s, LCP 1,8 s, Speed Index 4,2 s, TBT 0, CLS 0. A fontok négy statikus, latin és magyar karaktereket együtt tartalmazó WOFF2 fájlra szűkültek: összesen 71 576 bájt, a korábbi 115 056 bájt helyett (kb. 38% csökkenés). Megszűnik a külön latin-ext kéréslánc. A betűcsaládok és súlyok változatlanok.

A mobilképek 640 px köztes jelöltet is kaptak, 74-es WebP minőséggel. Új `v2` fájlneveik elkerülik az előző képek böngészőcache-ét. A képek cache-élettartama 30 nap. A jóváhagyott animációk változatlanok.

A három helyi LCP-mérés eredménye zajos, nem mutatott egyértelmű további javulást; ebből nem állítunk Speed Index-nyereséget vagy új pontszámot. A változtatás a letöltési mennyiséget és a betűcsere késését célozza. Az új nyilvános Speed Index csak a deploy utáni PageSpeed-mérésből derül ki. A hosting által injektált Netlify HUD külön tényező marad.
