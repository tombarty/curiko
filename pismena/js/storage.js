// ═══════════════════════════════════════════════════════════════════════════
// storage.js — localStorage persistence
// ═══════════════════════════════════════════════════════════════════════════

const Storage = {
  KEY: 'pismena_save',

  defaults() {
    return {
      aktualniPismena: 0,
      celkemPokladu: 0,
      celkemPismen: 0,
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
