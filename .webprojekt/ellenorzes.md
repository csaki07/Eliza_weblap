# A prototípusok ellenőrzése

Elkészült mindhárom jóváhagyott kezdőoldal-koncepció és a közös `index.html` választóoldal. Helyi HTML-bemutatók, nem publikált éles oldalak.

## Elvégzett ellenőrzések

- Chrome-ban mind a négy HTML-fájl megnyitva, 1440, 768 és 375 px szélességgel.
- A három teljes kezdőoldal és a választóoldal asztali, illetve mobil képernyőképei vizuálisan ellenőrizve.
- Nincs vízszintes túlcsordulás, törött kép, hiányzó helyi oldalhivatkozás, hibás belső horgony vagy JavaScript-futási hiba.
- Oldalanként egy H1, magyar dokumentumnyelv, címkézett űrlapmezők; a márkafontok betöltődnek.
- A Tailwind preflight kikapcsolva, hogy ne írja felül az önálló arculati stílusokat.
- Mindhárom mobilmenü nyílik és Escape-pel bezárható.
- A GYIK válaszai kinyithatók.
- A két űrlap üres mezőkkel nem fogadja el a próbát; fiktív tesztadatokkal egyértelműen jelzi, hogy nem történt elküldés, feliratkozás vagy letöltés. Nem indult POST-kérés.
- A harmadik koncepció bőrigény-választója a megfelelő kezelési sorhoz vezet és jelöli a választást.
- A külső CSS- és fontszolgáltatások blokkolásával is használható marad a mobil elrendezés, JavaScript-hiba nélkül. Ilyenkor helyettesítő betűtípus jelenik meg.

## Megtekintés

Nyisd meg a projekt gyökerében az `index.html` fájlt böngészővel. Innen mindhárom koncepció elérhető, és mindegyikből vissza lehet térni a választóhoz. A teljes arculati megjelenéshez a Google Fonts és a Tailwind CDN internetelérést igényel.

## Határok

A menük a megfelelő kezdőoldali szakaszokra vezetnek. A végleges külön aloldalak, működő levélküldés és hírlevélrendszer nem részei ennek a prototípuskörnek. A Kisokos és a végleges adatkezelési tájékoztató még pótlandó. A forrásanyag demonstrációs telefonszáma és e-mail-címe a bemutatókban jelölve van.

## Ellenőrzési fájlok

- `verify.mjs`: megjelenés, horgonyok, képek, betöltött fontok és méretezés.
- `interaction-qa.mjs`: mobilmenü, GYIK, űrlapok és külső szolgáltatások nélküli működés.
- `qa/report.json`, `qa/interactions.json`, `qa/*.png`: helyi ellenőrzési eredmények és képernyőképek, Gitből kihagyva.

A szkriptek a jelenlegi gépen telepített Playwrightot és Chrome-ot használják; másik gépen az elérési utak módosítandók.
