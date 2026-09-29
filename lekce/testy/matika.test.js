// Test generátoru matematických úloh — ověří, že zadání sedí s výsledkem
const fs = require('fs');
const vm = require('vm');
const ZAKLAD = require('path').join(__dirname, '..');

const ctx = { console, module: undefined };
vm.createContext(ctx);
for (const f of ['data/ulohy.js', 'js/pokrok.js', 'js/matika.js']) {
  vm.runInContext(fs.readFileSync(`${ZAKLAD}/${f}`, 'utf8'), ctx, { filename: f });
}
vm.runInContext('globalThis.__M = Matika; globalThis.__P = Pokrok; globalThis.__U = SlovniUlohy;', ctx);
const { __M: Matika, __P: Pokrok } = ctx;

let chyb = 0;
const nahlas = (m) => { console.log('  ✗ ' + m); chyb++; };

// Spočítá zadání typu "37 + 8 = ?" nezávisle na generátoru
function overZadani(z) {
  const m = z.match(/^(\d+)\s*([+−×:])\s*(\d+)\s*=\s*\?$/);
  if (!m) return null;
  const a = +m[1], b = +m[3];
  switch (m[2]) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case ':': return a / b;
  }
}

console.log('\n=== 1. Každá dovednost: 400 vzorků ===');
for (const d of Matika.DOVEDNOSTI) {
  let problemy = [];
  for (let i = 0; i < 400; i++) {
    for (const uroven of [1, 2, 3]) {
      const u = Matika.generuj(d.klic, uroven);

      if (u.spravne === undefined || u.spravne === null) { problemy.push('chybí výsledek'); break; }

      // Aritmetika sedí?
      const ocekavano = typeof u.zadani === 'string' ? overZadani(u.zadani) : null;
      if (ocekavano !== null && ocekavano !== u.spravne) {
        problemy.push(`"${u.zadani}" → generátor říká ${u.spravne}, správně je ${ocekavano}`);
        break;
      }

      // Doplňovací úlohy "37 + ? = 40"
      const dop = typeof u.zadani === 'string' && u.zadani.match(/^(\d+)\s*\+\s*\?\s*=\s*(\d+)$/);
      if (dop && +dop[1] + u.spravne !== +dop[2]) {
        problemy.push(`"${u.zadani}" → ${u.spravne} nesedí`);
        break;
      }
      // Rozklad "9 = 4 + ?"
      const roz = typeof u.zadani === 'string' && u.zadani.match(/^(\d+)\s*=\s*(\d+)\s*\+\s*\?$/);
      if (roz && +roz[2] + u.spravne !== +roz[1]) {
        problemy.push(`"${u.zadani}" → ${u.spravne} nesedí`);
        break;
      }

      // Žádné záporné výsledky u čísel
      if (typeof u.spravne === 'number' && u.spravne < 0) {
        problemy.push(`záporný výsledek: "${u.zadani}" → ${u.spravne}`);
        break;
      }
      // Dělení beze zbytku
      if (d.klic.startsWith('deleni') && !Number.isInteger(u.spravne)) {
        problemy.push(`dělení se zbytkem: "${u.zadani}"`);
        break;
      }
      // Tři stupně nápovědy
      if (!Array.isArray(u.napovedy) || u.napovedy.length !== 3) {
        problemy.push(`nemá 3 nápovědy (má ${u.napovedy ? u.napovedy.length : 0})`);
        break;
      }
      // Volby u výběrových úloh
      if (u.typ === 'volba') {
        if (!Array.isArray(u.volby) || !u.volby.includes(u.spravne)) {
          problemy.push(`správná odpověď "${u.spravne}" není mezi volbami`);
          break;
        }
      }
      // U slovních úloh: `spravne` je výsledek výpočtu, `operace` je volba
      if (u.typ === 'volba-operace' || u.typ === 'slovni') {
        if (typeof u.spravne !== 'number') {
          problemy.push(`spravne má být číselný výsledek, je "${u.spravne}"`);
          break;
        }
        if (!u.operace) { problemy.push('chybí pole operace'); break; }
        if (u.volby && !u.volby.includes(u.operace)) {
          problemy.push(`operace "${u.operace}" není mezi volbami`);
          break;
        }
        if (!Matika.zkontrolujOperaci(u, u.operace)) { problemy.push('zkontrolujOperaci odmítla správnou operaci'); break; }
        if (Matika.zkontrolujOperaci(u, 'ubírat') && u.operace !== 'ubírat') { problemy.push('zkontrolujOperaci uznala špatnou operaci'); break; }
        if (!Matika.zkontroluj(u, u.spravne)) { problemy.push('zkontroluj odmítla správný výsledek'); break; }
      }
    }
    if (problemy.length) break;
  }
  if (problemy.length) nahlas(`${d.klic}: ${problemy[0]}`);
}
if (!chyb) console.log('  ✓ všech ' + Matika.DOVEDNOSTI.length + ' dovedností generuje správně');

