// ═══════════════════════════════════════════════════════════════════════════
// words.js — databáze slov a vět pro mini-hry
// Obtížnost přizpůsobená 2. třídě ZŠ — převaha 6–9 písmenných slov
// ═══════════════════════════════════════════════════════════════════════════

// Slova s emoji pro Slož slovo (obrázek + skládání)
// Prioritně delší slova (7–9 písmen), pár kratších pro postupný start
const WORDS_WITH_EMOJI = [
  // Kratší (pro první 1–2 úkoly v kole)
  { word: 'slon', emoji: '🐘' },
  { word: 'kočka', emoji: '🐱' },
  { word: 'ryba', emoji: '🐟' },
  { word: 'žába', emoji: '🐸' },
  { word: 'tygr', emoji: '🐯' },

  // Střední (6–7 písmen)
  { word: 'jablko', emoji: '🍎' },
  { word: 'banán', emoji: '🍌' },
  { word: 'mrkev', emoji: '🥕' },
  { word: 'jahoda', emoji: '🍓' },
  { word: 'včelka', emoji: '🐝' },
  { word: 'opice', emoji: '🐵' },
  { word: 'balon', emoji: '🎈' },
  { word: 'kniha', emoji: '📖' },
  { word: 'tužka', emoji: '✏️' },
  { word: 'kytara', emoji: '🎸' },
  { word: 'meloun', emoji: '🍉' },
  { word: 'bonbon', emoji: '🍬' },
  { word: 'kolotoč', emoji: '🎠' },

  // Delší (7–9 písmen) — hlavní obtížnost pro 2. třídu
  { word: 'autobus', emoji: '🚌' },
  { word: 'letadlo', emoji: '✈️' },
  { word: 'hodinky', emoji: '⌚' },
  { word: 'babička', emoji: '👵' },
  { word: 'dědeček', emoji: '👴' },
  { word: 'pohádka', emoji: '📖' },
  { word: 'kamarád', emoji: '👫' },
  { word: 'zahrada', emoji: '🌻' },
  { word: 'koupelna', emoji: '🛁' },
  { word: 'zahrádka', emoji: '🌷' },
  { word: 'knihovna', emoji: '📚' },
  { word: 'květina', emoji: '🌸' },
  { word: 'baterka', emoji: '🔦' },
  { word: 'tramvaj', emoji: '🚊' },
  { word: 'motýlek', emoji: '🦋' },
  { word: 'zvoneček', emoji: '🔔' },
  { word: 'sluníčko', emoji: '☀️' },
  { word: 'zmrzlina', emoji: '🍨' },
  { word: 'čokoláda', emoji: '🍫' },
  { word: 'limonáda', emoji: '🥤' },
  { word: 'spagety', emoji: '🍝' },
  { word: 'sendvič', emoji: '🥪' },
  { word: 'medvídek', emoji: '🧸' },
  { word: 'krokodýl', emoji: '🐊' },
  { word: 'dinosaur', emoji: '🦖' },
  { word: 'princezna', emoji: '👸' },
  { word: 'palačinky', emoji: '🥞' },
  { word: 'deštník', emoji: '☂️' },
  { word: 'vrtulník', emoji: '🚁' },
];

