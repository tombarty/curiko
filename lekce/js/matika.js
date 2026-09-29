// ═══════════════════════════════════════════════════════════════════════════
// matika.js — generátor matematických úloh a nápověd
//
// Čistá logika bez zásahu do stránky: vytvoří úlohu, spočítá správný výsledek
// a připraví tři stupně nápovědy. Díky tomu jde otestovat i mimo prohlížeč.
//
// Každá úloha má tvar:
//   { dovednost, zadani, spravne, typ, volby?, napovedy[], vizualizace? }
// ═══════════════════════════════════════════════════════════════════════════

const Matika = {
  // ─── Seznam dovedností ───────────────────────────────────────────────────
  // Pořadí zhruba odpovídá obtížnosti; adaptivní logika se o něj opírá.
  DOVEDNOSTI: [
    { klic: 'doplneni-do-10', nazev: 'Doplnění do 10', oblast: 'scitani' },
    { klic: 'scitani-bez-prechodu', nazev: 'Sčítání bez přechodu', oblast: 'scitani' },
    { klic: 'scitani-pres-desitku', nazev: 'Sčítání přes desítku', oblast: 'scitani' },
    { klic: 'doplneni-do-desitky', nazev: 'Doplnění do celé desítky', oblast: 'scitani' },
    { klic: 'cele-desitky', nazev: 'Celé desítky', oblast: 'scitani' },
    { klic: 'dvojciferne-scitani', nazev: 'Dvojciferné sčítání', oblast: 'scitani' },
    { klic: 'odcitani-bez-prechodu', nazev: 'Odčítání bez přechodu', oblast: 'odcitani' },
    { klic: 'odcitani-pres-desitku', nazev: 'Odčítání přes desítku', oblast: 'odcitani' },
    { klic: 'dvojciferne-odcitani', nazev: 'Dvojciferné odčítání', oblast: 'odcitani' },
    { klic: 'rozklad', nazev: 'Rozklad čísla', oblast: 'scitani' },
    { klic: 'porovnavani', nazev: 'Porovnávání čísel', oblast: 'cisla' },
    { klic: 'ciselna-osa', nazev: 'Číselná osa', oblast: 'cisla' },
    { klic: 'vztah-scitani-odcitani', nazev: 'Vztah sčítání a odčítání', oblast: 'odcitani' },
    { klic: 'nasobilka-2', nazev: 'Násobilka 2', oblast: 'nasobeni' },
    { klic: 'nasobilka-3', nazev: 'Násobilka 3', oblast: 'nasobeni' },
    { klic: 'nasobilka-4', nazev: 'Násobilka 4', oblast: 'nasobeni' },
    { klic: 'nasobilka-5', nazev: 'Násobilka 5', oblast: 'nasobeni' },
    { klic: 'nasobilka-6', nazev: 'Násobilka 6', oblast: 'nasobeni' },
    { klic: 'deleni-2', nazev: 'Dělení 2', oblast: 'deleni' },
    { klic: 'deleni-3', nazev: 'Dělení 3', oblast: 'deleni' },
    { klic: 'deleni-4', nazev: 'Dělení 4', oblast: 'deleni' },
    { klic: 'deleni-5', nazev: 'Dělení 5', oblast: 'deleni' },
    { klic: 'deleni-6', nazev: 'Dělení 6', oblast: 'deleni' },
    { klic: 'volba-operace', nazev: 'Volba operace', oblast: 'slovni' },
    { klic: 'slovni-uloha', nazev: 'Slovní úloha', oblast: 'slovni' },
    { klic: 'slovni-uloha-dvoukrokova', nazev: 'Dvoukroková slovní úloha', oblast: 'slovni' },
  ],

  // ─── Pomocné ─────────────────────────────────────────────────────────────

  nahodne(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  vyber(pole) {
    return pole[Math.floor(Math.random() * pole.length)];
  },

  zamichej(pole) {
    const kopie = pole.slice();
    for (let i = kopie.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
    }
    return kopie;
  },

  // ─── Generátory podle dovednosti ─────────────────────────────────────────

  generuj(dovednost, uroven = 1) {
    const g = this['gen_' + dovednost.replace(/-/g, '_')];
    if (!g) return this.gen_scitani_bez_prechodu(uroven);
    const uloha = g.call(this, uroven);
    uloha.dovednost = dovednost;
    uloha.uroven = uroven;
    return uloha;
  },

  // Doplnění do 10 — základ pro počítání bez prstů
  gen_doplneni_do_10() {
    const a = this.nahodne(1, 9);
    return {
      typ: 'doplneni',
      zadani: `${a} + ? = 10`,
      spravne: 10 - a,
      vizualizace: { druh: 'desitka', zaklad: a },
      napovedy: [
        'Představ si desítku jako plnou krabičku na deset vajíček.',
        `Máme ${a}. Kolik prázdných políček ještě zbývá do deseti?`,
        this._podobny(`${10 - a} + ? = 10`, a, 'Doplň do deseti.'),
      ],
    };
  },

  gen_scitani_bez_prechodu() {
    // Jednotky se nepřehoupnou přes desítku
    const desA = this.nahodne(1, 8) * 10;
    const jedA = this.nahodne(1, 5);
    const jedB = this.nahodne(1, 9 - jedA);
    const a = desA + jedA;
    const b = jedB;
    return {
      typ: 'vypocet',
      zadani: `${a} + ${b} = ?`,
      spravne: a + b,
      napovedy: [
        'Desítky zůstávají stejné — stačí přičíst jednotky.',
        `${jedA} + ${jedB} = ${jedA + jedB}. Kolik je tedy celkem?`,
        this._podobny(`${desA + 2} + 3 = ${desA + 5}`, null, 'Desítky se nemění.'),
      ],
    };
  },

  gen_scitani_pres_desitku() {
    const a = this.nahodne(6, 9);
    const b = this.nahodne(10 - a + 1, 9); // zaručí přechod přes desítku
    const doDesitky = 10 - a;
    const zbytek = b - doDesitky;
    return {
      typ: 'vypocet',
      zadani: `${a} + ${b} = ?`,
      spravne: a + b,
      vizualizace: { druh: 'prechod-nahoru', a, b, doDesitky, zbytek },
      napovedy: [
        'Zkus se nejdřív dostat na celou desítku.',
        `Z ${b} si vezmeme ${doDesitky}, aby z ${a} bylo 10. Zbyde nám ${zbytek}. Kolik je 10 + ${zbytek}?`,
        this._podobny(`8 + 5`, null, 'Z pěti si vezmeme 2 na desítku, zbyde 3, takže 10 + 3 = 13.'),
      ],
    };
  },

  gen_doplneni_do_desitky() {
    const a = this.nahodne(2, 8) * 10 + this.nahodne(1, 9);
    const cil = Math.ceil(a / 10) * 10;
    return {
      typ: 'doplneni',
      zadani: `${a} + ? = ${cil}`,
      spravne: cil - a,
      vizualizace: { druh: 'desitka', zaklad: a % 10 },
      napovedy: [
        'Stačí se podívat na jednotky — kolik chybí do deseti?',
        `${a % 10} a kolik je 10?`,
        this._podobny(`34 + ? = 40`, null, 'Ze čtyř do deseti chybí 6.'),
      ],
    };
  },

  gen_cele_desitky() {
    const a = this.nahodne(2, 6);
    const b = this.nahodne(1, 9 - a);
    return {
      typ: 'vypocet',
      zadani: `${a * 10} + ${b * 10} = ?`,
      spravne: (a + b) * 10,
      vizualizace: { druh: 'desitky', a, b },
      napovedy: [
        'Počítej po desítkách, jako bys počítal jablka.',
        `${a} desítky a ${b} desítky — kolik desítek to je dohromady?`,
        this._podobny(`40 + 30`, null, '4 desítky + 3 desítky = 7 desítek = 70.'),
      ],
    };
  },

  gen_dvojciferne_scitani() {
    const a = this.nahodne(21, 58);
    const b = this.nahodne(21, 99 - a);
    const desB = Math.floor(b / 10) * 10;
    const jedB = b % 10;
    return {
      typ: 'vypocet',
      zadani: `${a} + ${b} = ?`,
      spravne: a + b,
      vizualizace: { druh: 'rozklad-druheho', a, desB, jedB },
      napovedy: [
        'Rozděl si druhé číslo na desítky a jednotky.',
        `${a} + ${desB} = ${a + desB}. A kolik je ${a + desB} + ${jedB}?`,
        this._podobny(`36 + 27`, null, '36 + 20 = 56, potom 56 + 7 = 63.'),
      ],
    };
  },

  gen_odcitani_bez_prechodu() {
    const des = this.nahodne(2, 9) * 10;
    const jed = this.nahodne(4, 9);
    const a = des + jed;
    const b = this.nahodne(1, jed);
    return {
      typ: 'vypocet',
      zadani: `${a} − ${b} = ?`,
      spravne: a - b,
      napovedy: [
        'Desítky zůstávají — ubíráš jen z jednotek.',
        `${jed} − ${b} = ${jed - b}. Kolik je tedy celkem?`,
        this._podobny(`57 − 4 = 53`, null, 'Padesátka zůstala, ubrali jsme jen jednotky.'),
      ],
    };
  },

  gen_odcitani_pres_desitku() {
    const des = this.nahodne(2, 9) * 10;
    const jed = this.nahodne(1, 5);
    const a = des + jed;
    const b = this.nahodne(jed + 1, 9);
    const naDesitku = jed;
    const zbytek = b - jed;
    return {
      typ: 'vypocet',
      zadani: `${a} − ${b} = ?`,
      spravne: a - b,
      vizualizace: { druh: 'prechod-dolu', a, b, naDesitku, zbytek, mezikrok: des },
      napovedy: [
        'Nejdřív se dostaň dolů na celou desítku.',
        `Z ${a} odečteme ${naDesitku} a jsme na ${des}. Zbývá odečíst ${zbytek}. Kolik je ${des} − ${zbytek}?`,
        this._podobny(`52 − 8`, null, '52 − 2 = 50, zbývá odečíst 6, takže 50 − 6 = 44.'),
      ],
    };
  },

  gen_dvojciferne_odcitani() {
    const a = this.nahodne(45, 99);
    const b = this.nahodne(21, a - 10);
    const desB = Math.floor(b / 10) * 10;
    const jedB = b % 10;
    return {
      typ: 'vypocet',
      zadani: `${a} − ${b} = ?`,
      spravne: a - b,
      vizualizace: { druh: 'rozklad-druheho-minus', a, desB, jedB },
      napovedy: [
        'Rozděl si druhé číslo na desítky a jednotky.',
        `${a} − ${desB} = ${a - desB}. A kolik je ${a - desB} − ${jedB}?`,
        this._podobny(`74 − 26`, null, '74 − 20 = 54, potom 54 − 6 = 48.'),
      ],
    };
  },

  gen_rozklad() {
    const celek = this.nahodne(6, 10);
    const cast = this.nahodne(1, celek - 1);
    return {
      typ: 'doplneni',
      zadani: `${celek} = ${cast} + ?`,
      spravne: celek - cast,
      vizualizace: { druh: 'rozklad', celek, cast },
      napovedy: [
        'Celek se skládá ze dvou částí. Jednu už znáš.',
        `Z ${celek} jsme si vzali ${cast}. Kolik zbylo?`,
        this._podobny(`9 = 4 + 5`, null, 'Devět je čtyři a pět.'),
      ],
    };
  },

  gen_porovnavani() {
    const a = this.nahodne(11, 99);
    let b = this.nahodne(11, 99);
    if (b === a) b = a + this.vyber([-3, 3]);
    const spravne = a > b ? '>' : a < b ? '<' : '=';
    return {
      typ: 'volba',
      zadani: `${a} ⬜ ${b}`,
      spravne,
      volby: ['<', '>', '='],
      napovedy: [
        'Nejdřív porovnej desítky. Když jsou stejné, rozhodnou jednotky.',
        `${a} má ${Math.floor(a / 10)} desítek, ${b} má ${Math.floor(b / 10)} desítek.`,
        this._podobny(`47 < 52`, null, 'Čtyři desítky jsou méně než pět desítek.'),
      ],
    };
  },

  gen_ciselna_osa() {
    const krok = this.vyber([1, 2, 5, 10]);
    const start = this.nahodne(1, 6) * 10;
    const pozice = this.nahodne(2, 4);
    const hledane = start + krok * pozice;
    return {
      typ: 'osa',
      zadani: `Jaké číslo patří na označené místo?`,
      spravne: hledane,
      vizualizace: { druh: 'osa', start, krok, pocet: 6, pozice },
      napovedy: [
        `Čísla na ose jdou po ${krok}.`,
        `Začínáme na ${start} a přidáváme po ${krok}: ${start}, ${start + krok}, ${start + 2 * krok}…`,
        this._podobny(`10, 20, 30, …`, null, 'Přidáváme pořád stejné číslo.'),
      ],
    };
  },

  gen_vztah_scitani_odcitani() {
    const b = this.nahodne(15, 40);
    const rozdil = this.nahodne(10, 45);
    const a = b + rozdil;
    return {
      typ: 'vypocet',
      zadani: `${a} − ${b} = ?`,
      spravne: rozdil,
      vizualizace: { druh: 'dopocitani', mensi: b, vetsi: a },
      napovedy: [
        'Zkus to obráceně: kolik musíš přidat k menšímu číslu?',
        `Kolik musíme přidat k ${b}, abychom dostali ${a}?`,
        this._podobny(`63 − 27`, null, 'Ptáme se: 27 a kolik je 63?'),
      ],
    };
  },

  _nasobilka(rada) {
    const druhy = this.nahodne(1, 10);
    const naopak = Math.random() < 0.4;
    const a = naopak ? druhy : rada;
    const b = naopak ? rada : druhy;
    return {
      typ: 'vypocet',
      zadani: `${a} × ${b} = ?`,
      spravne: a * b,
      vizualizace: { druh: 'skupiny', pocetSkupin: a, vSkupine: b },
      napovedy: [
        `Násobení je opakované sčítání — ${a}krát po ${b}.`,
        `${b} + ${b} = ${2 * b}… počítej dál po ${b}, celkem ${a}krát.`,
        this._podobny(`3 × 4`, null, '4 + 4 + 4 = 12.'),
      ],
    };
  },

  gen_nasobilka_2() { return this._nasobilka(2); },
  gen_nasobilka_3() { return this._nasobilka(3); },
  gen_nasobilka_4() { return this._nasobilka(4); },
  gen_nasobilka_5() { return this._nasobilka(5); },
  gen_nasobilka_6() { return this._nasobilka(6); },

  _deleni(delitel) {
    const podil = this.nahodne(1, 10);
    const delenec = podil * delitel;
    return {
      typ: 'vypocet',
      zadani: `${delenec} : ${delitel} = ?`,
      spravne: podil,
      vizualizace: { druh: 'rozdeleni', celkem: delenec, doSkupin: delitel },
      napovedy: [
        `Ptáme se: kolikrát se ${delitel} vejde do ${delenec}?`,
        `${delitel} × ? = ${delenec}. Zkus násobilku ${delitel}.`,
        this._podobny(`12 : 3`, null, '3 × 4 = 12, takže 12 : 3 = 4.'),
      ],
    };
  },

  gen_deleni_2() { return this._deleni(2); },
  gen_deleni_3() { return this._deleni(3); },
  gen_deleni_4() { return this._deleni(4); },
  gen_deleni_5() { return this._deleni(5); },
  gen_deleni_6() { return this._deleni(6); },

  // Slovní úlohy si berou předlohu z ulohy.js a dosazují do ní čísla
  gen_volba_operace() {
    const predloha = SlovniUlohy.nahodna(['scitani', 'odcitani', 'nasobeni', 'deleni']);
    const u = SlovniUlohy.sestav(predloha);
    return {
      typ: 'volba-operace',
      zadani: u.text,
      // `spravne` je vždy výsledek výpočtu — volba operace se vyhodnocuje
      // zvlášť podle `operace`, protože je to samostatný krok úlohy.
      spravne: u.vysledek,
      operace: u.operace,
      volby: ['přidávat', 'ubírat', 'tvořit stejné skupiny', 'rozdělovat'],
      podotazky: u.podotazky,
      napovedy: [
        'Přečti si úlohu ještě jednou a všímej si, co se s věcmi děje.',
        u.napovedaOperace,
        'Když něco přibývá, přidáváme. Když ubývá, odčítáme.',
      ],
    };
  },

  gen_slovni_uloha() {
    const predloha = SlovniUlohy.nahodna(['scitani', 'odcitani', 'nasobeni', 'deleni']);
    const u = SlovniUlohy.sestav(predloha);
    return {
      typ: 'slovni',
      zadani: u.text,
      spravne: u.vysledek,
      operace: u.operace,
      podotazky: u.podotazky,
      zbytecnaInformace: u.zbytecnaInformace || null,
      napovedy: [
        'Nejdřív si řekni, co už víš a co máš zjistit.',
        u.napovedaKrok,
        u.napovedaPriklad,
      ],
    };
  },

  gen_slovni_uloha_dvoukrokova() {
    const u = SlovniUlohy.dvoukrokova();
    return {
      typ: 'slovni',
      zadani: u.text,
      spravne: u.vysledek,
      operace: u.operace,
      podotazky: u.podotazky,
      dvoukrokova: true,
      napovedy: [
        'Tahle úloha má dva kroky. Co potřebuješ zjistit jako první?',
        u.napovedaKrok,
        u.napovedaPriklad,
      ],
    };
  },

  _podobny(priklad, _a, vysvetleni) {
    return { typ: 'podobny', priklad, vysvetleni };
  },

  // ─── Sestavení sady 15 úloh ──────────────────────────────────────────────
  //
  // Výchozí složení dle zadání: 4 sčítání, 4 odčítání, 2 násobení, 2 dělení,
  // 3 slovní úlohy. Adaptivní logika složení upraví podle toho, co Ami
  // potřebuje procvičit — ale poměr oblastí zůstává vyvážený.

  VYCHOZI_SLOZENI: { scitani: 4, odcitani: 4, nasobeni: 2, deleni: 2, slovni: 3 },

  sestavSadu(pokrok, nastaveni) {
    const celkem = (nastaveni && nastaveni.pocetMatUloh) || 15;
    const slozeni = this._slozeniPodlePotreb(pokrok, celkem);
    const ulohy = [];

    for (const [oblast, pocet] of Object.entries(slozeni)) {
      for (let i = 0; i < pocet; i++) {
        const dovednost = this._vyberDovednost(oblast, pokrok, ulohy);
        const uroven = Pokrok.urovenDovednosti(pokrok, dovednost);
        ulohy.push(this.generuj(dovednost, uroven));
      }
    }

    // Úlohy chodí po třech — každá trojice smíchaná, ale oblasti prostřídané,
    // aby po sobě nešlo pět stejných příkladů za sebou.
    return this._prostridej(ulohy);
  },

  _slozeniPodlePotreb(pokrok, celkem) {
    const zaklad = { ...this.VYCHOZI_SLOZENI };
    const soucet = Object.values(zaklad).reduce((a, b) => a + b, 0);

    // Přizpůsobení jinému počtu úloh než 15
    if (celkem !== soucet) {
      const pomer = celkem / soucet;
      let rozdano = 0;
      const klice = Object.keys(zaklad);
      klice.forEach((k, i) => {
        if (i === klice.length - 1) {
          zaklad[k] = celkem - rozdano;
        } else {
          zaklad[k] = Math.max(1, Math.round(zaklad[k] * pomer));
          rozdano += zaklad[k];
        }
      });
    }

    // Oblast, která nejvíc pokulhává, dostane o jednu úlohu navíc na úkor
    // oblasti, která jde nejlépe. Nikdy ale nezmizí úplně.
    const slabá = Pokrok.nejslabsiOblast(pokrok);
    const silná = Pokrok.nejsilnejsiOblast(pokrok);
    if (slabá && silná && slabá !== silná && zaklad[silná] > 1 && zaklad[slabá] !== undefined) {
      zaklad[silná] -= 1;
      zaklad[slabá] += 1;
    }

    return zaklad;
  },

  _vyberDovednost(oblast, pokrok, jizVybrane) {
    const vOblasti = this.DOVEDNOSTI.filter((d) => d.oblast === oblast).map((d) => d.klic);
    if (!vOblasti.length) return 'scitani-bez-prechodu';

    // Dovednosti, které Ami dlouho neprocvičovala nebo v nich chybuje,
    // mají větší šanci — to je opakování v rozestupech.
    const ohodnocene = vOblasti.map((klic) => ({
      klic,
      vaha: Pokrok.vahaProVyber(pokrok, klic),
    }));

    // Nechceme stejnou dovednost třikrát v jedné lekci
    const pocty = {};
    jizVybrane.forEach((u) => {
      pocty[u.dovednost] = (pocty[u.dovednost] || 0) + 1;
    });
    ohodnocene.forEach((o) => {
      if (pocty[o.klic] >= 2) o.vaha *= 0.15;
    });

    const soucet = ohodnocene.reduce((s, o) => s + o.vaha, 0);
    let los = Math.random() * soucet;
    for (const o of ohodnocene) {
      los -= o.vaha;
      if (los <= 0) return o.klic;
    }
    return ohodnocene[ohodnocene.length - 1].klic;
  },

  _prostridej(ulohy) {
    // Rozdělí podle oblasti a bere střídavě, aby nešly stejné typy za sebou
    const podleOblasti = {};
    ulohy.forEach((u) => {
      const d = this.DOVEDNOSTI.find((x) => x.klic === u.dovednost);
      const o = d ? d.oblast : 'jine';
      (podleOblasti[o] = podleOblasti[o] || []).push(u);
    });
    Object.values(podleOblasti).forEach((s) => this.zamichej(s));

    const vysledek = [];
    const oblasti = Object.keys(podleOblasti);
    while (vysledek.length < ulohy.length) {
      let pridano = false;
      for (const o of oblasti) {
        if (podleOblasti[o].length) {
          vysledek.push(podleOblasti[o].shift());
          pridano = true;
        }
      }
      if (!pridano) break;
    }
    return vysledek;
  },

  // ─── Vyhodnocení odpovědi ────────────────────────────────────────────────

  // Kontroluje odpověď na hlavní otázku úlohy — u slovních úloh tedy výsledek
  // výpočtu, ne volbu operace (tu vyhodnocuje zkontrolujOperaci níže).
  zkontroluj(uloha, odpoved) {
    if (uloha.typ === 'volba') {
      return String(odpoved).trim() === String(uloha.spravne).trim();
    }
    const cislo = parseInt(String(odpoved).replace(/\s/g, ''), 10);
    return Number.isFinite(cislo) && cislo === uloha.spravne;
  },

  zkontrolujOperaci(uloha, zvolena) {
    return String(zvolena).trim() === String(uloha.operace || '').trim();
  },

  // Rozpozná typickou chybu, aby SUN mohla poradit konkrétně místo obecně
  rozpoznejChybu(uloha, odpoved) {
    const cislo = parseInt(String(odpoved).replace(/\s/g, ''), 10);
    if (!Number.isFinite(cislo)) return null;
    const rozdil = cislo - uloha.spravne;

    if (rozdil === 10 || rozdil === -10) {
      return 'desitka'; // ztracená nebo přidaná desítka
    }
    if (Math.abs(rozdil) === 1) {
      return 'oJedna'; // typické při počítání na prsty
    }
    if (uloha.zadani.includes('−') && cislo > uloha.spravne) {
      const m = uloha.zadani.match(/(\d+)\s*−\s*(\d+)/);
      if (m) {
        const a = parseInt(m[1], 10);
        const b = parseInt(m[2], 10);
        if (cislo === a + b) return 'zamenaOperace';
      }
    }
    if (uloha.zadani.includes('+')) {
      const m = uloha.zadani.match(/(\d+)\s*\+\s*(\d+)/);
      if (m) {
        const a = parseInt(m[1], 10);
        const b = parseInt(m[2], 10);
        if (cislo === Math.abs(a - b)) return 'zamenaOperace';
      }
    }
    return null;
  },

  POPIS_CHYBY: {
    desitka: 'Vypadá to, že se nám cestou ztratila jedna desítka.',
    oJedna: 'Jsi o jedničku vedle — to se stává, když se počítá po prstech.',
    zamenaOperace: 'Zkontroluj znaménko — přidáváme, nebo ubíráme?',
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = { Matika };
