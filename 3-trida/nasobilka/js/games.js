// ═══════════════════════════════════════════════════════════════════════════
// games.js — Třeťákova násobilka (×5 až ×9, :5 až :9)
// ═══════════════════════════════════════════════════════════════════════════

function spawnStars(container) {
  const rect = container.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let i = 0; i < 9; i++) {
    const star = document.createElement('div');
    star.className = 'star-particle';
    star.textContent = i % 3 === 0 ? '💰' : '⭐';
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
  CISLA: [5, 6, 7, 8, 9],
  get TYPES() { return this.CISLA.flatMap(k => ['mul' + k, 'div' + k]); },
  get MIX_TYPES() { return this.TYPES; },

  // Typ úkolu je 'mulK' nebo 'divK' (K = 5 až 9)
  generate(type) {
    if (type === 'mix') type = pick(this.MIX_TYPES);
    const k = Number(type.slice(3));
    return type.startsWith('mul') ? this._genMul(k) : this._genDiv(k);
  },

  // Násobení: N × k (k = 5 až 9). N ∈ 1..10
  _genMul(k) {
    const n = rand(1, 10);
    const result = n * k;
    const expr = `${n} × ${k}`;
    const options = this._distractors(result, 3, k);

    return {
      type: 'mul' + k,
      key: `mul:${n}x${k}`,
      render: (area, onAnswer) => this._renderQ(area, onAnswer, expr, result, options),
    };
  },

  // Dělení: (n * k) ÷ k = n (výsledek ∈ 1..10)
  _genDiv(k) {
    const n = rand(1, 10);
    const dividend = n * k;
    const result = n;
    const expr = `${dividend} : ${k}`;
    const options = this._distractors(result, 3, 1);

    return {
      type: 'div' + k,
      key: `div:${dividend}/${k}`,
      render: (area, onAnswer) => this._renderQ(area, onAnswer, expr, result, options),
    };
  },

  // 3 distraktory k správnému výsledku
  // step = o kolik typicky posouvat sousední chyby (větší u násobení)
  _distractors(correct, n, step = 1) {
    const set = new Set([correct]);
    const out = [];
    // Typické chyby: ±step (zapomněl/přidal jednu skupinu), ±1, a náhodné
    const candidates = [
      correct + step, correct - step,
      correct + 1, correct - 1,
      correct + 2, correct - 2,
      correct + step * 2, correct - step * 2,
    ].filter(v => v >= 0 && v !== correct);
    for (const c of candidates) {
      if (out.length >= n) break;
      if (!set.has(c)) { set.add(c); out.push(c); }
    }
    // doplň náhodnými 1..50 pokud nestačí
    while (out.length < n) {
      const v = rand(1, Math.max(50, correct * 2));
      if (!set.has(v)) { set.add(v); out.push(v); }
    }
    return shuffle([correct, ...out]);
  },

  _renderQ(area, onAnswer, expr, correct, options) {
    area.innerHTML = '';
    area.appendChild(el('div', 'q-instr', 'Spočítej:'));
    const exprEl = el('div', 'math-expr');
    exprEl.innerHTML = `${expr} = <span class="qmark">?</span>`;
    area.appendChild(exprEl);
    const opts = el('div', 'options-grid');
    options.forEach(n => {
      const b = el('button', 'opt-btn', String(n));
      b.addEventListener('click', () => {
        b.blur();
        onAnswer(n === correct, b, opts, { expr, correct, chosen: n });
      });
      opts.appendChild(b);
    });
    area.appendChild(opts);
  },
};
