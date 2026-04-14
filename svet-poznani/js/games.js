// ─── Pomocné funkce ────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawnStars(container) {
  const rect = container.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let i = 0; i < 9; i++) {
    const star = document.createElement('div');
    star.className = 'star-particle';
    star.textContent = i % 3 === 0 ? '✨' : '⭐';
    const angle = (i / 9) * 2 * Math.PI;
    const dist = 60 + Math.random() * 70;
    star.style.left = cx + 'px';
    star.style.top = cy + 'px';
    star.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    star.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 950);
  }
}

// ─── Motivační zprávy (záložní, pokud téma nemá vlastní) ───────────────────

const FALLBACK_MESSAGES = [
  '🌟 Skvělá práce! Pokračuj!',
  '🌟 Jsi úžasný hrdina!',
  '🌟 Jen tak dál!',
  '🌟 Bravo! Tak se to dělá!',
  '🌟 Mozek na plný výkon!',
  '🌟 Letíš jako raketa!',
];

// ─── Herní data ────────────────────────────────────────────────────────────

// ─── Herní data (50 slov/otázek na aktivitu kde je to možné) ───────────────

const GAME_DATA = {

  // ══════ ČEŠTINA: tvrdé / měkké souhlásky → Y nebo I (50 slov) ══════
  // ⚠️ Pouze slova s KRÁTKÝM y nebo i (žádné ý/í)
  'czech-soft-i': [
    // H = tvrdá → Y
    { word: 'h_ena',   correct: 'y', options: ['y','i'], full: 'hyena',   rule: 'H je tvrdá → Y' },
    { word: 'h_mna',   correct: 'y', options: ['y','i'], full: 'hymna',   rule: 'H je tvrdá → Y' },
    { word: 'h_nout',  correct: 'y', options: ['y','i'], full: 'hynout',  rule: 'H je tvrdá → Y' },
    { word: 'h_dra',   correct: 'y', options: ['y','i'], full: 'hydra',   rule: 'H je tvrdá → Y' },
    // CH = tvrdá → Y
    { word: 'ch_ba',   correct: 'y', options: ['y','i'], full: 'chyba',   rule: 'CH je tvrdá → Y' },
    { word: 'ch_tat',  correct: 'y', options: ['y','i'], full: 'chytat',  rule: 'CH je tvrdá → Y' },
    { word: 'ch_trý',  correct: 'y', options: ['y','i'], full: 'chytrý',  rule: 'CH je tvrdá → Y' },
    { word: 'ch_bět',  correct: 'y', options: ['y','i'], full: 'chybět',  rule: 'CH je tvrdá → Y' },
    { word: 'ch_stat', correct: 'y', options: ['y','i'], full: 'chystat', rule: 'CH je tvrdá → Y' },
    { word: 'ch_tit',  correct: 'y', options: ['y','i'], full: 'chytit',  rule: 'CH je tvrdá → Y' },
    // K = tvrdá → Y
    { word: 'k_tara',  correct: 'y', options: ['y','i'], full: 'kytara',  rule: 'K je tvrdá → Y' },
    { word: 'k_selý',  correct: 'y', options: ['y','i'], full: 'kyselý',  rule: 'K je tvrdá → Y' },
    { word: 'k_tice',  correct: 'y', options: ['y','i'], full: 'kytice',  rule: 'K je tvrdá → Y' },
    { word: 'k_slík',  correct: 'y', options: ['y','i'], full: 'kyslík',  rule: 'K je tvrdá → Y' },
    { word: 'k_tka',   correct: 'y', options: ['y','i'], full: 'kytka',   rule: 'K je tvrdá → Y' },
    { word: 'k_nout',  correct: 'y', options: ['y','i'], full: 'kynout',  rule: 'K je tvrdá → Y' },
    { word: 'k_pět',   correct: 'y', options: ['y','i'], full: 'kypět',   rule: 'K je tvrdá → Y' },
    // R = tvrdá → Y
    { word: 'r_ba',    correct: 'y', options: ['y','i'], full: 'ryba',    rule: 'R je tvrdá → Y' },
    { word: 'r_chle',  correct: 'y', options: ['y','i'], full: 'rychle',  rule: 'R je tvrdá → Y' },
    { word: 'r_tíř',   correct: 'y', options: ['y','i'], full: 'rytíř',   rule: 'R je tvrdá → Y' },
    { word: 'r_bník',  correct: 'y', options: ['y','i'], full: 'rybník',  rule: 'R je tvrdá → Y' },
    { word: 'r_tmus',  correct: 'y', options: ['y','i'], full: 'rytmus',  rule: 'R je tvrdá → Y' },
    { word: 'r_padlo', correct: 'y', options: ['y','i'], full: 'rypadlo', rule: 'R je tvrdá → Y' },
    { word: 'r_s',     correct: 'y', options: ['y','i'], full: 'rys',     rule: 'R je tvrdá → Y' },
    { word: 'r_bář',   correct: 'y', options: ['y','i'], full: 'rybář',   rule: 'R je tvrdá → Y' },
    { word: 'r_je',    correct: 'y', options: ['y','i'], full: 'ryje',    rule: 'R je tvrdá → Y' },
    // Č = měkká → I (pouze krátké i)
    { word: 'č_stý',   correct: 'i', options: ['y','i'], full: 'čistý',   rule: 'Č je měkká → I' },
    { word: 'č_psy',   correct: 'i', options: ['y','i'], full: 'čipsy',   rule: 'Č je měkká → I' },
    { word: 'č_perný', correct: 'i', options: ['y','i'], full: 'čiperný', rule: 'Č je měkká → I' },
    { word: 'č_lý',    correct: 'i', options: ['y','i'], full: 'čilý',    rule: 'Č je měkká → I' },
    { word: 'č_n',     correct: 'i', options: ['y','i'], full: 'čin',     rule: 'Č je měkká → I' },
    { word: 'č_nka',   correct: 'i', options: ['y','i'], full: 'činka',   rule: 'Č je měkká → I' },
    { word: 'č_nit',   correct: 'i', options: ['y','i'], full: 'činit',   rule: 'Č je měkká → I' },
    // Š = měkká → I (pouze krátké i)
    { word: 'š_kovný', correct: 'i', options: ['y','i'], full: 'šikovný', rule: 'Š je měkká → I' },
    { word: 'š_roký',  correct: 'i', options: ['y','i'], full: 'široký',  rule: 'Š je měkká → I' },
    { word: 'š_pka',   correct: 'i', options: ['y','i'], full: 'šipka',   rule: 'Š je měkká → I' },
    { word: 'š_kmý',   correct: 'i', options: ['y','i'], full: 'šikmý',   rule: 'Š je měkká → I' },
    { word: 'š_ška',   correct: 'i', options: ['y','i'], full: 'šiška',   rule: 'Š je měkká → I' },
    // Ž = měkká → I (pouze krátké i)
    { word: 'ž_rafa',  correct: 'i', options: ['y','i'], full: 'žirafa',  rule: 'Ž je měkká → I' },
    { word: 'ž_vot',   correct: 'i', options: ['y','i'], full: 'život',   rule: 'Ž je měkká → I' },
    { word: 'ž_vý',    correct: 'i', options: ['y','i'], full: 'živý',    rule: 'Ž je měkká → I' },
    { word: 'ž_dle',   correct: 'i', options: ['y','i'], full: 'židle',   rule: 'Ž je měkká → I' },
    { word: 'ž_to',    correct: 'i', options: ['y','i'], full: 'žito',    rule: 'Ž je měkká → I' },
    // J = měkká → I
    { word: 'j_skra',  correct: 'i', options: ['y','i'], full: 'jiskra',  rule: 'J je měkká → I' },
    { word: 'j_stý',   correct: 'i', options: ['y','i'], full: 'jistý',   rule: 'J je měkká → I' },
    { word: 'j_ný',    correct: 'i', options: ['y','i'], full: 'jiný',    rule: 'J je měkká → I' },
    { word: 'j_nak',   correct: 'i', options: ['y','i'], full: 'jinak',   rule: 'J je měkká → I' },
    { word: 'j_stota', correct: 'i', options: ['y','i'], full: 'jistota', rule: 'J je měkká → I' },
    { word: 'j_zva',   correct: 'i', options: ['y','i'], full: 'jizva',   rule: 'J je měkká → I' },
    { word: 'j_lm',    correct: 'i', options: ['y','i'], full: 'jilm',    rule: 'J je měkká → I' },
  ],

  // ══════ ČEŠTINA: krátké / dlouhé I/Y → i, í, y, ý (50 slov) ══════
  'czech-long-iy': [
    { word: 'r_ba',    correct: 'y',  emoji: '🐟', full: 'ryba',    hint: 'ryba (krátké y)' },
    { word: 'm_č',     correct: 'í',  emoji: '⚽', full: 'míč',     hint: 'míč (dlouhé í)' },
    { word: 's_r',     correct: 'ý',  emoji: '🧀', full: 'sýr',     hint: 'sýr (dlouhé ý)' },
    { word: 'v_la',    correct: 'í',  emoji: '🧚', full: 'víla',    hint: 'víla (dlouhé í)' },
    { word: 'l_st',    correct: 'i',  emoji: '🍃', full: 'list',    hint: 'list (krátké i)' },
    { word: 'd_m',     correct: 'ý',  emoji: '💨', full: 'dým',     hint: 'dým (dlouhé ý)' },
    { word: 'p_sek',   correct: 'í',  emoji: '🏖️', full: 'písek',   hint: 'písek (dlouhé í)' },
    { word: 'k_tka',   correct: 'y',  emoji: '💐', full: 'kytka',   hint: 'kytka (krátké y)' },
    { word: 'č_slo',   correct: 'í',  emoji: '🔢', full: 'číslo',   hint: 'číslo (dlouhé í)' },
    { word: 'r_s',     correct: 'y',  emoji: '🐱', full: 'rys',     hint: 'rys (krátké y)' },
    { word: 'k_no',    correct: 'i',  emoji: '🎬', full: 'kino',    hint: 'kino (krátké i)' },
    { word: 'v_tr',    correct: 'í',  emoji: '🌬️', full: 'vítr',    hint: 'vítr (dlouhé í)' },
    { word: 'l_pa',    correct: 'í',  emoji: '🌳', full: 'lípa',    hint: 'lípa (dlouhé í)' },
    { word: 'r_že',    correct: 'ý',  emoji: '🍚', full: 'rýže',    hint: 'rýže (dlouhé ý)' },
    { word: 'kl_č',    correct: 'í',  emoji: '🔑', full: 'klíč',    hint: 'klíč (dlouhé í)' },
    { word: 'ml_n',    correct: 'ý',  emoji: '🏭', full: 'mlýn',    hint: 'mlýn (dlouhé ý)' },
    { word: 'z_ma',    correct: 'i',  emoji: '❄️', full: 'zima',    hint: 'zima (krátké i)' },
    { word: 'r_chle',  correct: 'y',  emoji: '🏃', full: 'rychle',  hint: 'rychle (krátké y)' },
    { word: 's_la',    correct: 'í',  emoji: '💪', full: 'síla',    hint: 'síla (dlouhé í)' },
    { word: 'b_lý',    correct: 'í',  emoji: '⬜', full: 'bílý',    hint: 'bílý (dlouhé í)' },
    { word: 'r_tíř',   correct: 'y',  emoji: '⚔️', full: 'rytíř',   hint: 'rytíř (krátké y)' },
    { word: 'ch_ba',   correct: 'y',  emoji: '❌', full: 'chyba',   hint: 'chyba (krátké y)' },
    { word: 'hn_zdo',  correct: 'í',  emoji: '🪺', full: 'hnízdo',  hint: 'hnízdo (dlouhé í)' },
    { word: 'n_zký',   correct: 'í',  emoji: '📏', full: 'nízký',   hint: 'nízký (dlouhé í)' },
    { word: 'p_rko',   correct: 'í',  emoji: '🪶', full: 'pírko',   hint: 'pírko (dlouhé í)' },
    { word: 'r_č',     correct: 'ý',  emoji: '⛏️', full: 'rýč',     hint: 'rýč (dlouhé ý)' },
    { word: 'ž_vot',   correct: 'i',  emoji: '❤️', full: 'život',   hint: 'život (krátké i)' },
    { word: 'š_pka',   correct: 'i',  emoji: '➡️', full: 'šipka',   hint: 'šipka (krátké i)' },
    { word: 'č_stý',   correct: 'i',  emoji: '🧼', full: 'čistý',   hint: 'čistý (krátké i)' },
    { word: 'kn_ha',   correct: 'i',  emoji: '📖', full: 'kniha',   hint: 'kniha (krátké i)' },
    { word: 'd_ra',    correct: 'í',  emoji: '🕳️', full: 'díra',    hint: 'díra (dlouhé í)' },
    { word: 'r_bník',  correct: 'y',  emoji: '🌊', full: 'rybník',  hint: 'rybník (krátké y)' },
    { word: 'ž_dle',   correct: 'i',  emoji: '🪑', full: 'židle',   hint: 'židle (krátké i)' },
    { word: 'l_ška',   correct: 'i',  emoji: '🦊', full: 'liška',   hint: 'liška (krátké i)' },
    { word: 'kr_sa',   correct: 'y',  emoji: '🐀', full: 'krysa',   hint: 'krysa (krátké y)' },
    { word: 'tř_da',   correct: 'í',  emoji: '🏫', full: 'třída',   hint: 'třída (dlouhé í)' },
    { word: 'j_zda',   correct: 'í',  emoji: '🚲', full: 'jízda',   hint: 'jízda (dlouhé í)' },
    { word: 'ř_pa',    correct: 'í',  emoji: '🟣', full: 'řípa',    hint: 'řípa (dlouhé í)' },
    { word: 'ch_trý',  correct: 'y',  emoji: '🧠', full: 'chytrý',  hint: 'chytrý (krátké y)' },
    { word: 'j_stý',   correct: 'i',  emoji: '✅', full: 'jistý',   hint: 'jistý (krátké i)' },
    { word: 'k_tara',  correct: 'y',  emoji: '🎸', full: 'kytara',  hint: 'kytara (krátké y)' },
    { word: 'v_no',    correct: 'í',  emoji: '🍷', full: 'víno',    hint: 'víno (dlouhé í)' },
    { word: 'k_selý',  correct: 'y',  emoji: '🍋', full: 'kyselý',  hint: 'kyselý (krátké y)' },
    { word: 'č_psy',   correct: 'i',  emoji: '🍟', full: 'čipsy',   hint: 'čipsy (krátké i)' },
    { word: 's_to',    correct: 'í',  emoji: '🕸️', full: 'síto',    hint: 'síto (dlouhé í)' },
    { word: 'ř_kat',   correct: 'í',  emoji: '🗣️', full: 'říkat',   hint: 'říkat (dlouhé í)' },
    { word: 'h_bat',   correct: 'ý',  emoji: '🤸', full: 'hýbat',   hint: 'hýbat (dlouhé ý)' },
    { word: 'r_tmus',  correct: 'y',  emoji: '🥁', full: 'rytmus',  hint: 'rytmus (krátké y)' },
    { word: 'kl_sna',  correct: 'i',  emoji: '🐴', full: 'klisna',  hint: 'klisna (krátké i)' },
    { word: 'hl_na',   correct: 'í',  emoji: '🏺', full: 'hlína',   hint: 'hlína (dlouhé í)' },
  ],

  // ══════ ČEŠTINA: párové souhlásky (40 slov) ══════
  'czech-paired': [
    // b/p
    { word: 'zu_',     correct: 'b', options: ['b','p'], emoji: '🦷', hint: 'co roste v puse',        full: 'zub' },
    { word: 'chlé_',   correct: 'b', options: ['b','p'], emoji: '🍞', hint: 'pečeme ho, jíme',        full: 'chléb' },
    { word: 'du_',     correct: 'b', options: ['b','p'], emoji: '🌳', hint: 'velký strom v lese',     full: 'dub' },
    { word: 'hro_',    correct: 'b', options: ['b','p'], emoji: '⚰️', hint: 'na hřbitově',             full: 'hrob' },
    { word: 'holu_',   correct: 'b', options: ['b','p'], emoji: '🕊️', hint: 'bílý pták míru',         full: 'holub' },
    { word: 'klu_',    correct: 'b', options: ['b','p'], emoji: '👥', hint: 'skupina lidí, spolek',     full: 'klub' },
    { word: 'stro_',   correct: 'p', options: ['b','p'], emoji: '🏠', hint: 'nad hlavou v místnosti',  full: 'strop' },
    // d/t
    { word: 'ha_',     correct: 'd', options: ['d','t'], emoji: '🐍', hint: 'plaz bez noh',            full: 'had' },
    { word: 'le_',     correct: 'd', options: ['d','t'], emoji: '🧊', hint: 'zamrzlá voda',            full: 'led' },
    { word: 'me_',     correct: 'd', options: ['d','t'], emoji: '🍯', hint: 'sladký, od včel',         full: 'med' },
    { word: 'hra_',    correct: 'd', options: ['d','t'], emoji: '🏰', hint: 'kde bydlí rytíř',        full: 'hrad' },
    { word: 'obě_',    correct: 'd', options: ['d','t'], emoji: '🍽️', hint: 'jídlo v poledne',        full: 'oběd' },
    { word: 'hla_',    correct: 'd', options: ['d','t'], emoji: '😋', hint: 'chci jíst, mám ___',      full: 'hlad' },
    { word: 'je_',     correct: 'd', options: ['d','t'], emoji: '☠️', hint: 'nebezpečný, otrava',      full: 'jed' },
    { word: 'bro_',    correct: 'd', options: ['d','t'], emoji: '🌊', hint: 'přejít řeku přes ___',    full: 'brod' },
    { word: 'sa_',     correct: 'd', options: ['d','t'], emoji: '🍎', hint: 'ovocný ___ (stromy s ovocem)', full: 'sad' },
    // z/s
    { word: 'mrá_',    correct: 'z', options: ['z','s'], emoji: '❄️', hint: 'zima venku',              full: 'mráz' },
    { word: 'vů_',     correct: 'z', options: ['z','s'], emoji: '🚗', hint: 'auto, dopravní prostř.',  full: 'vůz' },
    { word: 'kně_',    correct: 'z', options: ['z','s'], emoji: '⛪', hint: 'v kostele slouží',         full: 'kněz' },
    { word: 'obra_',   correct: 'z', options: ['z','s'], emoji: '🖼️', hint: 'na zdi visí ___',         full: 'obraz' },
    { word: 'prova_',  correct: 'z', options: ['z','s'], emoji: '🪢', hint: 'dlouhý, na vázání',       full: 'provaz' },
    { word: 'řete_',   correct: 'z', options: ['z','s'], emoji: '⛓️', hint: 'kovový, má články',       full: 'řetěz' },
    { word: 'be_',     correct: 'z', options: ['z','s'], emoji: '🌸', hint: 'keř, kvete na jaře',      full: 'bez' },
    // ž/š
    { word: 'nů_',     correct: 'ž', options: ['ž','š'], emoji: '🔪', hint: 'čím krájíme',            full: 'nůž' },
    { word: 'kní_ka',  correct: 'ž', options: ['ž','š'], emoji: '📕', hint: 'malá kniha',              full: 'knížka' },
    { word: 'mu_',     correct: 'ž', options: ['ž','š'], emoji: '👨', hint: 'dospělý chlapec',         full: 'muž' },
    { word: 'le_',     correct: 'ž', options: ['ž','š'], emoji: '🤥', hint: 'říkáme nepravdu',         full: 'lež' },
    { word: 'gará_',   correct: 'ž', options: ['ž','š'], emoji: '🅿️', hint: 'kde parkuje auto',       full: 'garáž' },
    { word: 'my_',     correct: 'š', options: ['ž','š'], emoji: '🐭', hint: 'malý hlodavec',           full: 'myš' },
    { word: 'ko_',     correct: 'š', options: ['ž','š'], emoji: '🧺', hint: 'na prádlo nebo ovoce',   full: 'koš' },
    // h/ch
    { word: 'sní_',    correct: 'h', options: ['h','ch'], emoji: '⛷️', hint: 'bílý, padá v zimě',     full: 'sníh' },
    { word: 'oře_',    correct: 'ch',options: ['h','ch'], emoji: '🌰', hint: 'tvrdá skořápka',        full: 'ořech' },
    { word: 'me_',     correct: 'ch',options: ['h','ch'], emoji: '🌿', hint: 'roste na kameni',       full: 'mech' },
    { word: 'ro_',     correct: 'h', options: ['h','ch'], emoji: '🦌', hint: 'na hlavě jelena',       full: 'roh' },
    { word: 'pra_',    correct: 'ch',options: ['h','ch'], emoji: '💨', hint: 'jemný, letí vzduchem',  full: 'prach' },
    { word: 'ple_',    correct: 'ch',options: ['h','ch'], emoji: '🥘', hint: 'kovový, na pečení',     full: 'plech' },
    { word: 'hrá_',    correct: 'ch',options: ['h','ch'], emoji: '🫘', hint: 'zelený, luštěnina',     full: 'hrách' },
    // k/g
    { word: 'vla_',    correct: 'k', options: ['k','g'], emoji: '🚂', hint: 'jezdí po kolejích',      full: 'vlak' },
    { word: 'lé_',     correct: 'k', options: ['k','g'], emoji: '💊', hint: 'když jsme nemocní',       full: 'lék' },
    { word: 'dra_',    correct: 'k', options: ['k','g'], emoji: '🐉', hint: 'velký, chrlí oheň',     full: 'drak' },
  ],

  // ══════ ČEŠTINA: abecední řazení (25 sad) ══════
  'czech-alphabet': [
    { words: ['kolo','auto','mrak'],        sorted: ['auto','kolo','mrak'] },
    { words: ['ryba','beruška','vlak'],     sorted: ['beruška','ryba','vlak'] },
    { words: ['drak','fén','had'],          sorted: ['drak','fén','had'] },
    { words: ['les','jablko','nebe'],       sorted: ['jablko','les','nebe'] },
    { words: ['stůl','peří','žirafa'],      sorted: ['peří','stůl','žirafa'] },
    { words: ['moře','hora','kopec'],       sorted: ['hora','kopec','moře'] },
    { words: ['slon','lev','medvěd'],       sorted: ['lev','medvěd','slon'] },
    { words: ['okno','dveře','klíč'],       sorted: ['dveře','klíč','okno'] },
    { words: ['tužka','sešit','guma'],      sorted: ['guma','sešit','tužka'] },
    { words: ['čáp','brouk','žába'],        sorted: ['brouk','čáp','žába'] },
    { words: ['včela','motýl','mravenec'],  sorted: ['motýl','mravenec','včela'] },
    { words: ['bota','čepice','kalhoty'],   sorted: ['bota','čepice','kalhoty'] },
    { words: ['dort','zmrzlina','koláč'],   sorted: ['dort','koláč','zmrzlina'] },
    { words: ['řeka','potok','jezero'],     sorted: ['jezero','potok','řeka'] },
    { words: ['pondělí','úterý','středa'],  sorted: ['pondělí','středa','úterý'] },
    { words: ['duben','únor','říjen'],      sorted: ['duben','říjen','únor'] },
    { words: ['oko','nos','ucho'],          sorted: ['nos','oko','ucho'] },
    { words: ['tygr','opice','zebra'],      sorted: ['opice','tygr','zebra'] },
    { words: ['hruška','broskev','třešeň'], sorted: ['broskev','hruška','třešeň'] },
    { words: ['liška','jezevec','veverka'], sorted: ['jezevec','liška','veverka'] },
    { words: ['loďka','balón','kánoe'],     sorted: ['balón','kánoe','loďka'] },
    { words: ['pizza','salát','polévka'],   sorted: ['pizza','polévka','salát'] },
    { words: ['fotbal','hokej','tenis'],    sorted: ['fotbal','hokej','tenis'] },
    { words: ['vlna','bavlna','hedvábí'],   sorted: ['bavlna','hedvábí','vlna'] },
    { words: ['zrcadlo','lampa','křeslo'],  sorted: ['křeslo','lampa','zrcadlo'] },
  ],

  // ══════ ČEŠTINA: nadřazená slova (20 otázek) ══════
  'czech-hypernym': [
    { prompt: 'pes, kočka, zajíc jsou...',           correct: 'zvířata',            options: ['zvířata','nábytek','barvy'] },
    { prompt: 'auto, vlak, letadlo jsou...',         correct: 'dopravní prostředky',options: ['dopravní prostředky','ovoce','nábytek'] },
    { prompt: 'jablko, hruška, švestka jsou...',     correct: 'ovoce',              options: ['ovoce','zelenina','zvířata'] },
    { prompt: 'červená, modrá, zelená jsou...',      correct: 'barvy',              options: ['barvy','čísla','zvířata'] },
    { prompt: 'stůl, postel, skříň jsou...',         correct: 'nábytek',            options: ['nábytek','ovoce','barvy'] },
    { prompt: 'mrkev, zelí, rajče jsou...',          correct: 'zelenina',           options: ['zelenina','ovoce','zvířata'] },
    { prompt: 'boty, sandály, tenisky jsou...',      correct: 'obuv',               options: ['obuv','oblečení','hračky'] },
    { prompt: 'tužka, pastelka, pero jsou...',       correct: 'psací potřeby',      options: ['psací potřeby','nábytek','hračky'] },
    { prompt: 'papoušek, sova, čáp jsou...',         correct: 'ptáci',              options: ['ptáci','ryby','hmyz'] },
    { prompt: 'bříza, dub, smrk jsou...',            correct: 'stromy',             options: ['stromy','květiny','ovoce'] },
    { prompt: 'kytara, piano, buben jsou...',        correct: 'hudební nástroje',   options: ['hudební nástroje','nábytek','barvy'] },
    { prompt: 'fotbal, hokej, tenis jsou...',        correct: 'sporty',             options: ['sporty','hračky','zvířata'] },
    { prompt: 'tričko, kalhoty, bunda jsou...',      correct: 'oblečení',           options: ['oblečení','obuv','nábytek'] },
    { prompt: 'pondělí, úterý, středa jsou...',      correct: 'dny v týdnu',        options: ['dny v týdnu','měsíce','barvy'] },
    { prompt: 'růže, tulipán, sedmikráska jsou...',  correct: 'květiny',            options: ['květiny','stromy','ovoce'] },
    { prompt: 'kapr, pstruh, štika jsou...',         correct: 'ryby',               options: ['ryby','ptáci','hmyz'] },
    { prompt: 'nůžky, pravítko, lepidlo jsou...',    correct: 'školní potřeby',     options: ['školní potřeby','hračky','obuv'] },
    { prompt: 'dort, koláč, zmrzlina jsou...',       correct: 'sladkosti',          options: ['sladkosti','ovoce','zelenina'] },
    { prompt: 'kuře, husa, krocan jsou...',          correct: 'drůbež',             options: ['drůbež','ryby','hmyz'] },
    { prompt: 'noc, den, ráno jsou...',              correct: 'části dne',          options: ['části dne','měsíce','barvy'] },
  ],

  // ══════ ANGLIČTINA: emoji → vyber slovo (50) ══════
  'english-match': [
    { emoji: '🐱', correct: 'cat',       options: ['cat','dog','fish'] },
    { emoji: '🐶', correct: 'dog',       options: ['dog','cat','bird'] },
    { emoji: '🍎', correct: 'apple',     options: ['apple','tree','star'] },
    { emoji: '🏠', correct: 'house',     options: ['house','moon','sun'] },
    { emoji: '☀️', correct: 'sun',       options: ['sun','moon','star'] },
    { emoji: '🌳', correct: 'tree',      options: ['tree','flower','star'] },
    { emoji: '🐟', correct: 'fish',      options: ['fish','bird','frog'] },
    { emoji: '🌙', correct: 'moon',      options: ['moon','sun','star'] },
    { emoji: '📚', correct: 'book',      options: ['book','pen','bag'] },
    { emoji: '✏️', correct: 'pen',       options: ['pen','book','bag'] },
    { emoji: '🚗', correct: 'car',       options: ['car','bus','bike'] },
    { emoji: '🐦', correct: 'bird',      options: ['bird','fish','dog'] },
    { emoji: '🌸', correct: 'flower',    options: ['flower','tree','grass'] },
    { emoji: '⭐', correct: 'star',      options: ['star','moon','sun'] },
    { emoji: '🍌', correct: 'banana',    options: ['banana','apple','orange'] },
    { emoji: '🐸', correct: 'frog',      options: ['frog','fish','fox'] },
    { emoji: '🎒', correct: 'bag',       options: ['bag','hat','pen'] },
    { emoji: '🎩', correct: 'hat',       options: ['hat','bag','shoe'] },
    { emoji: '👟', correct: 'shoe',      options: ['shoe','hat','bag'] },
    { emoji: '🚌', correct: 'bus',       options: ['bus','car','bike'] },
    { emoji: '🚲', correct: 'bike',      options: ['bike','car','bus'] },
    { emoji: '🍊', correct: 'orange',    options: ['orange','apple','banana'] },
    { emoji: '🍓', correct: 'strawberry',options: ['strawberry','cherry','apple'] },
    { emoji: '🐍', correct: 'snake',     options: ['snake','frog','fish'] },
    { emoji: '🐘', correct: 'elephant',  options: ['elephant','tiger','lion'] },
    { emoji: '🦁', correct: 'lion',      options: ['lion','tiger','bear'] },
    { emoji: '🐻', correct: 'bear',      options: ['bear','lion','wolf'] },
    { emoji: '🐧', correct: 'penguin',   options: ['penguin','bird','duck'] },
    { emoji: '🦆', correct: 'duck',      options: ['duck','bird','frog'] },
    { emoji: '🐴', correct: 'horse',     options: ['horse','cow','pig'] },
    { emoji: '🐷', correct: 'pig',       options: ['pig','cow','horse'] },
    { emoji: '🐄', correct: 'cow',       options: ['cow','pig','horse'] },
    { emoji: '🌈', correct: 'rainbow',   options: ['rainbow','sun','cloud'] },
    { emoji: '☁️', correct: 'cloud',     options: ['cloud','rain','sun'] },
    { emoji: '🌧️', correct: 'rain',      options: ['rain','snow','cloud'] },
    { emoji: '❄️', correct: 'snow',      options: ['snow','rain','ice'] },
    { emoji: '🔑', correct: 'key',       options: ['key','door','lock'] },
    { emoji: '🚪', correct: 'door',      options: ['door','window','key'] },
    { emoji: '🍕', correct: 'pizza',     options: ['pizza','cake','bread'] },
    { emoji: '🎂', correct: 'cake',      options: ['cake','pizza','bread'] },
    { emoji: '⚽', correct: 'ball',      options: ['ball','bat','goal'] },
    { emoji: '👁️', correct: 'eye',       options: ['eye','ear','nose'] },
    { emoji: '👂', correct: 'ear',       options: ['ear','eye','mouth'] },
    { emoji: '👃', correct: 'nose',      options: ['nose','eye','ear'] },
    { emoji: '✋', correct: 'hand',      options: ['hand','foot','arm'] },
    { emoji: '🦶', correct: 'foot',      options: ['foot','hand','leg'] },
    { emoji: '🏔️', correct: 'mountain',  options: ['mountain','river','lake'] },
    { emoji: '🌊', correct: 'sea',       options: ['sea','river','lake'] },
    { emoji: '🐢', correct: 'turtle',    options: ['turtle','frog','snake'] },
    { emoji: '🦋', correct: 'butterfly', options: ['butterfly','bird','bee'] },
  ],

  // ══════ ANGLIČTINA: spelling (50 slov) ══════
  'english-spelling': [
    { emoji: '🐱', czech: 'kočka',    word: 'CAT',       extraLetters: ['X','N'] },
    { emoji: '🐶', czech: 'pes',      word: 'DOG',       extraLetters: ['R','L'] },
    { emoji: '🏠', czech: 'dům',      word: 'HOUSE',     extraLetters: ['R','T'] },
    { emoji: '☀️', czech: 'slunce',   word: 'SUN',       extraLetters: ['P','A'] },
    { emoji: '🍎', czech: 'jablko',   word: 'APPLE',     extraLetters: ['T','N'] },
    { emoji: '🌳', czech: 'strom',    word: 'TREE',      extraLetters: ['A','N'] },
    { emoji: '🌙', czech: 'měsíc',    word: 'MOON',      extraLetters: ['B','S'] },
    { emoji: '🐟', czech: 'ryba',     word: 'FISH',      extraLetters: ['U','Y'] },
    { emoji: '⭐', czech: 'hvězda',   word: 'STAR',      extraLetters: ['N','L'] },
    { emoji: '🐦', czech: 'pták',     word: 'BIRD',      extraLetters: ['S','K'] },
    { emoji: '🚗', czech: 'auto',     word: 'CAR',       extraLetters: ['B','Z'] },
    { emoji: '✏️', czech: 'tužka',    word: 'PEN',       extraLetters: ['M','R'] },
    { emoji: '📚', czech: 'kniha',    word: 'BOOK',      extraLetters: ['F','N'] },
    { emoji: '🐸', czech: 'žába',     word: 'FROG',      extraLetters: ['T','N'] },
    { emoji: '🎒', czech: 'taška',    word: 'BAG',       extraLetters: ['T','N'] },
    { emoji: '🐍', czech: 'had',      word: 'SNAKE',     extraLetters: ['P','T'] },
    { emoji: '🎩', czech: 'klobouk',  word: 'HAT',       extraLetters: ['R','N'] },
    { emoji: '👟', czech: 'bota',     word: 'SHOE',      extraLetters: ['P','T'] },
    { emoji: '🌸', czech: 'květina',  word: 'FLOWER',    extraLetters: ['B','K'] },
    { emoji: '🦁', czech: 'lev',      word: 'LION',      extraLetters: ['K','T'] },
    { emoji: '🚌', czech: 'autobus',  word: 'BUS',       extraLetters: ['T','A'] },
    { emoji: '🍕', czech: 'pizza',    word: 'PIZZA',     extraLetters: ['B','S'] },
    { emoji: '🔑', czech: 'klíč',     word: 'KEY',       extraLetters: ['A','N'] },
    { emoji: '🐴', czech: 'kůň',      word: 'HORSE',     extraLetters: ['B','T'] },
    { emoji: '🐷', czech: 'prase',    word: 'PIG',       extraLetters: ['A','T'] },
    { emoji: '⚽', czech: 'míč',      word: 'BALL',      extraLetters: ['T','N'] },
    { emoji: '🎂', czech: 'dort',     word: 'CAKE',      extraLetters: ['T','N'] },
    { emoji: '❄️', czech: 'sníh',     word: 'SNOW',      extraLetters: ['B','T'] },
    { emoji: '🌧️', czech: 'déšť',     word: 'RAIN',      extraLetters: ['T','S'] },
    { emoji: '🚪', czech: 'dveře',    word: 'DOOR',      extraLetters: ['B','T'] },
    { emoji: '👁️', czech: 'oko',      word: 'EYE',       extraLetters: ['A','T'] },
    { emoji: '👃', czech: 'nos',      word: 'NOSE',      extraLetters: ['T','R'] },
    { emoji: '👂', czech: 'ucho',     word: 'EAR',       extraLetters: ['T','N'] },
    { emoji: '🐻', czech: 'medvěd',   word: 'BEAR',      extraLetters: ['T','N'] },
    { emoji: '🐧', czech: 'tučňák',   word: 'PENGUIN',   extraLetters: ['S','T'] },
    { emoji: '🌊', czech: 'moře',     word: 'SEA',       extraLetters: ['T','N'] },
    { emoji: '🐄', czech: 'kráva',    word: 'COW',       extraLetters: ['T','N'] },
    { emoji: '🍌', czech: 'banán',    word: 'BANANA',    extraLetters: ['T','S'] },
    { emoji: '🍊', czech: 'pomeranč', word: 'ORANGE',    extraLetters: ['T','S'] },
    { emoji: '☁️', czech: 'mrak',     word: 'CLOUD',     extraLetters: ['T','N'] },
    { emoji: '🦆', czech: 'kachna',   word: 'DUCK',      extraLetters: ['T','N'] },
    { emoji: '✋', czech: 'ruka',     word: 'HAND',      extraLetters: ['T','R'] },
    { emoji: '🦶', czech: 'noha',     word: 'FOOT',      extraLetters: ['N','R'] },
    { emoji: '🌈', czech: 'duha',     word: 'RAINBOW',   extraLetters: ['X','S'] },
    { emoji: '🐢', czech: 'želva',    word: 'TURTLE',    extraLetters: ['S','N'] },
    { emoji: '🦋', czech: 'motýl',    word: 'BUTTERFLY', extraLetters: ['X','S'] },
    { emoji: '🐘', czech: 'slon',     word: 'ELEPHANT',  extraLetters: ['X','B'] },
    { emoji: '🍓', czech: 'jahoda',   word: 'STRAWBERRY',extraLetters: ['X','N'] },
    { emoji: '🏔️', czech: 'hora',     word: 'MOUNTAIN',  extraLetters: ['B','S'] },
    { emoji: '🐴', czech: 'kůň',      word: 'HORSE',     extraLetters: ['T','N'] },
  ],

  // ══════ ANGLIČTINA: čtení → vyber emoji (50) ══════
  'english-reading': [
    { word: 'CAT',       correct: '🐱', options: ['🐱','🐶','🐟','🦊'] },
    { word: 'DOG',       correct: '🐶', options: ['🐶','🐱','🐸','🐦'] },
    { word: 'FISH',      correct: '🐟', options: ['🐟','🐱','🐶','🐍'] },
    { word: 'TREE',      correct: '🌳', options: ['🌳','🌸','⭐','🌙'] },
    { word: 'STAR',      correct: '⭐', options: ['⭐','🌙','☀️','🌟'] },
    { word: 'MOON',      correct: '🌙', options: ['🌙','⭐','☀️','🌈'] },
    { word: 'SUN',       correct: '☀️', options: ['☀️','🌙','⭐','🌈'] },
    { word: 'BIRD',      correct: '🐦', options: ['🐦','🐟','🐱','🐶'] },
    { word: 'FLOWER',    correct: '🌸', options: ['🌸','🌳','⭐','🍎'] },
    { word: 'BOOK',      correct: '📚', options: ['📚','✏️','🏠','🌙'] },
    { word: 'HOUSE',     correct: '🏠', options: ['🏠','🏰','🏢','⛺'] },
    { word: 'APPLE',     correct: '🍎', options: ['🍎','🍌','🍊','🌳'] },
    { word: 'CAR',       correct: '🚗', options: ['🚗','🚌','🚲','✈️'] },
    { word: 'PEN',       correct: '✏️', options: ['✏️','📚','🎒','📝'] },
    { word: 'BANANA',    correct: '🍌', options: ['🍌','🍎','🍊','🍇'] },
    { word: 'FROG',      correct: '🐸', options: ['🐸','🐟','🐱','🐍'] },
    { word: 'BAG',       correct: '🎒', options: ['🎒','🎩','👟','✏️'] },
    { word: 'HAT',       correct: '🎩', options: ['🎩','🎒','👟','🧤'] },
    { word: 'SHOE',      correct: '👟', options: ['👟','🎩','🎒','🧦'] },
    { word: 'SNAKE',     correct: '🐍', options: ['🐍','🐸','🐟','🦎'] },
    { word: 'LION',      correct: '🦁', options: ['🦁','🐯','🐻','🐘'] },
    { word: 'BEAR',      correct: '🐻', options: ['🐻','🦁','🐯','🐘'] },
    { word: 'ELEPHANT',  correct: '🐘', options: ['🐘','🦁','🐯','🐻'] },
    { word: 'HORSE',     correct: '🐴', options: ['🐴','🐄','🐷','🐑'] },
    { word: 'PIG',       correct: '🐷', options: ['🐷','🐄','🐴','🐑'] },
    { word: 'COW',       correct: '🐄', options: ['🐄','🐷','🐴','🐑'] },
    { word: 'PENGUIN',   correct: '🐧', options: ['🐧','🦆','🐦','🦅'] },
    { word: 'DUCK',      correct: '🦆', options: ['🦆','🐧','🐦','🐸'] },
    { word: 'BUS',       correct: '🚌', options: ['🚌','🚗','🚲','🚂'] },
    { word: 'BIKE',      correct: '🚲', options: ['🚲','🚗','🚌','🛴'] },
    { word: 'RAINBOW',   correct: '🌈', options: ['🌈','☀️','🌙','⭐'] },
    { word: 'SNOW',      correct: '❄️', options: ['❄️','🌧️','☁️','☀️'] },
    { word: 'RAIN',      correct: '🌧️', options: ['🌧️','❄️','☁️','☀️'] },
    { word: 'CLOUD',     correct: '☁️', options: ['☁️','🌧️','❄️','☀️'] },
    { word: 'KEY',       correct: '🔑', options: ['🔑','🚪','🔒','🏠'] },
    { word: 'DOOR',      correct: '🚪', options: ['🚪','🔑','🪟','🏠'] },
    { word: 'PIZZA',     correct: '🍕', options: ['🍕','🎂','🍔','🌭'] },
    { word: 'CAKE',      correct: '🎂', options: ['🎂','🍕','🧁','🍩'] },
    { word: 'BALL',      correct: '⚽', options: ['⚽','🏀','🎾','🏈'] },
    { word: 'EYE',       correct: '👁️', options: ['👁️','👂','👃','👄'] },
    { word: 'EAR',       correct: '👂', options: ['👂','👁️','👃','👄'] },
    { word: 'NOSE',      correct: '👃', options: ['👃','👁️','👂','👄'] },
    { word: 'HAND',      correct: '✋', options: ['✋','🦶','👂','👁️'] },
    { word: 'FOOT',      correct: '🦶', options: ['🦶','✋','👂','👃'] },
    { word: 'ORANGE',    correct: '🍊', options: ['🍊','🍎','🍌','🍋'] },
    { word: 'SEA',       correct: '🌊', options: ['🌊','🏔️','🌳','🏖️'] },
    { word: 'MOUNTAIN',  correct: '🏔️', options: ['🏔️','🌊','🌳','🏖️'] },
    { word: 'TURTLE',    correct: '🐢', options: ['🐢','🐸','🐍','🦎'] },
    { word: 'BUTTERFLY', correct: '🦋', options: ['🦋','🐦','🐝','🌸'] },
    { word: 'STRAWBERRY',correct: '🍓', options: ['🍓','🍒','🍎','🍇'] },
  ],

  // ══════ ČEŠTINA: čtení s porozuměním (12 textů) ══════
  'czech-reading': [
    { text: 'Petr má rád zvířata. Doma má pejska a kočku.',                          prompt: 'Kolik zvířat má Petr doma?',     correct: 'dvě',              options: ['dvě','tři','jedno'] },
    { text: 'Eva si o víkendu koupila novou knihu. Hned ji začala číst.',           prompt: 'Co si Eva koupila?',             correct: 'knihu',            options: ['knihu','tašku','pero'] },
    { text: 'Tomáš jel na výlet do lesa. Viděl tam veverku a srnku.',              prompt: 'Kam jel Tomáš?',                 correct: 'do lesa',          options: ['do lesa','do města','k moři'] },
    { text: 'Maminka upekla bábovku. Voněla po čokoládě.',                          prompt: 'Co maminka upekla?',             correct: 'bábovku',          options: ['bábovku','koláč','dort'] },
    { text: 'Klára dostala k narozeninám červené kolo. Hned si na něm vyjela.',    prompt: 'Jakou barvu má kolo?',           correct: 'červenou',         options: ['červenou','modrou','zelenou'] },
    { text: 'V zahradě kvetou tulipány. Včely si na nich pochutnávají.',           prompt: 'Kdo si pochutnává na tulipánech?',correct: 'včely',            options: ['včely','motýli','mouchy'] },
    { text: 'Honza zakopl o kámen a spadl. Maminka mu dala náplast na koleno.',    prompt: 'Kde má Honza náplast?',          correct: 'na koleni',        options: ['na koleni','na ruce','na hlavě'] },
    { text: 'Liška spí přes den a loví v noci. Je to noční zvíře.',                prompt: 'Kdy liška loví?',                correct: 'v noci',           options: ['v noci','ráno','v poledne'] },
    { text: 'Děti staví sněhuláka. Místo nosu mu dají mrkev.',                      prompt: 'Co bude mít sněhulák místo nosu?',correct: 'mrkev',            options: ['mrkev','jablko','tužku'] },
    { text: 'Ondra chodí každý čtvrtek na fotbal. Hraje za malé žáky.',            prompt: 'Kdy chodí Ondra na fotbal?',     correct: 'každý čtvrtek',    options: ['každý čtvrtek','v pondělí','o víkendu'] },
    { text: 'Babička vařila polévku. Přidala do ní mrkev a brambory.',             prompt: 'Co dala babička do polévky?',    correct: 'mrkev a brambory', options: ['mrkev a brambory','rajčata','jablka'] },
    { text: 'Anna ráda maluje. Nejvíc se jí líbí kreslit zvířátka.',                prompt: 'Co Anna nejraději maluje?',      correct: 'zvířátka',         options: ['zvířátka','auta','domy'] },
  ],

  // ══════ ČEŠTINA: doplnit diakritiku (15 slov) ══════
  'czech-diacritics': [
    { emoji: '🐴', correct: 'kůň',      options: ['kun','kůň','kuň'] },
    { emoji: '🧀', correct: 'sýr',      options: ['sir','sýr','sír'] },
    { emoji: '🐻', correct: 'medvěd',   options: ['medved','medvěd','medvéd'] },
    { emoji: '🔑', correct: 'klíč',     options: ['klic','klíč','klič'] },
    { emoji: '🥛', correct: 'mléko',    options: ['mleko','mléko','mlěko'] },
    { emoji: '🌅', correct: 'ráno',     options: ['rano','ráno','raňo'] },
    { emoji: '⚽', correct: 'míč',      options: ['mic','míč','mič'] },
    { emoji: '🏖️', correct: 'písek',    options: ['pisek','písek','píšek'] },
    { emoji: '🔢', correct: 'číslo',    options: ['cislo','číslo','čislo'] },
    { emoji: '👴', correct: 'dědeček',  options: ['dedecek','dědeček','dědecek'] },
    { emoji: '🌧️', correct: 'déšť',     options: ['dest','déšť','déšt'] },
    { emoji: '🦋', correct: 'motýl',    options: ['motyl','motýl','motyl'] },
    { emoji: '🐢', correct: 'želva',    options: ['zelva','želva','žélva'] },
    { emoji: '🍯', correct: 'včela',    options: ['vcela','včela','vcéla'] },
    { emoji: '🌳', correct: 'třešeň',   options: ['tresen','třešeň','třesen'] },
  ],

  // ══════ ČEŠTINA: skládání slov z písmen (15 slov) ══════
  'czech-letters': [
    { word: 'KOČKA',   emoji: '🐱' },
    { word: 'PEJSEK',  emoji: '🐶' },
    { word: 'STROM',   emoji: '🌳' },
    { word: 'AUTO',    emoji: '🚗' },
    { word: 'JABLKO',  emoji: '🍎' },
    { word: 'SLUNCE',  emoji: '☀️' },
    { word: 'KNIHA',   emoji: '📖' },
    { word: 'ŠKOLA',   emoji: '🏫' },
    { word: 'MOTÝL',   emoji: '🦋' },
    { word: 'DOMEK',   emoji: '🏠' },
    { word: 'RYBA',    emoji: '🐟' },
    { word: 'HRAD',    emoji: '🏰' },
    { word: 'VLAK',    emoji: '🚂' },
    { word: 'BANÁN',   emoji: '🍌' },
    { word: 'KVĚTINA', emoji: '🌸' },
  ],
};

