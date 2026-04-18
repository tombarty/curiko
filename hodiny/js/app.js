// ═══════════════════════════════════════════════════════════════════════════
// app.js — hlavní orchestrace (routing obrazovek, herní smyčka)
// ═══════════════════════════════════════════════════════════════════════════

const QUESTIONS_PER_ROUND = 7;

const App = {
  currentMode: null,
  currentIndex: 0,
  correctCount: 0,
  wrongCount: 0,
  streak: 0,
  gainedMinutky: 0,
  locked: false,
  recentKeys: [],

  init() {
    Sound.init();
    Motivace.refreshUI();

    // Menu — kliky na módy
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.click();
        const mode = btn.dataset.mode;
        this.startRound(mode);
      });
    });

    // Učení
    document.getElementById('btn-teach').addEventListener('click', () => {
      Sound.click();
      Teach.start();
    });
    document.getElementById('btn-teach-prev').addEventListener('click', () => Teach.prev());
    document.getElementById('btn-teach-next').addEventListener('click', () => Teach.next());
    document.getElementById('btn-teach-back').addEventListener('click', () => {
      Sound.click();
      this.showScreen('menu');
      Motivace.refreshUI();
    });

    // Tlačítka zpět
    document.getElementById('btn-back-menu').addEventListener('click', () => {
      Sound.click();
      this.showScreen('menu');
      Motivace.refreshUI();
    });

    // Výsledky
    document.getElementById('btn-play-again').addEventListener('click', () => {
      Sound.click();
      this.startRound(this.currentMode);
    });
    document.getElementById('btn-to-menu').addEventListener('click', () => {
      Sound.click();
      this.showScreen('menu');
      Motivace.refreshUI();
    });

    // Autor hry
    document.getElementById('footer-about').addEventListener('click', () => {
      this.showScreen('about');
      this._loadQR();
    });
    document.getElementById('btn-about-back').addEventListener('click', () => {
      // Vrátit se tam odkud jsme přišli — default: menu
      this.showScreen(this._prevScreen || 'menu');
      Motivace.refreshUI();
    });
  },

  showScreen(name) {
    if (name !== 'about') this._prevScreen = name;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('screen-' + name);
    if (el) el.classList.add('active');
    // Resetuj scroll — synchronně a znovu po layoutu (pro mobilní Safari)
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    });
  },

  startRound(mode) {
    this.currentMode = mode;
    this.currentIndex = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.streak = 0;
    this.gainedMinutky = 0;
    this.locked = false;
    this.recentKeys = [];

    // Nastav topbar title
    const titles = {
      match: '🕐 Přiřaď čas',
      'set-hands': '🎯 Nastav ručičky',
      words: '💬 Slovně → čas',
      ampm: '🌓 Dopo / odpoledne',
      minutes: '⏱️ Jen minuty',
      'day-night': '🌙 Den či noc?',
      mix: '🎲 Vše dohromady',
    };
    document.getElementById('topbar-title').textContent = titles[mode] || 'Úkol';
    const fill0 = document.getElementById('progress-fill');
    if (fill0) fill0.style.width = '0%';

    this.showScreen('game');
    Motivace.refreshUI();
    this.nextQuestion();
  },

  nextQuestion() {
    if (this.currentIndex >= QUESTIONS_PER_ROUND) {
      this.showResults();
      return;
    }
    this.currentIndex++;
    document.getElementById('topbar-counter').textContent =
      `${this.currentIndex} / ${QUESTIONS_PER_ROUND}`;
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = ((this.currentIndex - 1) / QUESTIONS_PER_ROUND * 100) + '%';
    document.getElementById('feedback-line').className = 'feedback-line';
    document.getElementById('feedback-line').textContent = '';

    // Zkusíme vygenerovat otázku, která nedávno nebyla. Max 20 pokusů.
    let q;
    for (let i = 0; i < 20; i++) {
      q = Games.generate(this.currentMode, this.correctCount);
      if (!q.key || !this.recentKeys.includes(q.key)) break;
    }
    if (q.key) {
      this.recentKeys.push(q.key);
      // Udržujeme posledních 5 klíčů
      if (this.recentKeys.length > 5) this.recentKeys.shift();
    }
    const area = document.getElementById('game-area');
    area.classList.remove('shake');
    this.locked = false;
    q.render(area, (correct, btn, group) => this._onAnswer(correct, btn, group));
  },

  _onAnswer(correct, clickedEl, group) {
    if (this.locked) return;
    this.locked = true;

    const feedback = document.getElementById('feedback-line');
    const area = document.getElementById('game-area');

    if (correct) {
      this.correctCount++;
      this.streak++;
      Sound.correct();
      spawnStars(area);

      const fill = document.getElementById('progress-fill');
      if (fill) fill.style.width = (this.currentIndex / QUESTIONS_PER_ROUND * 100) + '%';

      // Přidat minutku
      const result = Motivace.addMinutka(1);
      this.gainedMinutky++;
      Motivace.refreshUI();

      feedback.className = 'feedback-line correct-flash';
      feedback.innerHTML = this._streakMsg(this.streak);

      // Zvýraznit správné tlačítko
      if (clickedEl && clickedEl.classList) {
        clickedEl.classList.add('correct');
      }
      if (group && group.querySelectorAll) {
        group.querySelectorAll('.opt-btn, .btn-confirm').forEach(b => b.classList.add('disabled'));
      }

      // Pokud se odemkla celá hodina — kukačka
      if (result.kukackaSpusti) {
        setTimeout(() => {
          Motivace.showKukacka(() => {
            Motivace.refreshUI();
            this.showScreen('game');
            setTimeout(() => this.nextQuestion(), 200);
          });
        }, 900);
        return;
      }

      setTimeout(() => this.nextQuestion(), 900);

    } else {
      this.wrongCount++;
      this.streak = 0;
      Sound.wrong();
      area.classList.add('shake');
      setTimeout(() => area.classList.remove('shake'), 600);

      feedback.className = 'feedback-line wrong-flash';
      feedback.innerHTML = 'Nevadí! 💪 Zkus to znovu.';

      if (clickedEl && clickedEl.classList) {
        clickedEl.classList.add('wrong', 'disabled');
      }

      // U drag her necháme dítě zkusit znovu (ne přidat otázku, ale umožnit opravu)
      if (this.currentMode === 'set-hands' || (clickedEl && clickedEl.classList.contains('btn-confirm'))) {
        // Odznačit po chvíli a povolit další pokus
        setTimeout(() => {
          if (clickedEl) clickedEl.classList.remove('wrong', 'disabled');
          feedback.className = 'feedback-line';
          feedback.textContent = '';
          this.locked = false;
        }, 900);
      } else {
        // U klikacích her — ukázat správnou + pokračovat
        setTimeout(() => this.nextQuestion(), 1200);
      }
    }
  },

  _streakMsg(streak) {
    if (streak >= 10) return '🦸 ÚŽASNÉ! Jsi hodinový mistr!';
    if (streak >= 8) return '👑 Skvělá série!';
    if (streak >= 6) return '💎 Wow, tak dál!';
    if (streak >= 5) return '🌟 Perfektní!';
    if (streak >= 4) return '⚡ Super!';
    if (streak >= 3) return '🔥 Jen tak dál!';
    if (streak >= 2) return '👍 Skvěle!';
    return '✓ Správně! ✨';
  },

  showResults() {
    this.showScreen('result');
    const total = this.correctCount + this.wrongCount;
    const ratio = total > 0 ? this.correctCount / total : 0;

    // Hvězdičky podle procenta úspěšnosti
    let stars = 1;
    if (ratio >= 0.95) stars = 5;
    else if (ratio >= 0.85) stars = 4;
    else if (ratio >= 0.70) stars = 3;
    else if (ratio >= 0.50) stars = 2;

    const emojiMap = { 5: '🏆', 4: '🌟', 3: '⭐', 2: '✨', 1: '💪' };
    document.getElementById('result-emoji').textContent = emojiMap[stars];
    document.getElementById('result-stars').textContent = '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
    document.getElementById('result-stats').textContent =
      `Správně: ${this.correctCount} / ${QUESTIONS_PER_ROUND}`;
    document.getElementById('result-gain').textContent =
      `+ ${this.gainedMinutky} ${this.gainedMinutky === 1 ? 'minutka' : (this.gainedMinutky < 5 ? 'minutky' : 'minutek')}`;

    Motivace.refreshUI();
  },

  _loadQR() {
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
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());
