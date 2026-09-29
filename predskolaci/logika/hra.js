// ─── Přemýšlej — co nepatří, co bude dál, stíny, příběhy ────────────────────

const KATEGORIE = {
  ovoce: { mezi: 'ovoce', v: [['🍎', 'jablko'], ['🍐', 'hruška'], ['🍌', 'banán'], ['🍇', 'hroznové víno'], ['🍓', 'jahoda'], ['🍒', 'třešně'], ['🍑', 'broskev'], ['🍍', 'ananas']] },
  zelenina: { mezi: 'zeleninu', v: [['🥕', 'mrkev'], ['🥦', 'brokolice'], ['🌽', 'kukuřice'], ['🥒', 'okurka'], ['🍅', 'rajče'], ['🧅', 'cibule'], ['🥔', 'brambora']] },
  zvirata: { mezi: 'zvířata', v: [['🐶', 'pes'], ['🐱', 'kočka'], ['🐭', 'myš'], ['🐰', 'zajíc'], ['🐻', 'medvěd'], ['🐷', 'prase'], ['🐮', 'kráva'], ['🐸', 'žába'], ['🦁', 'lev'], ['🐘', 'slon']] },
  doprava: { mezi: 'dopravní prostředky', v: [['🚗', 'auto'], ['🚌', 'autobus'], ['🚂', 'vlak'], ['✈️', 'letadlo'], ['🚲', 'kolo'], ['🚜', 'traktor'], ['🚀', 'raketa'], ['⛵', 'loďka']] },
  obleceni: { mezi: 'oblečení', v: [['👕', 'tričko'], ['👖', 'kalhoty'], ['🧦', 'ponožky'], ['🧢', 'čepice'], ['👗', 'šaty'], ['🧤', 'rukavice'], ['👟', 'boty'], ['🧣', 'šála']] },
  hudba: { mezi: 'hudební nástroje', v: [['🎸', 'kytara'], ['🥁', 'buben'], ['🎺', 'trubka'], ['🎻', 'housle'], ['🎹', 'klavír']] },
  sladkosti: { mezi: 'sladkosti', v: [['🍭', 'lízátko'], ['🍫', 'čokoláda'], ['🍩', 'kobliha'], ['🍪', 'sušenka'], ['🍰', 'dort'], ['🍬', 'bonbon'], ['🍦', 'zmrzlina']] }
};
// Dvojice podobných skupin — pro nejtěžší úroveň
const PODOBNE_SKUPINY = [['ovoce', 'zelenina'], ['ovoce', 'sladkosti'], ['zelenina', 'sladkosti'], ['obleceni', 'hudba']];

const SADY = [
  ['🔴', '🔵', '🟢', '🟡', '🟣'],
  ['🍎', '🍌', '🍇', '🍐'],
  ['🐶', '🐱', '🐭', '🐰'],
  ['⭐', '🌙', '☀️', '☁️'],
  ['🚗', '🚂', '✈️', '🚲']
];
const VZORY = [['AB'], ['AAB', 'ABB', 'ABC'], ['AABB', 'ABAC', 'ABCB']];

const PRIBEHY = [
  { v: ['🥚', '🐣', '🐥', '🐔'], popis: 'Z vajíčka se vylíhne kuřátko a vyroste z něj slepička.' },
  { v: ['🌰', '🌱', '🌳'], popis: 'Ze žaludu vyroste klíček a z klíčku strom.' },
  { v: ['👶', '🧒', '🧑', '🧓'], popis: 'Miminko roste, až je z něj dědeček.' },
  { v: ['☁️', '🌧️', '🌈'], popis: 'Přijde mrak, prší a pak vyjde duha.' },
  { v: ['🛏️', '🥣', '🎒', '🏫'], popis: 'Ráno vstanu, nasnídám se, vezmu batoh a jdu do školky.' },
  { v: ['🌑', '🌓', '🌕'], popis: 'Měsíc roste, až je úplněk.' },
  { v: ['🌨️', '⛄', '☀️', '💧'], popis: 'Napadne sníh, postavíme sněhuláka, vysvitne sluníčko a sněhulák roztaje.' },
  { v: ['🥚', '🐛', '🦋'], popis: 'Z vajíčka je housenka a z housenky motýl.' },
  { v: ['🌸', '🍏', '🍎'], popis: 'Strom rozkvete, vyroste zelené jablíčko a pak dozraje.' },
  { v: ['🌅', '☀️', '🌙'], popis: 'Ráno, poledne a noc.' }
];

function velke(t) { return t.charAt(0).toUpperCase() + t.slice(1); }

