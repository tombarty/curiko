// Test vyhodnocení odpovědí na otázky k textu
const fs = require('fs');
const vm = require('vm');
const ZAKLAD = require('path').join(__dirname, '..');

const ctx = { console };
vm.createContext(ctx);
for (const f of ['data/texty.js', 'js/cteni.js']) {
  vm.runInContext(fs.readFileSync(`${ZAKLAD}/${f}`, 'utf8'), ctx, { filename: f });
}
vm.runInContext('globalThis.__C = Cteni; globalThis.__T = Texty;', ctx);
const C = ctx.__C, T = ctx.__T;

let chyb = 0;
const S = C.STAV;

function overit(popis, otazka, odpoved, ocekavano) {
  const v = C.vyhodnot(otazka, odpoved);
  const ok = v.stav === ocekavano;
  if (!ok) { console.log(`  ✗ ${popis}\n      "${odpoved}"\n      čekáno ${ocekavano}, dostal ${v.stav}`); chyb++; }
  else console.log(`  ✓ ${popis}`);
}

// Otázka z textu o Shakiře
const otZTextu = { typ: 'z-textu', klicova: ['kolumbi'] };
const otVlastni = { typ: 'vlastnimi-slovy', klicova: ['zvláštn', 'jin', 'hlas'] };
const otNazor = { typ: 'nazor', klicova: [] };

console.log('\n=== 1. Odpověď z textu ===');
overit('celá věta se správným obsahem', otZTextu, 'Shakira se narodila v Kolumbii.', S.SPRAVNE_CELA_VETA);
overit('jedno slovo — obsah uznán, věta ne', otZTextu, 'Kolumbie', S.SPRAVNE_NEUPLNA);
overit('malé písmeno na začátku', otZTextu, 'shakira se narodila v Kolumbii.', S.SPRAVNE_NEUPLNA);
overit('odpověď mimo téma', otZTextu, 'Nevím.', S.MIMO);
overit('prázdná odpověď', otZTextu, '', S.PRAZDNE);
overit('jen mezery', otZTextu, '     ', S.PRAZDNE);
overit('bez diakritiky (klávesnice bez háčků)', otZTextu, 'Narodila se v Kolumbii.', S.SPRAVNE_CELA_VETA);
overit('psáno úplně bez háčků', otZTextu, 'Shakira se narodila v Kolumbii', S.SPRAVNE_CELA_VETA);

console.log('\n=== 2. Otázka na vysvětlení vlastními slovy ===');
overit('rozvitá odpověď', otVlastni, 'Její hlas byl jiný než ostatní a lidé si ho zapamatovali.', S.SPRAVNE_CELA_VETA);
overit('trefila, ale moc stručně', otVlastni, 'Měla jiný hlas.', S.CASTECNE);
overit('jednoslovná', otVlastni, 'hlas', S.SPRAVNE_NEUPLNA);

console.log('\n=== 3. Otázka na názor ===');
overit('rozvitý názor', otNazor, 'Chtěla bych letět na Měsíc, protože je to dobrodružství.', S.NAZOR_OK);
overit('jednoslovný názor', otNazor, 'Ano.', S.NAZOR_KRATKY);
overit('prázdný názor', otNazor, '', S.PRAZDNE);
{
  const v = C.vyhodnot(otNazor, 'Myslím si, že by to bylo hodně zajímavé.');
  if (v.klicova.length) { console.log('  ✗ názor nemá řešit klíčová slova'); chyb++; }
  else console.log('  ✓ u názoru se správnost neposuzuje');
}

console.log('\n=== 4. Co konkrétně větě chybí ===');
{
  const zkousky = [
    ['kolumbie', 'velké písmeno na začátku'],
    ['Kolumbie', 'víc slov'],
    ['Shakira se narodila v Kolumbii', 'tečka na konci'],
  ];
  for (const [text, ocekavano] of zkousky) {
    const chybi = C.coChybiVete(text);
    if (!chybi.includes(ocekavano)) {
      console.log(`  ✗ u "${text}" nehlásí "${ocekavano}", ale [${chybi.join(', ')}]`); chyb++;
    } else console.log(`  ✓ u "${text}" pozná chybějící: ${ocekavano}`);
  }
  const uplna = C.coChybiVete('Shakira se narodila v Kolumbii.');
  if (uplna.length) { console.log(`  ✗ správná věta hlásí chyby: ${uplna.join(', ')}`); chyb++; }
  else console.log('  ✓ u správné věty nehlásí nic');
}

