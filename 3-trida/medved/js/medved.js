// ─── Med pro medvěda — dva týmy proti sobě ─────────────────────────────────
// Kostra je kopie Závodu aut (3-trida/zavod/js/zavod.js), místo autíčka
// se plní sklenice medu. Levá polovina = tým A (Červení), pravá = tým B (Modří).
// Odpovědi přes pointerdown, aby na vícedotykové tabuli mohly oba týmy ťukat
// současně a navzájem se nerušily.

const DELKY = [5, 10, 15];
const TYMY = {
  a: { nazev: 'Červení', barva: '#e5383b' },
  b: { nazev: 'Modří', barva: '#2f6fe4' }
};

// ─── Zvuky ─────────────────────────────────────────────────────────────────
const Zvuk = {
  ctx: null,
  tone(freq, dur, type = 'sine', vol = 0.2, delay = 0, slide) {
    try {
      if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime + delay;
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g); g.connect(this.ctx.destination);
      o.start(t); o.stop(t + dur + 0.05);
    } catch (e) {}
  },
  // „Blup“ kapky medu + krátké potvrzení
  dobre() { this.tone(880, 0.1); this.tone(1175, 0.18, 'sine', 0.2, 0.1); this.tone(500, 0.25, 'sine', 0.18, 0.35, 140); },
  spatne() { this.tone(300, 0.15, 'sawtooth', 0.15); this.tone(220, 0.25, 'sawtooth', 0.12, 0.15); },
  pip(vysoky) { this.tone(vysoky ? 1046 : 660, vysoky ? 0.5 : 0.18, 'square', 0.12); },
  mnam() { [0, 0.25, 0.5].forEach(d => this.tone(220, 0.18, 'triangle', 0.2, d, 160)); },
  fanfara() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => this.tone(f, 0.3, 'triangle', 0.18, i * 0.14)); }
};

