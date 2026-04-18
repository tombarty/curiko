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
- **Vanilla HTML + CSS + JS** — žádné frameworky, žádný npm
- **Mobile-first** — primárně se hraje na telefonu/tabletu
- **Uživatel (Tomáš) není programátor** — vysvětlovat srozumitelně, bez žargonu, konzultovat postup

## Struktura projektu

```
Curiko/
├── .git/                  ← Git repozitář
├── .gitignore
├── CLAUDE.md              ← tento soubor
├── index.html             ← rozcestník (hlavní stránka Curiko)
├── svet-poznani/          ← Magický svět poznání (viz svet-poznani/CLAUDE.md)
│   ├── index.html
│   ├── style.css
│   └── js/ (storage, sound, themes, story, games, arcade, app)
├── petiminutovky/         ← Pravopisné pětiminutovky (viz petiminutovky/CLAUDE.md)
│   ├── index.html
│   └── data.js
└── pribehova-hra/         ← Dobrodružství Laury
    ├── index.html
    ├── style.css
    ├── game.js
    ├── chapters/chapter1.js
    └── images/ (webp obrázky pro komiks)
```

## Rozcestník (index.html v rootu)

Hlavní stránka se 3 kartami — každá odkazuje na podadresář:
- `./svet-poznani/` → Magický svět poznání
- `./petiminutovky/` → Pravopisné pětiminutovky
- `./pribehova-hra/` → Dobrodružství Laury

Tmavě fialový design, gradient logo "Curiko", font Nunito.

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

- **GitHub**: https://github.com/tombarty/curiko (účet: tombarty)
- **Netlify**: propojeno s GitHub repozitářem — automatický deploy při `git push`
- **Workflow**: úprava kódu → `git add . && git commit -m "popis" && git push` → automaticky online

## Tři hry — přehled

### 1. Magický svět poznání (`svet-poznani/`)
- 6 říší (vesmír, les, draci, zvířata, roboti, zahrada), 3 levely, 17 kapitol
- Předměty: matematika, čeština, angličtina
- 14 typů mini-her + 3 arkádové hry (Snake, Flappy, Breakout) jako odměna za level
- Level 3 rozšířen o 3 specifické hry pro Amélii (čtení s porozuměním, diakritika, skládání slov)
- Gamifikace: hvězdičky, hodnosti, série (až do 10+), tematické motivační hlášky per říše
- Detailní dokumentace: viz `svet-poznani/CLAUDE.md`

### 2. Pravopisné pětiminutovky (`petiminutovky/`)
- 12 kategorií pravopisu, 15 otázek na kolo
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

## Při přidávání nové hry do Curiko

1. Vytvořit podadresář v `Curiko/`
2. Přidat kartu do `index.html` rozcestníku
3. Přidat fixní patičku s "Autor hry" (viz vzor v ostatních hrách)
4. Přidat stránku "Autor hry" se stejným obsahem (LinkedIn, QR kód)
5. Commitnout a pushnout

## Při přidávání nového typu mini-hry do Světa poznání

1. Data: přidat pole do `GAME_DATA` v `games.js`
2. Render: přidat `renderNazev()` funkci do `Games` objektu v `games.js`
3. Switch: přidat `case` do `Games.render()` switch bloku
4. Témata: v `themes.js` přidat typ do `games[]`, `titles`, `stories` ve VŠECH 6 říších
5. Zóny: přidat chapter ID do `zones` ve VŠECH 6 říších
6. Story: přidat chapter ID do `STORY.chapters` v `story.js`
7. Levely: pokud nový level, upravit `LEVELS` a `TOTAL_CHAPTERS` v `app.js`
