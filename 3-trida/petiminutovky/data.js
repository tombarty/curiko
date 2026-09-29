// ─── Pravopisné pětiminutovky 3 – Data a herní engine ───────────────────────
// Sešit Pravopisné pětiminutovky 3 (3. třída), strany 1–27.
// 1 strana = 1 kategorie, 1 sloupec = 1 etapa (počty sedí s rámečky v sešitu).
// Formát: ['slovo_s_mezerou', 'správná_odpověď', ['volba1', 'volba2']]
// Herní engine (od "Motivační motivy" níže) je kopie z ../../petiminutovky/data.js.

const BONUS_CATEGORIES = [
  { _section: '📚 Sešit pro 3. třídu' },
  {
    id: 'bpvm-dtn-01', title: 'bě/pě/vě/mě, dě/tě/ně (str. 1)', emoji: '🥕',
    description: '3 etapy (18+18+13) — opakování 2. ročníku: bě, pě, vě, mě a dě, tě, ně',
    _stages: [
      {
        title: '1. sloupec (bě/pě/vě/mě)',
        words: [
          ['_šina v lese', 'pě', ['bě','pě','vě','mě']],
          ['tátovi a má_', 'mě', ['bě','pě','vě','mě']],
          ['vonící k_tina', 'vě', ['bě','pě','vě','mě']],
          ['o_radlo židle', 'pě', ['bě','pě','vě','mě']],
          ['malá Alž_ta', 'bě', ['bě','pě','vě','mě']],
          ['ukliď si _ci', 'vě', ['bě','pě','vě','mě']],
          ['velká z_na', 'mě', ['bě','pě','vě','mě']],
          ['motýl _lásek', 'bě', ['bě','pě','vě','mě']],
          ['tma_ modrá', 'vě', ['bě','pě','vě','mě']],
          ['_tikoruna', 'pě', ['bě','pě','vě','mě']],
          ['neu_l bruslit', 'mě', ['bě','pě','vě','mě']],
          ['po dlouhé do_', 'bě', ['bě','pě','vě','mě']],
          ['plete _neček', 'vě', ['bě','pě','vě','mě']],
          ['v našem skle_', 'pě', ['bě','pě','vě','mě']],
          ['s_tlé vlasy', 'vě', ['bě','pě','vě','mě']],
          ['vy_hla ven', 'bě', ['bě','pě','vě','mě']],
          ['s_tový jazyk', 'vě', ['bě','pě','vě','mě']],
          ['_stuje ovoce', 'pě', ['bě','pě','vě','mě']],
        ]
      },
      {
        title: '2. sloupec (bě/pě/vě/mě)',
        words: [
          ['s_chá domů', 'pě', ['bě','pě','vě','mě']],
          ['o hezké hud_', 'bě', ['bě','pě','vě','mě']],
          ['_šák na šaty', 'vě', ['bě','pě','vě','mě']],
          ['_ří si teplotu', 'mě', ['bě','pě','vě','mě']],
          ['v létě i v zi_', 'mě', ['bě','pě','vě','mě']],
          ['malé holou_', 'bě', ['bě','pě','vě','mě']],
          ['lustr na stro_', 'pě', ['bě','pě','vě','mě']],
          ['_síc na nebi', 'mě', ['bě','pě','vě','mě']],
          ['zá_s na okně', 'vě', ['bě','pě','vě','mě']],
          ['_žecká trať', 'bě', ['bě','pě','vě','mě']],
          ['u_dom si to', 'vě', ['bě','pě','vě','mě']],
          ['o_ma rukama', 'bě', ['bě','pě','vě','mě']],
          ['rád se s_je', 'mě', ['bě','pě','vě','mě']],
          ['kro_ toho', 'mě', ['bě','pě','vě','mě']],
          ['rýč a hrá_', 'bě', ['bě','pě','vě','mě']],
          ['lehký _třík', 'vě', ['bě','pě','vě','mě']],
          ['u_t vařit', 'mě', ['bě','pě','vě','mě']],
          ['_kné počasí', 'pě', ['bě','pě','vě','mě']],
        ]
      },
      {
        title: '3. sloupec (dě/tě/ně)',
        words: [
          ['ryba ve vo_', 'dě', ['dě','tě','ně']],
          ['ptáci ule_li', 'tě', ['dě','tě','ně']],
          ['_co slyším', 'ně', ['dě','tě','ně']],
          ['nic ne_lá', 'dě', ['dě','tě','ně']],
          ['dí_ spalo', 'tě', ['dě','tě','ně']],
          ['hravé ště_', 'ně', ['dě','tě','ně']],
          ['_kdo přišel', 'ně', ['dě','tě','ně']],
          ['_žký úkol', 'tě', ['dě','tě','ně']],
          ['vousy na bra_', 'dě', ['dě','tě','ně']],
          ['modrá suk_', 'ně', ['dě','tě','ně']],
          ['_ti si hrají', 'dě', ['dě','tě','ně']],
          ['sladké _sto', 'tě', ['dě','tě','ně']],
          ['lyže a sá_', 'ně', ['dě','tě','ně']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'iy-uu-02', title: 'i/y a ú/ů (str. 2)', emoji: '🐸',
    description: '3 etapy (19+19+19) — opakování 2. ročníku: i/í – y/ý a ú – ů',
    _stages: [
      {
        title: '1. sloupec (i/y)',
        words: [
          ['suché šat_', 'y', ['i','í','y','ý']],
          ['př_kré schody', 'í', ['i','í','y','ý']],
          ['příkré schod_', 'y', ['i','í','y','ý']],
          ['ž_vočichové', 'i', ['i','í','y','ý']],
          ['za hod_nu', 'i', ['i','í','y','ý']],
          ['krátk_ úkol', 'ý', ['i','í','y','ý']],
          ['pěkn_ dům', 'ý', ['i','í','y','ý']],
          ['do r_bníka', 'y', ['i','í','y','ý']],
          ['pro č_tanku', 'í', ['i','í','y','ý']],
          ['dlouh_ úsek', 'ý', ['i','í','y','ý']],
          ['teplé j_dlo', 'í', ['i','í','y','ý']],
          ['před span_m', 'í', ['i','í','y','ý']],
          ['t_chá hudba', 'i', ['i','í','y','ý']],
          ['lež_ na zemi', 'í', ['i','í','y','ý']],
          ['tento t_den', 'ý', ['i','í','y','ý']],
          ['příšt_ úterý', 'í', ['i','í','y','ý']],
          ['příští úter_', 'ý', ['i','í','y','ý']],
          ['u Helen_', 'y', ['i','í','y','ý']],
          ['polic_sta', 'i', ['i','í','y','ý']],
        ]
      },
      {
        title: '2. sloupec (i/y)',
        words: [
          ['luk a š_p', 'í', ['i','í','y','ý']],
          ['hlasitě kř_čí', 'i', ['i','í','y','ý']],
          ['ostrá d_ka', 'ý', ['i','í','y','ý']],
          ['č_sté boty', 'i', ['i','í','y','ý']],
          ['čisté bot_', 'y', ['i','í','y','ý']],
          ['plyn un_kal', 'i', ['i','í','y','ý']],
          ['such_ chléb', 'ý', ['i','í','y','ý']],
          ['Sářin seš_t', 'i', ['i','í','y','ý']],
          ['tajný úkr_t', 'y', ['i','í','y','ý']],
          ['češt_na', 'i', ['i','í','y','ý']],
          ['ch_trý Jiřík', 'y', ['i','í','y','ý']],
          ['chytrý J_řík', 'i', ['i','í','y','ý']],
          ['závodn_k', 'í', ['i','í','y','ý']],
          ['ř_ční břehy', 'í', ['i','í','y','ý']],
          ['říční břeh_', 'y', ['i','í','y','ý']],
          ['létá na j_h', 'i', ['i','í','y','ý']],
          ['prst_nek', 'ý', ['i','í','y','ý']],
          ['klad_vko', 'í', ['i','í','y','ý']],
          ['dva rok_', 'y', ['i','í','y','ý']],
        ]
      },
      {
        title: '3. sloupec (ú/ů)',
        words: [
          ['zavřená _sta', 'ú', ['ú','ů']],
          ['těší se dom_', 'ů', ['ú','ů']],
          ['stará k_lna', 'ů', ['ú','ů']],
          ['velká _nava', 'ú', ['ú','ů']],
          ['_žasně vaří', 'ú', ['ú','ů']],
          ['zavírací n_ž', 'ů', ['ú','ů']],
          ['d_ležitý úkol', 'ů', ['ú','ů']],
          ['důležitý _kol', 'ú', ['ú','ů']],
          ['na p_dě', 'ů', ['ú','ů']],
          ['_tulný byt', 'ú', ['ú','ů']],
          ['velký _div', 'ú', ['ú','ů']],
          ['f_ra sena', 'ů', ['ú','ů']],
          ['pár strom_', 'ů', ['ú','ů']],
          ['k_ra břízy', 'ů', ['ú','ů']],
          ['_plný seznam', 'ú', ['ú','ů']],
          ['jdeme dol_', 'ů', ['ú','ů']],
          ['krásné _dolí', 'ú', ['ú','ů']],
          ['zp_sobit škodu', 'ů', ['ú','ů']],
          ['_zká cesta', 'ú', ['ú','ů']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'parove-03', title: 'Párové souhlásky na konci slov (str. 3)', emoji: '🐻',
    description: '3 etapy (18+19+13) — opakování 2. ročníku: párové souhlásky na konci slov',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['dětský smí_', 'ch', ['h','ch']],
          ['dobrý gulá_', 'š', ['ž','š']],
          ['má nás rá_', 'd', ['d','t']],
          ['ru_ a líc', 'b', ['b','p']],
          ['vysoký slou_', 'p', ['b','p']],
          ['hráli gol_', 'f', ['v','f']],
          ['bílý sní_', 'h', ['h','ch']],
          ['tupý nů_', 'ž', ['ž','š']],
          ['významný obje_', 'v', ['v','f']],
          ['nejí špená_', 't', ['d','t']],
          ['roztrhaná sí_', 'ť', ['ď','ť']],
          ['se_ klidně', 'ď', ['ď','ť']],
          ['bílá labu_', 'ť', ['ď','ť']],
          ['časopi_', 's', ['z','s']],
          ['žízeň a hla_', 'd', ['d','t']],
          ['přísný záka_', 'z', ['z','s']],
          ['košík plný hu_', 'b', ['b','p']],
          ['vltavský bře_', 'h', ['h','ch']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['kalu_ vody', 'ž', ['ž','š']],
          ['zápi_ do školy', 's', ['z','s']],
          ['našli pokla_', 'd', ['d','t']],
          ['naře_ dřevo', 'ž', ['ž','š']],
          ['hluboký příko_', 'p', ['b','p']],
          ['Jose_', 'f', ['v','f']],
          ['zamotaný drá_', 't', ['d','t']],
          ['příkrý sva_', 'h', ['h','ch']],
          ['šedivý holu_', 'b', ['b','p']],
          ['letní déš_', 'ť', ['ď','ť']],
          ['pi_ čitelně', 'š', ['ž','š']],
          ['zatažený závě_', 's', ['z','s']],
          ['le_ je šelma', 'v', ['v','f']],
          ['ovocný salá_', 't', ['d','t']],
          ['nala_ kytaru', 'ď', ['ď','ť']],
          ['velký úspě_', 'ch', ['h','ch']],
          ['vyři_ vzkaz', 'ď', ['ď','ť']],
          ['vyřiď vzka_', 'z', ['z','s']],
          ['vylomený zu_', 'b', ['b','p']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['útulný by_', 't', ['d','t']],
          ['měkký chlé_', 'b', ['b','p']],
          ['fotogra_', 'f', ['v','f']],
          ['beraní ro_', 'h', ['h','ch']],
          ['zbořená ze_', 'ď', ['ď','ť']],
          ['kočka a my_', 'š', ['ž','š']],
          ['kone_ vody', 'v', ['v','f']],
          ['listnatý le_', 's', ['z','s']],
          ['vra_ mi to', 'ť', ['ď','ť']],
          ['tuhý mrá_', 'z', ['z','s']],
          ['kočičí drá_', 'p', ['b','p']],
          ['zasel hrá_', 'ch', ['h','ch']],
          ['pěvecká soutě_', 'ž', ['ž','š']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'bp-04', title: 'b – p uvnitř slov (str. 4)', emoji: '🐌',
    description: '3 etapy (18+15+18) — párové souhlásky b/p uvnitř slov',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['klu_ko vlny', 'b', ['b','p']],
          ['velká hlou_ka', 'b', ['b','p']],
          ['kočičí drá_ky', 'p', ['b','p']],
          ['ka_ka vody', 'p', ['b','p']],
          ['nechlu_te se', 'b', ['b','p']],
          ['silná skořá_ka', 'p', ['b','p']],
          ['malé ry_ky', 'b', ['b','p']],
          ['červené ší_ky', 'p', ['b','p']],
          ['pravé hří_ky', 'b', ['b','p']],
          ['hrajeme ši_ky', 'p', ['b','p']],
          ['samole_ky', 'p', ['b','p']],
          ['vyro_te loďku', 'b', ['b','p']],
          ['ostré zou_ky', 'b', ['b','p']],
          ['do chalou_ky', 'p', ['b','p']],
          ['ku_te pečivo', 'p', ['b','p']],
          ['zelená ža_ka', 'b', ['b','p']],
          ['zale_te obálku', 'p', ['b','p']],
          ['dva šrou_ky', 'b', ['b','p']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['kolé_ka', 'b', ['b','p']],
          ['ma_ka okolí', 'p', ['b','p']],
          ['jemné chlou_ky', 'p', ['b','p']],
          ['ku_ka sena', 'p', ['b','p']],
          ['nehr_te se', 'b', ['b','p']],
          ['sli_te mi to', 'b', ['b','p']],
          ['zaječí tla_ky', 'p', ['b','p']],
          ['he_ký kožíšek', 'b', ['b','p']],
          ['zato_te v peci', 'p', ['b','p']],
          ['dinosauří le_ka', 'b', ['b','p']],
          ['otý_ka sena', 'p', ['b','p']],
          ['jednohu_ky', 'b', ['b','p']],
          ['hraje na tru_ku', 'b', ['b','p']],
          ['je vrou_kovaný', 'b', ['b','p']],
          ['sy_ký písek', 'p', ['b','p']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['zástu_ce třídy', 'p', ['b','p']],
          ['dva slou_ce', 'p', ['b','p']],
          ['ozdo_te stromek', 'b', ['b','p']],
          ['výhy_ka na trati', 'b', ['b','p']],
          ['slí_ka s kuřaty', 'p', ['b','p']],
          ['vystu_te', 'p', ['b','p']],
          ['ještě zatru_te', 'b', ['b','p']],
          ['houba ba_ka', 'b', ['b','p']],
          ['kla_ky na očích', 'p', ['b','p']],
          ['pokro_te záhon', 'p', ['b','p']],
          ['nová škra_ka', 'b', ['b','p']],
          ['nezlo_te se', 'b', ['b','p']],
          ['oloupej slu_ku', 'p', ['b','p']],
          ['má chři_ku', 'p', ['b','p']],
          ['vra_ci odlétli', 'b', ['b','p']],
          ['v o_ci Lhota', 'b', ['b','p']],
          ['s Filí_kem', 'p', ['b','p']],
          ['neuto_te se', 'p', ['b','p']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'dt-05', title: 'd – t uvnitř slov (str. 5)', emoji: '🐰',
    description: '3 etapy (19+13+18) — párové souhlásky d/t uvnitř slov',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['úzké schů_ky', 'd', ['d','t']],
          ['velké zma_ky', 't', ['d','t']],
          ['voňavé kví_ky', 't', ['d','t']],
          ['lopa_ka písku', 't', ['d','t']],
          ['je v pořá_ku', 'd', ['d','t']],
          ['do pá_ku', 't', ['d','t']],
          ['otec a ma_ka', 't', ['d','t']],
          ['noční hlí_ka', 'd', ['d','t']],
          ['sla_ké jahůdky', 'd', ['d','t']],
          ['sladké jahů_ky', 'd', ['d','t']],
          ['zavřená vrá_ka', 't', ['d','t']],
          ['naše souse_ka', 'd', ['d','t']],
          ['četli pohá_ku', 'd', ['d','t']],
          ['kávové opla_ky', 't', ['d','t']],
          ['milá kamará_ka', 'd', ['d','t']],
          ['dobré sku_ky', 't', ['d','t']],
          ['u Hra_ce', 'd', ['d','t']],
          ['pru_ký sráz', 'd', ['d','t']],
          ['hebká lá_ka', 't', ['d','t']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['nízké podpa_ky', 't', ['d','t']],
          ['kozí bra_ka', 'd', ['d','t']],
          ['dva žlou_ky', 't', ['d','t']],
          ['plné sou_ky', 'd', ['d','t']],
          ['malá Alžbě_ka', 't', ['d','t']],
          ['školní besí_ka', 'd', ['d','t']],
          ['dva řá_ky', 'd', ['d','t']],
          ['vývr_ka', 't', ['d','t']],
          ['koťá_ko', 't', ['d','t']],
          ['na sklá_ce', 'd', ['d','t']],
          ['ptačí bu_ka', 'd', ['d','t']],
          ['plá_ky šunky', 't', ['d','t']],
          ['dlouhé praví_ko', 't', ['d','t']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['prohlí_ka hradu', 'd', ['d','t']],
          ['na zahrá_ce', 'd', ['d','t']],
          ['vánoční svá_ky', 't', ['d','t']],
          ['pod zí_kou', 'd', ['d','t']],
          ['zpětné zrcá_ko', 't', ['d','t']],
          ['kro_ká srna', 't', ['d','t']],
          ['hla_ká mouka', 'd', ['d','t']],
          ['v chlá_ku', 'd', ['d','t']],
          ['bílá omí_ka', 't', ['d','t']],
          ['há_ka s bratrem', 'd', ['d','t']],
          ['oba sou_ci', 'd', ['d','t']],
          ['šli zkra_kou', 't', ['d','t']],
          ['korková zá_ka', 't', ['d','t']],
          ['vrbové prou_ky', 't', ['d','t']],
          ['hromá_ka knih', 'd', ['d','t']],
          ['po_kan a myš', 't', ['d','t']],
          ['krátká poví_ka', 'd', ['d','t']],
          ['ří_ká kaše', 'd', ['d','t']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'dj-tj-hch-06', title: 'ď – ť a h – ch uvnitř slov (str. 6)', emoji: '🌼',
    description: '3 etapy (13+18+18) — párové souhlásky ď/ť a h/ch uvnitř slov',
    _stages: [
      {
        title: '1. sloupec (ď/ť)',
        words: [
          ['dobře doje_te', 'ď', ['ď','ť']],
          ['chy_te zloděje', 'ť', ['ď','ť']],
          ['poj_te s námi', 'ď', ['ď','ť']],
          ['hle_te si svého', 'ď', ['ď','ť']],
          ['zaho_te to', 'ď', ['ď','ť']],
          ['odpus_te jim', 'ť', ['ď','ť']],
          ['nic neztra_te', 'ť', ['ď','ť']],
          ['sestra Vla_ka', 'ď', ['ď','ť']],
          ['vyři_te vzkaz', 'ď', ['ď','ť']],
          ['nese_te tam', 'ď', ['ď','ť']],
          ['neule_te mi', 'ť', ['ď','ť']],
          ['pohla_te kotě', 'ď', ['ď','ť']],
          ['potrhaná sí_ka', 'ť', ['ď','ť']],
        ]
      },
      {
        title: '2. sloupec (ď/ť)',
        words: [
          ['bu_te potichu', 'ď', ['ď','ť']],
          ['mamka a ta_ka', 'ť', ['ď','ť']],
          ['posu_te sami', 'ď', ['ď','ť']],
          ['vyho_te to', 'ď', ['ď','ť']],
          ['zame_te tady', 'ť', ['ď','ť']],
          ['přive_te je', 'ď', ['ď','ť']],
          ['projíž_ka', 'ď', ['ď','ť']],
          ['obra_te se sem', 'ť', ['ď','ť']],
          ['je_te opatrně', 'ď', ['ď','ť']],
          ['prole_te se', 'ť', ['ď','ť']],
          ['ukli_te hračky', 'ď', ['ď','ť']],
          ['přij_te brzy', 'ď', ['ď','ť']],
          ['pus_te nás', 'ť', ['ď','ť']],
          ['ři_te se pokyny', 'ď', ['ď','ť']],
          ['posa_te se', 'ď', ['ď','ť']],
          ['dřevěná la_ka', 'ť', ['ď','ť']],
          ['lo_ka na řece', 'ď', ['ď','ť']],
          ['cho_te vlevo', 'ď', ['ď','ť']],
        ]
      },
      {
        title: '3. sloupec (h/ch)',
        words: [
          ['kůň zaře_tal', 'h', ['h','ch']],
          ['makové bu_ty', 'ch', ['h','ch']],
          ['zle_ka míchat', 'h', ['h','ch']],
          ['vl_ký vzduch', 'h', ['h','ch']],
          ['napnuté pla_ty', 'ch', ['h','ch']],
          ['dlouhé ne_ty', 'h', ['h','ch']],
          ['nevyne_te ho', 'ch', ['h','ch']],
          ['kře_ká váza', 'h', ['h','ch']],
          ['nepí_ni kolo', 'ch', ['h','ch']],
          ['ře_tali se', 'h', ['h','ch']],
          ['ša_ta je důl', 'ch', ['h','ch']],
          ['le_ký úkol', 'h', ['h','ch']],
          ['rytíř je šle_tic', 'ch', ['h','ch']],
          ['jde to le_ce', 'h', ['h','ch']],
          ['ne_te to tady', 'ch', ['h','ch']],
          ['učí se pla_tit', 'ch', ['h','ch']],
          ['kře_ké sklo', 'h', ['h','ch']],
          ['le_ká otázka', 'h', ['h','ch']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'vf-07', title: 'v – f uvnitř slov (str. 7)', emoji: '🦊',
    description: '3 etapy (18+13+18) — párové souhlásky v/f uvnitř slov',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['školní výsta_ka', 'v', ['v','f']],
          ['obě sjezdo_ky', 'v', ['v','f']],
          ['obro_ský strom', 'v', ['v','f']],
          ['čeští sporto_ci', 'v', ['v','f']],
          ['rybářovy úlo_ky', 'v', ['v','f']],
          ['lékařský ku_řík', 'f', ['v','f']],
          ['prasklá žáro_ka', 'v', ['v','f']],
          ['Slá_ka', 'v', ['v','f']],
          ['omlu_te mě', 'v', ['v','f']],
          ['objedná_ka', 'v', ['v','f']],
          ['s Kryštů_kem', 'f', ['v','f']],
          ['nesmělá dí_ka', 'v', ['v','f']],
          ['v bábo_ce', 'v', ['v','f']],
          ['nové pla_ky', 'v', ['v','f']],
          ['velká obrazo_ka', 'v', ['v','f']],
          ['fotogra_ka', 'f', ['v','f']],
          ['na zastá_ce', 'v', ['v','f']],
          ['milé slů_ko', 'v', ['v','f']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['kro_ky brouka', 'v', ['v','f']],
          ['zasta_te se', 'v', ['v','f']],
          ['vlašto_ka', 'v', ['v','f']],
          ['plná zásu_ka', 'v', ['v','f']],
          ['stádo o_cí', 'v', ['v','f']],
          ['Žo_ka', 'f', ['v','f']],
          ['lá_ka přes řeku', 'v', ['v','f']],
          ['krátké dří_ko', 'v', ['v','f']],
          ['dobří pla_ci', 'v', ['v','f']],
          ['s šé_kou banky', 'f', ['v','f']],
          ['operní pě_ci', 'v', ['v','f']],
          ['oba mysli_ci', 'v', ['v','f']],
          ['malá Joze_ka', 'f', ['v','f']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['dva jeze_ci', 'v', ['v','f']],
          ['hbitá užo_ka', 'v', ['v','f']],
          ['přísná šé_ka', 'f', ['v','f']],
          ['malí hloda_ci', 'v', ['v','f']],
          ['posta_te se', 'v', ['v','f']],
          ['v mém ku_říku', 'f', ['v','f']],
          ['odvážní lo_ci', 'v', ['v','f']],
          ['na skluza_ce', 'v', ['v','f']],
          ['upra_te se', 'v', ['v','f']],
          ['s borů_kami', 'v', ['v','f']],
          ['na Kryštů_ka', 'f', ['v','f']],
          ['rybí polé_ka', 'v', ['v','f']],
          ['hlá_ka zelí', 'v', ['v','f']],
          ['je fotogra_kou', 'f', ['v','f']],
          ['na poho_ce', 'v', ['v','f']],
          ['ka_ka je pták', 'v', ['v','f']],
          ['s naší Žo_kou', 'f', ['v','f']],
          ['připra_te se', 'v', ['v','f']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'zs-08', title: 'z – s uvnitř slov (str. 8)', emoji: '🐇',
    description: '3 etapy (18+18+13) — párové souhlásky z/s',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['kožené pá_ky', 's', ['z', 's']],
          ['ní_ký stůl', 'z', ['z', 's']],
          ['he_ký den', 'z', ['z', 's']],
          ['bílé ubrou_ky', 's', ['z', 's']],
          ['zlaté přívě_ky', 's', ['z', 's']],
          ['filmová uká_ka', 'z', ['z', 's']],
          ['vážná hro_ba', 'z', ['z', 's']],
          ['třídní schů_ky', 'z', ['z', 's']],
          ['hu_tá mlha', 's', ['z', 's']],
          ['blí_ké město', 'z', ['z', 's']],
          ['na podvo_ku', 'z', ['z', 's']],
          ['mluvila če_ky', 's', ['z', 's']],
          ['pře_ka u boty', 'z', ['z', 's']],
          ['vagón pí_ku', 's', ['z', 's']],
          ['ú_ká ulice', 'z', ['z', 's']],
          ['lí_kový ořech', 's', ['z', 's']],
          ['zlaté řetí_ky', 'z', ['z', 's']],
          ['sva_ky klíčů', 'z', ['z', 's']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['Francou_ka', 'z', ['z', 's']],
          ['lou_káček', 's', ['z', 's']],
          ['dětské hlá_ky', 's', ['z', 's']],
          ['dlouhá vychá_ka', 'z', ['z', 's']],
          ['moje průka_ka', 'z', ['z', 's']],
          ['vrá_ky na čele', 's', ['z', 's']],
          ['naše pro_ba', 's', ['z', 's']],
          ['těžká otá_ka', 'z', ['z', 's']],
          ['kuřecí ří_ky', 'z', ['z', 's']],
          ['pu_tý kraj', 's', ['z', 's']],
          ['oba vynále_ci', 'z', ['z', 's']],
          ['bílá bří_ka', 'z', ['z', 's']],
          ['veselá Tere_ka', 'z', ['z', 's']],
          ['lá_ka k přírodě', 's', ['z', 's']],
          ['dřevěné de_ky', 's', ['z', 's']],
          ['čerstvé hou_ky', 's', ['z', 's']],
          ['prohraná sá_ka', 'z', ['z', 's']],
          ['mladí horole_ci', 'z', ['z', 's']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['papírová ma_ka', 's', ['z', 's']],
          ['klu_ký povrch', 'z', ['z', 's']],
          ['naše Zu_ka', 'z', ['z', 's']],
          ['skleněná mi_ka', 's', ['z', 's']],
          ['jemné vlá_ky', 's', ['z', 's']],
          ['drobné oblá_ky', 'z', ['z', 's']],
          ['na prová_ku', 'z', ['z', 's']],
          ['kou_ky masa', 's', ['z', 's']],
          ['ohry_ky jablek', 'z', ['z', 's']],
          ['školní dochá_ka', 'z', ['z', 's']],
          ['je to blí_ko', 'z', ['z', 's']],
          ['kre_ba tužkou', 's', ['z', 's']],
          ['hrací ko_tka', 's', ['z', 's']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'zzss-09', title: 'ž – š uvnitř slov (str. 9)', emoji: '🦔',
    description: '3 etapy (18+18+14) — párové souhlásky ž/š',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['vyrá_ka na lokti', 'ž', ['ž', 'š']],
          ['s oří_ky', 'š', ['ž', 'š']],
          ['lyže bě_ky', 'ž', ['ž', 'š']],
          ['napi_te nám', 'š', ['ž', 'š']],
          ['zlaté kří_ky', 'ž', ['ž', 'š']],
          ['kolobě_ka', 'ž', ['ž', 'š']],
          ['dva strou_ky', 'ž', ['ž', 'š']],
          ['světlu_ka', 'š', ['ž', 'š']],
          ['le_te klidně', 'ž', ['ž', 'š']],
          ['cirkusoví ša_ci', 'š', ['ž', 'š']],
          ['děravá pono_ka', 'ž', ['ž', 'š']],
          ['dva nosoro_ci', 'ž', ['ž', 'š']],
          ['nepra_te tady', 'š', ['ž', 'š']],
          ['s Tomá_kem', 'š', ['ž', 'š']],
          ['je tě_kopádný', 'ž', ['ž', 'š']],
          ['školní krou_ky', 'ž', ['ž', 'š']],
          ['opi_te slova', 'š', ['ž', 'š']],
          ['dětská kní_ka', 'ž', ['ž', 'š']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['útlá no_ka', 'ž', ['ž', 'š']],
          ['kovová mří_ka', 'ž', ['ž', 'š']],
          ['Bystrou_ka', 'š', ['ž', 'š']],
          ['dřevěná so_ka', 'š', ['ž', 'š']],
          ['stará pu_ka', 'š', ['ž', 'š']],
          ['zálo_ka v knize', 'ž', ['ž', 'š']],
          ['ústři_ky látek', 'ž', ['ž', 'š']],
          ['šedá my_ka', 'š', ['ž', 'š']],
          ['podlo_ka', 'ž', ['ž', 'š']],
          ['vá_ka je hmyz', 'ž', ['ž', 'š']],
          ['v batů_ku', 'ž', ['ž', 'š']],
          ['sladké hru_ky', 'š', ['ž', 'š']],
          ['dešťové srá_ky', 'ž', ['ž', 'š']],
          ['dva prou_ky', 'ž', ['ž', 'š']],
          ['malá mu_ka', 'š', ['ž', 'š']],
          ['vyplň přihlá_ku', 'š', ['ž', 'š']],
          ['uka_te mi to', 'ž', ['ž', 'š']],
          ['jdeme pě_ky', 'š', ['ž', 'š']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['tě_ce pracuje', 'ž', ['ž', 'š']],
          ['školní ta_ka', 'š', ['ž', 'š']],
          ['zapi_te si to', 'š', ['ž', 'š']],
          ['hora Sně_ka', 'ž', ['ž', 'š']],
          ['zahnuté rů_ky', 'ž', ['ž', 'š']],
          ['skok do vý_ky', 'š', ['ž', 'š']],
          ['čistá roho_ka', 'ž', ['ž', 'š']],
          ['velká překá_ka', 'ž', ['ž', 'š']],
          ['lehká zkou_ka', 'š', ['ž', 'š']],
          ['obyčejná tu_ka', 'ž', ['ž', 'š']],
          ['výhry i porá_ky', 'ž', ['ž', 'š']],
          ['tupé nů_ky', 'ž', ['ž', 'š']],
          ['osu_te si ruce', 'š', ['ž', 'š']],
          ['moji papou_ci', 'š', ['ž', 'š']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'parove-10', title: 'Párové souhlásky – opakování (str. 10)', emoji: '🐢',
    description: '3 etapy (17+19+19) — mix párových souhlásek',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['le_ké batůžky', 'h', ['h', 'ch']],
          ['lehké batů_ky', 'ž', ['ž', 'š']],
          ['dlouhý řetě_', 'z', ['z', 's']],
          ['žitný chlé_', 'b', ['b', 'p']],
          ['napnuté pla_ty', 'ch', ['h', 'ch']],
          ['Ladisla_', 'v', ['v', 'f']],
          ['odpa_kový koš', 'd', ['d', 't']],
          ['odpadkový ko_', 'š', ['ž', 'š']],
          ['vyprahlá pouš_', 'ť', ['ď', 'ť']],
          ['ostré nů_ky', 'ž', ['ž', 'š']],
          ['ukli_te garáž', 'ď', ['ď', 'ť']],
          ['ukliďte gará_', 'ž', ['ž', 'š']],
          ['rámu_ je hluk', 's', ['z', 's']],
          ['tě_ký nákup', 'ž', ['ž', 'š']],
          ['těžký náku_', 'p', ['b', 'p']],
          ['naše zahrá_ka', 'd', ['d', 't']],
          ['tvrdé hou_ky', 's', ['z', 's']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['kropicí kone_', 'v', ['v', 'f']],
          ['vyře_te úlohu', 'š', ['ž', 'š']],
          ['dva žlou_ky', 't', ['d', 't']],
          ['cihlová ze_', 'ď', ['ď', 'ť']],
          ['ovocná příchu_', 'ť', ['ď', 'ť']],
          ['se Žo_kou', 'f', ['v', 'f']],
          ['vysoký slou_', 'p', ['b', 'p']],
          ['kře_ké sklo', 'h', ['h', 'ch']],
          ['ší_kový čaj', 'p', ['b', 'p']],
          ['sla_ké buchty', 'd', ['d', 't']],
          ['sladké bu_ty', 'ch', ['h', 'ch']],
          ['zubní ka_', 'z', ['z', 's']],
          ['fotogra_', 'f', ['v', 'f']],
          ['slo_ si šaty', 'ž', ['ž', 'š']],
          ['pravé hří_ky', 'b', ['b', 'p']],
          ['kostelní vě_', 'ž', ['ž', 'š']],
          ['do Krkono_', 'š', ['ž', 'š']],
          ['kou_ky jablek', 's', ['z', 's']],
          ['hudební slu_', 'ch', ['h', 'ch']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['císařská hro_ka', 'b', ['b', 'p']],
          ['na ní_ké zdi', 'z', ['z', 's']],
          ['stádo kra_', 'v', ['v', 'f']],
          ['má rá_ špenát', 'd', ['d', 't']],
          ['má rád špená_', 't', ['d', 't']],
          ['požární popla_', 'ch', ['h', 'ch']],
          ['pochlu_te se', 'b', ['b', 'p']],
          ['vra_te se včas', 'ť', ['ď', 'ť']],
          ['hodně kni_', 'h', ['h', 'ch']],
          ['hluboký příko_', 'p', ['b', 'p']],
          ['matějská pou_', 'ť', ['ď', 'ť']],
          ['falešný zpě_', 'v', ['v', 'f']],
          ['dřevěná vrá_ka', 't', ['d', 't']],
          ['napi_te to líp', 'š', ['ž', 'š']],
          ['poj_te dál', 'ď', ['ď', 'ť']],
          ['naši sporto_ci', 'v', ['v', 'f']],
          ['chtěli je_ dál', 't', ['d', 't']],
          ['město Paří_', 'ž', ['ž', 'š']],
          ['natřený plo_', 't', ['d', 't']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'parove-11', title: 'Párové souhlásky – opakování (str. 11)', emoji: '🎿',
    description: '3 etapy (22+21+15) — mix párových souhlásek',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['pru_ký sráz', 'd', ['d', 't']],
          ['prudký srá_', 'z', ['z', 's']],
          ['splacený dlu_', 'h', ['h', 'ch']],
          ['obytný přívě_', 's', ['z', 's']],
          ['lo_ci s puškami', 'v', ['v', 'f']],
          ['lovci s pu_kami', 'š', ['ž', 'š']],
          ['kočka a my_', 'š', ['ž', 'š']],
          ['psí čeni_', 'ch', ['h', 'ch']],
          ['skořá_ka ořechu', 'p', ['b', 'p']],
          ['vyhlídkový le_', 't', ['d', 't']],
          ['přes překá_ky', 'ž', ['ž', 'š']],
          ['tvaro_ v buchtě', 'h', ['h', 'ch']],
          ['tvaroh v bu_tě', 'ch', ['h', 'ch']],
          ['blí_ká vesnice', 'z', ['z', 's']],
          ['na zastá_ce', 'v', ['v', 'f']],
          ['stržená hrá_', 'z', ['z', 's']],
          ['Jose_ a Vojtěch', 'f', ['v', 'f']],
          ['Josef a Vojtě_', 'ch', ['h', 'ch']],
          ['poj_te sem', 'ď', ['ď', 'ť']],
          ['bílé chudo_ky', 'b', ['b', 'p']],
          ['posta_te se', 'v', ['v', 'f']],
          ['lo_ka pluje', 'ď', ['ď', 'ť']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['vychá_ková hůl', 'z', ['z', 's']],
          ['dřevěná de_ka', 's', ['z', 's']],
          ['zálo_ka v knížce', 'ž', ['ž', 'š']],
          ['záložka v kní_ce', 'ž', ['ž', 'š']],
          ['nů_ na chleba', 'ž', ['ž', 'š']],
          ['zkou_ka', 'š', ['ž', 'š']],
          ['ka_ka vody', 'p', ['b', 'p']],
          ['vítě_ turnaje', 'z', ['z', 's']],
          ['Ka_činy plavky', 't', ['d', 't']],
          ['Katčiny pla_ky', 'v', ['v', 'f']],
          ['dušená mrke_', 'v', ['v', 'f']],
          ['nechlu_ se', 'b', ['b', 'p']],
          ['trhá šves_ky', 't', ['d', 't']],
          ['malá chalou_ka', 'p', ['b', 'p']],
          ['dubový lis_', 't', ['d', 't']],
          ['Eli_ka', 'š', ['ž', 'š']],
          ['je_te vlakem', 'ď', ['ď', 'ť']],
          ['listopa_', 'd', ['d', 't']],
          ['vl_ký vzduch', 'h', ['h', 'ch']],
          ['vlhký vzdu_', 'ch', ['h', 'ch']],
          ['výborná pamě_', 'ť', ['ď', 'ť']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['posa_te se', 'ď', ['ď', 'ť']],
          ['hladký povr_', 'ch', ['h', 'ch']],
          ['borová ši_ka', 'š', ['ž', 'š']],
          ['sí_ do okna', 'ť', ['ď', 'ť']],
          ['průtr_ mračen', 'ž', ['ž', 'š']],
          ['mnoho chy_', 'b', ['b', 'p']],
          ['krá_ká cesta', 't', ['d', 't']],
          ['prochá_ka', 'z', ['z', 's']],
          ['nedi_te se jim', 'v', ['v', 'f']],
          ['studený jak le_', 'd', ['d', 't']],
          ['sjezdo_ka', 'v', ['v', 'f']],
          ['napínavý příbě_', 'h', ['h', 'ch']],
          ['zeptej se Lu_ka', 'ď', ['ď', 'ť']],
          ['minigol_', 'f', ['v', 'f']],
          ['zajíc ho_sá', 'p', ['b', 'p']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'parove-12', title: 'Párové souhlásky – opakování (str. 12)', emoji: '🌳',
    description: '3 etapy (20+18+17) — mix párových souhlásek',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['obyčejná tu_ka', 'ž', ['ž', 'š']],
          ['pták ko_', 's', ['z', 's']],
          ['fotogra_ka', 'f', ['v', 'f']],
          ['kře_ké sklo', 'h', ['h', 'ch']],
          ['hází ši_ky', 'p', ['b', 'p']],
          ['silný mrá_', 'z', ['z', 's']],
          ['le_tala mě', 'ch', ['h', 'ch']],
          ['ha_ je plaz', 'd', ['d', 't']],
          ['had je pla_', 'z', ['z', 's']],
          ['ostré zou_ky', 'b', ['b', 'p']],
          ['moje přezů_ky', 'v', ['v', 'f']],
          ['tě_ká taška', 'ž', ['ž', 'š']],
          ['těžká ta_ka', 'š', ['ž', 'š']],
          ['obrá_ky na zdi', 'z', ['z', 's']],
          ['čte pohá_ku', 'd', ['d', 't']],
          ['vysoký scho_', 'd', ['d', 't']],
          ['hle_ si svého', 'ď', ['ď', 'ť']],
          ['zame_te tu', 'ť', ['ď', 'ť']],
          ['krásná kre_ba', 's', ['z', 's']],
          ['voňavé kví_ky', 't', ['d', 't']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['kožený ku_řík', 'f', ['v', 'f']],
          ['čte kní_ku', 'ž', ['ž', 'š']],
          ['horká polé_ka', 'v', ['v', 'f']],
          ['kalu_ vody', 'ž', ['ž', 'š']],
          ['krá_ký kabát', 't', ['d', 't']],
          ['krátký kabá_', 't', ['d', 't']],
          ['samole_ky', 'p', ['b', 'p']],
          ['košík hří_ků', 'b', ['b', 'p']],
          ['kůň ře_tá', 'h', ['h', 'ch']],
          ['nic neztra_te', 'ť', ['ď', 'ť']],
          ['sla_ké hrušky', 'd', ['d', 't']],
          ['sladké hru_ky', 'š', ['ž', 'š']],
          ['hla_ký povrch', 'd', ['d', 't']],
          ['hladký povr_', 'ch', ['h', 'ch']],
          ['projíž_ka', 'ď', ['ď', 'ť']],
          ['dlouhý náze_', 'v', ['v', 'f']],
          ['věc je předmě_', 't', ['d', 't']],
          ['liščí oca_', 's', ['z', 's']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['nový vynále_', 'z', ['z', 's']],
          ['le_ká otázka', 'h', ['h', 'ch']],
          ['lehká otá_ka', 'z', ['z', 's']],
          ['maková bu_ta', 'ch', ['h', 'ch']],
          ['stará žáro_ka', 'v', ['v', 'f']],
          ['zatru_ silněji', 'b', ['b', 'p']],
          ['ní_ké schůdky', 'z', ['z', 's']],
          ['nízké schů_ky', 'd', ['d', 't']],
          ['řekla vti_', 'p', ['b', 'p']],
          ['brouk světlu_ka', 'š', ['ž', 'š']],
          ['utři pra_', 'ch', ['h', 'ch']],
          ['natři plo_', 't', ['d', 't']],
          ['piluje si ne_ty', 'h', ['h', 'ch']],
          ['velký údi_', 'v', ['v', 'f']],
          ['vysoká la_ka', 'ť', ['ď', 'ť']],
          ['mi_ka ovoce', 's', ['z', 's']],
          ['mladé bří_ky', 'z', ['z', 's']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'parove-13', title: 'Párové souhlásky – opakování (str. 13)', emoji: '🐣',
    description: '3 etapy (18+15+18) — mix párových souhlásek',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['malá Tere_ka', 'z', ['z', 's']],
          ['hadí je_', 'd', ['d', 't']],
          ['noční hlí_ka', 'd', ['d', 't']],
          ['tenká skořá_ka', 'p', ['b', 'p']],
          ['kolobě_ vody', 'h', ['h', 'ch']],
          ['dřevěný kří_', 'ž', ['ž', 'š']],
          ['s borů_kami', 'v', ['v', 'f']],
          ['vra_te se', 'ť', ['ď', 'ť']],
          ['náš Jose_', 'f', ['v', 'f']],
          ['kuřá_ko pípá', 't', ['d', 't']],
          ['ča_ plyne', 's', ['z', 's']],
          ['lo_ka pluje', 'ď', ['ď', 'ť']],
          ['připra_ se', 'v', ['v', 'f']],
          ['zlaté ry_ky', 'b', ['b', 'p']],
          ['proutěný ko_', 'š', ['ž', 'š']],
          ['zle_ka fouká', 'h', ['h', 'ch']],
          ['pro Žo_ku', 'f', ['v', 'f']],
          ['my_ka utekla', 'š', ['ž', 'š']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['splněný sli_', 'b', ['b', 'p']],
          ['roho_ka u dveří', 'ž', ['ž', 'š']],
          ['zavřená vrá_ka', 't', ['d', 't']],
          ['půjdeme pě_ky', 'š', ['ž', 'š']],
          ['stříbrné řetí_ky', 'z', ['z', 's']],
          ['cirkusová mané_', 'ž', ['ž', 'š']],
          ['pochlu_te se', 'b', ['b', 'p']],
          ['přij_te sem', 'ď', ['ď', 'ť']],
          ['příští zastá_ka', 'v', ['v', 'f']],
          ['dívka a ho_', 'ch', ['h', 'ch']],
          ['železo je ko_', 'v', ['v', 'f']],
          ['čerstvé hou_ky', 's', ['z', 's']],
          ['zná odpově_', 'ď', ['ď', 'ť']],
          ['sy_ký cukr', 'p', ['b', 'p']],
          ['hla_ká mouka', 'd', ['d', 't']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['čá_ létá', 'p', ['b', 'p']],
          ['Vojtě_', 'ch', ['h', 'ch']],
          ['beraní ro_', 'h', ['h', 'ch']],
          ['chy_te zloděje', 'ť', ['ď', 'ť']],
          ['známý fotogra_', 'f', ['v', 'f']],
          ['blí_ký člověk', 'z', ['z', 's']],
          ['milá kamará_ka', 'd', ['d', 't']],
          ['slu_ka jablka', 'p', ['b', 'p']],
          ['vyře_ tu úlohu', 'š', ['ž', 'š']],
          ['lo_ci s puškami', 'v', ['v', 'f']],
          ['děravé pono_ky', 'ž', ['ž', 'š']],
          ['odpus_te mi to', 'ť', ['ď', 'ť']],
          ['kou_ky ovoce', 's', ['z', 's']],
          ['mám se lí_', 'p', ['b', 'p']],
          ['klu_ko vlny', 'b', ['b', 'p']],
          ['sedí v kou_ku', 't', ['d', 't']],
          ['skleněná láhe_', 'v', ['v', 'f']],
          ['dobrý postře_', 'h', ['h', 'ch']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'vlastni-14', title: 'Vlastní jména – velká a malá písmena (str. 14)', emoji: '🏔️',
    description: '2 etapy (38+27) — velká a malá písmena',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['_těpán je tenista', 'Š', ['š', 'Š']],
          ['Štěpán je _enista', 't', ['t', 'T']],
          ['_an učitel Novák', 'p', ['p', 'P']],
          ['pan _čitel Novák', 'u', ['u', 'U']],
          ['pan učitel _ovák', 'N', ['n', 'N']],
          ['_abička z Mělníka', 'b', ['b', 'B']],
          ['babička z _ělníka', 'M', ['m', 'M']],
          ['všechny _ívky a hoši', 'd', ['d', 'D']],
          ['všechny dívky a _oši', 'h', ['h', 'H']],
          ['_orymír měl Šemíka', 'H', ['h', 'H']],
          ['Horymír měl _emíka', 'Š', ['š', 'Š']],
          ['přes _eku Ohři', 'ř', ['ř', 'Ř']],
          ['přes řeku _hři', 'O', ['o', 'O']],
          ['_bec Brumovice', 'o', ['o', 'O']],
          ['obec _rumovice', 'B', ['b', 'B']],
          ['_ýlet na horu Říp', 'v', ['v', 'V']],
          ['výlet na _oru Říp', 'h', ['h', 'H']],
          ['výlet na horu _íp', 'Ř', ['ř', 'Ř']],
          ['_artin je Američan', 'M', ['m', 'M']],
          ['Martin je _meričan', 'A', ['a', 'A']],
          ['_ěsta a vesnice', 'm', ['m', 'M']],
          ['města a _esnice', 'v', ['v', 'V']],
          ['_ásník Pavel Šrut', 'b', ['b', 'B']],
          ['básník _avel Šrut', 'P', ['p', 'P']],
          ['básník Pavel _rut', 'Š', ['š', 'Š']],
          ['_ěmčina i angličtina', 'n', ['n', 'N']],
          ['němčina i _ngličtina', 'a', ['a', 'A']],
          ['_va jela do Krkonoš', 'I', ['i', 'I']],
          ['Iva jela do _rkonoš', 'K', ['k', 'K']],
          ['_otbal nebo hokej', 'f', ['f', 'F']],
          ['fotbal nebo _okej', 'h', ['h', 'H']],
          ['_rsko je stát', 'I', ['i', 'I']],
          ['_ramen Vltavy', 'p', ['p', 'P']],
          ['pramen _ltavy', 'V', ['v', 'V']],
          ['nejvyšší _ora Sněžka', 'h', ['h', 'H']],
          ['nejvyšší hora _něžka', 'S', ['s', 'S']],
          ['z _rna do Zlína', 'B', ['b', 'B']],
          ['z Brna do _lína', 'Z', ['z', 'Z']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['_vce a kozy', 'o', ['o', 'O']],
          ['ovce a _ozy', 'k', ['k', 'K']],
          ['_ourozenci Dvořákovi', 's', ['s', 'S']],
          ['sourozenci _vořákovi', 'D', ['d', 'D']],
          ['hlavní _ěsto Praha', 'm', ['m', 'M']],
          ['hlavní město _raha', 'P', ['p', 'P']],
          ['_lík vrčí na souseda', 'A', ['a', 'A']],
          ['Alík vrčí na _ouseda', 's', ['s', 'S']],
          ['přijeli _lováci a Poláci', 'S', ['s', 'S']],
          ['přijeli Slováci a _oláci', 'P', ['p', 'P']],
          ['_ana a její sestry', 'H', ['h', 'H']],
          ['Hana a její _estry', 's', ['s', 'S']],
          ['známý _alíř a sochař', 'm', ['m', 'M']],
          ['známý malíř a _ochař', 's', ['s', 'S']],
          ['projdi ulicí _ipovou', 'L', ['l', 'L']],
          ['_ybník Rožmberk', 'r', ['r', 'R']],
          ['rybník _ožmberk', 'R', ['r', 'R']],
          ['_orava a Slezsko', 'M', ['m', 'M']],
          ['Morava a _lezsko', 'S', ['s', 'S']],
          ['česká _ymnastka', 'g', ['g', 'G']],
          ['_ta Kučera z Aše', 'O', ['o', 'O']],
          ['Ota _učera z Aše', 'K', ['k', 'K']],
          ['Ota Kučera z _še', 'A', ['a', 'A']],
          ['_ajitel psa Fleka', 'm', ['m', 'M']],
          ['majitel _sa Fleka', 'p', ['p', 'P']],
          ['majitel psa _leka', 'F', ['f', 'F']],
          ['jedeme na _umavu', 'Š', ['š', 'Š']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'velka-15', title: 'Velká a malá písmena (str. 15)', emoji: '🏰',
    description: '2 etapy (34+33) — vlastní jména, velká a malá písmena',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['_áma, táta a Eva', 'm', ['m','M']],
          ['máma, _áta a Eva', 't', ['t','T']],
          ['máma, táta a _va', 'E', ['e','E']],
          ['_anovkou na Ještěd', 'l', ['l','L']],
          ['lanovkou na _eštěd', 'J', ['j','J']],
          ['_ezdrev je rybník', 'B', ['b','B']],
          ['Bezdrev je _ybník', 'r', ['r','R']],
          ['_erlín je v Německu', 'B', ['b','B']],
          ['Berlín je v _ěmecku', 'N', ['n','N']],
          ['_urvínek má Žeryka', 'H', ['h','H']],
          ['Hurvínek má _eryka', 'Ž', ['ž','Ž']],
          ['_ěvkyně Pecková', 'p', ['p','P']],
          ['pěvkyně _ecková', 'P', ['p','P']],
          ['_tarostka města', 's', ['s','S']],
          ['starostka _ěsta', 'm', ['m','M']],
          ['_lina chová želvy', 'O', ['o','O']],
          ['Olina chová _elvy', 'ž', ['ž','Ž']],
          ['_ák Marek Fiala', 'ž', ['ž','Ž']],
          ['žák _arek Fiala', 'M', ['m','M']],
          ['žák Marek _iala', 'F', ['f','F']],
          ['na _ižkovo náměstí', 'Ž', ['ž','Ž']],
          ['_ráva Stračena', 'k', ['k','K']],
          ['kráva _tračena', 'S', ['s','S']],
          ['jedu do _aďarska', 'M', ['m','M']],
          ['_lak do Liberce', 'v', ['v','V']],
          ['vlak do _iberce', 'L', ['l','L']],
          ['_akub dostal chřipku', 'J', ['j','J']],
          ['Jakub dostal _řipku', 'ch', ['ch','Ch']],
          ['jela směrem na _oukov', 'L', ['l','L']],
          ['_akušané mluví německy', 'R', ['r','R']],
          ['_uchaři a cukráři', 'k', ['k','K']],
          ['kuchaři a _ukráři', 'c', ['c','C']],
          ['_álnice do Ostravy', 'd', ['d','D']],
          ['dálnice do _stravy', 'O', ['o','O']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['_ěčínem protéká Labe', 'D', ['d','D']],
          ['Děčínem protéká _abe', 'L', ['l','L']],
          ['_ma, Míla i kluci', 'E', ['e','E']],
          ['Ema, _íla i kluci', 'M', ['m','M']],
          ['Ema, Míla i _luci', 'k', ['k','K']],
          ['_lec s andulkami', 'k', ['k','K']],
          ['klec s _ndulkami', 'a', ['a','A']],
          ['_nička je v Turecku', 'A', ['a','A']],
          ['Anička je v _urecku', 'T', ['t','T']],
          ['_dam nakrmí Reka', 'A', ['a','A']],
          ['Adam nakrmí _eka', 'R', ['r','R']],
          ['začaly kvést _stry', 'a', ['a','A']],
          ['_elč je krásné město', 'T', ['t','T']],
          ['Telč je krásné _ěsto', 'm', ['m','M']],
          ['_ana a Lída Srbovy', 'J', ['j','J']],
          ['Jana a _ída Srbovy', 'L', ['l','L']],
          ['Jana a Lída _rbovy', 'S', ['s','S']],
          ['_lato a stříbro', 'z', ['z','Z']],
          ['zlato a _tříbro', 's', ['s','S']],
          ['_leš bude zpěvákem', 'A', ['a','A']],
          ['Aleš bude _pěvákem', 'z', ['z','Z']],
          ['blízká _ora Klínovec', 'h', ['h','H']],
          ['blízká hora _línovec', 'K', ['k','K']],
          ['hezké _áměstí', 'n', ['n','N']],
          ['_ěmci hráli s Italy', 'N', ['n','N']],
          ['Němci hráli s _taly', 'I', ['i','I']],
          ['studená _oda v Dyji', 'v', ['v','V']],
          ['studená voda v _yji', 'D', ['d','D']],
          ['stěhování do _ardubic', 'P', ['p','P']],
          ['_očka Minda', 'k', ['k','K']],
          ['kočka _inda', 'M', ['m','M']],
          ['byli v _tálii', 'I', ['i','I']],
          ['čti, _etře', 'P', ['p','P']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'velka-16', title: 'Velká a malá písmena (str. 16)', emoji: '🗺️',
    description: '2 etapy (31+26) — vlastní jména, velká a malá písmena',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['_lak do Klánovic', 'v', ['v','V']],
          ['vlak do _lánovic', 'K', ['k','K']],
          ['_adimovi rodiče', 'R', ['r','R']],
          ['Radimovi _odiče', 'r', ['r','R']],
          ['_ěneček z kopretin', 'v', ['v','V']],
          ['věneček z _opretin', 'k', ['k','K']],
          ['_lenko, vyvenči Ajaxe', 'A', ['a','A']],
          ['Alenko, vyvenči _jaxe', 'A', ['a','A']],
          ['dnes odpadá _eština', 'č', ['č','Č']],
          ['z náměstí _rdinů', 'H', ['h','H']],
          ['_arhany v kostele', 'v', ['v','V']],
          ['varhany v _ostele', 'k', ['k','K']],
          ['lyžování v _lpách', 'A', ['a','A']],
          ['pozoroval _ebry', 'z', ['z','Z']],
          ['_eši hrají se Švédy', 'Č', ['č','Č']],
          ['Češi hrají se _védy', 'Š', ['š','Š']],
          ['_oře v Chorvatsku', 'm', ['m','M']],
          ['moře v _orvatsku', 'Ch', ['ch','Ch']],
          ['nová _kola a školka', 'š', ['š','Š']],
          ['nová škola a _kolka', 'š', ['š','Š']],
          ['_ilnice do Lhoty', 's', ['s','S']],
          ['silnice do _hoty', 'L', ['l','L']],
          ['_ožena Němcová', 'B', ['b','B']],
          ['Božena _ěmcová', 'N', ['n','N']],
          ['_ušicí protéká Otava', 'S', ['s','S']],
          ['Sušicí protéká _tava', 'O', ['o','O']],
          ['dvě _lice a náměstí', 'u', ['u','U']],
          ['dvě ulice a _áměstí', 'n', ['n','N']],
          ['vystoupali na _ilešovku', 'M', ['m','M']],
          ['z _aříže na venkov', 'P', ['p','P']],
          ['z Paříže na _enkov', 'v', ['v','V']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['_erta má jezevčíka', 'B', ['b','B']],
          ['Berta má _ezevčíka', 'j', ['j','J']],
          ['ze _si do města', 'v', ['v','V']],
          ['ze vsi do _ěsta', 'm', ['m','M']],
          ['_en je vlčák', 'B', ['b','B']],
          ['Ben je _lčák', 'v', ['v','V']],
          ['_ynek ladí rádio', 'H', ['h','H']],
          ['Hynek ladí _ádio', 'r', ['r','R']],
          ['u _ědy Ládi', 'd', ['d','D']],
          ['u dědy _ádi', 'L', ['l','L']],
          ['_okejistky z Kanady', 'h', ['h','H']],
          ['hokejistky z _anady', 'K', ['k','K']],
          ['koupali se v _erounce', 'B', ['b','B']],
          ['vítězí _agda Kusá', 'M', ['m','M']],
          ['vítězí Magda _usá', 'K', ['k','K']],
          ['zdravotní _estra Jitka', 's', ['s','S']],
          ['zdravotní sestra _itka', 'J', ['j','J']],
          ['_ávod vyhrál Číňan', 'z', ['z','Z']],
          ['závod vyhrál _íňan', 'Č', ['č','Č']],
          ['_rezident Francie', 'p', ['p','P']],
          ['prezident _rancie', 'F', ['f','F']],
          ['rybník se jmenuje _vět', 'S', ['s','S']],
          ['_onza šel do světa', 'H', ['h','H']],
          ['Honza šel do _věta', 's', ['s','S']],
          ['pojedeme do _obylí', 'K', ['k','K']],
          ['sídlí v ulici _inohradská', 'V', ['v','V']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'velka-17', title: 'Velká a malá písmena (str. 17)', emoji: '🍉',
    description: '2 etapy (28+25) — vlastní jména, velká a malá písmena',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['_anárek Pecička', 'k', ['k','K']],
          ['kanárek _ecička', 'P', ['p','P']],
          ['vraťte se, _luci', 'k', ['k','K']],
          ['v _eseníkách je sníh', 'J', ['j','J']],
          ['v Jeseníkách je _níh', 's', ['s','S']],
          ['_ladno porazilo Plzeň', 'K', ['k','K']],
          ['Kladno porazilo _lzeň', 'P', ['p','P']],
          ['_aďa je z Ukrajiny', 'N', ['n','N']],
          ['Naďa je z _krajiny', 'U', ['u','U']],
          ['_rajina kolem Kolína', 'k', ['k','K']],
          ['krajina kolem _olína', 'K', ['k','K']],
          ['rozkvetlá _rchidej', 'o', ['o','O']],
          ['nechoď tam, _oňo', 'S', ['s','S']],
          ['do _oleradic nic nejede', 'B', ['b','B']],
          ['ve škole jsou _eštovice', 'n', ['n','N']],
          ['_lezané a Moravané', 'S', ['s','S']],
          ['Slezané a _oravané', 'M', ['m','M']],
          ['samice _rla je orlice', 'o', ['o','O']],
          ['samice orla je _rlice', 'o', ['o','O']],
          ['_úra na Praděd', 't', ['t','T']],
          ['túra na _raděd', 'P', ['p','P']],
          ['přemnožili se _rtci', 'k', ['k','K']],
          ['chybí _avid Kolář', 'D', ['d','D']],
          ['chybí David _olář', 'K', ['k','K']],
          ['jíme _alát s olivami', 's', ['s','S']],
          ['jíme salát s _livami', 'o', ['o','O']],
          ['_rlice se rozvodnila', 'O', ['o','O']],
          ['na náměstí _vobody', 'S', ['s','S']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['mluví _talsky', 'i', ['i','I']],
          ['v _ybníčku brčálník', 'r', ['r','R']],
          ['v rybníčku _rčálník', 'b', ['b','B']],
          ['_renérka volá Dana', 't', ['t','T']],
          ['trenérka volá _ana', 'D', ['d','D']],
          ['_ešky hrají s Polkami', 'Č', ['č','Č']],
          ['Češky hrají s _olkami', 'P', ['p','P']],
          ['k _oři nebo na hory', 'm', ['m','M']],
          ['k moři nebo na _ory', 'h', ['h','H']],
          ['v _ilu žijí krokodýli', 'N', ['n','N']],
          ['v Nilu žijí _rokodýli', 'k', ['k','K']],
          ['_ilotka Ela Ječná', 'p', ['p','P']],
          ['pilotka _la Ječná', 'E', ['e','E']],
          ['pilotka Ela _ečná', 'J', ['j','J']],
          ['_osef Kajetán Tyl', 'J', ['j','J']],
          ['Josef _ajetán Tyl', 'K', ['k','K']],
          ['Josef Kajetán _yl', 'T', ['t','T']],
          ['_asič nebo záchranář', 'h', ['h','H']],
          ['hasič nebo _áchranář', 'z', ['z','Z']],
          ['_lak z Bratislavy', 'v', ['v','V']],
          ['vlak z _ratislavy', 'B', ['b','B']],
          ['byli jsme v _eskydech', 'B', ['b','B']],
          ['letěla do _meriky', 'A', ['a','A']],
          ['český _rál Václav II.', 'k', ['k','K']],
          ['český král _áclav II.', 'V', ['v','V']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'vyjm-b-18', title: 'Vyjmenovaná slova po b (str. 18)', emoji: '🦉',
    description: '3 etapy (20+13+19) — y/ý – i/í po b',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['ab_ch věděl', 'y', ['i','í','y','ý']],
          ['přib_t hřebík', 'í', ['i','í','y','ý']],
          ['přibít hřeb_k', 'í', ['i','í','y','ý']],
          ['mladá kob_lka', 'y', ['i','í','y','ý']],
          ['ob_čej je zvyk', 'y', ['i','í','y','ý']],
          ['b_lé květy', 'í', ['i','í','y','ý']],
          ['měli b_chom jít', 'y', ['i','í','y','ý']],
          ['ob_val domek', 'ý', ['i','í','y','ý']],
          ['odb_la půlnoc', 'i', ['i','í','y','ý']],
          ['odb_la jsi úkol', 'y', ['i','í','y','ý']],
          ['nebuď vyb_ravý', 'í', ['i','í','y','ý']],
          ['zab_té zvíře', 'i', ['i','í','y','ý']],
          ['živá b_tost', 'y', ['i','í','y','ý']],
          ['Eva b_la Lídu', 'i', ['i','í','y','ý']],
          ['zb_tek polévky', 'y', ['i','í','y','ý']],
          ['přeb_tek obilí', 'y', ['i','í','y','ý']],
          ['přebytek ob_lí', 'i', ['i','í','y','ý']],
          ['nouze je b_da', 'í', ['i','í','y','ý']],
          ['b_la na horách', 'y', ['i','í','y','ý']],
          ['do Kob_lis', 'y', ['i','í','y','ý']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['předb_hal nás', 'í', ['i','í','y','ý']],
          ['b_valý prezident', 'ý', ['i','í','y','ý']],
          ['zalíb_la se mi', 'i', ['i','í','y','ý']],
          ['mladý b_ček', 'ý', ['i','í','y','ý']],
          ['útulný b_t', 'y', ['i','í','y','ý']],
          ['nikoho nezb_l', 'i', ['i','í','y','ý']],
          ['ob_vatel Brna', 'y', ['i','í','y','ý']],
          ['sýr už nezb_l', 'y', ['i','í','y','ý']],
          ['v Přib_slavi', 'y', ['i','í','y','ý']],
          ['vyb_rá dárek', 'í', ['i','í','y','ý']],
          ['vaječný b_lek', 'í', ['i','í','y','ý']],
          ['příjemné b_dlení', 'y', ['i','í','y','ý']],
          ['naše bab_čka', 'i', ['i','í','y','ý']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['nab_dl mi ovoce', 'í', ['i','í','y','ý']],
          ['sb_rka mincí', 'í', ['i','í','y','ý']],
          ['přeb_há ulici', 'í', ['i','í','y','ý']],
          ['liška B_strouška', 'y', ['i','í','y','ý']],
          ['nedob_tný hrad', 'y', ['i','í','y','ý']],
          ['rozb_tý talíř', 'i', ['i','í','y','ý']],
          ['lidové ob_čeje', 'y', ['i','í','y','ý']],
          ['hodiny odb_její', 'í', ['i','í','y','ý']],
          ['kdyb_s to věděl', 'y', ['i','í','y','ý']],
          ['vůně b_linek', 'y', ['i','í','y','ý']],
          ['zb_tečná péče', 'y', ['i','í','y','ý']],
          ['líb_vé obrázky', 'i', ['i','í','y','ý']],
          ['nový náb_tek', 'y', ['i','í','y','ý']],
          ['starob_lé město', 'y', ['i','í','y','ý']],
          ['b_tevní loď', 'i', ['i','í','y','ý']],
          ['ub_valy mu síly', 'ý', ['i','í','y','ý']],
          ['tele je dob_tek', 'y', ['i','í','y','ý']],
          ['b_lá holubice', 'í', ['i','í','y','ý']],
          ['bílá holub_ce', 'i', ['i','í','y','ý']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'vyjm-b-19', title: 'Vyjmenovaná slova po b (str. 19)', emoji: '🐝',
    description: '3 etapy (19+18+17) — y/ý – i/í po b',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['luční kob_lka', 'y', ['i','í','y','ý']],
          ['neb_li doma', 'y', ['i','í','y','ý']],
          ['lidé se sb_hají', 'í', ['i','í','y','ý']],
          ['nesmíš ho b_t', 'í', ['i','í','y','ý']],
          ['oblíb_l si nás', 'i', ['i','í','y','ý']],
          ['chce b_t slavná', 'ý', ['i','í','y','ý']],
          ['dny ub_haly', 'í', ['i','í','y','ý']],
          ['horské b_střiny', 'y', ['i','í','y','ý']],
          ['kráva s b_čkem', 'ý', ['i','í','y','ý']],
          ['krab_ce cukroví', 'i', ['i','í','y','ý']],
          ['jede z B_džova', 'y', ['i','í','y','ý']],
          ['zb_lé zboží', 'y', ['i','í','y','ý']],
          ['zb_tečná práce', 'y', ['i','í','y','ý']],
          ['chleb_ček', 'í', ['i','í','y','ý']],
          ['neob_dlený dům', 'y', ['i','í','y','ý']],
          ['blízká ub_tovna', 'y', ['i','í','y','ý']],
          ['vyb_há ze dveří', 'í', ['i','í','y','ý']],
          ['bab_ččin byt', 'i', ['i','í','y','ý']],
          ['babiččin b_t', 'y', ['i','í','y','ý']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['hub_čka', 'i', ['i','í','y','ý']],
          ['v B_střici', 'y', ['i','í','y','ý']],
          ['zavolala b_ch ti', 'y', ['i','í','y','ý']],
          ['pálí ji dobré b_dlo', 'y', ['i','í','y','ý']],
          ['dlouhé b_dlo', 'i', ['i','í','y','ý']],
          ['stádo dob_tka', 'y', ['i','í','y','ý']],
          ['blízký hřb_tov', 'i', ['i','í','y','ý']],
          ['ob_čejná tužka', 'y', ['i','í','y','ý']],
          ['list z bab_ky', 'y', ['i','í','y','ý']],
          ['hrají vyb_jenou', 'í', ['i','í','y','ý']],
          ['naše nab_dka', 'í', ['i','í','y','ý']],
          ['mládě kob_ly', 'y', ['i','í','y','ý']],
          ['b_jí na poplach', 'i', ['i','í','y','ý']],
          ['hb_tě počítá', 'i', ['i','í','y','ý']],
          ['zb_tky od oběda', 'y', ['i','í','y','ý']],
          ['neob_čejně milá', 'y', ['i','í','y','ý']],
          ['sb_rali borůvky', 'í', ['i','í','y','ý']],
          ['b_t lékařem', 'ý', ['i','í','y','ý']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['dlouhý b_č', 'i', ['i','í','y','ý']],
          ['je přeb_tečná', 'y', ['i','í','y','ý']],
          ['zb_vající čas', 'ý', ['i','í','y','ý']],
          ['už se zab_dlel', 'y', ['i','í','y','ý']],
          ['přib_l prkno', 'i', ['i','í','y','ý']],
          ['přib_l na váze', 'y', ['i','í','y','ý']],
          ['ob_rali kuře', 'í', ['i','í','y','ý']],
          ['b_lá mouka', 'í', ['i','í','y','ý']],
          ['bojí se b_ků', 'ý', ['i','í','y','ý']],
          ['dvě slab_ky', 'i', ['i','í','y','ý']],
          ['pytlík b_linek', 'y', ['i','í','y','ý']],
          ['dob_há vlak', 'í', ['i','í','y','ý']],
          ['bez náb_tku', 'y', ['i','í','y','ý']],
          ['hb_tý Zbyněk', 'i', ['i','í','y','ý']],
          ['hbitý Zb_něk', 'y', ['i','í','y','ý']],
          ['ve slab_káři', 'i', ['i','í','y','ý']],
          ['zb_tek vlny', 'y', ['i','í','y','ý']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'vyjm-b-20', title: 'Vyjmenovaná slova po b (str. 20)', emoji: '🦫',
    description: '3 etapy (15+18+18) — y/ý – i/í po b',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['lehké živob_tí', 'y', ['i','í','y','ý']],
          ['násob_lka', 'i', ['i','í','y','ý']],
          ['b_val nemocný', 'ý', ['i','í','y','ý']],
          ['cesta ub_hala', 'í', ['i','í','y','ý']],
          ['trvalé b_dliště', 'y', ['i','í','y','ý']],
          ['dob_tčí farma', 'y', ['i','í','y','ý']],
          ['slíb_la mi to', 'i', ['i','í','y','ý']],
          ['dvě trub_čky', 'i', ['i','í','y','ý']],
          ['ob_vatelé Zlína', 'y', ['i','í','y','ý']],
          ['nepředb_hej', 'í', ['i','í','y','ý']],
          ['zralý ryb_z', 'í', ['i','í','y','ý']],
          ['tady b_dlíme', 'y', ['i','í','y','ý']],
          ['přib_vá světla', 'ý', ['i','í','y','ý']],
          ['pije b_lou kávu', 'í', ['i','í','y','ý']],
          ['čistý příb_tek', 'y', ['i','í','y','ý']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['soutěž prob_há', 'í', ['i','í','y','ý']],
          ['měli b_ste to znát', 'y', ['i','í','y','ý']],
          ['je neob_vatelný', 'y', ['i','í','y','ý']],
          ['b_cí nástroje', 'i', ['i','í','y','ý']],
          ['moderní ob_dlí', 'y', ['i','í','y','ý']],
          ['léčivá b_lina', 'y', ['i','í','y','ý']],
          ['jezdecký b_čík', 'i', ['i','í','y','ý']],
          ['b_strá dívka', 'y', ['i','í','y','ý']],
          ['zb_tečný křik', 'y', ['i','í','y','ý']],
          ['neb_valý úspěch', 'ý', ['i','í','y','ý']],
          ['líb_l se nám', 'i', ['i','í','y','ý']],
          ['ob_čejný život', 'y', ['i','í','y','ý']],
          ['děti b_ly doma', 'y', ['i','í','y','ý']],
          ['pořád odb_hala', 'í', ['i','í','y','ý']],
          ['nab_lil chalupu', 'í', ['i','í','y','ý']],
          ['v b_tvě', 'i', ['i','í','y','ý']],
          ['dob_tá území', 'y', ['i','í','y','ý']],
          ['dob_tá baterie', 'i', ['i','í','y','ý']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['vítězná b_tva', 'i', ['i','í','y','ý']],
          ['b_tové družstvo', 'y', ['i','í','y','ý']],
          ['vyb_tá baterie', 'i', ['i','í','y','ý']],
          ['krupob_tí', 'i', ['i','í','y','ý']],
          ['nab_rá vodu', 'í', ['i','í','y','ý']],
          ['bab_kový květ', 'y', ['i','í','y','ý']],
          ['nežije v b_dě', 'í', ['i','í','y','ý']],
          ['statný b_k', 'ý', ['i','í','y','ý']],
          ['zab_la komára', 'i', ['i','í','y','ý']],
          ['b_stře si poradil', 'y', ['i','í','y','ý']],
          ['bratr mě odb_l', 'y', ['i','í','y','ý']],
          ['dob_vatelé', 'y', ['i','í','y','ý']],
          ['jeřab_ny uzrály', 'i', ['i','í','y','ý']],
          ['b_lí vyrostlo', 'ý', ['i','í','y','ý']],
          ['přihlásil b_ ses', 'y', ['i','í','y','ý']],
          ['b_lý polštář', 'í', ['i','í','y','ý']],
          ['nová nab_dka', 'í', ['i','í','y','ý']],
          ['zab_vá se tím', 'ý', ['i','í','y','ý']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'vyjm-b-21', title: 'Vyjmenovaná slova po b (str. 21)', emoji: '🐿️',
    description: '3 etapy (19+18+12) — y/ý – i/í po b',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['vyb_rá si zboží', 'í', ['i','í','y','ý']],
          ['b_ložravec', 'ý', ['i','í','y','ý']],
          ['b_lo mi teplo', 'y', ['i','í','y','ý']],
          ['chodb_čka', 'i', ['i','í','y','ý']],
          ['práská b_čem', 'i', ['i','í','y','ý']],
          ['nab_l si mobil', 'i', ['i','í','y','ý']],
          ['neob_čejný den', 'y', ['i','í','y','ý']],
          ['hrozná b_da', 'í', ['i','í','y','ý']],
          ['nab_l majetek', 'y', ['i','í','y','ý']],
          ['ab_ch byla tady', 'y', ['i','í','y','ý']],
          ['abych b_la tady', 'y', ['i','í','y','ý']],
          ['přeb_rá čočku', 'í', ['i','í','y','ý']],
          ['starý náb_tek', 'y', ['i','í','y','ý']],
          ['javor bab_ka', 'y', ['i','í','y','ý']],
          ['ob_vací pokoj', 'ý', ['i','í','y','ý']],
          ['chyb_čka', 'i', ['i','í','y','ý']],
          ['b_linkový čaj', 'y', ['i','í','y','ý']],
          ['posb_rej prádlo', 'í', ['i','í','y','ý']],
          ['rozb_la talíř', 'i', ['i','í','y','ý']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['zvonky b_mbají', 'i', ['i','í','y','ý']],
          ['b_linná mast', 'y', ['i','í','y','ý']],
          ['neb_la doma', 'y', ['i','í','y','ý']],
          ['b_ložravý slon', 'ý', ['i','í','y','ý']],
          ['pob_l komáry', 'i', ['i','í','y','ý']],
          ['Petr u nás pob_l', 'y', ['i','í','y','ý']],
          ['sb_rá známky', 'í', ['i','í','y','ý']],
          ['nic tu nezb_lo', 'y', ['i','í','y','ý']],
          ['rvačka je b_tka', 'i', ['i','í','y','ý']],
          ['b_stří si paměť', 'y', ['i','í','y','ý']],
          ['b_čí rohy', 'ý', ['i','í','y','ý']],
          ['byl jsem b_t', 'i', ['i','í','y','ý']],
          ['b_dná chatrč', 'í', ['i','í','y','ý']],
          ['b_tový dům', 'y', ['i','í','y','ý']],
          ['v hlub_ně', 'i', ['i','í','y','ý']],
          ['rozb_té okno', 'i', ['i','í','y','ý']],
          ['malý zb_teček', 'y', ['i','í','y','ý']],
          ['zb_dačený pes', 'í', ['i','í','y','ý']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['měsíce ub_vá', 'ý', ['i','í','y','ý']],
          ['b_strá dívka', 'y', ['i','í','y','ý']],
          ['políb_la dítě', 'i', ['i','í','y','ý']],
          ['ob_čejně spí', 'y', ['i','í','y','ý']],
          ['vyb_tý telefon', 'i', ['i','í','y','ý']],
          ['zab_tý had', 'i', ['i','í','y','ý']],
          ['kob_lí hlava', 'y', ['i','í','y','ý']],
          ['Zb_ňkův pokoj', 'y', ['i','í','y','ý']],
          ['právě vyb_há', 'í', ['i','í','y','ý']],
          ['je vyb_ravý', 'í', ['i','í','y','ý']],
          ['ub_tovala se', 'y', ['i','í','y','ý']],
          ['b_telný stůl', 'y', ['i','í','y','ý']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'vyjm-l-22', title: 'Vyjmenovaná slova po l (str. 22)', emoji: '🥬',
    description: '3 etapy (18+14+19) — y/ý – i/í po l',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['pl_tvá vodou', 'ý', ['i','í','y','ý']],
          ['L_sá hora', 'y', ['i','í','y','ý']],
          ['Rek se l_sá', 'í', ['i','í','y','ý']],
          ['prudký l_ják', 'i', ['i','í','y','ý']],
          ['skoro se zal_ká', 'y', ['i','í','y','ý']],
          ['pol_bek', 'i', ['i','í','y','ý']],
          ['měla l_zátko', 'í', ['i','í','y','ý']],
          ['sl_bil mi to', 'í', ['i','í','y','ý']],
          ['bl_skavé šperky', 'ý', ['i','í','y','ý']],
          ['boty od hl_ny', 'í', ['i','í','y','ý']],
          ['voda pl_ne', 'y', ['i','í','y','ý']],
          ['l_tkový sval', 'ý', ['i','í','y','ý']],
          ['na rušné ul_ci', 'i', ['i','í','y','ý']],
          ['l_mec košile', 'í', ['i','í','y','ý']],
          ['hračky z pl_še', 'y', ['i','í','y','ý']],
          ['l_čí pasti', 'í', ['i','í','y','ý']],
          ['ml_t kávu', 'í', ['i','í','y','ý']],
          ['větrný ml_n', 'ý', ['i','í','y','ý']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['sl_ší vzlykot', 'y', ['i','í','y','ý']],
          ['slyší vzl_kot', 'y', ['i','í','y','ý']],
          ['dobré l_vance', 'í', ['i','í','y','ý']],
          ['pel_ňkový čaj', 'y', ['i','í','y','ý']],
          ['černé hol_nky', 'í', ['i','í','y','ý']],
          ['skl_čko', 'í', ['i','í','y','ý']],
          ['světlo bl_kalo', 'i', ['i','í','y','ý']],
          ['pl_nový sporák', 'y', ['i','í','y','ý']],
          ['ml_nářka', 'y', ['i','í','y','ý']],
          ['sl_mák', 'i', ['i','í','y','ý']],
          ['pl_seň na ovoci', 'í', ['i','í','y','ý']],
          ['l_skový ořech', 'í', ['i','í','y','ý']],
          ['učí se l_žovat', 'y', ['i','í','y','ý']],
          ['nal_tý čaj', 'i', ['i','í','y','ý']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['je mi to l_to', 'í', ['i','í','y','ý']],
          ['odřené l_tko', 'ý', ['i','í','y','ý']],
          ['sestra se l_čí', 'í', ['i','í','y','ý']],
          ['pol_kej pomalu', 'y', ['i','í','y','ý']],
          ['ml_nské kolo', 'ý', ['i','í','y','ý']],
          ['l_pový list', 'i', ['i','í','y','ý']],
          ['lipový l_st', 'i', ['i','í','y','ý']],
          ['l_bezná tvář', 'í', ['i','í','y','ý']],
          ['pl_nárna', 'y', ['i','í','y','ý']],
          ['l_žařské boty', 'y', ['i','í','y','ý']],
          ['l_stnatý les', 'i', ['i','í','y','ý']],
          ['obě ul_ce', 'i', ['i','í','y','ý']],
          ['zabl_sklo se', 'ý', ['i','í','y','ý']],
          ['l_stek do kina', 'í', ['i','í','y','ý']],
          ['tiché vzl_kání', 'y', ['i','í','y','ý']],
          ['pozor na kl_ště', 'í', ['i','í','y','ý']],
          ['prosl_chá se to', 'ý', ['i','í','y','ý']],
          ['tenká l_nka', 'i', ['i','í','y','ý']],
          ['ml_nek na kávu', 'ý', ['i','í','y','ý']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'vyjm-l-23', title: 'Vyjmenovaná slova po l (str. 23)', emoji: '🦎',
    description: '3 etapy (18+18+13) — y/ý – i/í po l',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['jehl_čí', 'i', ['i','í','y','ý']],
          ['přírodní l_ko', 'ý', ['i','í','y','ý']],
          ['hltavé pol_kání', 'y', ['i','í','y','ý']],
          ['nel_tostný boj', 'í', ['i','í','y','ý']],
          ['sl_šela hudbu', 'y', ['i','í','y','ý']],
          ['rozvzl_kala se', 'y', ['i','í','y','ý']],
          ['hl_něný džbán', 'i', ['i','í','y','ý']],
          ['zmrzl_na', 'i', ['i','í','y','ý']],
          ['týden upl_nul', 'y', ['i','í','y','ý']],
          ['l_ška je savec', 'i', ['i','í','y','ý']],
          ['l_ska na ovoce', 'í', ['i','í','y','ý']],
          ['pták l_ska', 'y', ['i','í','y','ý']],
          ['brouk l_kožrout', 'ý', ['i','í','y','ý']],
          ['l_bové maso', 'i', ['i','í','y','ý']],
          ['sl_na na jazyku', 'i', ['i','í','y','ý']],
          ['rozpl_nul se', 'y', ['i','í','y','ý']],
          ['nesl_šná chůze', 'y', ['i','í','y','ý']],
          ['pol_tovala je', 'i', ['i','í','y','ý']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['ukl_zený byt', 'i', ['i','í','y','ý']],
          ['l_monáda', 'i', ['i','í','y','ý']],
          ['pl_šové hračky', 'y', ['i','í','y','ý']],
          ['bl_zký rybník', 'í', ['i','í','y','ý']],
          ['začal vzl_kat', 'y', ['i','í','y','ý']],
          ['na kl_ně', 'í', ['i','í','y','ý']],
          ['sl_šitelnost', 'y', ['i','í','y','ý']],
          ['pl_noucí voda', 'y', ['i','í','y','ý']],
          ['l_stové těsto', 'i', ['i','í','y','ý']],
          ['velký ul_čník', 'i', ['i','í','y','ý']],
          ['nepol_kej to', 'y', ['i','í','y','ý']],
          ['dobrá l_žařka', 'y', ['i','í','y','ý']],
          ['pampel_ška', 'i', ['i','í','y','ý']],
          ['čas pl_ne', 'y', ['i','í','y','ý']],
          ['nevl_dný den', 'í', ['i','í','y','ý']],
          ['nabl_skané auto', 'ý', ['i','í','y','ý']],
          ['ničím nepl_tvej', 'ý', ['i','í','y','ý']],
          ['zůstal nabl_zku', 'í', ['i','í','y','ý']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['košatá l_pa', 'í', ['i','í','y','ý']],
          ['mal_nová šťáva', 'i', ['i','í','y','ý']],
          ['opl_vá krásou', 'ý', ['i','í','y','ý']],
          ['svalnaté l_tko', 'ý', ['i','í','y','ý']],
          ['odl_šovat se', 'i', ['i','í','y','ý']],
          ['v l_stopadu', 'i', ['i','í','y','ý']],
          ['bylina pel_něk', 'y', ['i','í','y','ý']],
          ['nebuď l_ný', 'í', ['i','í','y','ý']],
          ['l_dová píseň', 'i', ['i','í','y','ý']],
          ['rohože z l_čí', 'ý', ['i','í','y','ý']],
          ['l_čí si oči', 'í', ['i','í','y','ý']],
          ['vyl_soval květ', 'i', ['i','í','y','ý']],
          ['kůň s l_sinkou', 'y', ['i','í','y','ý']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'vyjm-l-24', title: 'Vyjmenovaná slova po l (str. 24)', emoji: '⛷️',
    description: '3 etapy (15+18+19) — y/ý – i/í po l',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['stará ml_nice', 'ý', ['i','í','y','ý']],
          ['čti pl_nule', 'y', ['i','í','y','ý']],
          ['větrné ml_ny', 'ý', ['i','í','y','ý']],
          ['seml_t pšenici', 'í', ['i','í','y','ý']],
          ['nel_zej sníh', 'í', ['i','í','y','ý']],
          ['pl_nulá řeč', 'y', ['i','í','y','ý']],
          ['l_stopadový den', 'i', ['i','í','y','ý']],
          ['opálená l_tka', 'ý', ['i','í','y','ý']],
          ['pojďte bl_ž', 'í', ['i','í','y','ý']],
          ['místní pl_novod', 'y', ['i','í','y','ý']],
          ['sl_dí okolo', 'í', ['i','í','y','ý']],
          ['sl_chal o tom', 'ý', ['i','í','y','ý']],
          ['zajíc kl_čkoval', 'i', ['i','í','y','ý']],
          ['těžce pol_ká', 'y', ['i','í','y','ý']],
          ['odvar z pel_ňku', 'y', ['i','í','y','ý']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['vůně se l_nula', 'i', ['i','í','y','ý']],
          ['jitrnice a jel_ta', 'i', ['i','í','y','ý']],
          ['umí spl_vat', 'ý', ['i','í','y','ý']],
          ['l_ná na práci', 'í', ['i','í','y','ý']],
          ['pl_noměr', 'y', ['i','í','y','ý']],
          ['někteří l_dé', 'i', ['i','í','y','ý']],
          ['nesl_šeli nic', 'y', ['i','í','y','ý']],
          ['l_ščí mládě', 'i', ['i','í','y','ý']],
          ['bal_k slámy', 'í', ['i','í','y','ý']],
          ['nesl_chaná věc', 'ý', ['i','í','y','ý']],
          ['l_pový květ', 'i', ['i','í','y','ý']],
          ['vzl_kající dítě', 'y', ['i','í','y','ý']],
          ['odl_šuje se', 'i', ['i','í','y','ý']],
          ['byl vysl_chán', 'ý', ['i','í','y','ý']],
          ['bl_skavý poklad', 'ý', ['i','í','y','ý']],
          ['l_sková jádra', 'í', ['i','í','y','ý']],
          ['l_s na ovoce', 'i', ['i','í','y','ý']],
          ['kabela z l_ka', 'ý', ['i','í','y','ý']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['tol_k slibů', 'i', ['i','í','y','ý']],
          ['tolik sl_bů', 'i', ['i','í','y','ý']],
          ['dobře l_žuje', 'y', ['i','í','y','ý']],
          ['noční hl_dka', 'í', ['i','í','y','ý']],
          ['ml_nář', 'y', ['i','í','y','ý']],
          ['kl_ka u dveří', 'i', ['i','í','y','ý']],
          ['konval_nka', 'i', ['i','í','y','ý']],
          ['Ela zavzl_kala', 'y', ['i','í','y','ý']],
          ['květy l_kovce', 'ý', ['i','í','y','ý']],
          ['špatně pol_ká', 'y', ['i','í','y','ý']],
          ['l_dový zvyk', 'i', ['i','í','y','ý']],
          ['kapr l_sý', 'y', ['i','í','y','ý']],
          ['keř l_ska', 'í', ['i','í','y','ý']],
          ['l_heň kuřat', 'í', ['i','í','y','ý']],
          ['můj pl_šák', 'y', ['i','í','y','ý']],
          ['už se bl_ská', 'ý', ['i','í','y','ý']],
          ['l_žařský svah', 'y', ['i','í','y','ý']],
          ['bl_zká obec', 'í', ['i','í','y','ý']],
          ['nel_tej tady', 'í', ['i','í','y','ý']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'vyjm-bl-25', title: 'Vyjmenovaná slova po b, l (str. 25)', emoji: '🐂',
    description: '3 etapy (24+24+18) — y/ý – i/í po b a l',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['je nedosl_chavá', 'ý', ['i','í','y','ý']],
          ['skl_zeli obilí', 'í', ['i','í','y','ý']],
          ['sklízeli ob_lí', 'i', ['i','í','y','ý']],
          ['neb_l zbytečný', 'y', ['i','í','y','ý']],
          ['nebyl zb_tečný', 'y', ['i','í','y','ý']],
          ['ob_vatelé měst', 'y', ['i','í','y','ý']],
          ['l_dový obyčej', 'i', ['i','í','y','ý']],
          ['lidový ob_čej', 'y', ['i','í','y','ý']],
          ['b_valý statek', 'ý', ['i','í','y','ý']],
          ['sl_buji ti to', 'i', ['i','í','y','ý']],
          ['zab_l mouchu', 'i', ['i','í','y','ý']],
          ['vysl_šet přání', 'y', ['i','í','y','ý']],
          ['vypl_tval vodu', 'ý', ['i','í','y','ý']],
          ['bab_čka Jana', 'i', ['i','í','y','ý']],
          ['není ob_čejná', 'y', ['i','í','y','ý']],
          ['ulomená kl_čka', 'i', ['i','í','y','ý']],
          ['b_ložravý býk', 'ý', ['i','í','y','ý']],
          ['býložravý b_k', 'ý', ['i','í','y','ý']],
          ['bab_kové listy', 'y', ['i','í','y','ý']],
          ['babykové l_sty', 'i', ['i','í','y','ý']],
          ['čas upl_nul', 'y', ['i','í','y','ý']],
          ['l_že zmrzlinu', 'í', ['i','í','y','ý']],
          ['líže zmrzl_nu', 'i', ['i','í','y','ý']],
          ['zlomená l_že', 'y', ['i','í','y','ý']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['sl_šel vzlyky', 'y', ['i','í','y','ý']],
          ['slyšel vzl_ky', 'y', ['i','í','y','ý']],
          ['b_dlí v Liberci', 'y', ['i','í','y','ý']],
          ['bydlí v L_berci', 'i', ['i','í','y','ý']],
          ['neb_valý klid', 'ý', ['i','í','y','ý']],
          ['nebývalý kl_d', 'i', ['i','í','y','ý']],
          ['l_sá hlava', 'y', ['i','í','y','ý']],
          ['vl_dné jednání', 'í', ['i','í','y','ý']],
          ['do l_stopadu', 'i', ['i','í','y','ý']],
          ['bl_skavé zlato', 'ý', ['i','í','y','ý']],
          ['hb_tý Zbyněk', 'i', ['i','í','y','ý']],
          ['hbitý Zb_něk', 'y', ['i','í','y','ý']],
          ['spí jak zab_tá', 'i', ['i','í','y','ý']],
          ['l_nkovaný sešit', 'i', ['i','í','y','ý']],
          ['pl_šová kočička', 'y', ['i','í','y','ý']],
          ['b_lý límec', 'í', ['i','í','y','ý']],
          ['bílý l_mec', 'í', ['i','í','y','ý']],
          ['unikající pl_n', 'y', ['i','í','y','ý']],
          ['rozb_tý talíř', 'i', ['i','í','y','ý']],
          ['rozbitý tal_ř', 'í', ['i','í','y','ý']],
          ['pol_kala slzy', 'y', ['i','í','y','ý']],
          ['v pel_ňku', 'y', ['i','í','y','ý']],
          ['zelená kob_lka', 'y', ['i','í','y','ý']],
          ['vykvetly l_py', 'í', ['i','í','y','ý']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['pobl_ž mlýnice', 'í', ['i','í','y','ý']],
          ['poblíž ml_nice', 'ý', ['i','í','y','ý']],
          ['L_da mě odbyla', 'í', ['i','í','y','ý']],
          ['Lída mě odb_la', 'y', ['i','í','y','ý']],
          ['l_tkový sval', 'ý', ['i','í','y','ý']],
          ['l_n je ryba', 'í', ['i','í','y','ý']],
          ['pl_nový sporák', 'y', ['i','í','y','ý']],
          ['vyb_tá baterie', 'i', ['i','í','y','ý']],
          ['l_ščí ocas', 'i', ['i','í','y','ý']],
          ['kl_ží se jí oči', 'í', ['i','í','y','ý']],
          ['l_ko stromu', 'ý', ['i','í','y','ý']],
          ['zb_lá jablíčka', 'y', ['i','í','y','ý']],
          ['zbylá jabl_čka', 'í', ['i','í','y','ý']],
          ['kl_če od bytu', 'í', ['i','í','y','ý']],
          ['klíče od b_tu', 'y', ['i','í','y','ý']],
          ['keř l_kovec', 'ý', ['i','í','y','ý']],
          ['l_skové oříšky', 'í', ['i','í','y','ý']],
          ['neumí spl_vat', 'ý', ['i','í','y','ý']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'vyjm-m-26', title: 'Vyjmenovaná slova po m (str. 26)', emoji: '🐭',
    description: '3 etapy (19+16+19) — y/ý – i/í po m',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['usm_řit se', 'í', ['i','í','y','ý']],
          ['našla m_ček', 'í', ['i','í','y','ý']],
          ['m_la okno', 'y', ['i','í','y','ý']],
          ['m_lá maminka', 'i', ['i','í','y','ý']],
          ['milá mam_nka', 'i', ['i','í','y','ý']],
          ['m_dlová pěna', 'ý', ['i','í','y','ý']],
          ['kom_níček', 'i', ['i','í','y','ý']],
          ['jemné chm_ří', 'ý', ['i','í','y','ý']],
          ['m_val rád sport', 'í', ['i','í','y','ý']],
          ['m_val je šelma', 'ý', ['i','í','y','ý']],
          ['m_ tě známe', 'y', ['i','í','y','ý']],
          ['sm_rkový papír', 'i', ['i','í','y','ý']],
          ['dostali sm_k', 'y', ['i','í','y','ý']],
          ['pepř a km_n', 'í', ['i','í','y','ý']],
          ['m_čka nádobí', 'y', ['i','í','y','ý']],
          ['zam_chala karty', 'í', ['i','í','y','ý']],
          ['s šedou m_ší', 'y', ['i','í','y','ý']],
          ['to nedom_slel', 'y', ['i','í','y','ý']],
          ['na svém m_stě', 'í', ['i','í','y','ý']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['m_ se vrátíme', 'y', ['i','í','y','ý']],
          ['podej m_ sůl', 'i', ['i','í','y','ý']],
          ['plná m_sa', 'í', ['i','í','y','ý']],
          ['lesní m_tina', 'ý', ['i','í','y','ý']],
          ['lehký prům_sl', 'y', ['i','í','y','ý']],
          ['m_vá rýmu', 'í', ['i','í','y','ý']],
          ['um_stil se třetí', 'í', ['i','í','y','ý']],
          ['je zlom_slná', 'y', ['i','í','y','ý']],
          ['m_t radost', 'í', ['i','í','y','ý']],
          ['vysoký kom_n', 'í', ['i','í','y','ý']],
          ['nachom_tl se tu', 'ý', ['i','í','y','ý']],
          ['m_t si ruce', 'ý', ['i','í','y','ý']],
          ['kreslený m_šák', 'y', ['i','í','y','ý']],
          ['nesm_rná dálka', 'í', ['i','í','y','ý']],
          ['malá sm_čka', 'y', ['i','í','y','ý']],
          ['m_cí prostředek', 'y', ['i','í','y','ý']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['je um_něná', 'í', ['i','í','y','ý']],
          ['rozm_slel si to', 'y', ['i','í','y','ý']],
          ['hlem_ždí ulita', 'ý', ['i','í','y','ý']],
          ['zam_loval se', 'i', ['i','í','y','ý']],
          ['to je nesm_sl', 'y', ['i','í','y','ý']],
          ['je dom_šlivý', 'ý', ['i','í','y','ý']],
          ['zam_řila domů', 'í', ['i','í','y','ý']],
          ['m_lí přátelé', 'i', ['i','í','y','ý']],
          ['velm_ se mýlí', 'i', ['i','í','y','ý']],
          ['velmi se m_lí', 'ý', ['i','í','y','ý']],
          ['v m_nulosti', 'i', ['i','í','y','ý']],
          ['zavládl m_r', 'í', ['i','í','y','ý']],
          ['cvičí vým_k', 'y', ['i','í','y','ý']],
          ['hm_zožravec', 'y', ['i','í','y','ý']],
          ['m_str světa', 'i', ['i','í','y','ý']],
          ['m_řila přesně', 'í', ['i','í','y','ý']],
          ['hm_zí bodnutí', 'y', ['i','í','y','ý']],
          ['náhle zm_zel', 'i', ['i','í','y','ý']],
          ['vždy zam_ká', 'y', ['i','í','y','ý']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'vyjm-m-27', title: 'Vyjmenovaná slova po m (str. 27)', emoji: '🐞',
    description: '3 etapy (18+17+18) — y/ý – i/í po m',
    _stages: [
      {
        title: '1. sloupec',
        words: [
          ['malá m_šička', 'y', ['i','í','y','ý']],
          ['m_lná zpráva', 'y', ['i','í','y','ý']],
          ['horský průsm_k', 'y', ['i','í','y','ý']],
          ['už se sm_řili', 'í', ['i','í','y','ý']],
          ['om_tnout dům', 'í', ['i','í','y','ý']],
          ['není neom_lná', 'y', ['i','í','y','ý']],
          ['ochm_řený', 'ý', ['i','í','y','ý']],
          ['neum_tý talíř', 'y', ['i','í','y','ý']],
          ['Láďa m_jí cíl', 'í', ['i','í','y','ý']],
          ['m_jí si ruce', 'y', ['i','í','y','ý']],
          ['odem_kání auta', 'y', ['i','í','y','ý']],
          ['m_luje léto', 'i', ['i','í','y','ý']],
          ['km_nový chléb', 'í', ['i','í','y','ý']],
          ['nová om_tka', 'í', ['i','í','y','ý']],
          ['barevný m_č', 'í', ['i','í','y','ý']],
          ['housle a sm_čec', 'y', ['i','í','y','ý']],
          ['v Litom_šli', 'y', ['i','í','y','ý']],
          ['udělit m_lost', 'i', ['i','í','y','ý']],
        ]
      },
      {
        title: '2. sloupec',
        words: [
          ['malé sem_nko', 'í', ['i','í','y','ý']],
          ['na hlem_ždě', 'ý', ['i','í','y','ý']],
          ['vítr jím sm_kl', 'ý', ['i','í','y','ý']],
          ['už se stm_vá', 'í', ['i','í','y','ý']],
          ['sm_šený les', 'í', ['i','í','y','ý']],
          ['prům_slová zóna', 'y', ['i','í','y','ý']],
          ['srdečný sm_ch', 'í', ['i','í','y','ý']],
          ['m_cení stromů', 'ý', ['i','í','y','ý']],
          ['lidské sm_sly', 'y', ['i','í','y','ý']],
          ['neúm_slný čin', 'y', ['i','í','y','ý']],
          ['zam_chal čaj', 'í', ['i','í','y','ý']],
          ['nová m_šlenka', 'y', ['i','í','y','ý']],
          ['zm_lil jsem se', 'ý', ['i','í','y','ý']],
          ['m_hla se tady', 'i', ['i','í','y','ý']],
          ['um_várna', 'ý', ['i','í','y','ý']],
          ['m_rný vítr', 'í', ['i','í','y','ý']],
          ['m_slivna', 'y', ['i','í','y','ý']],
        ]
      },
      {
        title: '3. sloupec',
        words: [
          ['dva kom_níci', 'i', ['i','í','y','ý']],
          ['žádost zam_tli', 'í', ['i','í','y','ý']],
          ['dům_slný stroj', 'y', ['i','í','y','ý']],
          ['m_ to umíme', 'y', ['i','í','y','ý']],
          ['my to um_me', 'í', ['i','í','y','ý']],
          ['jakm_le přišla', 'i', ['i','í','y','ý']],
          ['musíš m_slet', 'y', ['i','í','y','ý']],
          ['voňavé m_dlo', 'ý', ['i','í','y','ý']],
          ['prom_ňte mi', 'i', ['i','í','y','ý']],
          ['promiňte m_', 'i', ['i','í','y','ý']],
          ['m_ší ocásek', 'y', ['i','í','y','ý']],
          ['na um_vadle', 'y', ['i','í','y','ý']],
          ['drobné m_nce', 'i', ['i','í','y','ý']],
          ['byl to om_l', 'y', ['i','í','y','ý']],
          ['obtížný hm_z', 'y', ['i','í','y','ý']],
          ['jedovatá zm_je', 'i', ['i','í','y','ý']],
          ['sm_tko v oku', 'í', ['i','í','y','ý']],
          ['rozdm_chaný', 'ý', ['i','í','y','ý']],
        ]
      },
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'mix-all', title: 'Mix — všechno', emoji: '🎲',
    description: 'Náhodný mix ze všech stran', _isMix: true, words: []
  }
];

// ─── Motivační motivy ───────────────────────────────────────────────────────

const MOTIFS = [
  {
    name: 'rocket',
    render(pct) {
      const label = pct >= 100 ? '🎉 Přistáli jsme na Měsíci!'
        : pct >= 80 ? '✨ Měsíc je blízko!'
        : pct >= 40 ? '⭐ Letíme vesmírem…'
        : pct > 0 ? '💨 Startujeme!' : 'Připraveni ke startu!';
      return `
        <div class="motif-rocket">
          <span class="motif-ep">🌍</span>
          <div class="rocket-track">
            <div class="rocket-ship" style="left:${pct}%">🚀</div>
          </div>
          <span class="motif-ep">🌙</span>
        </div>
        <div class="motif-label">${label}</div>`;
    }
  },
  {
    name: 'train',
    render(pct, score, target) {
      const wagonCount = 5;
      const perWagon = target / wagonCount;
      let wagons = '';
      for (let i = 1; i <= wagonCount; i++) {
        wagons += score >= Math.ceil(i * perWagon)
          ? '🚃' : '<span class="train-wagon-empty">🚃</span>';
      }
      const label = pct >= 100 ? '🎉 Vláček je kompletní!'
        : pct >= 80 ? 'Už je skoro celý!'
        : pct > 0 ? 'Připojujeme vagóny!' : 'Lokomotiva čeká!';
      return `
        <div class="motif-train">🚂${wagons}</div>
        <div class="motif-label">${label}</div>`;
    }
  },
  {
    name: 'egg',
    render(pct) {
      const emoji = pct >= 100 ? '🐥' : pct >= 73 ? '🐣' : '🥚';
      const wobble = pct >= 15 && pct < 100;
      const speed = pct >= 60 ? '0.3s' : pct >= 40 ? '0.5s' : '0.8s';
      const size = Math.round(38 + pct * 0.2);
      const cracks = pct >= 40 && pct < 73 ? ' 💥' : '';
      const cls = wobble ? 'egg-inner egg-wobble' : 'egg-inner';
      const label = pct >= 100 ? '🐥 Kuřátko je na světě!'
        : pct >= 73 ? 'Už koukáme ven!'
        : pct >= 40 ? 'Praská to!'
        : pct >= 15 ? 'Něco se hýbe!' : 'Tajemné vajíčko…';
      return `
        <div class="motif-egg">
          <span class="${cls}" style="font-size:${size}px;animation-duration:${speed}">${emoji}${cracks}</span>
        </div>
        <div class="motif-label">${label}</div>`;
    }
  }
];

// ─── Herní engine ────────────────────────────────────────────────────────────

const BonusGame = {
  category: null, score: 0, streak: 0, totalAnswered: 0, qIndex: 0,
  questionPool: [], processing: false, TARGET_SCORE: 15, motif: null,

  start(container, category, callback) {
    this.container = container; this.category = category; this.onComplete = callback;
    this.score = 0; this.streak = 0; this.totalAnswered = 0; this.qIndex = 0;
    this.processing = false;
    this.mistakes = [];
    // Etapa může mít vlastní target (např. 18), jinak default 15
    this.TARGET_SCORE = category.target || 15;
    this.motif = MOTIFS[Math.floor(Math.random() * MOTIFS.length)];
    let allWords;
    if (category._isMix) {
      allWords = [];
      BONUS_CATEGORIES.forEach(cat => {
        if (cat._isMix || cat._section) return;
        if (cat.words && cat.words.length) allWords.push(...cat.words);
      });
    } else {
      allWords = [...category.words];
    }
    for (let i = allWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
    }
    // Pool = přesně target (pro etapy projede celá), nebo všech slov (pokud je méně)
    const poolSize = Math.min(allWords.length, this.TARGET_SCORE);
    this.questionPool = allWords.slice(0, poolSize);
    // Pokud target > poolSize, sniž target (nemá smysl vyžadovat víc než kolik je slov)
    if (this.TARGET_SCORE > this.questionPool.length) {
      this.TARGET_SCORE = this.questionPool.length;
    }
    this.render();
  },

  render() {
    const q = this.questionPool[this.qIndex];
    if (!q) return;
    this.container.innerHTML = '';
    const pct = Math.min(100, Math.round((this.score / this.TARGET_SCORE) * 100));
    const motifDiv = document.createElement('div');
    motifDiv.className = 'motif-container';
    motifDiv.innerHTML = this.motif.render(pct, this.score, this.TARGET_SCORE);
    this.container.appendChild(motifDiv);

    const area = document.createElement('div');
    area.className = 'game-area fade-in';
    const word = q[0], correct = q[1], choices = q[2];
    const parts = word.split('_');

    const wordDisplay = document.createElement('div');
    wordDisplay.className = 'bonus-word-display';
    wordDisplay.innerHTML = `<span class="bonus-word">${parts[0]}<span class="bonus-blank">_</span>${parts[1]||''}</span>`;
    area.appendChild(wordDisplay);

    const feedback = document.createElement('div');
    feedback.className = 'feedback-line';
    feedback.innerHTML = '&nbsp;';
    area.appendChild(feedback);

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'options-row';
    // Promícháme volby — aby správná odpověď nebyla vždy na stejné pozici
    const shuffledChoices = choices.slice();
    for (let i = shuffledChoices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledChoices[i], shuffledChoices[j]] = [shuffledChoices[j], shuffledChoices[i]];
    }
    shuffledChoices.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn-option';
      btn.type = 'button';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (this.processing) return;
        btn.blur();
        const isCorrect = opt === correct;
        if (!isCorrect) this.mistakes.push(q);
        if (isCorrect) { btn.classList.add('correct'); }
        else { btn.classList.add('wrong'); optionsDiv.querySelectorAll('.btn-option').forEach(b => { if (b.textContent === correct) b.classList.add('correct'); }); }
        wordDisplay.querySelector('.bonus-word').innerHTML = `${parts[0]}<span class="bonus-filled">${correct}</span>${parts[1]||''}`;
        this.submit(isCorrect, feedback);
      });
      optionsDiv.appendChild(btn);
    });
    area.appendChild(optionsDiv);

    this.container.appendChild(area);

    // Po překreslení shoď fokus, aby browser nepřenášel pozici z minulé otázky
    if (document.activeElement && document.activeElement.blur && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
  },

  submit(isCorrect, feedbackEl) {
    if (this.processing) return;
    this.processing = true; this.totalAnswered++;
    if (isCorrect) {
      this.score++; this.streak++; Sound.correct(); spawnStars(this.container);
      if (feedbackEl) { feedbackEl.className = 'feedback-line correct-flash'; feedbackEl.innerHTML = '✓ Správně! 🌟'; }
    } else {
      this.streak = 0; Sound.wrong();
      const area = this.container.querySelector('.game-area');
      if (area) { area.classList.add('shake'); setTimeout(() => area.classList.remove('shake'), 600); }
      if (feedbackEl) { feedbackEl.className = 'feedback-line wrong-flash'; feedbackEl.innerHTML = 'Nevadí! 💪 Jede se dál.'; }
    }
    setTimeout(() => {
      this.processing = false;
      this.qIndex++;
      // Etapa končí když dosáhne target score nebo projde všechny otázky
      if (this.score >= this.TARGET_SCORE || this.qIndex >= this.questionPool.length) {
        this.onComplete();
        return;
      }
      this.render();
    }, isCorrect ? 950 : 1350);
  },

};

