// ═══════════════════════════════════════════════════════════════════════════
// games.js — 6 typů mini-her o hodinách
// ═══════════════════════════════════════════════════════════════════════════

// Hvězdičky vyletí ze středu — stejný pattern jako ve svet-poznani
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

// ─── Pomocné utility ──────────────────────────────────────────────────────

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

// ─── Scénáře den/noc ──────────────────────────────────────────────────────

const DAY_NIGHT_SCENES = [
  // Ráno — jednoznačné ranní aktivity
  { emoji: '⏰', text: 'Zvoní ti budík a ty vstáváš do školy', correct: 'rano', hours: [6, 7] },
  { emoji: '🥣', text: 'Snídáš kaši, než jdeš do školy', correct: 'rano', hours: [7] },
  { emoji: '🎒', text: 'Přicházíš do školy, zvonek právě zvonil', correct: 'rano', hours: [8] },

  // Dopoledne — školní výuka
  { emoji: '📚', text: 'Máš třetí vyučovací hodinu — matematiku', correct: 'dopoledne', hours: [10, 11] },

  // Poledne — oběd
  { emoji: '🍝', text: 'Máš ve školní jídelně oběd', correct: 'poledne', hours: [12] },

  // Odpoledne — po škole
  { emoji: '🏠', text: 'Jsi už doma ze školy a svačíš', correct: 'odpoledne', hours: [13, 14] },
  { emoji: '🎨', text: 'Jsi na odpoledním kroužku kreslení', correct: 'odpoledne', hours: [15, 16] },

  // Večer — rodina + příprava na spaní
  { emoji: '🍲', text: 'Rodina sedí u společné večeře', correct: 'vecer', hours: [18] },
  { emoji: '🛁', text: 'Koupeš se — hned potom jdeš spát', correct: 'vecer', hours: [19, 20] },
  { emoji: '📖', text: 'Máš na sobě pyžamo a posloucháš pohádku před spaním', correct: 'vecer', hours: [20, 21] },

  // Noc — hluboká noc
  { emoji: '💤', text: 'Už dávno tvrdě spíš ve své posteli', correct: 'noc', hours: [23, 0, 1, 2, 3] },
  { emoji: '🌙', text: 'Venku je úplná tma a všichni v domě spí', correct: 'noc', hours: [0, 1, 2, 3] },
];

const DAY_PARTS = {
  rano: '🌅 Ráno',
  dopoledne: '☀️ Dopoledne',
  poledne: '🍽️ Poledne',
  odpoledne: '🌤️ Odpoledne',
  vecer: '🌆 Večer',
  noc: '🌙 Noc',
};

// Slovní popisy pro hru „Slovně"
function wordDescription(h, m) {
  // Preferujeme 12h formulace („čtvrt na 5" = 4:15)
  const next = ((h % 12) + 1) % 12 || 12;
  const cur = (h % 12) || 12;
  if (m === 0) return `Je ${cur} hodin (celá)`;
  if (m === 15) return `Je čtvrt na ${next}`;
  if (m === 30) return `Je půl ${genitiv(next)}`;
  if (m === 45) return `Je třičtvrtě na ${next}`;
  return null;
}

function genitiv(h) {
  const g = {
    1: 'první', 2: 'druhé', 3: 'třetí', 4: 'čtvrté', 5: 'páté', 6: 'šesté',
    7: 'sedmé', 8: 'osmé', 9: 'deváté', 10: 'desáté', 11: 'jedenácté', 12: 'dvanácté'
  };
  return g[h];
}

// ─── Generátory otázek ────────────────────────────────────────────────────
// Každá vrací objekt: { type, render(el, onAnswer), validate? }

