// Test hvězdiček, známky, milníků a tónu SUN
const fs = require('fs');
const vm = require('vm');
const ZAKLAD = require('path').join(__dirname, '..');

const ctx = { console };
vm.createContext(ctx);
for (const f of ['data/texty.js', 'data/ulohy.js', 'js/pokrok.js', 'js/matika.js', 'js/cteni.js', 'js/sun.js', 'js/hodnoceni.js']) {
  vm.runInContext(fs.readFileSync(`${ZAKLAD}/${f}`, 'utf8'), ctx, { filename: f });
}
vm.runInContext('globalThis.__H = Hodnoceni; globalThis.__S = SUN; globalThis.__C = Cteni;', ctx);
const H = ctx.__H, S = ctx.__S, C = ctx.__C;

let chyb = 0;
const nahlas = (m) => { console.log('  ✗ ' + m); chyb++; };

// Pomocník: vyrobí lekci daného "kvality"
function lekce(kvalita) {
  if (kvalita === 'skvela') return {
    dokoncena: true, energie: 'hodne', opraveneChyby: 3, pouziteNapovedy: 1,
    cteni: { dokonceno: true, spravnychOtazek: 5, celychVet: 5, napovedy: 0, tema: 'zvirata',
             tezkaSlova: ['dobrodružství'], detektiv: { celkem: 4, spravne: 4 } },
    psani: { odevzdano: true, zpusob: 'text' },
    matika: { ulohy: new Array(15), spravne: 15, bezNapovedy: 14, vysvetlilaPostup: 2, spravnaOperace: 3, chybneDovednosti: [] },
  };
  if (kvalita === 'slaba') return {
    dokoncena: true, energie: 'unavena', opraveneChyby: 0, pouziteNapovedy: 6,
    cteni: { dokonceno: true, spravnychOtazek: 1, celychVet: 0, napovedy: 6, tema: 'hudba', detektiv: { celkem: 4, spravne: 1 } },
    psani: { odevzdano: false },
    matika: { ulohy: new Array(15), spravne: 4, bezNapovedy: 1, chybneDovednosti: ['scitani-pres-desitku', 'scitani-pres-desitku'] },
  };
  if (kvalita === 'nedokoncena') return {
    dokoncena: false, energie: 'unavena',
    cteni: { dokonceno: true, spravnychOtazek: 2, celychVet: 1, napovedy: 3, tema: 'vesmir' },
    matika: { ulohy: new Array(6), spravne: 3, bezNapovedy: 2, chybneDovednosti: [] },
  };
  return { // průměrná
    dokoncena: true, energie: 'pohoda', opraveneChyby: 2, pouziteNapovedy: 3,
    cteni: { dokonceno: true, spravnychOtazek: 4, celychVet: 3, napovedy: 2, tema: 'veda', detektiv: { celkem: 3, spravne: 2 } },
    psani: { odevzdano: true, zpusob: 'foto' },
    matika: { ulohy: new Array(15), spravne: 11, bezNapovedy: 8, spravnaOperace: 2, chybneDovednosti: ['deleni-4'] },
  };
}

console.log('\n=== 1. Hvězdičky nikdy nepřekročí 10 ===');
for (const k of ['skvela', 'prumerna', 'slaba', 'nedokoncena']) {
  const h = H.spocitej(lekce(k));
  const znak = (h.celkem >= 0 && h.celkem <= 10) ? '✓' : '✗';
  if (znak === '✗') chyb++;
  console.log(`  ${znak} ${k.padEnd(12)} → ${h.celkem} hvězdiček`);
  // Žádná část nepřekročí svůj strop
  for (const [nazev, cast] of Object.entries(h.casti)) {
    if (cast.ziskano > cast.max) nahlas(`${k}: část "${nazev}" dala ${cast.ziskano} z max ${cast.max}`);
  }
}

console.log('\n=== 2. Hvězdičky se dávají i za jiné věci než správnost ===');
{
  // Lekce s mizernými výsledky, ale dokončená a s opravami chyb
  const l = { dokoncena: true, energie: 'unavena', opraveneChyby: 3, pouziteNapovedy: 4,
    cteni: { dokonceno: true, spravnychOtazek: 0, celychVet: 0, napovedy: 5, tema: 'hudba' },
    psani: { odevzdano: true, zpusob: 'foto' },
    matika: { ulohy: new Array(15), spravne: 2, bezNapovedy: 0, chybneDovednosti: [] } };
  const h = H.spocitej(l);
  if (h.celkem === 0) nahlas('za samou snahu bez správných odpovědí nedala ani hvězdičku');
  else console.log(`  ✓ i při 2/15 správně dostane ${h.celkem} hvězdiček (za dočtení, psaní, vytrvalost)`);
  if (h.casti.vytrvalost.ziskano !== 1) nahlas('nedala hvězdičku za vytrvalost');
}

