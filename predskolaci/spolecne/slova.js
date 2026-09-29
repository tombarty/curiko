// ─── Slovní zásoba s obrázky ───────────────────────────────────────────────
// w = slovo, e = obrázek (emoji), sl = slabiky (pro vytleskávání).
// Obrázky jsou vybrané tak, aby je předškolák poznal a pojmenoval jednoznačně.

const SLOVA = [
  { w: 'auto', e: '🚗', sl: ['au', 'to'] },
  { w: 'ananas', e: '🍍', sl: ['a', 'na', 'nas'] },
  { w: 'banán', e: '🍌', sl: ['ba', 'nán'] },
  { w: 'balónek', e: '🎈', sl: ['ba', 'ló', 'nek'] },
  { w: 'bota', e: '👢', sl: ['bo', 'ta'] },
  { w: 'beruška', e: '🐞', sl: ['be', 'ruš', 'ka'] },
  { w: 'dům', e: '🏠', sl: ['dům'] },
  { w: 'dort', e: '🎂', sl: ['dort'] },
  { w: 'drak', e: '🐉', sl: ['drak'] },
  { w: 'deštník', e: '☂️', sl: ['dešť', 'ník'] },
  { w: 'had', e: '🐍', sl: ['had'] },
  { w: 'hrad', e: '🏰', sl: ['hrad'] },
  { w: 'hruška', e: '🍐', sl: ['hruš', 'ka'] },
  { w: 'houba', e: '🍄', sl: ['hou', 'ba'] },
  { w: 'hvězda', e: '⭐', sl: ['hvěz', 'da'] },
  { w: 'jablko', e: '🍎', sl: ['jab', 'ko'] },
  { w: 'jahoda', e: '🍓', sl: ['ja', 'ho', 'da'] },
  { w: 'kočka', e: '🐱', sl: ['koč', 'ka'] },
  { w: 'koza', e: '🐐', sl: ['ko', 'za'] },
  { w: 'klíč', e: '🔑', sl: ['klíč'] },
  { w: 'kůň', e: '🐴', sl: ['kůň'] },
  { w: 'kolo', e: '🚲', sl: ['ko', 'lo'] },
  { w: 'krokodýl', e: '🐊', sl: ['kro', 'ko', 'dýl'] },
  { w: 'kukuřice', e: '🌽', sl: ['ku', 'ku', 'ři', 'ce'] },
  { w: 'kráva', e: '🐄', sl: ['krá', 'va'] },
  { w: 'lev', e: '🦁', sl: ['lev'] },
  { w: 'les', e: '🌲🌳', sl: ['les'] },
  { w: 'loď', e: '🚢', sl: ['loď'] },
  { w: 'lžíce', e: '🥄', sl: ['lží', 'ce'] },
  { w: 'myš', e: '🐭', sl: ['myš'] },
  { w: 'míč', e: '⚽', sl: ['míč'] },
  { w: 'mrak', e: '☁️', sl: ['mrak'] },
  { w: 'měsíc', e: '🌙', sl: ['mě', 'síc'] },
  { w: 'motýl', e: '🦋', sl: ['mo', 'týl'] },
  { w: 'mrkev', e: '🥕', sl: ['mr', 'kev'] },
  { w: 'oko', e: '👁️', sl: ['o', 'ko'] },
  { w: 'ovce', e: '🐑', sl: ['ov', 'ce'] },
  { w: 'pes', e: '🐶', sl: ['pes'] },
  { w: 'pták', e: '🐦', sl: ['pták'] },
  { w: 'prase', e: '🐷', sl: ['pra', 'se'] },
  { w: 'ryba', e: '🐟', sl: ['ry', 'ba'] },
  { w: 'rak', e: '🦞', sl: ['rak'] },
  { w: 'ruka', e: '✋', sl: ['ru', 'ka'] },
  { w: 'raketa', e: '🚀', sl: ['ra', 'ke', 'ta'] },
  { w: 'slon', e: '🐘', sl: ['slon'] },
  { w: 'sýr', e: '🧀', sl: ['sýr'] },
  { w: 'sova', e: '🦉', sl: ['so', 'va'] },
  { w: 'slunce', e: '☀️', sl: ['slun', 'ce'] },
  { w: 'tygr', e: '🐯', sl: ['ty', 'gr'] },
  { w: 'telefon', e: '📞', sl: ['te', 'le', 'fon'] },
  { w: 'traktor', e: '🚜', sl: ['trak', 'tor'] },
  { w: 'televize', e: '📺', sl: ['te', 'le', 'vi', 'ze'] },
  { w: 'tráva', e: '🌿', sl: ['trá', 'va'] },
  { w: 'vlak', e: '🚂', sl: ['vlak'] },
  { w: 'voda', e: '💧', sl: ['vo', 'da'] },
  { w: 'vajíčko', e: '🥚', sl: ['va', 'jíč', 'ko'] },
  { w: 'vlk', e: '🐺', sl: ['vlk'] },
  { w: 'zvon', e: '🔔', sl: ['zvon'] },
  { w: 'žába', e: '🐸', sl: ['žá', 'ba'] },
  { w: 'žirafa', e: '🦒', sl: ['ži', 'ra', 'fa'] },
  { w: 'židle', e: '🪑', sl: ['žid', 'le'] },
  { w: 'zebra', e: '🦓', sl: ['ze', 'bra'] },
  { w: 'zmrzlina', e: '🍦', sl: ['zmrz', 'li', 'na'] },
  { w: 'zub', e: '🦷', sl: ['zub'] },
  { w: 'čokoláda', e: '🍫', sl: ['čo', 'ko', 'lá', 'da'] }
];

function slovo(w) { return SLOVA.find(s => s.w === w); }

// Rýmy — dvojice (a skupiny), které se opravdu rýmují
const RYMY = [
  ['pes', 'les'], ['had', 'hrad'], ['míč', 'klíč'], ['slon', 'zvon'],
  ['vlak', 'drak', 'pták', 'rak', 'mrak'], ['kráva', 'tráva']
];

// Hlásky, které si dítě snadno splete — jako „špatné“ možnosti se k sobě nedávají
const PODOBNE_HLASKY = ['bp', 'dt', 'szc', 'šžč', 'khg', 'vf', 'mn', 'rř', 'aá', 'oó'];
function podobne(a, b) { return a === b || PODOBNE_HLASKY.some(g => g.includes(a) && g.includes(b)); }
