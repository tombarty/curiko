// ─── Přetahovaná — dva týmy proti sobě (vyjmenovaná slova) ─────────────────
// Kostra je kopie Závodu aut (3-trida/zavod/js/zavod.js), místo závodu se
// přetahuje lano: správná odpověď ho posune o krok k týmu. Vyhrává tým, který
// stužku přetáhne přes svou čáru (vede o zvolený počet tahů).
// Levá polovina = tým A (Červení), pravá = tým B (Modří). Odpovědi přes
// pointerdown, aby na vícedotykové tabuli mohly oba týmy ťukat současně.

const DELKY = [[3, 'Krátká'], [5, 'Střední'], [7, 'Dlouhá']];
const POSUN_MAX = 11;  // o kolik vw se lano posune, než stužka dojde na čáru
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
  // „Hej rup!“ — potvrzení + hluboké zatažení
  dobre() { this.tone(880, 0.1); this.tone(1175, 0.18, 'sine', 0.2, 0.1); this.tone(180, 0.35, 'sawtooth', 0.07, 0.05, 90); },
  spatne() { this.tone(300, 0.15, 'sawtooth', 0.15); this.tone(220, 0.25, 'sawtooth', 0.12, 0.15); },
  pip(vysoky) { this.tone(vysoky ? 1046 : 660, vysoky ? 0.5 : 0.18, 'square', 0.12); },
  fanfara() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => this.tone(f, 0.3, 'triangle', 0.18, i * 0.14)); }
};

// ─── Postavičky ────────────────────────────────────────────────────────────
// Dítě táhne lano doprava a zaklání se (tým B se zrcadlí v CSS). Ruce drží lano
// ve výšce y = 44 ze 100 — sedí s .lano { top: 60.5% } v CSS. Trup, hlava a
// ramena se počítají otočením kolem boků, ruce pak vedou z ramen k lanu.
// Režim 'jasot' = vítěz stojí rovně s rukama nad hlavou.
const DETI = [
  { kuze: '#f6d0a8', vlasy: '#6b3e1e', uces: 'culik', cislo: 7 },
  { kuze: '#d9a274', vlasy: '#2b1a10', uces: 'kratke', cislo: 3 },
  { kuze: '#f2c194', vlasy: '#d9a441', uces: 'ksiltovka', cislo: 10 }
];
const OBRYS = '#2b2b2b';

