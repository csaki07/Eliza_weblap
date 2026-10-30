# Eliza Beauty Salon — jóváhagyott design system

Állapot: az elfogadott főoldal alapján rögzített megjelenés. Dátum: 2026. október 27.

**Mérvadó referencia:** `koncepcio-1-a-nyugalom-tere.html` (A nyugalom tere, új képekkel, animációk nélkül). A jelen dokumentum a Kezelések, Rólunk és Kapcsolat aloldalak közös alapja. A korábbi opcionális arculati leírásnál ez a rögzítés az irányadó.

## 1. Márkakarakter és szerkesztés

- Nyugodt, világos, nőies, elegáns és közvetlen; prémium gondoskodás, személyes szakértelem.
- Magyar, tegező szövegek; Eliza egyes szám első személyben beszél.
- Elsődleges művelet: **Időpontot kérek**. Ez kapcsolatfelvétel, nem automatikusan visszaigazolt foglalás.
- Levegős elrendezés, nagy talpas címsorok, meleg hangulatképek, visszafogott vonalas ikonok.
- Nincsenek címsor fölötti díszvonalak, portré mögötti keretek, aszimmetrikus képsarkok vagy belépő animációk.
- A folyamat körökben megjelenő számai és finom összekötője funkcionális elemek, megmaradnak. A GYIK, mezők és lábléc elválasztói is megmaradnak.

## 2. Színrendszer

| Szerep | Érték | Használat |
|---|---|---|
| Elsődleges rózsafa | `#8E4A5A` | Elsődleges gomb, link, ikon, kiemelés |
| Sötét rózsafa | `#6E3644` | Hover és aktív szín |
| Krém | `#FAF6F2` | Alap háttér, világos gomb színes sávon |
| Púder | `#F1E6DF` | Kártyák, váltakozó szakaszok, űrlapkártya |
| Sötét kakaó | `#2E2626` | Fő szöveg és lábléc háttere |
| Szürkésbarna | `#6B5F5C` | Másodlagos szöveg és leírás |
| Homokarany | `#C9A27E` | Finom funkcionális részletek, folyamatkörök kerete |
| Halvány púder | `#E3D6CF` | Mezőszerkezet, elválasztó és láblécszöveg |
| Fehér | `#FFFFFF` | Mezők háttere és elsődleges gomb felirata |

Homokarany világos háttéren nem használható törzsszöveghez. A színes CTA-sáv rózsafa, világos szöveggel; a lábléc kakaó, krém és halvány púder szöveggel.

### CSS-tokenek

```css
:root {
  --color-brand-primary: #8E4A5A;
  --color-brand-secondary: #6E3644;
  --color-brand-accent: #C9A27E;
  --color-brand-bg: #FAF6F2;
  --color-brand-surface: #F1E6DF;
  --color-brand-text: #2E2626;
  --color-brand-muted: #6B5F5C;
  --line: #E3D6CF;
  --font-heading: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Jost', system-ui, sans-serif;
}
```

## 3. Tipográfia

**Címsorok:** Cormorant Garamond, 500 és 600. **Törzsszöveg és felület:** Jost, 400 és 500. A betöltés mindkét családot tartalmazza, magyar ő/ű karakterekkel. A fontok külső Google Fonts stíluslapból érkeznek, helyettesítő betűkkel kiegészítve.

