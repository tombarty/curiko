// ─── Závod aut — dva týmy proti sobě ─────────────────────────────────
// Levá polovina = tým A (Červení), pravá = tým B (Modří). Každý tým má vlastní
// příklady. Odpovědi se zachytávají přes pointerdown, takže na tabuli
// s vícedotykem mohou oba týmy ťukat současně a navzájem se neruší.

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
  dobre() { this.tone(880, 0.1); this.tone(1175, 0.18, 'sine', 0.2, 0.1); this.tone(120, 0.5, 'sawtooth', 0.06, 0, 260); },
  spatne() { this.tone(300, 0.15, 'sawtooth', 0.15); this.tone(220, 0.25, 'sawtooth', 0.12, 0.15); },
  pip(vysoky) { this.tone(vysoky ? 1046 : 660, vysoky ? 0.5 : 0.18, 'square', 0.12); },
  fanfara() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => this.tone(f, 0.3, 'triangle', 0.18, i * 0.14)); }
};

// Autíčko jako obrázek (SVG), aby jelo vždy doprava a mělo barvu týmu
function auto(barva) {
  return `<svg viewBox="0 0 90 55" aria-hidden="true">
    <path d="M8 34 L14 20 Q17 13 26 13 L52 13 Q60 13 66 21 L72 27 L82 30 Q88 32 88 38 L88 42 L4 42 L4 38 Q4 34 8 34 Z" fill="${barva}" stroke="#222" stroke-width="2"/>
    <path d="M24 18 L50 18 L50 28 L19 28 Z M54 18 Q60 18 64 23 L67 28 L54 28 Z" fill="#cfe8ff" stroke="#222" stroke-width="1.5"/>
    <circle cx="22" cy="43" r="9" fill="#222"/><circle cx="22" cy="43" r="4" fill="#bbb"/>
    <circle cx="68" cy="43" r="9" fill="#222"/><circle cx="68" cy="43" r="4" fill="#bbb"/>
    <rect x="80" y="32" width="6" height="4" rx="1" fill="#ffd34d"/>
  </svg>`;
}

const Zavod = {
  cisla: [6, 7, 8, 9],
  druh: 'mul',
  delka: 10,
  bezi: false,
  tymy: {},

  init() {
    this.vyberCisel();
    this.volby('ch-druh', DRUHY, this.druh, d => { this.druh = d; });
    this.volby('ch-delka', DELKY.map(d => [d, d + ' příkladů']), this.delka, d => { this.delka = d; });
    document.getElementById('car-a').innerHTML = auto(TYMY.a.barva);
    document.getElementById('car-b').innerHTML = auto(TYMY.b.barva);

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

  // Čísla 2–9: lze vybrat víc najednou, aspoň jedno musí zůstat
  vyberCisel() {
    const box = document.getElementById('ch-cisla');
    CISLA.forEach(c => {
      const b = document.createElement('button');
      b.className = 'choice num' + (this.cisla.includes(c) ? ' sel' : '');
      b.textContent = c;
      b.addEventListener('click', () => {
        if (this.cisla.includes(c)) {
          if (this.cisla.length === 1) return;
          this.cisla = this.cisla.filter(x => x !== c);
        } else this.cisla = [...this.cisla, c].sort((a, b) => a - b);
        b.classList.toggle('sel', this.cisla.includes(c));
      });
      box.appendChild(b);
    });
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

  // Ukončí rozběhnutý závod (i během odpočtu) a vrátí se do nastavení
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
      this.posunAuto(k);
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
      <div class="question">${t.uloha ? t.uloha.otazka : '? × ?'} = <span class="qmark">?</span></div>
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
    do { u = generuj(this.cisla, this.druh); } while (u.otazka === t.posledni);
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
      msg.textContent = ['Správně! 🚀', 'Výborně! ⭐', 'Jede to! 🏎️', 'Paráda! 💪'][t.body % 4];
      Zvuk.dobre();
      this.posunAuto(k, true);
      if (t.body >= this.delka) { this.vitez(k); return; }
      setTimeout(() => { if (this.bezi) this.novaUloha(k); }, 700);
    } else {
      // Špatně: ukážeme správný výsledek, auto stojí, chvilku pauza a nový příklad
      btn.classList.add('bad');
      el.querySelectorAll('.ans').forEach(b => { if (Number(b.textContent) === t.uloha.spravne) b.classList.add('ok'); });
      q.innerHTML = `${t.uloha.otazka} = <span style="color:var(--green)">${t.uloha.spravne}</span>`;
      msg.textContent = 'Tentokrát ne. Další!';
      Zvuk.spatne();
      setTimeout(() => { if (this.bezi) this.novaUloha(k); }, 1800);
    }
  },

  posunAuto(k, boost) {
    const car = document.getElementById('car-' + k);
    const p = Math.min(1, (this.tymy[k] ? this.tymy[k].body : 0) / this.delka);
    car.style.left = `calc((100% - 9vh) * ${p})`;
    if (boost) { car.classList.remove('boost'); void car.offsetWidth; car.classList.add('boost'); }
  },

  vitez(k) {
    this.bezi = false;
    ['a', 'b'].forEach(x => { this.tymy[x].zamceno = true; document.getElementById('team-' + x).classList.add('locked'); });
    const druhy = k === 'a' ? 'b' : 'a';
    setTimeout(() => {
      document.getElementById('win-title').textContent = `Vyhrávají ${TYMY[k].nazev}! ${k === 'a' ? '🔴' : '🔵'}`;
      document.getElementById('win-title').style.color = TYMY[k].barva;
      document.getElementById('win-score').textContent =
        `${TYMY.a.nazev} ${this.tymy.a.body} : ${this.tymy.b.body} ${TYMY.b.nazev} — ${TYMY[druhy].nazev}, příště to dáte!`;
      this.ukaz('win');
      Zvuk.fanfara();
      this.konfety();
    }, 1000);
  },

  konfety() {
    const kusy = ['🎉', '⭐', '🏁', '🎊', '🏆'];
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

document.addEventListener('DOMContentLoaded', () => Zavod.init());
