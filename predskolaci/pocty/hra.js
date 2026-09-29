// ─── Počítání — kolik, čeho je víc, nakrm zvířátko ─────────────────────────

// Věci k počítání + 2. pád množného čísla pro otázku „Kolik je tu …?“
const VECI = [
  ['🍎', 'jablíček'], ['⭐', 'hvězdiček'], ['🐟', 'rybiček'], ['🐞', 'berušek'], ['🎈', 'balónků'],
  ['🌸', 'kytiček'], ['🚗', 'autíček'], ['🐤', 'kuřátek'], ['🍓', 'jahod'], ['🐶', 'pejsků']
];

// Zvířátka a jejich jídlo; tvary = [1 kus (4. pád), 2–4 kusy, 5 a víc]
const KRMENI = [
  { z: '🐰', komu: 'zajíčkovi', e: '🥕', rod: 'f', tvary: ['mrkev', 'mrkve', 'mrkví'] },
  { z: '🐶', komu: 'pejskovi', e: '🦴', rod: 'f', tvary: ['kost', 'kosti', 'kostí'] },
  { z: '🐵', komu: 'opičce', e: '🍌', rod: 'm', tvary: ['banán', 'banány', 'banánů'] },
  { z: '🐱', komu: 'kočičce', e: '🐟', rod: 'f', tvary: ['rybu', 'ryby', 'ryb'] },
  { z: '🐭', komu: 'myšce', e: '🧀', rod: 'm', tvary: ['sýr', 'sýry', 'sýrů'] },
  { z: '🐻', komu: 'medvídkovi', e: '🍓', rod: 'f', tvary: ['jahodu', 'jahody', 'jahod'] },
  { z: '🐴', komu: 'koníkovi', e: '🍎', rod: 'n', tvary: ['jablko', 'jablka', 'jablek'] }
];

function pocetVeci(n, k) {
  const c = n === 1 ? { m: 'jeden', f: 'jednu', n: 'jedno' }[k.rod]
    : n === 2 ? (k.rod === 'm' ? 'dva' : 'dvě') : CISLA[n];
  return c + ' ' + (n === 1 ? k.tvary[0] : n < 5 ? k.tvary[1] : k.tvary[2]);
}

// Tlačítko s číslem a tečkami (předškolák číslice ještě nemusí znát)
function cisloTlacitko(n, onClick) {
  return tlacitko(`${n}${tecky(n)}`, onClick, 'num');
}