// ─── Generátory matematiky ──────────────────────────────────────────────────

function genAdditionEasy() {
  const a = randInt(1, 10);
  const b = randInt(1, Math.min(10, 20 - a));
  const ans = a + b;
  return { text: `${a} + ${b} = ?`, correct: ans, options: shuffle([ans, ans + 1, ans > 1 ? ans - 1 : ans + 2]) };
}

function genSubtraction() {
  const a = randInt(20, 80);
  const b = randInt(1, Math.min(20, a - 1));
  const ans = a - b;
  return { text: `${a} − ${b} = ?`, correct: ans, options: shuffle([ans, ans + 1, ans > 0 ? ans - 1 : ans + 2]) };
}

function genMultiply2() {
  if (Math.random() > 0.5) {
    const a = randInt(1, 9);
    const ans = a * 2;
    return { text: `2 × ${a} = ?`, correct: ans, options: shuffle([ans, ans + 2, ans - 2 > 0 ? ans - 2 : ans + 4]) };
  } else {
    const a = randInt(1, 9) * 2;
    const ans = a / 2;
    return { text: `${a} ÷ 2 = ?`, correct: ans, options: shuffle([ans, ans + 1, ans > 1 ? ans - 1 : ans + 2]) };
  }
}

function genDecompose() {
  const tens = randInt(1, 9) * 10;
  const units = randInt(1, 9);
  const n = tens + units;
  return { text: `${n} = ${tens} + ?`, correct: units, options: shuffle([units, units + 1, units > 1 ? units - 1 : units + 2]) };
}

