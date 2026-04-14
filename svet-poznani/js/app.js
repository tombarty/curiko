// ─── Stav aplikace ─────────────────────────────────────────────────────────

const LEVELS = [
  { id: 1, label: 'Úroveň 1', emoji: '🌲', chapters: [1, 2, 3, 4, 5] },
  { id: 2, label: 'Úroveň 2', emoji: '🏔️', chapters: [6, 7, 8, 9, 10] },
  { id: 3, label: 'Úroveň 3', emoji: '✨', chapters: [11, 12, 13, 14, 15, 16, 17] },
];

const App = {
  state: {
    nickname: '',
    theme: 'vesmir',
    currentChapter: 1,
    completedChapters: {},
    stars: 0,
    currentLevel: 1
  },

  // ─── Inicializace ─────────────────────────────────────────────────────────
  init() {
    Sound.init();
    this.createStarsBg();
    this.loadTheme();

    document.getElementById('theme-toggle').addEventListener('click', () => {
      Sound.click();
      this.toggleTheme();
    });

    const saved = Storage.load();
    if (saved) {
      document.getElementById('btn-continue').classList.remove('hidden');
    }

    document.getElementById('btn-new-game').addEventListener('click', () => {
      Sound.click();
      this.showThemeSelection();
    });

    document.getElementById('btn-continue').addEventListener('click', () => {
      Sound.click();
      this.state = saved;
      if (!this.state.currentLevel) this.state.currentLevel = 1;
      this.applyGameTheme(this.state.theme || 'vesmir');
      this.showLevels();
    });

    document.getElementById('btn-leaderboard').addEventListener('click', () => {
      Sound.click();
      this.showLeaderboard('screen-intro');
    });

    document.getElementById('btn-lb-back').addEventListener('click', () => {
      Sound.click();
      this.showScreen(this._lbReturnScreen || 'screen-intro');
    });

    document.getElementById('footer-about').addEventListener('click', () => {
      Sound.click();
      this.showAbout();
    });

    document.getElementById('btn-about-back').addEventListener('click', () => {
      Sound.click();
      this.showScreen('screen-intro');
    });

    document.getElementById('btn-theme-back').addEventListener('click', () => {
      Sound.click();
      this.showScreen('screen-intro');
    });

    document.getElementById('btn-nick-back').addEventListener('click', () => {
      Sound.click();
      this.showThemeSelection();
    });

    document.getElementById('btn-nickname-enter').addEventListener('click', () => {
      Sound.click();
      this.handleNicknameEnter();
    });

    document.getElementById('nickname-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') this.handleNicknameEnter();
    });

    document.getElementById('btn-back-map').addEventListener('click', () => {
      Sound.click();
            this.showMap();
    });

    document.getElementById('btn-back-to-map').addEventListener('click', () => {
      Sound.click();
      this.showMap();
    });

    document.getElementById('btn-back-levels').addEventListener('click', () => {
      Sound.click();
      this.showLevels();
    });

    document.getElementById('btn-levels-home').addEventListener('click', () => {
      Sound.click();
      this.showScreen('screen-intro');
    });

    document.getElementById('btn-levels-lb').addEventListener('click', () => {
      Sound.click();
      this.showLeaderboard('screen-levels');
    });

    document.getElementById('btn-map-lb').addEventListener('click', () => {
      Sound.click();
      this.showLeaderboard('screen-map');
    });

    document.getElementById('btn-arcade-back').addEventListener('click', () => {
      Arcade.stop();
      Sound.click();
      this.showLevels();
    });

    document.getElementById('btn-arcade-again').addEventListener('click', () => {
      Sound.click();
      document.getElementById('arcade-result').classList.add('hidden');
      this.showArcade(this._activeArcadeLevel);
    });

    document.getElementById('btn-arcade-levels').addEventListener('click', () => {
      Sound.click();
      document.getElementById('arcade-result').classList.add('hidden');
      this.showLevels();
    });

    this.showScreen('screen-intro');
  },

  // ─── Hvězdné pozadí ───────────────────────────────────────────────────────
  createStarsBg() {
    const container = document.getElementById('stars');
    for (let i = 0; i < 80; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      s.style.left = Math.random() * 100 + '%';
      s.style.top  = Math.random() * 100 + '%';
      const size = 1 + Math.random() * 2.5;
      s.style.width  = size + 'px';
      s.style.height = size + 'px';
      s.style.animationDelay    = Math.random() * 4 + 's';
      s.style.animationDuration = (2 + Math.random() * 3) + 's';
      container.appendChild(s);
    }
  },

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
  },

  // ─── Den/noc ──────────────────────────────────────────────────────────────
  loadTheme() {
    const t = localStorage.getItem('fantazie_theme') || 'dark';
    document.documentElement.dataset.theme = t;
    document.getElementById('theme-toggle').textContent = t === 'dark' ? '☀️' : '🌙';
  },

  toggleTheme() {
    const curr = document.documentElement.dataset.theme;
    const next = curr === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('fantazie_theme', next);
    document.getElementById('theme-toggle').textContent = next === 'dark' ? '☀️' : '🌙';
  },

  // ─── Herní téma (barvy, akcenty) ──────────────────────────────────────────
  applyGameTheme(themeId) {
    const t = THEMES[themeId] || THEMES.vesmir;
    const r = document.documentElement;
    r.setAttribute('data-game-theme', themeId);
    r.style.setProperty('--gold',  t.accent);
    r.style.setProperty('--teal',  t.accent2);
    r.style.setProperty('--glow-gold', `0 0 16px ${t.accent}55`);
    r.style.setProperty('--glow-teal', `0 0 16px ${t.accent2}55`);
  },

  // ─── Hodnost ──────────────────────────────────────────────────────────────
  getRank(stars) {
    const theme = THEMES[this.state.theme] || THEMES.vesmir;
    if (theme.ranks) {
      // Projdi od nejvyšší hodnosti dolů
      for (let i = theme.ranks.length - 1; i >= 0; i--) {
        if (stars >= theme.ranks[i].min) return theme.ranks[i];
      }
      return theme.ranks[0];
    }
    // Fallback
    if (stars >= 55) return { label: 'Mistr',  emoji: '🌟', color: '#f4c842' };
    if (stars >= 40) return { label: 'Hrdina', emoji: '⚔️', color: '#4fc3f7' };
    if (stars >= 25) return { label: 'Pokročilý', emoji: '🗡️', color: '#a5d6a7' };
    if (stars >= 10) return { label: 'Učeň',   emoji: '📚', color: '#ce93d8' };
    return { label: 'Nováček', emoji: '🌱', color: '#90a4ae' };
  },

  TOTAL_CHAPTERS: 17,

  // ═══════════════════════════════════════════════════════════════════════════
  // VÝBĚR TÉMATU
  // ═══════════════════════════════════════════════════════════════════════════
  showThemeSelection() {
    const keepNickname = this.state.nickname || '';
    this.state = { nickname: keepNickname, theme: 'vesmir', currentChapter: 1, completedChapters: {}, stars: 0, currentLevel: 1 };
    const grid = document.getElementById('theme-grid');
    grid.innerHTML = '';

    Object.values(THEMES).forEach(t => {
      const card = document.createElement('div');
      card.className = 'theme-card';
      card.style.setProperty('--tc-accent', t.accent);
      card.style.setProperty('--tc-bg', t.cardGradient);
      card.innerHTML = `
        <div class="tc-emoji">${t.emoji}</div>
        <div class="tc-name">${t.name}</div>
        <div class="tc-tagline">${t.tagline}</div>
      `;
      card.addEventListener('click', () => {
        Sound.click();
        this.selectGameTheme(t.id);
      });
      grid.appendChild(card);
    });

    this.showScreen('screen-theme');
  },

  selectGameTheme(themeId) {
    this.state.theme = themeId;
    this.applyGameTheme(themeId);
    Sound.unlock();
    if (this.state.nickname) {
      Storage.save(this.state);
      this.showLevels();
    } else {
      this.showNickname();
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PŘEZDÍVKA
  // ═══════════════════════════════════════════════════════════════════════════
  showNickname() {
    const theme = THEMES[this.state.theme] || THEMES.vesmir;
    document.getElementById('nickname-title').textContent = theme.nicknameTitle || '✨ Jak se jmenuješ?';
    document.getElementById('nickname-text').textContent = theme.nicknameText || 'Dokaž svou odvahu!';
    const input = document.getElementById('nickname-input');
    input.value = '';
    input.placeholder = theme.nicknamePlaceholder || 'Tvoje přezdívka...';
    document.getElementById('nickname-challenge').classList.add('hidden');
    document.getElementById('btn-nickname-enter').classList.remove('hidden');
    document.getElementById('btn-nickname-enter').textContent = '➡️ Vstoupit do dobrodružství';
    this._challengeAnswer = null;
    this.showScreen('screen-nickname');
  },

  handleNicknameEnter() {
    const input = document.getElementById('nickname-input');
    const name  = input.value.trim();
    if (!name) {
      input.classList.add('shake');
      setTimeout(() => input.classList.remove('shake'), 600);
      return;
    }
    const challenge = document.getElementById('nickname-challenge');
    if (challenge.classList.contains('hidden')) {
      this._showNicknameChallenge(name);
    }
  },

  _showNicknameChallenge(name) {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    this._challengeAnswer  = a + b;
    this._pendingNickname  = name;

    document.getElementById('challenge-text').innerHTML =
      `Spočítej správně a vstup do dobrodružství:<br><strong>${a} + ${b} = ?</strong>`;

    const ans    = this._challengeAnswer;
    const opts   = [ans, ans + 1, ans > 1 ? ans - 1 : ans + 2].sort(() => Math.random() - 0.5);
    const optsDiv = document.getElementById('challenge-options');
    optsDiv.innerHTML = opts
      .map(o => `<button class="opt-btn challenge-opt" data-val="${o}">${o}</button>`)
      .join('');

    optsDiv.querySelectorAll('.challenge-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.click();
        if (parseInt(btn.dataset.val) === this._challengeAnswer) {
          Sound.unlock();
          this.state.nickname = this._pendingNickname;
          Storage.save(this.state);
          this._showWelcome();
        } else {
          Sound.wrong();
          btn.classList.add('wrong');
          btn.disabled = true;
          setTimeout(() => { btn.classList.remove('wrong'); btn.disabled = false; }, 800);
        }
      });
    });

    document.getElementById('nickname-challenge').classList.remove('hidden');
    document.getElementById('btn-nickname-enter').classList.add('hidden');
  },

  _showWelcome() {
    const theme = THEMES[this.state.theme] || THEMES.vesmir;
    document.getElementById('nickname-challenge').innerHTML = `
      <div class="welcome-msg">
        <div class="welcome-emoji">${theme.emoji}</div>
        <p>Vítej, <strong>${this.state.nickname}</strong>!<br>${theme.tagline}</p>
      </div>
    `;
    spawnStars(document.getElementById('screen-nickname'));
    setTimeout(() => this.showLevels(), 1800);
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VÝBĚR ÚROVNĚ (LEVELU)
  // ═══════════════════════════════════════════════════════════════════════════
  showLevels() {
    const theme = THEMES[this.state.theme] || THEMES.vesmir;

    document.getElementById('levels-player-name').textContent = this.state.nickname;
    document.getElementById('levels-star-count').textContent = this.state.stars;
    document.getElementById('levels-title').textContent = theme.mapTitle || '🗺️ Vyber úroveň';

    const rank = this.getRank(this.state.stars);
    const rankEl = document.getElementById('levels-rank-badge');
    if (rankEl) {
      rankEl.textContent = `${rank.emoji} ${rank.label}`;
      rankEl.style.color = rank.color;
      rankEl.style.borderColor = rank.color;
      rankEl.style.background = rank.color + '22';
    }

    const grid = document.getElementById('levels-grid');
    grid.innerHTML = '';

    LEVELS.forEach(level => {
      const chapterIds = level.chapters;
      const done = chapterIds.filter(id => this.state.completedChapters[id]).length;
      const total = chapterIds.length;
      const allDone = done === total;

      // Level je odemknutý pokud: je to level 1, nebo předchozí level je kompletní
      const prevLevel = LEVELS.find(l => l.id === level.id - 1);
      const isUnlocked = level.id === 1 || (prevLevel && prevLevel.chapters.every(id => this.state.completedChapters[id]));

      const card = document.createElement('div');
      card.className = `level-card${allDone ? ' level-complete' : ''}${!isUnlocked ? ' level-locked' : ''}`;

      const starsInLevel = chapterIds.reduce((sum, id) => sum + (this.state.completedChapters[id] || 0), 0);
      const maxStars = total * 5;
      const progressPct = Math.round((done / total) * 100);

      card.innerHTML = `
        <div class="level-emoji">${isUnlocked ? (theme.levelIcons && theme.levelIcons[level.id - 1] || level.emoji) : '🔒'}</div>
        <div class="level-info">
          <div class="level-label">${(theme.levelLabels && theme.levelLabels[level.id - 1]) || level.label}</div>
          <div class="level-progress-bar">
            <div class="level-progress-fill" style="width:${progressPct}%"></div>
          </div>
          <div class="level-stats">${done}/${total} her · ⭐ ${starsInLevel}/${maxStars}</div>
        </div>
        ${allDone ? '<div class="level-check">✅</div>' : ''}
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          Sound.click();
          this.state.currentLevel = level.id;
          Storage.save(this.state);
          this.showMap();
        });
      }

      // Tlačítko arkády na dokončeném levelu
      if (allDone) {
        const arcBtn = document.createElement('button');
        arcBtn.className = 'level-arcade-btn';
        arcBtn.textContent = '🎮';
        arcBtn.title = Arcade.GAME_NAMES[Arcade.GAME_MAP[level.id]] || 'Bonusová hra';
        arcBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          Sound.click();
          this.showArcade(level.id);
        });
        card.appendChild(arcBtn);
      }

      grid.appendChild(card);
    });

    this.showScreen('screen-levels');
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MAPA (KAPITOLY JEDNOHO LEVELU)
  // ═══════════════════════════════════════════════════════════════════════════
  showMap() {
    const theme = THEMES[this.state.theme] || THEMES.vesmir;
    const level = LEVELS.find(l => l.id === (this.state.currentLevel || 1)) || LEVELS[0];
    const levelChapters = new Set(level.chapters);

    document.getElementById('player-name').textContent = this.state.nickname;
    document.getElementById('star-count').textContent  = this.state.stars;
    document.getElementById('map-title-label').textContent = `${level.emoji} ${level.label}`;

    const rank = this.getRank(this.state.stars);
    const rankEl = document.getElementById('rank-badge');
    if (rankEl) {
      rankEl.textContent       = `${rank.emoji} ${rank.label}`;
      rankEl.style.color       = rank.color;
      rankEl.style.borderColor = rank.color;
      rankEl.style.background  = rank.color + '22';
    }

    const done  = level.chapters.filter(id => this.state.completedChapters[id]).length;
    const pct   = Math.round((1 - done / level.chapters.length) * 100);
    const fill  = document.getElementById('tma-fill-map');
    if (fill) fill.style.width = pct + '%';
    const tmaLbl = document.getElementById('tma-pct-label');
    if (tmaLbl) tmaLbl.textContent = pct + '%';
    const dangerLbl = document.getElementById('danger-label');
    if (dangerLbl) dangerLbl.textContent = theme.dangerLabel;

    // Sestav mapu — velké karty na celou šířku
    const mapEl = document.getElementById('chapters-map');
    mapEl.innerHTML = '';

    const ids = level.chapters;

    ids.forEach((id, idx) => {
      const isCompleted = !!this.state.completedChapters[id];
      const isCurrent   = id === this.state.currentChapter;
      const isUnlocked  = id <= this.state.currentChapter;
      const stars       = this.state.completedChapters[id] || 0;

      const gt = STORY.getGame(id, this.state.theme);
      const gs = gameSubject(gt);
      const icons = theme.subjectIcons || {};
      const subjectKey = gs.subject === 'Matematika' ? 'math' : gs.subject === 'Čeština' ? 'czech' : 'english';
      const subjectEmoji = icons[subjectKey] || (subjectKey === 'math' ? '📐' : subjectKey === 'czech' ? '📖' : '🌍');

      const card = document.createElement('div');
      card.id = `map-step-${id}`;
      card.className = [
        'quest-card',
        isCompleted ? 'quest-done' : '',
        isCurrent   ? 'quest-active' : '',
        !isUnlocked ? 'quest-locked' : '',
      ].join(' ');

      const starsHtml = isCompleted
        ? `<div class="quest-stars">${'⭐'.repeat(stars)}${'☆'.repeat(5 - stars)}</div>`
        : isCurrent
        ? `<div class="quest-badge">▶ Další výzva!</div>`
        : '';

      card.innerHTML = `
        <div class="quest-left">
          <div class="quest-circle">
            ${isCurrent ? '<span class="quest-figurka">🧙</span>' : ''}
            <span class="quest-emoji">${isUnlocked ? subjectEmoji : '🔒'}</span>
          </div>
        </div>
        <div class="quest-right">
          <div class="quest-title">${isUnlocked ? STORY.title(id, this.state.theme) : '???'}</div>
          ${isUnlocked ? `<div class="quest-subject" style="color:${gs.color}">${gs.subject}</div>` : ''}
          ${starsHtml}
        </div>
        <div class="quest-num">${id}</div>
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => { Sound.click(); this.showChapter(id); });
      }

      mapEl.appendChild(card);

      // Spojovací čárka mezi kartami (ne za poslední)
      if (idx < ids.length - 1) {
        const connector = document.createElement('div');
        connector.className = 'quest-connector' + (isCompleted ? ' done' : '');
        mapEl.appendChild(connector);
      }
    });

    // Tlačítko arkády na mapě pokud je level hotový
    const allLevelDone = level.chapters.every(id => this.state.completedChapters[id]);
    if (allLevelDone) {
      const arcadeCard = document.createElement('div');
      arcadeCard.className = 'map-arcade-card';
      const gId = Arcade.GAME_MAP[level.id];
      const gName = Arcade.GAME_NAMES[gId] || 'Bonusová hra';
      const hiScore = (this.state.arcadeScores && this.state.arcadeScores[level.id]) || 0;
      arcadeCard.innerHTML = `
        <span class="map-arcade-emoji">🎮</span>
        <div class="map-arcade-info">
          <div class="map-arcade-title">${gName}</div>
          <div class="map-arcade-sub">${hiScore ? `Rekord: ${hiScore}` : 'Odměna za dokončení levelu!'}</div>
        </div>
      `;
      arcadeCard.addEventListener('click', () => {
        Sound.click();
        this.showArcade(level.id);
      });
      mapEl.appendChild(arcadeCard);
    }

    this.showScreen('screen-map');

    setTimeout(() => {
      const cur = document.getElementById(`map-step-${this.state.currentChapter}`);
      if (cur) cur.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 280);
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // KAPITOLA + PSACÍ STROJ
  // ═══════════════════════════════════════════════════════════════════════════
  showChapter(id) {
    const ch    = STORY.get(id);
    const theme = THEMES[this.state.theme] || THEMES.vesmir;
    if (!ch) return;
    this._activeChapter = ch;
    this._activeGameType = STORY.getGame(id, this.state.theme);

    const gs = gameSubject(this._activeGameType);
    const icons = theme.subjectIcons || {};
    const sk = gs.subject === 'Matematika' ? 'math' : gs.subject === 'Čeština' ? 'czech' : 'english';
    const chEmoji = icons[sk] || (sk === 'math' ? '📐' : sk === 'czech' ? '📖' : '🌍');

    document.getElementById('chapter-emoji').textContent  = chEmoji;
    document.getElementById('chapter-title').textContent  = STORY.title(id, this.state.theme);

    const badge = document.getElementById('subject-badge');
    badge.textContent      = gs.subject;
    badge.style.background = gs.color + '33';
    badge.style.color      = gs.color;
    badge.style.borderColor= gs.color;

    document.getElementById('chapter-result').classList.add('hidden');
    document.getElementById('game-container').innerHTML = '';

    const storyEl = document.getElementById('story-text');
    storyEl.innerHTML = '';

    const storyText = STORY.storyText(id, this.state.theme);
    this._chapterStartTime = Date.now();
    this.showScreen('screen-chapter');

    this.typewriter(storyEl, storyText, () => {
      this.showPlayButton(ch);
    });
  },

  showPlayButton(ch) {
    const gc = document.getElementById('game-container');
    gc.innerHTML = '';
    const gameType = this._activeGameType;
    const btn = document.createElement('button');
    btn.className = 'btn-primary play-btn fade-in';
    btn.innerHTML = '▶️ Hrát!';
    btn.addEventListener('click', () => {
      Sound.click();
      gc.innerHTML = '';
      Games.start(gc, gameType, score => this.onGameComplete(ch, score));
    });
    gc.appendChild(btn);
  },

  // ─── Psací stroj (postupné zobrazení textu) ───────────────────────────────
  typewriter(el, text, onDone) {
    el.innerHTML = '';
    el.classList.add('typewriter-wrap');

    const textSpan   = document.createElement('span');
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'tw-cursor';
    cursorSpan.textContent = '|';
    el.appendChild(textSpan);
    el.appendChild(cursorSpan);

    let i = 0;
    const speed = 38;

    const finish = () => {
      clearInterval(timer);
      textSpan.textContent = text;
      cursorSpan.remove();
      el.classList.remove('typewriter-wrap');
      el.style.cursor = '';
      el.removeEventListener('click', skip);
      setTimeout(() => onDone && onDone(), 600);
    };

    const skip = () => finish();
    el.addEventListener('click', skip, { once: true });
    el.style.cursor = 'pointer';
    el.title = 'Klikni pro přeskočení';

    const timer = setInterval(() => {
      textSpan.textContent = text.slice(0, ++i);
      if (i >= text.length) finish();
    }, speed);
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VÝSLEDEK HRY
  // ═══════════════════════════════════════════════════════════════════════════
  onGameComplete(ch, score) {
    const elapsed = Math.round((Date.now() - (this._chapterStartTime || Date.now())) / 1000);
    const prevStars = this.state.completedChapters[ch.id] || 0;
    const gained    = Math.max(0, score - prevStars);

    // Ulož statistiky
    if (!this.state.chapterStats) this.state.chapterStats = {};
    const prev = this.state.chapterStats[ch.id];
    if (!prev || score > prev.stars || (score === prev.stars && elapsed < prev.seconds)) {
      this.state.chapterStats[ch.id] = { stars: score, seconds: elapsed, date: new Date().toLocaleDateString('cs-CZ') };
    }

    // Zjisti, jestli level byl hotový PŘED tímto výsledkem
    const level = LEVELS.find(l => l.id === (this.state.currentLevel || 1)) || LEVELS[0];
    const levelWasDone = level.chapters.every(id => this.state.completedChapters[id]);

    if (score > prevStars) {
      this.state.completedChapters[ch.id] = score;
      this.state.stars += gained;
    }
    if (ch.id >= this.state.currentChapter) {
      this.state.currentChapter = Math.min(ch.id + 1, this.TOTAL_CHAPTERS);
    }
    Storage.save(this.state);

    const levelJustCompleted = !levelWasDone && level.chapters.every(id => this.state.completedChapters[id]);

    document.getElementById('game-container').innerHTML = '';
    const result  = document.getElementById('chapter-result');
    const textEl  = document.getElementById('result-text');
    const starsEl = document.getElementById('stars-earned');

    // Vyčisti staré dynamické prvky (arkádové tlačítko, finální shrnutí)
    result.querySelectorAll('.arcade-reward-btn, .finale-summary').forEach(el => el.remove());

    Sound.unlock();
    spawnStars(result);
    setTimeout(() => spawnStars(result), 400);

    const rank   = this.getRank(this.state.stars);
    const theme  = THEMES[this.state.theme] || THEMES.vesmir;
    // Zjisti, jestli je vše hotovo
    const allDone = Object.keys(this.state.completedChapters).length >= this.TOTAL_CHAPTERS;

    const rewardText = allDone
      ? `🏆 Dokončil jsi celé dobrodružství! ${theme.emoji}`
      : levelJustCompleted
      ? `🎉 ${level.label} dokončena! Nová úroveň odemčena! 🔓`
      : `Příběh pokračuje — jsi o krok blíž k cíli! ${theme.emoji}`;

    const effMsg = score === 5 ? '🏆 Perfektní! Žádná chyba!'
                : score >= 4  ? '⭐ Skvělá práce!'
                : score >= 3  ? '👍 Dobře zvládnuto!'
                :               '💪 Vydržel jsi a dokázal to!';

    // Tematická hláška
    const msgs = (theme.messages && theme.messages.length) ? theme.messages : FALLBACK_MESSAGES;
    const funnyQuote = msgs[Math.floor(Math.random() * msgs.length)];

    textEl.innerHTML = `
      <div class="result-success">
        <div class="result-big-emoji">🎉</div>
        <p>${rewardText}</p>
      </div>
    `;
    starsEl.innerHTML = `
      <div class="result-stars">${'⭐'.repeat(score)}${'☆'.repeat(5 - score)}</div>
      <div class="result-score">${effMsg}</div>
      <div class="result-rank" style="color:${rank.color}">
        ${rank.emoji} Hodnost: <strong>${rank.label}</strong>
      </div>
      <div class="result-quote">${funnyQuote}</div>
    `;

    // Pokud vše dokončeno — přidej závěrečné shrnutí
    if (allDone) {
      const stats = this.state.chapterStats || {};
      const totalStars = Object.values(stats).reduce((a, s) => a + s.stars, 0);
      const totalTime  = Object.values(stats).reduce((a, s) => a + s.seconds, 0);
      const tMin = Math.floor(totalTime / 60);
      const tSec = totalTime % 60;

      const finaleDiv = document.createElement('div');
      finaleDiv.className = 'finale-summary fade-in';
      finaleDiv.innerHTML = `
        <div class="finale-title">🎊 GRATULUJEME! 🎊</div>
        <p>Prošel jsi všech <strong>${this.TOTAL_CHAPTERS}</strong> kapitol!</p>
        <div class="finale-stats">
          <div>⭐ Celkem hvězd: <strong>${totalStars}</strong> / ${this.TOTAL_CHAPTERS * 5}</div>
          <div>⏱ Celkový čas: <strong>${tMin}m ${tSec}s</strong></div>
          <div>${rank.emoji} Hodnost: <strong>${rank.label}</strong></div>
        </div>
        <button class="btn-primary" id="btn-show-final-lb">🏆 Zobrazit výsledky</button>
      `;
      result.appendChild(finaleDiv);

      setTimeout(() => {
        document.getElementById('btn-show-final-lb')?.addEventListener('click', () => {
          Sound.click();
          this.showLeaderboard('screen-map');
        });
      }, 100);
    }

    // Arkádová odměna — jen když level právě teď dokončen
    if (levelJustCompleted) {
      const arcadeBtn = document.createElement('button');
      arcadeBtn.className = 'btn-primary arcade-reward-btn';
      arcadeBtn.innerHTML = '🎮 Hrát bonusovou hru!';
      arcadeBtn.addEventListener('click', () => {
        Sound.click();
        this.showArcade(level.id);
      });
      result.appendChild(arcadeBtn);
    }

    result.classList.remove('hidden');
    result.classList.add('fade-in');
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ARKÁDOVÉ HRY (ODMĚNA ZA LEVEL)
  // ═══════════════════════════════════════════════════════════════════════════
  showArcade(levelId) {
    this._activeArcadeLevel = levelId;
    const gameId = Arcade.GAME_MAP[levelId];
    const gameName = Arcade.GAME_NAMES[gameId] || 'Bonusová hra';
    document.getElementById('arcade-title').textContent = `🎮 ${gameName}`;
    document.getElementById('arcade-result').classList.add('hidden');

    this.showScreen('screen-arcade');

    const container = document.getElementById('arcade-container');
    container.innerHTML = '';
    Arcade.start(container, gameId, (score) => {
      this.onArcadeComplete(levelId, score);
    });
  },

  onArcadeComplete(levelId, score) {
    if (!this.state.arcadeScores) this.state.arcadeScores = {};
    const prev = this.state.arcadeScores[levelId] || 0;
    if (score > prev) this.state.arcadeScores[levelId] = score;
    Storage.save(this.state);

    const result = document.getElementById('arcade-result');
    const textEl = document.getElementById('arcade-result-text');

    spawnStars(result);

    const isNew = score > prev;
    textEl.innerHTML = `
      <div class="result-success">
        <div class="result-big-emoji">🎮</div>
        <p>Skóre: <strong>${score}</strong>${isNew ? ' — nový rekord!' : ''}</p>
        ${prev > 0 && !isNew ? `<p style="font-size:13px;color:var(--text-sub)">Rekord: ${prev}</p>` : ''}
      </div>
    `;

    result.classList.remove('hidden');
    result.classList.add('fade-in');
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ŽEBŘÍČEK
  // ═══════════════════════════════════════════════════════════════════════════
  showAbout() {
    const qrEl = document.getElementById('about-qr');
    // Vygenerovat QR kód jen jednou
    if (qrEl && !qrEl.dataset.generated && typeof qrcode !== 'undefined') {
      const spd = 'SPD*1.0*ACC:CZ8262106701002211168451*AM:30*CC:CZK*MSG:Kafe pro autora';
      try {
        const qr = qrcode(0, 'M');
        qr.addData(spd);
        qr.make();
        qrEl.innerHTML = qr.createImgTag(5, 0);
        qrEl.dataset.generated = '1';
      } catch (e) {
        qrEl.innerHTML = '<div style="color:#900;padding:20px">QR kód se nepodařilo vytvořit</div>';
      }
    }
    this.showScreen('screen-about');
  },

  showLeaderboard(returnTo) {
    this._lbReturnScreen = returnTo || 'screen-intro';
    const content = document.getElementById('lb-content');
    const stats = (this.state && this.state.chapterStats) || {};
    const saved = Storage.load();
    const allStats = stats && Object.keys(stats).length ? stats : (saved && saved.chapterStats) || {};

    if (!Object.keys(allStats).length) {
      content.innerHTML = '<div class="lb-empty">Zatím žádné výsledky. Zahraj si a vrať se! 🎮</div>';
      this.showScreen('screen-leaderboard');
      return;
    }

    const theme = (this.state && this.state.theme) || (saved && saved.theme) || 'vesmir';

    let html = '<div class="lb-list">';
    for (let id = 1; id <= this.TOTAL_CHAPTERS; id++) {
      const s = allStats[id];
      const title = STORY.title(id, theme);
      const ch = STORY.get(id);
      if (!s) {
        html += `
          <div class="lb-row lb-locked">
            <span class="lb-num">${id}</span>
            <span class="lb-emoji">🔒</span>
            <span class="lb-name">${title}</span>
            <span class="lb-result">—</span>
          </div>`;
        continue;
      }
      const starsHtml = '⭐'.repeat(s.stars) + '☆'.repeat(5 - s.stars);
      const min = Math.floor(s.seconds / 60);
      const sec = s.seconds % 60;
      const timeStr = min > 0 ? `${min}m ${sec}s` : `${sec}s`;
      html += `
        <div class="lb-row">
          <span class="lb-num">${id}</span>
          <span class="lb-emoji">${(() => { const g = STORY.getGame(id, theme); const gs = gameSubject(g); return gs.subject === 'Matematika' ? '📐' : gs.subject === 'Čeština' ? '📖' : '🌍'; })()}</span>
          <span class="lb-name">${title}</span>
          <span class="lb-stars">${starsHtml}</span>
          <span class="lb-time">⏱ ${timeStr}</span>
          <span class="lb-date">${s.date || ''}</span>
        </div>`;
    }
    html += '</div>';

    // Souhrn
    const totalStars = Object.values(allStats).reduce((a, s) => a + s.stars, 0);
    const totalTime = Object.values(allStats).reduce((a, s) => a + s.seconds, 0);
    const tMin = Math.floor(totalTime / 60);
    const tSec = totalTime % 60;
    html += `
      <div class="lb-summary">
        <div>⭐ Celkem hvězd: <strong>${totalStars}</strong></div>
        <div>⏱ Celkový čas: <strong>${tMin}m ${tSec}s</strong></div>
        <div>📊 Dokončeno: <strong>${Object.keys(allStats).length} / ${this.TOTAL_CHAPTERS}</strong></div>
      </div>`;

    content.innerHTML = html;
    this.showScreen('screen-leaderboard');
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