| Elem | Jóváhagyott érték |
|---|---|
| Hero H1 | Cormorant 500, maximum 64 px, sormagasság 1,04 |
| Hero H1, 801–1050 px szélességnél | 48 px |
| Hero H1, legfeljebb 800 px | `clamp(42px, 6.5vw, 54px)`; 375 px-en 42 px |
| Általános H2 | Cormorant 500, `clamp(36px, 4vw, 54px)`, sormagasság 1,08, betűköz −0,025 em |
| Kezelési H3 | Cormorant 600, 29 px; legfeljebb 640 px-en 28 px, sormagasság 1,15 |
| Előnyök H3 | Cormorant 600, 26 px; legfeljebb 800 px-en 25 px, legfeljebb 640 px-en 27 px |
| Folyamat címe | Cormorant 500, `clamp(34px, 3.2vw, 46px)` |
| Folyamat lépéscíme | Cormorant 600, 28 px; legfeljebb 950 px-en 25 px |
| Törzsszöveg | Jost 400, 18 px / 1,65; legfeljebb 640 px-en 16 px / 1,65 |
| Kezelés leírása | Jost 400, 17 px; mobilon 16 px |
| Vélemény | Cormorant 500, 24 px / 1,5; legfeljebb 700 px-en 23 px |
| Mezőcímke | Jost 500, 15 px |
| Mezőbe írt szöveg | Jost 400, 17 px / 1,5 |
| Kis bevezető felirat | Jost 500, 12–14 px, rózsafa, 0,08 em betűköz, vonal nélkül |
| Kapcsolati adatok | Jost 400, 18 px / 1,65, kakaó; a telefon azonos stílusú a címmel |

A gombok és feliratok mondatkezdő nagybetűs írásmódúak; nincs kötelező nagybetűs átalakítás. Egy aloldalon egyetlen H1 legyen, a további hierarchia H2/H3.

## 4. Elrendezés és térközök

| Szabály | Érték |
|---|---|
| Tartalomszélesség | Legfeljebb 1200 px, középre igazítva |
| Normál szövegszélesség | Legfeljebb 680 px |
| Oldalmargó 1050 px fölött | Konténer: `min(1200px, calc(100% - 80px))` |
| Oldalmargó 901–1050 px | 32 px oldalanként |
| Oldalmargó legfeljebb 900 px | 32 px; legfeljebb 640 px-en 20 px |
| Tartalmi szakaszok paddingje | Fent 80 px, lent 80 px, mobilon is |
| Bemutatkozás és vélemények kivétele | Fent 80 px, lent 20 px |
| Hero alsó padding | 20 px |
| Hero felső padding | Asztalon 0 px, legfeljebb 800 px-en 20 px |
| Belső térközök | Jellemzően 8, 12, 16, 20, 24, 28, 32 és 40 px; pontos komponensértékek alább |

Az aloldalak alapértelmezett szakaszpaddingje 80/80 px. A főoldali 20 px-es kivételek nem terjednek automatikusan új szakaszokra. Két egymás melletti szakasz belső paddingje összeadódik; nem kell közéjük további külső margó.

### Főoldali szakaszok és padding

| Szakasz | Fent / lent |
|---|---|
| Hero | 0 / 20 px; legfeljebb 800 px-en 20 / 20 px |
| Kezelési ízelítő | 80 / 80 px |
| Bízd magad szakértő kezekre | 80 / 80 px |
| Eliza bemutatkozása | 80 / 20 px |
| Jó érzés visszatérni | 80 / 20 px |
| Folyamat | 80 / 80 px |
| Rózsafa CTA-sáv | 80 / 80 px |
| GYIK | 80 / 80 px |
| Hírlevél | 80 / 80 px |
| Időpontkérés | 80 / 80 px |

A lábléc külön komponens: asztalon 64/24 px, mobilon 48/24 px paddinggel.

## 5. Fejléc és navigáció

