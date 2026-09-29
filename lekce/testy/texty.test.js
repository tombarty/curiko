// Kontrola čtenářských textů: délky, struktura otázek, čeština
const fs = require('fs');
const vm = require('vm');
const ZAKLAD = require('path').join(__dirname, '..');

const ctx = { console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(`${ZAKLAD}/data/texty.js`, 'utf8'), ctx);
vm.runInContext('globalThis.__T = Texty;', ctx);
const T = ctx.__T;

let chyb = 0;
const nahlas = (m) => { console.log('  ✗ ' + m); chyb++; };

console.log('\n=== 1. Délky textů odpovídají úrovni ===');
const ROZSAHY = { 1: [120, 160], 2: [160, 220], 3: [220, 300], 4: [300, 400], 5: [400, 520] };
for (const t of T.SEZNAM) {
  const slov = T.pocetSlov(t.text);
  const [min, max] = ROZSAHY[t.uroven];
  const znak = (slov >= min && slov <= max) ? '✓' : '✗';
  if (znak === '✗') { chyb++; }
  console.log(`  ${znak} ú${t.uroven} ${t.id.padEnd(18)} ${String(slov).padStart(3)} slov (má být ${min}–${max})`);
}

console.log('\n=== 2. Struktura otázek ===');
const OCEKAVANE_TYPY = ['z-textu', 'z-textu', 'vlastnimi-slovy', 'proc-jak', 'nazor'];
for (const t of T.SEZNAM) {
  if (!t.otazky || t.otazky.length !== 5) { nahlas(`${t.id}: má ${t.otazky ? t.otazky.length : 0} otázek místo 5`); continue; }
  t.otazky.forEach((o, i) => {
    if (o.typ !== OCEKAVANE_TYPY[i]) nahlas(`${t.id} otázka ${i + 1}: typ "${o.typ}" místo "${OCEKAVANE_TYPY[i]}"`);
    // Pokyny ("Vysvětli vlastními slovy...") končí tečkou, dotazy otazníkem
    if (!o.otazka || !/[?.]$/.test(o.otazka.trim())) nahlas(`${t.id} otázka ${i + 1}: nekončí tečkou ani otazníkem`);
    if (!o.napoveda) nahlas(`${t.id} otázka ${i + 1}: chybí nápověda`);
    if (o.typ !== 'nazor' && (!o.klicova || !o.klicova.length)) nahlas(`${t.id} otázka ${i + 1}: nemá klíčová slova`);
    if (o.typ === 'nazor' && o.klicova && o.klicova.length) nahlas(`${t.id} otázka 5: názorová otázka nemá mít klíčová slova`);
  });
}
if (!chyb) console.log('  ✓ všechny texty mají 5 otázek ve správném pořadí');

console.log('\n=== 3. Klíčová slova se opravdu vyskytují v textu ===');
for (const t of T.SEZNAM) {
  const dolu = t.text.toLowerCase();
  t.otazky.forEach((o, i) => {
    if (o.typ === 'nazor' || o.typ === 'proc-jak') return; // ty mohou mířit mimo doslovný text
    const nalezena = (o.klicova || []).filter(k => dolu.includes(k.toLowerCase()));
    if (!nalezena.length) {
      nahlas(`${t.id} otázka ${i + 1}: žádné z klíčových slov [${o.klicova.join(', ')}] není v textu`);
    }
  });
}

console.log('\n=== 4. Obtížná slova: max 3, jsou v textu, mají slabiky i význam ===');
for (const t of T.SEZNAM) {
  if (!t.tezkaSlova || t.tezkaSlova.length === 0) { nahlas(`${t.id}: žádná obtížná slova`); continue; }
  if (t.tezkaSlova.length > 3) nahlas(`${t.id}: ${t.tezkaSlova.length} obtížných slov (max 3)`);
  for (const s of t.tezkaSlova) {
    if (!t.text.toLowerCase().includes(s.slovo.toLowerCase())) nahlas(`${t.id}: slovo "${s.slovo}" v textu není`);
    if (!s.slabiky || !s.slabiky.includes('-')) nahlas(`${t.id}: "${s.slovo}" nemá rozdělené slabiky`);
    if (!s.vyznam) nahlas(`${t.id}: "${s.slovo}" nemá vysvětlení`);
    const bezPomlcek = s.slabiky.replace(/-/g, '').toLowerCase();
    if (bezPomlcek !== s.slovo.toLowerCase()) nahlas(`${t.id}: slabiky "${s.slabiky}" nedávají slovo "${s.slovo}"`);
  }
}

