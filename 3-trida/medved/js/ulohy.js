// ─── Úlohy pro Med pro medvěda ─────────────────────────────────────────────
// Dvojciferné ± jednociferné číslo S PŘECHODEM přes desítku, do 100.
// Výsledek je vždy v jiné desítce a nikdy to není celá desítka:
//   ano: 34 + 8 = 42, 42 − 8 = 34      ne: 23 + 2, 34 + 6 = 40, 40 − 6
// Úloha = { otazka, spravne, moznosti } — stejný tvar jako v Závodě.

function nahodne(od, do_) { return od + Math.floor(Math.random() * (do_ - od + 1)); }
function zamichej(pole) {
  const a = [...pole];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// Špatné možnosti: typické chyby u přechodu (vždy aspoň jedna) + blízké
// chyby v počítání (±1, ±2, o desítku vedle)
function moznosti(spravne, typicke, blizke) {
  const ok = v => v >= 0 && v <= 100 && v !== spravne;
  const out = [];
  for (const v of [...typicke, ...zamichej(blizke)]) if (out.length < 3 && ok(v) && !out.includes(v)) out.push(v);
  return zamichej([spravne, ...out]);
}

function scitani() {
  let a, b;
  do { a = nahodne(12, 89); b = nahodne(2, 9); } while (a % 10 + b <= 10);
  const r = a + b;
  // 34 + 8 → 32 (zapomenutá desítka)
  return { otazka: `${a} + ${b}`, spravne: r, moznosti: moznosti(r, [r - 10], [r + 1, r - 1, r + 2, r - 2, r + 10]) };
}

function odcitani() {
  let a, b;
  do { a = nahodne(21, 99); b = nahodne(2, 9); } while (a % 10 === 0 || a % 10 >= b);
  const r = a - b;
  // 42 − 8 → 44 (desítka se neubrala), 42 − 8 → 46 (odečteno 8 − 2 obráceně)
  const obracene = a - a % 10 + (b - a % 10);
  return { otazka: `${a} − ${b}`, spravne: r, moznosti: moznosti(r, zamichej([r + 10, obracene]).slice(0, 1), [r + 1, r - 1, r + 2, r - 2, r - 10]) };
}

const DRUHY = [
  ['add', '➕ Sčítání'],
  ['sub', '➖ Odčítání'],
  ['mix', '🎲 Obojí']
];

function generuj(druh) {
  const plus = druh === 'add' || (druh === 'mix' && Math.random() < 0.5);
  return plus ? scitani() : odcitani();
}
