// ═══════════════════════════════════════════════════════════════════════════
// motivace.js — mince → truhla (po 10)
// ═══════════════════════════════════════════════════════════════════════════

const GOAL = 10;

const Motivace = {
  add(n = 1) {
    const s = Storage.load();
    s.aktualniMince += n;
    let truhlaSpusti = false;
    if (s.aktualniMince >= GOAL) {
      s.aktualniMince -= GOAL;
      s.celkemPokladu += 1;
      truhlaSpusti = true;
    }
    s.celkemMinci += n;
    Storage.save(s);
    return { state: s, truhlaSpusti };
  },

  refreshUI() {
    const s = Storage.load();

    const now = document.getElementById('coins-now');
    if (now) now.textContent = s.aktualniMince;
    const total = document.getElementById('coins-total');
    if (total) {
      if (s.celkemPokladu === 0) total.textContent = 'Celkem: 0 pokladů';
      else if (s.celkemPokladu === 1) total.textContent = 'Celkem: 1 poklad';
      else if (s.celkemPokladu < 5) total.textContent = `Celkem: ${s.celkemPokladu} poklady`;
      else total.textContent = `Celkem: ${s.celkemPokladu} pokladů`;
    }

    // Truhla se podle progresu plní: 💰 → 💵 → 💎
    const chest = document.getElementById('coins-chest');
    if (chest) {
      chest.textContent = s.aktualniMince === 0 ? '💰' :
                          s.aktualniMince < 5 ? '💵' :
                          s.aktualniMince < 9 ? '💎' : '🏆';
    }

    const miniTxt = document.getElementById('mini-coins-text');
    if (miniTxt) miniTxt.textContent = `${s.aktualniMince}/${GOAL}`;
  },

  showTruhla(onContinue) {
    const s = Storage.load();
    document.querySelectorAll('.screen').forEach(sc => sc.classList.remove('active'));
    document.getElementById('screen-truhla').classList.add('active');

    const sub = document.getElementById('truhla-sub');
    if (sub) {
      if (s.celkemPokladu === 1) sub.textContent = 'Získal jsi svůj 1. poklad! 🏆';
      else if (s.celkemPokladu < 5) sub.textContent = `Získal jsi už ${s.celkemPokladu} poklady! 🌟`;
      else sub.textContent = `Získal jsi už ${s.celkemPokladu} pokladů! 👑`;
    }

    Sound.truhla();

    setTimeout(() => {
      const wrap = document.querySelector('.truhla-bounce');
      if (wrap) spawnStars(wrap);
      setTimeout(() => spawnStars(wrap), 300);
      setTimeout(() => spawnStars(wrap), 600);
    }, 300);

    const btn = document.getElementById('btn-truhla-continue');
    const handler = () => {
      btn.removeEventListener('click', handler);
      if (onContinue) onContinue();
    };
    btn.addEventListener('click', handler);
  },
};
