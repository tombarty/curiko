// ═══════════════════════════════════════════════════════════════════════════
// psani.js — krátká psací mise (asi pět minut)
//
// Ami může psát přímo do aplikace, nebo napsat úkol rukou na papír a vyfotit
// ho. Fotka se bezpečně uloží a rodič ji vidí v přehledu.
//
// Bez AI nelze z fotky text přečíst. Proto se za odevzdanou fotku dává
// hvězdička a hodnocení připíše rodič. Až se AI zapne, stačí doplnit funkci
// vyhodnotFotku() — zbytek zůstane beze změny.
//
// Zpětná vazba má vždy pořadí ze zadání:
//   1. co se povedlo → 2. jedna konkrétní věc k opravě → 3. povzbuzení
// ═══════════════════════════════════════════════════════════════════════════

const Psani = {
  // ─── Typy úkolů ──────────────────────────────────────────────────────────
  // Střídají se, aby se pořád nepsalo to samé.

  ZADANI: [
    {
      klic: 'odpoved-vetou',
      minVet: 1,
      zadani: (t) => `Odpověz celou větou: Co tě na dnešním textu „${t.nadpis}“ nejvíc překvapilo?`,
      pomoc: 'Začni třeba: „Nejvíc mě překvapilo, že…“',
    },
    {
      klic: 'tri-vety',
      minVet: 3,
      zadani: () => 'Napiš tři věty o tom, co ses dnes dozvěděla.',
      pomoc: 'Každá věta začíná velkým písmenem a končí tečkou.',
    },
    {
      klic: 'pokracovani',
      minVet: 2,
      zadani: (t) => `Vymysli, jak by mohl příběh „${t.nadpis}“ pokračovat. Napiš dvě až čtyři věty.`,
      pomoc: 'Co by se stalo hned potom? Nemusí to být pravda — vymysli si to.',
    },
    {
      klic: 'popis-zvirete',
      minVet: 3,
      zadani: () => 'Popiš svoje oblíbené zvíře. Jak vypadá, co dělá a proč se ti líbí?',
      pomoc: 'Zkus na každou z těch tří otázek jednu větu.',
    },
    {
      klic: 'popis-mista',
      minVet: 3,
      zadani: () => 'Popiš místo, kde je ti dobře. Co tam je vidět a slyšet?',
      pomoc: 'Může to být tvůj pokoj, zahrada, cokoli.',
    },
    {
      klic: 'dopis-postave',
      minVet: 3,
      zadani: (t) => `Napiš krátký dopis někomu z dnešního textu „${t.nadpis}“. Co bys mu chtěla říct?`,
      pomoc: 'Začni oslovením, třeba „Milá Ajšo,“ a pak napiš, co chceš.',
    },
    {
      klic: 'vlastni-nazor',
      minVet: 2,
      zadani: (t) => `Co si myslíš o tom, o čem byl dnešní text? Napiš svůj názor.`,
      pomoc: 'Není správná ani špatná odpověď. Napiš, co si myslíš ty.',
    },
    {
      klic: 'zakonceni',
      minVet: 2,
      zadani: () => 'Vymysli konec pro příběh, který začíná: „Ráno jsem otevřela okno a na parapetu seděl…“',
      pomoc: 'Kdo tam seděl? A co se stalo pak?',
    },
  ],

  // Vybere zadání, které nebylo naposledy — ať se úkoly střídají
  vyberZadani(text, poslednich) {
    const nedavne = (poslednich || []).slice(0, 3);
    let kandidati = this.ZADANI.filter((z) => !nedavne.includes(z.klic));
    if (!kandidati.length) kandidati = this.ZADANI;

    // Úkoly navázané na text dávají smysl jen když text je
    if (!text) kandidati = kandidati.filter((z) => !['pokracovani', 'dopis-postave'].includes(z.klic));

    const vybrany = kandidati[Math.floor(Math.random() * kandidati.length)];
    return {
      klic: vybrany.klic,
      text: vybrany.zadani(text || {}),
      pomoc: vybrany.pomoc,
      minVet: vybrany.minVet,
    };
  },

  // ─── Vyhodnocení napsaného textu ─────────────────────────────────────────

  // Rozdělí text na věty. Bere v úvahu, že děti občas tečku zapomenou —
  // proto se poslední kus počítá jako věta, i když tečka chybí.
  vety(text) {
    return String(text || '')
      .split(/[.!?]+/)
      .map((v) => v.trim())
      .filter((v) => v.split(/\s+/).filter(Boolean).length >= 2);
  },

  vyhodnot(text, zadani) {
    const cisty = String(text || '').trim();
    const vety = this.vety(cisty);
    const slov = cisty.split(/\s+/).filter(Boolean).length;

    if (!cisty || slov < 2) {
      return {
        odevzdano: false,
        prazdne: true,
        povedlo: null,
        oprava: 'Zatím je políčko prázdné. Zkus napsat aspoň jednu větu.',
      };
    }

    // Sesbírá, co se povedlo, a jednu jedinou věc k opravě
    const uspechy = [];
    const opravy = [];

    // Splnění zadání — počet vět
    const pozadovano = (zadani && zadani.minVet) || 1;
    if (vety.length >= pozadovano) {
      uspechy.push(
        pozadovano > 1
          ? `Napsala jsi ${vety.length} věty, přesně jak měla být.`
          : 'Napsala jsi celou větu.'
      );
    } else {
      opravy.push(
        `Zadání chtělo ${pozadovano} věty a zatím tu ${vety.length === 1 ? 'je jedna' : 'jsou ' + vety.length}. Přidáš ještě jednu?`
      );
    }

    // Velké písmeno na začátku
    const prvni = cisty[0];
    const velkeNaZacatku = prvni === prvni.toUpperCase() && prvni !== prvni.toLowerCase();
    if (velkeNaZacatku) uspechy.push('Začala jsi velkým písmenem.');
    else opravy.push('Na začátku věty patří velké písmeno.');

    // Tečka na konci
    if (/[.!?]$/.test(cisty)) uspechy.push('Nezapomněla jsi na tečku.');
    else opravy.push('Na konci věty ještě chybí tečka.');

    // Velká písmena po tečkách uvnitř textu
    const poTecce = cisty.match(/[.!?]\s+([a-záčďéěíňóřšťúůýž])/g);
    if (poTecce && poTecce.length) {
      opravy.push('Po tečce začíná nová věta velkým písmenem.');
    } else if (vety.length > 1) {
      uspechy.push('Každou větu jsi začala velkým písmenem.');
    }

    // Délka — oceníme snahu, ne počet znaků
    if (slov >= 25) uspechy.push('Napsala jsi toho pěkně hodně.');

    return {
      odevzdano: true,
      zpusob: 'text',
      text: cisty,
      pocetVet: vety.length,
      pocetSlov: slov,
      splnenoZadani: vety.length >= pozadovano,
      // Nejvýš jedna oprava, aby to nebyl seznam chyb
      povedlo: uspechy.length ? uspechy[0] : 'Pustila ses do psaní.',
      oprava: opravy.length ? opravy[0] : null,
      vsechnyUspechy: uspechy,
    };
  },

  // ─── Fotka rukou psaného úkolu ───────────────────────────────────────────

  POVOLENE_TYPY: ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
  MAX_BYTU: 4 * 1024 * 1024,

  zkontrolujSoubor(soubor) {
    if (!soubor) return { ok: false, chyba: 'Žádná fotka nebyla vybraná.' };
    if (soubor.size > this.MAX_BYTU) {
      return { ok: false, chyba: 'Fotka je moc velká. Zkus ji vyfotit znovu.' };
    }
    const typ = (soubor.type || '').toLowerCase();
    if (typ && !this.POVOLENE_TYPY.includes(typ)) {
      return { ok: false, chyba: 'Tohle není fotka. Vyber prosím obrázek.' };
    }
    return { ok: true };
  },

  // Zmenší fotku v prohlížeči, ať se rychle nahraje a nezabírá místo.
  // Rukopis zůstane čitelný — 1600 px na delší straně bohatě stačí.
  async zmensi(soubor, maxStrana = 1600) {
    try {
      const obrazek = await this._nactiObrazek(soubor);
      const delsi = Math.max(obrazek.width, obrazek.height);
      if (delsi <= maxStrana) return soubor;

      const pomer = maxStrana / delsi;
      const platno = document.createElement('canvas');
      platno.width = Math.round(obrazek.width * pomer);
      platno.height = Math.round(obrazek.height * pomer);
      platno.getContext('2d').drawImage(obrazek, 0, 0, platno.width, platno.height);

      const blob = await new Promise((hotovo) =>
        platno.toBlob(hotovo, 'image/jpeg', 0.85)
      );
      return blob && blob.size < soubor.size ? blob : soubor;
    } catch (e) {
      return soubor; // když se zmenšení nepovede, pošleme originál
    }
  },

  _nactiObrazek(soubor) {
    return new Promise((hotovo, chyba) => {
      const url = URL.createObjectURL(soubor);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        hotovo(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        chyba(new Error('nelze načíst'));
      };
      img.src = url;
    });
  },

  // Bez AI se z fotky nedá číst. Vrací se tedy stav „čeká na rodiče“.
  // Až bude AI k dispozici, doplní se sem její vyhodnocení.
  vysledekFotky(idFotky, zadani) {
    return {
      odevzdano: true,
      zpusob: 'foto',
      idFotky,
      zadani: zadani ? zadani.text : '',
      cekaNaRodice: true,
      povedlo: 'Napsala jsi úkol rukou a vyfotila ho. To je hotová práce.',
      oprava: null,
      hodnoceniRodice: null,
    };
  },

  // ─── Souhrn pro uložení ──────────────────────────────────────────────────

  souhrn(zadani, vysledek) {
    return {
      zadaniKlic: zadani ? zadani.klic : null,
      zadani: zadani ? zadani.text : '',
      odevzdano: !!(vysledek && vysledek.odevzdano),
      zpusob: vysledek ? vysledek.zpusob : null,
      text: vysledek && vysledek.zpusob === 'text' ? vysledek.text : null,
      idFotky: vysledek && vysledek.zpusob === 'foto' ? vysledek.idFotky : null,
      pocetVet: (vysledek && vysledek.pocetVet) || 0,
      pocetSlov: (vysledek && vysledek.pocetSlov) || 0,
      splnenoZadani: !!(vysledek && vysledek.splnenoZadani),
      povedlo: vysledek ? vysledek.povedlo : null,
      oprava: vysledek ? vysledek.oprava : null,
      cekaNaRodice: !!(vysledek && vysledek.cekaNaRodice),
      hodnoceniRodice: null,
    };
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = { Psani };
