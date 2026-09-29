# Denní lekce se SUN

## O projektu

Aplikace pro **Ami** (8 let, od září 3. třída) — každý den jedna samostatná
lekce: čtení, porozumění textu, psaní a matematika. Průvodkyní je postava
**SUN** (čte se česky „Sun“, ne anglicky jako slunce).

Na rozdíl od ostatních her v Curiku tohle není hra na jedno posezení, ale
denní režim, který si pamatuje pokrok a přizpůsobuje se.

## Co aplikace umí

- Jedna lekce ≈ 30 minut, dávkovaná po krocích (v jeden okamžik jeden úkol)
- Čtení s pomůckami: zvýraznění věty, ukazovátko, slabikování obtížných slov
- Pět otázek k textu — od doslovných po vlastní názor
- Psaní: přímo do aplikace, nebo vyfocení papíru
- Patnáct matematických úloh se třemi stupni nápověd a názornými ukázkami
- Adaptivní obtížnost podle skutečných výsledků
- Hvězdičky, milníky, známka od SUN (jen 1, 1− nebo 2)
- Rodičovský přehled s grafy, historií a exportem pro učitelku

## Soubory

```
lekce/
├── index.html          dětský režim
├── rodic.html          rodičovský přehled (chráněný PINem)
├── style.css           společné styly
├── rodic.css           styly navíc pro přehled
├── data/
│   ├── texty.js        12 čtenářských textů + Slovní detektiv
│   └── ulohy.js        24 předloh slovních úloh
├── js/
│   ├── postava.js      SUN jako kreslená postava (SVG, 6 výrazů)
│   ├── storage.js      ukládání (server + záloha v prohlížeči)
│   ├── sound.js        zvuky (převzato z nasobilka/)
│   ├── pokrok.js       sledování dovedností, adaptivní obtížnost
│   ├── matika.js       generátor úloh a nápověd
│   ├── cteni.js        vyhodnocení odpovědí na otázky
│   ├── psani.js        psací úkoly a práce s fotkou
│   ├── sun.js          hlášky a tón průvodkyně
│   ├── hodnoceni.js    hvězdičky, milníky, známka, závěr
│   ├── app.js          řízení průběhu lekce
│   └── rodic.js        rodičovský přehled
└── testy/              spouští se: node lekce/testy/spust-vse.js
```

Serverová část: `netlify/functions/lekce.mjs` → endpoint `/api/lekce`.

## Jak jsou uložená data

**Rodinný klíč** — při prvním spuštění se vygeneruje 32znakový náhodný
řetězec. Uloží se do prohlížeče a jde s každým požadavkem na server. Bez něj
se k datům nikdo nedostane; klíč se nikde nevypisuje ani neindexuje.
Rodič si ho může zobrazit v nastavení a přenést na jiné zařízení.

**PIN** chrání jen rodičovský přehled před dítětem na stejném iPadu.
Není to zabezpečení dat — tím je rodinný klíč.

Data leží v Netlify Blobs pod `{klíč}/stav.json`, fotky pod `{klíč}/foto/{id}`.
Všechno se zároveň drží v localStorage, takže výpadek internetu uprostřed
lekce nic neztratí — dodatečně se to odešle.

## Adaptivní obtížnost

Pro každou dovednost zvlášť (`js/pokrok.js`) se sleduje úroveň, počet pokusů,
úspěšnost bez nápovědy, trend a „jistota“ zvládnutí (0–1).

- **Nahoru** se jde po třech správných za sebou a jistotě aspoň 0,6
- **Dolů** po třech chybách z posledních pěti pokusů
- Dítěti se o změně nic neříká — žádné „vrácení na nižší úroveň“

Opakování v rozestupech: dovednost, která dlouho nebyla na řadě nebo jde hůř,
má větší šanci se objevit. Co bylo dnes, se dnes znovu nevrací.

**Čtenářská úroveň** (1–5, řídí délku textu) je oddělená od matematiky.
Postoupí jen tehdy, když tři lekce po sobě splní všechny podmínky.

## Hvězdičky

Deset za lekci: 3 čtení · 2 porozumění · 1 psaní · 3 matematika · 1 vytrvalost.

**Klíčové pravidlo:** hvězdičky se nedávají jen za správné výsledky. Odměňuje
se i dočtení obtížného slova, oprava vlastní chyby, vysvětlení postupu,
odpověď celou větou nebo to, že si Ami řekla o nápovědu místo aby to vzdala.
Poslední hvězdičku za vytrvalost nelze získat za správnost vůbec.

