// ─── Obkresli obrázek — herní logika ────────────────────────────────────────
// Dítě spojuje tečky tažením prstu (nebo ťuknutím na dvě tečky). Každá čára
// se hned kontroluje: správná zůstane, špatná zčervená a zmizí.

const KOLO = 5;          // obrázků v jednom kole
const PAD = 12;          // okraj sítě ve viewBoxu 0–100
const SVG_NS = 'http://www.w3.org/2000/svg';

// ─── Úložiště (bezpečně — v soukromém okně může localStorage chybět) ────────
const Store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
    catch (e) { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
};

// ─── Zvuky (Web Audio) ─────────────────────────────────────────────────────
const Zvuk = {
  ctx: null,
  tone(freq, dur, type = 'sine', vol = 0.15, delay = 0) {
    try {
      if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      const t = this.ctx.currentTime + delay;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type; o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g); g.connect(this.ctx.destination);
      o.start(t); o.stop(t + dur);
    } catch (e) {}
  },
  spoj() { this.tone(660, 0.12, 'triangle'); },
  chyba() { this.tone(220, 0.18, 'sine', 0.12); this.tone(180, 0.2, 'sine', 0.1, 0.1); },
  hotovo() { [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.25, 'triangle', 0.15, i * 0.12)); }
};

// ─── Hlas (předškolák ještě nečte) ─────────────────────────────────────────
const Hlas = {
  zapnuto: Store.get('obk_hlas', true),
  hlas: null,
  najdi() {
    if (!('speechSynthesis' in window)) return;
    const vse = speechSynthesis.getVoices();
    this.hlas = vse.find(v => /^cs/i.test(v.lang)) || null;
  },
  rekni(text) {
    if (!this.zapnuto || !('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'cs-CZ';
      if (this.hlas) u.voice = this.hlas;
      u.rate = 0.95;
      speechSynthesis.speak(u);
    } catch (e) {}
  }
};
if ('speechSynthesis' in window) {
  Hlas.najdi();
  speechSynthesis.onvoiceschanged = () => Hlas.najdi();
}

// ─── Geometrie sítě ────────────────────────────────────────────────────────
function krok(n) { return (100 - 2 * PAD) / (n - 1); }
function poz(i, n) { return PAD + i * krok(n); }
function gcd(a, b) { return b ? gcd(b, a % b) : a; }
function klic(a, b) {
  const [p, q] = (a[0] < b[0] || (a[0] === b[0] && a[1] < b[1])) ? [a, b] : [b, a];
  return p[0] + ',' + p[1] + '-' + q[0] + ',' + q[1];
}
// Čáru přes víc teček rozloží na nejkratší kousky (tečka–tečka),
// aby šlo porovnat „jedna dlouhá čára“ se „dvěma krátkými“.
function kousky(a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const g = gcd(Math.abs(dx), Math.abs(dy));
  if (g === 0) return [];
  const sx = dx / g, sy = dy / g, out = [];
  for (let i = 0; i < g; i++) {
    out.push(klic([a[0] + sx * i, a[1] + sy * i], [a[0] + sx * (i + 1), a[1] + sy * (i + 1)]));
  }
  return out;
}
function mnozina(cary) {
  const s = new Set();
  cary.forEach(l => { for (let i = 1; i < l.length; i++) kousky(l[i - 1], l[i]).forEach(k => s.add(k)); });
  return s;
}
function rozklic(k) { return k.split('-').map(p => p.split(',').map(Number)); }

function el(tag, attrs) {
  const e = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}
function tloustka(n) { return n <= 3 ? 4 : n === 4 ? 3.4 : 2.8; }
function polomerTecky(n) { return n <= 3 ? 3.4 : n === 4 ? 3 : 2.6; }

// Vykreslí síť teček + čáry do SVG
function kresliSit(svg, n, cary, trida) {
  svg.innerHTML = '';
  const gLines = el('g', {});
  (cary || []).forEach(l => {
    gLines.appendChild(el('polyline', {
      points: l.map(([x, y]) => poz(x, n) + ',' + poz(y, n)).join(' '),
      class: trida, 'stroke-width': tloustka(n)
    }));
  });
  svg.appendChild(gLines);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    svg.appendChild(el('circle', { cx: poz(x, n), cy: poz(y, n), r: polomerTecky(n), class: 'dot' }));
  }
}