const Games = {
  TYPES: ['match', 'set-hands', 'words', 'ampm', 'minutes', 'day-night'],

  // Generuje otázku daného typu (index = postupná obtížnost)
  generate(type, index = 0) {
    if (type === 'mix') type = pick(this.TYPES);
    switch (type) {
      case 'match': return this._genMatch(index);
      case 'set-hands': return this._genSetHands(index);
      case 'words': return this._genWords();
      case 'ampm': return this._genAmPm();
      case 'minutes': return this._genMinutes(index);
      case 'day-night': return this._genDayNight();
    }
  },

  // ─── Typ 1: Přiřaď čas (analog → digital) ────────────────────────────
  _genMatch(index) {
    // Postupná obtížnost: 0-2 celé, 3-4 půl, 5-7 čtvrt, 8+ po 5 min
    let h, m;
    if (index < 2) {
      h = rand(1, 12); m = 0;
    } else if (index < 4) {
      h = rand(1, 12); m = pick([0, 30]);
    } else if (index < 7) {
      h = rand(1, 12); m = pick([0, 15, 30, 45]);
    } else {
      h = rand(1, 12); m = rand(0, 11) * 5;
    }
    const correct = Clock.formatDigital(h, m);
    const distractors = this._distractors(h, m, 3).map(t => Clock.formatDigital(t.h, t.m));
    const options = shuffle([correct, ...distractors]);
    return {
      type: 'match',
      title: '🕐 Přiřaď čas',
      key: `match:${h}:${m}`,
      render: (area, onAnswer) => {
        area.innerHTML = '';
        const instr = el('div', 'q-instr', 'Kolik je hodin?');
        area.appendChild(instr);
        const svg = Clock.create({ hour: h, minute: m, interactive: false });
        area.appendChild(svg);
        const opts = el('div', 'options-grid');
        options.forEach(opt => {
          const b = el('button', 'opt-btn', opt);
          b.addEventListener('click', () => onAnswer(opt === correct, b, opts));
          opts.appendChild(b);
        });
        area.appendChild(opts);
      }
    };
  },

  _distractors(h, m, n) {
    const set = new Set([`${h}:${m}`]);
    const out = [];
    let tries = 0;
    while (out.length < n && tries < 40) {
      tries++;
      const dh = rand(1, 12);
      let dm;
      // Preferujeme distraktory stejné „kategorie"
      if (m === 0 || m === 30) dm = pick([0, 15, 30, 45]);
      else if (m === 15 || m === 45) dm = pick([15, 30, 45, 0]);
      else dm = rand(0, 11) * 5;
      const key = `${dh}:${dm}`;
      if (!set.has(key)) {
        set.add(key);
        out.push({ h: dh, m: dm });
      }
    }
    return out;
  },

  // ─── Typ 2: Nastav ručičky (drag) ─────────────────────────────────────
  _genSetHands(index) {
    let h, m;
    if (index < 2) { h = rand(1, 12); m = 0; }
    else if (index < 5) { h = rand(1, 12); m = pick([0, 15, 30, 45]); }
    else { h = rand(1, 12); m = rand(0, 11) * 5; }
    const target = Clock.formatDigital(h, m);
    return {
      type: 'set-hands',
      title: '🎯 Nastav ručičky',
      key: `set-hands:${h}:${m}`,
      render: (area, onAnswer) => {
        area.innerHTML = '';
        const instr = el('div', 'q-instr', 'Přetáhni ručičky na správný čas:');
        area.appendChild(instr);
        const task = el('div', 'q-task', target);
        area.appendChild(task);
        // Začínáme na 12:00, aby dítě samo posunulo
        const svg = Clock.create({ hour: 12, minute: 0, interactive: true });
        area.appendChild(svg);
        const hint = el('div', 'q-instr', '👆 Chyť zlatou nebo oranžovou ručičku a otoč ji');
        hint.style.fontSize = '12px';
        hint.style.marginTop = '-8px';
        area.appendChild(hint);
        const btn = el('button', 'btn-confirm', 'Hotovo ✓');
        btn.addEventListener('click', () => {
          const t = Clock.getTime(svg);
          // Tolerance 0 (musí trefit přesně díky snappingu)
          const ok = (t.hour % 12 === h % 12) && (t.minute === m);
          onAnswer(ok, btn, area);
        });
        area.appendChild(btn);
      }
    };
  },

  // ─── Typ 3: Slovně → čas ──────────────────────────────────────────────
  _genWords() {
    // Jen celé, čtvrt, půl, třičtvrtě (12h)
    const h = rand(1, 12);
    const m = pick([0, 15, 30, 45]);
    const desc = wordDescription(h, m);
    const correct = Clock.formatDigital(h, m);

    // Distraktory: pastičky
    const set = new Set([correct]);
    const out = [];
    const variants = [
      Clock.formatDigital(h, m === 0 ? 30 : 0),
      Clock.formatDigital((h % 12) + 1, m),
      Clock.formatDigital(h, m === 15 ? 45 : (m === 45 ? 15 : (m + 30) % 60)),
    ];
    variants.forEach(v => {
      if (!set.has(v) && out.length < 3) {
        set.add(v);
        out.push(v);
      }
    });
    while (out.length < 3) {
      const dh = rand(1, 12);
      const dm = pick([0, 15, 30, 45]);
      const v = Clock.formatDigital(dh, dm);
      if (!set.has(v)) { set.add(v); out.push(v); }
    }
    const options = shuffle([correct, ...out]);

    return {
      type: 'words',
      title: '💬 Slovně → čas',
      key: `words:${h}:${m}`,
      render: (area, onAnswer) => {
        area.innerHTML = '';
        const instr = el('div', 'q-instr', 'Jaký to je čas?');
        area.appendChild(instr);
        const task = el('div', 'q-task', desc);
        area.appendChild(task);
        const opts = el('div', 'options-grid');
        options.forEach(opt => {
          const b = el('button', 'opt-btn', opt);
          b.addEventListener('click', () => onAnswer(opt === correct, b, opts));
          opts.appendChild(b);
        });
        area.appendChild(opts);
      }
    };
  },

  // ─── Typ 4: Dopo/odpoledne (převod na 24h + orientace v rámci dne) ────
  _genAmPm() {
    const variant = pick(['toDigital', 'whenInDay']);

    if (variant === 'toDigital') {
      // „3 hodiny odpoledne" → 15:00 (dítě musí přičíst 12)
      const part = pick(['rano', 'dopoledne', 'odpoledne', 'vecer']);
      let hour12, hour24;
      if (part === 'rano') { hour12 = pick([6, 7, 8]); hour24 = hour12; }
      else if (part === 'dopoledne') { hour12 = pick([9, 10, 11]); hour24 = hour12; }
      else if (part === 'odpoledne') { hour12 = pick([1, 2, 3, 4, 5]); hour24 = hour12 + 12; }
      else { hour12 = pick([6, 7, 8, 9]); hour24 = hour12 + 12; }

      const partName = { rano: 'ráno', dopoledne: 'dopoledne', odpoledne: 'odpoledne', vecer: 'večer' }[part];
      const taskText = `Je ${hour12} hodin ${partName}.<br>Jaký to je čas na digitálních hodinách?`;
      const correct = Clock.formatDigital(hour24, 0);

      const set = new Set([correct]);
      const out = [];
      const candidates = [
        Clock.formatDigital(hour12, 0),
        Clock.formatDigital((hour24 + 12) % 24, 0),
        Clock.formatDigital(hour24 - 1, 0),
        Clock.formatDigital(hour24 + 1, 0),
      ];
      for (const c of candidates) {
        if (!set.has(c) && out.length < 3) { set.add(c); out.push(c); }
      }
      const options = shuffle([correct, ...out]);

      return {
        type: 'ampm',
        title: '🌓 Dopo / odpoledne',
        key: `ampm-d:${hour24}`,
        render: (area, onAnswer) => {
          area.innerHTML = '';
          const emoji = el('div', 'q-scene-emoji',
            part === 'rano' ? '🌅' : part === 'dopoledne' ? '☀️' : part === 'odpoledne' ? '🌤️' : '🌆');
          area.appendChild(emoji);
          const task_el = el('div', 'q-task');
          task_el.innerHTML = taskText;
          area.appendChild(task_el);
          const opts = el('div', 'options-grid');
          options.forEach(opt => {
            const b = el('button', 'opt-btn', opt);
            b.addEventListener('click', () => onAnswer(opt === correct, b, opts));
            opts.appendChild(b);
          });
          area.appendChild(opts);
        }
      };
    } else {
      // whenInDay: „Digitální hodiny ukazují 18:00. Kdy to je během dne?"
      //   odpověď: ráno / dopoledne / odpoledne / večer / noc
      const hour24 = pick([2, 5, 7, 10, 11, 13, 14, 15, 16, 17, 19, 20, 22]);
      const digital = Clock.formatDigital(hour24, 0);

      let correct;
      if (hour24 >= 23 || hour24 <= 4) correct = 'noc';
      else if (hour24 >= 5 && hour24 <= 8) correct = 'rano';
      else if (hour24 >= 9 && hour24 <= 11) correct = 'dopoledne';
      else if (hour24 === 12) correct = 'poledne';
      else if (hour24 >= 13 && hour24 <= 17) correct = 'odpoledne';
      else correct = 'vecer';

      const labels = {
        rano: '🌅 Ráno',
        dopoledne: '☀️ Dopoledne',
        poledne: '🍽️ Poledne',
        odpoledne: '🌤️ Odpoledne',
        vecer: '🌆 Večer',
        noc: '🌙 Noc',
      };
      // 4 možnosti — správná + 3 sousední
      const order = ['rano', 'dopoledne', 'odpoledne', 'vecer', 'noc'];
      const set = new Set([correct]);
      const out = [correct];
      while (out.length < 4) {
        const c = pick(order);
        if (!set.has(c)) { set.add(c); out.push(c); }
      }
      const options = shuffle(out);

      return {
        type: 'ampm',
        title: '🌓 Dopo / odpoledne',
        key: `ampm-w:${hour24}`,
        render: (area, onAnswer) => {
          area.innerHTML = '';
          const instr = el('div', 'q-instr', 'Digitální hodiny ukazují:');
          area.appendChild(instr);
          const display = el('div', 'digital-display', digital);
          area.appendChild(display);
          const instr2 = el('div', 'q-instr', 'Kdy asi během dne to je?');
          instr2.style.marginTop = '8px';
          area.appendChild(instr2);
          const opts = el('div', 'options-grid wide');
          options.forEach(opt => {
            const b = el('button', 'opt-btn', labels[opt]);
            b.addEventListener('click', () => onAnswer(opt === correct, b, opts));
            opts.appendChild(b);
          });
          area.appendChild(opts);
        }
      };
    }
  },

  // ─── Typ 5: Jen minuty ───────────────────────────────────────────────
  _genMinutes(index) {
    // Postupná obtížnost: 0-3 celé 5minuty (0, 15, 30, 45), pak po 5 min
    let m;
    if (index < 3) m = pick([0, 15, 30, 45]);
    else if (index < 6) m = pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
    else m = rand(0, 11) * 5;

    const correct = String(m);
    const set = new Set([correct]);
    const out = [];
    while (out.length < 3) {
      const d = rand(0, 11) * 5;
      if (!set.has(String(d))) { set.add(String(d)); out.push(String(d)); }
    }
    const options = shuffle([correct, ...out]);

    return {
      type: 'minutes',
      title: '⏱️ Jen minuty',
      key: `minutes:${m}`,
      render: (area, onAnswer) => {
        area.innerHTML = '';
        const instr = el('div', 'q-instr', 'Kolik je minut?');
        area.appendChild(instr);
        const withHint = index < 4;
        const svg = Clock.create({ hour: 0, minute: m, minuteOnly: true, showMiniHint: withHint });
        area.appendChild(svg);
        if (!withHint) {
          const tip = el('div', 'q-instr', 'Tip: číslo × 5 = minuty');
          tip.style.fontSize = '12px';
          tip.style.fontStyle = 'italic';
          area.appendChild(tip);
        }
        const opts = el('div', 'options-grid');
        options.forEach(opt => {
          const b = el('button', 'opt-btn', opt + ' min');
          b.addEventListener('click', () => onAnswer(opt === correct, b, opts));
          opts.appendChild(b);
        });
        area.appendChild(opts);
      }
    };
  },

  // ─── Typ 6: Den či noc? ───────────────────────────────────────────────
  _genDayNight() {
    const scene = pick(DAY_NIGHT_SCENES);
    const correctHour = pick(scene.hours);
    const correct = Clock.formatDigital(correctHour, 0);

    // Distraktory — hodiny z jiných denních dob
    const otherScenes = DAY_NIGHT_SCENES.filter(s => s.correct !== scene.correct);
    const set = new Set([correct]);
    const out = [];
    while (out.length < 3) {
      const s = pick(otherScenes);
      const h = pick(s.hours);
      const v = Clock.formatDigital(h, 0);
      if (!set.has(v)) { set.add(v); out.push(v); }
    }
    const options = shuffle([correct, ...out]);

    return {
      type: 'day-night',
      title: '🌙 Den či noc?',
      key: `day-night:${scene.emoji}:${correctHour}`,
      render: (area, onAnswer) => {
        area.innerHTML = '';
        const emoji = el('div', 'q-scene-emoji', scene.emoji);
        area.appendChild(emoji);
        const task = el('div', 'q-task');
        task.innerHTML = `${scene.text}<span class="small">V kolik hodin to asi je?</span>`;
        area.appendChild(task);
        const opts = el('div', 'options-grid');
        options.forEach(opt => {
          const b = el('button', 'opt-btn', opt);
          b.addEventListener('click', () => onAnswer(opt === correct, b, opts));
          opts.appendChild(b);
        });
        area.appendChild(opts);
      }
    };
  },
};

// Pomocník na element
function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
