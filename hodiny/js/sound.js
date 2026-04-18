// ═══════════════════════════════════════════════════════════════════════════
// sound.js — Web Audio procedurální zvuky (bez zvukových souborů)
// ═══════════════════════════════════════════════════════════════════════════

const Sound = {
  ctx: null,
  enabled: true,

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      this.enabled = false;
    }
  },

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  tone(freq, startOffset, duration, type = 'sine', vol = 0.25) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = type;
      const t = this.ctx.currentTime + startOffset;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
      osc.start(t);
      osc.stop(t + duration + 0.05);
    } catch (e) {}
  },

  correct() {
    this.resume();
    this.tone(523, 0.00, 0.15);
    this.tone(659, 0.15, 0.15);
    this.tone(784, 0.30, 0.30);
  },

  wrong() {
    this.resume();
    this.tone(300, 0.00, 0.15, 'sawtooth', 0.2);
    this.tone(220, 0.15, 0.25, 'sawtooth', 0.15);
  },

  click() {
    this.resume();
    this.tone(880, 0, 0.05, 'sine', 0.1);
  },

  // Tikot = krátký puls (přidání minutky)
  tick() {
    this.resume();
    this.tone(1200, 0, 0.04, 'square', 0.08);
  },

  // Kukačka — dva sestupné tóny, opakované
  kukacka() {
    this.resume();
    // Kuku (dvakrát)
    this.tone(880, 0.00, 0.20, 'sine', 0.25);
    this.tone(660, 0.22, 0.28, 'sine', 0.25);
    this.tone(880, 0.60, 0.20, 'sine', 0.25);
    this.tone(660, 0.82, 0.28, 'sine', 0.25);
    // Fanfára
    [523, 659, 784, 1047].forEach((f, i) => {
      this.tone(f, 1.3 + i * 0.12, 0.22, 'sine', 0.18);
    });
  },
};
