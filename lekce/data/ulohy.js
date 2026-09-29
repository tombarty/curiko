// ═══════════════════════════════════════════════════════════════════════════
// ulohy.js — předlohy slovních úloh
//
// Každá předloha je šablona, do které se dosadí náhodná čísla. Díky tomu se
// úlohy neopakují slovo od slova, ale zůstávají srozumitelné a kontrolované.
// Témata odpovídají tomu, co osmiletou holčičku zajímá.
//
// Pravidla, která generátor hlídá:
//   • odčítání nikdy nedá záporný výsledek,
//   • dělení vždy vychází beze zbytku,
//   • výsledek se vejde do sta.
// ═══════════════════════════════════════════════════════════════════════════

const SlovniUlohy = {
  NAZEV_OPERACE: {
    scitani: 'přidávat',
    odcitani: 'ubírat',
    nasobeni: 'tvořit stejné skupiny',
    deleni: 'rozdělovat',
  },

  ZNAK: { scitani: '+', odcitani: '−', nasobeni: '×', deleni: ':' },

  // ─── Předlohy ────────────────────────────────────────────────────────────

  PREDLOHY: [
    // ── Sčítání ──────────────────────────────────────────────────────────
    {
      operace: 'scitani', tema: 'zvirata',
      text: 'V útulku bylo {a} koček. Odpoledne přivezli dalších {b}. Kolik koček je v útulku teď?',
      cisla: [[14, 48], [6, 30]],
      vime: ['V útulku bylo {a} koček.', 'Přivezli dalších {b}.'],
      zjistit: 'Kolik koček je v útulku teď.',
    },
    {
      operace: 'scitani', tema: 'hudba',
      text: 'Na koncert přišlo {a} lidí a po přestávce dorazilo ještě {b} dalších. Kolik lidí bylo na koncertě celkem?',
      cisla: [[21, 55], [8, 40]],
      vime: ['Přišlo {a} lidí.', 'Dorazilo ještě {b}.'],
      zjistit: 'Kolik lidí bylo celkem.',
    },
    {
      operace: 'scitani', tema: 'samolepky',
      text: 'Ami měla {a} samolepek. K narozeninám dostala dalších {b}. Kolik samolepek má teď?',
      cisla: [[16, 45], [7, 35]],
      vime: ['Ami měla {a} samolepek.', 'Dostala dalších {b}.'],
      zjistit: 'Kolik samolepek má teď.',
    },
    {
      operace: 'scitani', tema: 'knihy',
      text: 'V knihovně je {a} knih o zvířatech a {b} knih o vesmíru. Kolik je to knih dohromady?',
      cisla: [[23, 50], [12, 40]],
      vime: ['{a} knih o zvířatech.', '{b} knih o vesmíru.'],
      zjistit: 'Kolik knih je dohromady.',
    },
    {
      operace: 'scitani', tema: 'sport',
      text: 'Ráno uběhla Ami {a} metrů a odpoledne ještě {b} metrů. Kolik metrů uběhla za celý den?',
      cisla: [[20, 50], [15, 45]],
      vime: ['Ráno {a} metrů.', 'Odpoledne {b} metrů.'],
      zjistit: 'Kolik metrů uběhla za celý den.',
    },
    {
      operace: 'scitani', tema: 'ovoce',
      text: 'Na stromě zbylo {a} jablek a v košíku bylo {b}. Kolik jablek je to dohromady?',
      cisla: [[18, 44], [9, 38]],
      vime: ['Na stromě {a} jablek.', 'V košíku {b} jablek.'],
      zjistit: 'Kolik jablek je dohromady.',
    },

    // ── Odčítání ─────────────────────────────────────────────────────────
    {
      operace: 'odcitani', tema: 'tvoreni',
      text: 'Ami měla {a} korálků. Na náramek jich použila {b}. Kolik korálků jí zbylo?',
      cisla: [[40, 95], [12, 38]],
      vime: ['Měla {a} korálků.', 'Použila {b}.'],
      zjistit: 'Kolik korálků zbylo.',
    },
    {
      operace: 'odcitani', tema: 'zvirata',
      text: 'Na louce se páslo {a} ovcí. {b} z nich odešlo do stáje. Kolik ovcí zůstalo na louce?',
      cisla: [[35, 90], [11, 30]],
      vime: ['Na louce bylo {a} ovcí.', 'Odešlo {b}.'],
      zjistit: 'Kolik ovcí zůstalo.',
    },
    {
      operace: 'odcitani', tema: 'vylety',
      text: 'Výlet měřil {a} kilometrů. Zatím ušli {b} kilometrů. Kolik kilometrů jim ještě zbývá?',
      cisla: [[30, 80], [8, 25]],
      vime: ['Celý výlet je {a} kilometrů.', 'Ušli {b} kilometrů.'],
      zjistit: 'Kolik kilometrů zbývá.',
    },
    {
      operace: 'odcitani', tema: 'penize',
      text: 'Ami měla naspořeno {a} Kč. Za knihu utratila {b} Kč. Kolik korun jí zůstalo?',
      cisla: [[45, 99], [15, 40]],
      vime: ['Měla {a} Kč.', 'Utratila {b} Kč.'],
      zjistit: 'Kolik korun jí zůstalo.',
    },
    {
      operace: 'odcitani', tema: 'stavebnice',
      text: 'Ve stavebnici bylo {a} kostek. {b} kostek se zatoulalo pod postel. Kolik kostek zbylo v krabici?',
      cisla: [[38, 92], [9, 33]],
      vime: ['Ve stavebnici bylo {a} kostek.', 'Zatoulalo se {b}.'],
      zjistit: 'Kolik kostek zbylo v krabici.',
    },
    {
      operace: 'odcitani', tema: 'hudba',
      text: 'Ve sboru zpívá {a} dětí. {b} z nich dnes onemocnělo. Kolik dětí přišlo na zkoušku?',
      cisla: [[32, 70], [7, 24]],
      vime: ['Ve sboru je {a} dětí.', 'Onemocnělo {b}.'],
      zjistit: 'Kolik dětí přišlo na zkoušku.',
    },

    // ── Násobení ─────────────────────────────────────────────────────────
    {
      operace: 'nasobeni', tema: 'ovoce',
      text: 'V jednom sáčku je {b} jablek. Kolik jablek je v {a} sáčcích?',
      cisla: [[2, 9], [2, 6]],
      vime: ['V jednom sáčku je {b} jablek.', 'Sáčků je {a}.'],
      zjistit: 'Kolik jablek je celkem.',
    },
    {
      operace: 'nasobeni', tema: 'tvoreni',
      text: 'Na každý náramek potřebuje Ami {b} korálků. Kolik korálků potřebuje na {a} náramky?',
      cisla: [[2, 8], [2, 6]],
      vime: ['Na jeden náramek je potřeba {b} korálků.', 'Náramků je {a}.'],
      zjistit: 'Kolik korálků potřebuje celkem.',
    },
    {
      operace: 'nasobeni', tema: 'zvirata',
      text: 'V každém výběhu je {b} koní. Kolik koní je v {a} výbězích?',
      cisla: [[2, 8], [2, 6]],
      vime: ['V jednom výběhu je {b} koní.', 'Výběhů je {a}.'],
      zjistit: 'Kolik koní je celkem.',
    },
    {
      operace: 'nasobeni', tema: 'hudba',
      text: 'Jedna písnička trvá {b} minut. Jak dlouho trvá {a} písniček?',
      cisla: [[2, 9], [2, 5]],
      vime: ['Jedna písnička trvá {b} minut.', 'Písniček je {a}.'],
      zjistit: 'Jak dlouho trvají všechny dohromady.',
    },
    {
      operace: 'nasobeni', tema: 'sport',
      text: 'Každý tým má {b} hráčů. Kolik hráčů je v {a} týmech?',
      cisla: [[2, 8], [2, 6]],
      vime: ['V jednom týmu je {b} hráčů.', 'Týmů je {a}.'],
      zjistit: 'Kolik hráčů je dohromady.',
    },
    {
      operace: 'nasobeni', tema: 'knihy',
      text: 'V každé řadě police je {b} knih. Kolik knih je v {a} řadách?',
      cisla: [[2, 9], [2, 6]],
      vime: ['V jedné řadě je {b} knih.', 'Řad je {a}.'],
      zjistit: 'Kolik knih je celkem.',
    },

    // ── Dělení ───────────────────────────────────────────────────────────
    {
      operace: 'deleni', tema: 'ovoce',
      text: 'Ami má {c} bonbonů a chce je rozdělit {b} kamarádkám rovným dílem. Kolik bonbonů dostane každá?',
      cisla: [[2, 10], [2, 6]],
      vime: ['Bonbonů je {c}.', 'Kamarádek je {b}.'],
      zjistit: 'Kolik bonbonů dostane každá.',
    },
    {
      operace: 'deleni', tema: 'zvirata',
      text: 'Do stájí je potřeba ustájit {c} koní. Do každé stáje se vejde {b} koní. Kolik stájí bude potřeba?',
      cisla: [[2, 10], [2, 6]],
      vime: ['Koní je {c}.', 'Do jedné stáje se vejde {b}.'],
      zjistit: 'Kolik stájí bude potřeba.',
    },
    {
      operace: 'deleni', tema: 'tvoreni',
      text: 'Ami má {c} korálků a chce z nich udělat náramky po {b} korálcích. Kolik náramků vyrobí?',
      cisla: [[2, 10], [2, 6]],
      vime: ['Korálků je {c}.', 'Na jeden náramek jich jde {b}.'],
      zjistit: 'Kolik náramků vyrobí.',
    },
    {
      operace: 'deleni', tema: 'sport',
      text: 'Na hřiště přišlo {c} dětí. Rozdělily se do družstev po {b} dětech. Kolik družstev vzniklo?',
      cisla: [[2, 10], [2, 6]],
      vime: ['Dětí je {c}.', 'V jednom družstvu je {b}.'],
      zjistit: 'Kolik družstev vzniklo.',
    },
    {
      operace: 'deleni', tema: 'knihy',
      text: 'Do knihovny je potřeba srovnat {c} knih. Na každou polici se vejde {b} knih. Kolik polic se zaplní?',
      cisla: [[2, 10], [2, 6]],
      vime: ['Knih je {c}.', 'Na jednu polici se vejde {b}.'],
      zjistit: 'Kolik polic se zaplní.',
    },
    {
      operace: 'deleni', tema: 'pohadky',
      text: 'Víla našla {c} kouzelných kamínků a rozdělila je do {b} truhliček rovným dílem. Kolik kamínků je v jedné truhličce?',
      cisla: [[2, 10], [2, 6]],
      vime: ['Kamínků je {c}.', 'Truhliček je {b}.'],
      zjistit: 'Kolik kamínků je v jedné truhličce.',
    },
  ],

  // ─── Sestavení konkrétní úlohy ───────────────────────────────────────────

  nahodna(operace) {
    const povolene = Array.isArray(operace) ? operace : [operace];
    const vyber = this.PREDLOHY.filter((p) => povolene.includes(p.operace));
    return vyber[Math.floor(Math.random() * vyber.length)];
  },

  _cislo(rozsah) {
    return Math.floor(Math.random() * (rozsah[1] - rozsah[0] + 1)) + rozsah[0];
  },

  sestav(predloha) {
    let a = this._cislo(predloha.cisla[0]);
    let b = this._cislo(predloha.cisla[1]);
    let c = null; // u dělení celek, který se dělí
    let vysledek;

    switch (predloha.operace) {
      case 'scitani':
        // Aby se výsledek vešel do sta
        if (a + b > 99) b = Math.max(2, 99 - a);
        vysledek = a + b;
        break;

      case 'odcitani':
        // Aby výsledek nebyl záporný a úloha měla smysl
        if (b >= a) b = Math.max(1, Math.floor(a / 2));
        vysledek = a - b;
        break;

      case 'nasobeni':
        if (a * b > 60) b = Math.max(2, Math.floor(60 / a));
        vysledek = a * b;
        break;

      case 'deleni':
        // c se dopočítá tak, aby dělení vyšlo přesně
        c = a * b;
        vysledek = a;
        break;
    }

    const dosad = (s) =>
      String(s)
        .replace(/\{a\}/g, a)
        .replace(/\{b\}/g, b)
        .replace(/\{c\}/g, c);

    const znak = this.ZNAK[predloha.operace];
    const zapis =
      predloha.operace === 'deleni'
        ? `${c} : ${b} = ${vysledek}`
        : `${a} ${znak} ${b} = ${vysledek}`;

    return {
      text: dosad(predloha.text),
      operace: this.NAZEV_OPERACE[predloha.operace],
      druhOperace: predloha.operace,
      vysledek,
      tema: predloha.tema,
      podotazky: {
        coVime: predloha.vime.map(dosad),
        coZjistit: dosad(predloha.zjistit),
      },
      napovedaOperace: this._napovedaOperace(predloha.operace),
      napovedaKrok: `Zkus si napsat příklad. ${
        predloha.operace === 'deleni'
          ? `Celkem je ${c} a dělíme po ${b}.`
          : `Máme ${a} a ${b}.`
      }`,
      napovedaPriklad: { typ: 'podobny', priklad: zapis, vysvetleni: 'Takhle vypadá zápis téhle úlohy.' },
      zapis,
    };
  },

  _napovedaOperace(operace) {
    switch (operace) {
      case 'scitani':
        return 'Něco přibývá — dvě skupiny dáváme dohromady.';
      case 'odcitani':
        return 'Něco ubývá — z celku se něco odebírá.';
      case 'nasobeni':
        return 'Máme několik stejně velkých skupin a chceme vědět, kolik je to celkem.';
      case 'deleni':
        return 'Máme celek a rozdělujeme ho na stejné díly.';
      default:
        return 'Přečti si ještě jednou, co se v úloze děje.';
    }
  },

  // ─── Dvoukroková úloha (zapíná se až na vyšší úrovni) ────────────────────

  dvoukrokova() {
    const varianty = [
      () => {
        const skupin = this._cislo([2, 5]);
        const vSkupine = this._cislo([2, 6]);
        const ubylo = this._cislo([1, Math.max(1, skupin * vSkupine - 2)]);
        return {
          text: `Ami koupila ${skupin} sáčky po ${vSkupine} bonbonech. ${ubylo} bonbonů snědla. Kolik bonbonů jí zbylo?`,
          vysledek: skupin * vSkupine - ubylo,
          operace: 'tvořit stejné skupiny',
          podotazky: {
            coVime: [`${skupin} sáčky po ${vSkupine} bonbonech.`, `${ubylo} bonbonů snědla.`],
            coZjistit: 'Kolik bonbonů zbylo.',
          },
          napovedaKrok: `Nejdřív zjisti, kolik bonbonů měla celkem: ${skupin} × ${vSkupine}.`,
          napovedaPriklad: {
            typ: 'podobny',
            priklad: `${skupin} × ${vSkupine} = ${skupin * vSkupine}, potom ${skupin * vSkupine} − ${ubylo}`,
            vysvetleni: 'Nejdřív spočítáme celek, pak teprve odečteme.',
          },
        };
      },
      () => {
        const prvni = this._cislo([15, 40]);
        const druhy = this._cislo([10, 35]);
        const rozdano = this._cislo([5, Math.max(5, prvni + druhy - 5)]);
        return {
          text: `Ve třídě bylo ${prvni} sešitů a paní učitelka přinesla dalších ${druhy}. Potom rozdala ${rozdano} sešitů dětem. Kolik sešitů zůstalo?`,
          vysledek: prvni + druhy - rozdano,
          operace: 'přidávat',
          podotazky: {
            coVime: [`Bylo ${prvni} sešitů.`, `Přinesla dalších ${druhy}.`, `Rozdala ${rozdano}.`],
            coZjistit: 'Kolik sešitů zůstalo.',
          },
          napovedaKrok: `Nejdřív spočítej, kolik sešitů bylo dohromady: ${prvni} + ${druhy}.`,
          napovedaPriklad: {
            typ: 'podobny',
            priklad: `${prvni} + ${druhy} = ${prvni + druhy}, potom ${prvni + druhy} − ${rozdano}`,
            vysvetleni: 'Nejdřív sečteme, pak teprve odečteme.',
          },
        };
      },
    ];
    return varianty[Math.floor(Math.random() * varianty.length)]();
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = { SlovniUlohy };