Zaklad.start({
  id: 'logika',
  nazev: 'Přemýšlej',
  emoji: '🧩',
  popis: 'Hádanky pro chytré hlavičky.',
  rezimy: [
    {
      id: 'nepatri', nazev: 'Co nepatří?', emoji: '🙅', popis: 'Jeden obrázek je jiný než ostatní.',
      uloha(ctx) {
        const u = ctx.uroven;
        let [k1, k2] = u === 3 ? zamichej(nahodne(PODOBNE_SKUPINY)) : vyber(Object.keys(KATEGORIE), 2);
        const skupina = KATEGORIE[k1];
        const stejne = vyber(skupina.v, u === 3 ? 4 : 3);
        const jine = nahodne(KATEGORIE[k2].v);
        const row = el('<div class="row"></div>');
        zamichej([...stejne, jine]).forEach(o => row.appendChild(tlacitko(o[0], b => {
          if (o === jine) ctx.spravne(b, `${velke(jine[1])} nepatří mezi ${skupina.mezi}.`);
          else ctx.spatne(b, `${velke(o[1])} sem patří. Zkus jiný.`);
        })));
        ctx.stage.appendChild(row);
        ctx.pokyn('Co sem nepatří?', 'Jeden obrázek sem nepatří. Který?');
      }
    },
    {
      id: 'dal', nazev: 'Co bude dál?', emoji: '🔁', popis: 'Doplň řadu obrázků.',
      uloha(ctx) {
        const vzor = nahodne(VZORY[ctx.uroven - 1]);
        const pismena = [...new Set(vzor)];
        const znaky = vyber(nahodne(SADY), pismena.length);
        const mapa = Object.fromEntries(pismena.map((p, i) => [p, znaky[i]]));
        const delka = Math.max(6, vzor.length * 2) + cislo(0, vzor.length - 1);
        const rada = Array.from({ length: delka }, (_, i) => mapa[vzor[i % vzor.length]]);
        const odpoved = mapa[vzor[delka % vzor.length]];
        const radaEl = el('<div class="pattern"></div>');
        rada.forEach(z => radaEl.appendChild(el(`<span>${z}</span>`)));
        const otaznik = el('<span class="q">❓</span>');
        radaEl.appendChild(otaznik);
        ctx.stage.appendChild(radaEl);
        // Možnosti: správná odpověď + další znaky ze stejné sady
        const sada = SADY.find(s => s.includes(odpoved));
        const moznosti = zamichej([odpoved, ...vyber(sada.filter(z => z !== odpoved), 2)]);
        const row = el('<div class="row"></div>');
        moznosti.forEach(z => row.appendChild(tlacitko(z, b => {
          if (z === odpoved) { otaznik.textContent = z; otaznik.classList.remove('q'); ctx.spravne(b); }
          else ctx.spatne(b);
        })));
        ctx.stage.appendChild(row);
        ctx.pokyn('Co bude dál?', 'Podívej se na řadu. Co přijde na místo otazníku?');
      }
    },
    {
      id: 'stin', nazev: 'Najdi stín', emoji: '🌑', popis: 'Který stín patří k obrázku?',
      uloha(ctx) {
        const u = ctx.uroven;
        let moznosti;
        if (u === 3) moznosti = vyber(KATEGORIE[nahodne(Object.keys(KATEGORIE))].v, 3);
        else moznosti = vyber(Object.keys(KATEGORIE), u + 1).map(k => nahodne(KATEGORIE[k].v));
        const cil = nahodne(moznosti);
        ctx.stage.appendChild(el(`<div class="show">${cil[0]}</div>`));
        const row = el('<div class="row"></div>');
        moznosti.forEach(o => {
          const b = tlacitko(`<span class="shadow">${o[0]}</span>`, btn => {
            if (o === cil) { btn.firstElementChild.classList.remove('shadow'); ctx.spravne(btn); }
            else ctx.spatne(btn);
          });
          row.appendChild(b);
        });
        ctx.stage.appendChild(row);
        ctx.pokyn('Najdi stín', `Který stín patří k obrázku? Je to ${cil[1]}.`);
      }
    },
    {
      id: 'pribeh', nazev: 'Seřaď příběh', emoji: '📖', popis: 'Co bylo první, co potom?',
      uloha(ctx) {
        const u = ctx.uroven;
        const pribeh = nahodne(PRIBEHY.filter(p => u === 1 ? p.v.length === 3 : u === 3 ? p.v.length === 4 : true));
        let zamichane;
        do { zamichane = zamichej(pribeh.v); } while (zamichane.join() === pribeh.v.join());
        const sloty = el('<div class="row"></div>');
        pribeh.v.forEach((_, i) => sloty.appendChild(el(`<div class="slot"><b>${i + 1}</b></div>`)));
        const row = el('<div class="row"></div>');
        let dalsi = 0;
        zamichane.forEach(z => {
          const b = tlacitko(z, btn => {
            if (z !== pribeh.v[dalsi]) { ctx.spatne(btn, dalsi === 0 ? 'Co bylo úplně první?' : 'Co bylo potom?'); return; }
            const slot = sloty.children[dalsi];
            slot.classList.add('filled');
            slot.appendChild(document.createTextNode(z));
            btn.classList.add('dim');
            btn.disabled = true;
            dalsi++;
            if (dalsi === pribeh.v.length) ctx.spravne(null, pribeh.popis);
            else Zvuk.klik();
          });
          row.appendChild(b);
        });
        ctx.stage.append(sloty, el('<div class="hint">Ťukej na obrázky postupně od prvního</div>'), row);
        ctx.pokyn('Seřaď příběh', 'Seřaď obrázky, jak šly po sobě. Co bylo první?');
      }
    }
  ]
});
