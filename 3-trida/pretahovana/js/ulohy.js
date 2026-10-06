// ─── Slova pro Přetahovanou ────────────────────────────────────────────────
// Slova bereme přímo z Pravopisných pětiminutovek 3 (../petiminutovky/data.js,
// pole BONUS_CATEGORIES) — oprava slova se tak dělá jen na jednom místě.
// Používáme jen strany s vyjmenovanými slovy (id 'vyjm-…') a třídíme podle
// písmene před mezerou (b / l / m), takže jde rozdělit i smíšená strana 25.

const PISMENA = ['b', 'l', 'm'];

function zamichej(pole) {
  const a = [...pole];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function slovaPo(pismena) {
  return BONUS_CATEGORIES
    .filter(c => c.id && c.id.startsWith('vyjm-'))
    .flatMap(c => c.words)
    .filter(([slovo]) => pismena.includes(slovo[slovo.indexOf('_') - 1].toLowerCase()))
    .map(([slovo, spravne, moznosti]) => ({ slovo, spravne, moznosti }));
}

// Balíček slov: bere se postupně ze zamíchané fronty, takže se slova
// neopakují, dokud se neprojdou všechna. Pak se zamíchá znovu.
function balicek(pismena) {
  const slova = slovaPo(pismena);
  let fronta = [];
  return () => {
    if (!fronta.length) fronta = zamichej(slova);
    return fronta.pop();
  };
}
