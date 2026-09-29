// ─── Kde to je? — orientace v prostoru ─────────────────────────────────────
// nad / pod / vlevo / vpravo / před / za, rohy, vlevo–vpravo–nahoře–dole.
// „Vlevo“ a „vpravo“ jsou vždy z pohledu dítěte, které se dívá na obrazovku.

// Pevné věci: 7. pád (nad čím) a 2. pád (vlevo od čeho)
const MISTA = [
  { e: '🏠', inst: 'domečkem', gen: 'domečku' },
  { e: '🌳', inst: 'stromem', gen: 'stromu' },
  { e: '📦', inst: 'krabicí', gen: 'krabice' },
  { e: '🚗', inst: 'autem', gen: 'auta' },
  { e: '🪑', inst: 'židlí', gen: 'židle' }
];
// Věci, které se pokládají: 1. pád a 4. pád
const VECI = [
  { e: '⚽', nom: 'míč', acc: 'míč' },
  { e: '🐱', nom: 'kočička', acc: 'kočičku' },
  { e: '🐦', nom: 'ptáček', acc: 'ptáčka' },
  { e: '⭐', nom: 'hvězdička', acc: 'hvězdičku' },
  { e: '🎈', nom: 'balónek', acc: 'balónek' },
  { e: '🐶', nom: 'pejsek', acc: 'pejska' }
];

// Vztahy: posun v mřížce 3×3 od prostřední buňky + text + umístění ve scénce (v %)
const VZTAHY = {
  nad: { dx: 0, dy: -1, text: m => 'nad ' + m.inst, sc: [50, 17, 40, 2] },
  pod: { dx: 0, dy: 1, text: m => 'pod ' + m.inst, sc: [50, 84, 40, 2] },
  vlevo: { dx: -1, dy: 0, text: m => 'vlevo od ' + m.gen, sc: [16, 55, 40, 2] },
  vpravo: { dx: 1, dy: 0, text: m => 'vpravo od ' + m.gen, sc: [84, 55, 40, 2] },
  // před/za: věc se překrývá s místem — vpředu je celá vidět, vzadu je napůl schovaná
  pred: { text: m => 'před ' + m.inst, sc: [60, 66, 44, 3] },
  za: { text: m => 'za ' + m.inst, sc: [38, 50, 44, 0] }
};
const ROHY = [
  { dx: -1, dy: -1, text: 'do levého horního rohu' },
  { dx: 1, dy: -1, text: 'do pravého horního rohu' },
  { dx: -1, dy: 1, text: 'do levého dolního rohu' },
  { dx: 1, dy: 1, text: 'do pravého dolního rohu' }
];

function mrizka3() {
  const g = document.createElement('div');
  g.className = 'grid';
  g.style.gridTemplateColumns = 'repeat(3, 1fr)';
  g.style.width = 'min(88vw, 46vh, 420px)';
  for (let i = 0; i < 9; i++) {
    const c = document.createElement('button');
    c.className = 'cell';
    c.dataset.x = i % 3 - 1;
    c.dataset.y = Math.floor(i / 3) - 1;
    g.appendChild(c);
  }
  return g;
}

