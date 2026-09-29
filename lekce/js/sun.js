// ═══════════════════════════════════════════════════════════════════════════
// sun.js — průvodkyně SUN
//
// SUN vystupuje jako laskavá, trpělivá starší kamarádka. Není to učitelka,
// maskot ani nadšený robot. Mluví česky, krátce a konkrétně, bez tlaku na
// rychlost.
//
// Jméno SUN se čte česky: „Sun“ — ne anglicky jako slunce.
//
// Chválí hlavně to, co má dítě pod kontrolou: soustředění, postup, snahu,
// opravení chyby, požádání o pomoc, vytrvalost a zlepšení oproti minule.
// Nikdy neříká „To je špatně“, „To neumíš“ ani „Tohle už bys měla umět“.
// ═══════════════════════════════════════════════════════════════════════════

const SUN = {
  JMENO: 'SUN',

  // Formulace, které se ve zpětné vazbě nesmějí objevit. Kontroluje je test —
  // aby se sem omylem nedostaly při pozdějších úpravách.
  ZAKAZANE: [
    'to je špatně',
    'to neumíš',
    'zase jsi udělala chybu',
    'nedávala jsi pozor',
    'tohle už bys měla umět',
    'špatně',
    'chybně',
    'neumíš',
    'nedávej',
    'měla bys umět',
    'zase chyba',
  ],

  _vyber(pole) {
    return pole[Math.floor(Math.random() * pole.length)];
  },

  // ─── Začátek lekce ───────────────────────────────────────────────────────

  pozdrav(jmeno, cisloLekce) {
    if (!cisloLekce || cisloLekce === 1) {
      return `Ahoj ${jmeno}, tady SUN! Dneska se poznáme. Budeme spolu číst, objevovat, psát a počítat. Nikam nespěcháme.`;
    }
    return this._vyber([
      `Ahoj ${jmeno}, tady SUN! Něco jsem ti přinesla. Budeme číst, psát a počítat — a dá se dneska nasbírat až 10 hvězdiček.`,
      `Ahoj ${jmeno}! Jsem ráda, že jsi tady. Připravila jsem čtení, psaní a příklady.`,
      `Ahoj ${jmeno}, tady SUN. Vezmeme to popořadě a klidně, jako vždycky.`,
    ]);
  },

  otazkaNaEnergii() {
    return 'Jak se dnes cítíš?';
  },

  MOZNOSTI_ENERGIE: [
    { klic: 'hodne', text: 'Mám hodně energie', emoji: '⚡' },
    { klic: 'pohoda', text: 'Jsem v pohodě', emoji: '🙂' },
    { klic: 'unavena', text: 'Jsem trochu unavená', emoji: '😴' },
  ],

  reakceNaEnergii(klic) {
    switch (klic) {
      case 'hodne':
        return 'Tak to si dneska přidáme něco navíc, ať se máš do čeho zakousnout.';
      case 'unavena':
        return 'Díky, že jsi mi to řekla. Uděláme to dneska kratší a víc si toho vysvětlíme spolu.';
      default:
        return 'Dobře. Půjdeme na to normálním tempem.';
    }
  },

  // ─── Uvedení jednotlivých misí ───────────────────────────────────────────

  uvodCteni(nadpis) {
    return this._vyber([
      `Začneme čtením. Dnešní text se jmenuje „${nadpis}“. Čti si vlastním tempem.`,
      `První je na řadě čtení. Přinesla jsem text „${nadpis}“. Klidně nahlas, jak ti to vyhovuje.`,
    ]);
  },

  uvodOtazek() {
    return 'Teď se tě zeptám na pět věcí z textu. Zeptám se vždycky jen na jednu, ať to není najednou moc.';
  },

  uvodPsani() {
    return 'Přišel čas na psaní. Bude to krátké — jde o to napsat vlastní myšlenku, ne o množství.';
  },

  uvodMatiky(pocet) {
    return `A teď počítání. Připravila jsem ${pocet} úloh a půjdeme po třech, ať se dá vydechnout.`;
  },

  uvodDetektiva() {
    return 'Ještě rychlá hra. Ukážu ti dvě podobná slova a ty vybereš to, které do věty patří.';
  },

  // ─── Reakce na odpověď v matematice ──────────────────────────────────────

  spravneMatika(serie, bezNapovedy) {
    if (serie >= 5) {
      return this._vyber([
        'Pátá správně za sebou. Jde ti to dneska pěkně.',
        'Tohle už je řada! Držíš pozornost.',
      ]);
    }
    if (serie >= 3) {
      return this._vyber(['Třetí správně po sobě.', 'Jde ti to. Pokračujeme.']);
    }
    if (bezNapovedy) {
      return this._vyber([
        'Přesně tak.',
        'Správně.',
        'Ano, přesně.',
        'To sedí.',
      ]);
    }
    return this._vyber([
      'Správně — a to je hlavní, že jsi to dopočítala.',
      'Ano. Nápověda je od toho, aby se používala.',
    ]);
  },

  chybaMatika(typChyby) {
    if (typChyby && Matika.POPIS_CHYBY[typChyby]) {
      return Matika.POPIS_CHYBY[typChyby];
    }
    return this._vyber([
      'Tady nás čeká malá oprava. Najdeme společně místo, kde se výpočet změnil.',
      'Byla jsi blízko. Pojďme se na to podívat ještě jednou.',
      'Tohle je dobrý příklad, na kterém si můžeme ukázat nový trik.',
      'Zkusíme to spolu krok za krokem.',
    ]);
  },

  poOpraveChyby() {
    return this._vyber([
      'Opravila jsi to sama. Přesně tohle se počítá nejvíc.',
      'Teď to sedí. Oprava vlastní chyby je těžší než odpovědět napoprvé.',
      'Výborně — našla jsi to sama.',
    ]);
  },

  // Když má dítě výsledek správně, ale zdlouhavým postupem
  lepsiPostup(trik) {
    return `Výsledek máš správně. Teď si ukážeme trik, díky kterému to příště zvládneš snadněji: ${trik}`;
  },

  // Když si Ami pomáhá prsty — nikdy se to nezakazuje
  oPrstech() {
    return this._vyber([
      'Prsty nám někdy pomohou. Teď zkusíme najít rychlejší cestu v hlavě.',
      'Na prstech není nic špatného. Zkusme k tomu přidat ještě jeden způsob.',
    ]);
  },

  otazkaNaPostup() {
    return this._vyber([
      'Jak jsi na to přišla?',
      'Můžeš mi říct, jak jsi počítala?',
      'Zajímá mě tvůj postup — jak jsi to udělala?',
    ]);
  },

  // ─── Reakce na odpověď u čtení ───────────────────────────────────────────

  reakceNaOdpoved(stav, chybiVete) {
    switch (stav) {
      case Cteni.STAV.SPRAVNE_CELA_VETA:
        return this._vyber([
          'Ano, přesně tak — a hezky celou větou.',
          'Správně. A věta je celá, to se mi líbí.',
          'To sedí. Odpověděla jsi celou větou.',
        ]);

      case Cteni.STAV.SPRAVNE_NEUPLNA: {
        const co = (chybiVete || []).length ? ` Chybí ${chybiVete[0]}.` : '';
        return `Víš to správně. Teď z toho zkusíme vytvořit celou větu.${co}`;
      }

      case Cteni.STAV.CASTECNE:
        return 'Začátek máš správně. Zkus to ještě trochu rozvést — co dalšího o tom text říká?';

      case Cteni.STAV.MIMO:
        return this._vyber([
          'Zkusme se podívat do textu ještě jednou. Ukážu ti, ve kterém odstavci to je.',
          'Tahle odpověď míří jinam. Pojďme si otázku přečíst ještě jednou spolu.',
        ]);

      case Cteni.STAV.PRAZDNE:
        return 'Zatím tam nic není. Napiš klidně jen jednu větu, jak tě to napadne.';

      case Cteni.STAV.NAZOR_OK:
        return this._vyber([
          'Děkuju, že ses o to podělila.',
          'Tohle je zajímavý názor.',
          'Líbí se mi, jak nad tím přemýšlíš.',
        ]);

      case Cteni.STAV.NAZOR_KRATKY:
        return 'Rozumím. Zkusila bys mi to napsat celou větou, ať vím víc?';

      default:
        return 'Pojďme dál.';
    }
  },

  // ─── Nápovědy ────────────────────────────────────────────────────────────

  uvodNapovedy(stupen) {
    switch (stupen) {
      case 1:
        return 'Malá nápověda:';
      case 2:
        return 'Ukážu ti první krok:';
      case 3:
        return 'Podíváme se na podobný příklad:';
      default:
        return '';
    }
  },

  poPouzitiNapovedy() {
    return this._vyber([
      'Dobře, že ses zeptala. Ptát se je taky dovednost.',
      'Nápověda je tu od toho, aby pomohla.',
    ]);
  },

  // ─── Psaní ───────────────────────────────────────────────────────────────

  zpetnaVazbaPsani(hodnoceni) {
    // Pořadí je dané zadáním: co se povedlo → jedna oprava → povzbuzení
    const casti = [];
    if (hodnoceni.povedlo) casti.push(hodnoceni.povedlo);
    if (hodnoceni.oprava) casti.push(hodnoceni.oprava);
    casti.push(
      this._vyber([
        'Piš dál, jde ti to.',
        'Těším se, co napíšeš příště.',
        'Díky, že sis dala záležet.',
      ])
    );
    return casti;
  },

  fotkaNecitelna() {
    return 'Fotka se mi trochu rozmazala a nepřečtu ji. Zkusila bys ji vyfotit znovu, ideálně u okna?';
  },

  fotkaUlozena() {
    return 'Fotku mám. Uložila jsem ji, aby si ji mohl prohlédnout i táta.';
  },

  // ─── Únava a přerušení ───────────────────────────────────────────────────

  // Aplikace nesmí nutit pokračovat při únavě nebo frustraci
  nabidkaPauzy() {
    return 'Vypadá to, že už toho bylo dost. Chceš si dát pauzu a pokračovat později? Rozpracovanou lekci ti schovám.';
  },

  poPauze() {
    return 'Vítej zpátky. Pokračujeme tam, kde jsme skončily.';
  },

  konecBezDokonceni() {
    return 'To nevadí. Dnešní výhra je, že jsi to zkusila. Zítra si dáme kratší misi.';
  },


  // ═══════════════════════════════════════════════════════════════════════
  // OSOBNOST A PAMĚŤ
  //
  // Tohle je to, co dělá rozdíl mezi hlasem aplikace a kamarádkou. SUN si
  // pamatuje, co bylo minule, má vlastní názory a občas o sobě něco poví.
  // Bez toho by zbylo jen zdvořilé oznamování výsledků.
  // ═══════════════════════════════════════════════════════════════════════

  // ─── Navázání na minulou lekci ───────────────────────────────────────────
  //
  // Vrací větu, kterou SUN otevře dnešní lekci, pokud si má na co vzpomenout.
  // Když data nejsou, vrací null a nic se nevymýšlí.

  vzpominkaNaMinule(stav) {
    const minula = (stav.lekce || []).find((l) => l.dokoncena);
    if (!minula) return null;

    const dnu = this._dnuOd(minula.datum);
    const moznosti = [];

    // Delší pauza — SUN to zmíní, ale bez vyčítání
    if (dnu >= 4) {
      moznosti.push('Dlouho jsme se neviděly. Jsem ráda, že jsi tady.');
    } else if (dnu >= 2) {
      moznosti.push('Včera jsme se nesešly, tak se těším o to víc.');
    }

    // Konkrétní vzpomínka na text
    if (minula.cteni && minula.cteni.nadpis) {
      moznosti.push(`Minule jsme čtly o tom, ${this._ozvenaTextu(minula.cteni)}. Dneska mám něco jiného.`);
    }

    // Vzpomínka na to, co se povedlo
    if ((minula.opraveneChyby || 0) >= 2) {
      moznosti.push('Minule jsi opravila několik chyb sama. To si pamatuju.');
    }
    if (minula.cteni && (minula.cteni.celychVet || 0) >= 4) {
      moznosti.push('Minule ti šly celé věty. Zkusíme na to navázat.');
    }
    if ((minula.matika && minula.matika.bezNapovedy) >= 10) {
      moznosti.push('Minule jsi většinu příkladů zvládla bez nápovědy. Dneska přidám o kousek těžší.');
    }

    // Vzpomínka na to, co Ami sama napsala
    if (minula.psani && minula.psani.zpusob === 'text' && minula.psani.text) {
      const uryvek = String(minula.psani.text).trim().split(/[.!?]/)[0];
      if (uryvek && uryvek.length > 12 && uryvek.length < 70) {
        moznosti.push(`Ještě mi zněla v hlavě tvoje věta „${uryvek}.“ Díky za ni.`);
      }
    }

    if (!moznosti.length) return null;
    return this._vyber(moznosti);
  },

  _ozvenaTextu(cteni) {
    // Krátké připomenutí tématu, ne opsaný nadpis
    const podleTematu = {
      zvirata: 'jak si zvířata pomáhají',
      hudba: 'jednom muzikantovi',
      vesmir: 'vesmíru',
      predmety: 'obyčejné věci, která není obyčejná',
      profese: 'práci, o které se moc neví',
      'deti-sveta': 'holčičce z druhého konce světa',
      veda: 'něčem, co vědci teprve objevili',
      pohadka: 'drakovi a knihách',
    };
    return podleTematu[cteni.tema] || `textu „${cteni.nadpis}“`;
  },

  _dnuOd(iso) {
    if (!iso) return 99;
    const pak = new Date(iso);
    const ted = new Date();
    const a = Date.UTC(pak.getFullYear(), pak.getMonth(), pak.getDate());
    const b = Date.UTC(ted.getFullYear(), ted.getMonth(), ted.getDate());
    return Math.max(0, Math.round((b - a) / 86400000));
  },

  // ─── Co SUN na dnešním textu zaujalo ─────────────────────────────────────
  //
  // Než začne čtení, SUN řekne, proč si text vybrala. Dítě tak nečte „zadaný
  // text“, ale něco, co jí někdo přinesl.

  PROC_TENTO_TEXT: {
    vydra: 'Vybrala jsem ho, protože jsem nevěděla, že se vydry drží za ruce. Musela jsem si to přečíst dvakrát.',
    moonwalk: 'Tenhle mám ráda kvůli jedné větě na konci. Uvidíš, které myslím.',
    'mesic-stopa': 'Nad tímhle jsem dlouho přemýšlela. Nikdy mě nenapadlo, co znamená, že na Měsíci není vzduch.',
    tuzka: 'Tenhle mě zaskočil. Držela jsem tužku tisíckrát a tohle jsem nevěděla.',
    shakira: 'Přinesla jsem ho, protože se v něm někdo spletl — a naštěstí ho nikdo neposlechl.',
    'vcely-tanec': 'Tenhle je o tanci, ale ne o takovém, jaký si představíš.',
    'lavina-pes': 'Tohle je o práci, kterou bych chtěla umět. Uvidíš, jestli ty taky.',
    'bruno-mars': 'Tady se mi líbí, jak se z nevýhody stala výhoda.',
    'aisha-mongolsko': 'Tenhle je o holčičce, které je asi jako tobě. Bydlí ale úplně jinak.',
    'strom-mluvi': 'Když jsem tohle čtla poprvé, šla jsem se pak podívat na les jinak.',
    'draci-knihovna': 'Tenhle je vymyšlený. Ale konec je podle mě pravdivý.',
    majak: 'Tohle je o někom, kdo dělal práci, kterou nikdo neviděl. Poslední věta mi zůstala v hlavě.',
  },

  procTentoText(textId) {
    return this.PROC_TENTO_TEXT[textId] || null;
  },

  // ─── Vlastní postřehy ────────────────────────────────────────────────────
  //
  // Občas — ne vždy — SUN po dokončení něčeho prohodí vlastní poznámku.
  // Střídmě: kdyby to dělala pořád, začne to znít jako povídavý automat.

  POSTREHY_PO_CTENI: [
    'Mě u tohohle textu vždycky napadne, kolik věcí kolem sebe nevíme.',
    'Někdy si u čtení musím větu přečíst dvakrát. Není to nic špatného.',
    'Nejlepší jsou texty, po kterých se člověk na něco podívá jinak.',
  ],

  POSTREHY_PO_MATICE: [
    'Mně nejdřív taky nešly příklady přes desítku. Pomohlo mi představit si tu krabičku na deset.',
    'Počítání je jako všechno ostatní — nejde o rychlost, ale o to, že to jde.',
    'Když nevím, rozdělím si to na menší kousky. Většinou to zabere.',
  ],

  // Vrací postřeh jen občas, aby to nezevšednělo
  obcasnyPostreh(kde) {
    if (Math.random() > 0.32) return null;
    const zdroj = kde === 'cteni' ? this.POSTREHY_PO_CTENI : this.POSTREHY_PO_MATICE;
    return this._vyber(zdroj);
  },

  // ─── Reakce na to, co Ami napsala ────────────────────────────────────────
  //
  // Nejde posoudit obsah bez AI, ale jde si všimnout, čeho si všimne člověk:
  // délky, otazníku, vykřičníku, toho, že tam někoho oslovila.

  vsimniSiPsani(text) {
    const t = String(text || '');
    const slov = t.trim().split(/\s+/).filter(Boolean).length;

    if (/\?/.test(t)) return 'Všimla jsem si, že jsi tam dala otázku. To mě potěšilo — sama se ptám pořád.';
    if (/!/.test(t)) return 'Ten vykřičník jsem si přečetla nahlas.';
    if (slov >= 40) return 'Tohle je dlouhé psaní. Musela jsi tomu dát čas.';
    if (/protože|proto/i.test(t)) return 'Napsala jsi, proč to tak je. To je na psaní nejtěžší část.';
    if (/myslím|podle mě/i.test(t)) return 'Máš tam vlastní názor. Toho si vážím.';
    return null;
  },

  // ─── Rozloučení ──────────────────────────────────────────────────────────

  rozlouceni(jmeno, dokoncena) {
    if (!dokoncena) {
      return this._vyber([
        `Tak zítra, ${jmeno}. Odpočiň si.`,
        `Nech to být, ${jmeno}. Zítra to půjde lehčeji.`,
      ]);
    }
    return this._vyber([
      `Měj se, ${jmeno}. Zítra ti přinesu něco nového.`,
      `Tak zítra, ${jmeno}. Už vím, co ti přinesu.`,
      `Díky za dnešek, ${jmeno}. Bylo to se mnou fajn.`,
    ]);
  },

  // ─── Co dnes čeká (na domovské obrazovce) ────────────────────────────────

  coDnesCeka(stav) {
    const pocet = (stav.lekce || []).filter((l) => l.dokoncena).length;
    if (pocet === 0) {
      return 'Poprvé se poznáme. Bude to klidné — jen zjistíme, kde začneme.';
    }
    return this._vyber([
      'Mám pro tebe nový text, pár otázek, kousek psaní a počítání.',
      'Připravila jsem čtení, psaní a příklady. Nikam nespěcháme.',
      'Dneska zase něco objevíme. A pak si započítáme.',
    ]);
  },

  // ─── Kontrola tónu ───────────────────────────────────────────────────────
  //
  // Bezpečnostní pojistka: než se cokoli ukáže dítěti, projde tímhle filtrem.
  // Kdyby se do textů někdy dostala zakázaná formulace, tohle ji zachytí.

  jeVPoradku(text) {
    const t = String(text || '').toLowerCase();
    return !this.ZAKAZANE.some((z) => t.includes(z));
  },

  bezpecne(text) {
    if (this.jeVPoradku(text)) return text;
    return 'Tady nás čeká malá oprava. Pojďme se na to podívat spolu.';
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = { SUN };