Známka je vždy **1, 1− nebo 2**. Horší se nedává. Ve slabý nebo nedokončený
den se nedává žádná.

## Tón SUN

SUN je laskavá starší kamarádka — ne učitelka, ne maskot, ne nadšený robot.

**Nikdy neřekne:** „To je špatně“, „To neumíš“, „Zase jsi udělala chybu“,
„Nedávala jsi pozor“, „Tohle už bys měla umět“.

**Místo toho:** „Tady nás čeká malá oprava“, „Byla jsi blízko“, „Začátek máš
správně“, „Najdeme společně místo, kde se výpočet změnil“.

Seznam zakázaných formulací je v `SUN.ZAKAZANE` a **kontroluje ho test**.
Každý text, který jde na obrazovku, prochází filtrem `SUN.bezpecne()`.
Když přidáváš novou hlášku, spusť testy — chytnou to.

## Vzhled

**Klid a prostor.** Aplikace pro každodenní práci, ne pro efekt — dítě se v ní
má soustředit na text a příklady, ne na rozhraní.

Tři pravidla, kterými se to drží:

1. **Jeden akcent.** Indigová `#3e4c9b` dělá ovládání. Ostatní barvy nesou
   stav (správně, pozor, odměna) a nikde jinde se neobjeví.
2. **Žádné gradienty, žádné záře, žádné dekorativní stíny.** Plochy jsou
   ploché, oddělené jednopixelovou linkou a prostorem.
3. **Hierarchii nese typografie a mezery,** ne barvy a rámy.

**Paleta:** pozadí `#f6f7f9`, plocha `#ffffff`, linka `#e3e6eb`,
text `#16181d`. Stavové: správně `#2e7d5b`, pozor `#b5622c`,
odměna `#c9820f`. Tmavý motiv (`data-motiv="tma"`) je tlumený, na čtení večer.

**Písma:** **Plus Jakarta Sans** na rozhraní i nadpisy (jedno písmo v celém
rozsahu řezů drží stránku pohromadě a je současnější než míchat dvě
dekorativní), **Atkinson Hyperlegible** jen na čtený text — nenahrazovat,
jeho b/d/p/q a a/o/e se dají rozlišit, což je přesně to, co Ami plete.

**Ukazovátko** potlačuje nezvýrazněné řádky na `opacity: 0.55` — ne níž,
jinak se dítě nemůže očima vrátit o věty výš.

**Čeho se vyhnout** (vypadá to jako generický AI vzhled): karty s barevným
pruhem vlevo, emoji jako značky sekcí, vše na střed, krémová se serifem
a terakotou, purpurový gradient na bílé, neonová záře.

**Míry pro tablet:** dotykové plochy od 52 px, číselné pole 76 px vysoké,
zadání příkladu `clamp(2.6em, 12vw, 3.6em)`.

**Historie:** vzhled prošel třemi verzemi — pastelová meruňková (příliš
dětská), temná neonová (bolela do očí), a tato klidná. Kdyby přišla čtvrtá,
tohle je směr, od kterého se odráží.

## SUN jako postava

`js/postava.js` kreslí SUN v SVG ze základních tvarů. Má tmavé vlasy
s tlumeným pramenem, **sluchátka na hlavě** a náušnice — starší look, ne
roztomilá holčička. Barvy jsou záměrně tlumené: na světlém podkladu by sytá
postava bila do očí a přetahovala pozornost od textu. Šest výrazů:

| Výraz | Kdy |
|---|---|
| `klid` | výchozí, čtení |
| `radost` | po správné odpovědi |
| `povzbuzeni` | po chybě |
| `zamysleni` | u nápovědy a otázek |
| `nadseni` | u odměn a milníků |
| `unaveni` | když Ami řekne, že je unavená |

Výraz se mění přes `App.vyrazSUN(situace)`. Když Ami zvolí „jsem unavená",
zůstane SUN ztišená **celou lekci** — ne jen na tu sekundu po odpovědi.
Řeší to `bublinaSUN()` podle `lekce.energie`.

Při úpravě výrazů: **ospalost patří do očí, ne do obočí.** Zalomené obočí
udělá z SUN mrzutou postavu, a to nikdy není.

Pozor na `clipPath` — cokoli nakresleného v ofině musí ležet uvnitř výřezu
hlavy, jinak se to odstřihne. Takhle zmizel neonový pramen při prvním pokusu.
Sluchátka se kreslí **až po tváři**, jinak je tvář překryje.

## Lidskost, ne jen zdvořilost

Tohle je to, co dělá rozdíl mezi hlasem aplikace a kamarádkou. V `sun.js`:

