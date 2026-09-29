// Ověří, že každé volání Modul.metoda() míří na existující funkci
const fs = require('fs');
const vm = require('vm');
const ZAKLAD = require('path').join(__dirname, '..');

// Načti moduly v pořadí, v jakém je načítá stránka
const ctx = {
  console,
  window: { crypto: { getRandomValues: (a) => a.fill(7) }, addEventListener() {}, speechSynthesis: {} },
  document: { addEventListener() {}, createElement: () => ({ style: {}, dataset: {}, classList: { add() {}, remove() {}, toggle() {} }, appendChild() {}, textContent: '', set innerHTML(v) {}, get innerHTML() { return ''; } }) },
  localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  navigator: {}, fetch: () => Promise.reject(new Error('offline')),
  setTimeout, clearTimeout, Blob: function () {}, FileReader: function () {}, Image: function () {}, URL: {},
};
ctx.globalThis = ctx;
vm.createContext(ctx);

const SOUBORY = ['data/texty.js', 'data/ulohy.js', 'js/storage.js', 'js/sound.js', 'js/postava.js',
                 'js/pokrok.js', 'js/matika.js', 'js/cteni.js', 'js/psani.js', 'js/sun.js', 'js/hodnoceni.js'];
for (const f of SOUBORY) {
  vm.runInContext(fs.readFileSync(`${ZAKLAD}/${f}`, 'utf8'), ctx, { filename: f });
}

const MODULY = ['Texty', 'SlovniUlohy', 'Storage', 'Sound', 'Postava', 'Pokrok', 'Matika', 'Cteni', 'Psani', 'SUN', 'Hodnoceni'];
vm.runInContext(`globalThis.__M = {${MODULY.join(',')}};`, ctx);
const moduly = ctx.__M;

let chyb = 0;

console.log('\n=== 1. Moduly se načetly ===');
for (const m of MODULY) {
  if (!moduly[m]) { console.log(`  ✗ ${m} chybí`); chyb++; }
}
if (!chyb) console.log(`  ✓ všech ${MODULY.length} modulů načteno`);

console.log('\n=== 2. Volání mezi moduly míří na existující funkce ===');
// Projdi soubory, které moduly používají, a najdi vzory Modul.metoda(
const SPOTREBITELE = [...SOUBORY, 'js/app.js', 'js/rodic.js'];
const vzor = new RegExp(`\\b(${MODULY.join('|')})\\.([A-Za-z_][A-Za-z0-9_]*)\\s*\\(`, 'g');

const nalezene = new Map();
for (const f of SPOTREBITELE) {
  const zdroj = fs.readFileSync(`${ZAKLAD}/${f}`, 'utf8');
  let m;
  while ((m = vzor.exec(zdroj)) !== null) {
    const [, modul, metoda] = m;
    const radek = zdroj.slice(0, m.index).split('\n').length;
    const klic = `${modul}.${metoda}`;
    if (!nalezene.has(klic)) nalezene.set(klic, []);
    nalezene.get(klic).push(`${f}:${radek}`);
  }
}

for (const [klic, mista] of [...nalezene].sort()) {
  const [modul, metoda] = klic.split('.');
  const cil = moduly[modul] && moduly[modul][metoda];
  if (typeof cil !== 'function') {
    console.log(`  ✗ ${klic}() neexistuje — voláno z ${mista[0]}`);
    chyb++;
  }
}
if (!chyb) console.log(`  ✓ všech ${nalezene.size} různých volání míří na existující funkce`);

console.log('\n=== 3. Čtení vlastností (ne volání) ===');
const vlastnostiVzor = new RegExp(`\\b(${MODULY.join('|')})\\.([A-Z_][A-Z0-9_]*)\\b`, 'g');
const vlastnosti = new Map();
for (const f of SPOTREBITELE) {
  const zdroj = fs.readFileSync(`${ZAKLAD}/${f}`, 'utf8');
  let m;
  while ((m = vlastnostiVzor.exec(zdroj)) !== null) {
    const klic = `${m[1]}.${m[2]}`;
    const radek = zdroj.slice(0, m.index).split('\n').length;
    if (!vlastnosti.has(klic)) vlastnosti.set(klic, `${f}:${radek}`);
  }
}
for (const [klic, misto] of [...vlastnosti].sort()) {
  const [modul, vlastnost] = klic.split('.');
  if (moduly[modul] && moduly[modul][vlastnost] === undefined) {
    console.log(`  ✗ ${klic} není definováno — čteno z ${misto}`);
    chyb++;
  }
}
console.log(`  (zkontrolováno ${vlastnosti.size} konstant)`);

