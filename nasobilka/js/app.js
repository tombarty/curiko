// ═══════════════════════════════════════════════════════════════════════════
// app.js — Druhákova násobilka (orchestrace)
// ═══════════════════════════════════════════════════════════════════════════

const QUESTIONS_PER_ROUND = 10;

const App = {
  currentMode: null,
  currentIndex: 0,
  correctCount: 0,
  wrongCount: 0,
  streak: 0,
  gainedCoins: 0,
  locked: false,
  recentKeys: [],
  mistakes: [],
  mistakeMode: false, // true = právě probíhá procvičování chyb
  pendingQueue: null, // předgenerované otázky pro mistake-mode

  init() {
    Sound.init();
    Motivace.refreshUI();

    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.click();
        this.startRound(btn.dataset.mode);
      });
    });

    document.getElementById('btn-back-menu').addEventListener('click', () => {
      Sound.click();
      this.showScreen('menu');
      Motivace.refreshUI();
    });
    document.getElementById('btn-play-again').addEventListener('click', () => {
      Sound.click();
      this.startRound(this.currentMode);
    });
    document.getElementById('btn-to-menu').addEventListener('click', () => {
      Sound.click();
      this.showScreen('menu');
      Motivace.refreshUI();
    });
    document.getElementById('btn-practice-mistakes').addEventListener('click', () => {
      Sound.click();
      this.startMistakeRound();
    });

    document.getElementById('footer-about').addEventListener('click', () => {
      this.showScreen('about');
      this._loadQR();
    });
    document.getElementById('btn-about-back').addEventListener('click', () => {
      this.showScreen(this._prevScreen || 'menu');
      Motivace.refreshUI();
    });
  },

  showScreen(name) {
    if (name !== 'about') this._prevScreen = name;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('screen-' + name);
    if (el) el.classList.add('active');
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
    this.gainedCoins = 0;
    this.locked = false;
    this.recentKeys = [];
    this.mistakes = [];
    this.mistakeMode = false;
    this.pendingQueue = null;

    const titles = {
      mul2: '✖️ Násobení × 2',
      mul3: '✖️ Násobení × 3',
      mul4: '✖️ Násobení × 4',
      div2: '➗ Dělení ÷ 2',
      div3: '➗ Dělení ÷ 3',
      div4: '➗ Dělení ÷ 4',
      mix: '🎲 Vše dohromady',
    };
    document.getElementById('topbar-title').textContent = titles[mode] || 'Úkol';
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = '0%';

    this.showScreen('game');
    Motivace.refreshUI();
    this.nextQuestion();
  },

  // Spustí kolo jen s chybnými otázkami
  startMistakeRound() {
    if (this.mistakes.length === 0) return;
    const queue = this.mistakes.slice();
    this.currentIndex = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.streak = 0;
    this.gainedCoins = 0;
    this.locked = false;
    this.recentKeys = [];
    this.mistakeMode = true;
    this.pendingQueue = queue;
    this.mistakes = []; // sbíráme případné nové chyby v tomto kole

    document.getElementById('topbar-title').textContent = '🔁 Procvič chyby';
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = '0%';

    this.showScreen('game');
    Motivace.refreshUI();
    this.nextQuestion();
  },

  nextQuestion() {
    const total = this.mistakeMode ? this.pendingQueue.length : QUESTIONS_PER_ROUND;

    if (this.currentIndex >= total) {
      this.showResults();
      return;
    }
    this.currentIndex++;
    document.getElementById('topbar-counter').textContent =
      `${this.currentIndex} / ${total}`;
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = ((this.currentIndex - 1) / total * 100) + '%';
    document.getElementById('feedback-line').className = 'feedback-line';
    document.getElementById('feedback-line').textContent = '';

    let q;
    if (this.mistakeMode) {
      // V chybovém režimu bereme rovnou předem uloženou otázku (closure na render zůstává)
      const item = this.pendingQueue[this.currentIndex - 1];
      q = { type: item.type, render: item.renderFn };
    } else {
      // Anti-opakování — max 20 pokusů
      for (let i = 0; i < 20; i++) {
        q = Games.generate(this.currentMode);
        if (!q.key || !this.recentKeys.includes(q.key)) break;
      }
      if (q.key) {
        this.recentKeys.push(q.key);
        if (this.recentKeys.length > 8) this.recentKeys.shift();
      }
    }

    const area = document.getElementById('game-area');
    area.classList.remove('shake');
    this.locked = false;
    q.render(area, (correct, btn, group, meta) => {
      if (!correct && meta) {
        // Uložíme chybnou otázku pro pozdější procvičení (funguje i v mistakeMode — sbíráme nové chyby)
        this.mistakes.push({ type: q.type, renderFn: q.render, meta });
      }
      this._onAnswer(correct, btn, group);
    });
  },

  _onAnswer(correct, clickedEl, group) {
    if (this.locked) return;
    this.locked = true;

    const feedback = document.getElementById('feedback-line');
    const area = document.getElementById('game-area');
    const total = this.mistakeMode ? this.pendingQueue.length : QUESTIONS_PER_ROUND;

    if (correct) {
      this.correctCount++;
      this.streak++;
      Sound.correct();
      spawnStars(area);

      const fill = document.getElementById('progress-fill');
      if (fill) fill.style.width = (this.currentIndex / total * 100) + '%';

      // Mince jen v normálním kole (ne při procvičování chyb — jinak by se dvojčítaly)
      let result = { truhlaSpusti: false };
      if (!this.mistakeMode) {
        result = Motivace.add(1);
        this.gainedCoins++;
        Motivace.refreshUI();
      }

      feedback.className = 'feedback-line correct-flash';
      feedback.innerHTML = this._streakMsg(this.streak);

      if (clickedEl && clickedEl.classList) clickedEl.classList.add('correct');
      if (group && group.querySelectorAll) {
        group.querySelectorAll('.opt-btn').forEach(b => b.classList.add('disabled'));
      }

      if (result.truhlaSpusti) {
        setTimeout(() => {
          Motivace.showTruhla(() => {
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
      // Zvýraznit správnou odpověď
      if (group && group.querySelectorAll) {
        // Tu správnou najdeme, ale nemáme přístup k meta tady — přijmeme to.
        // Správná bude zvýrazněna v renderu samotnou Games logikou (není aktuálně).
        // Necháme jednoduše disabled ostatní.
        group.querySelectorAll('.opt-btn').forEach(b => {
          if (!b.classList.contains('wrong')) b.classList.add('disabled');
        });
      }

      setTimeout(() => this.nextQuestion(), 1400);
    }
  },

  _streakMsg(streak) {
    if (streak >= 10) return '🦸 ÚŽASNÉ! Jsi počtářský mistr!';
    if (streak >= 8) return '👑 Skvělá série!';
    if (streak >= 6) return '💎 Wow, tak dál!';
    if (streak >= 5) return '🌟 Perfektní!';
    if (streak >= 4) return '⚡ Super!';
    if (streak >= 3) return '🔥 Jen tak dál!';
    if (streak >= 2) return '👍 Skvěle!';
    return '✓ Správně! 💰';
  },

  showResults() {
    this.showScreen('result');
    const total = this.correctCount + this.wrongCount;
    const ratio = total > 0 ? this.correctCount / total : 0;

    let stars = 1;
    if (ratio >= 0.95) stars = 5;
    else if (ratio >= 0.85) stars = 4;
    else if (ratio >= 0.70) stars = 3;
    else if (ratio >= 0.50) stars = 2;

    const emojiMap = { 5: '🏆', 4: '🌟', 3: '⭐', 2: '✨', 1: '💪' };
    document.getElementById('result-emoji').textContent = emojiMap[stars];
    document.getElementById('result-stars').textContent = '⭐'.repeat(stars) + '☆'.repeat(5 - stars);

    const totalQ = this.mistakeMode ? this.pendingQueue.length : QUESTIONS_PER_ROUND;
    document.getElementById('result-stats').textContent =
      `Správně: ${this.correctCount} z ${totalQ} · Chyby: ${this.wrongCount}`;

    const gain = this.gainedCoins;
    const gainEl = document.getElementById('result-gain');
    if (this.mistakeMode) {
      gainEl.textContent = this.wrongCount === 0
        ? '🎉 Všechny chyby opraveny!'
        : `Zbývá procvičit: ${this.mistakes.length}`;
    } else {
      gainEl.textContent = `+ ${gain} ${gain === 1 ? 'mince' : (gain < 5 ? 'mince' : 'mincí')}`;
    }

    // Tlačítko "Procvič chyby"
    const practiceBtn = document.getElementById('btn-practice-mistakes');
    if (this.mistakes.length > 0) {
      practiceBtn.style.display = '';
      practiceBtn.textContent = `🔁 Procvič chyby (${this.mistakes.length})`;
    } else {
      practiceBtn.style.display = 'none';
    }

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
