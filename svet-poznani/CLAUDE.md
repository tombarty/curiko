# Magický svět poznání a dobrodružství – CLAUDE.md

## O projektu

Vzdělávací webová hra pro dítě ve 2. třídě ZŠ. Dítě si vybere jednu ze 6 říší, plní vzdělávací výzvy (matematika, čeština, angličtina) a postupuje přes 3 levely po 5 hrách. Za dokončení levelu dostane arkádovou hru jako odměnu. Motivace přes gamifikaci — hodnosti, hvězdičky, série.

## Technická pravidla

- **Žádný build systém** — vše funguje otevřením `index.html` v prohlížeči (file://)
- **Vanilla HTML + CSS + JS** — žádné frameworky, žádný npm
- **Mobile-first** — primárně se testuje na telefonu/tabletu
- Pořadí scriptů v HTML: `storage → sound → themes → story → games → arcade → app`

## Struktura souborů

```
index.html        – HTML, obrazovky (intro, říši, přezdívka, levely, mapa, kapitola, arkáda, výsledky)
style.css         – styly, dark/light pohádkový režim, CSS custom properties
js/storage.js     – localStorage (klíč: fantazie_save)
js/sound.js       – Web Audio API (procedurální zvuky, bez souborů)
js/themes.js      – 6 říší × příběhové texty + barvy + hodnosti + ikonky
js/story.js       – 14 kapitol (pořadí her z aktivního tématu)
js/games.js       – všechny kapitolové mini-hry + herní engine + spawnStars()
js/arcade.js      – 3 arkádové hry (Snake, Flappy, Breakout)
js/app.js         – hlavní logika, navigace, psací stroj, řeč, level systém
```

## Tok obrazovek

```
Intro → Výběr říši → Přezdívka (tematická) → Výběr levelu → Mapa (quest karty) → Kapitola
                                                   ↑              ↑                    |
                                                   └──────────────└────────────────────┘
                                                   ↓
                                                 Arkáda (odměna za level)
                                                   ↓
                                                 Výsledky
```

## 6 říší (js/themes.js)

| Pořadí | Říše | Emoji | Pro |
|--------|------|-------|-----|
| 1 | Hvězdný strážce | 🚀 | kluky |
| 2 | Kouzelný les | 🦄 | holky |
| 3 | Dračí ostrov | 🐉 | kluky |
| 4 | Zvířecí útulek | 🐾 | holky |
| 5 | Robot City | 🤖 | kluky |
| 6 | Zahrada kouzel | 🌸 | holky |

Pořadí je střídavé (kluk/holka). Každá říše definuje:
- `accent`, `accent2`, `cardGradient` — barvy
- `nicknameTitle`, `nicknameText`, `nicknamePlaceholder` — texty přezdívkové obrazovky
- `subjectIcons` — emoji pro matematiku/češtinu/angličtinu v mapě
- `levelIcons` + `levelLabels` — emoji a názvy pro 3 levely
- `ranks` — 5 hodností hráče (min hvězd, label, emoji, barva)
- `zones` — 5 zón s názvy a ID kapitol
- `games[0..13]` — pořadí 14 mini-her
- `titles[gameType]` — názvy kapitol
- `stories[gameType]` — příběhové texty (1–2 věty)

## Level systém

```js
const LEVELS = [
  { id: 1, chapters: [1, 2, 3, 4, 5] },
  { id: 2, chapters: [6, 7, 8, 9, 10] },
  { id: 3, chapters: [11, 12, 13, 14] },
];
```

- 3 levely, odemykají se postupně (level 2 až po dokončení všech her levelu 1)
- Ikonky a názvy levelů se berou z `theme.levelIcons` a `theme.levelLabels`
- Mapa zobrazuje jen kapitoly aktuálního levelu (quest karty na celou šířku)

## Arkádové hry (js/arcade.js)

| Level | Hra | Ovládání |
|-------|-----|----------|
| 1 | 🐍 Had (Snake) | Swipe / šipky |
| 2 | 🐦 Flappy Falkor | Tap / mezerník |
| 3 | 🧱 Breakout | Drag / šipky |

- Canvas-based, 60fps, touch-action: none
- Zobrazí se POUZE když hráč právě dokončí poslední hru v levelu (`levelJustCompleted`)
- Replay přístupný z karty na mapě a z výběru levelů (🎮 ikonka)
- High score se ukládá do `state.arcadeScores`

## Herní mechaniky kapitol

- **TARGET_SCORE** = náhodně 5–7 při startu každé hry
- Hvězdičky za efektivitu: 0 extra = 5⭐, 1-2 = 4, 3-4 = 3, 5-7 = 2, 8+ = 1
- Špatná odpověď přidá novou otázku (nikdy nezablokuje)
- Série: 2× → 👍, 3× → 🔥, 4× → ⚡, 5× → 🌟
- Psací stroj + hlasové čtení (Web Speech API, cs-CZ) pro příběhové texty
- Hra s řazením abecedy: kliknutí na slot = odebrání slova (undo)

## Hodnosti hráče

Každá říše má 5 vlastních hodností v `theme.ranks`:
- min: 0 (začátečník), 10, 25, 40, 55 (mistr)
- `getRank(stars)` v app.js je čte z aktivního tématu

## Design

- **Pohádkový styl** — tmavě fialové pozadí, zlaté akcenty, CSS kopce a měsíc na pozadí
- Světlý režim = levandulový
- Jiskřičky (zlaté částice) poletují na pozadí
- Gradient kopců ve spodní části (#stars::after)
- Fonty: Cinzel (nadpisy), Nunito (text)

## Důležité při úpravách

- `spawnStars()` je globální funkce v `games.js`, volá ji i `app.js`
- Při přidávání nového typu hry: přidat do `Games.render()` switch, `buildInitialPool()` a `generateExtraQuestion()`
- Při přidávání nové říše: zkopírovat blok v `themes.js`, vyplnit VŠECHNA pole (accent, nicknameTitle/Text/Placeholder, subjectIcons, levelIcons, levelLabels, ranks, zones, games, titles, stories)
- Arcade hry: přidat do `Arcade.GAME_MAP`, `Arcade.GAME_NAMES`, nový game objekt, case v `start()`
- Texty pro dítě: krátké (max 2 věty), jednoduché, bez složitých instrukcí
- localStorage klíče: `fantazie_save` (hlavní save), `fantazie_theme` (dark/light)

## Známé problémy a řešení

- **Focus na tlačítkách na mobilu** — po načtení nové otázky se volá `document.activeElement.blur()` v `Games.render()` + CSS `.opt-btn:focus { outline: none; }`. Bez toho se na mobilu zvýrazní tlačítko.
- **Pravopis v datech** — slova v `games.js` (párové souhlásky) musí mít správné háčky/čárky ve slově (např. `chlé_` ne `chle_`, `mrá_` ne `mra_`). Uživatel je testuje a hlásí chyby.
- **Arkádové tlačítko po levelu** — zobrazí se JEN když `levelJustCompleted` (ne když je level už dávno hotový). Detekuje se porovnáním stavu PŘED a PO uložení výsledku.
- **Staré dynamické prvky** — v `onGameComplete()` se na začátku odstraňují `.arcade-reward-btn` a `.finale-summary` z předchozích renderů, jinak se kumulují.
- **Adresář projektu** — uživatel přejmenovává adresáře. Aktuální: `/Users/tomasbartek/ClaudeCode/Projekty/Svet-poznani/`. Nepoužívat hardcoded cesty ze starých konverzací.

## Separátní projekt: Pravopisné pětiminutovky

Odděleno do samostatného projektu:
```
/Users/tomasbartek/ClaudeCode/Projekty/Pravopisne-petiminutovky/
├── index.html   – celá aplikace (HTML + CSS + app logika)
└── data.js      – data kategorií + herní engine + nahlašování chyb + motivační motivy
```
- Nezávislé — vlastní localStorage klíče (`pp_theme`, `pp_errors`)
- 12 kategorií pravopisu, 15 otázek na kolo
- Motivační motivy (raketa, rostlinka, hrad, vajíčko) — náhodně se přiřadí při startu kola
- Nahlašování chyb s kopírováním do schránky
