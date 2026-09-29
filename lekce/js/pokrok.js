// ═══════════════════════════════════════════════════════════════════════════
// pokrok.js — sledování dovedností a adaptivní obtížnost
//
// Pro každou dovednost (zvlášť čtenářskou i matematickou) se drží záznam:
// kolikrát ji Ami zkoušela, jak často uspěla bez nápovědy, kdy naposledy,
// jak jde vývoj posledních pokusů a jak jistě ji zvládá.
//
// Obtížnost se zvyšuje jen tehdy, když Ami uspěje opakovaně a bez velké
// nápovědy. Když se výkon zhorší, obtížnost tiše klesne — dítě se o tom
// nedozví, žádné „vrácení na nižší úroveň“.
// ═══════════════════════════════════════════════════════════════════════════

const Pokrok = {
  MAX_UROVEN: 3,
  DELKA_TRENDU: 8, // kolik posledních pokusů se pamatuje

  prazdnyZaznam() {
    return {
      uroven: 1,
      pokusy: 0,
      spravne: 0,
      bezNapovedy: 0,
      sNapovedou: 0,
      chyby: 0,
      opakovaneChyby: 0,
      posledni: null,       // ISO datum posledního procvičení
      trend: [],            // pole 1/0 podle úspěchu, nejnovější na konci
      jistota: 0,           // 0–1, jak jistě dovednost zvládá
      posledniByloSpatne: false,
    };
  },

  zaznam(pokrok, dovednost) {
    if (!pokrok[dovednost]) pokrok[dovednost] = this.prazdnyZaznam();
    return pokrok[dovednost];
  },

  // ─── Zápis výsledku ──────────────────────────────────────────────────────

  zaznamenej(pokrok, dovednost, vysledek) {
    const z = this.zaznam(pokrok, dovednost);
    const spravne = !!vysledek.spravne;
    const stupenNapovedy = vysledek.stupenNapovedy || 0; // 0 = bez nápovědy

    z.pokusy++;
    z.posledni = new Date().toISOString();

    if (spravne) {
      z.spravne++;
      if (stupenNapovedy === 0) z.bezNapovedy++;
      else z.sNapovedou++;
      z.posledniByloSpatne = false;
    } else {
      z.chyby++;
      if (z.posledniByloSpatne) z.opakovaneChyby++;
      z.posledniByloSpatne = true;
    }

    z.trend.push(spravne ? 1 : 0);
    if (z.trend.length > this.DELKA_TRENDU) z.trend.shift();

    z.jistota = this._spoctiJistotu(z);
    this._upravUroven(z);

    return z;
  },

  // Jistota zvládnutí: váží úspěšnost bez nápovědy víc než s nápovědou
  // a bere v potaz, kolik pokusů za sebou stojí.
  _spoctiJistotu(z) {
    if (z.pokusy === 0) return 0;
    const podilBez = z.bezNapovedy / z.pokusy;
    const podilS = z.sNapovedou / z.pokusy;
    const zaklad = podilBez + podilS * 0.5;

    // Málo pokusů = menší jistota, i kdyby byly všechny správně
    const duvera = Math.min(1, z.pokusy / 6);

    // Poslední pokusy váží víc než ty dávné
    const posledni = z.trend.slice(-4);
    const cerstve = posledni.length ? posledni.reduce((a, b) => a + b, 0) / posledni.length : 0;

    return Math.max(0, Math.min(1, (zaklad * 0.5 + cerstve * 0.5) * duvera));
  },

  _upravUroven(z) {
    const posledniTri = z.trend.slice(-3);
    const posledniPet = z.trend.slice(-5);

    // Nahoru: tři správně za sebou a slušná jistota
    if (
      posledniTri.length === 3 &&
      posledniTri.every((v) => v === 1) &&
      z.jistota >= 0.6 &&
      z.uroven < this.MAX_UROVEN
    ) {
      z.uroven++;
      z.trend = []; // na nové úrovni začínáme sledovat znovu
      return;
    }

    // Dolů: z posledních pěti pokusů aspoň tři chyby
    if (posledniPet.length >= 4) {
      const chyb = posledniPet.filter((v) => v === 0).length;
      if (chyb >= 3 && z.uroven > 1) {
        z.uroven--;
        z.trend = [];
      }
    }
  },

  urovenDovednosti(pokrok, dovednost) {
    const z = pokrok && pokrok[dovednost];
    return z ? z.uroven : 1;
  },

  // ─── Výběr, co procvičovat ───────────────────────────────────────────────
  //
  // Opakování v rozestupech: čím déle se dovednost neprocvičovala a čím hůř
  // jde, tím větší šanci má, že se objeví. Ale neopakuje se každý den stejně.

  vahaProVyber(pokrok, dovednost) {
    const z = pokrok && pokrok[dovednost];
    if (!z || z.pokusy === 0) return 3; // nové dovednosti mají přednost

    let vaha = 1;

    // Slabě zvládnuté se vracejí častěji
    vaha += (1 - z.jistota) * 3;

    // Dlouho neprocvičované se vracejí
    const dnu = this._dnuOd(z.posledni);
    if (dnu >= 1) vaha += Math.min(3, dnu * 0.7);

    // Ale co bylo dnes, dnes znovu nechceme
    if (dnu === 0) vaha *= 0.35;

    // Dobře zvládnuté jen občas na připomenutí
    if (z.jistota > 0.85 && dnu < 4) vaha *= 0.3;

    return Math.max(0.05, vaha);
  },

  _dnuOd(iso) {
    if (!iso) return 99;
    const pak = new Date(iso);
    const ted = new Date();
    const denPak = Date.UTC(pak.getFullYear(), pak.getMonth(), pak.getDate());
    const denTed = Date.UTC(ted.getFullYear(), ted.getMonth(), ted.getDate());
    return Math.max(0, Math.round((denTed - denPak) / 86400000));
  },

  // ─── Oblasti (pro vyvážení matematické mise) ─────────────────────────────

  OBLASTI_MATIKY: ['scitani', 'odcitani', 'nasobeni', 'deleni', 'slovni'],

  prumerOblasti(pokrok, oblast) {
    const dovednosti = (typeof Matika !== 'undefined' ? Matika.DOVEDNOSTI : [])
      .filter((d) => d.oblast === oblast)
      .map((d) => d.klic);
    const zaznamy = dovednosti.map((k) => pokrok && pokrok[k]).filter((z) => z && z.pokusy > 0);
    if (!zaznamy.length) return null;
    return zaznamy.reduce((s, z) => s + z.jistota, 0) / zaznamy.length;
  },

  nejslabsiOblast(pokrok) {
    let nejhorsi = null;
    let hodnota = 2;
    for (const o of this.OBLASTI_MATIKY) {
      const p = this.prumerOblasti(pokrok, o);
      if (p !== null && p < hodnota) {
        hodnota = p;
        nejhorsi = o;
      }
    }
    return nejhorsi;
  },

  nejsilnejsiOblast(pokrok) {
    let nejlepsi = null;
    let hodnota = -1;
    for (const o of this.OBLASTI_MATIKY) {
      const p = this.prumerOblasti(pokrok, o);
      if (p !== null && p > hodnota) {
        hodnota = p;
        nejlepsi = o;
      }
    }
    return nejlepsi;
  },

  // ─── Čtenářská úroveň ────────────────────────────────────────────────────
  //
  // Zvlášť od matematiky: řídí délku textu (1 = 120–160 slov … 5 = strana A4).

  DELKY_TEXTU: {
    1: [120, 160],
    2: [160, 220],
    3: [220, 300],
    4: [300, 400],
    5: [400, 520],
  },

  ctenarskaUroven(stav) {
    return (stav.profil && stav.profil.ctenarskaUroven) || 1;
  },

  // Postoupí jen tehdy, když poslední lekce splňují všechny podmínky ze zadání
  vyhodnotCtenarskouUroven(stav) {
    const posledni = (stav.lekce || []).slice(0, 3);
    if (posledni.length < 3) return { zmena: 0, duvod: 'málo dat' };

    const vsechnyDobre = posledni.every((l) => {
      const c = l.cteni || {};
      return (
        c.dokonceno &&
        (c.spravnychOtazek || 0) >= 4 &&
        (c.napovedy || 0) <= 2 &&
        !c.odpor
      );
    });

    const uroven = this.ctenarskaUroven(stav);

    if (vsechnyDobre && uroven < 5) {
      return { zmena: 1, duvod: 'tři lekce po sobě zvládnuté' };
    }

    // Zhoršení — text zkrátíme, ale dítěti to neoznamujeme
    const slabé = posledni.filter((l) => {
      const c = l.cteni || {};
      return (c.spravnychOtazek || 0) <= 2 || (c.napovedy || 0) >= 5 || c.odpor;
    });
    if (slabé.length >= 2 && uroven > 1) {
      return { zmena: -1, duvod: 'poslední lekce byly náročné' };
    }

    return { zmena: 0, duvod: 'zatím beze změny' };
  },

  // ─── Souhrny pro rodičovský přehled ──────────────────────────────────────

  prehledDovednosti(pokrok) {
    const vysledek = [];
    for (const [klic, z] of Object.entries(pokrok || {})) {
      if (!z || !z.pokusy) continue;
      const def = (typeof Matika !== 'undefined' ? Matika.DOVEDNOSTI : []).find(
        (d) => d.klic === klic
      );
      vysledek.push({
        klic,
        nazev: def ? def.nazev : klic,
        oblast: def ? def.oblast : 'cteni',
        uroven: z.uroven,
        pokusy: z.pokusy,
        uspesnost: z.pokusy ? Math.round((z.spravne / z.pokusy) * 100) : 0,
        uspesnostBezNapovedy: z.pokusy ? Math.round((z.bezNapovedy / z.pokusy) * 100) : 0,
        jistota: Math.round(z.jistota * 100),
        posledni: z.posledni,
        trend: this._popisTrendu(z),
      });
    }
    return vysledek.sort((a, b) => a.jistota - b.jistota);
  },

  _popisTrendu(z) {
    if (z.trend.length < 4) return 'zatím málo dat';
    const prvni = z.trend.slice(0, Math.floor(z.trend.length / 2));
    const druha = z.trend.slice(Math.floor(z.trend.length / 2));
    const p = prvni.reduce((a, b) => a + b, 0) / prvni.length;
    const d = druha.reduce((a, b) => a + b, 0) / druha.length;
    if (d > p + 0.2) return 'zlepšuje se';
    if (d < p - 0.2) return 'zhoršuje se';
    return 'drží se';
  },

  // Oblasti, které potřebují pozornost — vstup do doporučení pro rodiče
  potrebujePozornost(pokrok, kolik = 3) {
    return this.prehledDovednosti(pokrok)
      .filter((d) => d.pokusy >= 3 && d.jistota < 55)
      .slice(0, kolik);
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = { Pokrok };