- `vzpominkaNaMinule(stav)` — naváže na minulou lekci: delší pauzu, téma
  textu, opravené chyby, i konkrétní větu, kterou Ami napsala. Bez dat vrací
  `null` a nic se nevymýšlí.
- `procTentoText(id)` — SUN řekne, proč si text vybrala. Dítě pak nečte
  zadaný text, ale něco, co jí někdo přinesl. **Nový text = doplnit i sem.**
- `obcasnyPostreh(kde)` — vlastní poznámka, ale jen ve ~třetině případů.
  Kdyby to dělala vždy, znělo by to jako povídavý automat.
- `vsimniSiPsani(text)` — všimne si otazníku, vykřičníku, délky nebo slova
  „protože“. Nehodnotí obsah, jen si všímá jako člověk.
- `rozlouceni`, `coDnesCeka` — rámují lekci.

Slovo **„mise" se nepoužívá** — znělo technicky.

## Přístupnost

Vychází z toho, co Ami dělá potíže: plete si a/o, p/b/d, i/e a domýšlí si
konce slov.

- Čtený text sází **Atkinson Hyperlegible** — písmo navržené tak, aby se tyhle
  dvojice daly rozlišit. Nenahrazuj ho běžným fontem.
- Velikost písma a řádkování se nastavují přes `data-pismo` a `data-radkovani`
  na `<html>` — mění se všude naráz
- Text je zarovnaný vlevo, ne do bloku (nevznikají „řeky“ mezer, které
  svádějí oko z řádku)
- Žádné blikání, žádné červené obrazovky při chybě, žádné časovače
- Dotykové plochy nejméně 44 px, focus je vždy vidět
- Barva nikdy nenese informaci sama — vždy je u ní text nebo ikona

## Testy

```
node lekce/testy/spust-vse.js
```

Nepotřebují internet ani instalaci. Kontrolují mimo jiné, že každá
matematická úloha má správný výsledek (přepočítává se nezávisle na
generátoru), že texty mají délku odpovídající úrovni, že SUN nepoužije
zakázanou formulaci a že na sebe soubory navazují.

**Spusť je vždy před commitem** — hlavně po zásahu do `matika.js`,
`data/texty.js` nebo `sun.js`.

## Bez AI

Aplikace zatím **nepoužívá žádnou AI** — texty jsou předpřipravené a odpovědi
se vyhodnocují podle klíčových slov a stavby věty (`js/cteni.js`).

Fotky napsaných úkolů proto **nelze automaticky vyhodnotit**. Ami za odevzdání
dostane hvězdičku a fotku ohodnotí rodič v přehledu.

Kdyby se AI někdy zapínala, jsou na to připravená dvě místa:
- `Cteni.vyhodnot()` — posouzení odpovědi
- `Psani.vysledekFotky()` — přečtení rukopisu z fotky

Zbytek by zůstal beze změny. Klíč by musel jít přes serverovou funkci, nikdy
ne do prohlížeče.

## Při přidávání obsahu

**Nový text ke čtení** (`data/texty.js`): délka musí odpovídat úrovni
(1 = 120–160 slov, 2 = 160–220, 3 = 220–300, 4 = 300–400, 5 = 400–520),
nejvýš tři obtížná slova se slabikami a pět otázek v pořadí
`z-textu, z-textu, vlastnimi-slovy, proc-jak, nazor`. Klíčová slova pro
vyhodnocení piš jako **kmeny bez koncovek** (`kolumbi`, ne `Kolumbie`),
ať fungují na všechny pády. Test délku i strukturu ověří.

**Nová slovní úloha** (`data/ulohy.js`): generátor sám hlídá, aby odčítání
nedalo záporné číslo, dělení vyšlo beze zbytku a výsledek se vešel do sta.

**Nová matematická dovednost** (`js/matika.js`): přidat do `DOVEDNOSTI`,
napsat `gen_nazev_dovednosti()` a tři nápovědy (strategie → první krok →
podobný příklad). Pokud má názornou ukázku, doplnit i případ do
`App.vykresliVizualizaci()`.

## Známé odchylky od původního zadání

- **Mikrofon a nahrávání čtení** nejsou. České rozpoznávání řeči v prohlížeči
  na iPadu není dost spolehlivé na to, aby se z něj dalo poznat, jestli Ami
  zaměnila b/d — vedlo by to k falešným hlášením.
- **Fotky se nevyhodnocují automaticky** — viz oddíl „Bez AI“ výše.
- **Úroveň 5** (text na stranu A4) zatím nemá žádný text. Aplikace si v tom
  případě půjčí z nejbližší nižší úrovně.
