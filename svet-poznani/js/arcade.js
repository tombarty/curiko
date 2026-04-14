// ─── Arkádové hry — odměna za dokončení levelu ──────────────────────────────

const Arcade = {
  canvas: null,
  ctx: null,
  animFrame: null,
  running: false,
  gameId: null,
  currentGame: null,
  onComplete: null,
  _keyHandler: null,
  _lastTime: 0,

  GAME_MAP: {
    1: 'snake',
    2: 'flappy',
    3: 'breakout'
  },

  GAME_NAMES: {
    snake:    '🐍 Had',
    flappy:   '🐦 Flappy Falkor',
    breakout: '🧱 Rozbij cihly'
  },

  // ─── Životní cyklus ───────────────────────────────────────────────────────

  start(container, gameId, onComplete) {
    this.stop();
    this.gameId = gameId;
    this.onComplete = onComplete;
    this.running = false;

    // Vytvoř canvas
    container.innerHTML = '';
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = 'width:100%;max-width:400px;border-radius:12px;border:2px solid var(--border);touch-action:none;';
    container.appendChild(this.canvas);

    const w = this.canvas.clientWidth || 360;
    const ratio = window.devicePixelRatio || 1;
    this.canvas.width = w * ratio;
    this.canvas.height = w * 1.33 * ratio;
    this.canvas.style.height = (w * 1.33) + 'px';
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(ratio, ratio);
    this.W = w;
    this.H = w * 1.33;

    // Barvy z CSS
    const s = getComputedStyle(document.documentElement);
    this.colors = {
      bg:    s.getPropertyValue('--card').trim() || '#14143a',
      gold:  s.getPropertyValue('--gold').trim() || '#f4c842',
      teal:  s.getPropertyValue('--teal').trim() || '#4fc3f7',
      red:   s.getPropertyValue('--red').trim()  || '#ef5350',
      green: s.getPropertyValue('--green').trim() || '#66bb6a',
      text:  s.getPropertyValue('--text').trim()  || '#e8e8ff',
      sub:   s.getPropertyValue('--text-sub').trim() || '#8888bb',
      border:s.getPropertyValue('--border').trim() || '#2a2a6a'
    };

    // Vyber hru
    if (gameId === 'snake')    this.currentGame = SnakeGame;
    if (gameId === 'flappy')   this.currentGame = FlappyGame;
    if (gameId === 'breakout') this.currentGame = BreakoutGame;

    this.currentGame.init(this);
    this._showStartScreen();
  },

  stop() {
    this.running = false;
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    this.animFrame = null;
    if (this._keyHandler) document.removeEventListener('keydown', this._keyHandler);
    this._keyHandler = null;
    this._removeTouchListeners();
  },

  _showStartScreen() {
    const ctx = this.ctx;
    const W = this.W, H = this.H;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = this.colors.bg;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = this.colors.gold;
    ctx.font = 'bold 28px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(Arcade.GAME_NAMES[this.gameId], W / 2, H * 0.35);

    ctx.fillStyle = this.colors.text;
    ctx.font = '16px Nunito, sans-serif';
    const instr = this.currentGame.instruction || '';
    ctx.fillText(instr, W / 2, H * 0.45);

    ctx.fillStyle = this.colors.sub;
    ctx.font = '14px Nunito, sans-serif';
    ctx.fillText('Klepni pro start', W / 2, H * 0.6);

    // Čekej na klepnutí/klávesu
    const startGame = () => {
      this.canvas.removeEventListener('pointerdown', startGame);
      document.removeEventListener('keydown', startOnKey);
      this._startLoop();
    };
    const startOnKey = (e) => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space',' '].includes(e.key)) {
        e.preventDefault();
        startGame();
      }
    };
    this.canvas.addEventListener('pointerdown', startGame, { once: true });
    document.addEventListener('keydown', startOnKey);
  },

  _startLoop() {
    this.running = true;
    this._lastTime = performance.now();
    this._setupInputs();
    this._loop();
  },

  _loop() {
    if (!this.running) return;
    const now = performance.now();
    const dt = (now - this._lastTime) / 1000;
    this._lastTime = now;

    this.currentGame.update(Math.min(dt, 0.1));
    this.currentGame.draw(this.ctx, this.W, this.H);

    this.animFrame = requestAnimationFrame(() => this._loop());
  },

  gameOver(score) {
    this.stop();
    if (this.onComplete) this.onComplete(score);
  },

  // ─── Vstupy ───────────────────────────────────────────────────────────────

  _setupInputs() {
    // Klávesnice
    this._keyHandler = (e) => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) {
        e.preventDefault();
        this.currentGame.onKey && this.currentGame.onKey(e.key);
      }
    };
    document.addEventListener('keydown', this._keyHandler);

    // Dotyk
    this._onPointerDown = (e) => {
      e.preventDefault();
      const r = this.canvas.getBoundingClientRect();
      this._touchStartX = e.clientX - r.left;
      this._touchStartY = e.clientY - r.top;
      this._touchX = this._touchStartX;
      this._touchY = this._touchStartY;
      this.currentGame.onTouchStart && this.currentGame.onTouchStart(this._touchX, this._touchY, this.W, this.H);
    };
    this._onPointerMove = (e) => {
      e.preventDefault();
      const r = this.canvas.getBoundingClientRect();
      this._touchX = e.clientX - r.left;
      this._touchY = e.clientY - r.top;
      this.currentGame.onTouchMove && this.currentGame.onTouchMove(this._touchX, this._touchY, this.W, this.H);
    };
    this._onPointerUp = (e) => {
      e.preventDefault();
      const dx = this._touchX - this._touchStartX;
      const dy = this._touchY - this._touchStartY;
      if (Math.abs(dx) > 20 || Math.abs(dy) > 20) {
        if (Math.abs(dx) > Math.abs(dy)) {
          this.currentGame.onSwipe && this.currentGame.onSwipe(dx > 0 ? 'right' : 'left');
        } else {
          this.currentGame.onSwipe && this.currentGame.onSwipe(dy > 0 ? 'down' : 'up');
        }
      }
      this.currentGame.onTouchEnd && this.currentGame.onTouchEnd();
    };
    this.canvas.addEventListener('pointerdown', this._onPointerDown);
    this.canvas.addEventListener('pointermove', this._onPointerMove);
    this.canvas.addEventListener('pointerup', this._onPointerUp);
  },

  _removeTouchListeners() {
    if (this.canvas) {
      this.canvas.removeEventListener('pointerdown', this._onPointerDown);
      this.canvas.removeEventListener('pointermove', this._onPointerMove);
      this.canvas.removeEventListener('pointerup', this._onPointerUp);
    }
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// HRA 1: HAD (SNAKE)
// ═════════════════════════════════════════════════════════════════════════════

const SnakeGame = {
  instruction: 'Sbírej hvězdy! Ovládej tahem prstu.',
  GRID: 15,
  snake: [],
  dir: { x: 1, y: 0 },
  nextDir: { x: 1, y: 0 },
  food: null,
  score: 0,
  tickInterval: 0.18,
  tickTimer: 0,
  gameEnded: false,

  init(arcade) {
    this.arcade = arcade;
    this.score = 0;
    this.tickInterval = 0.18;
    this.tickTimer = 0;
    this.gameEnded = false;
    this.dir = { x: 1, y: 0 };
    this.nextDir = { x: 1, y: 0 };

    const mid = Math.floor(this.GRID / 2);
    this.snake = [
      { x: mid, y: mid },
      { x: mid - 1, y: mid },
      { x: mid - 2, y: mid }
    ];
    this.spawnFood();
  },

  spawnFood() {
    const occupied = new Set(this.snake.map(s => `${s.x},${s.y}`));
    let x, y;
    do {
      x = Math.floor(Math.random() * this.GRID);
      y = Math.floor(Math.random() * this.GRID);
    } while (occupied.has(`${x},${y}`));
    this.food = { x, y };
  },

  onKey(key) {
    const map = {
      ArrowUp:    { x: 0, y: -1 },
      ArrowDown:  { x: 0, y: 1 },
      ArrowLeft:  { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 }
    };
    const d = map[key];
    if (d && (d.x + this.dir.x !== 0 || d.y + this.dir.y !== 0)) {
      this.nextDir = d;
    }
  },

  onSwipe(dir) {
    const map = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
    const d = map[dir];
    if (d && (d.x + this.dir.x !== 0 || d.y + this.dir.y !== 0)) {
      this.nextDir = d;
    }
  },

  update(dt) {
    if (this.gameEnded) return;
    this.tickTimer += dt;
    if (this.tickTimer < this.tickInterval) return;
    this.tickTimer = 0;

    this.dir = { ...this.nextDir };
    const head = this.snake[0];
    const nx = head.x + this.dir.x;
    const ny = head.y + this.dir.y;

    // Kolize se zdí nebo sebou
    if (nx < 0 || nx >= this.GRID || ny < 0 || ny >= this.GRID ||
        this.snake.some(s => s.x === nx && s.y === ny)) {
      this.gameEnded = true;
      Sound.wrong();
      setTimeout(() => this.arcade.gameOver(this.score), 1200);
      return;
    }

    this.snake.unshift({ x: nx, y: ny });

    if (nx === this.food.x && ny === this.food.y) {
      this.score++;
      Sound.correct();
      this.tickInterval = Math.max(0.07, this.tickInterval - 0.003);
      this.spawnFood();
    } else {
      this.snake.pop();
    }
  },

  draw(ctx, W, H) {
    const c = this.arcade.colors;
    const cell = Math.floor(Math.min(W, H * 0.75) / this.GRID);
    const ox = Math.floor((W - cell * this.GRID) / 2);
    const oy = 50;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = c.bg;
    ctx.fillRect(0, 0, W, H);

    // Skóre
    ctx.fillStyle = c.gold;
    ctx.font = 'bold 20px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`⭐ ${this.score}`, W / 2, 32);

    // Mřížka
    ctx.fillStyle = c.border + '44';
    for (let x = 0; x <= this.GRID; x++) {
      ctx.fillRect(ox + x * cell, oy, 1, cell * this.GRID);
    }
    for (let y = 0; y <= this.GRID; y++) {
      ctx.fillRect(ox, oy + y * cell, cell * this.GRID, 1);
    }

    // Jídlo
    ctx.fillStyle = c.gold;
    ctx.beginPath();
    ctx.arc(ox + this.food.x * cell + cell / 2, oy + this.food.y * cell + cell / 2, cell * 0.35, 0, Math.PI * 2);
    ctx.fill();

    // Had
    this.snake.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? c.teal : c.green;
      const r = cell * 0.1;
      const x = ox + s.x * cell + 1;
      const y = oy + s.y * cell + 1;
      const w = cell - 2;
      ctx.beginPath();
      ctx.roundRect(x, y, w, w, r);
      ctx.fill();
    });

    // Game over
    if (this.gameEnded) {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = c.gold;
      ctx.font = 'bold 28px Nunito, sans-serif';
      ctx.fillText('Konec hry!', W / 2, H * 0.4);
      ctx.fillStyle = c.text;
      ctx.font = '20px Nunito, sans-serif';
      ctx.fillText(`Skóre: ${this.score}`, W / 2, H * 0.5);
    }
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// HRA 2: FLAPPY FALKOR
// ═════════════════════════════════════════════════════════════════════════════

const FlappyGame = {
  instruction: 'Klepej pro let nahoru! Proletíš mezerami?',
  birdY: 0,
  birdVY: 0,
  pipes: [],
  score: 0,
  pipeTimer: 0,
  gameEnded: false,
  GRAVITY: 600,
  FLAP: -220,
  PIPE_SPEED: 120,
  PIPE_GAP: 110,
  PIPE_W: 45,
  BIRD_R: 14,

  init(arcade) {
    this.arcade = arcade;
    this.birdY = arcade.H * 0.4;
    this.birdVY = 0;
    this.pipes = [];
    this.score = 0;
    this.pipeTimer = 1.5;
    this.gameEnded = false;
    this.PIPE_SPEED = 120;
  },

  flap() {
    if (this.gameEnded) return;
    this.birdVY = this.FLAP;
    Sound.click();
  },

  onKey(key) {
    if (key === ' ' || key === 'ArrowUp') this.flap();
  },

  onTouchStart() { this.flap(); },

  update(dt) {
    if (this.gameEnded) return;

    // Gravitace
    this.birdVY += this.GRAVITY * dt;
    this.birdY += this.birdVY * dt;

    const W = this.arcade.W;
    const H = this.arcade.H;
    const bx = 60;

    // Zemřel nahoře/dole
    if (this.birdY < this.BIRD_R || this.birdY > H - this.BIRD_R) {
      this._die();
      return;
    }

    // Spawn trubek
    this.pipeTimer += dt;
    if (this.pipeTimer >= 1.8) {
      this.pipeTimer = 0;
      const gapY = 80 + Math.random() * (H - 200);
      this.pipes.push({ x: W + this.PIPE_W, gapY, scored: false });
    }

    // Pohyb trubek
    for (let i = this.pipes.length - 1; i >= 0; i--) {
      const p = this.pipes[i];
      p.x -= this.PIPE_SPEED * dt;

      // Skóre
      if (!p.scored && p.x + this.PIPE_W < bx) {
        p.scored = true;
        this.score++;
        Sound.correct();
        this.PIPE_SPEED += 2;
      }

      // Kolize
      if (bx + this.BIRD_R > p.x && bx - this.BIRD_R < p.x + this.PIPE_W) {
        if (this.birdY - this.BIRD_R < p.gapY - this.PIPE_GAP / 2 ||
            this.birdY + this.BIRD_R > p.gapY + this.PIPE_GAP / 2) {
          this._die();
          return;
        }
      }

      // Odstranit
      if (p.x + this.PIPE_W < -10) this.pipes.splice(i, 1);
    }
  },

  _die() {
    this.gameEnded = true;
    Sound.wrong();
    setTimeout(() => this.arcade.gameOver(this.score), 1200);
  },

  draw(ctx, W, H) {
    const c = this.arcade.colors;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = c.bg;
    ctx.fillRect(0, 0, W, H);

    // Skóre
    ctx.fillStyle = c.gold;
    ctx.font = 'bold 22px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${this.score}`, W / 2, 32);

    // Trubky
    this.pipes.forEach(p => {
      const topH = p.gapY - this.PIPE_GAP / 2;
      const botY = p.gapY + this.PIPE_GAP / 2;

      ctx.fillStyle = c.green;
      // Horní
      ctx.beginPath();
      ctx.roundRect(p.x, 0, this.PIPE_W, topH, [0, 0, 6, 6]);
      ctx.fill();
      // Spodní
      ctx.beginPath();
      ctx.roundRect(p.x, botY, this.PIPE_W, H - botY, [6, 6, 0, 0]);
      ctx.fill();
    });

    // Pták (Falkor)
    const bx = 60;
    ctx.fillStyle = c.teal;
    ctx.beginPath();
    ctx.arc(bx, this.birdY, this.BIRD_R, 0, Math.PI * 2);
    ctx.fill();
    // Oko
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(bx + 5, this.birdY - 3, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = c.bg;
    ctx.beginPath();
    ctx.arc(bx + 6, this.birdY - 3, 2, 0, Math.PI * 2);
    ctx.fill();
    // Křídlo
    ctx.fillStyle = c.gold;
    ctx.beginPath();
    ctx.ellipse(bx - 8, this.birdY + 2, 10, 5, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Game over
    if (this.gameEnded) {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = c.gold;
      ctx.font = 'bold 28px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Konec hry!', W / 2, H * 0.4);
      ctx.fillStyle = c.text;
      ctx.font = '20px Nunito, sans-serif';
      ctx.fillText(`Skóre: ${this.score}`, W / 2, H * 0.5);
    }
  }
};

// ═════════════════════════════════════════════════════════════════════════════
// HRA 3: BREAKOUT (ARKANOID)
// ═════════════════════════════════════════════════════════════════════════════

const BreakoutGame = {
  instruction: 'Rozbiješ všechny cihly? Ovládej pálku!',
  COLS: 7,
  ROWS: 5,
  paddleX: 0,
  paddleW: 70,
  ball: null,
  bricks: [],
  score: 0,
  lives: 3,
  launched: false,
  gameEnded: false,

  init(arcade) {
    this.arcade = arcade;
    this.paddleX = arcade.W / 2;
    this.paddleW = 70;
    this.score = 0;
    this.lives = 3;
    this.launched = false;
    this.gameEnded = false;

    // Míček
    this.ball = { x: arcade.W / 2, y: arcade.H - 70, vx: 150, vy: -200, r: 7 };

    // Cihly
    this.bricks = [];
    const bw = (arcade.W - 20) / this.COLS;
    const bh = 18;
    for (let row = 0; row < this.ROWS; row++) {
      for (let col = 0; col < this.COLS; col++) {
        this.bricks.push({
          x: 10 + col * bw,
          y: 50 + row * (bh + 4),
          w: bw - 4,
          h: bh,
          alive: true,
          color: row % 2 === 0 ? 'gold' : 'teal'
        });
      }
    }
  },

  onTouchStart(x) { this.paddleX = x; if (!this.launched) { this.launched = true; } },
  onTouchMove(x) { this.paddleX = x; },

  onKey(key) {
    if (key === 'ArrowLeft')  this.paddleX = Math.max(this.paddleW / 2, this.paddleX - 25);
    if (key === 'ArrowRight') this.paddleX = Math.min(this.arcade.W - this.paddleW / 2, this.paddleX + 25);
    if (key === ' ' && !this.launched) this.launched = true;
  },

  update(dt) {
    if (this.gameEnded) return;
    const b = this.ball;
    const W = this.arcade.W;
    const H = this.arcade.H;

    if (!this.launched) {
      b.x = this.paddleX;
      b.y = H - 70;
      return;
    }

    b.x += b.vx * dt;
    b.y += b.vy * dt;

    // Stěny
    if (b.x - b.r <= 0)  { b.x = b.r; b.vx = Math.abs(b.vx); }
    if (b.x + b.r >= W)  { b.x = W - b.r; b.vx = -Math.abs(b.vx); }
    if (b.y - b.r <= 0)  { b.y = b.r; b.vy = Math.abs(b.vy); }

    // Pálka
    const px = this.paddleX - this.paddleW / 2;
    const py = H - 50;
    if (b.vy > 0 && b.y + b.r >= py && b.y + b.r <= py + 16 &&
        b.x >= px && b.x <= px + this.paddleW) {
      b.vy = -Math.abs(b.vy);
      // Úhel podle pozice na pálce
      const hit = (b.x - px) / this.paddleW - 0.5;
      b.vx = hit * 300;
      b.vy *= 1.01; // mírné zrychlení
      Sound.click();
    }

    // Míček pod pálkou
    if (b.y > H + 10) {
      this.lives--;
      Sound.wrong();
      if (this.lives <= 0) {
        this.gameEnded = true;
        setTimeout(() => this.arcade.gameOver(this.score), 1200);
        return;
      }
      // Reset
      this.launched = false;
      b.x = this.paddleX;
      b.y = H - 70;
      b.vx = 150;
      b.vy = -200;
    }

    // Cihly
    for (const br of this.bricks) {
      if (!br.alive) continue;
      if (b.x + b.r > br.x && b.x - b.r < br.x + br.w &&
          b.y + b.r > br.y && b.y - b.r < br.y + br.h) {
        br.alive = false;
        b.vy = -b.vy;
        this.score++;
        Sound.correct();
        break;
      }
    }

    // Výhra
    if (this.bricks.every(br => !br.alive)) {
      this.gameEnded = true;
      setTimeout(() => this.arcade.gameOver(this.score), 1200);
    }
  },

  draw(ctx, W, H) {
    const c = this.arcade.colors;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = c.bg;
    ctx.fillRect(0, 0, W, H);

    // HUD
    ctx.fillStyle = c.gold;
    ctx.font = 'bold 18px Nunito, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`🧱 ${this.score}`, 12, 30);
    ctx.textAlign = 'right';
    ctx.fillText('❤️'.repeat(this.lives), W - 12, 30);
    ctx.textAlign = 'center';

    // Cihly
    for (const br of this.bricks) {
      if (!br.alive) continue;
      ctx.fillStyle = br.color === 'gold' ? c.gold : c.teal;
      ctx.beginPath();
      ctx.roundRect(br.x, br.y, br.w, br.h, 4);
      ctx.fill();
    }

    // Pálka
    ctx.fillStyle = c.teal;
    ctx.beginPath();
    ctx.roundRect(this.paddleX - this.paddleW / 2, H - 50, this.paddleW, 14, 6);
    ctx.fill();

    // Míček
    ctx.fillStyle = c.gold;
    ctx.beginPath();
    ctx.arc(this.ball.x, this.ball.y, this.ball.r, 0, Math.PI * 2);
    ctx.fill();

    // Nápověda před startem
    if (!this.launched) {
      ctx.fillStyle = c.sub;
      ctx.font = '14px Nunito, sans-serif';
      ctx.fillText('Klepni pro odpálení!', W / 2, H * 0.6);
    }

    // Game over
    if (this.gameEnded) {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = c.gold;
      ctx.font = 'bold 28px Nunito, sans-serif';
      ctx.fillText(this.bricks.every(b => !b.alive) ? 'Výhra!' : 'Konec hry!', W / 2, H * 0.4);
      ctx.fillStyle = c.text;
      ctx.font = '20px Nunito, sans-serif';
      ctx.fillText(`Skóre: ${this.score}`, W / 2, H * 0.5);
    }
  }
};