// Slova s distraktory pro Rychlé čtení — delší slova s opravdu podobnými
const QUICK_READ = [
  // Kratší rozcvička
  { word: 'slon', distractors: ['klon', 'slan', 'slom'] },
  { word: 'máma', distractors: ['máva', 'mámy', 'maso'] },
  { word: 'kočka', distractors: ['koška', 'kočky', 'kolka'] },
  { word: 'strom', distractors: ['stron', 'strem', 'strop'] },

  // Střední obtížnost
  { word: 'zahrada', distractors: ['zabrada', 'zahrady', 'zahrade'] },
  { word: 'autobus', distractors: ['autobys', 'autokus', 'autonus'] },
  { word: 'hodinky', distractors: ['hodiníky', 'hodinty', 'hodniky'] },
  { word: 'babička', distractors: ['babitka', 'babičky', 'babiška'] },
  { word: 'dědeček', distractors: ['dédeček', 'dedeček', 'dedečak'] },
  { word: 'pohádka', distractors: ['pokádka', 'pohádky', 'pobádka'] },
  { word: 'kamarád', distractors: ['kamerád', 'kamarát', 'kamaráb'] },
  { word: 'knihovna', distractors: ['knikovna', 'knihovny', 'knihovma'] },
  { word: 'koupelna', distractors: ['kovpelna', 'koupelny', 'kovpelny'] },
  { word: 'baterka', distractors: ['baderka', 'paterka', 'baterky'] },
  { word: 'tramvaj', distractors: ['tranvaj', 'tramvej', 'trarvaj'] },

  // Delší slova — nejobtížnější
  { word: 'sluníčko', distractors: ['slunícko', 'sluníška', 'sluničko'] },
  { word: 'zmrzlina', distractors: ['zmrslina', 'zmrzliny', 'zmrzlína'] },
  { word: 'čokoláda', distractors: ['čekoláda', 'čotoláda', 'čokolády'] },
  { word: 'limonáda', distractors: ['lemonáda', 'limonády', 'limanáda'] },
  { word: 'medvídek', distractors: ['nedvídek', 'medvítek', 'metvídek'] },
  { word: 'krokodýl', distractors: ['kromodýl', 'kropodýl', 'krokodyl'] },
  { word: 'dinosaur', distractors: ['dimosaur', 'dinosour', 'dinasour'] },
  { word: 'princezna', distractors: ['pricezna', 'prinsezna', 'princezny'] },
  { word: 'palačinky', distractors: ['polačinky', 'palatinky', 'palačivky'] },
  { word: 'zvoneček', distractors: ['zvonešek', 'zvoniček', 'zvonaček'] },
  { word: 'motýlek', distractors: ['mopýlek', 'motýlky', 'matýlek'] },
  { word: 'zmrzlina', distractors: ['smrzlina', 'zmrzliny', 'zmrzliná'] },
];

// Slova pro Najdi slovo v mřížce (max 5 písmen — vejde se do 5×5)
const WORDS_FOR_GRID = [
  // Rozcvička
  'slon', 'ryba', 'žába', 'dům', 'les', 'had', 'lev', 'myš',
  // Delší (4–5 písmen — trénink rozpoznání v kontextu)
  'kočka', 'máma', 'táta', 'voda', 'ruka', 'noha',
  'oko', 'ucho', 'škola', 'strom', 'kniha', 'auto', 'vlak',
  'louka', 'tygr', 'lampa', 'balón', 'mrkev',
];

