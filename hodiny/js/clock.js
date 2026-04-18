// ═══════════════════════════════════════════════════════════════════════════
// clock.js — SVG analogové hodiny + drag ručiček
// ═══════════════════════════════════════════════════════════════════════════

const Clock = {
  // SVG souřadnice (viewBox 200×200), střed 100,100
  CX: 100,
  CY: 100,
  R: 92,

  // Vytvoří SVG element analogových hodin
  // opts: { hour, minute, minuteOnly, interactive, bigNumbers }
  create(opts = {}) {
    const h = opts.hour ?? 0;
    const m = opts.minute ?? 0;
    const minuteOnly = !!opts.minuteOnly;
    const interactive = !!opts.interactive;
    const bigNumbers = opts.bigNumbers ?? true;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.classList.add('clock-svg');

    // Ciferník
    const face = this._el('circle', { cx: 100, cy: 100, r: 92, class: 'face-bg' });
    svg.appendChild(face);

    // Minutové tečky (60 ks)
    for (let i = 0; i < 60; i++) {
      const isBig = i % 5 === 0;
      const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
      const r1 = 92 - (isBig ? 10 : 5);
      const r2 = 92 - 2;
      const x1 = 100 + Math.cos(angle) * r1;
      const y1 = 100 + Math.sin(angle) * r1;
      const x2 = 100 + Math.cos(angle) * r2;
      const y2 = 100 + Math.sin(angle) * r2;
      svg.appendChild(this._el('line', {
        x1, y1, x2, y2,
        class: isBig ? 'tick tick-big' : 'tick'
      }));
    }

    // Čísla — vždy 1..12 velké (jako reálné hodiny)
    for (let i = 1; i <= 12; i++) {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const r = 72;
      const x = 100 + Math.cos(angle) * r;
      const y = 100 + Math.sin(angle) * r;
      svg.appendChild(this._el('text', {
        x, y, class: bigNumbers ? 'num-label big-num' : 'num-label'
      }, String(i)));
    }

    // V minutovém režimu + s hintem: přidáme malá pomocná čísla 5, 10, 15...
    const showMiniHint = opts.showMiniHint === true;
    if (minuteOnly && showMiniHint) {
      for (let i = 1; i <= 12; i++) {
        const num = i * 5 === 60 ? 0 : i * 5;
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const r = 56;
        const x = 100 + Math.cos(angle) * r;
        const y = 100 + Math.sin(angle) * r;
        svg.appendChild(this._el('text', {
          x, y, class: 'num-label mini-hint'
        }, String(num)));
      }
    }

    // Ručičky
    const state = { hour: h, minute: m, minuteOnly, interactive };

    if (!minuteOnly) {
      const hourHand = this._el('line', { class: 'hand-hour', 'data-hand': 'hour' });
      svg.appendChild(hourHand);
      state.hourHand = hourHand;
    }

    const minHand = this._el('line', {
      class: minuteOnly ? 'hand-minute-only' : 'hand-minute',
      'data-hand': 'minute'
    });
    svg.appendChild(minHand);
    state.minHand = minHand;

    // Středový bod
    const center = this._el('circle', { cx: 100, cy: 100, r: 5, class: 'center' });
    svg.appendChild(center);

    // Interaktivní drag handles (nad ručičkami, větší hit area)
    if (interactive) {
      if (!minuteOnly) {
        const hourGrab = this._el('line', {
          x1: 100, y1: 100, x2: 100, y2: 55,
          class: 'drag-handle',
          'data-hand-handle': 'hour'
        });
        svg.appendChild(hourGrab);
        state.hourHandle = hourGrab;
      }
      const minGrab = this._el('line', {
        x1: 100, y1: 100, x2: 100, y2: 30,
        class: 'drag-handle',
        'data-hand-handle': 'minute'
      });
      svg.appendChild(minGrab);
      state.minHandle = minGrab;
    }

    // Vykreslit pozici ručiček
    this._applyHands(state);

    svg._clockState = state;

    if (interactive) {
      this._attachDrag(svg, state);
    }

    return svg;
  },

  // Získat aktuální čas z interaktivních hodin
  getTime(svg) {
    const s = svg._clockState;
    return { hour: s.hour, minute: s.minute };
  },

  // Pomocník: vytvoří SVG element
  _el(tag, attrs, text) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const k in attrs) {
      el.setAttribute(k, attrs[k]);
    }
    if (text !== undefined) el.textContent = text;
    return el;
  },

  // Překreslí pozice ručiček podle state.hour / state.minute
  _applyHands(state) {
    const hAngle = this._hourAngle(state.hour, state.minute);
    const mAngle = this._minuteAngle(state.minute);

    // Minutová ručička
    if (state.minHand) {
      const len = state.minuteOnly ? 70 : 72;
      const x = 100 + Math.sin(mAngle) * len;
      const y = 100 - Math.cos(mAngle) * len;
      state.minHand.setAttribute('x1', 100);
      state.minHand.setAttribute('y1', 100);
      state.minHand.setAttribute('x2', x);
      state.minHand.setAttribute('y2', y);
      if (state.minHandle) {
        state.minHandle.setAttribute('x2', x);
        state.minHandle.setAttribute('y2', y);
      }
    }

    // Hodinová ručička
    if (state.hourHand) {
      const len = 48;
      const x = 100 + Math.sin(hAngle) * len;
      const y = 100 - Math.cos(hAngle) * len;
      state.hourHand.setAttribute('x1', 100);
      state.hourHand.setAttribute('y1', 100);
      state.hourHand.setAttribute('x2', x);
      state.hourHand.setAttribute('y2', y);
      if (state.hourHandle) {
        state.hourHandle.setAttribute('x2', x);
        state.hourHandle.setAttribute('y2', y);
      }
    }
  },

  _hourAngle(h, m) {
    // 0..12 → 0..2π. Přidáme posun o minuty (plynulý pohyb hodinovky)
    const hh = ((h % 12) + m / 60);
    return (hh / 12) * Math.PI * 2;
  },

  _minuteAngle(m) {
    return (m / 60) * Math.PI * 2;
  },

  // Pointer events pro drag
  _attachDrag(svg, state) {
    let dragging = null; // 'hour' | 'minute'

    const getSvgPoint = (clientX, clientY) => {
      const rect = svg.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 200;
      const y = ((clientY - rect.top) / rect.height) * 200;
      return { x, y };
    };

    const angleFromPoint = (x, y) => {
      // 12 = nahoru = úhel 0 (naše konvence)
      const dx = x - 100;
      const dy = y - 100;
      let a = Math.atan2(dx, -dy); // dx = sin, -dy = cos
      if (a < 0) a += Math.PI * 2;
      return a;
    };

    const onDown = (e) => {
      const target = e.target.getAttribute('data-hand-handle') ||
                     e.target.getAttribute('data-hand');
      if (!target) return;
      dragging = target;
      svg.classList.add('dragging');
      svg.setPointerCapture(e.pointerId);
      onMove(e); // okamžitá aktualizace
      e.preventDefault();
    };

    const onMove = (e) => {
      if (!dragging) return;
      const pt = getSvgPoint(e.clientX, e.clientY);
      const a = angleFromPoint(pt.x, pt.y);

      if (dragging === 'minute') {
        // Minuta = úhel / 2π × 60, snapping po 5 minutách
        let m = Math.round((a / (Math.PI * 2)) * 60);
        m = Math.round(m / 5) * 5;
        if (m === 60) m = 0;
        state.minute = m;
      } else if (dragging === 'hour') {
        // Hodiny = úhel / 2π × 12, snapping na celou (1..12, 0 = 12)
        let h = Math.round((a / (Math.PI * 2)) * 12);
        if (h === 0 || h === 12) h = 12;
        state.hour = h;
      }

      this._applyHands(state);
      e.preventDefault();
    };

    const onUp = (e) => {
      if (!dragging) return;
      dragging = null;
      svg.classList.remove('dragging');
      try { svg.releasePointerCapture(e.pointerId); } catch (err) {}
    };

    svg.addEventListener('pointerdown', onDown);
    svg.addEventListener('pointermove', onMove.bind(this));
    svg.addEventListener('pointerup', onUp);
    svg.addEventListener('pointercancel', onUp);
  },

  // Formátování času do digitálního formátu
  formatDigital(h, m) {
    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    return `${hh}:${mm}`;
  },

  // Formátování času ve 12h formátu s přívlastkem (pro AM/PM hry)
  format12h(h24, m) {
    const h12 = h24 === 0 ? 12 : (h24 > 12 ? h24 - 12 : h24);
    return `${h12}:${String(m).padStart(2, '0')}`;
  },

  // Slovní popis času (čtvrt, půl, třičtvrtě, celá)
  formatWords(h, m) {
    // h: 0-23
    const next = (h + 1) % 12 || 12;
    const cur = (h % 12) || 12;
    if (m === 0) return `${cur} hodin (celá)`;
    if (m === 15) return `čtvrt na ${next}`;
    if (m === 30) return `půl ${this._genitiv(next)}`;
    if (m === 45) return `třičtvrtě na ${next}`;
    return `${cur}:${String(m).padStart(2, '0')}`;
  },

  _genitiv(h) {
    // Genitiv 2. pád pro "půl" (půl druhé = 1:30)
    const g = {
      1: 'první', 2: 'druhé', 3: 'třetí', 4: 'čtvrté',
      5: 'páté', 6: 'šesté', 7: 'sedmé', 8: 'osmé',
      9: 'deváté', 10: 'desáté', 11: 'jedenácté', 12: 'dvanácté'
    };
    return g[h] || h;
  }
};