function genPyramid() {
  const b1 = randInt(1, 6), b2 = randInt(1, 6), b3 = randInt(1, 6);
  const m1 = b1 + b2, m2 = b2 + b3;
  const top = m1 + m2;
  const cells = [top, m1, m2, b1, b2, b3];
  // Skryj jednu buňku (ne rohové — ty jsou triviální)
  const hideOpts = [0, 1, 2, 4]; // top, midL, midR, botMid
  const hideIdx = hideOpts[randInt(0, hideOpts.length - 1)];
  const correct = cells[hideIdx];
  return {
    cells, hideIdx, correct,
    options: shuffle([correct, correct + 1, correct > 1 ? correct - 1 : correct + 2])
  };
}

const WORD_PROBLEMS = [
  // Sčítání
  { emoji: '🏹', text: 'Atreju má 8 šípů a najde ještě 5. Kolik šípů má celkem?',                     correct: 13, options: [12,13,14] },
  { emoji: '🐉', text: 'Falkor přeletěl ráno 45 km a odpoledne 30 km. Kolik km celkem?',              correct: 75, options: [70,75,80] },
  { emoji: '🎒', text: 'V batohu je 9 knih a přidáš 6. Kolik knih je v batohu?',                       correct: 15, options: [14,15,16] },
  { emoji: '🍎', text: 'Na stromě visí 14 jablek a 8 hrušek. Kolik ovoce celkem?',                     correct: 22, options: [20,22,24] },
  { emoji: '🐦', text: 'Na plotě sedí 7 ptáků. Přiletí dalších 9. Kolik ptáků je na plotě?',           correct: 16, options: [15,16,17] },
  { emoji: '🧱', text: 'Steve má 35 bloků a najde dalších 15. Kolik bloků má?',                         correct: 50, options: [45,50,55] },
  { emoji: '⭐', text: 'Harry získal 23 bodů ráno a 17 odpoledne. Kolik bodů celkem?',                  correct: 40, options: [38,40,42] },
  // Odčítání
  { emoji: '🧝', text: 'V lese žije 12 elfů. 4 z nich odešli pryč. Kolik elfů zůstalo?',              correct: 8,  options: [7,8,9] },
  { emoji: '💰', text: 'Bastian má 20 zlatých. Utratí 7. Kolik zlatých mu zbyde?',                     correct: 13, options: [12,13,14] },
  { emoji: '🌟', text: 'Falkor sbírá hvězdy. Má 16 hvězd a daruje 8. Kolik mu zbyde?',                correct: 8,  options: [7,8,9] },
  { emoji: '🍪', text: 'Maminka upekla 30 koláčků. Snědli jsme 12. Kolik zbývá?',                      correct: 18, options: [16,18,20] },
  { emoji: '📚', text: 'Ve třídě bylo 25 sešitů. 9 rozdali. Kolik jich zbylo?',                        correct: 16, options: [15,16,17] },
  { emoji: '🎈', text: 'Na oslavě bylo 20 balónků. 6 prasklo. Kolik zůstalo?',                          correct: 14, options: [13,14,15] },
  { emoji: '🐸', text: 'U rybníka žije 18 žab. 5 odskákalo. Kolik žab zůstalo?',                       correct: 13, options: [12,13,14] },
  // Násobení a dělení
  { emoji: '⛏️', text: 'Každý trpaslík nese 2 kameny. Je 6 trpaslíků. Kolik kamenů celkem?',          correct: 12, options: [10,12,14] },
  { emoji: '🧪', text: 'Čaroděj má 3 lahvičky a potřebuje 2× tolik. Kolik lahviček potřebuje?',        correct: 6,  options: [5,6,7] },
  { emoji: '🐴', text: 'Každý kůň sní 4 jablka denně. Jsou 3 koně. Kolik jablek potřebují?',           correct: 12, options: [10,12,14] },
  { emoji: '🪙', text: 'Luke má 18 kreditů a polovinu dá kamarádovi. Kolik kreditů mu zůstane?',       correct: 9,  options: [8,9,10] },
  { emoji: '🧁', text: 'Na každý stůl dáme 5 dortíků. Máme 4 stoly. Kolik dortíků potřebujeme?',       correct: 20, options: [18,20,22] },
  { emoji: '🦋', text: 'Wednesday viděla 14 motýlů a polovinu chytila. Kolik jich chytila?',            correct: 7,  options: [6,7,8] },
  // Složitější
  { emoji: '🏰', text: 'Na hradě bydlí 15 rytířů. Přijede 8 a 3 odjedou. Kolik jich je?',              correct: 20, options: [18,20,22] },
  { emoji: '🐟', text: 'Rybář chytil 9 ryb ráno a 7 odpoledne. 4 pustil zpět. Kolik má?',              correct: 12, options: [11,12,13] },
  { emoji: '🎮', text: 'Hráč má 50 životů. Ztratí 15 a najde bonus 10. Kolik životů má?',              correct: 45, options: [43,45,47] },
  { emoji: '🌳', text: 'V sadu roste 8 jabloní a 6 hrušní. Kolik stromů celkem?',                      correct: 14, options: [13,14,15] },
  { emoji: '🎪', text: 'V cirkuse je 24 sedadel ve 2 řadách. Kolik sedadel v jedné řadě?',             correct: 12, options: [10,12,14] },
  { emoji: '🐕', text: 'Petr venčí 3 psy. Každý pes má 4 pamlsky. Kolik pamlsků potřebuje?',           correct: 12, options: [10,12,14] },
  { emoji: '🚂', text: 'Vlak má 5 vagónů. V každém je 10 lidí. Kolik lidí jede vlakem?',               correct: 50, options: [40,50,60] },
  { emoji: '📦', text: 'V krabici je 36 bonbónů. Rozdělíme je 2 dětem. Kolik dostane každé?',           correct: 18, options: [16,18,20] },
  { emoji: '🏫', text: 'Ve třídě je 28 dětí. 13 je chlapců. Kolik je dívek?',                           correct: 15, options: [14,15,16] },
  { emoji: '🎂', text: 'Na dort potřebujeme 4 vejce. Pečeme 2 dorty. Kolik vajec potřebujeme?',        correct: 8,  options: [6,8,10] },
  { emoji: '🦸', text: 'Superhrdina zachránil 11 lidí ráno a 9 večer. Kolik lidí zachránil?',           correct: 20, options: [18,20,22] },
];

