// ═══════════════════════════════════════════════════════════════════════════
// motivace.js — systém "Sbíráš minutky"
// ═══════════════════════════════════════════════════════════════════════════

const Motivace = {
  CIRCLE_LEN: 276.46, // 2π × r(44)

  // Přidá minutky. Vrátí true pokud byla odemčena celá hodina (kukačka).
  addMinutka(n = 1) {
    const s = Storage.load();
    s.aktualniMinutky += n;
    let kukackaSpusti = false;
    if (s.aktualniMinutky >= 60) {
      s.aktualniMinutky -= 60;
      s.celkemHodin += 1;
      kukackaSpusti = true;
    }
    s.celkemMinut += n;
    Storage.save(s);
    return { state: s, kukackaSpusti };
  },

  // Aktualizuje UI ukazatele (menu + mini ve hře)
  refreshUI() {
    const s = Storage.load();

    // Velké na menu
    const txt = document.getElementById('minutky-now');
    const clockTxt = document.getElementById('minutky-text');
    const prog = document.getElementById('minutky-progress');
    const total = document.getElementById('minutky-total');
    if (txt) txt.textContent = s.aktualniMinutky;
    if (clockTxt) clockTxt.textContent = s.aktualniMinutky;
    if (prog) {
      const offset = this.CIRCLE_LEN * (1 - s.aktualniMinutky / 60);
      prog.setAttribute('stroke-dashoffset', offset);
    }
    if (total) {
      const totalMin = s.celkemMinut;
      const hours = Math.floor(totalMin / 60);
      const mins = totalMin % 60;
      if (hours === 0) total.textContent = `Celkem: ${mins} min`;
      else if (mins === 0) total.textContent = `Celkem: ${hours} ${this._hPlural(hours)}`;
      else total.textContent = `Celkem: ${hours} ${this._hPlural(hours)} a ${mins} min`;
    }

    // Mini ve hře
    const miniTxt = document.getElementById('mini-minutky-text');
    const miniProg = document.getElementById('mini-minutky-progress');
    if (miniTxt) miniTxt.textContent = `${s.aktualniMinutky}/60`;
    if (miniProg) {
      const offset = this.CIRCLE_LEN * (1 - s.aktualniMinutky / 60);
      miniProg.setAttribute('stroke-dashoffset', offset);
    }
  },

  _format(h, m) {
    if (h === 0) return `${m} min`;
    if (m === 0) return `${h} ${this._hPlural(h)}`;
    return `${h} ${this._hPlural(h)} a ${m} min`;
  },

  _hPlural(h) {
    if (h === 1) return 'hodinu';
    if (h >= 2 && h <= 4) return 'hodiny';
    return 'hodin';
  },

  // Zobrazí kukačkovou obrazovku
  showKukacka(onContinue) {
    const s = Storage.load();
    document.querySelectorAll('.screen').forEach(sc => sc.classList.remove('active'));
    document.getElementById('screen-kukacka').classList.add('active');

    const sub = document.getElementById('kukacka-sub');
    if (sub) {
      const h = s.celkemHodin;
      if (h === 1) sub.textContent = `Nasbíral jsi už 1 celou hodinu! 🎖️`;
      else if (h >= 2 && h <= 4) sub.textContent = `Nasbíral jsi už ${h} celé hodiny! 🏆`;
      else sub.textContent = `Nasbíral jsi už ${h} celých hodin! 👑`;
    }

    // Zvuk kukačky
    Sound.kukacka();

    // Vypálit hvězdičky ze středu obrazovky
    setTimeout(() => {
      const clock = document.querySelector('.kukacka-clock');
      if (clock) spawnStars(clock);
      setTimeout(() => spawnStars(clock), 300);
      setTimeout(() => spawnStars(clock), 600);
    }, 300);

    const btn = document.getElementById('btn-kukacka-continue');
    const handler = () => {
      btn.removeEventListener('click', handler);
      if (onContinue) onContinue();
    };
    btn.addEventListener('click', handler);
  },
};
