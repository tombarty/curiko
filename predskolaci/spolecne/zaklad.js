// ─── Společný základ her pro předškoláky ────────────────────────────────────
// Každá hra zavolá Zaklad.start({ id, nazev, emoji, popis, rezimy: [...] }).
// Režim = { id, nazev, emoji, popis, uloha(ctx) }. Funkce uloha() postaví jeden úkol
// do ctx.stage a po odpovědi dítěte zavolá ctx.spravne(...) nebo ctx.spatne(...).
// Kolo má 5 úkolů. Obtížnost (úroveň 1–3) se sama upravuje podle výsledků.

const KOLO = 5;

// ─── Úložiště (bezpečně — v soukromém okně může localStorage chybět) ────────
const Store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
    catch (e) { return fallback; }
  },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }
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
  klik() { this.tone(660, 0.1, 'triangle'); },
  buben() { this.tone(140, 0.18, 'sine', 0.35); this.tone(90, 0.2, 'triangle', 0.2); },
  chyba() { this.tone(220, 0.18, 'sine', 0.12); this.tone(180, 0.2, 'sine', 0.1, 0.1); },
  dobre() { [659, 880].forEach((f, i) => this.tone(f, 0.18, 'triangle', 0.15, i * 0.1)); },
  fanfara() { [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.25, 'triangle', 0.15, i * 0.12)); }
};

// ─── Hlas (předškolák nečte — pokyny čte počítačový hlas) ───────────────────
const Hlas = {
  zapnuto: Store.get('pred_hlas', true),
  hlas: null,
  id: 0,
  najdi() {
    if (!('speechSynthesis' in window)) return;
    this.hlas = speechSynthesis.getVoices().find(v => /^cs/i.test(v.lang)) || null;
  },
  muze() { return this.zapnuto && 'speechSynthesis' in window; },
  // cb se zavolá po dořečení (nebo po odhadnutém čase, kdyby prohlížeč konec nenahlásil)
  rekni(text, cb) {
    const moje = ++this.id;
    let hotovo = false;
    const konec = () => { if (hotovo || moje !== this.id) return; hotovo = true; if (cb) cb(); };
    if (!this.muze()) { if (cb) setTimeout(konec, 300 + text.length * 35); return; }
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'cs-CZ';
      if (this.hlas) u.voice = this.hlas;
      u.rate = 0.92;
      u.onend = konec;
      speechSynthesis.speak(u);
    } catch (e) {}
    if (cb) setTimeout(konec, 1500 + text.length * 95);
  },
  ztichni() { this.id++; try { speechSynthesis.cancel(); } catch (e) {} }
};
if ('speechSynthesis' in window) {
  Hlas.najdi();
  speechSynthesis.onvoiceschanged = () => Hlas.najdi();
}

