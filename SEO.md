# Alapszintű SEO — Eliza Beauty Salon

Aktuális nyilvános alap-URL: https://elizahomework.netlify.app/

## Beállítások

- `public/index.html`, `kezelesek.html`, `rolunk.html`, `kapcsolat.html`, `adatkezeles.html`: egyedi title és description, önmagára mutató canonical URL.
- Mind az öt oldalon Open Graph: cím, leírás, URL, webhelynév, magyar locale, website típus, megosztási kép és képleírás; X/Twitter nagy képes kártya.
- `public/images/og-eliza.jpg`: 1200 × 630 px arculati megosztási kép. Szerkeszthető forrás: `.webprojekt/og-preview.html`.
- Mind az öt oldalon JSON-LD: schema.org BeautySalon, azonos vállalkozásazonosítóval, névvel, budapesti címmel, hétfő–péntek 09:00–16:00 nyitvatartással, szolgáltatási területtel és kezelési kategóriákkal.
- Egy H1 oldalanként; a fő tartalom H2/H3 hierarchiája ellenőrizve. A lábléc önálló csoportjainak címei H2-re módosítva, a látvány megtartásával (`public/assets/site.css`).
- Minden megjelenített képnek van tartalmát leíró alt szövege. A meglévő helyes leírások megmaradtak; a hangulatképek nem szerepelnek eredményfotóként.
- `public/sitemap.xml`: az öt éles oldal teljes HTTPS URL-je, a főoldal gyökér-URL-jével. Nincsenek kitalált módosítási dátumok vagy prioritások.
- `public/robots.txt`: engedélyezett feltérképezés és teljes sitemap URL. A public mappán kívüli munkaanyagokat a hosting publish directory beállítása választja le.

## Ellenőrzés

Automatikusan ellenőrizve: egyedi title/description, canonical és og:url egyezése, egyetlen H1, kihagyott címsorszint hiánya, alt szövegek, JSON-LD szintaxis, sitemap XML. Böngészős vizsgálat az öt oldalon 1440, 870 és 375 px-en: helyi hivatkozások, képek, kilógás és JavaScript-hibák.

A helyi ellenőrzés nem jelenti, hogy a Google már indexelte az oldalt vagy bővített találatot jelenít meg. A sitemap Search Console-beküldése nem történt meg.

## Későbbi frissítés

A végleges domain megadásakor futtatandó: `python .webprojekt/update-seo.py https://vegleges-domain.hu`. Ez frissíti a canonical, OG, strukturált adat, sitemap és robots URL-jeit. Ezután publikálni és a nyilvános URL-eket újraellenőrizni kell.

A telefon és az e-mail a brief szerint oktatási mintaadat, ezért nem került a strukturált adatokba. A cím és a nyitvatartás a briefből származik; éles üzleti használat előtt ellenőrizendő. Nem készült kitalált értékelés, földrajzi koordináta vagy közösségi profil.

## Hivatalos referenciák

- [Google: sitemap készítése](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Schema.org: BeautySalon](https://schema.org/BeautySalon)
- [Open Graph protokoll](https://ogp.me/)

## Vikingo SEO skill szerinti kiegészítés

Telepített skill: `C:/Users/HP/.codex/skills/vikingo-seo/SKILL.md` (v1.3.0). Kiinduló ellenőrzés: 0 hiba. Záró ellenőrzés: 0 hiba; minden vizsgált alap zöld.

- `public/rolunk.html`: külön Person entitás Sipos Eliza nevével, mesterkozmetikusi titulusával, portréjával és a vállalkozáshoz kapcsolva.
- `public/index.html`, `public/kapcsolat.html`: FAQPage JSON-LD, kizárólag a már látható négy kérdés-válasz szövegével.
- A Netlify-cím átmeneti használatát TODO-komment jelöli az oldalak SEO-blokkjában. Az újrageneráló szkript ismételt futtatása nem duplikál tageket vagy entitásokat.
- Egyetlen figyelmeztetés: a kódban nincs Google Search Console-hitelesítési nyom. Ez nem bizonyítja a hitelesítés hiányát; DNS vagy hosting-hitelesítés nem feltétlen látszik az oldalon.

Külső teendők: végleges saját domain megadása és az URL-ek frissítése; Search Console és sitemap-beküldés; valós vállalkozás esetén Google Business Profile; publikált változaton Rich Results Test és PageSpeed mérés. Nem hoztunk létre külső fiókot vagy új vállalkozási adatot.

Az alapok nem garantálnak Google-helyezést, AI-válaszokban való megjelenést vagy FAQ-bővített találatot. A látható szövegek, képek és elrendezések változatlanok.