console.log('\n=== 3. Známka nikdy horší než 2 a slabý den bez známky ===');
for (const k of ['skvela', 'prumerna', 'slaba', 'nedokoncena']) {
  const l = lekce(k);
  const h = H.spocitej(l);
  const z = H.znamka(l, h);
  if (z.znamka !== null && !['1', '1−', '2'].includes(z.znamka)) nahlas(`${k}: nepovolená známka "${z.znamka}"`);
  console.log(`  ✓ ${k.padEnd(12)} → ${z.znamka === null ? 'bez známky' : 'známka ' + z.znamka}`);
}
{
  const l = lekce('nedokoncena');
  if (H.znamka(l, H.spocitej(l)).znamka !== null) nahlas('nedokončená lekce dostala známku');
}

console.log('\n=== 4. SUN nikdy nepoužije zakázanou formulaci ===');
{
  const vsechnyHlasky = [];
  vsechnyHlasky.push(S.pozdrav('Ami', 1), S.pozdrav('Ami', 7));
  ['hodne', 'pohoda', 'unavena'].forEach(e => vsechnyHlasky.push(S.reakceNaEnergii(e)));
  vsechnyHlasky.push(S.uvodCteni('Test'), S.uvodOtazek(), S.uvodPsani(), S.uvodMatiky(15), S.uvodDetektiva());
  for (let i = 0; i < 200; i++) {
    vsechnyHlasky.push(S.spravneMatika(i % 7, i % 2 === 0));
    vsechnyHlasky.push(S.chybaMatika(['desitka', 'oJedna', 'zamenaOperace', null][i % 4]));
    vsechnyHlasky.push(S.poOpraveChyby(), S.oPrstech(), S.otazkaNaPostup(), S.poPouzitiNapovedy());
  }
  Object.values(C.STAV).forEach(stav => {
    for (let i = 0; i < 30; i++) vsechnyHlasky.push(S.reakceNaOdpoved(stav, ['tečka na konci']));
  });
  vsechnyHlasky.push(S.nabidkaPauzy(), S.poPauze(), S.konecBezDokonceni(), S.fotkaNecitelna(), S.fotkaUlozena());
  for (const k of ['skvela', 'prumerna', 'slaba']) {
    const l = lekce(k);
    for (let i = 0; i < 50; i++) vsechnyHlasky.push(H.osobniZprava('Ami', l, H.spocitej(l)));
  }

  const zavadne = vsechnyHlasky.filter(h => !S.jeVPoradku(h));
  if (zavadne.length) {
    nahlas(`${zavadne.length} hlášek obsahuje zakázanou formulaci:`);
    [...new Set(zavadne)].slice(0, 5).forEach(h => console.log(`      "${h}"`));
  } else {
    console.log(`  ✓ zkontrolováno ${vsechnyHlasky.length} hlášek, žádná zakázaná formulace`);
  }

  // Filtr musí zabrat, kdyby se něco proklouzlo
  if (S.bezpecne('To je špatně, zase jsi udělala chybu.').includes('špatně')) nahlas('bezpečnostní filtr nezabral');
  else console.log('  ✓ bezpečnostní filtr zachytí závadnou větu');
}

console.log('\n=== 5. Milníky vycházejí z dat, ne z ničeho ===');
{
  const prazdny = { profil: { milniky: [] }, lekce: [], pokrok: {} };
  if (H.noveMilniky(prazdny).length) nahlas('prázdný profil dostal milník');
  else console.log('  ✓ bez dat žádný milník');

  // Kamarádka desítky — musí opravdu zvládat obě dovednosti
  const sDesitkou = { profil: { milniky: [] }, lekce: [], pokrok: {
    'scitani-pres-desitku': { jistota: 0.8 }, 'odcitani-pres-desitku': { jistota: 0.75 } } };
  const m = H.noveMilniky(sDesitkou);
  if (!m.find(x => x.klic === 'kamaradka-desitky')) nahlas('nedostala milník za přechod přes desítku');
  else console.log('  ✓ milník "Kamarádka desítky" se udělí podle skutečného pokroku');

  // Jen jedna z dvojice nestačí
  const pulka = { profil: { milniky: [] }, lekce: [], pokrok: { 'scitani-pres-desitku': { jistota: 0.9 } } };
  if (H.noveMilniky(pulka).find(x => x.klic === 'kamaradka-desitky')) nahlas('milník udělen jen za půl dovednosti');
  else console.log('  ✓ půl dovednosti na milník nestačí');

  // Už získaný se neuděluje znovu
  const uzMa = { ...sDesitkou, profil: { milniky: ['kamaradka-desitky'] } };
  if (H.noveMilniky(uzMa).find(x => x.klic === 'kamaradka-desitky')) nahlas('milník udělen podruhé');
  else console.log('  ✓ získaný milník se neopakuje');
}

