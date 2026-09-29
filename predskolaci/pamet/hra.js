// ─── Zapamatuj si — paměťové hry ────────────────────────────────────────────
// Zraková paměť (co zmizelo, co přibylo, kde to bylo) a sluchová paměť (slyšel jsi?).

const OBRAZKY = SLOVA.filter(s => s.w !== 'les');

// Mřížka obrázků. prazdne = indexy buněk bez obrázku.
function mrizka(polozky, sloupcu) {
  const g = document.createElement('div');
  g.className = 'grid';
  g.style.gridTemplateColumns = `repeat(${sloupcu}, 1fr)`;
  g.style.width = `min(92vw, 52vh, ${sloupcu * 150}px)`;
  polozky.forEach(p => {
    const c = document.createElement('button');
    c.className = 'cell' + (p ? '' : ' empty');
    c.textContent = p ? p.e : '';
    if (p) c.dataset.w = p.w;
    g.appendChild(c);
  });
  return g;
}
function sloupcuPro(n) { return n <= 3 ? n : n === 4 ? 2 : 3; }

// Ukáže obrázky, pak „opona“, pak zavolá dalsi()
function ukazAZakryj(ctx, obsah, doba, dalsi) {
  ctx.stage.innerHTML = '';
  ctx.stage.appendChild(obsah);
  ctx.pozdeji(() => {
    ctx.stage.innerHTML = '';
    ctx.stage.appendChild(el('<div class="curtain">🙈</div>'));
    ctx.pokyn('Zavři oči…', 'Zavři oči!');
    ctx.pozdeji(dalsi, 1600);
  }, doba);
}

