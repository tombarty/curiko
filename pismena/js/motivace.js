// ═══════════════════════════════════════════════════════════════════════════
// motivace.js — systém "Sbíráš písmena" (po 10 písmenech = 1 poklad)
// ═══════════════════════════════════════════════════════════════════════════

const GOAL = 10; // kolik písmen = 1 poklad

const Motivace = {
  // Přidá písmeno. Vrací {state, truhlaSpusti}.
  add(n = 1) {
    const s = Storage.load();
    s.aktualniPismena += n;
    let truhlaSpusti = false;
    if (s.aktualniPismena >= GOAL) {
      s.aktualniPismena -= GOAL;
      s.celkemPokladu += 1;
      truhlaSpusti = true;
    }
    s.celkemPismen += n;
    Storage.save(s);
    return { state: s, truhlaSpusti };
  },

  refreshUI() {
    const s = Storage.load();

    const now = document.getElementById('sbirka-now');
    if (now) now.textContent = s.aktualniPismena;
    const total = document.getElementById('sbirka-total');
    if (total) {
      if (s.celkemPokladu === 0) total.textContent = 'Celkem: 0 pokladů';
      else if (s.celkemPokladu === 1) total.textContent = 'Celkem: 1 poklad';
      else if (s.celkemPokladu < 5) total.textContent = `Celkem: ${s.celkemPokladu} poklady`;
      else total.textContent = `Celkem: ${s.celkemPokladu} pokladů`;
    }

    // Animace truhly: naplňuje se podle progresu
    const chest = document.getElementById('sbirka-chest');
    if (chest) {
      chest.textContent = s.aktualniPismena === 0 ? '🧰' :
                          s.aktualniPismena < 5 ? '📦' :
                          s.aktualniPismena < 9 ? '🎁' : '💎';
    }

    // Mini ve hře
    const miniTxt = document.getElementById('mini-sbirka-text');
    if (miniTxt) miniTxt.textContent = `${s.aktualniPismena}/${GOAL}`;
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