- Rögzített, `position: sticky; top: 0; z-index: 10` fejléc.
- Magasság: 64 px; legfeljebb 800 px-en 60 px. A keret további 1 px lehet.
- Logó: asztalon 96×48 px-es befoglaló; legfeljebb 800 px-en 92×46 px, torzítás nélkül.
- Asztali menü 900 px fölött; 900 px-től lefelé hamburger menü.
- Asztali menüpontok: Jost 15 px; a fejlécgomb 13 px, 42 px magas, 22 px oldalsó paddinggel és 24 px jobb oldali beljebb helyezéssel.
- A fejlécgomb felirata optikai középre igazítást kap: 4 px felső és 0 px alsó padding, 1-es sormagasság.
- A főoldal tetején a fejléc áttetsző, a Hero-fotó mögé fut. 12 px görgetés után `rgba(250,246,242,.98)` hátteret és finom alsó keretet kap.
- Legfeljebb 800 px-en a fejléc eleve világos. A hamburger menüben csak navigációs linkek vannak, külön időpontkérő gomb nincs.
- Escape bezárja a mobilmenüt és visszaadja a fókuszt. Menüpontválasztás szintén bezárja.
- Aloldalaknál a világos fejléc az alap; áttetsző nyitás csak akkor használható, ha a mögötte lévő kép és a kontraszt ezt indokolja.
- A koncepciókhoz visszavezető felső prototípuscsík nem része a végleges márkakomponensnek.

## 6. Hero és képek

### Főoldali Hero

- Egyetlen kép jobbra, a meglévő főüzenet és a két gomb balra.
- Rács: `1fr 1.05fr`; rés 32 px, legfeljebb 1050 px-en 24 px.
- A kép 64 px-rel a fejléc mögé nyúlik. Magassága 654 px; 801–1050 px között 604 px.
- A bal széle áttűnik a krém háttérbe: átlátszó 0%, 45% fedettség 8%-nál, 85% 18%-nál, teljes fedettség 30%-nál.
- Legfeljebb 800 px-en egymás alatti: szöveg, majd kép. A kép négyzetes, nincs negatív margó; a felső áttűnés teljes fedettségre 28%-nál ér.
- Hero kép: `object-fit: cover; object-position: 50% 64%`. Jobb felső sarka szögletes; a többi 8 px.

### Általános képszabály

- Minden tartalmi kép 8 px lekerekítést kap. Kivétel a Hero jobb felső sarka: 0 px.
- Nincs kép mögötti dekoratív keret vagy aszimmetrikus maszk. A Hero áttűnése külön kivétel.
- Meleg, természetes bőrtónusok. A hangulatképek nem kezelési eredmények és nem igazolt szalonfotók.
- WebP, `width`/`height`, reszponzív `srcset`/`sizes`, hajtás alatt `loading="lazy"`; a Hero magas betöltési prioritást kap.
- Az eredeti fotók változatlanul megmaradnak az `eliza-alapanyag/Új_képek/` mappában.

| Szerep | Aktuális webes kép | Kivágás |
|---|---|---|
| Hero | `images/nyugalom/kezeles.webp` | Magassághoz igazodó, 50% 64% |
| Bőrfiatalítás | `images/nyugalom/borfiatalitas.webp` | 4:3; mobilon 3:2 |
| Hidratálás | `images/nyugalom/hidratalas.webp` | 4:3; mobilon 3:2 |
| Problémás bőr | `images/nyugalom/borallapot.webp` | 4:3; mobilon 3:2 |
| Szakértelem | `images/nyugalom/arctervezes.webp` | Az új készlet 35 1.jpg képe; 1:1, mobilon 4:3; 50% 58% |
| Eliza | `images/nyugalom/eliza.webp` | 3:4, keret nélkül |
| Folyamat | `images/nyugalom/arcmasszazs.webp` | 4:5, legfeljebb 700 px-en 4:3 |

Eliza portréjának jelenlegi megjelenítése: `filter: saturate(1.4) contrast(1.28) brightness(1.02); mix-blend-mode: multiply`. Ez kizárólag ehhez a portréhoz tartozik; nem általános fotófilter.

## 7. Gombok és hivatkozások

