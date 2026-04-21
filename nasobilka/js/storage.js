// ═══════════════════════════════════════════════════════════════════════════
// storage.js — Druhákova násobilka
// ═══════════════════════════════════════════════════════════════════════════

const Storage = {
  KEY: 'nasobilka_save',

  defaults() {
    return {
      aktualniMince: 0,
      celkemPokladu: 0,
      celkemMinci: 0,
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return this.defaults();
      return { ...this.defaults(), ...JSON.parse(raw) };
    } catch (e) {
      return this.defaults();
    }
  },

  save(state) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(state));
    } catch (e) {}
  },
};