Zaklad.start({
  id: 'pocty',
  nazev: 'Počítání',
  emoji: '🔢',
  popis: 'Počítej, porovnávej a krm zvířátka.',
  rezimy: [
    {
      id: 'kolik', nazev: 'Kolik jich je?', emoji: '🍎', popis: 'Spočítej obrázky.',
      uloha(ctx) {
        const [od, do_] = [[1, 5], [3, 8], [5, 10]][ctx.uroven - 1];
        const n = cislo(od, do_);
        const [e, kolik] = nahodne(VECI);
        const box = rozhazej(Array(n).fill(e));
        ctx.stage.appendChild(box);
        // Možnosti: správná + dvě blízká čísla
        const blizka = zamichej([n - 2, n - 1, n + 1, n + 2].filter(x => x >= 1 && x <= 10)).slice(0, 2);
        const row = el('<div class="row"></div>');
        let pocitam = false;
        zamichej([n, ...blizka]).forEach(x => row.appendChild(cisloTlacitko(x, b => {
          if (pocitam) return;
          if (x !== n) { ctx.spatne(b, 'To ne. Zkus je spočítat prstem.'); return; }
          // Po správné odpovědi společně spočítáme nahlas
          pocitam = true;
          b.classList.add('ok');
          const kusy = [...box.children];
          ctx.rekni(CISLA.slice(1, n + 1).join(', '));
          kusy.forEach((k, i) => ctx.pozdeji(() => k.classList.add('lit'), 200 + i * 650));
          ctx.pozdeji(() => ctx.spravne(b), 400 + n * 650);
        })));
        ctx.stage.appendChild(row);
        ctx.pokyn(`Kolik je tu ${kolik}?`);
      }
    },
    {
      id: 'vic', nazev: 'Čeho je víc?', emoji: '⚖️', popis: 'Kde je víc a kde míň?',
      uloha(ctx) {
        const u = ctx.uroven;
        let a, b;
        const [max, rozdil] = [[7, 3], [8, 2], [10, 1]][u - 1];
        const stejne = u === 3 && Math.random() < 0.25;
        do { a = cislo(1, max); b = stejne ? a : cislo(1, max); } while (!stejne && Math.abs(a - b) < rozdil);
        const otazkaVic = u === 1 || Math.random() < 0.5;
        const [e1, e2] = u === 1 ? [nahodne(VECI)[0], null] : vyber(VECI, 2).map(v => v[0]);
        const row = el('<div class="row"></div>');
        const skupiny = [[a, e1], [b, e2 || e1]].map(([n, e]) => {
          const box = rozhazej(Array(n).fill(e), 'scatter half', 3, 4);
          const btn = document.createElement('button');
          btn.className = box.className;
          btn.innerHTML = box.innerHTML;
          row.appendChild(btn);
          return { n, btn };
        });
        ctx.stage.appendChild(row);
        const vysvetli = stejne ? `Na obou stranách je ${CISLA[a]}.`
          : `${CISLA[Math.max(a, b)]} je víc než ${CISLA[Math.min(a, b)]}.`;
        skupiny.forEach((s, i) => s.btn.addEventListener('click', () => {
          const druha = skupiny[1 - i].n;
          const dobre = !stejne && (otazkaVic ? s.n > druha : s.n < druha);
          if (dobre) ctx.spravne(s.btn, vysvetli);
          else ctx.spatne(s.btn, stejne ? 'Spočítej obě strany. Není jich stejně?' : 'Zkus to spočítat.');
        }));
        if (u === 3) {
          const eq = tlacitko('⚖️<small>stejně</small>', btn => {
            if (stejne) ctx.spravne(btn, vysvetli);
            else ctx.spatne(btn, 'Stejně to není. Spočítej obě strany.');
          });
          ctx.stage.appendChild(eq);
        }
        const otazka = otazkaVic ? 'Kde je víc?' : 'Kde je míň?';
        ctx.pokyn(otazka, u === 3 ? otazka + ' Nebo je jich stejně?' : otazka);
      }
    },
    {
      id: 'nakrm', nazev: 'Nakrm zvířátko', emoji: '🐰', popis: 'Dej zvířátku přesně tolik, kolik chce.',
      uloha(ctx) {
        const [od, do_] = [[1, 3], [2, 5], [4, 8]][ctx.uroven - 1];
        const n = cislo(od, do_);
        const k = nahodne(KRMENI);
        ctx.stage.appendChild(el(`<div class="show">${k.z}</div>`));
        const talir = el('<div class="plate"></div>');
        const zasoba = el('<div class="supply"></div>');
        const presun = (btn) => {
          Zvuk.klik();
          (btn.parentNode === zasoba ? talir : zasoba).appendChild(btn);
        };
        for (let i = 0; i < 10; i++) {
          const b = document.createElement('button');
          b.textContent = k.e;
          b.addEventListener('click', () => presun(b));
          zasoba.appendChild(b);
        }
        ctx.stage.appendChild(talir);
        ctx.stage.appendChild(el('<div class="hint">Ťukni na jídlo a dej ho na talíř</div>'));
        ctx.stage.appendChild(zasoba);
        const hotovo = el('<button class="btn-primary">✔️ Hotovo</button>');
        hotovo.addEventListener('click', () => {
          const m = talir.children.length;
          if (m === n) ctx.spravne(talir, 'Mňam, děkuju!');
          else if (m < n) ctx.spatne(talir, 'Ještě je to málo. Přidej.');
          else ctx.spatne(talir, 'To je moc. Něco vrať.');
        });
        ctx.stage.appendChild(hotovo);
        const vic = pocetVeci(n, k);
        ctx.pokyn(`Dej ${k.komu} ${n} ${k.e}`, `Dej ${k.komu} ${vic}.`);
      }
    }
  ]
});
