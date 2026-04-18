// ═══════════════════════════════════════════════════════════════════════════
// teach.js — učební režim (vysvětluje základy hodin)
// ═══════════════════════════════════════════════════════════════════════════

const Teach = {
  currentStep: 0,

  // Pole karet — každá má render funkci, která dostane kontejner
  CARDS: [

    // ─── 1. Úvod ────────────────────────────────────────────────────────
    {
      render(card) {
        card.innerHTML = '';
        card.appendChild(el('div', 'teach-emoji-big', '👋'));
        card.appendChild(el('div', 'teach-heading', 'Ahoj! Naučím tě poznávat hodiny.'));
        card.appendChild(el('div', 'teach-text',
          'Ukážu ti, jak fungují hodiny, proč mají dvě ručičky a jak zjistit, kolik je hodin.'));
        card.appendChild(el('div', 'teach-text',
          'Klikej na "Další ➜" a pojďme začít!'));
      }
    },

    // ─── 2. Den má 24 hodin ─────────────────────────────────────────────
    {
      render(card) {
        card.innerHTML = '';
        card.appendChild(el('div', 'teach-emoji-big', '🌞 🌙'));
        card.appendChild(el('div', 'teach-heading', 'Den má 24 hodin'));
        card.appendChild(el('div', 'teach-text',
          'Když zítra ráno vstaneš, uběhne od dnešního rána přesně <strong>24 hodin</strong>. ' +
          'Hodiny ukazují čas — díky nim víš, kdy je svačina, kdy škola a kdy jít spát.', true));
        const hl = el('div', 'teach-highlight');
        hl.innerHTML = '🌞 12 hodin je <strong>den</strong> (světlo)<br>🌙 12 hodin je <strong>noc</strong> (tma)';
        card.appendChild(hl);
      }
    },

    // ─── 3. Dopo + odpo ─────────────────────────────────────────────────
    {
      render(card) {
        card.innerHTML = '';
        card.appendChild(el('div', 'teach-emoji-big', '🌓'));
        card.appendChild(el('div', 'teach-heading', 'Dopoledne a odpoledne'));
        card.appendChild(el('div', 'teach-text',
          'Den se dělí na <strong>12 hodin dopoledne</strong> a <strong>12 hodin odpoledne</strong>. ' +
          'Dohromady je to 24 hodin.', true));
        const hl = el('div', 'teach-highlight');
        hl.innerHTML = '<strong>Poledne</strong> = 12:00 (v půlce dne) 🍽️<br><strong>Půlnoc</strong> = 24:00 (spíme) 💤';
        card.appendChild(hl);
        card.appendChild(el('div', 'teach-text',
          'Proto když řekneš „ve 4 odpoledne", znamená to <strong>16 hodin</strong> (12 + 4).', true));
      }
    },

    // ─── 4. Hodina má 60 minut ──────────────────────────────────────────
    {
      render(card) {
        card.innerHTML = '';
        card.appendChild(el('div', 'teach-emoji-big', '⏱️'));
        card.appendChild(el('div', 'teach-heading', 'Hodina má 60 minut'));
        card.appendChild(el('div', 'teach-text',
          'Jedna hodina je dlouhá <strong>60 minut</strong>. Když uběhne 60 minut, je to přesně jedna celá hodina.', true));
        const hl = el('div', 'teach-highlight');
        hl.innerHTML = '60 minut = 1 hodina ⏰<br>120 minut = 2 hodiny<br>180 minut = 3 hodiny';
        card.appendChild(hl);
      }
    },

    // ─── 5. Analogové vs. digitální ─────────────────────────────────────
    {
      render(card) {
        card.innerHTML = '';
        card.appendChild(el('div', 'teach-heading', 'Dva druhy hodin'));
        const row = el('div', 'teach-compare');
        // Analogové
        const col1 = el('div', 'teach-mini-clock');
        col1.appendChild(makeSmallClock(3, 0));
        col1.appendChild(el('div', 'label', 'Analogové'));
        row.appendChild(col1);
        row.appendChild(el('div', 'vs', '⚖️'));
        // Digitální
        const col2 = el('div', 'teach-mini-clock');
        const dig = el('div', 'digital-display', '03:00');
        dig.style.fontSize = '28px';
        dig.style.padding = '16px 18px';
        col2.appendChild(dig);
        col2.appendChild(el('div', 'label', 'Digitální'));
        row.appendChild(col2);
        card.appendChild(row);
        card.appendChild(el('div', 'teach-text',
          '<strong>Analogové</strong> hodiny mají ručičky. ' +
          '<strong>Digitální</strong> ukazují čas jako čísla.', true));
        card.appendChild(el('div', 'teach-text',
          'Ty obě ukazují <strong>3 hodiny</strong>! Naučíme se číst obojí.', true));
      }
    },

    // ─── 6. Krátká = hodinová ───────────────────────────────────────────
    {
      render(card) {
        card.innerHTML = '';
        card.appendChild(el('div', 'teach-heading', 'Krátká ručička = hodinová'));
        const clock = makeTeachClock(5, 0, 'hour');
        card.appendChild(clock);
        card.appendChild(el('div', 'teach-text',
          '<strong>Krátká tlustá ručička</strong> (zlatá) ukazuje <strong>hodinu</strong>. ' +
          'Tady ukazuje na číslo <strong>5</strong>.', true));
        const hl = el('div', 'teach-highlight');
        hl.innerHTML = 'Je tedy <strong>5 hodin</strong> ✨';
        card.appendChild(hl);
      }
    },

    // ─── 7. Dlouhá = minutová ───────────────────────────────────────────
    {
      render(card) {
        card.innerHTML = '';
        card.appendChild(el('div', 'teach-heading', 'Dlouhá ručička = minutová'));
        const clock = makeTeachClock(5, 20, 'minute');
        card.appendChild(clock);
        card.appendChild(el('div', 'teach-text',
          '<strong>Dlouhá tenká ručička</strong> (oranžová) ukazuje <strong>minuty</strong>.', true));
        card.appendChild(el('div', 'teach-text',
          'Minuty čteš tak, že <strong>číslo na hodinách × 5</strong>. Tady ukazuje na 4 → <strong>4 × 5 = 20 minut</strong>.', true));
        const hl = el('div', 'teach-highlight');
        hl.innerHTML = 'Spolu ukazují: <strong>5:20</strong> ⏰';
        card.appendChild(hl);
      }
    },

    // ─── 8. Celá hodina ─────────────────────────────────────────────────
    {
      render(card) {
        card.innerHTML = '';
        card.appendChild(el('div', 'teach-heading', '🕐 Celá hodina'));
        const row = el('div', 'teach-compare');
        const c1 = el('div', 'teach-mini-clock');
        c1.appendChild(makeSmallClock(8, 0));
        c1.appendChild(el('div', 'label', '8:00'));
        row.appendChild(c1);
        card.appendChild(row);
        card.appendChild(el('div', 'teach-text',
          'Když <strong>dlouhá minutová ručička</strong> ukazuje na <strong>12</strong>, je <strong>celá hodina</strong>.', true));
        card.appendChild(el('div', 'teach-text',
          'Říkáme třeba: „Je <strong>8 hodin</strong>."', true));
      }
    },

    // ─── 9. Půl ─────────────────────────────────────────────────────────
    {
      render(card) {
        card.innerHTML = '';
        card.appendChild(el('div', 'teach-heading', '🎯 Půl hodiny'));
        const row = el('div', 'teach-compare');
        const c1 = el('div', 'teach-mini-clock');
        c1.appendChild(makeSmallClock(3, 30));
        c1.appendChild(el('div', 'label', '3:30'));
        row.appendChild(c1);
        card.appendChild(row);
        card.appendChild(el('div', 'teach-text',
          'Když je minutová ručička <strong>dole na 6</strong>, je <strong>půl hodiny</strong> (30 minut).', true));
        const hl = el('div', 'teach-highlight');
        hl.innerHTML = 'Řekneš: „<strong>Je půl čtvrté</strong>" 🗣️<br><span style="font-size:13px;color:var(--text-sub)">(protože teď bude čtvrtá hodina)</span>';
        card.appendChild(hl);
      }
    },

    // ─── 10. Čtvrt + třičtvrtě ─────────────────────────────────────────
    {
      render(card) {
        card.innerHTML = '';
        card.appendChild(el('div', 'teach-heading', 'Čtvrt a třičtvrtě'));
        const row = el('div', 'teach-compare');
        const c1 = el('div', 'teach-mini-clock');
        c1.appendChild(makeSmallClock(4, 15));
        c1.appendChild(el('div', 'label', 'čtvrt na 5'));
        row.appendChild(c1);
        const c2 = el('div', 'teach-mini-clock');
        c2.appendChild(makeSmallClock(4, 45));
        c2.appendChild(el('div', 'label', 'třičtvrtě na 5'));
        row.appendChild(c2);
        card.appendChild(row);
        const list = el('ul', 'teach-list');
        list.innerHTML =
          '<li><strong>Čtvrt</strong> = 15 minut (ručička na 3)</li>' +
          '<li><strong>Třičtvrtě</strong> = 45 minut (na 9)</li>';
        card.appendChild(list);
        card.appendChild(el('div', 'teach-text',
          'Čtvrt a třičtvrtě počítáme <strong>k další hodině</strong>.', true));
      }
    },

    // ─── 11. Teď to zkus! ───────────────────────────────────────────────
    {
      render(card) {
        card.innerHTML = '';
        card.appendChild(el('div', 'teach-emoji-big', '🎉'));
        card.appendChild(el('div', 'teach-heading', 'Teď to zkus!'));
        card.appendChild(el('div', 'teach-text',
          'Super, máš za sebou všechny základy! Teď si vyber <strong>úkol</strong> na menu a zkus si to.', true));
        card.appendChild(el('div', 'teach-text',
          'Tip: nejjednodušší jsou <strong>🕐 Přiřaď čas</strong> a <strong>🎯 Nastav ručičky</strong>.', true));
        const btn = el('button', 'btn-primary', 'Vybrat úkol ➜');
        btn.style.marginTop = '10px';
        btn.style.minWidth = '200px';
        btn.addEventListener('click', () => {
          Sound.click();
          App.showScreen('menu');
          Motivace.refreshUI();
        });
        card.appendChild(btn);
      }
    },

  ],

  start() {
    this.currentStep = 0;
    App.showScreen('teach');
    this.render();
  },

  next() {
    if (this.currentStep < this.CARDS.length - 1) {
      this.currentStep++;
      Sound.click();
      this.render();
    }
  },

  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
      Sound.click();
      this.render();
    }
  },

  render() {
    const card = document.getElementById('teach-card');
    if (!card) return;
    this.CARDS[this.currentStep].render(card);

    // Counter + progress bar
    const total = this.CARDS.length;
    const step = this.currentStep + 1;
    document.getElementById('teach-counter').textContent = `${step} / ${total}`;
    const fill = document.getElementById('teach-progress');
    if (fill) fill.style.width = (step / total * 100) + '%';

    // Disable/enable tlačítka
    const prevBtn = document.getElementById('btn-teach-prev');
    const nextBtn = document.getElementById('btn-teach-next');
    prevBtn.disabled = this.currentStep === 0;
    if (this.currentStep === this.CARDS.length - 1) {
      nextBtn.disabled = true;
      nextBtn.style.opacity = '0.3';
    } else {
      nextBtn.disabled = false;
      nextBtn.style.opacity = '1';
    }

    window.scrollTo(0, 0);
  },
};