// ─── Herní engine ──────────────────────────────────────────────────────────

const Games = {
  container: null,
  gameType: null,
  onComplete: null,
  score: 0,
  streak: 0,
  totalAnswered: 0,
  qIndex: 0,
  questionPool: [],
  processing: false,
  TARGET_SCORE: 5,

  start(container, gameType, callback) {
    this.container = container;
    this.gameType = gameType;
    this.onComplete = callback;
    this.score = 0;
    this.streak = 0;
    this.totalAnswered = 0;
    this.qIndex = 0;
    this.processing = false;
    this.TARGET_SCORE = 5 + Math.floor(Math.random() * 3); // 5, 6 nebo 7
    this.questionPool = this.buildInitialPool(gameType);
    this.render();
  },

  buildInitialPool(type) {
    const POOL = 12;
    if (type === 'math-addition-easy') return Array.from({ length: POOL }, genAdditionEasy);
    if (type === 'math-subtraction')   return Array.from({ length: POOL }, genSubtraction);
    if (type === 'math-multiply2')     return Array.from({ length: POOL }, genMultiply2);
    if (type === 'math-decompose')     return Array.from({ length: POOL }, genDecompose);
    if (type === 'math-pyramid')       return Array.from({ length: POOL }, genPyramid);
    if (type === 'math-wordproblem') {
      const pool = [];
      while (pool.length < POOL) pool.push(...shuffle([...WORD_PROBLEMS]));
      return pool.slice(0, POOL);
    }
    const data = GAME_DATA[type] || [];
    if (!data.length) return [];
    const pool = [];
    while (pool.length < POOL) pool.push(...shuffle([...data]));
    return pool.slice(0, POOL);
  },

  generateExtraQuestion() {
    const t = this.gameType;
    if (t === 'math-addition-easy') return genAdditionEasy();
    if (t === 'math-subtraction')   return genSubtraction();
    if (t === 'math-multiply2')     return genMultiply2();
    if (t === 'math-decompose')     return genDecompose();
    if (t === 'math-pyramid')       return genPyramid();
    if (t === 'math-wordproblem')   return WORD_PROBLEMS[Math.floor(Math.random() * WORD_PROBLEMS.length)];
    const data = GAME_DATA[t] || [];
    return data.length ? data[Math.floor(Math.random() * data.length)] : null;
  },

  render() {
    const q = this.questionPool[this.qIndex];
    if (!q) return;
    this.container.innerHTML = '';

    // Progress (hvězdičky)
    const progress = document.createElement('div');
    progress.className = 'game-progress';
    const filled = '⭐'.repeat(this.score);
    const empty  = '☆'.repeat(Math.max(0, this.TARGET_SCORE - this.score));
    progress.innerHTML = `
      <div class="progress-stars">${filled}${empty}</div>
      <div class="progress-label">${this.score} / ${this.TARGET_SCORE}</div>
    `;
    this.container.appendChild(progress);

    // Herní plocha
    const area = document.createElement('div');
    area.className = 'game-area fade-in';

    switch (this.gameType) {
      case 'math-addition-easy':
      case 'math-subtraction':
      case 'math-multiply2':
      case 'math-decompose':
        this.renderMathChoice(area, q); break;
      case 'math-pyramid':
        this.renderPyramid(area, q); break;
      case 'math-wordproblem':
        this.renderWordProblem(area, q); break;
      case 'czech-soft-i':
        this.renderSoftI(area, q); break;
      case 'czech-paired':
        this.renderPaired(area, q); break;
      case 'czech-alphabet':
        this.renderAlphabet(area, q); break;
      case 'czech-hypernym':
        this.renderHypernym(area, q); break;
      case 'czech-long-iy':
        this.renderLongIY(area, q); break;
      case 'english-match':
        this.renderMatchQ(area, q); break;
      case 'english-spelling':
        this.renderSpelling(area, q); break;
      case 'english-reading':
        this.renderReading(area, q); break;
      case 'czech-reading':
        this.renderCzechReading(area, q); break;
      case 'czech-diacritics':
        this.renderDiacritics(area, q); break;
      case 'czech-letters':
        this.renderLetters(area, q); break;
    }

    this.container.appendChild(area);

    // Odeber focus z tlačítek (prevence auto-focus na mobilu)
    if (document.activeElement) document.activeElement.blur();
  },

  submit(isCorrect, feedbackEl) {
    if (this.processing) return;
    this.processing = true;

    this.totalAnswered++;

    if (isCorrect) {
      this.score++;
      this.streak++;
      Sound.correct();
      spawnStars(this.container);

      if (feedbackEl) {
        feedbackEl.className = 'feedback-line correct-flash';
        feedbackEl.innerHTML = '✓ Správně! 🌟';
      }

      // Série
      if (this.streak >= 2) {
        setTimeout(() => this.showStreakMessage(this.streak), 300);
      }

    } else {
      this.streak = 0;
      Sound.wrong();
      const area = this.container.querySelector('.game-area');
      if (area) {
        area.classList.add('shake');
        setTimeout(() => area.classList.remove('shake'), 600);
      }

      if (feedbackEl) {
        feedbackEl.className = 'feedback-line wrong-flash';
        feedbackEl.innerHTML = 'Nevadí! 💪 Jede se dál.';
      }

      // Doplň pool, pokud docházejí otázky
      if (this.qIndex >= this.questionPool.length - 2) {
        const extra = this.generateExtraQuestion();
        if (extra) this.questionPool.push(extra);
      }
    }

    setTimeout(() => {
      this.processing = false;
      this.qIndex++;
      if (this.score >= this.TARGET_SCORE) {
        this.onComplete(this.calculateStars());
      } else {
        this.render();
      }
    }, isCorrect ? 950 : 1350);
  },

  calculateStars() {
    const extra = this.totalAnswered - this.TARGET_SCORE;
    if (extra === 0) return 5;
    if (extra <= 2) return 4;
    if (extra <= 4) return 3;
    if (extra <= 7) return 2;
    return 1;
  },

  showStreakMessage(streak) {
    const msgs = {
      2: '👍 2 v řadě!', 3: '🔥 3 v řadě! Skvělé!', 4: '⚡ 4 v řadě! Fantastické!',
      5: '🌟 5 v řadě! PERFEKTNÍ!', 6: '💎 6 v řadě! NEUVĚŘITELNÉ!',
      7: '🏆 7 v řadě! LEGENDÁRNÍ!', 8: '👑 8 v řadě! KRÁLOVSKÉ!',
      9: '🌈 9 v řadě! ZÁZRAČNÉ!', 10: '🦸 10 v řadě! SUPERHRDINA!',
    };
    const text = msgs[streak] || `🦸 ${streak} v řadě! SUPERHRDINA!`;
    const el = document.createElement('div');
    el.className = 'streak-popup';
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2100);
  },

  showFalkorMessage() {
    const themeId = window.App && App.state && App.state.theme;
    const msgs = (themeId && THEMES[themeId] && THEMES[themeId].messages) || FALLBACK_MESSAGES;
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    const el = document.createElement('div');
    el.className = 'falkor-popup';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  },

  // ── Matematika: výběr ze tří ──────────────────────────────────────────
  renderMathChoice(el, q) {
    el.innerHTML = `
      <div class="math-question">${q.text}</div>
      <div class="options-row">
        ${q.options.map(opt => `<button class="opt-btn" data-val="${opt}">${opt}</button>`).join('')}
      </div>
      <div class="feedback-line"></div>
    `;
    const fb = el.querySelector('.feedback-line');
    el.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.click();
        const ok = parseInt(btn.dataset.val) === q.correct;
        btn.classList.add(ok ? 'correct' : 'wrong');
        el.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
        this.submit(ok, fb);
      });
    });
  },

  // ── Slovní úloha ─────────────────────────────────────────────────────
  renderWordProblem(el, q) {
    el.innerHTML = `
      <div class="word-problem-emoji">${q.emoji}</div>
      <div class="word-problem-text">${q.text}</div>
      <div class="options-row">
        ${shuffle(q.options).map(opt => `<button class="opt-btn" data-val="${opt}">${opt}</button>`).join('')}
      </div>
      <div class="feedback-line"></div>
    `;
    const fb = el.querySelector('.feedback-line');
    el.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.click();
        const ok = parseInt(btn.dataset.val) === q.correct;
        btn.classList.add(ok ? 'correct' : 'wrong');
        el.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
        this.submit(ok, fb);
      });
    });
  },

  // ── Čeština: tvrdé/měkké I ───────────────────────────────────────────
  renderSoftI(el, q) {
    const display = q.word.replace('_', '<span class="blank-letter">_</span>');
    el.innerHTML = `
      <div class="soft-i-instruction">Doplň správné písmeno:</div>
      <div class="soft-i-word">${display}</div>
      <div class="options-row">
        <button class="opt-btn opt-large" data-val="y">Y</button>
        <button class="opt-btn opt-large" data-val="i">I</button>
      </div>
      <div class="feedback-line"></div>
    `;
    const fb = el.querySelector('.feedback-line');
    el.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.click();
        const ok = btn.dataset.val === q.correct;
        btn.classList.add(ok ? 'correct' : 'wrong');
        el.querySelector('.soft-i-word').innerHTML =
          q.word.replace('_', `<span class="filled-letter ${ok ? 'filled-correct' : 'filled-wrong'}">${q.correct.toUpperCase()}</span>`);
        el.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
        if (!ok) fb.innerHTML = `<span class="rule-hint">💡 ${q.rule}</span>`;
        this.submit(ok, ok ? fb : null);
      });
    });
  },

  // ── Čeština: párové souhlásky ────────────────────────────────────────
  renderPaired(el, q) {
    el.innerHTML = `
      <div class="paired-hint-emoji">${q.emoji}</div>
      <div class="paired-hint-text">${q.hint}</div>
      <div class="paired-word">${q.word.replace('_', '<span class="blank-letter">_</span>')}</div>
      <div class="options-row">
        ${q.options.map(l => `<button class="opt-btn opt-large" data-val="${l}">${l.toUpperCase()}</button>`).join('')}
      </div>
      <div class="feedback-line"></div>
    `;
    const fb = el.querySelector('.feedback-line');
    el.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.click();
        const ok = btn.dataset.val === q.correct;
        btn.classList.add(ok ? 'correct' : 'wrong');
        el.querySelector('.paired-word').innerHTML =
          `<span class="${ok ? 'paired-correct' : 'paired-wrong'}">${q.full}</span>`;
        el.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
        this.submit(ok, fb);
      });
    });
  },

  // ── Čeština: abeceda ─────────────────────────────────────────────────
  renderAlphabet(el, q) {
    const shuffled = shuffle([...q.words]);
    let selected = [];

    const rebuildSlots = () => {
      el.querySelectorAll('.alpha-slot').forEach((slot, i) => {
        if (i < selected.length) {
          slot.innerHTML = `<span class="slot-num">${i + 1}.</span> ${selected[i]}`;
          slot.classList.add('slot-filled');
        } else {
          slot.innerHTML = `<span class="slot-num">${i + 1}.</span>`;
          slot.classList.remove('slot-filled');
        }
      });
    };

    el.innerHTML = `
      <div class="alpha-instruction">Klikej na slova <strong>od A do Z</strong>:</div>
      <div class="alpha-hint">Klikni na slot pro odebrání slova</div>
      <div class="alpha-selected">
        ${q.words.map((_, i) => `<div class="alpha-slot" id="aslot-${i}"><span class="slot-num">${i + 1}.</span></div>`).join('')}
      </div>
      <div class="alpha-words" id="alpha-words">
        ${shuffled.map(w => `<button class="alpha-word-btn" data-word="${w}">${w}</button>`).join('')}
      </div>
      <div class="feedback-line"></div>
    `;

    const fb = el.querySelector('.feedback-line');

    // Kliknutí na slot — odeber slovo
    el.querySelectorAll('.alpha-slot').forEach(slot => {
      slot.addEventListener('click', () => {
        if (this.processing) return;
        const idx = parseInt(slot.id.replace('aslot-', ''));
        if (idx >= selected.length) return; // prázdný slot
        Sound.click();
        const removed = selected.splice(idx);
        // Vrať všechna odebraná slova zpět
        removed.forEach(word => {
          const btn = el.querySelector(`.alpha-word-btn[data-word="${word}"]`);
          if (btn) { btn.disabled = false; btn.classList.remove('selected-word'); }
        });
        rebuildSlots();
      });
    });

    el.querySelectorAll('.alpha-word-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.processing) return;
        Sound.click();
        const word = btn.dataset.word;
        const idx = selected.length;
        selected.push(word);
        btn.disabled = true;
        btn.classList.add('selected-word');
        rebuildSlots();

        if (selected.length === q.words.length) {
          const ok = selected.every((w, i) => w === q.sorted[i]);
          el.querySelectorAll('.alpha-slot').forEach((s, i) => {
            s.classList.add(selected[i] === q.sorted[i] ? 'slot-correct' : 'slot-wrong');
          });
          if (!ok) fb.innerHTML = `<span class="rule-hint">💡 Správně: ${q.sorted.join(' → ')}</span>`;
          this.submit(ok, ok ? fb : null);
        }
      });
    });
  },

  // ── Čeština: čtení s porozuměním ─────────────────────────────────────
  renderCzechReading(el, q) {
    el.innerHTML = `
      <div class="reading-instruction">📖 Přečti si text:</div>
      <div class="reading-text">${q.text}</div>
      <div class="reading-question">${q.prompt}</div>
      <div class="options-col">
        ${shuffle(q.options).map(opt => `<button class="opt-btn opt-hyp" data-val="${opt}">${opt}</button>`).join('')}
      </div>
      <div class="feedback-line"></div>
    `;
    const fb = el.querySelector('.feedback-line');
    el.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.click();
        const ok = btn.dataset.val === q.correct;
        btn.classList.add(ok ? 'correct' : 'wrong');
        el.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
        if (!ok) fb.innerHTML = `<span class="rule-hint">💡 Správně: <strong>${q.correct}</strong></span>`;
        this.submit(ok, ok ? fb : null);
      });
    });
  },

  // ── Čeština: doplnit diakritiku ──────────────────────────────────────
  renderDiacritics(el, q) {
    el.innerHTML = `
      <div class="diacritics-instruction">Vyber slovo se správnou diakritikou:</div>
      <div class="diacritics-emoji">${q.emoji}</div>
      <div class="options-col">
        ${shuffle(q.options).map(opt => `<button class="opt-btn opt-hyp" data-val="${opt}">${opt}</button>`).join('')}
      </div>
      <div class="feedback-line"></div>
    `;
    const fb = el.querySelector('.feedback-line');
    el.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.click();
        const ok = btn.dataset.val === q.correct;
        btn.classList.add(ok ? 'correct' : 'wrong');
        el.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
        if (!ok) fb.innerHTML = `<span class="rule-hint">💡 Správně: <strong>${q.correct}</strong></span>`;
        this.submit(ok, ok ? fb : null);
      });
    });
  },

  // ── Čeština: skládání slov z písmen ──────────────────────────────────
  renderLetters(el, q) {
    const letters = q.word.split('');
    const shuffled = shuffle([...letters]);
    let selected = [];

    const rebuildSlots = () => {
      el.querySelectorAll('.letter-slot').forEach((slot, i) => {
        if (i < selected.length) {
          slot.textContent = selected[i];
          slot.classList.add('slot-filled');
        } else {
          slot.textContent = '_';
          slot.classList.remove('slot-filled');
        }
      });
    };

    el.innerHTML = `
      <div class="letters-instruction">Slož slovo z písmen:</div>
      <div class="letters-emoji">${q.emoji}</div>
      <div class="letters-slots">
        ${letters.map((_, i) => `<div class="letter-slot" id="lslot-${i}">_</div>`).join('')}
      </div>
      <div class="letters-pool" id="letters-pool">
        ${shuffled.map((l, i) => `<button class="letter-btn" data-letter="${l}" data-idx="${i}">${l}</button>`).join('')}
      </div>
      <div class="feedback-line"></div>
    `;

    const fb = el.querySelector('.feedback-line');

    // Kliknutí na slot odebere písmeno
    el.querySelectorAll('.letter-slot').forEach(slot => {
      slot.addEventListener('click', () => {
        if (this.processing) return;
        const idx = parseInt(slot.id.replace('lslot-', ''));
        if (idx >= selected.length) return;
        Sound.click();
        const removed = selected.splice(idx);
        // Vrať tlačítka zpět
        removed.forEach(letter => {
          const btn = el.querySelector(`.letter-btn[data-letter="${letter}"][disabled]`);
          if (btn) { btn.disabled = false; btn.classList.remove('selected-letter'); }
        });
        rebuildSlots();
      });
    });

    el.querySelectorAll('.letter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.processing) return;
        Sound.click();
        selected.push(btn.dataset.letter);
        btn.disabled = true;
        btn.classList.add('selected-letter');
        rebuildSlots();

        if (selected.length === letters.length) {
          const ok = selected.join('') === q.word;
          el.querySelectorAll('.letter-slot').forEach((s, i) => {
            s.classList.add(selected[i] === letters[i] ? 'slot-correct' : 'slot-wrong');
          });
          if (!ok) fb.innerHTML = `<span class="rule-hint">💡 Správně: <strong>${q.word}</strong></span>`;
          this.submit(ok, ok ? fb : null);
        }
      });
    });
  },

  // ── Čeština: nadřazená slova ─────────────────────────────────────────
  renderHypernym(el, q) {
    el.innerHTML = `
      <div class="hypernym-instruction">Co je nadřazené slovo?</div>
      <div class="hypernym-prompt">${q.prompt}</div>
      <div class="options-col">
        ${shuffle(q.options).map(opt => `<button class="opt-btn opt-hyp" data-val="${opt}">${opt}</button>`).join('')}
      </div>
      <div class="feedback-line"></div>
    `;
    const fb = el.querySelector('.feedback-line');
    el.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.click();
        const ok = btn.dataset.val === q.correct;
        btn.classList.add(ok ? 'correct' : 'wrong');
        el.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
        if (!ok) fb.innerHTML = `<span class="rule-hint">💡 Správně: <strong>${q.correct}</strong></span>`;
        this.submit(ok, ok ? fb : null);
      });
    });
  },

  // ── Angličtina: emoji → vyber slovo ─────────────────────────────────
  renderMatchQ(el, q) {
    el.innerHTML = `
      <div class="match-instruction">Co znamená tento obrázek anglicky?</div>
      <div class="match-emoji">${q.emoji}</div>
      <div class="options-row">
        ${shuffle(q.options).map(opt => `<button class="opt-btn opt-english" data-val="${opt}">${opt}</button>`).join('')}
      </div>
      <div class="feedback-line"></div>
    `;
    const fb = el.querySelector('.feedback-line');
    el.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.click();
        const ok = btn.dataset.val === q.correct;
        btn.classList.add(ok ? 'correct' : 'wrong');
        el.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
        if (!ok) fb.innerHTML = `<span class="rule-hint">💡 Správně: <strong>${q.correct}</strong></span>`;
        this.submit(ok, ok ? fb : null);
      });
    });
  },

  // ── Angličtina: spelling ─────────────────────────────────────────────
  renderSpelling(el, q) {
    const letters = shuffle([...q.word.split(''), ...q.extraLetters]);
    let typed = [];

    const updateDisplay = () => {
      const display = el.querySelector('.spell-display');
      display.innerHTML = q.word.split('').map((_, i) =>
        `<span class="spell-slot ${typed[i] ? 'filled' : ''}">${typed[i] || '_'}</span>`
      ).join('');
    };

    el.innerHTML = `
      <div class="spell-hint">${q.emoji} = <strong>${q.czech}</strong></div>
      <div class="spell-instruction">Napiš anglicky pomocí písmen:</div>
      <div class="spell-display"></div>
      <div class="spell-letters">
        ${letters.map(l => `<button class="letter-btn" data-letter="${l}">${l}</button>`).join('')}
      </div>
      <div class="spell-controls">
        <button class="btn-spell-back">⌫ Zpět</button>
        <button class="btn-spell-check" disabled>✓ Zkontrolovat</button>
      </div>
      <div class="feedback-line"></div>
    `;

    updateDisplay();
    const checkBtn = el.querySelector('.btn-spell-check');
    const fb = el.querySelector('.feedback-line');

    el.querySelectorAll('.letter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typed.length >= q.word.length) return;
        Sound.click();
        typed.push(btn.dataset.letter);
        btn.disabled = true;
        btn.classList.add('used');
        updateDisplay();
        checkBtn.disabled = typed.length < q.word.length;
      });
    });

    el.querySelector('.btn-spell-back').addEventListener('click', () => {
      if (!typed.length) return;
      Sound.click();
      const removed = typed.pop();
      updateDisplay();
      checkBtn.disabled = typed.length < q.word.length;
      const btns = [...el.querySelectorAll('.letter-btn.used')];
      for (let i = btns.length - 1; i >= 0; i--) {
        if (btns[i].dataset.letter === removed) {
          btns[i].disabled = false;
          btns[i].classList.remove('used');
          break;
        }
      }
    });

    checkBtn.addEventListener('click', () => {
      Sound.click();
      const ok = typed.join('') === q.word;
      el.querySelectorAll('.spell-slot').forEach((s, i) => {
        s.classList.add(ok ? 'slot-ok' : (s.textContent === q.word[i] ? 'slot-ok' : 'slot-bad'));
      });
      el.querySelectorAll('.letter-btn').forEach(b => b.disabled = true);
      checkBtn.disabled = true;
      if (!ok) fb.innerHTML = `<span class="rule-hint">💡 Správně: <strong>${q.word}</strong></span>`;
      this.submit(ok, ok ? fb : null);
    });
  },

  // ── Angličtina: čtení → vyber emoji ─────────────────────────────────
  renderReading(el, q) {
    el.innerHTML = `
      <div class="reading-instruction">Co znamená toto anglické slovo?</div>
      <div class="reading-word">${q.word}</div>
      <div class="emoji-options">
        ${shuffle(q.options).map(opt => `<button class="emoji-btn" data-val="${opt}">${opt}</button>`).join('')}
      </div>
      <div class="feedback-line"></div>
    `;
    const fb = el.querySelector('.feedback-line');
    el.querySelectorAll('.emoji-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.click();
        const ok = btn.dataset.val === q.correct;
        btn.classList.add(ok ? 'emoji-correct' : 'emoji-wrong');
        el.querySelectorAll('.emoji-btn').forEach(b => b.disabled = true);
        if (!ok) {
          el.querySelectorAll('.emoji-btn').forEach(b => {
            if (b.dataset.val === q.correct) b.classList.add('emoji-correct');
          });
          fb.innerHTML = `<span class="rule-hint">💡 Správně: <strong>${q.correct}</strong></span>`;
        }
        this.submit(ok, ok ? fb : null);
      });
    });
  },

  // ── Matematika: pyramida ────────────────────────────────────────────
  renderPyramid(el, q) {
    const c = [...q.cells];
    const h = q.hideIdx;
    const labels = c.map((v, i) => i === h ? '?' : v);
    el.innerHTML = `
      <div class="pyr-instruction">Každé číslo nahoře = součet dvou pod ním</div>
      <div class="pyramid">
        <div class="pyr-row"><div class="pyr-cell ${h === 0 ? 'pyr-blank' : ''}">${labels[0]}</div></div>
        <div class="pyr-row"><div class="pyr-cell ${h === 1 ? 'pyr-blank' : ''}">${labels[1]}</div><div class="pyr-cell ${h === 2 ? 'pyr-blank' : ''}">${labels[2]}</div></div>
        <div class="pyr-row"><div class="pyr-cell ${h === 3 ? 'pyr-blank' : ''}">${labels[3]}</div><div class="pyr-cell ${h === 4 ? 'pyr-blank' : ''}">${labels[4]}</div><div class="pyr-cell ${h === 5 ? 'pyr-blank' : ''}">${labels[5]}</div></div>
      </div>
      <div class="pyr-choose">👇 Vyber správné číslo místo otazníku:</div>
      <div class="options-row pyr-options">
        ${q.options.map(o => `<button class="opt-btn opt-pyr" data-val="${o}">${o}</button>`).join('')}
      </div>
      <div class="feedback-line"></div>
    `;
    const fb = el.querySelector('.feedback-line');
    el.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.click();
        const ok = parseInt(btn.dataset.val) === q.correct;
        btn.classList.add(ok ? 'correct' : 'wrong');
        if (ok) {
          const blank = el.querySelector('.pyr-blank');
          if (blank) { blank.textContent = q.correct; blank.classList.remove('pyr-blank'); blank.classList.add('pyr-ok'); }
        }
        el.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
        this.submit(ok, fb);
      });
    });
  },

  // ── Čeština: krátké / dlouhé I/Y ────────────────────────────────────
  renderLongIY(el, q) {
    const display = q.word.replace('_', '<span class="blank-letter">_</span>');
    el.innerHTML = `
      <div class="longiy-emoji">${q.emoji}</div>
      <div class="longiy-instruction">Doplň správné písmeno (krátké nebo dlouhé):</div>
      <div class="soft-i-word">${display}</div>
      <div class="options-row">
        <button class="opt-btn opt-iy" data-val="i">i</button>
        <button class="opt-btn opt-iy" data-val="í">í</button>
        <button class="opt-btn opt-iy" data-val="y">y</button>
        <button class="opt-btn opt-iy" data-val="ý">ý</button>
      </div>
      <div class="feedback-line"></div>
    `;
    const fb = el.querySelector('.feedback-line');
    el.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Sound.click();
        const ok = btn.dataset.val === q.correct;
        btn.classList.add(ok ? 'correct' : 'wrong');
        el.querySelector('.soft-i-word').innerHTML =
          q.word.replace('_', `<span class="filled-letter ${ok ? 'filled-correct' : 'filled-wrong'}">${q.correct}</span>`);
        el.querySelectorAll('.opt-btn').forEach(b => b.disabled = true);
        if (!ok) fb.innerHTML = `<span class="rule-hint">💡 ${q.hint}</span>`;
        this.submit(ok, ok ? fb : null);
      });
    });
  }
};