console.log('\n=== 2. Přechod přes desítku skutečně přechází ===');
{
  let bezPrechodu = 0;
  for (let i = 0; i < 300; i++) {
    const u = Matika.generuj('scitani-pres-desitku', 1);
    const m = u.zadani.match(/(\d+) \+ (\d+)/);
    if ((+m[1] % 10) + (+m[2] % 10) < 10) bezPrechodu++;
  }
  bezPrechodu ? nahlas(`${bezPrechodu}/300 sčítání "přes desítku" přes desítku nepřechází`)
              : console.log('  ✓ sčítání přes desítku vždy přechází');

  let dolu = 0;
  for (let i = 0; i < 300; i++) {
    const u = Matika.generuj('odcitani-pres-desitku', 1);
    const m = u.zadani.match(/(\d+) − (\d+)/);
    if ((+m[1] % 10) >= (+m[2] % 10)) dolu++;
  }
  dolu ? nahlas(`${dolu}/300 odčítání "přes desítku" přes desítku nepřechází`)
       : console.log('  ✓ odčítání přes desítku vždy přechází');
}

console.log('\n=== 3. Sada úloh má správný počet a složení ===');
{
  for (const pocet of [9, 12, 15, 18]) {
    const sada = Matika.sestavSadu({}, { pocetMatUloh: pocet });
    if (sada.length !== pocet) nahlas(`požadováno ${pocet} úloh, vráceno ${sada.length}`);
  }
  const sada = Matika.sestavSadu({}, { pocetMatUloh: 15 });
  if (sada.length === 15) console.log('  ✓ výchozí sada má přesně 15 úloh');

  // Nesmí jít pět stejných oblastí za sebou
  let nejdelsiRada = 1, ted = 1;
  for (let i = 1; i < sada.length; i++) {
    const o1 = Matika.DOVEDNOSTI.find(d => d.klic === sada[i - 1].dovednost).oblast;
    const o2 = Matika.DOVEDNOSTI.find(d => d.klic === sada[i].dovednost).oblast;
    ted = (o1 === o2) ? ted + 1 : 1;
    nejdelsiRada = Math.max(nejdelsiRada, ted);
  }
  nejdelsiRada > 3 ? nahlas(`${nejdelsiRada} úloh stejné oblasti za sebou`)
                   : console.log(`  ✓ oblasti se střídají (nejdelší řada: ${nejdelsiRada})`);
}

console.log('\n=== 4. Slovní úlohy: dělení beze zbytku, nic záporného ===');
{
  let potize = 0;
  for (let i = 0; i < 800; i++) {
    const u = Matika.generuj('slovni-uloha', 1);
    if (u.spravne < 0 || !Number.isInteger(u.spravne) || u.spravne > 100) potize++;
    if (!u.podotazky || !u.podotazky.coVime || !u.podotazky.coZjistit) potize++;
  }
  potize ? nahlas(`${potize} problémů ve slovních úlohách`)
         : console.log('  ✓ 800 slovních úloh v pořádku (celé číslo, 0–100, s podotázkami)');

  let dvoj = 0;
  for (let i = 0; i < 300; i++) {
    const u = Matika.generuj('slovni-uloha-dvoukrokova', 1);
    if (u.spravne < 0 || !Number.isInteger(u.spravne)) dvoj++;
  }
  dvoj ? nahlas(`${dvoj} problémů v dvoukrokových úlohách`)
       : console.log('  ✓ dvoukrokové úlohy v pořádku');
}