console.log('\n=== 5. Počítání úspěchu ===');
{
  const vysledky = [
    { stav: S.SPRAVNE_CELA_VETA, celaVeta: true },
    { stav: S.SPRAVNE_NEUPLNA, celaVeta: false },
    { stav: S.MIMO, celaVeta: true },
    { stav: S.CASTECNE, celaVeta: true },
    { stav: S.NAZOR_OK, celaVeta: true },
  ];
  const u = C.spocitejUspech(vysledky);
  const v = C.pocetCelychVet(vysledky);
  if (u !== 3) { console.log(`  ✗ úspěch má být 3, je ${u}`); chyb++; } else console.log('  ✓ úspěch spočítán správně (3 z 5)');
  if (v !== 4) { console.log(`  ✗ celých vět má být 4, je ${v}`); chyb++; } else console.log('  ✓ celé věty spočítány správně (4 z 5)');
}

console.log('\n=== 6. Slovní detektiv ===');
{
  const d = T.DETEKTIV[0];
  if (!C.vyhodnotDetektiva(d, d.spravne)) { console.log('  ✗ správná volba neprošla'); chyb++; }
  if (C.vyhodnotDetektiva(d, d.dvojice.find(x => x !== d.spravne))) { console.log('  ✗ špatná volba prošla'); chyb++; }
  if (!C.vyhodnotDetektiva(d, ' ' + d.spravne.toUpperCase() + ' ')) { console.log('  ✗ velikost písmen/mezery vadí'); chyb++; }
  console.log('  ✓ vyhodnocení detektiva funguje');

  if (C.pocetDetektiva({ slovniDetektivCasto: 'nikdy' }, {}) !== 0) { console.log('  ✗ "nikdy" vrací dvojice'); chyb++; }
  if (C.pocetDetektiva({ slovniDetektivCasto: 'casto' }, {}) !== 5) { console.log('  ✗ "často" nevrací 5'); chyb++; }
  const potize = C.pocetDetektiva({ slovniDetektivCasto: 'obcas' }, { 'zamena-pismen': { jistota: 0.3 } });
  if (potize < 4) { console.log(`  ✗ při potížích s písmeny má zařadit aspoň 4, zařadil ${potize}`); chyb++; }
  else console.log('  ✓ při potížích s písmeny se zařadí častěji');
}

console.log('\n=== 7. Souhrn mise se poskládá ===');
{
  const text = T.SEZNAM[0];
  const vysledky = text.otazky.map((o, i) => ({
    ...C.vyhodnot(o, i < 4 ? 'Vydra bydlí ve vodě a spí na hladině.' : 'Vybrala bych si hladký kamínek, protože je hezký.'),
    text: 'odpověď',
  }));
  const s = C.souhrn(text, vysledky, { napovedy: 2, prehranaSlova: ['hladině'] });
  const chybi = ['textId', 'nadpis', 'uroven', 'pocetSlov', 'spravnychOtazek', 'celychVet', 'napovedy', 'odpovedi']
    .filter(k => s[k] === undefined);
  if (chybi.length) { console.log(`  ✗ v souhrnu chybí: ${chibi}`); chyb++; }
  else console.log(`  ✓ souhrn kompletní (${s.spravnychOtazek}/5 otázek, ${s.pocetSlov} slov, ${s.napovedy} nápovědy)`);
  if (s.odpovedi.length !== 5) { console.log('  ✗ souhrn nemá 5 odpovědí'); chyb++; }
}

console.log(chyb === 0 ? '\n✅ VŠE PROŠLO\n' : `\n❌ ${chyb} PROBLÉMŮ\n`);
process.exit(chyb ? 1 : 0);