| Típus | Kialakítás |
|---|---|
| Elsődleges | Rózsafa háttér, fehér szöveg, 1 px rózsafa keret |
| Másodlagos | Átlátszó háttér, rózsafa szöveg és 1 px keret |
| Világos CTA-gomb | Krém háttér, sötét rózsafa szöveg, rózsafa sávon |
| Forma | Kapszula, 999 px lekerekítés; elvetett aszimmetrikus forma nem használható |
| Alapméret | Legalább 52 px magas; 15×28 px padding; Jost 500, 14 px / 1,3, 0,045 em betűköz |
| Mobil alap | 13 px betűméret, 15×24 px padding; a komponens konkrét felülírása elsőbbséget élvez |
| Kezelési gomb | 14 px, 15×22 px padding, balra igazítva; oszloponként azonos alsó sorhoz rendezve |
| Hover | Sötétebb rózsafa; másodlagosnál púder felület; azonnali színváltás |
| Fókusz | 2 px rózsafa kontúr, 5 px eltartás |

A Hero másodlagos gombja legfeljebb 640 px-en visszafogott, aláhúzott szöveges linkként jelenik meg, nem keretes kapszulaként. Ez főoldali kivétel; a kezelési és a GYIK-gombok mobilon is keretesek.

A gombok nem lebegnek, nem nőnek és nem animálódnak. Navigációhoz `a`, végrehajtott művelethez `button` használandó.

## 8. Tartalmi komponensek

### Kezelési ajánló

Három oszlop, 40 px réssel; 1050 px-től lefelé 24 px rés, 640 px-től lefelé egy oszlop. Kép, kis kategóriafelirat, H3, leírás és balra igazított másodlagos gomb. A gombok felső margója automatikus, a leírások alatti tér 24 px, így az oszlopok alján egy vonalban maradnak. Nincs minden elem köré kártyakeret.

### Szakértelem / előnyök

Két oszlop, `.95fr 1.05fr`, középre igazított függőleges kompozíció. Balra cím, bevezető és a 35 1.jpg alapján készült kép; jobbra négy ikonozott előny. A rés 90 px; 1050 px alatt 52 px, 800 px alatt 40 px; 640 px alatt egymás alatti, 36 px réssel. A funkcionális elválasztók maradnak, a cím fölött nincs díszvonal.

### Bemutatkozás

Legfeljebb 1040 px széles belső kompozíció, asztalon 380 px-es képoldal és szövegoldal, 100 px réssel. A portré mögött nincs keret. 900 px alatt 280 px-es képoldal és 40 px rés, 640 px alatt egymás alatti elrendezés.

### Véleménykártyák

Púder háttér, 16 px lekerekítés, keret és árnyék nélkül. Két egyenlő oszlop, 28 px rés; 640 px alatt egy oszlop. Padding: 36×40 px, 950 px alatt 28 px, 700 px alatt 26 px. Az idézet után rózsafa Jost név; a nevek előtt nincs vonal, nincs külön nagy dekoratív idézőjel. Kizárólag Fruzsi és Magdi meglévő idézete szerepelhet.

### Függőleges folyamat

Balra cím és legfeljebb 320 px széles kép, jobbra négy lépés. Rács `.85fr 1.25fr`, 56 px rés; 701–950 px között `.8fr 1.2fr`, 32 px rés. 700 px alatt egy oszlop. A lépéssor 48 px-es, homokarany keretű körökkel és halvány függőleges összekötővel dolgozik. Számok: Jost 400, 20 px / 1, optikai 1 px lefelé igazítással, pontosan középre helyezve. A lépés címe és szövege a kör mellett áll, a cím fölött nincs díszvonal.

### GYIK

Natív `details` és `summary`. Finom halvány púder elválasztók, jobb oldali rózsafa plusz/mínusz jel, 23 px függőleges sorköz a kérdés körül. Asztalon bevezető és kérdések két oszlopban; 900 px alatt egymás alatt. A „Más kérdésem van” másodlagos gomb az időpontkérőhöz vezet.

## 9. Űrlapok és kapcsolat

