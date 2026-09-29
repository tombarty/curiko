// ═══════════════════════════════════════════════════════════════════════════
// hodnoceni.js — hvězdičky, milníky, známka SUN a závěr lekce
//
// Rozdělení 10 denních hvězdiček:
//   3 za čtení · 2 za porozumění · 1 za psaní · 3 za matematiku
//   1 za vytrvalost, opravu chyby nebo dobré využití nápovědy
//
// Hvězdičky se nedávají jenom za správné výsledky. Odměňuje se i dočtení
// obtížného slova, oprava vlastní chyby, vysvětlení postupu, odpověď celou
// větou nebo to, že Ami požádala o nápovědu místo aby to vzdala.
//
// Známka je vždy 1, 1− nebo 2. Horší se nedává. Ve slabý den se nedává žádná.
// ═══════════════════════════════════════════════════════════════════════════

const Hodnoceni = {
  MAX_HVEZDICEK: 10,

  STROP: { cteni: 3, porozumeni: 2, psani: 1, matika: 3, vytrvalost: 1 },

  // ─── Hvězdičky za jednotlivé části ───────────────────────────────────────

  hvezdickyZaCteni(cteni) {
    if (!cteni || !cteni.dokonceno) return { pocet: 0, duvody: [] };
    let pocet = 0;
    const duvody = [];

    // 1 hvězdička za to, že text dočetla celý
    pocet++;
    duvody.push('dočetla celý text');

    // 1 za práci s obtížnými slovy — slabikování nebo dočtení do konce
    if ((cteni.tezkaSlova || []).length > 0 || (cteni.prehranaSlova || []).length > 0) {
      pocet++;
      duvody.push('poradila si s obtížnými slovy');
    } else if ((cteni.napovedy || 0) === 0) {
      pocet++;
      duvody.push('četla samostatně bez pomoci');
    }

    // 1 za slovního detektiva, když se povedl
    if (cteni.detektiv && cteni.detektiv.celkem > 0) {
      const podil = cteni.detektiv.spravne / cteni.detektiv.celkem;
      if (podil >= 0.6) {
        pocet++;
        duvody.push('v rozlišování podobných slov se dařilo');
      }
    } else if ((cteni.spravnychOtazek || 0) >= 3) {
      pocet++;
      duvody.push('textu dobře rozuměla');
    }

    return { pocet: Math.min(pocet, this.STROP.cteni), duvody };
  },

  hvezdickyZaPorozumeni(cteni) {
    if (!cteni) return { pocet: 0, duvody: [] };
    let pocet = 0;
    const duvody = [];
    const spravnych = cteni.spravnychOtazek || 0;
    const celychVet = cteni.celychVet || 0;

    if (spravnych >= 4) {
      pocet++;
      duvody.push(`odpověděla správně na ${spravnych} z 5 otázek`);
    } else if (spravnych >= 2) {
      pocet++;
      duvody.push(`našla odpověď na ${spravnych} otázky`);
    }

    // Druhá hvězdička patří celým větám — to je cíl, na kterém pracujeme
    if (celychVet >= 3) {
      pocet++;
      duvody.push(`${celychVet}× odpověděla celou větou`);
    }

    return { pocet: Math.min(pocet, this.STROP.porozumeni), duvody };
  },

  hvezdickaZaPsani(psani) {
    if (!psani || !psani.odevzdano) return { pocet: 0, duvody: [] };
    return {
      pocet: 1,
      duvody: [psani.zpusob === 'foto' ? 'napsala úkol na papír a vyfotila ho' : 'napsala vlastní text'],
    };
  },

  hvezdickyZaMatiku(matika) {
    if (!matika || !matika.ulohy) return { pocet: 0, duvody: [] };
    let pocet = 0;
    const duvody = [];
    const celkem = matika.ulohy.length;
    const spravne = matika.spravne || 0;
    const podil = celkem ? spravne / celkem : 0;

    if (podil >= 0.8) {
      pocet++;
      duvody.push(`spočítala ${spravne} z ${celkem} úloh`);
    } else if (podil >= 0.5) {
      pocet++;
      duvody.push(`zvládla ${spravne} úloh z ${celkem}`);
    }

    // Za samostatnost — vyřešené bez nápovědy
    if ((matika.bezNapovedy || 0) >= Math.ceil(celkem * 0.5)) {
      pocet++;
      duvody.push(`${matika.bezNapovedy} úloh vyřešila úplně sama`);
    }

    // Za vysvětlení postupu nebo správnou volbu operace ve slovní úloze
    if ((matika.vysvetlilaPostup || 0) > 0) {
      pocet++;
      duvody.push('dokázala vysvětlit, jak počítala');
    } else if ((matika.spravnaOperace || 0) >= 2) {
      pocet++;
      duvody.push('u slovních úloh správně poznala, co se má počítat');
    }

    return { pocet: Math.min(pocet, this.STROP.matika), duvody };
  },

  // Hvězdička, kterou nelze získat za správnost — jen za přístup
  hvezdickaZaVytrvalost(lekce) {
    const duvody = [];

    if ((lekce.opraveneChyby || 0) >= 2) {
      duvody.push(`${lekce.opraveneChyby}× si sama opravila chybu`);
    }
    if ((lekce.pouziteNapovedy || 0) > 0 && lekce.dokoncena) {
      duvody.push('když si nevěděla rady, požádala o nápovědu a pokračovala');
    }
    if (lekce.dokoncena && (lekce.energie === 'unavena')) {
      duvody.push('dokončila lekci, i když byla unavená');
    }
    if (lekce.dokoncena && !duvody.length) {
      duvody.push('vydržela až do konce');
    }

    return { pocet: duvody.length ? 1 : 0, duvody: duvody.slice(0, 1) };
  },

  // ─── Celkový součet ──────────────────────────────────────────────────────

  spocitej(lekce) {
    const c = this.hvezdickyZaCteni(lekce.cteni);
    const p = this.hvezdickyZaPorozumeni(lekce.cteni);
    const w = this.hvezdickaZaPsani(lekce.psani);
    const m = this.hvezdickyZaMatiku(lekce.matika);
    const v = this.hvezdickaZaVytrvalost(lekce);

    const celkem = Math.min(
      this.MAX_HVEZDICEK,
      c.pocet + p.pocet + w.pocet + m.pocet + v.pocet
    );

    return {
      celkem,
      casti: {
        cteni: { ziskano: c.pocet, max: this.STROP.cteni, duvody: c.duvody },
        porozumeni: { ziskano: p.pocet, max: this.STROP.porozumeni, duvody: p.duvody },
        psani: { ziskano: w.pocet, max: this.STROP.psani, duvody: w.duvody },
        matika: { ziskano: m.pocet, max: this.STROP.matika, duvody: m.duvody },
        vytrvalost: { ziskano: v.pocet, max: this.STROP.vytrvalost, duvody: v.duvody },
      },
    };
  },

  // ─── Známka SUN ──────────────────────────────────────────────────────────
  //
  // Nevychází jen z počtu správných odpovědí. Do hodnocení se počítá i snaha,
  // dokončení, přijetí opravy a použití postupu. Nikdy horší než 2.

  znamka(lekce, hvezdicky) {
    // Slabý nebo unavený den — známka se nedává vůbec
    const velmiSlabe = hvezdicky.celkem <= 3;
    const nedokoncena = !lekce.dokoncena;
    if (velmiSlabe || nedokoncena) {
      return {
        znamka: null,
        text:
          'Dnes nebudeme dávat známku. Dnešní výhra je, že jsi lekci zkusila a zjistily jsme, co příště uděláme jinak.',
      };
    }

    let body = hvezdicky.celkem; // 4–10

    // Přístup váží stejně jako výsledek
    if ((lekce.opraveneChyby || 0) >= 2) body += 1;
    if (lekce.energie === 'unavena' && lekce.dokoncena) body += 1;
    if ((lekce.cteni && lekce.cteni.celychVet) >= 4) body += 1;

    if (body >= 10) return { znamka: '1', text: 'Dnešek se opravdu povedl.' };
    if (body >= 7) return { znamka: '1−', text: 'Moc pěkná práce.' };
    return { znamka: '2', text: 'Dneska to dalo trochu práce, a přesto jsi to dotáhla.' };
  },

  // ─── Milníky ─────────────────────────────────────────────────────────────
  //
  // Vycházejí ze skutečných výsledků napříč lekcemi, ne z počtu kliknutí.

  MILNIKY: [
    {
      klic: 'slovni-detektiv',
      nazev: 'Slovní detektiv',
      emoji: '🔍',
      popis: 'Rozliší podobná slova jako pila a bila.',
      splneno: (stav) => {
        const lekce = stav.lekce || [];
        const uspesne = lekce.filter((l) => {
          const d = l.cteni && l.cteni.detektiv;
          return d && d.celkem >= 3 && d.spravne / d.celkem >= 0.8;
        });
        return uspesne.length >= 3;
      },
    },
    {
      klic: 'mistryne-vet',
      nazev: 'Mistryně celých vět',
      emoji: '✍️',
      popis: 'Odpovídá celými větami, ne jedním slovem.',
      splneno: (stav) => {
        const lekce = (stav.lekce || []).slice(0, 5);
        const dobre = lekce.filter((l) => (l.cteni && l.cteni.celychVet) >= 4);
        return dobre.length >= 3;
      },
    },
    {
      klic: 'kamaradka-desitky',
      nazev: 'Kamarádka desítky',
      emoji: '🔟',
      popis: 'Zvládá přechod přes desítku.',
      splneno: (stav) => {
        const p = stav.pokrok || {};
        const nahoru = p['scitani-pres-desitku'];
        const dolu = p['odcitani-pres-desitku'];
        return !!(nahoru && dolu && nahoru.jistota >= 0.7 && dolu.jistota >= 0.7);
      },
    },
    {
      klic: 'odvazna-opravarka',
      nazev: 'Odvážná opravářka',
      emoji: '🔧',
      popis: 'Umí najít a opravit vlastní chybu.',
      splneno: (stav) => {
        const celkem = (stav.lekce || []).reduce((s, l) => s + (l.opraveneChyby || 0), 0);
        return celkem >= 15;
      },
    },
    {
      klic: 'ctenarska-pruzkumnice',
      nazev: 'Čtenářská průzkumnice',
      emoji: '📖',
      popis: 'Přečetla texty z mnoha různých oborů.',
      splneno: (stav) => {
        const temata = new Set(
          (stav.lekce || []).map((l) => l.cteni && l.cteni.tema).filter(Boolean)
        );
        return temata.size >= 6;
      },
    },
    {
      klic: 'matematicka-objevitelka',
      nazev: 'Matematická objevitelka',
      emoji: '🧮',
      popis: 'Zvládá násobilku i dělení do šesti.',
      splneno: (stav) => {
        const p = stav.pokrok || {};
        const rady = [2, 3, 4, 5, 6];
        const zvladnute = rady.filter((r) => {
          const n = p[`nasobilka-${r}`];
          const d = p[`deleni-${r}`];
          return n && d && n.jistota >= 0.7 && d.jistota >= 0.7;
        });
        return zvladnute.length >= 4;
      },
    },
  ],

  noveMilniky(stav) {
    const ziskane = new Set((stav.profil && stav.profil.milniky) || []);
    return this.MILNIKY.filter((m) => !ziskane.has(m.klic) && m.splneno(stav));
  },

  // ─── Co se povedlo / co trénovat ─────────────────────────────────────────

  coSePovedlo(lekce, hvezdicky) {
    const vsechny = [];
    for (const cast of Object.values(hvezdicky.casti)) {
      vsechny.push(...cast.duvody);
    }
    // Dvě až čtyři konkrétní pozorování
    return vsechny.slice(0, 4);
  },

  coTrenovat(lekce, stav) {
    const oblasti = [];

    // Čtení — co v textu dělalo potíže
    if (lekce.cteni) {
      if ((lekce.cteni.celychVet || 0) < 3) {
        oblasti.push('odpovědi celou větou');
      }
      if ((lekce.cteni.napovedy || 0) >= 4) {
        oblasti.push('čtení delších slov až do konce');
      }
    }

    // Matematika — nejslabší dovednost z dnešní lekce
    if (lekce.matika && lekce.matika.chybneDovednosti) {
      const pocty = {};
      lekce.matika.chybneDovednosti.forEach((d) => {
        pocty[d] = (pocty[d] || 0) + 1;
      });
      const nejcastejsi = Object.entries(pocty).sort((a, b) => b[1] - a[1])[0];
      if (nejcastejsi) {
        const def = Matika.DOVEDNOSTI.find((d) => d.klic === nejcastejsi[0]);
        if (def) oblasti.push(def.nazev.toLowerCase());
      }
    }

    // Dlouhodobě slabá místa z pokroku
    if (oblasti.length < 2) {
      const slaba = Pokrok.potrebujePozornost(stav.pokrok, 1);
      slaba.forEach((s) => oblasti.push(s.nazev.toLowerCase()));
    }

    return oblasti.slice(0, 2); // maximálně dvě, ať to není seznam chyb
  },

  // ─── Pokrok oproti minule ────────────────────────────────────────────────
  //
  // Porovnává se jen s tím, co je opravdu uložené. Žádné vymyšlené zlepšení.

  pokrokOprotiMinule(lekce, stav) {
    const predchozi = (stav.lekce || []).filter((l) => l.dokoncena);

    if (!predchozi.length) {
      return ['Dnes jsme vytvořily výchozí bod. Od příští lekce začneme sledovat, co se zlepšuje.'];
    }

    const zpravy = [];
    const minula = predchozi[0];

    // Celé věty
    const tedVet = (lekce.cteni && lekce.cteni.celychVet) || 0;
    const drivVet = (minula.cteni && minula.cteni.celychVet) || 0;
    if (tedVet > drivVet) zpravy.push(`Dnes jsi napsala ${tedVet} celých vět, minule ${drivVet}.`);

    // Nápovědy u matematiky
    const tedBez = (lekce.matika && lekce.matika.bezNapovedy) || 0;
    const drivBez = (minula.matika && minula.matika.bezNapovedy) || 0;
    if (tedBez > drivBez) zpravy.push(`Bez nápovědy jsi dnes zvládla ${tedBez} úloh, minule ${drivBez}.`);

    // Porozumění textu
    const tedOt = (lekce.cteni && lekce.cteni.spravnychOtazek) || 0;
    const drivOt = (minula.cteni && minula.cteni.spravnychOtazek) || 0;
    if (tedOt > drivOt) zpravy.push(`Otázkám k textu jsi dnes rozuměla líp než minule.`);

    // Počet lekcí v tomto týdnu
    const tydenZpet = Date.now() - 7 * 86400000;
    const tentoTyden = predchozi.filter((l) => Date.parse(l.datum || 0) > tydenZpet).length + 1;
    if (tentoTyden >= 2) zpravy.push(`Tento týden jsi dokončila ${tentoTyden}. lekci.`);

    if (!zpravy.length) {
      zpravy.push('Dnešek byl podobný jako minule. To je taky dobře — znamená to, že se to drží.');
    }

    return zpravy.slice(0, 3);
  },

  // ─── Osobní zpráva na závěr ──────────────────────────────────────────────

  osobniZprava(jmeno, lekce, hvezdicky) {
    const kandidati = [];

    if ((lekce.opraveneChyby || 0) >= 2) {
      kandidati.push(
        `${jmeno}, dnes se mi líbilo, že ses po chybě nevzdala a zkusila jsi jiný postup. Přesně tak se mozek učí.`
      );
    }
    if (lekce.energie === 'unavena' && lekce.dokoncena) {
      kandidati.push(
        `${jmeno}, dneska jsi byla unavená a stejně jsi to dotáhla do konce. To je vytrvalost.`
      );
    }
    if ((lekce.cteni && lekce.cteni.celychVet) >= 4) {
      kandidati.push(
        `${jmeno}, dnešní odpovědi celými větami byly opravdu pěkné. Je vidět, že si dáváš záležet.`
      );
    }
    if ((lekce.pouziteNapovedy || 0) > 0) {
      kandidati.push(
        `${jmeno}, dnes ses nebála říct si o nápovědu. Požádat o pomoc je dovednost, kterou budeš potřebovat celý život.`
      );
    }
    if (hvezdicky.celkem >= 9) {
      kandidati.push(`${jmeno}, tohle byla vydařená mise od začátku do konce. Užila jsem si to s tebou.`);
    }

    if (!kandidati.length) {
      kandidati.push(
        `${jmeno}, díky za dnešní misi. Sešly jsme se, pracovaly jsme a to je to hlavní.`
      );
    }

    return kandidati[Math.floor(Math.random() * kandidati.length)];
  },

  // ─── Sestavení celého závěru ─────────────────────────────────────────────

  zaver(lekce, stav) {
    const jmeno = (stav.profil && stav.profil.jmeno) || 'Ami';
    const hvezdicky = this.spocitej(lekce);
    const znamka = this.znamka(lekce, hvezdicky);
    const milniky = this.noveMilniky({
      ...stav,
      lekce: [lekce, ...(stav.lekce || [])],
    });

    return {
      hvezdicky,
      celkemHvezdicek:
        ((stav.profil && stav.profil.celkemHvezdicek) || 0) + hvezdicky.celkem,
      znamka,
      povedlo: this.coSePovedlo(lekce, hvezdicky),
      trenovat: this.coTrenovat(lekce, stav),
      pokrok: this.pokrokOprotiMinule(lekce, stav),
      milniky,
      zprava: this.osobniZprava(jmeno, lekce, hvezdicky),
    };
  },

  // ─── Série dokončených dní ───────────────────────────────────────────────
  //
  // Vynechaný den sérii jen nezvýší. Nic se neodebírá a nikde se to nepřipomíná.

  serie(lekce) {
    const dokoncene = (lekce || []).filter((l) => l.dokoncena && l.datum);
    if (!dokoncene.length) return 0;

    const dny = [...new Set(dokoncene.map((l) => String(l.datum).slice(0, 10)))].sort().reverse();
    const den = (posun) => {
      const d = new Date();
      d.setDate(d.getDate() - posun);
      return d.toISOString().slice(0, 10);
    };

    // Série běží, i když dnes ještě nepracovala — počítá se od včerejška
    let start = 0;
    if (dny[0] !== den(0)) {
      if (dny[0] === den(1)) start = 1;
      else return 0;
    }

    let pocet = 0;
    for (let i = start; ; i++) {
      if (dny.includes(den(i))) pocet++;
      else break;
    }
    return pocet;
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = { Hodnoceni };