console.log('\n=== 6. Pokrok se nevymýšlí bez dat ===');
{
  const prvni = H.pokrokOprotiMinule(lekce('prumerna'), { lekce: [], pokrok: {} });
  if (!prvni[0].includes('výchozí bod')) nahlas(`první lekce nehlásí výchozí bod: "${prvni[0]}"`);
  else console.log('  ✓ u první lekce se hlásí výchozí bod');

  const stav = { lekce: [{ dokoncena: true, datum: new Date().toISOString(),
    cteni: { celychVet: 1, spravnychOtazek: 2 }, matika: { bezNapovedy: 3 } }], pokrok: {} };
  const zpravy = H.pokrokOprotiMinule(lekce('skvela'), stav);
  if (!zpravy.length) nahlas('při existujících datech nevrátil žádné srovnání');
  else console.log(`  ✓ srovnává s uloženými daty: "${zpravy[0]}"`);
  if (zpravy.length > 3) nahlas('vrací víc než 3 zprávy o pokroku');
}

console.log('\n=== 7. "Co trénovat" nabídne nejvýš dvě oblasti ===');
for (const k of ['skvela', 'prumerna', 'slaba']) {
  const t = H.coTrenovat(lekce(k), { pokrok: {} });
  if (t.length > 2) nahlas(`${k}: ${t.length} oblastí k trénování (max 2)`);
}
console.log('  ✓ nejvýš dvě oblasti k trénování');

console.log('\n=== 8. Série: vynechaný den netrestá ===');
{
  const den = (p) => { const d = new Date(); d.setDate(d.getDate() - p); return d.toISOString(); };
  if (H.serie([]) !== 0) nahlas('prázdná historie nedává 0');
  const trirada = [{ dokoncena: true, datum: den(0) }, { dokoncena: true, datum: den(1) }, { dokoncena: true, datum: den(2) }];
  if (H.serie(trirada) !== 3) nahlas(`tři dny po sobě dávají ${H.serie(trirada)} místo 3`);
  else console.log('  ✓ tři dny po sobě = série 3');
  const sMezerou = [{ dokoncena: true, datum: den(0) }, { dokoncena: true, datum: den(3) }];
  if (H.serie(sMezerou) !== 1) nahlas(`po vynechání má být série 1, je ${H.serie(sMezerou)}`);
  else console.log('  ✓ po vynechání se série jen restartuje, nic se neodebírá');
  const vcera = [{ dokoncena: true, datum: den(1) }, { dokoncena: true, datum: den(2) }];
  if (H.serie(vcera) !== 2) nahlas(`série ze včerejška má být 2, je ${H.serie(vcera)}`);
  else console.log('  ✓ dnes ještě nepracovala, ale série ze včerejška drží');
}

console.log('\n=== 9. Celý závěr se poskládá ===');
{
  const stav = { profil: { jmeno: 'Ami', milniky: [], celkemHvezdicek: 42 }, lekce: [], pokrok: {} };
  const z = H.zaver(lekce('prumerna'), stav);
  for (const k of ['hvezdicky', 'celkemHvezdicek', 'znamka', 'povedlo', 'trenovat', 'pokrok', 'milniky', 'zprava']) {
    if (z[k] === undefined) nahlas(`v závěru chybí "${k}"`);
  }
  if (z.povedlo.length < 2) nahlas(`"co se povedlo" má mít 2–4 položky, má ${z.povedlo.length}`);
  if (z.povedlo.length > 4) nahlas(`"co se povedlo" má max 4 položky, má ${z.povedlo.length}`);
  if (!z.zprava.includes('Ami')) nahlas('osobní zpráva neoslovuje jménem');
  if (z.celkemHvezdicek !== 42 + z.hvezdicky.celkem) nahlas('celkový součet hvězdiček nesedí');
  console.log(`  ✓ závěr kompletní: ${z.hvezdicky.celkem}/10 hvězdiček, známka ${z.znamka.znamka}, ${z.povedlo.length} pozorování`);
}

console.log(chyb === 0 ? '\n✅ VŠE PROŠLO\n' : `\n❌ ${chyb} PROBLÉMŮ\n`);
process.exit(chyb ? 1 : 0);