// Helper: menší hodiny (pro karty)
function makeSmallClock(h, m) {
  const svg = Clock.create({ hour: h, minute: m, interactive: false });
  svg.style.width = '120px';
  svg.style.height = '120px';
  return svg;
}

// Helper: hodiny s highlight ručičky
function makeTeachClock(h, m, highlight) {
  const svg = Clock.create({ hour: h, minute: m, interactive: false });
  svg.style.width = '200px';
  svg.style.height = '200px';
  // Zvýraznění příslušné ručičky (pulzující záře)
  if (highlight === 'hour') {
    const hand = svg.querySelector('.hand-hour');
    if (hand) {
      hand.style.strokeWidth = '9';
      hand.style.filter = 'drop-shadow(0 0 8px #f4c842)';
    }
    const other = svg.querySelector('.hand-minute');
    if (other) other.style.opacity = '0.35';
  } else if (highlight === 'minute') {
    const hand = svg.querySelector('.hand-minute');
    if (hand) {
      hand.style.strokeWidth = '6';
      hand.style.filter = 'drop-shadow(0 0 8px #ff8a65)';
    }
    const other = svg.querySelector('.hand-hour');
    if (other) other.style.opacity = '0.35';
  }
  return svg;
}

// Helper (podobný el() v games.js, ale zde lokální s podporou innerHTML)
// Přepíšeme `el` jen uvnitř Teach — ale globální `el` existuje v games.js.
// Abychom se vyhnuli konfliktu, použiji lokální funkci.
(function() {
  const originalEl = window.el;
  window.el = function(tag, cls, text, useHTML) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) {
      if (useHTML) e.innerHTML = text;
      else e.textContent = text;
    }
    return e;
  };
})();
