// ═══════════════════════════════════════════════════════════════════════════
// games.js — 5 slovních mini-her (Slovní ostrov)
// ═══════════════════════════════════════════════════════════════════════════

// Hvězdičky
function spawnStars(container) {
  const rect = container.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let i = 0; i < 9; i++) {
    const star = document.createElement('div');
    star.className = 'star-particle';
    star.textContent = i % 3 === 0 ? '✨' : '⭐';
    const angle = (i / 9) * 2 * Math.PI;
    const dist = 60 + Math.random() * 70;
    star.style.left = cx + 'px';
    star.style.top = cy + 'px';
    star.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    star.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 950);
  }
}

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function el(tag, cls, text, useHTML) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) {
    if (useHTML) e.innerHTML = text;
    else e.textContent = text;
  }
  return e;
}

const Games = {
  TYPES: ['compose', 'quick', 'findword', 'fill', 'fix'],

  generate(type, index = 0) {
    if (type === 'mix') type = pick(this.TYPES);
    switch (type) {
      case 'compose':  return this._genCompose(index);
      case 'quick':    return this._genQuick(index);
      case 'findword': return this._genFindWord(index);
      case 'fill':     return this._genFill(index);
      case 'fix':      return this._genFix();
    }
  },

  // ─── 🧩 Slož slovo ────────────────────────────────────────────────────
  _genCompose(index) {
    // Postupná obtížnost — delší slova, 2. třída zvládne 7–9 písmen
    let pool;
    if (index === 0) pool = WORDS_WITH_EMOJI.filter(w => w.word.length >= 5 && w.word.length <= 6);
    else if (index === 1) pool = WORDS_WITH_EMOJI.filter(w => w.word.length === 6 || w.word.length === 7);
    else if (index <= 3) pool = WORDS_WITH_EMOJI.filter(w => w.word.length >= 7 && w.word.length <= 8);
    else pool = WORDS_WITH_EMOJI.filter(w => w.word.length >= 8);
    if (pool.length === 0) pool = WORDS_WITH_EMOJI;
    const item = pick(pool);
    const letters = item.word.split('');
    // Distraktory: 0 → 1 → 2 (u 8+ písmenných slov stačí 1)
    const distractorCount = index < 1 ? 0 : (item.word.length >= 8 ? 1 : 2);
    const alphabet = 'abcdefghijklmnopqrstuvwxyzáéíóúůýěščřžťď'.split('');
    const avail = alphabet.filter(c => !letters.includes(c));
    const distractors = shuffle(avail).slice(0, distractorCount);
    const shuffled = shuffle([...letters, ...distractors]);

    return {
      type: 'compose',
      title: '🧩 Slož slovo',
      key: `compose:${item.word}`,
      render: (area, onAnswer) => {
        area.innerHTML = '';
        area.appendChild(el('div', 'q-instr', 'Slož slovo z písmen:'));
        area.appendChild(el('div', 'compose-emoji', item.emoji));

        // Sloty pro písmena slova
        const slotsRow = el('div', 'compose-slots');
        const slots = [];
        for (let i = 0; i < letters.length; i++) {
          const slot = el('div', 'compose-slot');
          slot.dataset.idx = i;
          slot.addEventListener('click', () => {
            if (!slot.dataset.letter) return;
            // Vrátit písmeno zpět do zásoby
            const letterBtn = poolRow.querySelector(`[data-pool-idx="${slot.dataset.poolIdx}"]`);
            if (letterBtn) letterBtn.classList.remove('used');
            slot.textContent = '';
            delete slot.dataset.letter;
            delete slot.dataset.poolIdx;
          });
          slots.push(slot);
          slotsRow.appendChild(slot);
        }
        area.appendChild(slotsRow);

        // Zásoba písmen
        const poolRow = el('div', 'compose-pool');
        shuffled.forEach((ch, idx) => {
          const b = el('button', 'compose-letter', ch);
          b.dataset.poolIdx = idx;
          b.addEventListener('click', () => {
            if (b.classList.contains('used')) return;
            // Najít první prázdný slot
            const emptySlot = slots.find(s => !s.dataset.letter);
            if (!emptySlot) return;
            emptySlot.textContent = ch;
            emptySlot.dataset.letter = ch;
            emptySlot.dataset.poolIdx = idx;
            b.classList.add('used');
            Sound.tick();
            // Pokud jsou všechna slots zaplněná, automaticky zkusit validaci
            if (slots.every(s => s.dataset.letter)) {
              setTimeout(() => checkAnswer(), 250);
            }
          });
          poolRow.appendChild(b);
        });
        area.appendChild(poolRow);

        const hint = el('div', 'compose-hint', 'Tip: Klikni na písmeno a přesune se do slotu. Klik na slot ho vrátí zpět.');
        area.appendChild(hint);

        function checkAnswer() {
          const attempt = slots.map(s => s.dataset.letter || '').join('');
          const correct = attempt === item.word;
          onAnswer(correct, null, area);
        }
      },
      autoAdvance: true,
    };
  },

  // ─── ⚡ Rychlé čtení ─────────────────────────────────────────────────
  _genQuick(index = 0) {
    // Progresivní obtížnost: kratší → delší slova
    let pool;
    if (index === 0) pool = QUICK_READ.filter(w => w.word.length <= 5);
    else if (index <= 2) pool = QUICK_READ.filter(w => w.word.length >= 5 && w.word.length <= 7);
    else pool = QUICK_READ.filter(w => w.word.length >= 7);
    if (pool.length === 0) pool = QUICK_READ;
    const item = pick(pool);
    // Délka blikání — delší slova = víc času
    const flashMs = Math.min(1600, 900 + item.word.length * 80);
    const options = shuffle([item.word, ...item.distractors]);

    return {
      type: 'quick',
      title: '⚡ Rychlé čtení',
      key: `quick:${item.word}`,
      render: (area, onAnswer) => {
        area.innerHTML = '';
        area.appendChild(el('div', 'q-instr', 'Připrav se — slovo se krátce ukáže a pak zmizí.'));

        const startBtn = el('button', 'btn-primary', '▶️ Ukaž slovo');
        startBtn.style.minWidth = '180px';
        area.appendChild(startBtn);

        const flashBox = el('div', 'quick-flash');
        flashBox.style.visibility = 'hidden';
        area.appendChild(flashBox);

        const opts = el('div', 'options-grid cols2 quick-opts');
        opts.style.visibility = 'hidden';
        options.forEach(opt => {
          const b = el('button', 'opt-btn word-btn', opt);
          b.addEventListener('click', () => onAnswer(opt === item.word, b, opts));
          opts.appendChild(b);
        });
        area.appendChild(opts);

        let shown = false;
        startBtn.addEventListener('click', () => {
          if (shown) return;
          shown = true;
          startBtn.style.display = 'none';
          flashBox.textContent = item.word;
          flashBox.style.visibility = 'visible';
          flashBox.classList.add('show');
          Sound.tick();
          setTimeout(() => {
            flashBox.classList.remove('show');
            flashBox.classList.add('hide');
            setTimeout(() => {
              flashBox.style.visibility = 'hidden';
              flashBox.textContent = '';
              opts.style.visibility = 'visible';
            }, 250);
          }, flashMs);
        });
      }
    };
  },

  // ─── 🔍 Najdi slovo v mřížce ─────────────────────────────────────────
  _genFindWord(index) {
    // Progresivní: 3–4 → 4–5 písmen (5×5 mřížka má max 5)
    let pool;
    if (index === 0) pool = WORDS_FOR_GRID.filter(w => w.length <= 4);
    else pool = WORDS_FOR_GRID.filter(w => w.length >= 4 && w.length <= 5);
    if (pool.length === 0) pool = WORDS_FOR_GRID.filter(w => w.length <= 5);
    const target = pick(pool);
    const gridData = generateGrid(target, 5);

    return {
      type: 'findword',
      title: '🔍 Najdi slovo',
      key: `findword:${target}`,
      render: (area, onAnswer) => {
        area.innerHTML = '';
        area.appendChild(el('div', 'q-instr', 'Najdi toto slovo v mřížce:'));
        const big = el('div', 'findword-target', target.toUpperCase());
        area.appendChild(big);
        area.appendChild(el('div', 'q-instr', 'Klikni na první a pak na poslední písmeno.'));

        const grid = el('div', 'findword-grid');
        const cells = [];
        for (let r = 0; r < 5; r++) {
          for (let c = 0; c < 5; c++) {
            const cell = el('button', 'findword-cell', gridData.grid[r][c]);
            cell.dataset.r = r;
            cell.dataset.c = c;
            cells.push(cell);
            grid.appendChild(cell);
          }
        }
        area.appendChild(grid);

        let firstCell = null;
        cells.forEach(cell => {
          cell.addEventListener('click', () => {
            if (cell.classList.contains('found')) return;
            if (!firstCell) {
              firstCell = cell;
              cell.classList.add('selecting');
              Sound.tick();
            } else {
              // Pokusit se vybrat linku od firstCell po cell
              const r1 = parseInt(firstCell.dataset.r);
              const c1 = parseInt(firstCell.dataset.c);
              const r2 = parseInt(cell.dataset.r);
              const c2 = parseInt(cell.dataset.c);

              const path = linePath(r1, c1, r2, c2);
              if (!path) {
                // Neplatný tah (není na přímce)
                firstCell.classList.remove('selecting');
                firstCell = null;
                Sound.wrong();
                return;
              }

              // Přečti písmena v cestě
              const letters = path.map(p => gridData.grid[p.r][p.c]).join('');
              if (letters === target || letters === target.split('').reverse().join('')) {
                // Výhra
                path.forEach(p => {
                  const c = cells.find(x =>
                    parseInt(x.dataset.r) === p.r && parseInt(x.dataset.c) === p.c);
                  if (c) c.classList.add('found');
                });
                firstCell.classList.remove('selecting');
                firstCell = null;
                setTimeout(() => onAnswer(true, null, grid), 400);
              } else {
                // Špatně
                firstCell.classList.remove('selecting');
                cell.classList.add('wrong-flash');
                setTimeout(() => cell.classList.remove('wrong-flash'), 500);
                firstCell = null;
                Sound.wrong();
              }
            }
          });
        });

        // Pomocná funkce: cesta mezi dvěma buňkami (vodorovná, svislá nebo diagonální)
        function linePath(r1, c1, r2, c2) {
          const dr = r2 - r1;
          const dc = c2 - c1;
          const adr = Math.abs(dr);
          const adc = Math.abs(dc);
          // Jen vodorovná (dr=0) nebo svislá (dc=0)
          if (dr !== 0 && dc !== 0) return null;
          const steps = Math.max(adr, adc);
          if (steps === 0) return null;
          const sr = dr === 0 ? 0 : dr / adr;
          const sc = dc === 0 ? 0 : dc / adc;
          const path = [];
          for (let i = 0; i <= steps; i++) {
            path.push({ r: r1 + sr * i, c: c1 + sc * i });
          }
          return path;
        }
      },
      autoAdvance: true,
    };
  },

  // ─── ✏️ Doplň písmeno (bez obrázku) ──────────────────────────────────
  _genFill(index = 0) {
    // Progresivní obtížnost — delší slova
    let pool;
    if (index === 0) pool = FILL_LETTER.filter(w => w.word.length <= 5);
    else if (index <= 2) pool = FILL_LETTER.filter(w => w.word.length >= 6 && w.word.length <= 7);
    else pool = FILL_LETTER.filter(w => w.word.length >= 7);
    if (pool.length === 0) pool = FILL_LETTER;
    const item = pick(pool);
    const options = shuffle([item.correct, ...item.distractors]);

    return {
      type: 'fill',
      title: '✏️ Doplň písmeno',
      key: `fill:${item.word}:${item.blank}`,
      render: (area, onAnswer) => {
        area.innerHTML = '';
        area.appendChild(el('div', 'q-instr', 'Jaké písmeno tu chybí?'));
        // Zobrazíme slovo s mezerou
        const wordBox = el('div', 'fill-word');
        for (let i = 0; i < item.word.length; i++) {
          if (i === item.blank) {
            const blank = el('span', 'fill-blank', '_');
            wordBox.appendChild(blank);
          } else {
            wordBox.appendChild(el('span', 'fill-letter', item.word[i]));
          }
        }
        area.appendChild(wordBox);

        const opts = el('div', 'options-grid');
        options.forEach(opt => {
          const b = el('button', 'opt-btn', opt);
          b.addEventListener('click', () => onAnswer(opt === item.correct, b, opts));
          opts.appendChild(b);
        });
        area.appendChild(opts);
      }
    };
  },

  // ─── 🔀 Oprav chybu ve větě ──────────────────────────────────────────
  _genFix() {
    const item = pick(FIX_SENTENCES);
    const options = shuffle([item.correct, ...item.distractors]);

    return {
      type: 'fix',
      title: '🔀 Oprav chybu',
      key: `fix:${item.words[item.wordIdx]}:${item.letterIdx}`,
      render: (area, onAnswer) => {
        area.innerHTML = '';
        area.appendChild(el('div', 'q-instr', 'Najdi písmeno, které je špatně. Klikni na něj.'));

        // Věta s klikatelnými písmeny
        const sentence = el('div', 'fix-sentence');
        const letterButtons = [];
        item.words.forEach((word, wIdx) => {
          const wordEl = el('span', 'fix-word');
          for (let i = 0; i < word.length; i++) {
            const ch = word[i];
            // Je to interpunkce?
            if (/[.,!?]/.test(ch)) {
              const span = el('span', 'fix-punct', ch);
              wordEl.appendChild(span);
              continue;
            }
            const letterBtn = el('span', 'fix-letter', ch);
            letterBtn.dataset.wIdx = wIdx;
            letterBtn.dataset.lIdx = i;
            letterButtons.push(letterBtn);
            wordEl.appendChild(letterBtn);
          }
          sentence.appendChild(wordEl);
          if (wIdx < item.words.length - 1) {
            sentence.appendChild(el('span', 'fix-space', ' '));
          }
        });
        area.appendChild(sentence);

        const step2Hint = el('div', 'q-instr');
        step2Hint.style.visibility = 'hidden';
        step2Hint.textContent = 'Teď vyber správné písmeno:';
        area.appendChild(step2Hint);

        const opts = el('div', 'options-grid');
        opts.style.visibility = 'hidden';
        options.forEach(opt => {
          const b = el('button', 'opt-btn', opt);
          b.addEventListener('click', () => {
            onAnswer(opt === item.correct, b, opts);
          });
          opts.appendChild(b);
        });
        area.appendChild(opts);

        // Klik na písmeno ve větě
        let resolved = false;
        letterButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            if (resolved) return;
            const wIdx = parseInt(btn.dataset.wIdx);
            const lIdx = parseInt(btn.dataset.lIdx);
            if (wIdx === item.wordIdx && lIdx === item.letterIdx) {
              // Správně — označit
              resolved = true;
              btn.classList.add('fix-found');
              Sound.tick();
              // Ukázat krok 2
              step2Hint.style.visibility = 'visible';
              opts.style.visibility = 'visible';
            } else {
              // Špatně
              btn.classList.add('fix-wrong');
              Sound.wrong();
              setTimeout(() => btn.classList.remove('fix-wrong'), 500);
            }
          });
        });
      }
    };
  },
};
