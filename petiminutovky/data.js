// ─── Pravopisné pětiminutovky – Data a herní engine ─────────────────────────
// Formát: ['slovo_s_mezerou', 'správná_odpověď', ['volba1', 'volba2']]
// Každé slovo ověřeno — vhodné pro 2. třídu ZŠ.

const BONUS_CATEGORIES = [
  {
    id: 'hard-soft-yi', title: 'y / i — krátké', emoji: '🔤',
    description: 'Po tvrdých y, po měkkých i',
    words: [
      ['ch_ba','y',['y','i']],['ch_tit','y',['y','i']],['ch_tat','y',['y','i']],['ch_trý','y',['y','i']],
      ['ch_stat','y',['y','i']],['h_ena','y',['y','i']],['h_nout','y',['y','i']],['kr_sa','y',['y','i']],
      ['kr_chle','y',['y','i']],['r_ba','y',['y','i']],['r_bář','y',['y','i']],['r_chle','y',['y','i']],
      ['r_tíř','y',['y','i']],['r_s','y',['y','i']],
      ['ž_vot','i',['y','i']],['ž_dle','i',['y','i']],['ž_to','i',['y','i']],['ž_rafa','i',['y','i']],
      ['š_ška','i',['y','i']],['š_kmo','i',['y','i']],['š_kovný','i',['y','i']],['č_n','i',['y','i']],
      ['c_bule','i',['y','i']],['c_hla','i',['y','i']],['c_trón','i',['y','i']],['j_skra','i',['y','i']],
      ['j_nak','i',['y','i']],['j_stý','i',['y','i']]
    ]
  },
  {
    id: 'hard-soft-long', title: 'ý / í — dlouhé', emoji: '📝',
    description: 'Po tvrdých ý, po měkkých í',
    words: [
      ['h_bat','ý',['ý','í']],['h_čkat','ý',['ý','í']],['ch_še','ý',['ý','í']],['kr_t','ý',['ý','í']],
      ['r_č','ý',['ý','í']],['r_ma','ý',['ý','í']],['r_ha','ý',['ý','í']],['r_že','ý',['ý','í']],
      ['r_pat','ý',['ý','í']],['ch_lit','ý',['ý','í']],
      ['ž_la','í',['ý','í']],['ž_zeň','í',['ý','í']],['š_pek','í',['ý','í']],['š_lený','í',['ý','í']],
      ['š_t','í',['ý','í']],['č_st','í',['ý','í']],['č_slo','í',['ý','í']],['č_šník','í',['ý','í']],
      ['ř_kat','í',['ý','í']],['ř_dký','í',['ý','í']],['ř_jen','í',['ý','í']],['c_l','í',['ý','í']],
      ['j_zda','í',['ý','í']],['j_dlo','í',['ý','í']],['j_st','í',['ý','í']]
    ]
  },
  {
    id: 'u-ring', title: 'ú – ů', emoji: '🔵',
    description: 'Na začátku ú, uprostřed ů',
    words: [
      ['d_m','ů',['ú','ů']],['_kol','ú',['ú','ů']],['k_ra','ů',['ú','ů']],['_terý','ú',['ú','ů']],
      ['p_jčit','ů',['ú','ů']],['_žas','ú',['ú','ů']],['st_l','ů',['ú','ů']],['_roda','ú',['ú','ů']],
      ['d_vod','ů',['ú','ů']],['_pal','ú',['ú','ů']],['v_le','ů',['ú','ů']],['_svit','ú',['ú','ů']],
      ['m_j','ů',['ú','ů']],['_lek','ú',['ú','ů']],['_trata','ú',['ú','ů']],['k_ň','ů',['ú','ů']],
      ['_nava','ú',['ú','ů']],['d_lek','ů',['ú','ů']],['_směv','ú',['ú','ů']],['p_da','ů',['ú','ů']],
      ['_tes','ú',['ú','ů']],['k_že','ů',['ú','ů']],['_klid','ú',['ú','ů']],['p_lka','ů',['ú','ů']],
      ['_hoř','ú',['ú','ů']],['_čes','ú',['ú','ů']],['k_l','ů',['ú','ů']],['_nos','ú',['ú','ů']],
      ['b_h','ů',['ú','ů']],['_tok','ú',['ú','ů']]
    ]
  },
  {
    id: 'de-te-ne', title: 'dě / tě / ně', emoji: '🧩',
    description: 'Měkčení s ě: dě nebo de?',
    words: [
      ['_da','dě',['dě','de']],['_lat','dě',['dě','de']],['_cko','dě',['dě','de']],['_kovat','dě',['dě','de']],
      ['ne_le','dě',['dě','de']],['vi_t','dě',['dě','de']],['o_v','dě',['dě','de']],['na_je','dě',['dě','de']],
      ['o_jít','de',['dě','de']],
      ['_lo','tě',['tě','te']],['_sto','tě',['tě','te']],['_žký','tě',['tě','te']],['ko_','tě',['tě','te']],
      ['š_ně','tě',['tě','te']],['s_ží','tě',['tě','te']],['le_t','tě',['tě','te']],['_šit','tě',['tě','te']],
      ['s_na','tě',['tě','te']],['_plo','te',['tě','te']],['ú_rý','te',['tě','te']],
      ['_co','ně',['ně','ne']],['_kdo','ně',['ně','ne']],['_mý','ně',['ně','ne']],
      ['_bo','ne',['ně','ne']],['_jde','ne',['ně','ne']]
    ]
  },
  {
    id: 'be-pe-ve-me', title: 'bě / pě / vě / mě', emoji: '🎯',
    description: 'Měkčení b, p, v, m s ě',
    words: [
      ['o_d','bě',['bě','be']],['_hat','bě',['bě','be']],['_žet','bě',['bě','be']],['hu_ný','be',['bě','be']],
      ['_na','pě',['pě','pe']],['_t','pě',['pě','pe']],['_kně','pě',['pě','pe']],['_šky','pě',['pě','pe']],
      ['_stovat','pě',['pě','pe']],['_ro','pe',['pě','pe']],
      ['_c','vě',['vě','ve']],['_tší','vě',['vě','ve']],['s_t','vě',['vě','ve']],['_nec','vě',['vě','ve']],
      ['_tev','vě',['vě','ve']],['z_davý','vě',['vě','ve']],['_lký','ve',['vě','ve']],
      ['_sto','mě',['mě','me']],['_kký','mě',['mě','me']],['_síc','mě',['mě','me']],['_nit','mě',['mě','me']],
      ['s_r','mě',['mě','me']],['_řit','mě',['mě','me']],['_dvěd','me',['mě','me']]
    ]
  },
  {
    id: 'paired-bp', title: 'b – p', emoji: '🅱️', description: 'Párové souhlásky b/p',
    words: [
      ['zu_','b',['b','p']],['chlé_','b',['b','p']],['du_','b',['b','p']],['holu_','b',['b','p']],
      ['hři_','b',['b','p']],['hro_','b',['b','p']],['stro_','p',['b','p']],['slou_','p',['b','p']],
      ['klu_ko','b',['b','p']],['kra_ice','b',['b','p']],['sku_ina','p',['b','p']],['chla_ec','p',['b','p']],
      ['kou_at','p',['b','p']],['zlo_a','b',['b','p']],['hlu_oký','b',['b','p']],['trou_a','b',['b','p']],
      ['ko_ec','p',['b','p']],['dou_ě','p',['b','p']],['zá_ach','p',['b','p']],['stou_at','p',['b','p']]
    ]
  },
  {
    id: 'paired-dt', title: 'd – t', emoji: '🔠', description: 'Párové souhlásky d/t',
    words: [
      ['hra_','d',['d','t']],['me_','d',['d','t']],['le_','d',['d','t']],['hla_','d',['d','t']],
      ['plo_','d',['d','t']],['sa_','d',['d','t']],['ha_','d',['d','t']],['bo_','d',['d','t']],
      ['sla_ký','d',['d','t']],['hla_ký','d',['d','t']],['lou_ka','t',['d','t']],['ma_ka','t',['d','t']],
      ['lá_ka','t',['d','t']],['svě_ek','t',['d','t']],['há_ka','d',['d','t']],['le_ka','t',['d','t']],
      ['pohá_ka','d',['d','t']],['záha_a','d',['d','t']],['ohle_','d',['d','t']],['nákla_','d',['d','t']]
    ]
  },
  {
    id: 'paired-vf', title: 'v – f', emoji: '🅰️', description: 'Párové souhlásky v/f',
    words: [
      ['_oda','v',['v','f']],['_ilm','f',['v','f']],['_elký','v',['v','f']],['_otbal','f',['v','f']],
      ['_áza','v',['v','f']],['_ialka','f',['v','f']],['_eselý','v',['v','f']],['_antazie','f',['v','f']],
      ['_oják','v',['v','f']],['_irma','f',['v','f']],['_ůně','v',['v','f']],['_ialový','f',['v','f']],
      ['_ýška','v',['v','f']],['_otka','f',['v','f']],['_lak','v',['v','f']],['_ousy','v',['v','f']],
      ['_ařit','v',['v','f']],['_ík','f',['v','f']],['_ěc','v',['v','f']],['_arma','f',['v','f']]
    ]
  },
  {
    id: 'paired-hch', title: 'h – ch', emoji: '🏠', description: 'Párové souhlásky h/ch',
    words: [
      ['_odiny','h',['h','ch']],['_léb','ch',['h','ch']],['_ora','h',['h','ch']],['_lapec','ch',['h','ch']],
      ['_rát','h',['h','ch']],['_odba','ch',['h','ch']],['_rách','h',['h','ch']],['_ata','ch',['h','ch']],
      ['_olub','h',['h','ch']],['_ytit','ch',['h','ch']],['_ladný','h',['h','ch']],['_obot','ch',['h','ch']],
      ['_řeben','h',['h','ch']],['_lad','h',['h','ch']],['_yba','ch',['h','ch']],['_ázet','h',['h','ch']],
      ['_ala','h',['h','ch']],['_utný','ch',['h','ch']],['_říva','h',['h','ch']],['_vězda','h',['h','ch']]
    ]
  },
  {
    id: 'paired-zs', title: 'z – s', emoji: '🔄', description: 'Párové souhlásky z/s',
    words: [
      ['_ima','z',['z','s']],['_lon','s',['z','s']],['_latý','z',['z','s']],['_pínat','s',['z','s']],
      ['_ubr','z',['z','s']],['_tůl','s',['z','s']],['_ub','z',['z','s']],['_pát','s',['z','s']],
      ['_bavit','z',['z','s']],['_nak','z',['z','s']],['_edlo','s',['z','s']],['_pěv','z',['z','s']],
      ['_chody','s',['z','s']],['_leva','z',['z','s']],['_kok','s',['z','s']],['_kouška','z',['z','s']],
      ['_měna','z',['z','s']],['_ova','s',['z','s']],['_tráta','z',['z','s']],['_ešit','s',['z','s']]
    ]
  },
  {
    id: 'yi-all', title: 'y / ý / i / í — vše', emoji: '⭐',
    description: 'Krátké i dlouhé — mix tvrdých a měkkých',
    words: [
      ['ch_ba','y',['y','i','ý','í']],['ch_tit','y',['y','i','ý','í']],['ch_trý','y',['y','i','ý','í']],
      ['h_nout','y',['y','i','ý','í']],['kr_sa','y',['y','i','ý','í']],['r_ba','y',['y','i','ý','í']],
      ['r_chle','y',['y','i','ý','í']],['r_tíř','y',['y','i','ý','í']],['kr_chle','y',['y','i','ý','í']],
      ['ch_stat','y',['y','i','ý','í']],
      ['ž_vot','i',['y','i','ý','í']],['ž_dle','i',['y','i','ý','í']],['š_ška','i',['y','i','ý','í']],
      ['c_bule','i',['y','i','ý','í']],['j_skra','i',['y','i','ý','í']],['č_n','i',['y','i','ý','í']],
      ['š_kovný','i',['y','i','ý','í']],['c_hla','i',['y','i','ý','í']],['j_stý','i',['y','i','ý','í']],
      ['ž_rafa','i',['y','i','ý','í']],
      ['h_bat','ý',['y','i','ý','í']],['kr_t','ý',['y','i','ý','í']],['r_č','ý',['y','i','ý','í']],
      ['r_ma','ý',['y','i','ý','í']],['r_že','ý',['y','i','ý','í']],['ch_še','ý',['y','i','ý','í']],
      ['h_čkat','ý',['y','i','ý','í']],['r_ha','ý',['y','i','ý','í']],
      ['ž_la','í',['y','i','ý','í']],['č_slo','í',['y','i','ý','í']],['ř_kat','í',['y','i','ý','í']],
      ['š_lený','í',['y','i','ý','í']],['č_st','í',['y','i','ý','í']],['j_dlo','í',['y','i','ý','í']],
      ['j_zda','í',['y','i','ý','í']],['ř_jen','í',['y','i','ý','í']],['c_l','í',['y','i','ý','í']],
      ['š_pek','í',['y','i','ý','í']]
    ]
  },
  { _section: '📚 Procvičování z učebnice' },
  {
    id: 'y-after-h-2', title: 'y/ý po h (str. 2)', emoji: '🐴',
    description: '2 etapy (16+16) — y/ý a hy/hý',
    _stages: [
      {
        title: '1. etapa (doplň y/ý)',
        words: [
          ['oba roh_', 'y', ['y','ý']],
          ['h_bat se', 'ý', ['y','ý']],
          ['drah_ kámen', 'ý', ['y','ý']],
          ['dlouh_ vlas', 'ý', ['y','ý']],
          ['tenké pruh_', 'y', ['y','ý']],
          ['druh_ den', 'ý', ['y','ý']],
          ['dvě stuh_', 'y', ['y','ý']],
          ['za zásluh_', 'y', ['y','ý']],
          ['vlah_ večer', 'ý', ['y','ý']],
          ['h_čkat dítě', 'ý', ['y','ý']],
          ['nezah_nul', 'y', ['y','ý']],
          ['dlouhé noh_', 'y', ['y','ý']],
          ['sh_bá se', 'ý', ['y','ý']],
          ['H_nkův pes', 'y', ['y','ý']],
          ['tuh_ papír', 'ý', ['y','ý']],
          ['ploché dráh_', 'y', ['y','ý']]
        ]
      },
      {
        title: '2. etapa (doplň hy/hý)',
        words: [
          ['šikmé bře_', 'hy', ['hy','hý']],
          ['po_bovat se', 'hy', ['hy','hý']],
          ['dlou_ výlet', 'hý', ['hy','hý']],
          ['tu_ kořínek', 'hý', ['hy','hý']],
          ['jede do Pra_', 'hy', ['hy','hý']],
          ['ne_bej se', 'hý', ['hy','hý']],
          ['dru_ žák', 'hý', ['hy','hý']],
          ['sladké tvaro_', 'hy', ['hy','hý']],
          ['ubo_ ptáček', 'hý', ['hy','hý']],
          ['dřevěné pra_', 'hy', ['hy','hý']],
          ['u_bá z cesty', 'hý', ['hy','hý']],
          ['velké kru_', 'hy', ['hy','hý']],
          ['vy_bá se mi', 'hý', ['hy','hý']],
          ['přesné vá_', 'hy', ['hy','hý']],
          ['dětské kni_', 'hy', ['hy','hý']],
          ['malý o_nek', 'hý', ['hy','hý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'y-after-hch-3', title: 'y/ý po h, ch (str. 3)', emoji: '🦘',
    description: '2 etapy (16+12) — y/ý a chy/chý',
    _stages: [
      {
        title: '1. etapa (doplň y/ý)',
        words: [
          ['ch_ba', 'y', ['y','ý']],
          ['do kuch_ně', 'y', ['y','ý']],
          ['bez odvah_', 'y', ['y','ý']],
          ['ostré roh_', 'y', ['y','ý']],
          ['such_ strom', 'ý', ['y','ý']],
          ['nah_bá se', 'ý', ['y','ý']],
          ['mleté ořech_', 'y', ['y','ý']],
          ['vetch_ kabát', 'ý', ['y','ý']],
          ['drah_ svetr', 'ý', ['y','ý']],
          ['nízké břeh_', 'y', ['y','ý']],
          ['tich_ zpěv', 'ý', ['y','ý']],
          ['dvě mouch_', 'y', ['y','ý']],
          ['zach_tit se', 'y', ['y','ý']],
          ['hluch_ pes', 'ý', ['y','ý']],
          ['bolavý puch_ř', 'ý', ['y','ý']],
          ['černé tuh_', 'y', ['y','ý']]
        ]
      },
      {
        title: '2. etapa (doplň chy/chý)',
        words: [
          ['udělal _bu', 'chy', ['chy','chý']],
          ['su_ ručník', 'chý', ['chy','chý']],
          ['je v ku_ni', 'chy', ['chy','chý']],
          ['plo_ kámen', 'chý', ['chy','chý']],
          ['ti_ smích', 'chý', ['chy','chý']],
          ['ne_til míč', 'chy', ['chy','chý']],
          ['po_tala myši', 'chy', ['chy','chý']],
          ['_trá liška', 'chy', ['chy','chý']],
          ['jednodu_ úkol', 'chý', ['chy','chý']],
          ['pla_ pták', 'chý', ['chy','chý']],
          ['dva rampou_', 'chy', ['chy','chý']],
          ['hrají ša_', 'chy', ['chy','chý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'y-after-hchk-4', title: 'y/ý po h, ch, k (str. 4)', emoji: '🦒',
    description: '2 etapy (16+12) — y/ý a ky/ký',
    _stages: [
      {
        title: '1. etapa (doplň y/ý)',
        words: [
          ['dvě housk_', 'y', ['y','ý']],
          ['ch_stá oběd', 'y', ['y','ý']],
          ['mladé stromk_', 'y', ['y','ý']],
          ['krátk_ kabát', 'ý', ['y','ý']],
          ['běžecké dráh_', 'y', ['y','ý']],
          ['oh_bal dřevo', 'ý', ['y','ý']],
          ['dlouhé steh_', 'y', ['y','ý']],
          ['luční zvonk_', 'y', ['y','ý']],
          ['tenké plech_', 'y', ['y','ý']],
          ['mluví česk_', 'y', ['y','ý']],
          ['česk_ jazyk', 'ý', ['y','ý']],
          ['hezk_ den', 'ý', ['y','ý']],
          ['velké úspěch_', 'y', ['y','ý']],
          ['H_nkův sen', 'y', ['y','ý']],
          ['oba roh_', 'y', ['y','ý']],
          ['nízk_ strop', 'ý', ['y','ý']]
        ]
      },
      {
        title: '2. etapa (doplň ky/ký)',
        words: [
          ['uh_bal nám', 'ý', ['y','ý']],
          ['silné noh_', 'y', ['y','ý']],
          ['zaječí pelech_', 'y', ['y','ý']],
          ['nach_tat ryby', 'y', ['y','ý']],
          ['sladk_ dort', 'ý', ['y','ý']],
          ['žensk_ hlas', 'ý', ['y','ý']],
          ['k_mácet se', 'y', ['y','ý']],
          ['dobré ořech_', 'y', ['y','ý']],
          ['přik_vovat', 'ý', ['y','ý']],
          ['tenk_ drát', 'ý', ['y','ý']],
          ['bylo hezk_', 'y', ['y','ý']],
          ['zakr_l se', 'y', ['y','ý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'y-after-hchkr-5', title: 'y/ý po h, ch, k, r (str. 5)', emoji: '🐅',
    description: '2 etapy (16+13) — y/ý a ry/rý',
    _stages: [
      {
        title: '1. etapa (doplň y/ý)',
        words: [
          ['skr_vají se', 'ý', ['y','ý']],
          ['s r_bkami', 'y', ['y','ý']],
          ['r_tířský', 'y', ['y','ý']],
          ['dvě úloh_', 'y', ['y','ý']],
          ['úzk_ list', 'ý', ['y','ý']],
          ['zr_chlí to', 'y', ['y','ý']],
          ['plach_ srnec', 'ý', ['y','ý']],
          ['jarní svátk_', 'y', ['y','ý']],
          ['v úter_', 'ý', ['y','ý']],
          ['druh_ žák', 'ý', ['y','ý']],
          ['r_bíz', 'y', ['y','ý']],
          ['opr_skaný', 'ý', ['y','ý']],
          ['kysel_', 'ý', ['y','ý']],
          ['ner_muje se', 'ý', ['y','ý']],
          ['do sprch_', 'y', ['y','ý']],
          ['ohr_zal', 'y', ['y','ý']]
        ]
      },
      {
        title: '2. etapa (doplň ry/rý)',
        words: [
          ['loví kap_', 'ry', ['ry','rý']],
          ['tři dce_', 'ry', ['ry','rý']],
          ['mok_ svetr', 'rý', ['ry','rý']],
          ['štěd_ den', 'rý', ['ry','rý']],
          ['lodní stoža_', 'ry', ['ry','rý']],
          ['sk_vali se', 'rý', ['ry','rý']],
          ['_zí zlato', 'ry', ['ry','rý']],
          ['hluboké dí_', 'ry', ['ry','rý']],
          ['staré javo_', 'ry', ['ry','rý']],
          ['mod_ hrnek', 'rý', ['ry','rý']],
          ['tajný úk_t', 'ry', ['ry','rý']],
          ['_bízový koláč', 'ry', ['ry','rý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'y-after-dtn-6', title: 'y/ý po d, t, n (str. 6)', emoji: '🐎',
    description: '2 etapy (16+13) — y/ý po tvrdých d, t, n',
    _stages: [
      {
        title: '1. etapa (doplň y/ý)',
        words: [
          ['hust_ les', 'ý', ['y','ý']],
          ['d_cháme', 'ý', ['y','ý']],
          ['dot_ká se', 'ý', ['y','ý']],
          ['příjemn_ hlas', 'ý', ['y','ý']],
          ['tři kamen_', 'y', ['y','ý']],
          ['mlad_ král', 'ý', ['y','ý']],
          ['plné sud_', 'y', ['y','ý']],
          ['do bedn_', 'y', ['y','ý']],
          ['st_ská si', 'ý', ['y','ý']],
          ['malé květ_', 'y', ['y','ý']],
          ['do boud_', 'y', ['y','ý']],
          ['d_ka', 'ý', ['y','ý']],
          ['bílé peřin_', 'y', ['y','ý']],
          ['dva mot_li', 'ý', ['y','ý']],
          ['t_pický', 'y', ['y','ý']]
        ]
      },
      {
        title: '2. etapa (doplň y/ý)',
        words: [
          ['u Alen_', 'y', ['y','ý']],
          ['do brad_', 'y', ['y','ý']],
          ['t_den', 'ý', ['y','ý']],
          ['u tet_', 'y', ['y','ý']],
          ['kouř je d_m', 'ý', ['y','ý']],
          ['mazan_ lišák', 'ý', ['y','ý']],
          ['každ_ den', 'ý', ['y','ý']],
          ['pevné kořen_', 'y', ['y','ý']],
          ['hrd_ rytíř', 'ý', ['y','ý']],
          ['sekan_ kopr', 'ý', ['y','ý']],
          ['šli tud_', 'y', ['y','ý']],
          ['t_činka', 'y', ['y','ý']],
          ['mléčn_ zub', 'ý', ['y','ý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'ii-after-z-7', title: 'i/í (po ž) – y/ý (str. 7)', emoji: '🦓',
    description: '2 etapy po 15 slovech — i/í po ž, jinak y/ý',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['dlouh_ nos', 'ý', ['i','í','y','ý']],
          ['v kož_chu', 'i', ['i','í','y','ý']],
          ['mám ž_zeň', 'í', ['i','í','y','ý']],
          ['mladé dívk_', 'y', ['i','í','y','ý']],
          ['svěž_ vůně', 'í', ['i','í','y','ý']],
          ['bílé květ_', 'y', ['i','í','y','ý']],
          ['ž_jí tady', 'i', ['i','í','y','ý']],
          ['hezk_ den', 'ý', ['i','í','y','ý']],
          ['ž_vot', 'i', ['i','í','y','ý']],
          ['r_chle vstal', 'y', ['i','í','y','ý']],
          ['touž_ po vodě', 'í', ['i','í','y','ý']],
          ['v úkr_tu', 'y', ['i','í','y','ý']],
          ['suché rt_', 'y', ['i','í','y','ý']],
          ['zakrouž_l', 'i', ['i','í','y','ý']],
          ['ž_rafa', 'i', ['i','í','y','ý']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['smaž_ řízky', 'í', ['i','í','y','ý']],
          ['r_je záhon', 'y', ['i','í','y','ý']],
          ['na mot_ku', 'y', ['i','í','y','ý']],
          ['H_nek', 'y', ['i','í','y','ý']],
          ['ž_dlička', 'i', ['i','í','y','ý']],
          ['puch_ř na patě', 'ý', ['i','í','y','ý']],
          ['nové brambor_', 'y', ['i','í','y','ý']],
          ['hněd_ kůň', 'ý', ['i','í','y','ý']],
          ['mot_lek', 'ý', ['i','í','y','ý']],
          ['r_chlík', 'y', ['i','í','y','ý']],
          ['v louž_ch', 'í', ['i','í','y','ý']],
          ['je na pláž_', 'i', ['i','í','y','ý']],
          ['dvě koblih_', 'y', ['i','í','y','ý']],
          ['jí ořech_', 'y', ['i','í','y','ý']],
          ['malé pih_', 'y', ['i','í','y','ý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'ii-after-zs-8', title: 'i/í (po ž, š) – y/ý (str. 8)', emoji: '🐍',
    description: '2 etapy po 15 slovech — i/í po ž, š',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['už neprš_', 'í', ['i','í','y','ý']],
          ['teď sněž_', 'í', ['i','í','y','ý']],
          ['hust_ krém', 'ý', ['i','í','y','ý']],
          ['prudk_ déšť', 'ý', ['i','í','y','ý']],
          ['š_šky', 'i', ['i','í','y','ý']],
          ['dva žalud_', 'y', ['i','í','y','ý']],
          ['koš_le', 'i', ['i','í','y','ý']],
          ['pro k_tici', 'y', ['i','í','y','ý']],
          ['ploch_ štětec', 'ý', ['i','í','y','ý']],
          ['ž_zeň', 'í', ['i','í','y','ý']],
          ['zr_chlila', 'y', ['i','í','y','ý']],
          ['nelež_me', 'í', ['i','í','y','ý']],
          ['d_chá', 'ý', ['i','í','y','ý']],
          ['malé uš_', 'i', ['i','í','y','ý']],
          ['u vod_', 'y', ['i','í','y','ý']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['nož_čky', 'i', ['i','í','y','ý']],
          ['nové šat_', 'y', ['i','í','y','ý']],
          ['prudké břeh_', 'y', ['i','í','y','ý']],
          ['slyš_m tě', 'í', ['i','í','y','ý']],
          ['ž_je tady', 'i', ['i','í','y','ý']],
          ['pěkn_ den', 'ý', ['i','í','y','ý']],
          ['dětsk_ lékař', 'ý', ['i','í','y','ý']],
          ['Jana vyš_vá', 'í', ['i','í','y','ý']],
          ['mokr_ plášť', 'ý', ['i','í','y','ý']],
          ['myš_ díra', 'í', ['i','í','y','ý']],
          ['tento t_den', 'ý', ['i','í','y','ý']],
          ['š_kmá čára', 'i', ['i','í','y','ý']],
          ['moje záž_tky', 'i', ['i','í','y','ý']],
          ['bílé stěn_', 'y', ['i','í','y','ý']],
          ['plach_ pták', 'ý', ['i','í','y','ý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'ii-after-zsc-9', title: 'i/í (po ž, š, č) – y/ý (str. 9)', emoji: '🐊',
    description: '2 etapy po 15 slovech — i/í po ž, š, č',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['such_ strom', 'ý', ['i','í','y','ý']],
          ['Emilč_n pes', 'i', ['i','í','y','ý']],
          ['nah_bá se', 'ý', ['i','í','y','ý']],
          ['poč_tala', 'í', ['i','í','y','ý']],
          ['něco dluž_', 'í', ['i','í','y','ý']],
          ['vysok_ dům', 'ý', ['i','í','y','ý']],
          ['r_chlá pomoc', 'y', ['i','í','y','ý']],
          ['skrč_ se', 'í', ['i','í','y','ý']],
          ['š_pka', 'i', ['i','í','y','ý']],
          ['Rex vrč_', 'í', ['i','í','y','ý']],
          ['na ž_žaly', 'í', ['i','í','y','ý']],
          ['dřevěn_ sud', 'ý', ['i','í','y','ý']],
          ['d_chá', 'ý', ['i','í','y','ý']],
          ['černé oboč_', 'í', ['i','í','y','ý']],
          ['hněd_ kabát', 'ý', ['i','í','y','ý']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['drahé bot_', 'y', ['i','í','y','ý']],
          ['druh_ syn', 'ý', ['i','í','y','ý']],
          ['větš_ kus', 'í', ['i','í','y','ý']],
          ['velké hroud_', 'y', ['i','í','y','ý']],
          ['č_sté ruce', 'i', ['i','í','y','ý']],
          ['oč_chá tě', 'i', ['i','í','y','ý']],
          ['vš_chni', 'i', ['i','í','y','ý']],
          ['v kolotoč_', 'i', ['i','í','y','ý']],
          ['vyhlíž_ vás', 'í', ['i','í','y','ý']],
          ['měkké mech_', 'y', ['i','í','y','ý']],
          ['nad oč_ma', 'i', ['i','í','y','ý']],
          ['dvě bucht_', 'y', ['i','í','y','ý']],
          ['na r_by', 'y', ['i','í','y','ý']],
          ['had syč_', 'í', ['i','í','y','ý']],
          ['nezah_ne', 'y', ['i','í','y','ý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'ii-after-zscr-10', title: 'i/í (po ž, š, č, ř) – y/ý (str. 10)', emoji: '🦎',
    description: '2 etapy po 15 slovech — i/í po ž, š, č, ř',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['chladn_ den', 'ý', ['i','í','y','ý']],
          ['v ř_jnu', 'í', ['i','í','y','ý']],
          ['ch_bný krok', 'y', ['i','í','y','ý']],
          ['pro koš_ček', 'í', ['i','í','y','ý']],
          ['poh_by', 'y', ['i','í','y','ý']],
          ['př_letěl', 'i', ['i','í','y','ý']],
          ['mlad_ lev', 'ý', ['i','í','y','ý']],
          ['skř_vánci', 'i', ['i','í','y','ý']],
          ['šíp v terč_', 'i', ['i','í','y','ý']],
          ['zálež_ na ní', 'í', ['i','í','y','ý']],
          ['čtyř_ noci', 'i', ['i','í','y','ý']],
          ['spatř_la tě', 'i', ['i','í','y','ý']],
          ['loví r_by', 'y', ['i','í','y','ý']],
          ['je nejmenš_', 'í', ['i','í','y','ý']],
          ['modr_ flek', 'ý', ['i','í','y','ý']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['bílá kř_da', 'í', ['i','í','y','ý']],
          ['nech_tí tě', 'y', ['i','í','y','ý']],
          ['běž_ pryč', 'í', ['i','í','y','ý']],
          ['v r_chlosti', 'y', ['i','í','y','ý']],
          ['malé kalhot_', 'y', ['i','í','y','ý']],
          ['ve skř_ni', 'í', ['i','í','y','ý']],
          ['š_roká řeka', 'i', ['i','í','y','ý']],
          ['obě kř_dla', 'í', ['i','í','y','ý']],
          ['tvrd_ kus', 'ý', ['i','í','y','ý']],
          ['oř_šek', 'í', ['i','í','y','ý']],
          ['koč_čka', 'i', ['i','í','y','ý']],
          ['luk a š_p', 'í', ['i','í','y','ý']],
          ['zaboř_l nos', 'i', ['i','í','y','ý']],
          ['obě hračk_', 'y', ['i','í','y','ý']],
          ['hezké sn_', 'y', ['i','í','y','ý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'ii-after-zscrc-11', title: 'i/í (po ž, š, č, ř, c) – y/ý (str. 11)', emoji: '🦂',
    description: '2 etapy po 15 slovech — i/í po ž, š, č, ř, c',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['hezč_ květ', 'í', ['i','í','y','ý']],
          ['c_bule', 'i', ['i','í','y','ý']],
          ['vlčí mák_', 'y', ['i','í','y','ý']],
          ['Cec_lka', 'i', ['i','í','y','ý']],
          ['ř_dí auto', 'í', ['i','í','y','ý']],
          ['kozí sýr_', 'y', ['i','í','y','ý']],
          ['postř_kat', 'í', ['i','í','y','ý']],
          ['bez náhod_', 'y', ['i','í','y','ý']],
          ['k_chá', 'ý', ['i','í','y','ý']],
          ['zac_nkat', 'i', ['i','í','y','ý']],
          ['dva pruh_', 'y', ['i','í','y','ý']],
          ['vlídn_ hlas', 'ý', ['i','í','y','ý']],
          ['dlouhá t_č', 'y', ['i','í','y','ý']],
          ['nepř_jel', 'i', ['i','í','y','ý']],
          ['c_hlový dům', 'i', ['i','í','y','ý']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['r_ma', 'ý', ['i','í','y','ý']],
          ['hrd_ muž', 'ý', ['i','í','y','ý']],
          ['r_tířův meč', 'y', ['i','í','y','ý']],
          ['pavouc_', 'i', ['i','í','y','ý']],
          ['t_den', 'ý', ['i','í','y','ý']],
          ['uř_cený kluk', 'í', ['i','í','y','ý']],
          ['vrak_ lodí', 'y', ['i','í','y','ý']],
          ['nic nec_tí', 'í', ['i','í','y','ý']],
          ['př_letěl čáp', 'i', ['i','í','y','ý']],
          ['drží vrabc_', 'i', ['i','í','y','ý']],
          ['běž_me tam', 'í', ['i','í','y','ý']],
          ['do c_le', 'í', ['i','í','y','ý']],
          ['staré hrad_', 'y', ['i','í','y','ý']],
          ['léč_vý čaj', 'i', ['i','í','y','ý']],
          ['bic_ hodiny', 'í', ['i','í','y','ý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'ii-after-zscrcj-12', title: 'i/í (po ž, š, č, ř, c, j) – y/ý (str. 12)', emoji: '🪳',
    description: '2 etapy po 15 slovech — i/í po měkkých všechno',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['do Prah_', 'y', ['i','í','y','ý']],
          ['hezk_ píše', 'y', ['i','í','y','ý']],
          ['ch_bička', 'y', ['i','í','y','ý']],
          ['nemaj_ čas', 'í', ['i','í','y','ý']],
          ['c_bulka', 'i', ['i','í','y','ý']],
          ['v j_delně', 'í', ['i','í','y','ý']],
          ['školní výlet_', 'y', ['i','í','y','ý']],
          ['j_skra', 'i', ['i','í','y','ý']],
          ['skr_la se', 'y', ['i','í','y','ý']],
          ['ve věž_ch', 'í', ['i','í','y','ý']],
          ['zač_ná jaro', 'í', ['i','í','y','ý']],
          ['kráj_ maso', 'í', ['i','í','y','ý']],
          ['ve tvář_', 'i', ['i','í','y','ý']],
          ['na kraj_ch', 'í', ['i','í','y','ý']],
          ['zaj_mavý', 'í', ['i','í','y','ý']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['vyh_bá se', 'ý', ['i','í','y','ý']],
          ['v prác_', 'i', ['i','í','y','ý']],
          ['bez příč_ny', 'i', ['i','í','y','ý']],
          ['s r_čem', 'ý', ['i','í','y','ý']],
          ['kraj_c', 'í', ['i','í','y','ý']],
          ['ch_bí tady', 'y', ['i','í','y','ý']],
          ['rychlá j_zda', 'í', ['i','í','y','ý']],
          ['oh_bat drát', 'ý', ['i','í','y','ý']],
          ['pokr_vka', 'ý', ['i','í','y','ý']],
          ['do peř_n', 'i', ['i','í','y','ý']],
          ['na j_hu', 'i', ['i','í','y','ý']],
          ['za uš_ma', 'i', ['i','í','y','ý']],
          ['dobr_ den', 'ý', ['i','í','y','ý']],
          ['j_trnice', 'i', ['i','í','y','ý']],
          ['na mot_ku', 'y', ['i','í','y','ý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'didi-dydy-13', title: 'di/dí – dy/dý (str. 13)', emoji: '🐶',
    description: '2 etapy (16+16) — di/dí/dy/dý a i/í–y/ý mix',
    _stages: [
      {
        title: '1. etapa (doplň di/dí – dy/dý)',
        words: [
          ['malé _tě', 'dí', ['di','dí','dy','dý']],
          ['vž_cky zdraví', 'dy', ['di','dí','dy','dý']],
          ['jez_me rychle', 'dí', ['di','dí','dy','dý']],
          ['velké výho_', 'dy', ['di','dí','dy','dý']],
          ['dědova _lna', 'dí', ['di','dí','dy','dý']],
          ['větší po_l', 'dí', ['di','dí','dy','dý']],
          ['už umí cho_t', 'di', ['di','dí','dy','dý']],
          ['hraje v _vadle', 'di', ['di','dí','dy','dý']],
          ['dva scho_', 'dy', ['di','dí','dy','dý']],
          ['u_chaný kluk', 'dý', ['di','dí','dy','dý']],
          ['umělecké _lo', 'dí', ['di','dí','dy','dý']],
          ['pozorný _vák', 'di', ['di','dí','dy','dý']],
          ['plné su_', 'dy', ['di','dí','dy','dý']],
          ['nezablou_me', 'dí', ['di','dí','dy','dý']],
          ['silné klá_', 'dy', ['di','dí','dy','dý']],
          ['moji ro_če', 'di', ['di','dí','dy','dý']]
        ]
      },
      {
        title: '2. etapa (doplň i/í – y/ý)',
        words: [
          ['milá d_vka', 'í', ['i','í','y','ý']],
          ['oba obchod_', 'y', ['i','í','y','ý']],
          ['veselé příhod_', 'y', ['i','í','y','ý']],
          ['nejezd_m sem', 'í', ['i','í','y','ý']],
          ['d_vný sen', 'i', ['i','í','y','ý']],
          ['vysoké chůd_', 'y', ['i','í','y','ý']],
          ['to mi vad_', 'í', ['i','í','y','ý']],
          ['d_mka', 'ý', ['i','í','y','ý']],
          ['ned_vím se', 'i', ['i','í','y','ý']],
          ['nosní d_rka', 'í', ['i','í','y','ý']],
          ['rychlé jízd_', 'y', ['i','í','y','ý']],
          ['posad_ se', 'í', ['i','í','y','ý']],
          ['d_voká řeka', 'i', ['i','í','y','ý']],
          ['do vod_', 'y', ['i','í','y','ý']],
          ['hod_ny', 'i', ['i','í','y','ý']],
          ['šed_ holub', 'ý', ['i','í','y','ý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'titi-tyty-14', title: 'ti/tí – ty/tý (str. 14)', emoji: '🐯',
    description: '2 etapy (16+13) — ti/tí/ty/tý a i/í–y/ý mix',
    _stages: [
      {
        title: '1. etapa (doplň ti/tí – ty/tý)',
        words: [
          ['náš ta_nek', 'tí', ['ti','tí','ty','tý']],
          ['velká _ha', 'tí', ['ti','tí','ty','tý']],
          ['kožené bo_', 'ty', ['ti','tí','ty','tý']],
          ['malý O_k', 'tí', ['ti','tí','ty','tý']],
          ['hejno labu_', 'tí', ['ti','tí','ty','tý']],
          ['hladový _gr', 'ty', ['ti','tí','ty','tý']],
          ['s_ská se mi', 'tý', ['ti','tí','ty','tý']],
          ['našlapuje _še', 'ti', ['ti','tí','ty','tý']],
          ['šus_ papíry', 'tí', ['ti','tí','ty','tý']],
          ['vrá_me se', 'tí', ['ti','tí','ty','tý']],
          ['_káme si', 'ty', ['ti','tí','ty','tý']],
          ['u te_', 'ty', ['ti','tí','ty','tý']],
          ['minulý _den', 'tý', ['ti','tí','ty','tý']],
          ['mle_ mák', 'tý', ['ti','tí','ty','tý']],
          ['mo_čka', 'ty', ['ti','tí','ty','tý']],
          ['_síc let', 'ti', ['ti','tí','ty','tý']]
        ]
      },
      {
        title: '2. etapa (doplň i/í – y/ý)',
        words: [
          ['t_kadla', 'y', ['i','í','y','ý']],
          ['po cest_čce', 'i', ['i','í','y','ý']],
          ['bylo t_cho', 'i', ['i','í','y','ý']],
          ['let_ště', 'i', ['i','í','y','ý']],
          ['jednou t_dně', 'ý', ['i','í','y','ý']],
          ['bílé t_lko', 'í', ['i','í','y','ý']],
          ['t_ché kroky', 'i', ['i','í','y','ý']],
          ['modrý mot_l', 'ý', ['i','í','y','ý']],
          ['hust_ krém', 'ý', ['i','í','y','ý']],
          ['ut_kají pryč', 'í', ['i','í','y','ý']],
          ['malé záplat_', 'y', ['i','í','y','ý']],
          ['plat_ pokutu', 'í', ['i','í','y','ý']],
          ['cít_ vůni', 'í', ['i','í','y','ý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'nini-nyny-15', title: 'ni/ní – ny/ný (str. 15)', emoji: '🐰',
    description: '2 etapy (16+16) — ni/ní/ny/ný a i/í–y/ý mix',
    _stages: [
      {
        title: '1. etapa (doplň ni/ní – ny/ný)',
        words: [
          ['malá A_čka', 'ni', ['ni','ní','ny','ný']],
          ['vrá_ krákají', 'ny', ['ni','ní','ny','ný']],
          ['sněhová vá_ce', 'ni', ['ni','ní','ny','ný']],
          ['troje novi_', 'ny', ['ni','ní','ny','ný']],
          ['do hlí_', 'ny', ['ni','ní','ny','ný']],
          ['na sil_ci', 'ni', ['ni','ní','ny','ný']],
          ['krás_ dům', 'ný', ['ni','ní','ny','ný']],
          ['malý ko_k', 'ní', ['ni','ní','ny','ný']],
          ['hlasité rá_', 'ny', ['ni','ní','ny','ný']],
          ['už zvo_', 'ní', ['ni','ní','ny','ný']],
          ['postavené sta_', 'ny', ['ni','ní','ny','ný']],
          ['let_ ráno', 'ní', ['ni','ní','ny','ný']],
          ['prázdni_', 'ny', ['ni','ní','ny','ný']],
          ['malá k_žka', 'ní', ['ni','ní','ny','ný']],
          ['želez_ plot', 'ný', ['ni','ní','ny','ný']],
          ['na sa_ch', 'ni', ['ni','ní','ny','ný']]
        ]
      },
      {
        title: '2. etapa (doplň i/í – y/ý)',
        words: [
          ['sn_daně', 'í', ['i','í','y','ý']],
          ['uličn_k', 'í', ['i','í','y','ý']],
          ['zralé malin_', 'y', ['i','í','y','ý']],
          ['nočn_ klid', 'í', ['i','í','y','ý']],
          ['jin_ druh', 'ý', ['i','í','y','ý']],
          ['plné bedn_', 'y', ['i','í','y','ý']],
          ['roln_čky', 'i', ['i','í','y','ý']],
          ['oba džbán_', 'y', ['i','í','y','ý']],
          ['n_zký plot', 'í', ['i','í','y','ý']],
          ['tažn_ pták', 'ý', ['i','í','y','ý']],
          ['ledn_ce', 'i', ['i','í','y','ý']],
          ['pes kn_rač', 'í', ['i','í','y','ý']],
          ['bicí hodin_', 'y', ['i','í','y','ý']],
          ['huben_ kluk', 'ý', ['i','í','y','ý']],
          ['sklen_ce', 'i', ['i','í','y','ý']],
          ['dvě vteřin_', 'y', ['i','í','y','ý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'ii-yy-16', title: 'i/í – y/ý opakování (str. 16)', emoji: '⭐',
    description: '2 etapy po 15 — souhrnné opakování i/í–y/ý',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['úzk_m oknem', 'ý', ['i','í','y','ý']],
          ['sousedn_ dům', 'í', ['i','í','y','ý']],
          ['vonic_ květ', 'í', ['i','í','y','ý']],
          ['dřevěn_ plot', 'ý', ['i','í','y','ý']],
          ['do r_bníka', 'y', ['i','í','y','ý']],
          ['je š_kovná', 'i', ['i','í','y','ý']],
          ['proh_bá se', 'ý', ['i','í','y','ý']],
          ['v př_rodě', 'í', ['i','í','y','ý']],
          ['do klubovn_', 'y', ['i','í','y','ý']],
          ['zlat_ prsten', 'ý', ['i','í','y','ý']],
          ['lušt_ křížovku', 'í', ['i','í','y','ý']],
          ['č_perný kluk', 'i', ['i','í','y','ý']],
          ['se zelen_nou', 'i', ['i','í','y','ý']],
          ['dobré salát_', 'y', ['i','í','y','ý']],
          ['ř_ká pravdu', 'í', ['i','í','y','ý']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['ostruž_ny', 'i', ['i','í','y','ý']],
          ['ner_muje se', 'ý', ['i','í','y','ý']],
          ['zaž_t nudu', 'í', ['i','í','y','ý']],
          ['bled_ měsíc', 'ý', ['i','í','y','ý']],
          ['dva bod_', 'y', ['i','í','y','ý']],
          ['malí kon_ci', 'í', ['i','í','y','ý']],
          ['bílé pruh_', 'y', ['i','í','y','ý']],
          ['š_kmá věž', 'i', ['i','í','y','ý']],
          ['na hlad_ně', 'i', ['i','í','y','ý']],
          ['nech_til nic', 'y', ['i','í','y','ý']],
          ['tad_ prší', 'y', ['i','í','y','ý']],
          ['vylézaj_ ven', 'í', ['i','í','y','ý']],
          ['č_há na myš', 'í', ['i','í','y','ý']],
          ['píše j_nak', 'i', ['i','í','y','ý']],
          ['mladš_ žáci', 'í', ['i','í','y','ý']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'iy-phrases', title: 'i/í – y/ý (str. 17)', emoji: '🐱',
    description: '3 etapy po 15 — celkem 45 spojení',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['bez pot_ží', 'í', ['i','í','y','ý']],
          ['plach_ srnec', 'ý', ['i','í','y','ý']],
          ['je uř_cená', 'í', ['i','í','y','ý']],
          ['č_stí boty', 'i', ['i','í','y','ý']],
          ['umí š_t', 'í', ['i','í','y','ý']],
          ['hlubok_ důl', 'ý', ['i','í','y','ý']],
          ['je nejch_třejší', 'y', ['i','í','y','ý']],
          ['r_tířský', 'y', ['i','í','y','ý']],
          ['něco vyhod_l', 'i', ['i','í','y','ý']],
          ['je v prác_', 'i', ['i','í','y','ý']],
          ['do brad_', 'y', ['i','í','y','ý']],
          ['čtvrt_ žák', 'ý', ['i','í','y','ý']],
          ['tkan_čky', 'i', ['i','í','y','ý']],
          ['malý zaj_ček', 'í', ['i','í','y','ý']],
          ['bez zelenin_', 'y', ['i','í','y','ý']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['na pobřež_', 'í', ['i','í','y','ý']],
          ['pavouč_ síť', 'í', ['i','í','y','ý']],
          ['za Jiř_kem', 'í', ['i','í','y','ý']],
          ['málo vláh_', 'y', ['i','í','y','ý']],
          ['do c_le', 'í', ['i','í','y','ý']],
          ['hr_že mrkev', 'y', ['i','í','y','ý']],
          ['pěkn_ den', 'ý', ['i','í','y','ý']],
          ['buď zt_cha', 'i', ['i','í','y','ý']],
          ['byl vyn_kající', 'i', ['i','í','y','ý']],
          ['zach_til mě', 'y', ['i','í','y','ý']],
          ['ostrá d_ka', 'ý', ['i','í','y','ý']],
          ['pod_vej se', 'í', ['i','í','y','ý']],
          ['v baž_nách', 'i', ['i','í','y','ý']],
          ['nejdelš_ lano', 'í', ['i','í','y','ý']],
          ['nová žák_ně', 'y', ['i','í','y','ý']]
        ]
      },
      {
        title: '3. etapa',
        words: [
          ['mot_lí let', 'ý', ['i','í','y','ý']],
          ['kraj_c chleba', 'í', ['i','í','y','ý']],
          ['nen_ tady', 'í', ['i','í','y','ý']],
          ['osel zah_kal', 'ý', ['i','í','y','ý']],
          ['ut_ká ven', 'í', ['i','í','y','ý']],
          ['je to c_zinec', 'i', ['i','í','y','ý']],
          ['ž_tné pole', 'i', ['i','í','y','ý']],
          ['zazář_l', 'i', ['i','í','y','ý']],
          ['umí poč_tat', 'í', ['i','í','y','ý']],
          ['tich_ pláč', 'ý', ['i','í','y','ý']],
          ['hladk_ ubrus', 'ý', ['i','í','y','ý']],
          ['had_ syčí', 'i', ['i','í','y','ý']],
          ['v úter_', 'ý', ['i','í','y','ý']],
          ['dlouhé klád_', 'y', ['i','í','y','ý']],
          ['bílé šat_', 'y', ['i','í','y','ý']]
        ]
      }
    ],
    // Pro Mix-all sbírání — všech 45 spojení dohromady
    get words() {
      return this._stages.flatMap(s => s.words);
    }
  },
  {
    id: 'lowup-phrases', title: 'malé / velké (str. 18)', emoji: '🔠',
    description: '3 etapy (19+18+18) — velká písmena ve jménech',
    _stages: [
      {
        title: '1. etapa',
        words: [
          // koťátko mourek
          ['_oťátko mourek', 'k', ['k','K']],
          ['koťátko _ourek', 'm', ['m','M']],
          // sestra je u Kláry
          ['_estra je u Kláry', 's', ['s','S']],
          ['sestra je u _láry', 'K', ['k','K']],
          // z Brna do Zlína
          ['z _rna do Zlína', 'B', ['b','B']],
          ['z Brna do _lína', 'Z', ['z','Z']],
          // v nedalekém městě
          ['v nedalekém _ěstě', 'm', ['m','M']],
          // pes umí plavat
          ['_es umí plavat', 'p', ['p','P']],
          // Tereza nebo Honza
          ['_ereza nebo Honza', 'T', ['t','T']],
          ['Tereza nebo _onza', 'H', ['h','H']],
          // Rex vrčí na kočky
          ['_ex vrčí na kočky', 'R', ['r','R']],
          ['Rex vrčí na _očky', 'k', ['k','K']],
          // malíř Josef Lada
          ['_alíř Josef Lada', 'm', ['m','M']],
          ['malíř _osef Lada', 'J', ['j','J']],
          ['malíř Josef _ada', 'L', ['l','L']],
          // Iva má neštovice
          ['_va má neštovice', 'I', ['i','I']],
          ['Iva má _eštovice', 'n', ['n','N']],
          // pan Kučera
          ['_an Kučera', 'p', ['p','P']],
          ['pan _učera', 'K', ['k','K']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          // Božena Němcová
          ['_ožena Němcová', 'B', ['b','B']],
          ['Božena _ěmcová', 'N', ['n','N']],
          // papoušek v kleci
          ['_apoušek v kleci', 'p', ['p','P']],
          ['papoušek v _leci', 'k', ['k','K']],
          // cesta do vesnice
          ['_esta do vesnice', 'c', ['c','C']],
          ['cesta do _esnice', 'v', ['v','V']],
          // růže pro babičku
          ['_ůže pro babičku', 'r', ['r','R']],
          ['růže pro _abičku', 'b', ['b','B']],
          // babička Marta
          ['_abička Marta', 'b', ['b','B']],
          ['babička _arta', 'M', ['m','M']],
          // Bára bydlí v Praze
          ['_ára bydlí v Praze', 'B', ['b','B']],
          ['Bára bydlí v _raze', 'P', ['p','P']],
          // krtek na louce
          ['_rtek na louce', 'k', ['k','K']],
          ['krtek na _ouce', 'l', ['l','L']],
          // učitelka Vlasta
          ['_čitelka Vlasta', 'u', ['u','U']],
          ['učitelka _lasta', 'V', ['v','V']],
          // Petr Suchánek
          ['_etr Suchánek', 'P', ['p','P']],
          ['Petr _uchánek', 'S', ['s','S']]
        ]
      },
      {
        title: '3. etapa',
        words: [
          // hudební skladatel
          ['_udební skladatel', 'h', ['h','H']],
          ['hudební _kladatel', 's', ['s','S']],
          // Antonín Dvořák
          ['_ntonín Dvořák', 'A', ['a','A']],
          ['Antonín _vořák', 'D', ['d','D']],
          // tygr je šelma
          ['_ygr je šelma', 't', ['t','T']],
          ['tygr je _elma', 'š', ['š','Š']],
          // maminka a tatínek
          ['_aminka a tatínek', 'm', ['m','M']],
          ['maminka a _atínek', 't', ['t','T']],
          // morče Ferdík
          ['_orče Ferdík', 'm', ['m','M']],
          ['morče _erdík', 'F', ['f','F']],
          // vesnice Loukov
          ['_esnice Loukov', 'v', ['v','V']],
          ['vesnice _oukov', 'L', ['l','L']],
          // Dan hraje fotbal
          ['_an hraje fotbal', 'D', ['d','D']],
          ['Dan hraje _otbal', 'f', ['f','F']],
          // Šemík byl kůň
          ['_emík byl kůň', 'Š', ['š','Š']],
          ['Šemík byl _ůň', 'k', ['k','K']],
          // dárek pro Filipa
          ['_árek pro Filipa', 'd', ['d','D']],
          ['dárek pro _ilipa', 'F', ['f','F']]
        ]
      }
    ],
    get words() {
      return this._stages.flatMap(s => s.words);
    }
  },
  {
    id: 'detene-19', title: 'dě – tě – ně (str. 19)', emoji: '🐈',
    description: '2 etapy po 15 — měkčení po d, t, n',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['náš _da', 'dě', ['dě','tě','ně']],
          ['už je poz_', 'dě', ['dě','tě','ně']],
          ['piš pěk_', 'ně', ['dě','tě','ně']],
          ['urči_ přijde', 'tě', ['dě','tě','ně']],
          ['_lá chyby', 'dě', ['dě','tě','ně']],
          ['zdravé dí_', 'tě', ['dě','tě','ně']],
          ['_co vymyslí', 'ně', ['dě','tě','ně']],
          ['začalo s_žit', 'ně', ['dě','tě','ně']],
          ['je na zahra_', 'dě', ['dě','tě','ně']],
          ['milá _včata', 'dě', ['dě','tě','ně']],
          ['boha_ zdobený', 'tě', ['dě','tě','ně']],
          ['vypadá div_', 'ně', ['dě','tě','ně']],
          ['_lesná výchova', 'tě', ['dě','tě','ně']],
          ['školní kuchy_', 'ně', ['dě','tě','ně']],
          ['sladké _sto', 'tě', ['dě','tě','ně']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['v této továr_', 'ně', ['dě','tě','ně']],
          ['do _locvičny', 'tě', ['dě','tě','ně']],
          ['na žluté květi_', 'ně', ['dě','tě','ně']],
          ['hodné _ti', 'dě', ['dě','tě','ně']],
          ['malé slů_', 'ně', ['dě','tě','ně']],
          ['se_la v křesle', 'dě', ['dě','tě','ně']],
          ['Š_drý den', 'tě', ['dě','tě','ně']],
          ['zpívá hlasi_', 'tě', ['dě','tě','ně']],
          ['mluví ustara_', 'ně', ['dě','tě','ně']],
          ['_šili se', 'tě', ['dě','tě','ně']],
          ['se Š_pánkem', 'tě', ['dě','tě','ně']],
          ['tváří se šťast_', 'ně', ['dě','tě','ně']],
          ['tenká s_na', 'tě', ['dě','tě','ně']],
          ['byl vy_šený', 'dě', ['dě','tě','ně']],
          ['nic nes_dli', 'ně', ['dě','tě','ně']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'detene-20', title: 'dě – tě – ně (str. 20)', emoji: '🐅',
    description: '2 etapy po 16 — měkčení po d, t, n (pokračování)',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['chová se stateč_', 'ně', ['dě','tě','ně']],
          ['zavr_la hlavou', 'tě', ['dě','tě','ně']],
          ['po_koval mi', 'dě', ['dě','tě','ně']],
          ['vypadá spokoje_', 'ně', ['dě','tě','ně']],
          ['_žký kufr', 'tě', ['dě','tě','ně']],
          ['kyselé viš_', 'ně', ['dě','tě','ně']],
          ['mluv hlasi_ji', 'tě', ['dě','tě','ně']],
          ['vánoční an_líček', 'dě', ['dě','tě','ně']],
          ['pil_ se učí', 'ně', ['dě','tě','ně']],
          ['nic nevě_la', 'dě', ['dě','tě','ně']],
          ['s Voj_chem', 'tě', ['dě','tě','ně']],
          ['za _dečkem', 'dě', ['dě','tě','ně']],
          ['je na poš_', 'tě', ['dě','tě','ně']],
          ['krás_ zpívá', 'ně', ['dě','tě','ně']],
          ['nese_li tam', 'dě', ['dě','tě','ně']],
          ['mluví hlasi_', 'tě', ['dě','tě','ně']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['červené třeš_', 'ně', ['dě','tě','ně']],
          ['ko_ přede', 'tě', ['dě','tě','ně']],
          ['u_lala stojku', 'dě', ['dě','tě','ně']],
          ['sedí na drá_', 'tě', ['dě','tě','ně']],
          ['_ravý kabát', 'dě', ['dě','tě','ně']],
          ['dobrá sníd_', 'ně', ['dě','tě','ně']],
          ['le_li letadlem', 'tě', ['dě','tě','ně']],
          ['je v poho_', 'dě', ['dě','tě','ně']],
          ['první s_ženky', 'ně', ['dě','tě','ně']],
          ['jít k vo_', 'dě', ['dě','tě','ně']],
          ['urči_ přijdu', 'tě', ['dě','tě','ně']],
          ['je v kůl_', 'ně', ['dě','tě','ně']],
          ['pestrá zás_ra', 'tě', ['dě','tě','ně']],
          ['teď s_ží', 'tě', ['dě','tě','ně']],
          ['u_šoval je', 'tě', ['dě','tě','ně']],
          ['s_dli oběd', 'ně', ['dě','tě','ně']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'bpvm-phrases-21', title: 'bě/pě/vě/mě (str. 21)', emoji: '🦊',
    description: '2 etapy po 16 — celkem 32 spojení',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['leží na slá_', 'mě', ['bě','pě','vě','mě']],
          ['suchá _tev', 'vě', ['bě','pě','vě','mě']],
          ['ještě neo_dvali', 'bě', ['bě','pě','vě','mě']],
          ['_stuje mrkev', 'pě', ['bě','pě','vě','mě']],
          ['nes_la cvičit', 'mě', ['bě','pě','vě','mě']],
          ['s_chala ven', 'pě', ['bě','pě','vě','mě']],
          ['boule na hla_', 'vě', ['bě','pě','vě','mě']],
          ['zářivý _síc', 'mě', ['bě','pě','vě','mě']],
          ['veselé pří_hy', 'bě', ['bě','pě','vě','mě']],
          ['vysoké _že', 'vě', ['bě','pě','vě','mě']],
          ['dobrá pa_ť', 'mě', ['bě','pě','vě','mě']],
          ['K_tuška', 'vě', ['bě','pě','vě','mě']],
          ['_kně čte', 'pě', ['bě','pě','vě','mě']],
          ['koláč v trou_', 'bě', ['bě','pě','vě','mě']],
          ['visí na _šáku', 'vě', ['bě','pě','vě','mě']],
          ['šlápl na hrá_', 'bě', ['bě','pě','vě','mě']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['ne_jte strach', 'mě', ['bě','pě','vě','mě']],
          ['pestré _jíře', 'vě', ['bě','pě','vě','mě']],
          ['je nej_knější', 'pě', ['bě','pě','vě','mě']],
          ['prá_ odjel', 'vě', ['bě','pě','vě','mě']],
          ['o_ ruce', 'bě', ['bě','pě','vě','mě']],
          ['dos_lý člověk', 'pě', ['bě','pě','vě','mě']],
          ['velká z_na', 'mě', ['bě','pě','vě','mě']],
          ['d_ děvčata', 'vě', ['bě','pě','vě','mě']],
          ['_lásek létá', 'bě', ['bě','pě','vě','mě']],
          ['_tikoruna', 'pě', ['bě','pě','vě','mě']],
          ['neu_la plavat', 'mě', ['bě','pě','vě','mě']],
          ['ve vysoké trá_', 'vě', ['bě','pě','vě','mě']],
          ['jezevčí dou_', 'pě', ['bě','pě','vě','mě']],
          ['bílá _na', 'pě', ['bě','pě','vě','mě']],
          ['plést _neček', 'vě', ['bě','pě','vě','mě']],
          ['sněhové zá_je', 'vě', ['bě','pě','vě','mě']]
        ]
      }
    ],
    get words() {
      return this._stages.flatMap(s => s.words);
    }
  },
  {
    id: 'bpvm-phrases-22', title: 'bě/pě/vě/mě (str. 22)', emoji: '🦔',
    description: '2 etapy po 14 — celkem 28 spojení',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['úzká _šina', 'pě', ['bě','pě','vě','mě']],
          ['ukliď si _ci', 'vě', ['bě','pě','vě','mě']],
          ['naše Alž_ta', 'bě', ['bě','pě','vě','mě']],
          ['klisna a hří_', 'bě', ['bě','pě','vě','mě']],
          ['pro člo_ka', 'vě', ['bě','pě','vě','mě']],
          ['růžové pou_', 'pě', ['bě','pě','vě','mě']],
          ['pták _nkava', 'pě', ['bě','pě','vě','mě']],
          ['ze_dělec', 'mě', ['bě','pě','vě','mě']],
          ['ch_je se', 'vě', ['bě','pě','vě','mě']],
          ['umí to zpa_ti', 'mě', ['bě','pě','vě','mě']],
          ['lední med_di', 'vě', ['bě','pě','vě','mě']],
          ['rychle _hat', 'bě', ['bě','pě','vě','mě']],
          ['na ná_stí', 'mě', ['bě','pě','vě','mě']],
          ['tomu ne_řím', 'vě', ['bě','pě','vě','mě']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['pořád se s_je', 'mě', ['bě','pě','vě','mě']],
          ['po_děl mi to', 'vě', ['bě','pě','vě','mě']],
          ['Brno je _sto', 'mě', ['bě','pě','vě','mě']],
          ['od_hl z hřiště', 'bě', ['bě','pě','vě','mě']],
          ['_trník se točí', 'vě', ['bě','pě','vě','mě']],
          ['zalézá do ze_', 'mě', ['bě','pě','vě','mě']],
          ['dostal _tku', 'pě', ['bě','pě','vě','mě']],
          ['_lostný sníh', 'bě', ['bě','pě','vě','mě']],
          ['s_tlá barva', 'vě', ['bě','pě','vě','mě']],
          ['ve skle_', 'pě', ['bě','pě','vě','mě']],
          ['za_stnanec', 'mě', ['bě','pě','vě','mě']],
          ['roz_hl se', 'bě', ['bě','pě','vě','mě']],
          ['na celém s_tě', 'vě', ['bě','pě','vě','mě']],
          ['nes_chej tak', 'pě', ['bě','pě','vě','mě']]
        ]
      }
    ],
    get words() {
      return this._stages.flatMap(s => s.words);
    }
  },
  {
    id: 'bp-23', title: 'b – p (str. 23)', emoji: '🐢',
    description: '2 etapy po 16 — párové b/p',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['košík hu_', 'b', ['b','p']],
          ['vysoký slou_', 'p', ['b','p']],
          ['škralou_', 'p', ['b','p']],
          ['šedý holu_', 'b', ['b','p']],
          ['strom du_', 'b', ['b','p']],
          ['bílý stro_', 'p', ['b','p']],
          ['zatru_ víc', 'b', ['b','p']],
          ['golfový klu_', 'b', ['b','p']],
          ['Jaku_', 'b', ['b','p']],
          ['tělo je tru_', 'p', ['b','p']],
          ['Fili_', 'p', ['b','p']],
          ['splněný sli_', 'b', ['b','p']],
          ['pět ža_', 'b', ['b','p']],
          ['udělej výko_', 'p', ['b','p']],
          ['cizí chla_', 'p', ['b','p']],
          ['lov ry_', 'b', ['b','p']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['Proko_', 'p', ['b','p']],
          ['nejí kečo_', 'p', ['b','p']],
          ['zástu_ lidí', 'p', ['b','p']],
          ['několik stave_', 'b', ['b','p']],
          ['přístu_ blíž', 'p', ['b','p']],
          ['do dvou nádo_', 'b', ['b','p']],
          ['pod oka_', 'p', ['b','p']],
          ['pravý hři_', 'b', ['b','p']],
          ['málo chy_', 'b', ['b','p']],
          ['bolavý zu_', 'b', ['b','p']],
          ['vlhký skle_', 'p', ['b','p']],
          ['nechlu_ se', 'b', ['b','p']],
          ['vodní příko_', 'p', ['b','p']],
          ['jedl chlé_', 'b', ['b','p']],
          ['čá_ létá', 'p', ['b','p']],
          ['řekla vti_', 'p', ['b','p']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'dt-24', title: 'd – t (str. 24)', emoji: '🐊',
    description: '2 etapy po 16 — párové d/t',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['náš souse_', 'd', ['d','t']],
          ['z rajča_', 't', ['d','t']],
          ['dobrý nápa_', 'd', ['d','t']],
          ['po_ oknem', 'd', ['d','t']],
          ['ovocný dor_', 't', ['d','t']],
          ['na loke_', 't', ['d','t']],
          ['vysoký mos_', 't', ['d','t']],
          ['velký hla_', 'd', ['d','t']],
          ['zelený salá_', 't', ['d','t']],
          ['úplný kli_', 'd', ['d','t']],
          ['starý hra_', 'd', ['d','t']],
          ['několik ces_', 't', ['d','t']],
          ['špatný odha_', 'd', ['d','t']],
          ['pět lvíča_', 't', ['d','t']],
          ['sladký me_', 'd', ['d','t']],
          ['rá_ lyžuje', 'd', ['d','t']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['bez deba_', 't', ['d','t']],
          ['višňový sa_', 'd', ['d','t']],
          ['le_ na řece', 'd', ['d','t']],
          ['můj kamará_', 'd', ['d','t']],
          ['u našich vra_', 't', ['d','t']],
          ['těžký nákla_', 'd', ['d','t']],
          ['tvůj kabá_', 't', ['d','t']],
          ['zápa_ slunce', 'd', ['d','t']],
          ['krásný výhle_', 'd', ['d','t']],
          ['lehký příkla_', 'd', ['d','t']],
          ['bílý kvě_', 't', ['d','t']],
          ['měděný drá_', 't', ['d','t']],
          ['tetin recep_', 't', ['d','t']],
          ['listopa_', 'd', ['d','t']],
          ['jím špená_', 't', ['d','t']],
          ['špatný žer_', 't', ['d','t']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'dt-soft-25', title: 'ď – ť (str. 25)', emoji: '🦫',
    description: '2 etapy po 16 — párové ď/ť',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['pohla_ psa', 'ď', ['ď','ť']],
          ['suchá pouš_', 'ť', ['ď','ť']],
          ['nákladní lo_', 'ď', ['ď','ť']],
          ['dlouhá tra_', 'ť', ['ď','ť']],
          ['vra_ se', 'ť', ['ď','ť']],
          ['dobrá pamě_', 'ť', ['ď','ť']],
          ['bílá labu_', 'ť', ['ď','ť']],
          ['zaho_ to', 'ď', ['ď','ť']],
          ['ho_ mu míč', 'ď', ['ď','ť']],
          ['pose_ chvíli', 'ď', ['ď','ť']],
          ['červená peče_', 'ť', ['ď','ť']],
          ['dívčí ple_', 'ť', ['ď','ť']],
          ['mívá závra_', 'ť', ['ď','ť']],
          ['tvoje odpově_', 'ď', ['ď','ť']],
          ['pět ohniš_', 'ť', ['ď','ť']],
          ['nebu_ smutný', 'ď', ['ď','ť']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['u všech hříš_', 'ť', ['ď','ť']],
          ['rukoje_ nože', 'ť', ['ď','ť']],
          ['neprobu_ ho', 'ď', ['ď','ť']],
          ['nechu_ k jídlu', 'ť', ['ď','ť']],
          ['necho_ tam', 'ď', ['ď','ť']],
          ['celerová na_', 'ť', ['ď','ť']],
          ['na Radhoš_', 'ť', ['ď','ť']],
          ['naho_ udici', 'ď', ['ď','ť']],
          ['posvi_ mi', 'ť', ['ď','ť']],
          ['sí_ na ryby', 'ť', ['ď','ť']],
          ['poj_ sem', 'ď', ['ď','ť']],
          ['probu_ se', 'ď', ['ď','ť']],
          ['zame_ smetí', 'ť', ['ď','ť']],
          ['nízká ze_', 'ď', ['ď','ť']],
          ['světlý pláš_', 'ť', ['ď','ť']],
          ['letní déš_', 'ť', ['ď','ť']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'hch-phrases', title: 'h / ch (str. 26)', emoji: '🐺',
    description: '3 etapy (15+15+14) — celkem 44 spojení',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['velký stra_', 'ch', ['h','ch']],
          ['hodný ho_', 'ch', ['h','ch']],
          ['Vojtě_', 'ch', ['h','ch']],
          ['nízký bře_', 'h', ['h','ch']],
          ['lískový oře_', 'ch', ['h','ch']],
          ['malý pstru_', 'h', ['h','ch']],
          ['veselý smí_', 'ch', ['h','ch']],
          ['velký úspě_', 'ch', ['h','ch']],
          ['padal sní_', 'h', ['h','ch']],
          ['dobrý či_', 'ch', ['h','ch']],
          ['ro_ pokoje', 'h', ['h','ch']],
          ['Jindři_', 'ch', ['h','ch']],
          ['levný nocle_', 'h', ['h','ch']],
          ['cvičí postře_', 'h', ['h','ch']],
          ['měkký tvaro_', 'h', ['h','ch']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['velký dlu_', 'h', ['h','ch']],
          ['rozvr_ hodin', 'h', ['h','ch']],
          ['železný plu_', 'h', ['h','ch']],
          ['živoči_', 'ch', ['h','ch']],
          ['pra_ na polici', 'ch', ['h','ch']],
          ['prá_ u domu', 'h', ['h','ch']],
          ['do Če_', 'ch', ['h','ch']],
          ['vr_ koulí', 'h', ['h','ch']],
          ['kluzký povr_', 'ch', ['h','ch']],
          ['hluboký náde_', 'ch', ['h','ch']],
          ['nový výta_', 'h', ['h','ch']],
          ['prudký sva_', 'h', ['h','ch']],
          ['čistý vzdu_', 'ch', ['h','ch']],
          ['šest mu_', 'ch', ['h','ch']],
          ['rychlý bě_', 'h', ['h','ch']]
        ]
      },
      {
        title: '3. etapa',
        words: [
          ['jeli na ji_', 'h', ['h','ch']],
          ['několik kni_', 'h', ['h','ch']],
          ['tvůj návr_', 'h', ['h','ch']],
          ['bez poru_', 'ch', ['h','ch']],
          ['pět spr_', 'ch', ['h','ch']],
          ['hebký me_', 'ch', ['h','ch']],
          ['výbě_ slonů', 'h', ['h','ch']],
          ['kreslí kru_', 'h', ['h','ch']],
          ['úzký pru_', 'h', ['h','ch']],
          ['zralý hrá_', 'ch', ['h','ch']],
          ['srnčí paro_', 'h', ['h','ch']],
          ['pes Voře_', 'ch', ['h','ch']],
          ['planý popla_', 'ch', ['h','ch']],
          ['veletr_', 'h', ['h','ch']]
        ]
      }
    ],
    get words() {
      return this._stages.flatMap(s => s.words);
    }
  },
  {
    id: 'vf-phrases', title: 'v / f (str. 27)', emoji: '🐈',
    description: '3 etapy (15+15+14) — celkem 44 spojení',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['Václa_', 'v', ['v','f']],
          ['Jose_', 'f', ['v','f']],
          ['tenká věte_', 'v', ['v','f']],
          ['hou_ kuřat', 'f', ['v','f']],
          ['do kopři_', 'v', ['v','f']],
          ['hraje gol_', 'f', ['v','f']],
          ['jíme mrke_', 'v', ['v','f']],
          ['pozdra_ ho', 'v', ['v','f']],
          ['Jarosla_', 'v', ['v','f']],
          ['málo bare_', 'v', ['v','f']],
          ['hrozný ře_', 'v', ['v','f']],
          ['Ladisla_', 'v', ['v','f']],
          ['na venko_', 'v', ['v','f']],
          ['lo_ zvěře', 'v', ['v','f']],
          ['Benešo_', 'v', ['v','f']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['šé_ banky', 'f', ['v','f']],
          ['pustý ostro_', 'v', ['v','f']],
          ['rudá kre_', 'v', ['v','f']],
          ['náš domo_', 'v', ['v','f']],
          ['pár kra_', 'v', ['v','f']],
          ['hezký zpě_', 'v', ['v','f']],
          ['její úsmě_', 'v', ['v','f']],
          ['Rudol_', 'f', ['v','f']],
          ['bez podko_', 'v', ['v','f']],
          ['pracovní odě_', 'v', ['v','f']],
          ['pět vrste_', 'v', ['v','f']],
          ['mladý le_', 'v', ['v','f']],
          ['eso je trum_', 'f', ['v','f']],
          ['na hřbito_', 'v', ['v','f']],
          ['pár slo_', 'v', ['v','f']]
        ]
      },
      {
        title: '3. etapa',
        words: [
          ['výlo_ rybníka', 'v', ['v','f']],
          ['Mirosla_', 'v', ['v','f']],
          ['fotogra_', 'f', ['v','f']],
          ['plná láhe_', 'v', ['v','f']],
          ['nová kone_', 'v', ['v','f']],
          ['minigol_', 'f', ['v','f']],
          ['čistý chlé_', 'v', ['v','f']],
          ['velký hně_', 'v', ['v','f']],
          ['koropte_', 'v', ['v','f']],
          ['Kryšto_', 'f', ['v','f']],
          ['ruká_ košile', 'v', ['v','f']],
          ['zlato je ko_', 'v', ['v','f']],
          ['celý náze_', 'v', ['v','f']],
          ['Stanisla_', 'v', ['v','f']]
        ]
      }
    ],
    get words() {
      return this._stages.flatMap(s => s.words);
    }
  },
  {
    id: 'zs-phrases', title: 'z / s (str. 28)', emoji: '🐅',
    description: '3 etapy (15+15+14) — celkem 44 spojení',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['tuhý mrá_', 'z', ['z','s']],
          ['tenký vla_', 's', ['z','s']],
          ['zarostlá me_', 'z', ['z','s']],
          ['nápi_ na zdi', 's', ['z','s']],
          ['přísný záka_', 'z', ['z','s']],
          ['můj průka_', 'z', ['z','s']],
          ['oteklý no_', 's', ['z','s']],
          ['nemám ča_', 's', ['z','s']],
          ['silný prova_', 'z', ['z','s']],
          ['liščí oca_', 's', ['z','s']],
          ['slabý hla_', 's', ['z','s']],
          ['hraje teni_', 's', ['z','s']],
          ['ove_ je obilí', 's', ['z','s']],
          ['prudký nára_', 'z', ['z','s']],
          ['přive_ nákup', 'z', ['z','s']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['tvůj podpi_', 's', ['z','s']],
          ['nový časopi_', 's', ['z','s']],
          ['ku_ cesty', 's', ['z','s']],
          ['vosa je hmy_', 'z', ['z','s']],
          ['lehký úra_', 'z', ['z','s']],
          ['zápi_ do školy', 's', ['z','s']],
          ['starý paře_', 'z', ['z','s']],
          ['hluboký le_', 's', ['z','s']],
          ['vysoká hrá_', 'z', ['z','s']],
          ['pevný řetě_', 'z', ['z','s']],
          ['černý obry_', 's', ['z','s']],
          ['krásný obra_', 'z', ['z','s']],
          ['rychlý vů_', 'z', ['z','s']],
          ['plus a mínu_', 's', ['z','s']],
          ['nový vynále_', 'z', ['z','s']]
        ]
      },
      {
        title: '3. etapa',
        words: [
          ['dělá rámu_', 's', ['z','s']],
          ['málo peně_', 'z', ['z','s']],
          ['odvo_ odpadků', 'z', ['z','s']],
          ['cestovní pa_', 's', ['z','s']],
          ['nele_ tam', 'z', ['z','s']],
          ['město Brandý_', 's', ['z','s']],
          ['rytmu_', 's', ['z','s']],
          ['jeden poku_', 's', ['z','s']],
          ['silniční provo_', 'z', ['z','s']],
          ['Francou_', 'z', ['z','s']],
          ['je_ na řece', 'z', ['z','s']],
          ['be_ omluvy', 'z', ['z','s']],
          ['autobu_', 's', ['z','s']],
          ['šimpan_', 'z', ['z','s']]
        ]
      }
    ],
    get words() {
      return this._stages.flatMap(s => s.words);
    }
  },
  {
    id: 'zs-soft-29', title: 'ž – š (str. 29)', emoji: '🦔',
    description: '2 etapy po 16 — párové ž/š',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['velká kalu_', 'ž', ['ž','š']],
          ['polo_ to', 'ž', ['ž','š']],
          ['Tomá_', 'š', ['ž','š']],
          ['bě_ ven', 'ž', ['ž','š']],
          ['vaří gulá_', 'š', ['ž','š']],
          ['soutě_ v běhu', 'ž', ['ž','š']],
          ['proutěný ko_', 'š', ['ž','š']],
          ['uka_ mi to', 'ž', ['ž','š']],
          ['Lubo_', 'š', ['ž','š']],
          ['dr_ se', 'ž', ['ž','š']],
          ['hradní strá_', 'ž', ['ž','š']],
          ['pi_ pěkně', 'š', ['ž','š']],
          ['naře_ dříví', 'ž', ['ž','š']],
          ['do Krkono_', 'š', ['ž','š']],
          ['vysoká vě_', 'ž', ['ž','š']],
          ['ostrý nů_', 'ž', ['ž','š']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['le_ klidně', 'ž', ['ž','š']],
          ['stříbrný gro_', 'š', ['ž','š']],
          ['vyře_ úlohu', 'š', ['ž','š']],
          ['cizí mu_', 'ž', ['ž','š']],
          ['na Dobří_', 'š', ['ž','š']],
          ['průtr_ mračen', 'ž', ['ž','š']],
          ['písečná plá_', 'ž', ['ž','š']],
          ['masá_ zad', 'ž', ['ž','š']],
          ['Krakono_', 'š', ['ž','š']],
          ['montá_ skříní', 'ž', ['ž','š']],
          ['lhaní je le_', 'ž', ['ž','š']],
          ['Ale_', 'š', ['ž','š']],
          ['kuře je drůbe_', 'ž', ['ž','š']],
          ['jeden ver_', 'š', ['ž','š']],
          ['Mikulá_', 'š', ['ž','š']],
          ['dřevěný kří_', 'ž', ['ž','š']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'opakovani-30', title: 'Opakování (str. 30)', emoji: '🌈',
    description: '2 etapy po 15 — souhrnné opakování pravopisu',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['le_ je šelma', 'v', ['v','f']],
          ['zach_til se', 'y', ['y','ý']],
          ['na siln_ci', 'i', ['i','í']],
          ['splněný sli_', 'b', ['b','p']],
          ['dobrý gulá_', 'š', ['ž','š']],
          ['uč_ se létat', 'í', ['i','í']],
          ['pevný řetě_', 'z', ['z','s']],
          ['v úter_', 'ý', ['y','ý']],
          ['strmý sva_', 'h', ['h','ch']],
          ['naše rod_na', 'i', ['i','í','y','ý']],
          ['zaho_ to', 'ď', ['ď','ť']],
          ['kř_vá čára', 'i', ['i','í']],
          ['tich_ hovor', 'ý', ['y','ý']],
          ['poh_buje se', 'y', ['y','ý']],
          ['ulož_m to', 'í', ['i','í']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['sladk_ dort', 'ý', ['y','ý']],
          ['zame_ smetí', 'ť', ['ď','ť']],
          ['pět kluk_', 'ů', ['ú','ů']],
          ['tající le_', 'd', ['d','t']],
          ['hodiny t_kají', 'i', ['i','í','y','ý']],
          ['vysoká vě_', 'ž', ['ž','š']],
          ['siln_ slon', 'ý', ['y','ý']],
          ['udělej dře_', 'p', ['b','p']],
          ['malý mot_lek', 'ý', ['y','ý']],
          ['měděný drá_', 't', ['d','t']],
          ['ž_to je obilí', 'i', ['i','í']],
          ['měsíc _nor', 'ú', ['ú','ů']],
          ['je ud_chaná', 'ý', ['y','ý']],
          ['Zlín je _sto', 'mě', ['mě','me']],
          ['hod_ štěstí', 'ně', ['dě','tě','ně']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'opakovani-31', title: 'Opakování (str. 31)', emoji: '🎨',
    description: '2 etapy po 15 — souhrnné opakování pravopisu',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['voda nehoř_', 'í', ['i','í']],
          ['rovné čár_', 'y', ['y','ý']],
          ['ostrý nů_', 'ž', ['ž','š']],
          ['ut_kají pryč', 'í', ['i','í']],
          ['veselý smí_', 'ch', ['h','ch']],
          ['nákladní lo_', 'ď', ['ď','ť']],
          ['zadn_ nohy', 'í', ['i','í']],
          ['láhe_ mléka', 'v', ['v','f']],
          ['dřevěný plo_', 't', ['d','t']],
          ['dvě strun_', 'y', ['y','ý']],
          ['starý paře_', 'z', ['z','s']],
          ['už běž_me', 'í', ['i','í']],
          ['Jose_', 'f', ['v','f']],
          ['málo vod_', 'y', ['y','ý']],
          ['čerstvý sní_', 'h', ['h','ch']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['vzbud_m ho', 'í', ['i','í']],
          ['naře_ dřevo', 'ž', ['ž','š']],
          ['k_selá okurka', 'y', ['y','ý']],
          ['borová k_ra', 'ů', ['ú','ů']],
          ['vysoký slou_', 'p', ['b','p']],
          ['kráj_ chleba', 'í', ['i','í']],
          ['nejí _stoviny', 'tě', ['tě','te']],
          ['koč_čky', 'i', ['i','í']],
          ['plach_ pták', 'ý', ['y','ý']],
          ['dost peně_', 'z', ['z','s']],
          ['hustý déš_', 'ť', ['ď','ť']],
          ['prou_ vody', 'd', ['d','t']],
          ['zlo_j krade', 'dě', ['dě','tě','ně']],
          ['_síc na nebi', 'mě', ['mě','me']],
          ['píše pečli_', 'vě', ['vě','ve']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'opakovani-32', title: 'Opakování (str. 32)', emoji: '🎁',
    description: '2 etapy po 15 — souhrnné opakování pravopisu',
    _stages: [
      {
        title: '1. etapa',
        words: [
          ['pták let_', 'í', ['i','í']],
          ['sladká mrke_', 'v', ['v','f']],
          ['děláš ch_bu', 'y', ['y','ý']],
          ['kalu_ vody', 'ž', ['ž','š']],
          ['bled_ měsíc', 'ý', ['y','ý']],
          ['je š_kovná', 'i', ['i','í']],
          ['ukr_tý poklad', 'y', ['y','ý']],
          ['jedovatý ha_', 'd', ['d','t']],
          ['z_stal doma', 'ů', ['ú','ů']],
          ['mrkvový salá_', 't', ['d','t']],
          ['do jesk_ně', 'y', ['y','ý']],
          ['hou_ ptáků', 'f', ['v','f']],
          ['sladký hrá_', 'ch', ['h','ch']],
          ['pták kolibř_k', 'í', ['i','í']],
          ['masá_ zad', 'ž', ['ž','š']]
        ]
      },
      {
        title: '2. etapa',
        words: [
          ['mám r_mu', 'ý', ['y','ý']],
          ['uř_cený kluk', 'í', ['i','í']],
          ['do kož_chu', 'i', ['i','í']],
          ['dlouhý pláš_', 'ť', ['ď','ť']],
          ['pěkn_ výlet', 'ý', ['y','ý']],
          ['uče_ si vlasy', 'š', ['ž','š']],
          ['rychlý bě_', 'h', ['h','ch']],
          ['č_sté boty', 'i', ['i','í']],
          ['t_den', 'ý', ['y','ý']],
          ['Fili_', 'p', ['b','p']],
          ['chutn_ oběd', 'ý', ['y','ý']],
          ['listnatý le_', 's', ['z','s']],
          ['hlad_ kočku', 'í', ['i','í']],
          ['velký _spěch', 'ú', ['ú','ů']],
          ['košík hu_', 'b', ['b','p']]
        ]
      }
    ],
    get words() { return this._stages.flatMap(s => s.words); }
  },
  {
    id: 'mix-all', title: 'Mix — všechno', emoji: '🎲',
    description: 'Náhodný mix ze všech kategorií', _isMix: true, words: []
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

