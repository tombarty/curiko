const Storage = {
  KEY: 'fantazie_save',

  save(state) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(state));
    } catch (e) {}
  },

  load() {
    try {
      const d = localStorage.getItem(this.KEY);
      return d ? JSON.parse(d) : null;
    } catch (e) {
      return null;
    }
  },

  clear() {
    localStorage.removeItem(this.KEY);
  }
};
