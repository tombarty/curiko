# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Curiko — vzdělávací hry pro zvědavé děti

Statický web se vzdělávacími hrami rozdělený podle ročníku: **předškoláci, 2. třída, 3. třída**
(+ hra pro interaktivní tabuli ve třídě). Název je z latinského *curiositas* (zvědavost); doména
`curiko.cz` byla v dubnu 2026 volná, web běží na https://curiko.netlify.app.

Primárně pro dceru se speciálními vzdělávacími potřebami (SVP I. stupně). Z doporučení diagnostiky
vychází design her: krátké a časté procvičování, čtení s porozuměním, sluchové vnímání (hlásky,
sklad/rozklad slov), diakritika, multisenzoriální přístup, pozitivní zpětná vazba za snahu.

**Uživatel (Tomáš) není programátor** — vysvětlovat srozumitelně česky, bez žargonu, konzultovat postup.

## Technická pravidla

- **Vanilla HTML + CSS + JS, žádný build, žádný framework, žádný npm ve hrách.** Každá hra jde
  otevřít dvojklikem na `index.html`. Externí závislosti jen z CDN (Google Fonts Nunito,
  `qrcode-generator` z jsDelivr).
- `package.json` existuje **jen** kvůli `@netlify/blobs` pro serverové funkce — není to build systém.
- **Mobile-first** (telefon/tablet); výjimka je `3-trida/zavod/`, ta je pro tabuli na šířku 16:9.
- Texty, komentáře i identifikátory jsou česky (`uloha`, `spravne`, `rezimy`…) — psát stejně.

## Příkazy

```bash
# Lokální spuštění (z kořene repozitáře) — pak http://localhost:8791/
python3 -m http.server 8791

# Testy (existují jen pro Denní lekci) — všechny / jeden soubor
node lekce/testy/spust-vse.js
node lekce/testy/matika.test.js      # dále cteni, texty, hodnoceni, propojeni (*.test.js)

# Kontrola syntaxe JS
node --check cesta/k/souboru.js
```

Serverové funkce (`/api/counter`, `/api/lekce`) běží **jen na Netlify** — lokálně počítadlo
návštěv ukáže prázdno a Denní lekce ukládá jen do prohlížeče. Není to chyba.

Lint ani formátovač v projektu není. Při ověřování v prohlížeči pozor na mezipaměť
(`python3 -m http.server` neposílá `no-store` → Cmd+Shift+R nebo jiný port).

## Architektura

### Navigace podle ročníků
`index.html` (výběr ročníku) → `predskolaci/`, `2-trida/`, `3-trida/` — každý má rozcestník
s kartami her. Rozcestníky jsou kopie hlavní stránky (stejné CSS, patička, počítadlo).

- **Hry 2. třídy leží v kořeni** (`svet-poznani/`, `petiminutovky/`, `pribehova-hra/`, `hodiny/`,
  `pismena/`, `nasobilka/`, `lekce/`) — záměrně se nestěhovaly kvůli záložkám a uloženému
  postupu. Jejich odkaz „zpět“ vede na `../2-trida/index.html`.
- **Nové hry** patří do složky ročníku (`3-trida/nova-hra/`) s odkazem zpět `../index.html`
  a kartou v rozcestníku ročníku.

### Rodiny her (sdílená kostra — novou hru stavět kopírováním nejbližšího vzoru)
| Kostra | Hry | Jak funguje |
|---|---|---|
| `index.html` + `style.css` + `js/{storage,sound,motivace,games,app}.js` | `hodiny/`, `pismena/`, `nasobilka/`, `3-trida/nasobilka/` | `games.js` generuje úkol podle `data-mode` z menu, `app.js` řídí menu → hra → výsledky → odměna. Nejmenší vzor je `nasobilka/`. |
| Pětiminutovky: `index.html` + `data.js` (data + engine) | `petiminutovky/`, `3-trida/petiminutovky/` | Pole `BONUS_CATEGORIES`, položka `['slo_vo', 'odpověď', [volby]]`, kategorie s `_stages` = etapy. |
| `predskolaci/spolecne/zaklad.js` (+ `zaklad.css`, `slova.js`) | `predskolaci/{pamet,pocty,sluch,prostor,logika}/` | Hra = `index.html` (jen skripty) + `hra.js` volající `Zaklad.start({ id, nazev, emoji, popis, rezimy })`. Režim má `uloha(ctx)`, staví úkol do `ctx.stage` a volá `ctx.spravne()` / `ctx.spatne()`. Engine řeší kolo 5 úkolů, hlas (`speechSynthesis` cs-CZ — předškolák nečte), hvězdičky a **adaptivní úroveň 1–3**. Obrázky jsou jen emoji. |
| Samostatné | `predskolaci/obkreslovani/`, `3-trida/zavod/`, `svet-poznani/`, `pribehova-hra/`, `lekce/` | Vlastní struktura — viz komentáře v kódu a podsložková CLAUDE.md. |