- Mező: fehér háttér, 1 px `#E3D6CF` keret, 12 px lekerekítés, 14×16 px padding; a label mindig látható.
- Mezőköz: 20 px; label és input között 8 px. Fókuszra rózsafa keret és látható fókuszjelzés.
- Checkbox: 18×18 px, rózsafa aktív szín, hozzá kapcsolt szöveges címke.
- Időpontkérő kártya: púder háttér, 16 px lekerekítés, 32 px padding; mobilon 24×20 px. A küldőgomb teljes szélességű.
- Hírlevél: teljes név, e-mail és checkbox. Időpontkérés: teljes név, e-mail, üzenet.
- Hiba és visszajelzés: szöveges, `role="status"` / `aria-live="polite"`; nem kizárólag színnel jelzett.
- A jelenlegi főoldali űrlapok bemutatók: nincs levélküldés, adattárolás vagy letöltés. A beküldés utáni szöveg ezt őszintén jelzi.
- A korábban eltávolított, űrlapok fölötti technikai bekezdések nem kerülnek vissza a termékfelületre.
- Éles működéshez a levélküldést, hírlevélszolgáltatót, Kisokost, végleges adatkezelést és demonstrációs elérhetőségeket külön rendezni kell.

## 10. Reszponzív viselkedés és akadálymentesség

| Töréspont | Fő változás |
|---|---|
| 1050 px | Szűkebb konténermargó és rácsrések; 48 px-es Hero H1 |
| 950 px | Kompaktabb folyamat és véleménykártyák |
| 900 px | Hamburger menü; GYIK egy oszlopban |
| 800 px | Hero egymás alatt; 60 px-es világos fejléc |
| 700 px | Folyamat egy oszlopban, kisebb véleménybetű |
| 640 px | 20 px oldalmargó, 16 px törzsszöveg, kezelések/bemutatkozás/vélemények/űrlapok egy oszlopban |

A szakaszok 80 px-es paddingje mobilon sem csökken; a rögzített 20 px-es kivételek megmaradnak. 375 px-en sem lehet vízszintes görgetés. A menü, gombok és GYIK billentyűzettel használhatók; a képek megfelelő alternatív szöveget kapnak.

## 11. Mozgás és interakció

**Animáció nélküli verzió az elfogadott.** Nincs belépés, görgetéses felfedés, blur, parallax, hover-emelkedés, animált átmenet vagy sima görgetés. A menüháttér, a gombszín, a mobilmenü és a GYIK állapota azonnal változik. A korábbi kísérleti animációkat nem kell átvinni az aloldalakra.

## 12. Aloldalak megvalósítási szabályai

- A jelen dokumentum az alap; új paletta, fontpár vagy komponensforma nem szükséges.
- Ugyanaz a fejléc, gombkészlet, lábléc, űrlap és GYIK-komponens ismétlődjön.
- A Kezelések egy gyűjtőoldal; külön kezelési aloldalak nem részei a briefnek.
- A Rólunk a meglévő bemutatkozás és portré stílusát követi; a Kapcsolat egyetlen időpontkérő űrlapot kap.
- A végleges navigáció a megfelelő oldalakra vezessen; a főoldali prototípus jelenlegi menüje még helyi horgonyokat használ.
- Az eredeti forrás inline CSS-ében több korábbi, felülírt szabály van. Az aloldalakhoz a **tényleges végállapotot** kell használni, nem a CSS első előfordulásait.
- Célszerű a közös tokeneket és komponenseket az aloldalak építésekor közös CSS-be rendezni. Ez a dokumentálási kör nem módosítja a jóváhagyott főoldalt.

## 13. Fájlok és referencia

- Jóváhagyott főoldal: [A nyugalom tere](koncepcio-1-a-nyugalom-tere.html).
- Vizuális mintatár: [design-system.html](design-system.html).
- Aktuális márkalogók: `images/logo.svg`, `images/logo-feher.svg`, `images/favicon.svg`.
- Webes képek: `images/nyugalom/`; eredetiek: `eliza-alapanyag/Új_képek/`.
- A régi `eliza-alapanyag/design-system.md` kezdeti alap, nem írhatja felül ezt a főoldalból rögzített rendszert.

A leírás a főoldal forrása és a Chrome-ban 1440, 870 és 375 px-en kiolvasott végleges stílusértékek alapján készült.
