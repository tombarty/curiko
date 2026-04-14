# Pravopisné pětiminutovky

## O projektu
Webová aplikace pro procvičování českého pravopisu, určená pro děti (2. třída ZŠ). Spustitelná přímo otevřením `index.html` v prohlížeči — žádný build, žádné frameworky.

## Technologie
- HTML + CSS + vanilla JavaScript
- Dva soubory: `index.html` (layout, styly, aplikační logika) a `data.js` (data kategorií, herní engine, motivační motivy)
- Google Fonts (Nunito)
- Zvuky přes Web Audio API (objekt `Sound`)

## Struktura kódu

### index.html
- **CSS proměnné**: tmavý/světlý motiv (`data-theme`)
- **Obrazovky**: `#screen-menu` (výběr kategorie), `#screen-game` (hra + výsledek)
- **App objekt**: řídí navigaci, přepínání tématu, zobrazení výsledků
- **Hodnocení na výsledkové stránce**: podle počtu chyb (0–1: Perfektní, 2–3: Výborně, 4–5: Dobře, 6–7: Jde to, 8+: Ještě procvičuj) + skóre v závorce (např. "15 z 17")

### data.js
- **BONUS_CATEGORIES**: pole kategorií, každá s `id`, `title`, `emoji`, `description`, `words`
- **Formát slov**: `['slovo_s_mezerou', 'správná_odpověď', ['volba1', 'volba2']]`
- **MOTIFS**: 3 motivační prvky (raketa, vláček, vajíčko) — každý má `render(pct, score, target)` funkci
- **BonusGame**: herní engine — `start()`, `render()`, `submit()`, TARGET_SCORE = 15
- **Mix kategorie**: `_isMix: true` sbírá slova ze všech ostatních kategorií

## Motivační prvky (místo progress baru)
Zobrazují se NAD úkolem, náhodně se vybírají při startu kategorie:
- **Raketa** — plynule se posouvá po dráze od Země k Měsíci
- **Vláček** — lokomotiva + 5 vagónů, každý se připojí po 3 správných odpovědích
- **Vajíčko** — třese se (zrychluje wobble), praská, líhne se kuřátko

Finální stav motivu (100%) se zobrazuje na výsledkové stránce.

## Odstraněné funkce
- Hlášení chyb (BonusErrors) — kompletně odstraněno
- Streak popup ("X v řadě!") — odstraněno
- Hvězdičkový progress bar — nahrazen motivačními prvky
- Hrad (motivační prvek) — odstraněn, nelíbil se
- Hvězdičky na výsledkové stránce — nahrazeny hodnotícím systémem