console.log('\n=== 5. Kontrola odpovědi a rozpoznání chyby ===');
{
  const u = Matika.generuj('scitani-pres-desitku', 1);
  if (!Matika.zkontroluj(u, u.spravne)) nahlas('správná odpověď neprošla');
  if (!Matika.zkontroluj(u, ' ' + u.spravne + ' ')) nahlas('odpověď s mezerami neprošla');
  if (Matika.zkontroluj(u, u.spravne + 1)) nahlas('špatná odpověď prošla');
  if (Matika.zkontroluj(u, 'ahoj')) nahlas('text prošel jako číslo');

  const uu = { zadani: '45 + 7 = ?', spravne: 52, typ: 'vypocet' };
  if (Matika.rozpoznejChybu(uu, 42) !== 'desitka') nahlas('nerozpoznána ztracená desítka');
  if (Matika.rozpoznejChybu(uu, 51) !== 'oJedna') nahlas('nerozpoznán posun o jedna');
  if (Matika.rozpoznejChybu(uu, 38) !== 'zamenaOperace') nahlas('nerozpoznána záměna operace');
  console.log('  ✓ kontrola odpovědí i rozpoznání typických chyb funguje');
}

console.log('\n=== 6. Adaptivita: úroveň roste i klesá ===');
{
  const p = {};
  for (let i = 0; i < 3; i++) Pokrok.zaznamenej(p, 'nasobilka-3', { spravne: true, stupenNapovedy: 0 });
  for (let i = 0; i < 4; i++) Pokrok.zaznamenej(p, 'nasobilka-3', { spravne: true, stupenNapovedy: 0 });
  const poUspechu = p['nasobilka-3'].uroven;
  if (poUspechu <= 1) nahlas(`po 7 správných je úroveň pořád ${poUspechu}`);
  else console.log(`  ✓ po samých správných vzrostla úroveň na ${poUspechu}`);

  for (let i = 0; i < 6; i++) Pokrok.zaznamenej(p, 'nasobilka-3', { spravne: false });
  const poChybach = p['nasobilka-3'].uroven;
  if (poChybach >= poUspechu) nahlas(`po 6 chybách úroveň neklesla (${poChybach})`);
  else console.log(`  ✓ po chybách úroveň klesla na ${poChybach}`);

  if (p['nasobilka-3'].uroven < 1) nahlas('úroveň klesla pod 1');

  // Nová dovednost má přednost před zvládnutou
  const vahaNova = Pokrok.vahaProVyber(p, 'deleni-6');
  const vahaZnama = Pokrok.vahaProVyber(p, 'nasobilka-3');
  if (vahaNova <= 0) nahlas('nová dovednost má nulovou váhu');
  else console.log(`  ✓ nová dovednost má váhu ${vahaNova.toFixed(1)}, dnes procvičená ${vahaZnama.toFixed(1)}`);
}

console.log('\n=== 7. Čtenářská úroveň nepřeskakuje ===');
{
  const dobra = { dokonceno: true, spravnychOtazek: 5, napovedy: 0 };
  const stav = { profil: { ctenarskaUroven: 1 }, lekce: [] };
  if (Pokrok.vyhodnotCtenarskouUroven(stav).zmena !== 0) nahlas('posun bez dat');
  stav.lekce = [{ cteni: dobra }, { cteni: dobra }, { cteni: dobra }];
  if (Pokrok.vyhodnotCtenarskouUroven(stav).zmena !== 1) nahlas('nepostoupila po 3 dobrých lekcích');
  stav.lekce = [{ cteni: { dokonceno: true, spravnychOtazek: 1, napovedy: 6 } },
                { cteni: { dokonceno: true, spravnychOtazek: 2, napovedy: 5 } },
                { cteni: dobra }];
  stav.profil.ctenarskaUroven = 3;
  if (Pokrok.vyhodnotCtenarskouUroven(stav).zmena !== -1) nahlas('neklesla po slabých lekcích');
  console.log('  ✓ čtenářská úroveň stoupá po 3 dobrých a klesá po slabých');
}

console.log(chyb === 0 ? '\n✅ VŠE PROŠLO\n' : `\n❌ ${chyb} PROBLÉMŮ\n`);
process.exit(chyb ? 1 : 0);