console.log('\n=== 4. Prvky z HTML, na které sahá JavaScript ===');
for (const [htmlSoubor, jsSoubor] of [['index.html', 'js/app.js'], ['rodic.html', 'js/rodic.js']]) {
  const html = fs.readFileSync(`${ZAKLAD}/${htmlSoubor}`, 'utf8');
  const js = fs.readFileSync(`${ZAKLAD}/${jsSoubor}`, 'utf8');

  const idVHtml = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  const zadane = new Set([...js.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map((m) => m[1]));

  // Prvky vytvářené dynamicky za běhu
  const dynamicke = new Set(['foto-nahled', 'vstup-foto', 'btn-ukazovatko', 'btn-vetsi-pismo',
                             'klic-box', 'btn-zobraz-klic', 'btn-zmen-klic', 'vstup-klic',
                             'vstup-novy-pin', 'btn-zmen-pin', 'btn-smaz', 'btn-export',
                             'sun-zaver']);

  const chybejici = [...zadane].filter((id) => !idVHtml.has(id) && !dynamicke.has(id));
  if (chybejici.length) {
    console.log(`  ✗ ${jsSoubor} hledá prvky, které v ${htmlSoubor} nejsou: ${chybejici.join(', ')}`);
    chyb++;
  } else {
    console.log(`  ✓ ${jsSoubor} → ${htmlSoubor}: všech ${zadane.size} prvků existuje`);
  }
}

console.log('\n=== 5. Pořadí <script> respektuje závislosti ===');
for (const htmlSoubor of ['index.html', 'rodic.html']) {
  const html = fs.readFileSync(`${ZAKLAD}/${htmlSoubor}`, 'utf8');
  const skripty = [...html.matchAll(/<script src="((?:js|data)\/[^"]+)"/g)].map((m) => m[1]);

  // matika.js potřebuje SlovniUlohy z data/ulohy.js; hodnoceni.js potřebuje Matika i Pokrok
  const kontroly = [
    ['data/ulohy.js', 'js/matika.js'],
    ['js/pokrok.js', 'js/matika.js'],
    ['js/matika.js', 'js/hodnoceni.js'],
    ['data/texty.js', 'js/cteni.js'],
  ];
  for (const [drive, pozdeji] of kontroly) {
    const i = skripty.indexOf(drive), j = skripty.indexOf(pozdeji);
    if (i === -1 || j === -1) continue;
    if (i > j) { console.log(`  ✗ ${htmlSoubor}: ${drive} se načítá až po ${pozdeji}`); chyb++; }
  }
  console.log(`  ✓ ${htmlSoubor}: ${skripty.length} skriptů ve správném pořadí`);
}

console.log('\n=== 6. CSS třídy použité v JS existují ve stylech ===');
{
  const css = fs.readFileSync(`${ZAKLAD}/style.css`, 'utf8') + fs.readFileSync(`${ZAKLAD}/rodic.css`, 'utf8');
  const definovane = new Set([...css.matchAll(/\.([a-z][a-z0-9-]*)/gi)].map((m) => m[1]));

  const js = fs.readFileSync(`${ZAKLAD}/js/app.js`, 'utf8') + fs.readFileSync(`${ZAKLAD}/js/rodic.js`, 'utf8');
  const pouzite = new Set();
  for (const m of js.matchAll(/className\s*=\s*'([^']+)'/g)) m[1].split(/\s+/).forEach((t) => t && pouzite.add(t));
  for (const m of js.matchAll(/class="([a-z][^"$]*)"/gi)) m[1].split(/\s+/).forEach((t) => t && pouzite.add(t));

  const chybejici = [...pouzite].filter((t) => !definovane.has(t));
  if (chybejici.length) {
    console.log(`  ⚠ třídy bez stylu: ${chybejici.join(', ')}`);
  } else {
    console.log(`  ✓ všech ${pouzite.size} použitých tříd má styl`);
  }
}

console.log(chyb === 0 ? '\n✅ PROPOJENÍ V POŘÁDKU\n' : `\n❌ ${chyb} PROBLÉMŮ\n`);
process.exit(chyb ? 1 : 0);
