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
    choices.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        if (this.processing) return;
        const isCorrect = opt === correct;
        if (isCorrect) { btn.classList.add('correct'); }
        else { btn.classList.add('wrong'); optionsDiv.querySelectorAll('.btn-option').forEach(b => { if (b.textContent === correct) b.classList.add('correct'); }); }
        wordDisplay.querySelector('.bonus-word').innerHTML = `${parts[0]}<span class="bonus-filled">${correct}</span>${parts[1]||''}`;
        this.submit(isCorrect, feedback);
      });
      optionsDiv.appendChild(btn);
    });
    area.appendChild(optionsDiv);

    this.container.appendChild(area);
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