Zaklad.start({
  id: 'prostor',
  nazev: 'Kde to je?',
  emoji: '🧭',
  popis: 'Nahoře, dole, vlevo, vpravo, před a za.',
  rezimy: [
    {
      id: 'poloz', nazev: 'Polož to', emoji: '👆', popis: 'Polož věc na správné místo.',
      uloha(ctx) {
        const u = ctx.uroven;
        const m = nahodne(MISTA), v = nahodne(VECI);
        const moznosti = [
          ...['nad', 'pod', ...(u >= 2 ? ['vlevo', 'vpravo'] : [])].map(k => ({ ...VZTAHY[k], text: VZTAHY[k].text(m) })),
          ...(u >= 3 ? ROHY : [])
        ];
        const cil = nahodne(moznosti);
        const g = mrizka3();
        const bunky = [...g.children];
        bunky.forEach(c => {
          const x = +c.dataset.x, y = +c.dataset.y;
          if (x === 0 && y === 0) { c.textContent = m.e; c.classList.add('ref'); c.disabled = true; return; }
          c.classList.add('empty');
          c.addEventListener('click', () => {
            if (c.classList.contains('ok')) return;
            c.textContent = v.e;
            c.classList.remove('empty');
            if (x === cil.dx && y === cil.dy) ctx.spravne(c);
            else {
              ctx.spatne(c, 'Tady to není. Poslouchej ještě jednou: ' + v.acc + ' ' + cil.text + '.');
              ctx.pozdeji(() => { c.textContent = ''; c.classList.add('empty'); }, 900);
            }
          });
        });
        ctx.stage.appendChild(el(`<div class="show">${v.e}</div>`));
        ctx.stage.appendChild(g);
        ctx.pokyn(`Polož ${v.acc} ${cil.text}`, `Polož ${v.acc} ${cil.text}.`);
      }
    },
    {
      id: 'najdi', nazev: 'Najdi obrázek', emoji: '🔍', popis: 'Kde je kočička pod stromem?',
      uloha(ctx) {
        const u = ctx.uroven;
        const v = nahodne(VECI);
        const klice = u === 1 ? ['nad', 'pod'] : u === 2 ? ['nad', 'pod', 'vlevo', 'vpravo'] : ['nad', 'pod', 'vlevo', 'vpravo', 'pred', 'za'];
        // Na úrovni 3 se vždy objeví dvojice před/za, aby šlo o skutečné rozlišování
        let vybrane = u === 3 && Math.random() < 0.6 ? zamichej(['pred', 'za', nahodne(klice.slice(0, 4))]) : vyber(klice, u === 1 ? 2 : 3);
        const cil = nahodne(vybrane);
        // Pro před/za jen velké neprůhledné věci (domeček, strom, krabice), jinak by schování nebylo vidět
        const m = nahodne(vybrane.some(k => k === 'pred' || k === 'za') ? MISTA.slice(0, 3) : MISTA);
        const row = el('<div class="row"></div>');
        vybrane.forEach(k => {
          const [x, y, vel, z] = VZTAHY[k].sc;
          const b = document.createElement('button');
          b.className = 'scene';
          b.innerHTML = `
            <span style="left:50%;top:55%;font-size:clamp(48px,14vw,76px);z-index:1">${m.e}</span>
            <span style="left:${x}%;top:${y}%;font-size:clamp(${Math.round(vel * 0.7)}px,${vel / 5}vw,${vel}px);z-index:${z}">${v.e}</span>`;
          b.addEventListener('click', () => {
            if (k === cil) ctx.spravne(b);
            else ctx.spatne(b, 'Tady je ' + v.nom + ' ' + VZTAHY[k].text(m) + '. Zkus jiný obrázek.');
          });
          row.appendChild(b);
        });
        ctx.stage.appendChild(row);
        const veta = `${v.nom} ${VZTAHY[cil].text(m)}`;
        ctx.pokyn(`Kde je ${veta}?`, `Najdi obrázek, kde je ${veta}.`);
      }
    },
    {
      id: 'strany', nazev: 'Vlevo, vpravo', emoji: '↔️', popis: 'Ťukni na obrázek na správné straně.',
      uloha(ctx) {
        const u = ctx.uroven;
        const obr = SLOVA.filter(s => s.w !== 'les');
        let sloupcu, radku, popis;
        if (u === 1) { sloupcu = 2; radku = 1; popis = (x) => ['vlevo', 'vpravo'][x]; }
        else if (u === 2) {
          if (Math.random() < 0.5) { sloupcu = 3; radku = 1; popis = (x) => ['vlevo', 'uprostřed', 'vpravo'][x]; }
          else { sloupcu = 1; radku = 3; popis = (x, y) => ['nahoře', 'uprostřed', 'dole'][y]; }
        } else {
          sloupcu = 3; radku = 3;
          popis = (x, y) => {
            if (x === 1 && y === 1) return 'úplně uprostřed';
            const sv = ['nahoře', 'uprostřed', 'dole'][y], vo = ['vlevo', 'uprostřed', 'vpravo'][x];
            return x === 1 ? sv + ' uprostřed' : y === 1 ? vo + ' uprostřed' : vo + ' ' + sv;
          };
        }
        const vybrane = vyber(obr, sloupcu * radku);
        const cilIndex = cislo(0, vybrane.length - 1);
        const cx = cilIndex % sloupcu, cy = Math.floor(cilIndex / sloupcu);
        const g = document.createElement('div');
        g.className = 'grid';
        g.style.gridTemplateColumns = `repeat(${sloupcu}, 1fr)`;
        g.style.width = `min(92vw, ${sloupcu * 140}px)`;
        vybrane.forEach((o, i) => {
          const c = document.createElement('button');
          c.className = 'cell';
          c.textContent = o.e;
          c.addEventListener('click', () => {
            if (i === cilIndex) ctx.spravne(c, `${popis(cx, cy)} je ${o.w}.`.replace(/^./, z => z.toUpperCase()));
            else ctx.spatne(c, `To je ${popis(i % sloupcu, Math.floor(i / sloupcu))}. Zkus to znovu.`);
          });
          g.appendChild(c);
        });
        ctx.stage.appendChild(g);
        ctx.pokyn(`Ťukni na obrázek ${popis(cx, cy)}`, `Ťukni na obrázek ${popis(cx, cy)}.`);
      }
    }
  ]
});