function zamichej(pole) {
  const a = [...pole];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// ─── Aplikace ──────────────────────────────────────────────────────────────
const App = {
  uroven: null, obrazky: [], index: 0, hvezdy: [],
  n: 3, cil: null, nakresleno: new Set(), historie: [], chyby: 0,
  kotva: null, tahne: false, tahemSpojil: false, hotovo: false, napoveda: null,

  init() {
    this.svgT = document.getElementById('svg-template');
    this.svgD = document.getElementById('svg-draw');
    this.renderMenu();

    document.getElementById('btn-sound').addEventListener('click', () => {
      Hlas.zapnuto = !Hlas.zapnuto; Store.set('obk_hlas', Hlas.zapnuto); this.popisHlasu();
      if (Hlas.zapnuto) Hlas.rekni('Hlas je zapnutý.');
    });
    this.popisHlasu();

    document.getElementById('btn-game-back').addEventListener('click', () => this.ukaz('menu'));
    document.getElementById('btn-say').addEventListener('click', () => this.rekniUkol());
    document.getElementById('btn-undo').addEventListener('click', () => this.zpet());
    document.getElementById('btn-clear').addEventListener('click', () => this.smaz());
    document.getElementById('btn-next').addEventListener('click', () => this.dalsi());
    document.getElementById('btn-again').addEventListener('click', () => this.start(this.uroven));
    document.getElementById('btn-reward-menu').addEventListener('click', () => this.ukaz('menu'));
    document.getElementById('footer-about').addEventListener('click', () => this.ukaz('about'));
    document.getElementById('btn-about-back').addEventListener('click', () => this.ukaz(this._predAbout || 'menu'));

    this.svgD.addEventListener('pointerdown', e => this.dolu(e));
    this.svgD.addEventListener('pointermove', e => this.pohyb(e));
    this.svgD.addEventListener('pointerup', e => this.nahoru(e));
    this.svgD.addEventListener('pointercancel', e => this.nahoru(e));
  },

  popisHlasu() {
    document.getElementById('btn-sound').textContent = Hlas.zapnuto ? '🔊 Hlas zapnutý' : '🔇 Hlas vypnutý';
  },

  ukaz(nazev) {
    const aktivni = document.querySelector('.screen.active');
    if (nazev === 'about' && aktivni) this._predAbout = aktivni.id.replace('screen-', '');
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + nazev).classList.add('active');
    document.getElementById('praise').classList.add('hidden');
    if (nazev === 'menu') this.renderMenu();
    if (nazev === 'about') this.qr();
    window.scrollTo(0, 0);
  },

  renderMenu() {
    const box = document.getElementById('level-list');
    box.innerHTML = '';
    const hotovo = Store.get('obk_hotovo', {});
    UROVNE.forEach(u => {
      const b = document.createElement('button');
      b.className = 'level-card';
      const pocet = hotovo[u.id] || 0;
      b.innerHTML = `
        <span class="lv-emoji">${u.emoji}</span>
        <div>
          <div class="lv-name">${u.nazev}</div>
          <div class="lv-desc">${u.popis}</div>
          ${pocet ? `<div class="lv-done">⭐ Nakresleno: ${pocet}</div>` : ''}
        </div>`;
      b.addEventListener('click', () => { Zvuk.spoj(); this.start(u); });
      box.appendChild(b);
    });
  },

  start(u) {
    this.uroven = u;
    this.n = u.velikost;
    this.obrazky = zamichej(u.obrazky).slice(0, KOLO);
    this.index = 0;
    this.hvezdy = [];
    this.ukaz('game');
    this.nactiObrazek();
  },

  nactiObrazek() {
    const o = this.obrazky[this.index];
    this.cil = mnozina(o.cary);
    this.nakresleno = new Set();
    this.historie = [];
    this.chyby = 0;
    this.kotva = null;
    this.napoveda = null;
    this.hotovo = false;
    kresliSit(this.svgT, this.n, o.cary, 'line-template');
    this.prekresli();
    this.renderProgress();
    document.getElementById('task').textContent = `Nakresli stejně: ${o.nazev}`;
    this.rekniUkol();
  },

  rekniUkol() {
    Hlas.rekni(`Nakresli na prázdné tečky stejný obrázek. ${this.obrazky[this.index].nazev}.`);
  },

  renderProgress() {
    const p = document.getElementById('progress');
    p.innerHTML = '';
    for (let i = 0; i < this.obrazky.length; i++) {
      const s = document.createElement('span');
      if (i < this.index) s.className = 'done';
      else if (i === this.index) s.className = 'now';
      p.appendChild(s);
    }
  },

  // Vykreslí kreslicí plochu: nakreslené čáry, nápovědu, tečky, gumovou čáru
  prekresli(gumaDo) {
    const n = this.n, svg = this.svgD;
    svg.innerHTML = '';
    const w = tloustka(n) + 0.6;
    this.nakresleno.forEach(k => {
      const [a, b] = rozklic(k);
      svg.appendChild(el('line', { x1: poz(a[0], n), y1: poz(a[1], n), x2: poz(b[0], n), y2: poz(b[1], n),
        class: this.hotovo ? 'line-ok' : 'line-user', 'stroke-width': w }));
    });
    if (this.napoveda && !this.hotovo) {
      const [a, b] = rozklic(this.napoveda);
      svg.appendChild(el('line', { x1: poz(a[0], n), y1: poz(a[1], n), x2: poz(b[0], n), y2: poz(b[1], n),
        class: 'line-rubber', 'stroke-width': w }));
    }
    if (this.kotva && gumaDo) {
      svg.appendChild(el('line', { x1: poz(this.kotva[0], n), y1: poz(this.kotva[1], n), x2: gumaDo.x, y2: gumaDo.y,
        class: 'line-rubber', 'stroke-width': w }));
    }
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const k = this.kotva && this.kotva[0] === x && this.kotva[1] === y;
      svg.appendChild(el('circle', { cx: poz(x, n), cy: poz(y, n), r: polomerTecky(n) * (k ? 1.6 : 1), class: k ? 'dot anchor' : 'dot' }));
    }
  },

  bodSvg(e) {
    const r = this.svgD.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * 100, y: (e.clientY - r.top) / r.height * 100 };
  },

  // Nejbližší tečka v dosahu prstu (část rozestupu teček)
  tecka(p, podil) {
    const n = this.n, s = krok(n);
    const x = Math.round((p.x - PAD) / s), y = Math.round((p.y - PAD) / s);
    if (x < 0 || y < 0 || x >= n || y >= n) return null;
    const d = Math.hypot(p.x - poz(x, n), p.y - poz(y, n));
    return d <= s * podil ? [x, y] : null;
  },

  dolu(e) {
    if (this.hotovo) return;
    e.preventDefault();
    try { this.svgD.setPointerCapture(e.pointerId); } catch (err) {}
    const t = this.tecka(this.bodSvg(e), 0.45);
    this.tahemSpojil = false;
    if (!t) { this.kotva = null; this.prekresli(); return; }
    if (this.kotva && (this.kotva[0] !== t[0] || this.kotva[1] !== t[1])) {
      // Ťuknutí na druhou tečku → spoj
      this.spoj(this.kotva, t);
      this.kotva = null;
      this.tahne = false;
      this.prekresli();
      return;
    }
    this.kotva = t;
    this.tahne = true;
    this.prekresli();
  },

  pohyb(e) {
    if (!this.tahne || !this.kotva || this.hotovo) return;
    e.preventDefault();
    const p = this.bodSvg(e);
    const t = this.tecka(p, 0.33);
    if (t && (t[0] !== this.kotva[0] || t[1] !== this.kotva[1])) {
      if (this.spoj(this.kotva, t)) { this.kotva = t; this.tahemSpojil = true; }
      else {
        // Špatná čára ukončí tah — jedna chyba = jedna čára, dítě zkusí znovu
        this.tahne = false;
        this.kotva = null;
        this.prekresli();
        return;
      }
    }
    if (this.kotva && !this.hotovo) this.prekresli(p);
  },

  nahoru() {
    if (!this.tahne) return;
    this.tahne = false;
    // Po tažení začíná další čára znovu; po pouhém ťuknutí zůstane tečka vybraná
    if (this.tahemSpojil) this.kotva = null;
    this.prekresli();
  },

  // Vrátí true, když byla čára správná
  spoj(a, b) {
    const ks = kousky(a, b);
    if (!ks.every(k => this.cil.has(k))) {
      this.chyby++;
      Zvuk.chyba();
      this.ukazChybu(a, b);
      if (this.chyby >= 3 && (this.chyby - 3) % 2 === 0) this.dejNapovedu();
      return false;
    }
    const nove = ks.filter(k => !this.nakresleno.has(k));
    if (nove.length) {
      nove.forEach(k => this.nakresleno.add(k));
      this.historie.push(nove);
      if (this.napoveda && this.nakresleno.has(this.napoveda)) this.napoveda = null;
      Zvuk.spoj();
    }
    if (this.nakresleno.size === this.cil.size) this.uspech();
    return true;
  },

  ukazChybu(a, b) {
    const n = this.n;
    const l = el('line', { x1: poz(a[0], n), y1: poz(a[1], n), x2: poz(b[0], n), y2: poz(b[1], n),
      class: 'line-wrong', 'stroke-width': tloustka(n) + 0.6 });
    this.svgD.insertBefore(l, this.svgD.firstChild);
    // Červená čára je samostatná — překreslení ji smaže, proto ji držíme zvlášť
    const svg = this.svgD;
    setTimeout(() => { l.style.opacity = '0'; }, 350);
    setTimeout(() => { if (l.parentNode === svg) l.remove(); }, 900);
  },

  // Nápověda: slabě ukáže jednu chybějící čáru
  dejNapovedu() {
    const chybi = [...this.cil].filter(k => !this.nakresleno.has(k));
    if (!chybi.length) return;
    this.napoveda = chybi[Math.floor(Math.random() * chybi.length)];
    Hlas.rekni('Podívej, tady ti napovím.');
  },

  zpet() {
    if (this.hotovo || !this.historie.length) return;
    this.historie.pop().forEach(k => this.nakresleno.delete(k));
    this.kotva = null;
    this.prekresli();
  },

  smaz() {
    if (this.hotovo) return;
    this.nakresleno = new Set();
    this.historie = [];
    this.kotva = null;
    this.prekresli();
  },

  uspech() {
    this.hotovo = true;
    this.kotva = null;
    this.napoveda = null;
    this.prekresli();
    Zvuk.hotovo();
    const hv = this.chyby === 0 ? 3 : this.chyby <= 2 ? 2 : 1;
    this.hvezdy.push(hv);
    const hotovo = Store.get('obk_hotovo', {});
    hotovo[this.uroven.id] = (hotovo[this.uroven.id] || 0) + 1;
    Store.set('obk_hotovo', hotovo);

    const pochvaly = ['Výborně!', 'Super!', 'Paráda!', 'Šikula!', 'Krása!', 'Bravo!'];
    const emoji = ['🎉', '🌟', '🥳', '👏', '🦄', '🌈'];
    const text = pochvaly[Math.floor(Math.random() * pochvaly.length)];
    setTimeout(() => {
      document.getElementById('praise-emoji').textContent = emoji[Math.floor(Math.random() * emoji.length)];
      document.getElementById('praise-text').textContent = text;
      document.getElementById('praise-stars').textContent = '⭐'.repeat(hv);
      document.getElementById('btn-next').textContent =
        this.index + 1 < this.obrazky.length ? 'Další obrázek ➡️' : 'Hotovo 🏆';
      document.getElementById('praise').classList.remove('hidden');
      Hlas.rekni(text);
    }, 700);
  },

  dalsi() {
    document.getElementById('praise').classList.add('hidden');
    this.index++;
    if (this.index < this.obrazky.length) { this.nactiObrazek(); return; }
    this.odmena();
  },

  odmena() {
    const zviratka = ['🦁', '🐼', '🦊', '🐨', '🐯', '🐸', '🐵', '🦄', '🐙', '🦒'];
    const z = zviratka[Math.floor(Math.random() * zviratka.length)];
    const soucet = this.hvezdy.reduce((a, b) => a + b, 0);
    document.getElementById('reward-emoji').textContent = z;
    document.getElementById('reward-title').textContent = 'Jsi šikula!';
    document.getElementById('reward-text').textContent = `Nakreslil/a jsi ${this.obrazky.length} obrázků a získáváš kamaráda.`;
    document.getElementById('reward-stars').textContent = '⭐ ' + soucet + ' hvězdiček';
    this.ukaz('reward');
    Zvuk.hotovo();
    Hlas.rekni('Jsi šikula! Všechny obrázky jsou nakreslené.');
    this.konfety();
  },

  konfety() {
    const kusy = ['🎉', '⭐', '🎈', '🌟', '🎊'];
    for (let i = 0; i < 24; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.textContent = kusy[i % kusy.length];
      c.style.left = Math.random() * 100 + 'vw';
      c.style.animationDuration = (2 + Math.random() * 2) + 's';
      c.style.animationDelay = Math.random() * 0.8 + 's';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5000);
    }
  },

  qr() {
    const qrEl = document.getElementById('about-qr');
    if (qrEl && !qrEl.dataset.generated && typeof qrcode !== 'undefined') {
      try {
        const qr = qrcode(0, 'M');
        qr.addData('SPD*1.0*ACC:CZ8262106701002211168451*AM:30*CC:CZK*MSG:Kafe pro autora');
        qr.make();
        qrEl.innerHTML = qr.createImgTag(5, 0);
        qrEl.dataset.generated = '1';
      } catch (e) {}
    }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
