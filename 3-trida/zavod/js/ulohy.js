// ─── Úlohy pro závod ───────────────────────────────────────────────────────
// Úloha = { otazka, spravne, moznosti }. Učitelka vybere čísla (5–9) a druh
// počítání (násobení / dělení / obojí); generuj() z toho skládá příklady.
// Jiný typ úloh (např. pravopis) = nová funkce se stejným výstupem.

function nahodne(od, do_) { return od + Math.floor(Math.random() * (do_ - od + 1)); }
function zamichej(pole) {
  const a = [...pole];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// 3 špatné možnosti blízko správné (typické chyby: o jednu skupinu víc/míň, ±1)
function moznostiK(spravne, krok) {
  const kandidati = [spravne + krok, spravne - krok, spravne + 1, spravne - 1, spravne + 2 * krok, spravne - 2 * krok, spravne + 2, spravne - 2]
    .filter(v => v >= 0 && v !== spravne);
  const out = [];
  for (const c of kandidati) if (out.length < 3 && !out.includes(c)) out.push(c);
  return zamichej([spravne, ...out]);
}

function nasobeni(k) {
  const n = nahodne(1, 10);
  return { otazka: `${n} × ${k}`, spravne: n * k, moznosti: moznostiK(n * k, k) };
}
function deleni(k) {
  const n = nahodne(1, 10);
  return { otazka: `${n * k} : ${k}`, spravne: n, moznosti: moznostiK(n, 1) };
}

const CISLA = [5, 6, 7, 8, 9];
const DRUHY = [
  ['mul', '✖️ Násobení'],
  ['div', '➗ Dělení'],
  ['mix', '🎲 Obojí']
];

function generuj(cisla, druh) {
  const k = cisla[Math.floor(Math.random() * cisla.length)];
  const nasob = druh === 'mul' || (druh === 'mix' && Math.random() < 0.5);
  return nasob ? nasobeni(k) : deleni(k);
}
