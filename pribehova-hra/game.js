// === HERNÍ ENGINE ===

var Game = (function () {
  // --- Stav hry ---
  var state = {
    currentChapter: 1,
    currentSceneIndex: 0,
    score: 0,
    totalScore: 0,
    inventory: [],
    completedChapters: [],
    mistakeCount: 0,
    chapterData: null,
    usingFallback: false,
    panelStep: 0,
    currentTaskIndex: 0
  };

  var SAVE_KEY = 'laura-adventure-save';
  var POINTS_PER_CORRECT = 2;
  var POINTS_NEEDED = 8; // výchozí, kapitola může přepsat přes pointsNeeded

  var PRAISE_MESSAGES = [
    "Skvělé! 🌟",
    "Výborně! ⭐",
    "Správně! 👏",
    "Super! 🎉",
    "Máš to! 💪"
  ];

  var TYPE_LABELS = {
    math: "Matematika",
    czech: "Čeština",
    english: "Angličtina"
  };

  // --- Pomocné funkce ---
  function $(id) {
    return document.getElementById(id);
  }

  function showScreen(screenId) {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) {
      screens[i].classList.add('hidden');
    }
    $(screenId).classList.remove('hidden');
  }

  function getChapterData(num) {
    return window['CHAPTER_' + num] || null;
  }

  function randomPraise() {
    return PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];
  }

  // --- Save / Load ---
  function saveGame() {
    try {
      var saveData = {
        version: 1,
        currentChapter: state.currentChapter,
        currentSceneIndex: state.currentSceneIndex,
        score: state.score,
        totalScore: state.totalScore,
        inventory: state.inventory,
        completedChapters: state.completedChapters
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    } catch (e) {
      // localStorage nedostupný — hra funguje dál
    }
  }

  function loadSave() {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (data.version !== 1) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function resetSave() {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (e) {}
  }

  // --- Bodování ---
  function getPointsNeeded() {
    if (state.chapterData && state.chapterData.pointsNeeded) {
      return state.chapterData.pointsNeeded;
    }
    return POINTS_NEEDED;
  }

  function renderScoreBar() {
    var bar = $('score-bar');
    var chapter = state.chapterData;
    if (!chapter) return;

    // Spočítat celkový počet úkolů v kapitole
    var totalTasks = 0;
    for (var i = 0; i < chapter.scenes.length; i++) {
      var s = chapter.scenes[i];
      var t = s.tasks ? s.tasks.length : (s.task ? 1 : 0);
      totalTasks += t;
    }

    var solved = state.score / POINTS_PER_CORRECT;
    var dots = '';
    var VISIBLE = Math.min(totalTasks, 12); // max 12 teček
    var step = totalTasks / VISIBLE;

    for (var j = 0; j < VISIBLE; j++) {
      var threshold = Math.floor(j * step);
      if (solved > threshold) {
        dots += '<span class="trail-dot done">🌟</span>';
      } else {
        dots += '<span class="trail-dot">·</span>';
      }
    }
    dots += '<span class="trail-dot goal">🔑</span>';

    bar.innerHTML = '<div class="trail">' + dots + '</div>';
  }

  // --- Inventář ---
  function renderInventory() {
    var container = $('inventory-items');
    var bar = $('inventory-bar');
    if (state.inventory.length === 0) {
      bar.classList.add('hidden');
      return;
    }
    bar.classList.remove('hidden');
    var html = '';
    for (var i = 0; i < state.inventory.length; i++) {
      var item = state.inventory[i];
      html += '<div class="inventory-item">' +
        item.emoji +
        '<span class="tooltip">' + item.name + '</span>' +
        '</div>';
    }
    container.innerHTML = html;
  }

  function addInventoryItem(item) {
    // Nepřidávat duplicity
    for (var i = 0; i < state.inventory.length; i++) {
      if (state.inventory[i].item === item.item) return;
    }
    state.inventory.push(item);
    renderInventory();
  }

  // --- Rendering scén ---
  function renderScene(index) {
    var chapter = state.chapterData;
    if (!chapter) return;

    // Konec kapitoly?
    if (index >= chapter.scenes.length) {
      finishChapter();
      return;
    }

    state.currentSceneIndex = index;
    state.panelStep = 0;
    state.mistakeCount = 0;
    state.usingFallback = false;
    saveGame();

    showPanel();
  }

  function getSceneTasks(scene) {
    if (scene.tasks) return scene.tasks;
    if (scene.task) return [scene.task];
    return [];
  }

  function showPanel() {
    var scene = state.chapterData.scenes[state.currentSceneIndex];
    var container = $('scene-container');
    var theme = state.chapterData.theme || 'forest';
    var step = state.panelStep;
    var tasks = getSceneTasks(scene);
    var html = '';

    if (step === 0) {
      // Panel 1
      html += '<div class="comic-panels">' + renderPanel(scene.panel_1, theme) + '</div>';
      html += '<div class="continue-area">' +
        '<button class="btn btn-primary" onclick="Game.nextPanel()">Pokračovat →</button>' +
        '</div>';
    } else if (step === 1) {
      // Panel 2
      html += '<div class="comic-panels">' + renderPanel(scene.panel_2, theme) + '</div>';
      if (tasks.length > 0) {
        html += '<div class="continue-area">' +
          '<button class="btn btn-secondary" onclick="Game.nextPanel()">Vyřeš hádanku 🧩</button>' +
          '</div>';
      } else {
        html += '<div class="continue-area">' +
          '<button class="btn btn-primary" onclick="Game.nextScene()">Pokračovat →</button>' +
          '</div>';
      }
    } else if (step >= 2 && tasks.length > 0) {
      // Úkol — zobrazit aktuální z pole
      var taskIdx = state.currentTaskIndex;
      if (taskIdx < tasks.length) {
        if (tasks.length > 1) {
          html += '<div class="task-counter">Úkol ' + (taskIdx + 1) + ' / ' + tasks.length + '</div>';
        }
        html += renderTask(tasks[taskIdx]);
      }
    }

    container.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function nextPanel() {
    state.panelStep++;
    if (state.panelStep === 2) {
      state.currentTaskIndex = 0;
    }
    showPanel();
  }

  function handleImageError(img) {
    var wrap = img.parentElement;
    var emoji = img.getAttribute('data-emoji');
    var desc = img.getAttribute('data-desc');
    var theme = img.getAttribute('data-theme');
    wrap.innerHTML = '<div class="panel-image theme-' + theme + '">' +
      '<span class="panel-emoji">' + emoji + '</span>' +
      '<span class="panel-image-desc">' + desc + '</span>' +
    '</div>';
  }

  function renderPanel(panel, theme) {
    var emoji = panel.emoji || '📖';
    var imageHtml;

    if (panel.image_url) {
      imageHtml = '<div class="panel-image-wrap">' +
        '<img class="panel-img" src="' + panel.image_url + '" alt="' + escapeAttr(panel.text) + '" ' +
          'data-emoji="' + emoji + '" ' +
          'data-desc="' + escapeAttr(panel.image_prompt) + '" ' +
          'data-theme="' + theme + '" ' +
          'onerror="Game.handleImageError(this)">' +
      '</div>';
    } else {
      imageHtml = '<div class="panel-image theme-' + theme + '">' +
        '<span class="panel-emoji">' + emoji + '</span>' +
        '<span class="panel-image-desc">' + panel.image_prompt + '</span>' +
      '</div>';
    }

    return '<div class="panel">' +
      imageHtml +
      '<div class="panel-text">' + panel.text + '</div>' +
    '</div>';
  }

  function renderTask(task) {
    var typeLabel = TYPE_LABELS[task.type] || task.type;
    var html = '<div class="task-area" id="task-area">' +
      '<span class="task-type-badge ' + task.type + '">' + typeLabel + '</span>' +
      '<div class="task-question">' + task.question + '</div>' +
      '<div class="task-options" id="task-options">';

    for (var i = 0; i < task.options.length; i++) {
      html += '<button class="task-option" data-value="' + escapeAttr(task.options[i]) + '" ' +
        'onclick="Game.checkAnswer(this)">' +
        task.options[i] +
        '</button>';
    }

    html += '</div>' +
      '<div id="hint-container"></div>' +
      '</div>';

    return html;
  }

  function escapeAttr(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // --- Zpracování odpovědí ---
  function getCurrentTask() {
    var scene = state.chapterData.scenes[state.currentSceneIndex];
    if (!scene) return null;
    var tasks = getSceneTasks(scene);
    if (tasks.length === 0) return null;
    var task = tasks[state.currentTaskIndex];
    if (!task) return null;

    if (state.usingFallback && task.fallback) {
      return task.fallback;
    }
    return task;
  }

  function advanceAfterTask() {
    var scene = state.chapterData.scenes[state.currentSceneIndex];
    var tasks = getSceneTasks(scene);

    if (state.currentTaskIndex + 1 < tasks.length) {
      // Další úkol ve stejné scéně
      state.currentTaskIndex++;
      state.mistakeCount = 0;
      state.usingFallback = false;
      showPanel();
    } else {
      // Všechny úkoly hotové — přidat odměny scény a další scéna
      if (scene.rewards) {
        for (var i = 0; i < scene.rewards.length; i++) {
          addInventoryItem(scene.rewards[i]);
        }
      }
      renderScene(state.currentSceneIndex + 1);
    }
  }

  function checkAnswer(buttonEl) {
    var selected = buttonEl.getAttribute('data-value');
    var task = getCurrentTask();
    if (!task) return;

    if (selected === task.correct) {
      // Správná odpověď!
      disableAllOptions();
      buttonEl.classList.add('correct');
      state.score += POINTS_PER_CORRECT;
      state.totalScore += POINTS_PER_CORRECT;
      renderScoreBar();

      // Posunout na další úkol nebo scénu
      setTimeout(function () {
        advanceAfterTask();
      }, 800);
    } else {
      // Špatná odpověď
      state.mistakeCount++;
      buttonEl.classList.add('wrong');

      // Po animaci odebrat třídu wrong
      setTimeout(function () {
        buttonEl.classList.remove('wrong');
      }, 500);

      handleMistake();
    }
  }

  function handleMistake() {
    var scene = state.chapterData.scenes[state.currentSceneIndex];
    var tasks = getSceneTasks(scene);
    var currentOriginalTask = tasks[state.currentTaskIndex];
    var hintContainer = $('hint-container');
    var task = getCurrentTask();

    if (state.mistakeCount === 1) {
      var hint = task.hint_1 || "Zkus to ještě jednou!";
      hintContainer.innerHTML = '<div class="hint-bubble">' + hint + '</div>';
    } else if (state.mistakeCount === 2) {
      var hint2 = task.hint_2 || "Zkus to znovu, máš to skoro!";
      hintContainer.innerHTML = '<div class="hint-bubble">' + hint2 + '</div>';
      removeOneWrongOption(task.correct);
    } else if (state.mistakeCount >= 3) {
      if (currentOriginalTask.fallback && !state.usingFallback) {
        state.usingFallback = true;
        state.mistakeCount = 0;
        var fallback = currentOriginalTask.fallback;

        var taskArea = $('task-area');
        var html = '<span class="task-type-badge ' + currentOriginalTask.type + '">' +
          (TYPE_LABELS[currentOriginalTask.type] || currentOriginalTask.type) + '</span>' +
          '<div class="task-question">' + fallback.question + '</div>' +
          '<div class="task-options" id="task-options">';

        for (var i = 0; i < fallback.options.length; i++) {
          html += '<button class="task-option" data-value="' + escapeAttr(fallback.options[i]) + '" ' +
            'onclick="Game.checkAnswer(this)">' +
            fallback.options[i] +
            '</button>';
        }

        html += '</div>' +
          '<div id="hint-container">' +
            '<div class="hint-bubble">Zkusíme to jinak:</div>' +
          '</div>';

        taskArea.innerHTML = html;
      } else {
        hintContainer.innerHTML = '';
        state.score += POINTS_PER_CORRECT;
        state.totalScore += POINTS_PER_CORRECT;
        renderScoreBar();
        disableAllOptions();
        setTimeout(function () {
          advanceAfterTask();
        }, 1500);
      }
    }
  }

  function disableAllOptions() {
    var options = document.querySelectorAll('.task-option');
    for (var i = 0; i < options.length; i++) {
      options[i].disabled = true;
    }
  }

  function removeOneWrongOption(correct) {
    var options = document.querySelectorAll('.task-option');
    for (var i = 0; i < options.length; i++) {
      var val = options[i].getAttribute('data-value');
      if (val !== correct && !options[i].classList.contains('removed')) {
        options[i].classList.add('removed');
        break; // Odeber jen jednu
      }
    }
  }

  // --- Konec kapitoly ---
  function finishChapter() {
    var chapter = state.chapterData;

    // Přidat odměnu do inventáře
    if (chapter.reward) {
      addInventoryItem(chapter.reward);
    }

    // Zaznamenat dokončení
    if (state.completedChapters.indexOf(state.currentChapter) === -1) {
      state.completedChapters.push(state.currentChapter);
    }

    saveGame();

    // Zobrazit reward screen
    $('reward-item-emoji').textContent = chapter.reward ? chapter.reward.emoji : '🎁';
    $('reward-item-name').textContent = chapter.reward ? chapter.reward.name : 'Odměna';
    $('reward-item-desc').textContent = chapter.reward ? chapter.reward.description : '';
    $('cliffhanger-text').textContent = chapter.cliffhanger || 'Pokračování příště...';

    showScreen('reward-screen');
  }

  // --- Veřejné API ---
  function newGame() {
    resetSave();
    state.currentChapter = 1;
    state.currentSceneIndex = 0;
    state.score = 0;
    state.totalScore = 0;
    state.inventory = [];
    state.completedChapters = [];
    state.mistakeCount = 0;
    startChapter(1);
  }

  function continueGame() {
    var save = loadSave();
    if (!save) {
      newGame();
      return;
    }
    state.currentChapter = save.currentChapter;
    state.currentSceneIndex = save.currentSceneIndex;
    state.score = save.score;
    state.totalScore = save.totalScore;
    state.inventory = save.inventory || [];
    state.completedChapters = save.completedChapters || [];
    startChapter(state.currentChapter);
  }

  function startChapter(num) {
    var data = getChapterData(num);
    if (!data) {
      // Kapitola neexistuje — zobrazit zprávu
      $('scene-container').innerHTML =
        '<div style="text-align:center;padding:2rem;">' +
          '<div style="font-size:3rem;">🚧</div>' +
          '<p style="font-size:1.3rem;margin-top:1rem;">Tato kapitola se teprve připravuje!</p>' +
          '<button class="btn btn-secondary" onclick="Game.backToStart()" style="margin-top:1rem;">Zpět na začátek</button>' +
        '</div>';
      showScreen('game-screen');
      return;
    }

    state.chapterData = data;
    state.score = 0;
    state.mistakeCount = 0;

    // Nastavit header
    $('chapter-title').textContent = 'Kapitola ' + data.chapter + ': ' + data.title;

    renderScoreBar();
    renderInventory();
    showScreen('game-screen');
    renderScene(state.currentSceneIndex);
  }

  function nextScene() {
    renderScene(state.currentSceneIndex + 1);
  }

  function nextChapter() {
    state.currentChapter++;
    state.currentSceneIndex = 0;
    state.score = 0;
    saveGame();
    startChapter(state.currentChapter);
  }

  function revealTask() {
    var wrapper = $('task-wrapper');
    if (wrapper) {
      wrapper.classList.remove('hidden');
      // Skrýt tlačítko "Vyřeš hádanku"
      var btns = document.querySelectorAll('.continue-area');
      for (var i = 0; i < btns.length; i++) {
        btns[i].classList.add('hidden');
      }
      wrapper.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function backToStart() {
    showScreen('start-screen');
    init();
  }

  // --- Inicializace ---
  function init() {
    var save = loadSave();
    if (save) {
      $('btn-continue').classList.remove('hidden');
    } else {
      $('btn-continue').classList.add('hidden');
    }
  }

  function showAbout() {
    showScreen('about-screen');
    var qrEl = $('about-qr');
    if (qrEl && !qrEl.dataset.generated && typeof qrcode !== 'undefined') {
      try {
        var qr = qrcode(0, 'M');
        qr.addData('SPD*1.0*ACC:CZ8262106701002211168451*AM:30*CC:CZK*MSG:Kafe pro autora');
        qr.make();
        qrEl.innerHTML = qr.createImgTag(5, 0);
        qrEl.dataset.generated = '1';
      } catch (e) {}
    }
  }

  function hideAbout() {
    showScreen('start-screen');
  }

  // Spustit po načtení stránky
  document.addEventListener('DOMContentLoaded', init);

  // Vrátit veřejné API
  return {
    newGame: newGame,
    continueGame: continueGame,
    nextScene: nextScene,
    nextChapter: nextChapter,
    checkAnswer: checkAnswer,
    backToStart: backToStart,
    handleImageError: handleImageError,
    nextPanel: nextPanel,
    showAbout: showAbout,
    hideAbout: hideAbout
  };
})();
