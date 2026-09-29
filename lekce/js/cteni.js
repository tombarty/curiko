// ═══════════════════════════════════════════════════════════════════════════
// cteni.js — vyhodnocení odpovědí na otázky k textu
//
// Bez AI se nedá posoudit smysl věty. Dá se ale spolehlivě poznat:
//   • jestli odpověď obsahuje to, na co se ptáme (klíčová slova),
//   • jestli je to celá věta (velké písmeno, sloveso, tečka),
//   • jestli není prázdná nebo příliš krátká.
//
// Podle toho se rozliší stavy ze zadání — od „správně a celou větou“ až po
// „vypadá to, že jsi odpověděla na něco jiného“. SUN pak reaguje konkrétně
// místo obecného „špatně“.
//
// Až se zapne AI, stačí vyměnit funkci vyhodnot() — zbytek zůstane.
// ═══════════════════════════════════════════════════════════════════════════

const Cteni = {
  // ─── Stavy odpovědi ──────────────────────────────────────────────────────
  STAV: {
    SPRAVNE_CELA_VETA: 'spravne-cela-veta',
    SPRAVNE_NEUPLNA: 'spravne-neuplna',
    CASTECNE: 'castecne',
    MIMO: 'mimo',
    PRAZDNE: 'prazdne',
    NAZOR_OK: 'nazor-ok',
    NAZOR_KRATKY: 'nazor-kratky',
  },

  // ─── Pomocné ─────────────────────────────────────────────────────────────

  // Pro porovnávání srovná text na malá písmena a sjednotí mezery.
  // Diakritiku schválně nechává — v češtině nese význam.
  normalizuj(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  },

  // Varianta bez diakritiky pro případ, že Ami píše na klávesnici bez háčků
  bezDiakritiky(text) {
    return this.normalizuj(text)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  },

  slova(text) {
    return this.normalizuj(text).split(/[\s,.!?;:„“"()]+/).filter(Boolean);
  },

  // Velmi hrubý odhad, jestli věta obsahuje sloveso. Nehledá se dokonalost —
  // jde jen o to odlišit "Kolumbie" od "Shakira se narodila v Kolumbii."
  maSloveso(text) {
    const s = this.slova(text);
    if (s.length >= 4) return true; // delší odpověď skoro jistě sloveso má

    const KONCOVKY = [
      'la', 'lo', 'li', 'ly', 'l', 'je', 'jsou', 'byl', 'bylo', 'byla',
      'ala', 'ila', 'ela', 'uje', 'ují', 'ají', 'ejí', 'í', 'á', 'ě',
      'me', 'te', 'ou', 'ají', 'se',
    ];
    const CASTA_SLOVESA = [
      'je', 'jsou', 'má', 'mají', 'byl', 'byla', 'bylo', 'byli', 'bydlí',
      'dělá', 'umí', 'chodí', 'tančí', 'zpívá', 'létá', 'plave', 'hledá',
      'znamená', 'používá', 'posílá', 'potřebuje', 'nemůže', 'může', 'musí',
    ];

    return s.some(
      (w) => CASTA_SLOVESA.includes(w) || KONCOVKY.some((k) => w.length > 3 && w.endsWith(k))
    );
  },

  // Celá věta = velké písmeno na začátku, dost slov a sloveso
  jeCelaVeta(text) {
    const orig = String(text || '').trim();
    if (!orig) return false;
    const s = this.slova(orig);
    if (s.length < 3) return false;
    const prvni = orig[0];
    const velke = prvni === prvni.toUpperCase() && prvni !== prvni.toLowerCase();
    return velke && this.maSloveso(orig);
  },

  // Co konkrétně větě chybí — SUN to pak umí pojmenovat
  coChybiVete(text) {
    const orig = String(text || '').trim();
    const chybi = [];
    if (!orig) return ['prázdné'];
    const s = this.slova(orig);
    const prvni = orig[0];
    if (!(prvni === prvni.toUpperCase() && prvni !== prvni.toLowerCase())) {
      chybi.push('velké písmeno na začátku');
    }
    if (s.length < 3) chybi.push('víc slov');
    else if (!this.maSloveso(orig)) chybi.push('sloveso');
    if (!/[.!?]$/.test(orig)) chybi.push('tečka na konci');
    return chybi;
  },

  // ─── Hlavní vyhodnocení ──────────────────────────────────────────────────

  vyhodnot(otazka, odpoved) {
    const cista = String(odpoved || '').trim();

    if (!cista || this.slova(cista).length === 0) {
      return { stav: this.STAV.PRAZDNE, klicova: [], celaVeta: false, chybiVete: ['prázdné'] };
    }

    const celaVeta = this.jeCelaVeta(cista);
    const chybiVete = this.coChybiVete(cista);

    // Názorová otázka — správnost neposuzujeme, jen že Ami opravdu odpověděla
    if (otazka.typ === 'nazor') {
      const dost = this.slova(cista).length >= 4;
      return {
        stav: dost && celaVeta ? this.STAV.NAZOR_OK : this.STAV.NAZOR_KRATKY,
        klicova: [],
        celaVeta,
        chybiVete,
      };
    }

    // Kolik klíčových slov odpověď trefila
    const text = this.normalizuj(cista);
    const textBez = this.bezDiakritiky(cista);
    const nalezena = (otazka.klicova || []).filter((k) => {
      const kn = this.normalizuj(k);
      return text.includes(kn) || textBez.includes(this.bezDiakritiky(k));
    });

    const trefila = nalezena.length > 0;

    // Odpověď, která nic netrefila a je hodně krátká, bývá „nerozumím otázce“
    if (!trefila) {
      return {
        stav: this.STAV.MIMO,
        klicova: [],
        celaVeta,
        chybiVete,
        kratka: this.slova(cista).length <= 2,
      };
    }

    // Trefila část, ale odpověď je jednoslovná — obsah uznáme, větu doladíme
    if (!celaVeta) {
      return { stav: this.STAV.SPRAVNE_NEUPLNA, klicova: nalezena, celaVeta: false, chybiVete };
    }

    // U otázek na vysvětlení chceme víc než holé zopakování jednoho slova
    if (
      (otazka.typ === 'vlastnimi-slovy' || otazka.typ === 'proc-jak') &&
      this.slova(cista).length < 5
    ) {
      return { stav: this.STAV.CASTECNE, klicova: nalezena, celaVeta: true, chybiVete };
    }

    return { stav: this.STAV.SPRAVNE_CELA_VETA, klicova: nalezena, celaVeta: true, chybiVete };
  },

  // Kolik z pěti otázek se povedlo — pro hvězdičky a čtenářskou úroveň
  spocitejUspech(vysledky) {
    return vysledky.filter(
      (v) =>
        v.stav === this.STAV.SPRAVNE_CELA_VETA ||
        v.stav === this.STAV.SPRAVNE_NEUPLNA ||
        v.stav === this.STAV.NAZOR_OK
    ).length;
  },

  pocetCelychVet(vysledky) {
    return vysledky.filter((v) => v.celaVeta).length;
  },

  // ─── Slovní detektiv ─────────────────────────────────────────────────────

  // Kolik dvojic zařadit — řídí se nastavením a tím, jestli Ami plete písmena
  pocetDetektiva(nastaveni, pokrok) {
    const rezim = (nastaveni && nastaveni.slovniDetektivCasto) || 'obcas';
    if (rezim === 'nikdy') return 0;
    if (rezim === 'casto') return 5;

    // „Občas“ — zařadí se, když má Ami se záměnou písmen potíže
    const z = pokrok && pokrok['zamena-pismen'];
    if (z && z.jistota < 0.6) return 4;
    return Math.random() < 0.5 ? 3 : 0;
  },

  vyhodnotDetektiva(polozka, odpoved) {
    return this.normalizuj(odpoved) === this.normalizuj(polozka.spravne);
  },

  // ─── Obtížná slova ───────────────────────────────────────────────────────

  // Najde v textu pozice obtížných slov, aby šla ve výpisu zvýraznit
  najdiTezkaSlova(text, tezkaSlova) {
    return (tezkaSlova || []).map((s) => ({
      ...s,
      jeVTextu: this.normalizuj(text).includes(this.normalizuj(s.slovo)),
    }));
  },

  // ─── Souhrn čtenářské mise pro uložení do lekce ──────────────────────────

  souhrn(text, vysledky, pomoc) {
    const spravnych = this.spocitejUspech(vysledky);
    return {
      textId: text.id,
      nadpis: text.nadpis,
      uroven: text.uroven,
      tema: text.tema,
      pocetSlov: Texty.pocetSlov(text.text),
      dokonceno: true,
      spravnychOtazek: spravnych,
      celychVet: this.pocetCelychVet(vysledky),
      napovedy: (pomoc && pomoc.napovedy) || 0,
      prehranaSlova: (pomoc && pomoc.prehranaSlova) || [],
      opakovaneRadky: (pomoc && pomoc.opakovaneRadky) || 0,
      tezkaSlova: (pomoc && pomoc.tezkaSlovaOznacena) || [],
      odpor: !!(pomoc && pomoc.odpor),
      odpovedi: vysledky.map((v, i) => ({
        otazka: text.otazky[i] ? text.otazky[i].otazka : '',
        typ: text.otazky[i] ? text.otazky[i].typ : '',
        text: v.text || '',
        stav: v.stav,
        celaVeta: v.celaVeta,
      })),
    };
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = { Cteni };