// Doplň písmeno (bez obrázku) — delší slova pro 2. třídu, často problémová místa
const FILL_LETTER = [
  // a/o/e/u
  { word: 'pohádka', blank: 3, correct: 'á', distractors: ['a', 'e', 'ů'] },
  { word: 'zahrada', blank: 6, correct: 'a', distractors: ['o', 'e', 'y'] },
  { word: 'babička', blank: 1, correct: 'a', distractors: ['o', 'e', 'u'] },
  { word: 'dědeček', blank: 3, correct: 'e', distractors: ['a', 'o', 'i'] },
  { word: 'autobus', blank: 4, correct: 'b', distractors: ['p', 'd', 'v'] },
  { word: 'baterka', blank: 6, correct: 'a', distractors: ['o', 'e', 'y'] },

  // b/d/p
  { word: 'pohádka', blank: 0, correct: 'p', distractors: ['b', 'd', 'h'] },
  { word: 'dinosaur', blank: 0, correct: 'd', distractors: ['b', 'p', 't'] },
  { word: 'princezna', blank: 0, correct: 'p', distractors: ['b', 'd', 'h'] },
  { word: 'deštník', blank: 0, correct: 'd', distractors: ['b', 'p', 't'] },

  // m/n
  { word: 'kamarád', blank: 2, correct: 'm', distractors: ['n', 'h', 'v'] },
  { word: 'zmrzlina', blank: 6, correct: 'n', distractors: ['m', 'h', 'v'] },
  { word: 'knihovna', blank: 6, correct: 'n', distractors: ['m', 'h', 'v'] },
  { word: 'limonáda', blank: 2, correct: 'm', distractors: ['n', 'h', 'v'] },

  // h/k
  { word: 'pohádka', blank: 2, correct: 'h', distractors: ['k', 'b', 'l'] },
  { word: 'kniha', blank: 3, correct: 'h', distractors: ['k', 'b', 'p'] },
  { word: 'knihovna', blank: 3, correct: 'h', distractors: ['k', 'b', 'p'] },
  { word: 'koupelna', blank: 0, correct: 'k', distractors: ['h', 'b', 'p'] },
  { word: 'hodinky', blank: 0, correct: 'h', distractors: ['k', 'b', 'd'] },

  // č/š/c
  { word: 'sluníčko', blank: 5, correct: 'č', distractors: ['š', 'c', 'š'] },
  { word: 'zvoneček', blank: 5, correct: 'č', distractors: ['š', 'c', 's'] },
  { word: 'motýlek', blank: 2, correct: 't', distractors: ['d', 'p', 'k'] },
  { word: 'sendvič', blank: 6, correct: 'č', distractors: ['š', 'c', 's'] },
  { word: 'kočka', blank: 2, correct: 'č', distractors: ['š', 'c', 's'] },

  // i/y
  { word: 'rybník', blank: 1, correct: 'y', distractors: ['i', 'u', 'a'] },
  { word: 'hodinky', blank: 5, correct: 'k', distractors: ['h', 'c', 'p'] },
  { word: 'jahoda', blank: 1, correct: 'a', distractors: ['o', 'e', 'y'] },
  { word: 'květina', blank: 2, correct: 'ě', distractors: ['e', 'i', 'a'] },
  { word: 'medvídek', blank: 4, correct: 'í', distractors: ['i', 'e', 'y'] },

  // v/b, l/r, ostatní
  { word: 'tramvaj', blank: 4, correct: 'v', distractors: ['b', 'p', 'm'] },
  { word: 'barevný', blank: 4, correct: 'v', distractors: ['r', 'l', 'n'] },
  { word: 'krokodýl', blank: 4, correct: 'o', distractors: ['a', 'u', 'e'] },
  { word: 'vrtulník', blank: 5, correct: 'n', distractors: ['m', 'v', 'h'] },
  { word: 'čokoláda', blank: 3, correct: 'o', distractors: ['a', 'u', 'e'] },
  { word: 'palačinky', blank: 4, correct: 'i', distractors: ['y', 'e', 'a'] },
  { word: 'kreslíme', blank: 3, correct: 's', distractors: ['z', 'c', 'š'] },
];

