// ═══════════════════════════════════════════════════════════════════════════
// storage.js — uložení progresu do localStorage
// ═══════════════════════════════════════════════════════════════════════════

const Storage = {
  KEY: 'hodiny_save',

  defaults() {
    return {
      aktualniMinutky: 0,
      celkemHodin: 0,
      celkemMinut: 0,
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
