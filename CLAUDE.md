# Curiko — vzdělávací hry pro zvědavé děti

## O projektu

**Curiko** je značka sdružující vzdělávací webové hry pro děti ve 2. třídě ZŠ (7–8 let). Název vychází z latinského *curiositas* (zvědavost) a zní jako japonské holčičí jméno. Doména `curiko.cz` je volná (stav duben 2026).

Projekt je určený primárně pro dceru Amélii, která má speciální vzdělávací potřeby (SVP I. stupně) — doporučení z diagnostiky zahrnují:
- Krátké a časté procvičování ("pracovat krátce a častěji")
- Čtení s porozuměním (10 min denně)
- Sluchové vnímání (rozlišování hlásek, sklad/rozklad slov)
- Diakritika (psaní háčků/čárek současně s písmenem)
- Multisenzoriální přístup
- Pozitivní zpětná vazba za snahu

## Technická pravidla (platí pro VŠECHNY podprojekty)

- **Žádný build systém** — vše funguje otevřením `index.html` v prohlížeči
- **Vanilla HTML + CSS + JS** — žádné frameworky, žádný npm ve hrách
  (jediná výjimka je `package.json` kvůli počítadlu návštěv — viz níže, hry se ho netýkají)
- **Mobile-first** — primárně se hraje na telefonu/tabletu
- **Uživatel (Tomáš) není programátor** — vysvětlovat srozumitelně, bez žargonu, konzultovat postup

## Struktura projektu

```
Curiko/
├── .git/                  ← Git repozitář
├── .gitignore
├── CLAUDE.md              ← tento soubor
├── index.html             ← rozcestník (hlavní stránka Curiko)
├── netlify.toml           ← konfigurace nasazení
├── package.json           ← jen kvůli @netlify/blobs (počítadlo návštěv)
├── netlify/
│   └── functions/counter.mjs   ← serverová funkce — počítadlo návštěv
├── svet-poznani/          ← Magický svět poznání (viz svet-poznani/CLAUDE.md)
│   ├── index.html
│   ├── style.css
│   └── js/ (storage, sound, themes, story, games, arcade, app)
├── petiminutovky/         ← Pravopisné pětiminutovky (viz petiminutovky/CLAUDE.md)
│   ├── index.html
│   └── data.js
├── pribehova-hra/         ← Dobrodružství Laury
│   ├── index.html
│   ├── style.css
│   ├── game.js
│   ├── chapters/chapter1.js
│   └── images/ (webp obrázky pro komiks)
├── hodiny/                ← Hodinový mistr
│   ├── index.html
│   ├── style.css
│   └── js/ (storage, sound, motivace, clock, teach, games, app)
├── pismena/               ← Slovní ostrov
│   ├── index.html
│   ├── style.css
│   └── js/ (storage, sound, motivace, words, games, app)
└── nasobilka/             ← Druhákova násobilka
    ├── index.html
    ├── style.css
    └── js/ (storage, sound, motivace, games, app)
```

Adresář `scany-petiminutovek/` (skeny učebnice) je jen pracovní materiál na disku —
je v `.gitignore` a do repozitáře nepatří.

## Rozcestník (index.html v rootu)

Hlavní stránka se 6 kartami — každá odkazuje na podadresář (v tomto pořadí):
1. `./svet-poznani/` → ✨ Magický svět poznání
2. `./petiminutovky/` → ✏️ Pravopisné pětiminutovky
3. `./pribehova-hra/` → 🌲 Dobrodružství Laury
4. `./hodiny/` → 🕐 Hodinový mistr
5. `./pismena/` → 📚 Slovní ostrov
6. `./nasobilka/` → ✖️ Druhákova násobilka

Tmavě fialový design, gradient logo "Curiko", font Nunito.
Dole na stránce je počítadlo návštěv (viz níže).

## Počítadlo návštěv

- Soubor: `netlify/functions/counter.mjs`, endpoint `/api/counter`
- `GET /api/counter` vrátí `{ count: N }`, `GET /api/counter?action=up` počet zvýší o 1
- Data se ukládají do **Netlify Blobs** (store `curiko-counter`, klíč `sessions`) — přežijí i nový deploy
- Volá se z rozcestníku (`index.html`, konstanta `BASE = '/api/counter'`)
- Kvůli téhle jediné funkci má projekt `package.json` se závislostí `@netlify/blobs`.
  **Pozor:** to není build systém — hry samotné žádné npm nepotřebují.
- Funkce běží **jen na Netlify**. Při otevření `index.html` z disku počítadlo nefunguje
  (ukáže prázdno) — to je v pořádku a není to chyba.

## Patička "Autor hry"

Každý podprojekt i rozcestník má **fixní patičku** (`position: fixed; bottom: 0; z-index: 99999`) s odkazem "Autor hry", která vede na stránku s:
- Jméno: **Tomáš Bártek**
- Vytvořeno s **Claude Code**
- Text: "Pro nápady a zpětnou vazbu mi napiš na LinkedIn"
- LinkedIn: https://www.linkedin.com/in/tomasbartek/
- QR kód pro platbu 30 Kč (SPD standard, IBAN CZ8262106701002211168451, mBank)
- Copyright © 2026

QR kód se generuje pomocí CDN knihovny `qrcode-generator`.

## Nasazení (deploy)

- **GitHub**: https://github.com/tombarty/curiko (účet: tombarty), větev `main`
- **Netlify**: propojeno s GitHub repozitářem přes GitHub App — automatický deploy při `git push`.
  Propojení je na straně Netlify, ne lokálně (žádné Netlify CLI, žádný `.netlify/` adresář).
- **`netlify.toml`**: `publish = "."` — žádný build krok, Netlify jen zkopíruje soubory tak, jak jsou.
  Funkce z `netlify/functions/` bundluje esbuild.
