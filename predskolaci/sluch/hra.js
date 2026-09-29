// ─── Slova a zvuky — sluchové vnímání (příprava na čtení) ───────────────────
// Vytleskávání slabik, první hláska slova, rýmy. Samotné hlásky se nevyslovují
// (počítačový hlas je neumí) — dítě vždy porovnává celá slova.

function prvni(s) { return s.w[0]; }
function konec(s) { return s.w.slice(-2); }
function seznamSlov(slova) {
  const w = slova.map(s => s.w);
  return w.length === 1 ? w[0] : w.slice(0, -1).join(', ') + ', nebo ' + w[w.length - 1];
}
function slabikyText(n) { return n === 1 ? 'jednu slabiku' : n < 5 ? CISLA[n] + ' slabiky' : CISLA[n] + ' slabik'; }

Zaklad.start({
  id: 'sluch',
  nazev: 'Slova a zvuky',
  emoji: '👂',
  popis: 'Poslouchej slova, vytleskej je a hledej, co zní podobně.',
  rezimy: [
    {
      id: 'slabiky', nazev: 'Vytleskej slovo', emoji: '🥁', popis: 'Ťukni na bubínek za každou slabiku.',
      uloha(ctx) {
        const max = ctx.uroven + 1;
        const s = nahodne(SLOVA.filter(x => x.sl.length <= max));
        let tlesk = 0;
        ctx.stage.appendChild(el(`<div class="show">${s.e}</div>`));
        const claps = el('<div class="claps"></div>');
        const kresli = () => { claps.textContent = '👏'.repeat(tlesk); };
        const buben = tlacitko('🥁', () => { if (tlesk < 6) { tlesk++; Zvuk.buben(); kresli(); } }, 'big');
        const row = el('<div class="row"></div>');
        const znovu = el('<button class="btn-secondary">↩️ Znovu</button>');
        znovu.addEventListener('click', () => { tlesk = 0; kresli(); });
        const hotovo = el('<button class="btn-primary">✔️ Hotovo</button>');
        hotovo.addEventListener('click', () => {
          if (tlesk === 0) return;
          const rozlozene = s.sl.join('. ') + '.';
          if (tlesk === s.sl.length) ctx.spravne(claps, rozlozene + ' Slovo ' + s.w + ' má ' + slabikyText(s.sl.length) + '.');
          else { ctx.spatne(claps, 'Poslouchej: ' + rozlozene + ' Zkus to znovu.'); tlesk = 0; kresli(); }
        });
        row.append(znovu, hotovo);
        ctx.stage.append(buben, claps, row);
        ctx.pokyn(`Vytleskej: ${s.w}`, `Vytleskej slovo ${s.w}. Za každou slabiku jednou ťukni na bubínek.`);
      }
    },
    {
      id: 'zacatek', nazev: 'Na co slovo začíná?', emoji: '🔤', popis: 'Najdi obrázek, který začíná stejně.',
      uloha(ctx) {
        // „auto“ začíná dvojhláskou au — pro začátečníky matoucí, proto ho vynecháme
        const zdroj = SLOVA.filter(s => s.w !== 'auto');
        const kandidati = zdroj.filter(s => zdroj.some(t => t !== s && prvni(t) === prvni(s)));
        const cil = nahodne(kandidati);
        const dobre = nahodne(zdroj.filter(t => t !== cil && prvni(t) === prvni(cil)));
        const pocetSpatnych = ctx.uroven === 3 ? 3 : 2;
        const spatne = [];
        zamichej(zdroj).forEach(t => {
          if (spatne.length < pocetSpatnych && !podobne(prvni(t), prvni(cil)) && !spatne.some(x => prvni(x) === prvni(t))) spatne.push(t);
        });
        const moznosti = zamichej([dobre, ...spatne]);
        ctx.stage.appendChild(el(`<div class="show">${cil.e}</div>`));
        const row = el('<div class="row"></div>');
        moznosti.forEach(m => row.appendChild(tlacitko(m.e, b => {
          if (m === dobre) ctx.spravne(b, `${cil.w} a ${dobre.w} začínají stejně.`);
          else ctx.spatne(b, `${m.w} začíná jinak než ${cil.w}. Zkus jiný.`);
        })));
        ctx.stage.appendChild(row);
        ctx.pokyn(`Co začíná stejně jako ${cil.w}?`,
          `Které slovo začíná stejně jako ${cil.w}? ${seznamSlov(moznosti)}?`);
      }
    },
    {
      id: 'rymy', nazev: 'Co se rýmuje?', emoji: '🎵', popis: 'Najdi slovo, které zní na konci stejně.',
      uloha(ctx) {
        const skupina = nahodne(RYMY);
        const [cilW, dobreW] = vyber(skupina, 2);
        const cil = slovo(cilW), dobre = slovo(dobreW);
        const spatne = vyber(SLOVA.filter(s => !RYMY.some(g => g.includes(s.w) && g.includes(cilW)) && konec(s) !== konec(cil)), ctx.uroven);
        const moznosti = zamichej([dobre, ...spatne]);
        ctx.stage.appendChild(el(`<div class="show">${cil.e}</div>`));
        const row = el('<div class="row"></div>');
        moznosti.forEach(m => row.appendChild(tlacitko(m.e, b => {
          if (m === dobre) ctx.spravne(b, `${cil.w}, ${dobre.w}. To se rýmuje!`);
          else ctx.spatne(b, `${cil.w}, ${m.w}. To se nerýmuje. Zkus jiný.`);
        })));
        ctx.stage.appendChild(row);
        ctx.pokyn(`Co se rýmuje se slovem ${cil.w}?`,
          `Co se rýmuje se slovem ${cil.w}? ${seznamSlov(moznosti)}?`);
      }
    }
  ]
});