**Pozor na kopie kódu:** `3-trida/petiminutovky/data.js` obsahuje kopii enginu z
`petiminutovky/data.js` (od „Motivační motivy“) a `3-trida/nasobilka/` je kopie `nasobilka/`.
Oprava chyby v enginu se musí udělat v obou.

`3-trida/zavod/` (dva týmy proti sobě na interaktivní tabuli): odpovědi přes `pointerdown`, aby
na vícedotykové tabuli mohly oba týmy ťukat současně; úlohy z `js/ulohy.js` — `generuj(cisla, druh)`
vrací `{ otazka, spravne, moznosti }`, jiný typ úloh = nová funkce se stejným výstupem.

### localStorage — jeden origin pro všechny hry
Všechny hry běží na stejné doméně, takže **sdílejí localStorage**. Každá hra musí mít vlastní klíč,
jinak se postup přepisuje. Používané klíče: `hodiny_save`, `pismena_save`, `nasobilka_save`,
`nasobilka3_save`, `fantazie_save` / `fantazie_theme` (Svět poznání), `pp_stages_done`,
`pp3_stages_done`, `pp_theme`, `obk_hotovo`, `obk_hlas`, `pred_urovne`, `pred_hlas`,
`lekce_rodinny_klic`. Data se ukládají jako JSON, žádná databáze.

### Netlify
- `netlify.toml`: `publish = "."` (žádný build), funkce z `netlify/functions/` bundluje esbuild.
- `counter.mjs` → `/api/counter`: počítadlo návštěv v Netlify Blobs (store `curiko-counter`),
  volá se z rozcestníků; `?action=up` jen jednou za session (`sessionStorage`).
- `lekce.mjs` → `/api/lekce`: stav a fotky Denní lekce pod náhodným „rodinným klíčem“.
- Netlify na živém webu přepisuje odkazy na krátké tvary (`./zavod/index.html` → `/3-trida/zavod/`)
  — při ověřování nasazení hledat podle textu, ne podle `href`.

### Povinná patička „Autor hry“
Každá hra i rozcestník má fixní patičku (`position: fixed; bottom: 0; z-index: 99999`) s odkazem
na stránku: Tomáš Bártek, „Vytvořeno s Claude Code“, „Pro nápady a zpětnou vazbu mi napiš na
LinkedIn“ (https://www.linkedin.com/in/tomasbartek/), QR platba 30 Kč (SPD,
`ACC:CZ8262106701002211168451`, generuje `qrcode-generator`), © 2026. Kopírovat z existující hry.

## Obsah z papírových předloh (pětiminutovky)

- **1 strana sešitu = 1 kategorie, 1 sloupec = 1 etapa.** Pod sloupcem je v sešitu rámeček
  s počtem mezer — počet položek v etapě se s ním musí shodovat.
- Spojení s více mezerami se rozkládá na víc položek (každá má právě jedno `_`).
- Volby přesně podle zadání cvičení (`bě/pě/vě/mě` → 4 volby); velká/malá písmena `['š','Š']`.
- Kategorie jsou v poli seřazené fyzicky podle stran (žádný runtime sort), `mix-all` vždy poslední.
  ID `tema-NN` (2. třída má 5 starších výjimek — viz `petiminutovky/CLAUDE.md`).
- Nejistá slova nehádat — dát Tomášovi seznam k ověření. Osvědčilo se nezávislé „slepé“
  vyřešení (bez znalosti klíče) a strojové porovnání s daty.
- Skeny a fotky předloh (`*.pdf`, `IMG_*`, `scany-petiminutovek/`) jsou v `.gitignore` —
  autorská práva, do repozitáře nepatří.

## Svět poznání — nový typ mini-hry (zasahuje do 4 souborů)
1. `games.js`: data do `GAME_DATA`, funkce `renderNazev()` v objektu `Games`, `case` v `Games.render()`
2. `themes.js`: typ do `games[]`, `titles`, `stories` a chapter ID do `zones` ve **všech 6 říších**
3. `story.js`: chapter ID do `STORY.chapters`
4. `app.js`: při novém levelu upravit `LEVELS` a `TOTAL_CHAPTERS`

## Nasazení

- GitHub `tombarty/curiko` (větev `main`, **veřejný repozitář**) → Netlify GitHub App →
  automatický deploy po pushi (propojení je na straně Netlify, žádné Netlify CLI).
- **Push = okamžitě online. Před commitem i pushem se vždy zeptat.** Před commitem spustit testy
  nebo hru ověřit v prohlížeči.
- Repozitář je veřejný → do kódu ani dokumentace nepsat jméno dítěte ani další osobní údaje.

## Podrobná dokumentace
`lekce/CLAUDE.md` (Denní lekce: data, adaptivita, tón průvodkyně SUN, testy),
`svet-poznani/CLAUDE.md`, `petiminutovky/CLAUDE.md`.