Zaklad.start({
  id: 'pamet',
  nazev: 'Zapamatuj si',
  emoji: '🧠',
  popis: 'Dobře se dívej a poslouchej — pak ukaž, co si pamatuješ.',
  rezimy: [
    {
      id: 'zmizelo', nazev: 'Co zmizelo?', emoji: '🙈', popis: 'Jeden obrázek se schová. Který?',
      uloha(ctx) {
        const n = [3, 4, 5][ctx.uroven - 1];
        const vybrane = vyber(OBRAZKY, n);
        const zmizel = nahodne(vybrane);
        const sl = sloupcuPro(n);
        ctx.pokyn('Zapamatuj si obrázky', 'Dobře si prohlédni obrázky a zapamatuj si je.');
        ukazAZakryj(ctx, mrizka(vybrane, sl), 3000 + n * 900, () => {
          // Na úrovni 3 se zbylé obrázky zamíchají, jinak zůstanou na svých místech
          const zbyle = ctx.uroven >= 3
            ? zamichej(vybrane.filter(v => v !== zmizel))
            : vybrane.map(v => v === zmizel ? null : v);
          const g = mrizka(zbyle, sloupcuPro(zbyle.length));
          g.querySelectorAll('.cell').forEach(c => { c.disabled = true; });
          ctx.stage.innerHTML = '';
          ctx.stage.appendChild(g);
          const moznosti = zamichej([zmizel, ...vyber(OBRAZKY.filter(o => !vybrane.includes(o)), 2)]);
          const row = el('<div class="row"></div>');
          moznosti.forEach(m => row.appendChild(tlacitko(m.e, b => {
            if (m === zmizel) ctx.spravne(b, 'Zmizel obrázek ' + m.w + '.');
            else ctx.spatne(b);
          })));
          ctx.stage.appendChild(el('<div class="hint">Co tu chybí?</div>'));
          ctx.stage.appendChild(row);
          ctx.pokyn('Co zmizelo?', 'Jeden obrázek zmizel. Který to byl?');
        });
      }
    },
    {
      id: 'pribylo', nazev: 'Co přibylo?', emoji: '✨', popis: 'Jeden obrázek přibyde. Najdi ho!',
      uloha(ctx) {
        const n = [2, 3, 5][ctx.uroven - 1];
        const vybrane = vyber(OBRAZKY, n + 1);
        const novy = vybrane[n];
        const puvodni = vybrane.slice(0, n);
        ctx.pokyn('Zapamatuj si obrázky', 'Dobře si prohlédni obrázky a zapamatuj si je.');
        ukazAZakryj(ctx, mrizka(puvodni, sloupcuPro(n)), 3000 + n * 900, () => {
          const vse = zamichej(vybrane);
          const g = mrizka(vse, sloupcuPro(vse.length));
          g.querySelectorAll('.cell').forEach(c => c.addEventListener('click', () => {
            if (c.dataset.w === novy.w) ctx.spravne(c, 'Přibyl obrázek ' + novy.w + '.');
            else ctx.spatne(c, 'Tenhle tu byl už předtím. Zkus jiný.');
          }));
          ctx.stage.innerHTML = '';
          ctx.stage.appendChild(g);
          ctx.pokyn('Co je tu nového?', 'Jeden obrázek přibyl. Ťukni na něj.');
        });
      }
    },
    {
      id: 'kde', nazev: 'Kde to bylo?', emoji: '📍', popis: 'Obrázky se otočí. Pamatuješ si, kde byly?',
      uloha(ctx) {
        const [sl, pocet] = [[2, 3], [3, 4], [3, 6]][ctx.uroven - 1];
        const bunek = sl * sl;
        const vybrane = vyber(OBRAZKY, pocet);
        const mista = zamichej([...Array(bunek).keys()]).slice(0, pocet);
        const polozky = Array(bunek).fill(null);
        vybrane.forEach((v, i) => { polozky[mista[i]] = v; });
        const hledany = nahodne(vybrane);
        const g = mrizka(polozky, sl);
        const bunky = [...g.querySelectorAll('.cell')];
        bunky.forEach(c => { c.disabled = true; });
        ctx.pokyn('Zapamatuj si, kde co je', 'Zapamatuj si, kde který obrázek je.');
        ctx.stage.appendChild(g);
        ctx.pozdeji(() => {
          bunky.forEach(c => { c.classList.add('cover'); c.classList.remove('empty'); c.disabled = false; });
          ctx.stage.prepend(el(`<div class="show">${hledany.e}</div>`));
          ctx.pokyn('Kde je ' + hledany.w + '?', 'Najdi, kde je ' + hledany.w + '.');
          let otacim = false;
          bunky.forEach(c => c.addEventListener('click', () => {
            if (otacim || !c.classList.contains('cover')) return;
            c.classList.remove('cover');
            if (c.dataset.w === hledany.w) {
              ctx.spravne(c);
              ctx.pozdeji(() => bunky.forEach(b => b.classList.remove('cover')), 300);
            } else {
              otacim = true;
              ctx.spatne(c, 'Tady to nebylo. Zkus jiné místo.');
              ctx.pozdeji(() => { c.classList.add('cover'); otacim = false; }, 1100);
            }
          }));
        }, 3000 + pocet * 800);
      }
    },
    {
      id: 'slysel', nazev: 'Slyšel jsi?', emoji: '👂', popis: 'Poslouchej slova a pak najdi obrázky.',
      uloha(ctx) {
        const [n, moznosti] = [[2, 4], [3, 6], [4, 8]][ctx.uroven - 1];
        const slova = vyber(OBRAZKY, n);
        const vse = zamichej([...slova, ...vyber(OBRAZKY.filter(o => !slova.includes(o)), moznosti - n)]);
        const najdi = () => {
          ctx.stage.innerHTML = '';
          const row = el('<div class="row"></div>');
          let nalezeno = 0;
          vse.forEach(o => {
            const b = tlacitko(o.e, () => {
              if (b.classList.contains('ok')) return;
              if (slova.includes(o)) {
                nalezeno++;
                if (nalezeno === n) ctx.spravne(b);
                else { ctx.krok(b); b.disabled = true; }
              } else ctx.spatne(b, 'To jsem neřekla. Zkus jiný.');
            });
            row.appendChild(b);
          });
          ctx.stage.appendChild(row);
          ctx.pokyn('Ťukni na to, co jsi slyšel', 'Ťukni na všechny obrázky, které jsem řekla.');
        };
        ctx.stage.appendChild(el('<div class="show">👂</div>'));
        if (Hlas.muze()) {
          ctx.pokyn('Poslouchej…', 'Poslouchej pozorně.', () => {
            ctx.pozdeji(() => ctx.rekni(slova.map(s => s.w).join('. … ') + '.', () => ctx.pozdeji(najdi, 500)), 400);
          });
        } else {
          // Bez hlasu: obrázky se ukážou postupně jeden po druhém
          ctx.pokyn('Dívej se pozorně…');
          slova.forEach((s, i) => ctx.pozdeji(() => {
            ctx.stage.innerHTML = '';
            ctx.stage.appendChild(el(`<div class="show">${s.e}</div>`));
          }, 800 + i * 1400));
          ctx.pozdeji(najdi, 800 + n * 1400);
        }
      }
    }
  ]
});