console.log('\n=== 5. Jen česká písmena (žádná cyrilice ani cizí znaky) ===');
const POVOLENE = /^[\sa-zA-Z0-9áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ.,!?;:()„“"'—–\-…\/%°+×:]*$/;
function zkontrolujZnaky(kde, retezec) {
  if (typeof retezec !== 'string') return;
  if (!POVOLENE.test(retezec)) {
    const spatne = [...retezec].filter(z => !POVOLENE.test(z));
    nahlas(`${kde}: nepovolené znaky [${[...new Set(spatne)].join(' ')}] v "${retezec.slice(0, 60)}"`);
  }
}
for (const t of T.SEZNAM) {
  zkontrolujZnaky(`${t.id} nadpis`, t.nadpis);
  zkontrolujZnaky(`${t.id} text`, t.text);
  t.otazky.forEach((o, i) => {
    zkontrolujZnaky(`${t.id} ot.${i + 1}`, o.otazka);
    (o.klicova || []).forEach(k => zkontrolujZnaky(`${t.id} ot.${i + 1} klíč`, k));
  });
}

console.log('\n=== 6. Slovní detektiv: dvojice musí být různé ===');
for (const d of T.DETEKTIV) {
  if (d.dvojice[0] === d.dvojice[1]) nahlas(`dvojice "${d.dvojice[0]}" je dvakrát stejná`);
  if (!d.dvojice.includes(d.spravne)) nahlas(`"${d.spravne}" není v dvojici [${d.dvojice.join(', ')}]`);
  if (!d.veta.includes('___')) nahlas(`věta pro "${d.spravne}" nemá vynechané místo`);
  const dosazeno = d.veta.replace('___', d.spravne);
  if (dosazeno === d.veta) nahlas(`u "${d.spravne}" se nic nedosadilo`);
}
console.log(`  (zkontrolováno ${T.DETEKTIV.length} dvojic)`);

console.log('\n=== 7. Výběr textu nevrací pořád ten samý ===');
{
  const prectene = {};
  const videne = new Set();
  for (let i = 0; i < 40; i++) {
    const t = T.vyber(1, prectene, []);
    videne.add(t.id);
    prectene[t.id] = Date.now() - (40 - i) * 1000;
  }
  if (videne.size < 2) nahlas('výběr vrací pořád stejný text');
  else console.log(`  ✓ na úrovni 1 se protočilo ${videne.size} různých textů`);

  // Vypnuté téma se nesmí objevit
  let poruseno = 0;
  for (let i = 0; i < 60; i++) {
    const t = T.vyber(2, {}, ['hudba']);
    if (t.tema === 'hudba') poruseno++;
  }
  poruseno ? nahlas(`vypnuté téma se objevilo ${poruseno}×`) : console.log('  ✓ vypnuté téma se nikdy neobjeví');

  // Úroveň bez textů si půjčí z nižší
  const t5 = T.vyber(5, {}, []);
  if (!t5) nahlas('pro úroveň 5 se nevrátil žádný text');
  else console.log(`  ✓ pro úroveň bez textů se půjčí z nižší (dostal jsem "${t5.id}", ú${t5.uroven})`);
}

console.log('\n=== 8. Přehled zásoby ===');
for (const u of [1, 2, 3, 4, 5]) {
  const pocet = T.proUroven(u).length;
  console.log(`  úroveň ${u}: ${pocet} ${pocet === 1 ? 'text' : pocet < 5 ? 'texty' : 'textů'}`);
}
console.log(`  témata: ${[...new Set(T.SEZNAM.map(t => t.tema))].join(', ')}`);

console.log(chyb === 0 ? '\n✅ VŠE PROŠLO\n' : `\n❌ ${chyb} PROBLÉMŮ\n`);
process.exit(chyb ? 1 : 0);