- **Workflow**: úprava kódu → `git add . && git commit -m "popis" && git push` → automaticky online
- **Pozor**: `push` znamená okamžité zveřejnění. Před commitem a pushem se vždy zeptat.

## Šest her — přehled

### 1. Magický svět poznání (`svet-poznani/`)
- 6 říší (vesmír, les, draci, zvířata, roboti, zahrada), 3 levely, 17 kapitol
- Předměty: matematika, čeština, angličtina
- 14 typů mini-her + 3 arkádové hry (Snake, Flappy, Breakout) jako odměna za level
- Level 3 rozšířen o 3 specifické hry pro Amélii (čtení s porozuměním, diakritika, skládání slov)
- Gamifikace: hvězdičky, hodnosti, série (až do 10+), tematické motivační hlášky per říše
- Detailní dokumentace: viz `svet-poznani/CLAUDE.md`

### 2. Pravopisné pětiminutovky (`petiminutovky/`)
- **43 kategorií**, 1289 slov, cíl 15 správných odpovědí na kolo
- Dvě sekce (dělí je položka `{ _section: '...' }` v poli):
  - **11 základních** — y/i, ú/ů, dě/tě/ně, bě/pě/vě/mě, párové souhlásky…
  - **📚 Procvičování z učebnice** — 31 kategorií, 1 stránka učebnice = 1 kategorie,
    strany 2 → 32 (str. 33 je klíč s řešením, nepřevádí se)
  - na konci `mix-all` — sbírá slova ze všech ostatních kategorií
- **Řazení podle stran je fyzické** — kategorie jsou v poli `BONUS_CATEGORIES`
  napsané v pořadí 2, 3, 4 … 32. Žádný runtime sort neexistuje, takže novou stranu
  je nutné vložit na správné místo v poli.
- Konvence ID je `něco-NN` (číslo strany), ale 5 starších kategorií ji nedodržuje
  (`iy-phrases` = str. 17, `lowup-phrases` = 18, `hch-phrases` = 26,
  `vf-phrases` = 27, `zs-phrases` = 28) — číslo strany je u nich jen v `title`.
- Motivační prvky: raketa, vláček, vajíčko (náhodně při startu)
- Dva soubory: `index.html` + `data.js`
- Detailní dokumentace: viz `petiminutovky/CLAUDE.md`

### 3. Dobrodružství Laury (`pribehova-hra/`)
- Příběhová hra — komiks s obrázky (webp)
- Průchod scénami s volbami a úkoly
- Start → hra → odměna → další kapitola
- Batůžek (inventář) s předměty
- Soubory: `index.html`, `style.css`, `game.js`, `chapters/chapter1.js`, `images/`
- Styl: papírový/krémový design (#fdf6e3), Comic Sans font

### 4. Hodinový mistr (`hodiny/`)
- Učení a procvičování hodin — analogové i digitální
- 6 typů úkolů + Mix: `match` (přiřaď čas), `set-hands` (nastav ručičky),
  `words` (slovně → čas), `ampm` (dopo/odpoledne), `minutes` (jen minuty),
  `day-night` (kdy co děláš)
- **Výukový režim** (`js/teach.js`) — vysvětlí látku a ověří ji otázkami, než se jde hrát
- `js/clock.js` — vykreslování ciferníku s ručičkami
- Odměna: obrazovka s kukačkou (`screen-kukacka`)

### 5. Slovní ostrov (`pismena/`)
- Práce se slovy — čtení, skládání, oprava chyb
- 5 typů úkolů + Mix: `compose` (slož slovo z písmen podle obrázku),
  `quick` (rychlé čtení — slovo blikne), `findword` (najdi slovo v mřížce),
  `fill` (doplň chybějící písmeno), `fix` (najdi a oprav chybu ve větě)
- Slovní zásoba v `js/words.js`
- Odměna: truhla s pokladem (`screen-truhla`)

### 6. Druhákova násobilka (`nasobilka/`)
- Násobení a dělení 2, 3 a 4
- 6 úkolů + Mix: `mul2/mul3/mul4` a `div2/div3/div4`
- Odměna: truhla s mincemi (`screen-truhla`)

### Společná stavba her 4–6
Hodiny, Slovní ostrov i Násobilka sdílejí stejnou kostru:
`index.html` + `style.css` + `js/` s moduly `storage` (localStorage),
`sound` (Web Audio API), `motivace` (motivační hlášky), `games` (generátor úkolů —
switch podle `data-mode` z menu), `app` (orchestrace menu → hra → výsledky → odměna).
Novou hru tohoto typu je nejjednodušší postavit zkopírováním `nasobilka/` (je nejmenší).

## Při přidávání nové hry do Curiko

1. Vytvořit podadresář v `Curiko/`
2. Přidat kartu do `index.html` rozcestníku
3. Přidat fixní patičku s "Autor hry" (viz vzor v ostatních hrách)
4. Přidat stránku "Autor hry" se stejným obsahem (LinkedIn, QR kód)
5. Otestovat, ukázat Tomášovi a **až po odsouhlasení** commitnout a pushnout

## Při přidávání nového typu mini-hry do Světa poznání

1. Data: přidat pole do `GAME_DATA` v `games.js`
2. Render: přidat `renderNazev()` funkci do `Games` objektu v `games.js`
3. Switch: přidat `case` do `Games.render()` switch bloku
4. Témata: v `themes.js` přidat typ do `games[]`, `titles`, `stories` ve VŠECH 6 říších
5. Zóny: přidat chapter ID do `zones` ve VŠECH 6 říších
6. Story: přidat chapter ID do `STORY.chapters` v `story.js`
7. Levely: pokud nový level, upravit `LEVELS` a `TOTAL_CHAPTERS` v `app.js`