const Hra = {
  druh: 'add',
  delka: 10,
  bezi: false,
  tymy: {},

  init() {
    this.volby('ch-druh', DRUHY, this.druh, d => { this.druh = d; });
    this.volby('ch-delka', DELKY.map(d => [d, d + ' příkladů']), this.delka, d => { this.delka = d; });

    const $ = id => document.getElementById(id);
    $('btn-start').addEventListener('click', () => this.start());
    $('btn-rematch').addEventListener('click', () => this.start());
    $('btn-win-setup').addEventListener('click', () => this.ukaz('setup'));
    $('btn-race-menu').addEventListener('click', () => this.doMenu());
    $('btn-fullscreen').addEventListener('click', () => {
      const d = document.documentElement;
      if (document.fullscreenElement) document.exitFullscreen();
      else if (d.requestFullscreen) d.requestFullscreen();
      else if (d.webkitRequestFullscreen) d.webkitRequestFullscreen();
    });
    $('footer-about').addEventListener('click', () => { this._pred = document.querySelector('.screen.active').id.replace('screen-', ''); this.doMenu(); this.ukaz('about'); this.qr(); });
    $('btn-about-back').addEventListener('click', () => this.ukaz(this._pred === 'race' ? 'setup' : (this._pred || 'setup')));
  },

  // Řada tlačítek pro výběr jedné možnosti (druh počítání, délka)
  volby(id, polozky, vybrana, onVyber) {
    const box = document.getElementById(id);
    polozky.forEach(([hodnota, text]) => {
      const b = document.createElement('button');
      b.className = 'choice' + (hodnota === vybrana ? ' sel' : '');
      b.textContent = text;
      b.addEventListener('click', () => {
        box.querySelectorAll('.choice').forEach(x => x.classList.remove('sel'));
        b.classList.add('sel');
        onVyber(hodnota);
      });
      box.appendChild(b);
    });
  },

  // Ukončí rozběhnutou hru (i během odpočtu) a vrátí se do nastavení
  doMenu() {
    this.kolo = (this.kolo || 0) + 1;
    this.bezi = false;
    document.getElementById('countdown').classList.add('hidden');
    this.ukaz('setup');
  },

  ukaz(nazev) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + nazev).classList.add('active');
  },

  start() {
    const kolo = this.kolo = (this.kolo || 0) + 1;  // starý odpočet po odchodu do menu nic nespustí
    this.ukaz('race');
    this.bezi = false;
    this.tymy = {};
    ['a', 'b'].forEach(k => {
      this.tymy[k] = { body: 0, uloha: null, posledni: null, zamceno: true };
      document.getElementById('medved-' + k).classList.remove('pije');
      document.getElementById('bublina-' + k).classList.remove('videt');
      this.naplnSklenici(k);
      this.vykresliTym(k);
    });
    // Odpočet 3–2–1–Start!
    const cd = document.getElementById('countdown');
    cd.classList.remove('hidden');
    const kroky = ['3', '2', '1', 'START!'];
    kroky.forEach((t, i) => setTimeout(() => {
      if (kolo !== this.kolo) return;
      cd.innerHTML = `<span>${t}</span>`;
      Zvuk.pip(i === kroky.length - 1);
    }, i * 800));
    setTimeout(() => {
      cd.classList.add('hidden');
      if (kolo !== this.kolo) return;
      this.bezi = true;
      ['a', 'b'].forEach(k => this.novaUloha(k));
    }, kroky.length * 800);
  },

  vykresliTym(k) {
    const t = this.tymy[k];
    const el = document.getElementById('team-' + k);
    el.className = 'team team-' + k + (t.zamceno ? ' locked' : '') + (this.bezi ? '' : ' wait');
    el.innerHTML = `
      <div class="team-head">${k === 'a' ? '🔴' : '🔵'} ${TYMY[k].nazev}
        <span class="team-score">${t.body} / ${this.delka}</span></div>
      <div class="question">${t.uloha ? t.uloha.otazka : '? + ?'} = <span class="qmark">?</span></div>
      <div class="answers"></div>
      <div class="team-msg"></div>`;
    const answers = el.querySelector('.answers');
    (t.uloha ? t.uloha.moznosti : [0, 0, 0, 0]).forEach(m => {
      const b = document.createElement('button');
      b.className = 'ans';
      b.textContent = t.uloha ? m : '·';
      b.addEventListener('pointerdown', e => { e.preventDefault(); this.odpoved(k, m, b); });
      answers.appendChild(b);
    });
  },

  novaUloha(k) {
    const t = this.tymy[k];
    let u;
    // Stejný příklad dvakrát po sobě nedáváme
    do { u = generuj(this.druh); } while (u.otazka === t.posledni);
    t.uloha = u;
    t.posledni = u.otazka;
    t.zamceno = false;
    this.vykresliTym(k);
  },

  odpoved(k, hodnota, btn) {
    const t = this.tymy[k];
    if (!this.bezi || t.zamceno) return;
    t.zamceno = true;  // jeden dotyk = jedna odpověď (dvojité ťuknutí se nepočítá)
    const el = document.getElementById('team-' + k);
    el.classList.add('locked');
    const msg = el.querySelector('.team-msg');
    const q = el.querySelector('.question');

    if (hodnota === t.uloha.spravne) {
      btn.classList.add('ok');
      q.innerHTML = `${t.uloha.otazka} = <span style="color:var(--green)">${t.uloha.spravne}</span>`;
      t.body++;
      el.querySelector('.team-score').textContent = `${t.body} / ${this.delka}`;
      msg.textContent = ['Správně! 🍯', 'Výborně! ⭐', 'Med teče! 🐝', 'Paráda! 💪'][t.body % 4];
      Zvuk.dobre();
      this.prilij(k);
      if (t.body >= this.delka) { this.vitez(k); return; }
      setTimeout(() => { if (this.bezi) this.novaUloha(k); }, 700);
    } else {
      // Špatně: ukážeme správný výsledek, med nepřibude, chvilku pauza a nový příklad
      btn.classList.add('bad');
      el.querySelectorAll('.ans').forEach(b => { if (Number(b.textContent) === t.uloha.spravne) b.classList.add('ok'); });
      q.innerHTML = `${t.uloha.otazka} = <span style="color:var(--green)">${t.uloha.spravne}</span>`;
      msg.textContent = 'Tentokrát ne. Další!';
      Zvuk.spatne();
      setTimeout(() => { if (this.bezi) this.novaUloha(k); }, 1800);
    }
  },

  // Výška medu ve sklenici podle bodů týmu (0–100 %)
  naplnSklenici(k) {
    const p = Math.min(1, (this.tymy[k] ? this.tymy[k].body : 0) / this.delka);
    const med = document.getElementById('med-' + k);
    med.style.height = (p * 100) + '%';
    med.classList.toggle('prazdny', p === 0);
  },

  // Hrnec se nakloní, kapka medu spadne do sklenice a hladina stoupne
  prilij(k) {
    const hrnec = document.getElementById('hrnec-' + k);
    hrnec.classList.remove('leje'); void hrnec.offsetWidth; hrnec.classList.add('leje');
    const sklo = document.getElementById('sklo-' + k);
    const kapka = document.createElement('div');
    kapka.className = 'kapka';
    const hladina = (this.tymy[k].body - 1) / this.delka;
    kapka.style.setProperty('--cil', `calc(${(1 - hladina) * 100}% - 2vh)`);
    sklo.appendChild(kapka);
    setTimeout(() => { kapka.remove(); this.naplnSklenici(k); }, 450);
  },

  vitez(k) {
    this.bezi = false;
    ['a', 'b'].forEach(x => { this.tymy[x].zamceno = true; document.getElementById('team-' + x).classList.add('locked'); });
    const druhy = k === 'a' ? 'b' : 'a';
    const kolo = this.kolo;  // po odchodu do menu se oslava nedokončí
    // Sklenice je plná → medvěd se napije (med ubývá) a pak obrazovka vítěze
    setTimeout(() => {
      if (kolo !== this.kolo) return;
      document.getElementById('medved-' + k).classList.add('pije');
      document.getElementById('bublina-' + k).classList.add('videt');
      const med = document.getElementById('med-' + k);
      med.classList.add('pitny');
      med.style.height = '0%';
      Zvuk.mnam();
    }, 900);
    setTimeout(() => {
      document.getElementById('med-' + k).classList.remove('pitny');
      if (kolo !== this.kolo) return;
      document.getElementById('win-title').textContent = `Vyhrávají ${TYMY[k].nazev}! ${k === 'a' ? '🔴' : '🔵'}`;
      document.getElementById('win-title').style.color = TYMY[k].barva;
      document.getElementById('win-score').textContent =
        `${TYMY.a.nazev} ${this.tymy.a.body} : ${this.tymy.b.body} ${TYMY.b.nazev} — ${TYMY[druhy].nazev}, příště to dáte!`;
      this.ukaz('win');
      Zvuk.fanfara();
      this.konfety();
    }, 3600);
  },

  konfety() {
    const kusy = ['🎉', '⭐', '🍯', '🐝', '🏆'];
    for (let i = 0; i < 40; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.textContent = kusy[i % kusy.length];
      c.style.left = Math.random() * 100 + 'vw';
      c.style.animationDuration = (2.5 + Math.random() * 2) + 's';
      c.style.animationDelay = Math.random() * 1 + 's';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 6000);
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

document.addEventListener('DOMContentLoaded', () => Hra.init());
