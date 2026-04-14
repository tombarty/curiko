// Struktura kapitol — typ hry a příběhový text se nyní berou z aktivního tématu.

const STORY = {
  chapters: [
    { id: 1  }, { id: 2  }, { id: 3  }, { id: 4  }, { id: 5  },
    { id: 6  }, { id: 7  }, { id: 8  }, { id: 9  }, { id: 10 },
    { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 },
    { id: 15 }, { id: 16 }, { id: 17 },
  ],

  get(id) {
    return this.chapters.find(c => c.id === id);
  },

  // Vrátí typ hry pro kapitolu z aktivního tématu
  getGame(id, themeId) {
    const theme = THEMES[themeId || 'vesmir'];
    return (theme && theme.games && theme.games[id - 1]) || 'math-addition-easy';
  },

  // Vrátí název kapitoly z aktivního tématu
  title(id, themeId) {
    const theme = THEMES[themeId || 'vesmir'];
    if (!theme) return `Kapitola ${id}`;
    const gameType = theme.games[id - 1];
    return (theme.titles && theme.titles[gameType]) || `Kapitola ${id}`;
  },

  // Vrátí příběhový text z aktivního tématu
  storyText(id, themeId) {
    const theme = THEMES[themeId || 'vesmir'];
    if (!theme) return '';
    const gameType = theme.games[id - 1];
    return (theme.stories && theme.stories[gameType]) || '';
  }
};