// Oprav chybu ve větě — 20 vět jak z učebnice 2. třídy
// Každá věta má JEDNU chybu v jednom písmeni.
// wordIdx = index slova v poli words, letterIdx = index písmene v tom slově
// Počítání indexů zachovává českou diakritiku (ě, á, í jsou 1 znak)
const FIX_SENTENCES = [
  {
    words: ['Tatínek', 'čte', 'knicu', 'v', 'pokoji.'],
    wordIdx: 2, letterIdx: 3, correct: 'h', distractors: ['k', 'c', 'g']
  },
  {
    words: ['Pejsek', 'rychle', 'bězá', 'po', 'louce.'],
    wordIdx: 2, letterIdx: 2, correct: 'h', distractors: ['k', 'z', 'd']
  },
  {
    words: ['Babička', 'beče', 'voňavý', 'koláč.'],
    wordIdx: 1, letterIdx: 0, correct: 'p', distractors: ['b', 'd', 'h']
  },
  {
    words: ['Dědeček', 'sedí', 'na', 'lavicce.'],
    wordIdx: 3, letterIdx: 4, correct: 'č', distractors: ['c', 's', 'š']
  },
  {
    words: ['Honzík', 'kreslí', 'barerný', 'obrázek.'],
    wordIdx: 2, letterIdx: 4, correct: 'v', distractors: ['r', 'l', 'n']
  },
  {
    words: ['V', 'lese', 'rostou', 'jabody', 'a', 'houby.'],
    wordIdx: 3, letterIdx: 2, correct: 'h', distractors: ['b', 'd', 'k']
  },
  {
    words: ['Karolínka', 'má', 'ráda', 'čokoládv.'],
    wordIdx: 3, letterIdx: 7, correct: 'u', distractors: ['v', 'o', 'i']
  },
  {
    words: ['Tatínek', 'vaří', 'obět', 'v', 'kuchyni.'],
    wordIdx: 2, letterIdx: 3, correct: 'd', distractors: ['t', 'b', 'p']
  },
  {
    words: ['Maminka', 'vaří', 'solévku', 'k', 'obědu.'],
    wordIdx: 2, letterIdx: 0, correct: 'p', distractors: ['s', 't', 'k']
  },
  {
    words: ['Anička', 'pomárá', 'mamince', 's', 'úklidem.'],
    wordIdx: 1, letterIdx: 4, correct: 'h', distractors: ['r', 'k', 'd']
  },
  {
    words: ['O', 'víkendu', 'jedeme', 'na', 'výley.'],
    wordIdx: 4, letterIdx: 4, correct: 't', distractors: ['y', 'd', 'k']
  },
  {
    words: ['V', 'zahradě', 'jsou', 'krásté', 'růže.'],
    wordIdx: 3, letterIdx: 4, correct: 'n', distractors: ['t', 'm', 'h']
  },
  {
    words: ['Sourozenci', 'si', 'hrají', 's', 'rostkami.'],
    wordIdx: 4, letterIdx: 0, correct: 'k', distractors: ['r', 'v', 'b']
  },
  {
    words: ['Honzík', 'má', 'modrou', 'bundv.'],
    wordIdx: 3, letterIdx: 4, correct: 'u', distractors: ['v', 'o', 'i']
  },
  {
    words: ['Děti', 'si', 'hrají', 's', 'míšem.'],
    wordIdx: 4, letterIdx: 2, correct: 'č', distractors: ['š', 's', 'c']
  },
  {
    words: ['V', 'rybníku', 'plavou', 'raby.'],
    wordIdx: 3, letterIdx: 1, correct: 'y', distractors: ['a', 'o', 'i']
  },
  {
    words: ['Na', 'louce', 'pasou', 'se', 'krády.'],
    wordIdx: 4, letterIdx: 3, correct: 'v', distractors: ['d', 't', 'b']
  },
  {
    words: ['V', 'zahradě', 'kvete', 'spousva', 'květin.'],
    wordIdx: 3, letterIdx: 5, correct: 't', distractors: ['v', 'd', 'k']
  },
  {
    words: ['Maminka', 'zalévá', 'krásné', 'kvěriny.'],
    wordIdx: 3, letterIdx: 3, correct: 't', distractors: ['r', 'd', 'l']
  },
  {
    words: ['V', 'pokoji', 'svítí', 'malá', 'lanpička.'],
    wordIdx: 4, letterIdx: 2, correct: 'm', distractors: ['n', 'h', 'v']
  },
];

// Algoritmus: generátor mřížky s vloženým slovem
function generateGrid(word, size = 5) {
  const w = word.toLowerCase();
  if (w.length > size) return null;
  const horizontal = Math.random() < 0.5;

  let startRow, startCol;
  if (horizontal) {
    startRow = Math.floor(Math.random() * size);
    startCol = Math.floor(Math.random() * (size - w.length + 1));
  } else {
    startRow = Math.floor(Math.random() * (size - w.length + 1));
    startCol = Math.floor(Math.random() * size);
  }

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const grid = [];
  for (let r = 0; r < size; r++) {
    const row = [];
    for (let c = 0; c < size; c++) {
      row.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
    grid.push(row);
  }

  const path = [];
  for (let i = 0; i < w.length; i++) {
    const r = horizontal ? startRow : startRow + i;
    const c = horizontal ? startCol + i : startCol;
    grid[r][c] = w[i];
    path.push({ r, c });
  }

  return { grid, path, word: w, horizontal };
}