// ─── Pomocné funkce ────────────────────────────────────────────────────────
function zamichej(pole) {
  const a = [...pole];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function nahodne(pole) { return pole[Math.floor(Math.random() * pole.length)]; }
function cislo(od, do_) { return od + Math.floor(Math.random() * (do_ - od + 1)); }
function vyber(pole, n) { return zamichej(pole).slice(0, n); }

// Vytvoří prvek z HTML řetězce
function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

// Velké obrázkové tlačítko
function tlacitko(obsah, onClick, trida = '') {
  const b = document.createElement('button');
  b.className = 'opt ' + trida;
  b.innerHTML = obsah;
  b.addEventListener('click', () => onClick(b));
  return b;
}

// Náhodné pozice bez překryvu (rozházené předměty) — v procentech plochy
function pozice(n, sloupcu = 5, radku = 4) {
  const bunky = zamichej([...Array(sloupcu * radku).keys()]).slice(0, n);
  return bunky.map(b => {
    const x = b % sloupcu, y = Math.floor(b / sloupcu);
    return {
      x: (x + 0.5 + (Math.random() - 0.5) * 0.45) / sloupcu * 100,
      y: (y + 0.5 + (Math.random() - 0.5) * 0.45) / radku * 100
    };
  });
}

// Plocha s rozházenými obrázky
function rozhazej(obrazky, trida = 'scatter', sloupcu, radku) {
  const box = document.createElement('div');
  box.className = trida;
  const poz = pozice(obrazky.length, sloupcu, radku);
  obrazky.forEach((o, i) => {
    const s = document.createElement('span');
    s.textContent = o;
    s.style.left = poz[i].x + '%';
    s.style.top = poz[i].y + '%';
    box.appendChild(s);
  });
  return box;
}

const CISLA = ['nula', 'jedna', 'dvě', 'tři', 'čtyři', 'pět', 'šest', 'sedm', 'osm', 'devět', 'deset'];
function tecky(n) { return '<div class="dots">' + '<i></i>'.repeat(n) + '</div>'; }

// ─── Engine ────────────────────────────────────────────────────────────────
const Zaklad = {
  hra: null, rezim: null, uroven: 1, index: 0, vysledky: [], chyb: 0, hotovo: false, token: 0, pokynMluv: '',

  start(hra) {
    this.hra = hra;
    document.title = hra.emoji + ' ' + hra.nazev + ' — Curiko';
    this.postav();
    this.renderMenu();
  },

  postav() {
    document.getElementById('app').innerHTML = `
      <section id="screen-menu" class="screen active">
        <a href="../index.html" class="back-link">← zpět na předškoláky</a>
        <div class="header">
          <h1>${this.hra.emoji} ${this.hra.nazev}</h1>
          <p>${this.hra.popis}</p>
        </div>
        <div id="mode-list" class="level-list"></div>
        <button id="btn-sound" class="btn-small"></button>
      </section>

      <section id="screen-game" class="screen">
        <div class="game-top">
          <button class="btn-icon" id="btn-game-back" aria-label="Zpět do menu">🏠</button>
          <div id="progress" class="progress"></div>
          <button class="btn-icon" id="btn-say" aria-label="Zopakovat pokyn">🔊</button>
        </div>
        <div id="task" class="task"></div>
        <div id="stage" class="stage"></div>
      </section>

      <section id="screen-reward" class="screen">
        <div class="reward-box">
          <div class="reward-emoji" id="reward-emoji">🏆</div>
          <h2 id="reward-title">Jsi šikula!</h2>
          <div class="reward-stars" id="reward-stars"></div>
          <p id="reward-text"></p>
          <button class="btn-primary" id="btn-again">🔄 Ještě jednou</button>
          <button class="btn-secondary" id="btn-reward-menu">📋 Vybrat jinou hru</button>
        </div>
      </section>

      <section id="screen-about" class="screen">
        <button class="about-back-btn" id="btn-about-back">← Zpět</button>
        <h2 class="about-title">✨ Autor hry</h2>
        <div class="about-card">
          <div class="about-name">Tomáš Bártek</div>
          <div class="about-sub">Vytvořeno s pomocí <strong>Claude Code</strong> 🤖</div>
          <div class="about-feedback">💬 Pro nápady a zpětnou vazbu mi napiš na LinkedIn</div>
          <a href="https://www.linkedin.com/in/tomasbartek/" target="_blank" rel="noopener" class="about-link">🔗 LinkedIn profil</a>
        </div>
        <div class="about-card">
          <div class="about-coffee-title">☕ Kupte mi kafe!</div>
          <div class="about-coffee-text">Pokud se vám hry líbí, můžete autora podpořit částkou 30&nbsp;Kč.</div>
          <div id="about-qr" class="about-qr"></div>
          <div class="about-coffee-hint">Naskenuj telefonem v bankovní aplikaci 📱</div>
        </div>
        <div class="about-copyright">© 2026 Tomáš Bártek</div>
      </section>`;

    const f = document.createElement('footer');
    f.className = 'site-footer';
    f.innerHTML = '<a id="footer-about">Autor hry</a>';
    document.body.appendChild(f);

    const $ = id => document.getElementById(id);
    $('btn-sound').addEventListener('click', () => {
      Hlas.zapnuto = !Hlas.zapnuto; Store.set('pred_hlas', Hlas.zapnuto); this.popisHlasu();
      if (Hlas.zapnuto) Hlas.rekni('Hlas je zapnutý.');
    });
    this.popisHlasu();
    $('btn-game-back').addEventListener('click', () => this.ukaz('menu'));
    $('btn-say').addEventListener('click', () => { if (this.pokynMluv) Hlas.rekni(this.pokynMluv); });
    $('btn-again').addEventListener('click', () => this.zacni(this.rezim));
    $('btn-reward-menu').addEventListener('click', () => this.ukaz('menu'));
    $('footer-about').addEventListener('click', () => this.ukaz('about'));
    $('btn-about-back').addEventListener('click', () => this.ukaz(this._predAbout || 'menu'));
  },

  popisHlasu() {
    document.getElementById('btn-sound').textContent = Hlas.zapnuto ? '🔊 Hlas zapnutý' : '🔇 Hlas vypnutý';
  },

  ukaz(nazev) {
    const aktivni = document.querySelector('.screen.active');
    if (nazev === 'about' && aktivni) this._predAbout = aktivni.id.replace('screen-', '');
    if (nazev !== 'game' && nazev !== 'about') { this.token++; Hlas.ztichni(); }
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + nazev).classList.add('active');
    if (nazev === 'menu') this.renderMenu();
    if (nazev === 'about') this.qr();
    window.scrollTo(0, 0);
  },

  klicUrovne(r) { return this.hra.id + '/' + r.id; },
  urovenRezimu(r) { return Store.get('pred_urovne', {})[this.klicUrovne(r)] || 1; },

  renderMenu() {
    const box = document.getElementById('mode-list');
    box.innerHTML = '';
    this.hra.rezimy.forEach(r => {
      const b = document.createElement('button');
      b.className = 'level-card';
      const u = this.urovenRezimu(r);
      b.innerHTML = `
        <span class="lv-emoji">${r.emoji}</span>
        <div>
          <div class="lv-name">${r.nazev}</div>
          <div class="lv-desc">${r.popis}</div>
          <div class="lv-level">${'⭐'.repeat(u)} úroveň ${u}</div>
        </div>`;
      b.addEventListener('click', () => { Zvuk.klik(); this.zacni(r); });
      box.appendChild(b);
    });
  },

  zacni(r) {
    this.rezim = r;
    this.uroven = this.urovenRezimu(r);
    this.index = 0;
    this.vysledky = [];
    this.ukaz('game');
    this.dalsiUloha();
  },

  renderProgress() {
    const p = document.getElementById('progress');
    p.innerHTML = '';
    for (let i = 0; i < KOLO; i++) {
      const s = document.createElement('span');
      if (i < this.index) s.className = this.vysledky[i] ? 'done' : 'miss';
      else if (i === this.index) s.className = 'now';
      p.appendChild(s);
    }
  },

  dalsiUloha() {
    this.token++;
    this.chyb = 0;
    this.hotovo = false;
    this.pokynMluv = '';
    Hlas.ztichni();
    this.renderProgress();
    document.getElementById('task').textContent = '';
    const stage = document.getElementById('stage');
    stage.innerHTML = '';
    this.rezim.uloha(this.ctx());
  },

  // Kontext pro jeden úkol — vše se po přechodu na další úkol samo zneplatní
  ctx() {
    const t = this.token, self = this;
    const plati = () => t === self.token;
    return {
      stage: document.getElementById('stage'),
      uroven: this.uroven,
      // Zobrazí a přečte pokyn; tlačítko 🔊 ho zopakuje
      pokyn(text, mluv = text, cb) {
        if (!plati()) return;
        document.getElementById('task').textContent = text;
        self.pokynMluv = mluv;
        Hlas.rekni(mluv, cb ? () => { if (plati()) cb(); } : undefined);
      },
      rekni(text, cb) { if (plati()) Hlas.rekni(text, cb ? () => { if (plati()) cb(); } : undefined); },
      pozdeji(fn, ms) { setTimeout(() => { if (plati()) fn(); }, ms); },
      plati,
      spravne(prvek, dovetek) { if (plati()) self.spravne(prvek, dovetek); },
      spatne(prvek, text) { if (plati()) self.spatne(prvek, text); },
      // Průběžně správný krok (např. jedna z více věcí) — bez konce úkolu
      krok(prvek) { if (plati()) { Zvuk.klik(); if (prvek) prvek.classList.add('ok'); } }
    };
  },

  spravne(prvek, dovetek) {
    if (this.hotovo) return;
    this.hotovo = true;
    this.vysledky[this.index] = this.chyb === 0;
    Zvuk.dobre();
    if (prvek) prvek.classList.add('ok');
    const pop = document.createElement('div');
    pop.className = 'check-pop';
    pop.textContent = this.chyb === 0 ? '⭐' : '✅';
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 1200);
    const pochvala = nahodne(['Výborně!', 'Super!', 'Paráda!', 'Správně!', 'Bravo!', 'Šikula!']);
    const t = this.token;
    Hlas.rekni(dovetek ? pochvala + ' ' + dovetek : pochvala, () => {
      setTimeout(() => { if (t === this.token) this.poUloze(); }, 450);
    });
  },

  spatne(prvek, text) {
    if (this.hotovo) return;
    this.chyb++;
    Zvuk.chyba();
    if (prvek) { prvek.classList.remove('shake'); void prvek.offsetWidth; prvek.classList.add('shake'); }
    Hlas.rekni(text || nahodne(['Zkus to ještě jednou.', 'To ne. Zkus jiný.', 'Ještě jednou, zvládneš to.']));
  },

  poUloze() {
    this.index++;
    if (this.index < KOLO) this.dalsiUloha();
    else this.konec();
  },

  konec() {
    const body = this.vysledky.filter(Boolean).length;
    const max = this.rezim.maxUroven || 3;
    const urovne = Store.get('pred_urovne', {});
    let zprava = '';
    if (body >= 4 && this.uroven < max) { urovne[this.klicUrovne(this.rezim)] = this.uroven + 1; zprava = 'Příště to bude o kousek těžší! 💪'; }
    else if (body <= 2 && this.uroven > 1) { urovne[this.klicUrovne(this.rezim)] = this.uroven - 1; zprava = 'Příště to zkusíme trochu lehčí.'; }
    Store.set('pred_urovne', urovne);

    const zviratka = ['🦁', '🐼', '🦊', '🐨', '🐯', '🐸', '🐵', '🦄', '🐙', '🦒', '🐧', '🐢'];
    document.getElementById('reward-emoji').textContent = nahodne(zviratka);
    document.getElementById('reward-stars').textContent = '⭐'.repeat(Math.max(1, body));
    document.getElementById('reward-text').textContent = zprava || 'Hraj dál a sbírej hvězdičky!';
    this.ukaz('reward');
    Zvuk.fanfara();
    const n = Math.max(1, body);
    Hlas.rekni('Jsi šikula! Máš ' + (n === 1 ? 'jednu hvězdičku.' : n === 2 ? 'dvě hvězdičky.' : n < 5 ? CISLA[n] + ' hvězdičky.' : CISLA[n] + ' hvězdiček.'));
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