// Končetina s kresleným obrysem: lomená čára přes koleno / loket
function koncetina(body, barva, sirka) {
  const d = 'M' + body.map(p => p.join(' ')).join(' L');
  return `<path d="${d}" stroke="${OBRYS}" stroke-width="${sirka + 3}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="${d}" stroke="${barva}" stroke-width="${sirka}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
}
function bota(x, y) {
  return `<ellipse cx="${x}" cy="${y}" rx="7.5" ry="4" fill="#3a3a3a" stroke="${OBRYS}" stroke-width="1.5"/>
    <path d="M${x - 6.5} ${y + 2.2} L${x + 6.5} ${y + 2.2}" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`;
}
// Pěst svírající lano: svislý zaoblený obdélník přes lano s rýhami prstů
function pest([x, y], kuze, stin) {
  return `<rect x="${x - 3.5}" y="${y - 5.5}" width="7" height="11" rx="3" fill="${kuze}" stroke="${OBRYS}" stroke-width="1.3" ${stin}/>
    <path d="M${x - 3.5} ${y - 1.8} h3 M${x - 3.5} ${y + 1.8} h3" stroke="${OBRYS}" stroke-width=".9" stroke-linecap="round" opacity=".6"/>`;
}
function vlasy(d, barva) {
  return {
    culik: `<path d="M-13 1 Q-13 -14 0 -14 Q12 -13 13 -5 Q4 -10 -6 -6 Q-10 -3 -13 1 Z" fill="${d.vlasy}" stroke="${OBRYS}" stroke-width="1.5"/>
      <path d="M-11 -6 Q-25 -9 -27 4 Q-20 -1 -12 0 Z" fill="${d.vlasy}" stroke="${OBRYS}" stroke-width="1.5"/>
      <circle cx="-12" cy="-4" r="2.4" fill="${barva}" stroke="${OBRYS}" stroke-width="1"/>`,
    kratke: `<path d="M-13 1 Q-14 -15 0 -14 Q12 -14 13 -4 Q8 -8 4 -8 L5 -12 L0 -9 L-2 -13 L-5 -9 L-9 -12 L-9 -7 Q-12 -4 -13 1 Z" fill="${d.vlasy}" stroke="${OBRYS}" stroke-width="1.5" stroke-linejoin="round"/>`,
    ksiltovka: `<path d="M-13 -1 Q-14 5 -10 6 L-9 -1 Z" fill="${d.vlasy}"/>
      <path d="M-13.5 -2 Q-12 -16 0 -16 Q12 -16 13.5 -3 Z" fill="${barva}" stroke="${OBRYS}" stroke-width="1.5"/>
      <path d="M9 -4 Q19 -7 24 -2 L12 -1 Z" fill="${barva}" stroke="${OBRYS}" stroke-width="1.5" stroke-linejoin="round"/>
      <circle cx="0" cy="-15.5" r="1.6" fill="#fff"/>`
  }[d.uces];
}
function obliceje(rezim) {
  const oko = `<ellipse cx="5" cy="-2" rx="3.3" ry="3.8" fill="#fff" stroke="${OBRYS}" stroke-width="1"/>
    <circle cx="6.4" cy="-1.6" r="1.9" fill="#222"/>`;
  return rezim === 'jasot'
    ? `${oko}<path d="M1.5 -8 Q5 -10 8.5 -8" stroke="${OBRYS}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
       <path d="M3 5 Q8 12 12 5 Z" fill="#7a2626" stroke="${OBRYS}" stroke-width="1.2" stroke-linejoin="round"/>
       <path d="M5.5 8 Q8 10 10 8" stroke="#ff8a8a" stroke-width="1.6" fill="none"/>`
    : `${oko}<path d="M1 -6 L9 -8.5" stroke="${OBRYS}" stroke-width="2" stroke-linecap="round"/>
       <rect x="3" y="5" width="8.5" height="4" rx="1.5" fill="#fff" stroke="${OBRYS}" stroke-width="1.2"/>
       <path d="M3.5 7 L11 7" stroke="#bbb" stroke-width=".8"/>`;
}

function postava(barva, i, rezim = 'tah', zrcadlo = false) {
  const d = DETI[i % DETI.length];
  const tah = rezim === 'tah';
  const H = [36, 62];                       // boky — kolem nich se trup zaklání
  const uhel = tah ? -28 : 0;
  const r = uhel * Math.PI / 180;
  const otoc = ([x, y]) => [H[0] + (x - H[0]) * Math.cos(r) - (y - H[1]) * Math.sin(r),
                            H[1] + (x - H[0]) * Math.sin(r) + (y - H[1]) * Math.cos(r)].map(v => Math.round(v * 10) / 10);
  const hlava = otoc([36, 22]);
  const ramenoZ = otoc([33, 40]), ramenoP = otoc([40, 40]);
  // Nohy: při tahu zapřené vpředu, při jásotu rovně
  const nohaP = tah ? [H, [50, 73], [59, 90]] : [H, [41, 78], [43, 91]];
  const nohaZ = tah ? [H, [45, 80], [44, 91]] : [H, [31, 78], [29, 91]];
  // Ruce: při tahu je z boku vidět jen přední ruka s pěstí na laně, při jásotu obě nad hlavou
  const rukaZ = tah ? [ramenoZ, [50, 47], [70, 44]] : [ramenoZ, [24, 26], [20, 12]];
  const rukaP = tah ? [ramenoP, [46, 45], [58, 44]] : [ramenoP, [50, 26], [54, 12]];
  const stin = 'filter="brightness(.88)"';
  return `<svg viewBox="-14 0 94 100" aria-hidden="true">
    ${koncetina([nohaZ[1], nohaZ[2]], d.kuze, 7).replace(/<path /g, `<path ${stin} `)}
    ${koncetina([nohaZ[0], nohaZ[1]], '#34436b', 11)}
    ${bota(nohaZ[2][0] + 3, nohaZ[2][1] + 3)}
    ${koncetina([nohaP[1], nohaP[2]], d.kuze, 7)}
    ${koncetina([nohaP[0], nohaP[1]], '#3d4e7a', 11)}
    ${bota(nohaP[2][0] + 3, nohaP[2][1] + 3)}
    ${tah ? '' : `${koncetina(rukaZ, d.kuze, 6).replace(/<path /g, `<path ${stin} `)}
      <circle cx="${rukaZ[2][0]}" cy="${rukaZ[2][1]}" r="4.6" fill="${d.kuze}" stroke="${OBRYS}" stroke-width="1.5" ${stin}/>`}
    <g transform="rotate(${uhel} ${H[0]} ${H[1]})">
      <rect x="26" y="33" width="20" height="33" rx="9" fill="${barva}" stroke="${OBRYS}" stroke-width="2"/>
      <path d="M29 40 Q28 52 31 62" stroke="rgba(255,255,255,.3)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <text x="36" y="57" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="11" fill="#fff"${zrcadlo ? ' transform="matrix(-1 0 0 1 72 0)"' : ''}>${d.cislo}</text>
    </g>
    ${koncetina(rukaP, d.kuze, 6.5)}
    <circle cx="${ramenoP[0]}" cy="${ramenoP[1]}" r="5.5" fill="${barva}" stroke="${OBRYS}" stroke-width="1.5"/>
    ${tah ? pest(rukaP[2], d.kuze, '') : `<circle cx="${rukaP[2][0]}" cy="${rukaP[2][1]}" r="4.8" fill="${d.kuze}" stroke="${OBRYS}" stroke-width="1.5"/>`}
    <g transform="translate(${hlava[0]} ${hlava[1]}) rotate(${uhel / 3})">
      <circle cx="-6" cy="2" r="3.2" fill="${d.kuze}" stroke="${OBRYS}" stroke-width="1.3"/>
      <circle cx="0" cy="0" r="13" fill="${d.kuze}" stroke="${OBRYS}" stroke-width="2"/>
      <circle cx="7" cy="4.5" r="2.8" fill="#f49a9a" opacity=".6"/>
      <circle cx="12.4" cy="1.5" r="1.8" fill="${d.kuze}" stroke="${OBRYS}" stroke-width="1"/>
      ${obliceje(rezim)}
      ${vlasy(d, barva)}
    </g>
  </svg>`;
}
function tym(k, rezim) {
  document.getElementById('tahaci-' + k).innerHTML = [0, 1, 2].map(i => postava(TYMY[k].barva, i, rezim, k === 'b')).join('');
}

const Hra = {
  pismena: ['b'],
  delka: 5,
  bezi: false,
  pozice: 0,  // záporná = lano u Červených, kladná = u Modrých
  tymy: {},

  init() {
    this.vyberPismen();
    this.volby('ch-delka', DELKY.map(([n, t]) => [n, `${t} (${n})`]), this.delka, d => { this.delka = d; });
    tym('a', 'tah'); tym('b', 'tah');

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

  // Písmena b / l / m: lze vybrat víc najednou, aspoň jedno musí zůstat
  vyberPismen() {
    const box = document.getElementById('ch-pismena');
    PISMENA.forEach(p => {
      const b = document.createElement('button');
      b.className = 'choice num' + (this.pismena.includes(p) ? ' sel' : '');
      b.textContent = p;
      b.addEventListener('click', () => {
        if (this.pismena.includes(p)) {
          if (this.pismena.length === 1) return;
          this.pismena = this.pismena.filter(x => x !== p);
        } else this.pismena = PISMENA.filter(x => x === p || this.pismena.includes(x));
        b.classList.toggle('sel', this.pismena.includes(p));
      });
      box.appendChild(b);
    });
  },

  // Řada tlačítek pro výběr jedné možnosti (délka)
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
    this.pozice = 0;
    this.tymy = {};
    ['a', 'b'].forEach(k => {
      this.tymy[k] = { body: 0, uloha: null, zamceno: true, dalsi: balicek(this.pismena) };
      document.getElementById('tahaci-' + k).className = 'tahaci tahaci-' + k;
      tym(k, 'tah');
      this.vykresliTym(k);
    });
    this.posunLano();
    // Odpočet 3–2–1–Start!
    const cd = document.getElementById('countdown');
    cd.classList.remove('hidden');
    const kroky = ['3', '2', '1', 'HEJ RUP!'];
    kroky.forEach((t, i) => setTimeout(() => {
      if (kolo !== this.kolo) return;
      cd.innerHTML = `<span>${t}</span>`;
      cd.classList.toggle('dlouhy', i === kroky.length - 1);
      Zvuk.pip(i === kroky.length - 1);
    }, i * 800));
    setTimeout(() => {
      cd.classList.add('hidden');
      if (kolo !== this.kolo) return;
      this.bezi = true;
      ['a', 'b'].forEach(k => this.novaUloha(k));
    }, kroky.length * 800);
  },

  // Slovo s mezerou: „ab_ch“ → ab[?]ch; po odpovědi se do mezery doplní písmeno
  slovoHtml(u, doplnit, barva) {
    const [pred, po] = u.slovo.split('_');
    const mezera = doplnit
      ? `<span class="mezera hotovo" style="color:${barva}">${doplnit}</span>`
      : '<span class="mezera">?</span>';
    return pred + mezera + po;
  },

  vykresliTym(k) {
    const t = this.tymy[k];
    const el = document.getElementById('team-' + k);
    el.className = 'team team-' + k + (t.zamceno ? ' locked' : '') + (this.bezi ? '' : ' wait');
    el.innerHTML = `
      <div class="team-head">${k === 'a' ? '🔴' : '🔵'} ${TYMY[k].nazev}
        <span class="team-score">✔ ${t.body}</span></div>
      <div class="question slovo">${t.uloha ? this.slovoHtml(t.uloha) : 'Připravit…'}</div>
      <div class="answers"></div>
      <div class="team-msg"></div>`;
    const answers = el.querySelector('.answers');
    (t.uloha ? t.uloha.moznosti : ['·', '·', '·', '·']).forEach(m => {
      const b = document.createElement('button');
      b.className = 'ans';
      b.textContent = m;
      b.addEventListener('pointerdown', e => { e.preventDefault(); this.odpoved(k, m, b); });
      answers.appendChild(b);
    });
  },

  novaUloha(k) {
    const t = this.tymy[k];
    t.uloha = t.dalsi();
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
      q.innerHTML = this.slovoHtml(t.uloha, t.uloha.spravne, 'var(--green)');
      t.body++;
      el.querySelector('.team-score').textContent = `✔ ${t.body}`;
      msg.textContent = ['Správně! 💪', 'Hej rup! 💪', 'Táhneme! 🔥', 'Paráda! ⭐'][t.body % 4];
      Zvuk.dobre();
      this.pozice += k === 'a' ? -1 : 1;
      this.posunLano(k);
      if (Math.abs(this.pozice) >= this.delka) { this.vitez(k); return; }
      setTimeout(() => { if (this.bezi) this.novaUloha(k); }, 900);
    } else {
      // Špatně: ukážeme správné písmeno, lano se nehne, chvilku pauza a další slovo
      btn.classList.add('bad');
      el.querySelectorAll('.ans').forEach(b => { if (b.textContent === t.uloha.spravne) b.classList.add('ok'); });
      q.innerHTML = this.slovoHtml(t.uloha, t.uloha.spravne, 'var(--green)');
      msg.textContent = 'Tentokrát ne. Další!';
      Zvuk.spatne();
      setTimeout(() => { if (this.bezi) this.novaUloha(k); }, 2200);
    }
  },

  // Lano se posune podle náskoku; tým, který táhl, se víc zakloní
  posunLano(kdoTahl) {
    const posun = this.pozice * POSUN_MAX / this.delka;
    document.getElementById('lano').style.transform = `translateX(${posun}vw)`;
    if (kdoTahl) {
      const el = document.getElementById('tahaci-' + kdoTahl);
      el.classList.remove('tah'); void el.offsetWidth; el.classList.add('tah');
    }
  },

  vitez(k) {
    this.bezi = false;
    const kolo = this.kolo;  // po odchodu do menu se oslava nedokončí
    ['a', 'b'].forEach(x => { this.tymy[x].zamceno = true; document.getElementById('team-' + x).classList.add('locked'); });
    const druhy = k === 'a' ? 'b' : 'a';
    // Poražení přepadnou přes čáru, vítězové skáčou
    setTimeout(() => {
      if (kolo !== this.kolo) return;
      document.getElementById('tahaci-' + druhy).classList.add('padaji');
      tym(k, 'jasot');
      document.getElementById('tahaci-' + k).classList.add('skacou');
    }, 700);
    setTimeout(() => {
      if (kolo !== this.kolo) return;
      document.getElementById('win-title').textContent = `Vyhrávají ${TYMY[k].nazev}! ${k === 'a' ? '🔴' : '🔵'}`;
      document.getElementById('win-title').style.color = TYMY[k].barva;
      document.getElementById('win-score').textContent =
        `Správně: ${TYMY.a.nazev} ${this.tymy.a.body} : ${this.tymy.b.body} ${TYMY.b.nazev} — ${TYMY[druhy].nazev}, příště to dáte!`;
      this.ukaz('win');
      Zvuk.fanfara();
      this.konfety();
    }, 2800);
  },

  konfety() {
    const kusy = ['🎉', '⭐', '💪', '🎊', '🏆'];
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
