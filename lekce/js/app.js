// ═══════════════════════════════════════════════════════════════════════════
// app.js — řízení denní lekce
//
// Lekce se nikdy nezobrazí celá najednou. Ami vidí vždy jen jeden krok:
// aktuální zadání, potřebný text nebo příklad, jednoduché odpovědi a tlačítko
// nápovědy. Nahoře je vidět, kde v lekci je.
//
// Rozpracovaná lekce se průběžně ukládá, takže zavřený iPad nic neztratí.
// ═══════════════════════════════════════════════════════════════════════════

const App = {
  stav: null,       // celý uložený stav (profil, pokrok, lekce…)
  lekce: null,      // právě běžící lekce
  krok: null,       // co je zrovna na obrazovce

  // ─── Kroky lekce ─────────────────────────────────────────────────────────
  KROKY: [
    { klic: 'uvitani', nazev: 'Start', ikona: '👋' },
    { klic: 'cteni', nazev: 'Čtení', ikona: '📖' },
    { klic: 'detektiv', nazev: 'Slova', ikona: '🔍', volitelny: true },
    { klic: 'otazky', nazev: 'Otázky', ikona: '💬' },
    { klic: 'psani', nazev: 'Psaní', ikona: '✏️' },
    { klic: 'matika', nazev: 'Počítání', ikona: '🧮' },
  ],

  // ═══════════════════════════════════════════════════════════════════════
  // START
  // ═══════════════════════════════════════════════════════════════════════

  async init() {
    Sound.init();
    this.napojOvladani();

    this.stav = await Storage.nacti();
    this.zobrazStavSpojeni();
    this.pouzijNastaveniVzhledu();

    // SUN se vykreslí na obou úvodních obrazovkách
    Postava.vloz(document.getElementById('sun-uvod'), 'klid', 128);
    Postava.vloz(document.getElementById('sun-domov'), 'klid', 56);

    if (!this.stav.profil) {
      this.prepni('screen-uvod');
      return;
    }
    this.zobrazDomov();
  },

  napojOvladani() {
    document.getElementById('form-profil').addEventListener('submit', (e) => {
      e.preventDefault();
      this.vytvorProfil();
    });
    document.getElementById('btn-zacit').addEventListener('click', () => this.zacniLekci());
    document.getElementById('btn-pokracovat').addEventListener('click', () => this.pokracujVLekci());
    document.getElementById('btn-zahodit').addEventListener('click', () => this.zahodRozpracovanou());
    document.getElementById('btn-pauza').addEventListener('click', () => this.nabidniPauzu());

    document.getElementById('footer-about').addEventListener('click', () => {
      this.predchoziObrazovka = document.querySelector('.screen.active').id;
      this.prepni('screen-about');
      this.vykresliQR();
    });
    document.getElementById('btn-about-zpet').addEventListener('click', () => {
      this.prepni(this.predchoziObrazovka || 'screen-domov');
    });
  },

  prepni(idObrazovky) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
    const cil = document.getElementById(idObrazovky);
    if (cil) cil.classList.add('active');
    window.scrollTo(0, 0);
  },

  // Nastavení přístupnosti se propíše do celé stránky
  pouzijNastaveniVzhledu() {
    const n = (this.stav && this.stav.nastaveni) || {};
    const koren = document.documentElement;
    koren.dataset.pismo = n.velikostPisma || 'stredni';
    koren.dataset.radkovani = n.radkovani || 'stredni';
    koren.dataset.motiv = n.tmavyRezim ? 'tma' : 'svetlo';
    if (n.vypnoutAnimace) koren.dataset.animace = 'vypnuto';
    else delete koren.dataset.animace;
  },

  zobrazStavSpojeni() {
    const box = document.getElementById('stav-spojeni');
    if (Storage.online) {
      box.hidden = true;
    } else {
      box.hidden = false;
      box.textContent = '📴 Teď jsi bez internetu. Pracuj klidně dál, všechno se uloží.';
    }
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PROFIL A DOMOV
  // ═══════════════════════════════════════════════════════════════════════

  vytvorProfil() {
    const jmeno = document.getElementById('vstup-jmeno').value.trim() || 'Ami';
    const vek = parseInt(document.getElementById('vstup-vek').value, 10) || 8;
    const trida = parseInt(document.getElementById('vstup-trida').value, 10) || 3;

    this.stav.profil = {
      jmeno,
      vek,
      trida,
      vychoziCtenarskaUroven: 1,
      ctenarskaUroven: 1,
      celkemHvezdicek: 0,
      milniky: [],
      prectene: {},
      posledniPsaci: [],
      zalozeno: new Date().toISOString(),
    };
    if (!this.stav.nastaveni) this.stav.nastaveni = Storage.vychoziNastaveni();

    Storage.uloz();
    this.zobrazDomov();
  },

  zobrazDomov() {
    const p = this.stav.profil;
    const dokoncene = (this.stav.lekce || []).filter((l) => l.dokoncena);

    document.getElementById('domov-pozdrav').textContent = `Ahoj, ${p.jmeno}!`;
    document.getElementById('domov-datum').textContent = this.dnesniDatum();
    document.getElementById('dlazdice-hvezdicky').textContent = p.celkemHvezdicek || 0;
    document.getElementById('dlazdice-serie').textContent = Hodnoceni.serie(this.stav.lekce);
    document.getElementById('dlazdice-lekce').textContent = dokoncene.length;

    // Rozpracovaná lekce
    const rozp = this.stav.rozpracovana;
    const boxPokracovat = document.getElementById('domov-pokracovat');
    const boxNova = document.getElementById('domov-nova');
    if (rozp && !rozp.dokoncena) {
      boxPokracovat.hidden = false;
      boxNova.hidden = true;
      const krok = this.KROKY.find((k) => k.klic === rozp.krok);
      document.getElementById('pokracovat-popis').textContent = krok
        ? `Skončily jsme u části „${krok.nazev}“.`
        : 'Můžeme pokračovat tam, kde jsme skončily.';
    } else {
      boxPokracovat.hidden = true;
      boxNova.hidden = false;
    }

    const coCeka = document.getElementById('domov-co-ceka');
    if (coCeka) coCeka.textContent = SUN.coDnesCeka(this.stav);

    this.vykresliMilniky();
    this.prepni('screen-domov');
  },

  vykresliMilniky() {
    const ziskane = (this.stav.profil.milniky || []);
    const karta = document.getElementById('karta-milniky');
    const mrizka = document.getElementById('milniky-mrizka');
    if (!ziskane.length) {
      karta.hidden = true;
      return;
    }
    karta.hidden = false;
    mrizka.innerHTML = '';
    ziskane.forEach((klic) => {
      const m = Hodnoceni.MILNIKY.find((x) => x.klic === klic);
      if (!m) return;
      const el = document.createElement('div');
      el.className = 'milnik';
      el.innerHTML = `<div class="milnik-ikona">${m.emoji}</div>
                      <div class="milnik-nazev">${m.nazev}</div>`;
      el.title = m.popis;
      mrizka.appendChild(el);
    });
  },

  dnesniDatum() {
    const dny = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'];
    const mesice = ['ledna', 'února', 'března', 'dubna', 'května', 'června',
                    'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'];
    const d = new Date();
    return `${dny[d.getDay()]} ${d.getDate()}. ${mesice[d.getMonth()]}`;
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ZALOŽENÍ LEKCE
  // ═══════════════════════════════════════════════════════════════════════

  zacniLekci() {
    const n = this.stav.nastaveni;
    const p = this.stav.profil;

    // Text ke čtení podle aktuální čtenářské úrovně
    const text = Texty.vyber(p.ctenarskaUroven || 1, p.prectene || {}, n.vypnutaTemata || []);

    this.lekce = {
      datum: new Date().toISOString(),
      dokoncena: false,
      energie: null,
      krok: 'uvitani',
      // Čtení
      textId: text.id,
      cteni: null,
      // Slovní detektiv
      detektiv: null,
      detektivIndex: 0,
      // Otázky
      otazkaIndex: 0,
      odpovedi: [],
      napovedyCteni: 0,
      // Psaní
      psaciZadani: null,
      psani: null,
      // Matematika
      matUlohy: null,
      matIndex: 0,
      matOdpovedi: [],
      // Průběžné počítání
      opraveneChyby: 0,
      pouziteNapovedy: 0,
      zacatek: new Date().toISOString(),
    };

    this._text = text;
    this.stav.rozpracovana = this.lekce;
    Storage.uloz();

    this.prepni('screen-lekce');
    this.zobrazKrok('uvitani');
  },

  pokracujVLekci() {
    this.lekce = this.stav.rozpracovana;
    this._text = Texty.SEZNAM.find((t) => t.id === this.lekce.textId) || Texty.SEZNAM[0];

    // Matematické úlohy se negenerují znovu — jsou uložené v lekci
    this.prepni('screen-lekce');
    this.ukazHlasku(SUN.poPauze());
    setTimeout(() => this.zobrazKrok(this.lekce.krok || 'uvitani'), 900);
  },

  zahodRozpracovanou() {
    if (!confirm('Opravdu začít úplně novou lekci? Rozdělaná práce se smaže.')) return;
    this.stav.rozpracovana = null;
    Storage.uloz();
    this.zobrazDomov();
  },

  ulozPrubeh() {
    if (!this.lekce) return;
    this.lekce.krok = this.krok;
    this.stav.rozpracovana = this.lekce;
    Storage.uloz();
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PRŮCHOD KROKY
  // ═══════════════════════════════════════════════════════════════════════

  zobrazKrok(klic) {
    this.krok = klic;
    this.ulozPrubeh();
    this.vykresliPostup();

    const obsah = document.getElementById('krok-obsah');
    obsah.innerHTML = '';

    switch (klic) {
      case 'uvitani': return this.krokUvitani(obsah);
      case 'cteni': return this.krokCteni(obsah);
      case 'detektiv': return this.krokDetektiv(obsah);
      case 'otazky': return this.krokOtazka(obsah);
      case 'psani': return this.krokPsani(obsah);
      case 'matika': return this.krokMatika(obsah);
      case 'zaver': return this.dokonciLekci();
    }
  },

  dalsiKrok() {
    const poradi = ['uvitani', 'cteni', 'detektiv', 'otazky', 'psani', 'matika', 'zaver'];
    let i = poradi.indexOf(this.krok) + 1;

    // Slovní detektiv se přeskočí, když pro dnešek není zařazený
    if (poradi[i] === 'detektiv' && (!this.lekce.detektiv || !this.lekce.detektiv.polozky.length)) {
      i++;
    }
    this.zobrazKrok(poradi[i]);
  },

  vykresliPostup() {
    const box = document.getElementById('postup-kroky');
    box.innerHTML = '';
    const poradi = ['uvitani', 'cteni', 'detektiv', 'otazky', 'psani', 'matika'];
    const aktualni = poradi.indexOf(this.krok);

    this.KROKY.forEach((k) => {
      // Přeskočený detektiv se v liště vůbec neukazuje
      if (k.klic === 'detektiv' && (!this.lekce.detektiv || !this.lekce.detektiv.polozky.length)) return;
      const index = poradi.indexOf(k.klic);
      const el = document.createElement('div');
      el.className = 'postup-krok';
      el.setAttribute('role', 'listitem');
      if (index < aktualni) el.classList.add('hotovy');
      if (index === aktualni) el.classList.add('aktivni');
      el.innerHTML = `<span class="krok-ikona">${index < aktualni ? '✓' : k.ikona}</span>
                      <span class="krok-nazev">${k.nazev}</span>`;
      box.appendChild(el);
    });

    // Pruh postupu
    const celkem = poradi.length - 1;
    const podil = Math.max(0, Math.min(1, aktualni / celkem));
    document.getElementById('postup-vypln').style.width = `${podil * 100}%`;
    this.aktualizujHvezdicky();
  },

  aktualizujHvezdicky() {
    if (!this.lekce) return;
    const h = Hodnoceni.spocitej(this.sestavLekciProHodnoceni());
    document.getElementById('lista-hvezdicky').textContent = `⭐ ${h.celkem}`;
  },

  // ═══════════════════════════════════════════════════════════════════════
  // KROK 1 — PŘIVÍTÁNÍ A ENERGIE
  // ═══════════════════════════════════════════════════════════════════════

  krokUvitani(obsah) {
    const p = this.stav.profil;
    const cislo = (this.stav.lekce || []).filter((l) => l.dokoncena).length + 1;

    obsah.appendChild(this.bublinaSUN(SUN.pozdrav(p.jmeno, cislo), 'start'));

    // Když je na co vzpomínat, SUN naváže na minulou lekci
    const vzpominka = SUN.vzpominkaNaMinule(this.stav);
    if (vzpominka) {
      const v = document.createElement('div');
      v.className = 'karta';
      v.innerHTML = `<p class="karta-text">${vzpominka}</p>`;
      obsah.appendChild(v);
    }

    const otazka = document.createElement('div');
    otazka.className = 'karta';
    otazka.innerHTML = `<div class="karta-nadpis">${SUN.otazkaNaEnergii()}</div>`;

    const volby = document.createElement('div');
    volby.className = 'volby-sloupec na-sirku';
    SUN.MOZNOSTI_ENERGIE.forEach((m) => {
      const btn = document.createElement('button');
      btn.className = 'volba-velka';
      btn.innerHTML = `<span class="volba-emoji">${m.emoji}</span><span>${m.text}</span>`;
      btn.addEventListener('click', () => {
        Sound.click();
        this.lekce.energie = m.klic;
        this.pripravLekciPodleEnergie(m.klic);
        // SUN hned zareaguje; u „unavená" se ztišení drží celou lekci
        // (řeší bublinaSUN podle lekce.energie)
        this.vyrazSUN(m.klic === 'unavena' ? 'unava' : m.klic === 'hodne' ? 'odmena' : 'spravne');
        this.ukazHlasku(SUN.reakceNaEnergii(m.klic));
        setTimeout(() => this.dalsiKrok(), 1400);
      });
      volby.appendChild(btn);
    });

    otazka.appendChild(volby);
    obsah.appendChild(otazka);
  },

  // Podle energie se upraví rozsah — ale čtení ani základní počítání
  // se nikdy nevynechá úplně.
  pripravLekciPodleEnergie(energie) {
    const n = this.stav.nastaveni;
    let pocetUloh = n.pocetMatUloh || 15;
    let detektivKusu = Cteni.pocetDetektiva(n, this.stav.pokrok);

    if (energie === 'unavena') {
      pocetUloh = Math.max(9, Math.round(pocetUloh * 0.6));
      detektivKusu = 0;
    } else if (energie === 'hodne') {
      detektivKusu = Math.max(detektivKusu, 3);
    }

    this.lekce.matUlohy = Matika.sestavSadu(this.stav.pokrok, { pocetMatUloh: pocetUloh });
    this.lekce.detektiv = {
      polozky: detektivKusu ? Texty.nahodnyDetektiv(detektivKusu) : [],
      odpovedi: [],
    };
    this.lekce.psaciZadani = Psani.vyberZadani(this._text, this.stav.profil.posledniPsaci);
    this.ulozPrubeh();
  },

  // ═══════════════════════════════════════════════════════════════════════
  // KROK 2 — ČTENÍ
  // ═══════════════════════════════════════════════════════════════════════

  krokCteni(obsah) {
    const text = this._text;
    obsah.appendChild(this.bublinaSUN(SUN.uvodCteni(text.nadpis), 'cteni'));

    // SUN řekne, proč si text vybrala — dítě pak nečte zadaný text,
    // ale něco, co jí někdo přinesl
    const proc = SUN.procTentoText(text.id);
    if (proc) {
      const p = document.createElement('div');
      p.className = 'karta';
      p.innerHTML = `<p class="karta-text">${proc}</p>`;
      obsah.appendChild(p);
    }

    // Pomůcky pro čtení
    const pomucky = document.createElement('div');
    pomucky.className = 'cteci-pomucky';
    pomucky.innerHTML = `
      <button class="pomucka-btn" id="btn-ukazovatko" aria-pressed="false">📏 Ukazovátko</button>
      <button class="pomucka-btn" id="btn-vetsi-pismo">🔍 Větší písmo</button>
    `;
    obsah.appendChild(pomucky);

    // Samotný text — po odstavcích a větách, aby šel zvýraznit řádek
    const karta = document.createElement('article');
    karta.className = 'karta text-ke-cteni';
    karta.innerHTML = `<h2 class="text-nadpis">${text.nadpis}</h2>`;

    Texty.odstavce(text.text).forEach((odstavec, iO) => {
      const p = document.createElement('p');
      p.className = 'text-odstavec';
      // Rozdělení na věty umožní zvýrazňovat právě čtenou část
      const vety = odstavec.match(/[^.!?]+[.!?]*/g) || [odstavec];
      vety.forEach((veta, iV) => {
        const span = document.createElement('span');
        span.className = 'veta';
        span.dataset.odstavec = iO;
        span.dataset.veta = iV;
        span.textContent = veta;
        span.addEventListener('click', () => this.zvyrazniVetu(span));
        p.appendChild(span);
      });
      karta.appendChild(p);
    });
    obsah.appendChild(karta);

    // Obtížná slova
    if (text.tezkaSlova && text.tezkaSlova.length) {
      const box = document.createElement('div');
      box.className = 'karta';
      box.innerHTML = `<div class="karta-nadpis">Těžší slova z textu</div>
                       <p class="karta-text">Klikni na slovo, když si s ním nevíš rady.</p>`;
      const seznam = document.createElement('div');
      seznam.className = 'tezka-slova';
      text.tezkaSlova.forEach((s) => {
        const btn = document.createElement('button');
        btn.className = 'tezke-slovo';
        btn.textContent = s.slovo;
        btn.addEventListener('click', () => this.ukazTezkeSlovo(s, btn));
        seznam.appendChild(btn);
      });
      box.appendChild(seznam);
      obsah.appendChild(box);
    }

    const dal = document.createElement('button');
    dal.className = 'tlacitko-hlavni';
    dal.textContent = 'Přečteno ➜';
    dal.addEventListener('click', () => {
      Sound.click();
      this.lekce.prectenoV = new Date().toISOString();
      const postreh = SUN.obcasnyPostreh('cteni');
      if (postreh) this.ukazHlasku(postreh);
      this.dalsiKrok();
    });
    obsah.appendChild(dal);

    // Napojení pomůcek
    document.getElementById('btn-ukazovatko').addEventListener('click', (e) => {
      const zapnuto = karta.classList.toggle('s-ukazovatkem');
      e.target.setAttribute('aria-pressed', String(zapnuto));
    });
    document.getElementById('btn-vetsi-pismo').addEventListener('click', () => {
      const poradi = ['stredni', 'velke', 'hodneVelke'];
      const ted = document.documentElement.dataset.pismo || 'stredni';
      const dalsi = poradi[(poradi.indexOf(ted) + 1) % poradi.length];
      document.documentElement.dataset.pismo = dalsi;
      this.stav.nastaveni.velikostPisma = dalsi;
      Storage.uloz();
    });
  },

  zvyrazniVetu(span) {
    const uz = span.classList.contains('ctena');
    document.querySelectorAll('.veta.ctena').forEach((v) => v.classList.remove('ctena'));
    if (!uz) {
      span.classList.add('ctena');
      this.lekce.opakovaneRadky = (this.lekce.opakovaneRadky || 0) + 1;
    }
  },

  ukazTezkeSlovo(slovo, tlacitko) {
    // Zaznamená se, že Ami slovo potřebovala — jde to do přehledu pro rodiče
    this.lekce.tezkaSlovaOznacena = this.lekce.tezkaSlovaOznacena || [];
    if (!this.lekce.tezkaSlovaOznacena.includes(slovo.slovo)) {
      this.lekce.tezkaSlovaOznacena.push(slovo.slovo);
    }
    this.ulozPrubeh();

    const stary = document.querySelector('.slovo-detail');
    if (stary) stary.remove();

    const detail = document.createElement('div');
    detail.className = 'slovo-detail';
    detail.innerHTML = `
      <div class="slovo-slabiky">${slovo.slabiky}</div>
      <div class="slovo-vyznam">${slovo.vyznam}</div>
      <button class="pomucka-btn" data-precist="1">🔊 Přečti mi ho</button>
    `;
    tlacitko.insertAdjacentElement('afterend', detail);

    detail.querySelector('[data-precist]').addEventListener('click', () => {
      this.precti(slovo.slabiky.replace(/-/g, ' '));
      this.lekce.prehranaSlova = this.lekce.prehranaSlova || [];
      this.lekce.prehranaSlova.push(slovo.slovo);
      this.ulozPrubeh();
    });
  },

  // Předčítání zadání — pomůcka, ne nahrávání hlasu
  precti(text) {
    if (!this.stav.nastaveni.hlasoveCteni) return;
    try {
      window.speechSynthesis.cancel();
      const rec = new SpeechSynthesisUtterance(text);
      rec.lang = 'cs-CZ';
      rec.rate = 0.85;
      window.speechSynthesis.speak(rec);
    } catch (e) {}
  },

  // ═══════════════════════════════════════════════════════════════════════
  // KROK 3 — SLOVNÍ DETEKTIV
  // ═══════════════════════════════════════════════════════════════════════

  krokDetektiv(obsah) {
    const d = this.lekce.detektiv;
    const i = this.lekce.detektivIndex || 0;

    if (i === 0) obsah.appendChild(this.bublinaSUN(SUN.uvodDetektiva()));

    const polozka = d.polozky[i];
    if (!polozka) return this.dalsiKrok();

    const karta = document.createElement('div');
    karta.className = 'karta';
    karta.innerHTML = `
      <div class="pocitadlo-maly">${i + 1} z ${d.polozky.length}</div>
      <div class="detektiv-veta">${polozka.veta.replace('___', '<span class="mezera">_____</span>')}</div>
    `;

    const volby = document.createElement('div');
    volby.className = 'volby-radek';
    const zamichane = [...polozka.dvojice].sort(() => Math.random() - 0.5);
    zamichane.forEach((slovo) => {
      const btn = document.createElement('button');
      btn.className = 'volba-slovo';
      btn.textContent = slovo;
      btn.addEventListener('click', () => {
        const spravne = Cteni.vyhodnotDetektiva(polozka, slovo);
        this.odpovedDetektiv(spravne, polozka, btn, karta);
      });
      volby.appendChild(btn);
    });
    karta.appendChild(volby);
    obsah.appendChild(karta);
  },

  odpovedDetektiv(spravne, polozka, tlacitko, karta) {
    karta.querySelectorAll('.volba-slovo').forEach((b) => (b.disabled = true));
    tlacitko.classList.add(spravne ? 'spravne' : 'nespravne');

    if (spravne) Sound.correct();
    else Sound.wrong();

    this.lekce.detektiv.odpovedi.push({ zamena: polozka.zamena, spravne });

    // Záměna písmen se sleduje jako samostatná dovednost
    Pokrok.zaznamenej(this.stav.pokrok, 'zamena-pismen', { spravne, stupenNapovedy: 0 });

    const zprava = document.createElement('div');
    zprava.className = 'zpetna-vazba ' + (spravne ? 'kladna' : 'jemna');
    if (spravne) {
      zprava.textContent = 'Přesně tak.';
    } else {
      const spravneSlovo = polozka.spravne;
      karta.querySelectorAll('.volba-slovo').forEach((b) => {
        if (b.textContent === spravneSlovo) b.classList.add('spravne');
      });
      zprava.textContent = `Do věty patří „${spravneSlovo}“. Podívej se na celé slovo až do konce.`;
    }
    karta.appendChild(zprava);

    setTimeout(() => {
      this.lekce.detektivIndex = (this.lekce.detektivIndex || 0) + 1;
      this.ulozPrubeh();
      if (this.lekce.detektivIndex >= this.lekce.detektiv.polozky.length) this.dalsiKrok();
      else this.zobrazKrok('detektiv');
    }, spravne ? 900 : 2200);
  },

  // ═══════════════════════════════════════════════════════════════════════
  // KROK 4 — OTÁZKY K TEXTU (po jedné)
  // ═══════════════════════════════════════════════════════════════════════

  krokOtazka(obsah) {
    const text = this._text;
    const i = this.lekce.otazkaIndex || 0;

    if (i >= text.otazky.length) {
      this.lekce.cteni = Cteni.souhrn(text, this.lekce.odpovedi, {
        napovedy: this.lekce.napovedyCteni,
        prehranaSlova: this.lekce.prehranaSlova,
        opakovaneRadky: this.lekce.opakovaneRadky,
        tezkaSlovaOznacena: this.lekce.tezkaSlovaOznacena,
      });
      // Výsledky slovního detektiva patří k témuž souhrnu
      const d = this.lekce.detektiv;
      if (d && d.polozky.length) {
        this.lekce.cteni.detektiv = {
          celkem: d.polozky.length,
          spravne: d.odpovedi.filter((o) => o.spravne).length,
        };
      }
      this.ulozPrubeh();
      return this.dalsiKrok();
    }

    if (i === 0) obsah.appendChild(this.bublinaSUN(SUN.uvodOtazek()));

    const otazka = text.otazky[i];
    const karta = document.createElement('div');
    karta.className = 'karta';
    karta.innerHTML = `
      <div class="pocitadlo-maly">Otázka ${i + 1} z ${text.otazky.length}</div>
      <div class="otazka-text">${otazka.otazka}</div>
    `;

    const pole = document.createElement('textarea');
    pole.className = 'vstup-veta';
    pole.rows = 3;
    pole.placeholder = 'Napiš odpověď celou větou…';
    pole.setAttribute('aria-label', otazka.otazka);
    karta.appendChild(pole);

    // Nápovědy — nikdy neprozradí rovnou celou odpověď
    const pomoc = document.createElement('div');
    pomoc.className = 'pomoc-radek';
    const btnNapoveda = document.createElement('button');
    btnNapoveda.className = 'pomucka-btn';
    btnNapoveda.textContent = '💡 Malá nápověda';
    btnNapoveda.addEventListener('click', () => {
      this.lekce.napovedyCteni = (this.lekce.napovedyCteni || 0) + 1;
      this.lekce.pouziteNapovedy = (this.lekce.pouziteNapovedy || 0) + 1;
      this.ulozPrubeh();
      btnNapoveda.disabled = true;
      const n = document.createElement('div');
      n.className = 'napoveda-box';
      n.textContent = otazka.napoveda;
      pomoc.insertAdjacentElement('afterend', n);
    });
    pomoc.appendChild(btnNapoveda);

    if (otazka.odstavec !== null && otazka.odstavec !== undefined) {
      const btnOdstavec = document.createElement('button');
      btnOdstavec.className = 'pomucka-btn';
      btnOdstavec.textContent = '📖 Ukázat správný odstavec';
      btnOdstavec.addEventListener('click', () => {
        this.lekce.napovedyCteni = (this.lekce.napovedyCteni || 0) + 1;
        this.ulozPrubeh();
        btnOdstavec.disabled = true;
        const odst = Texty.odstavce(text.text)[otazka.odstavec];
        const n = document.createElement('div');
        n.className = 'napoveda-box odstavec';
        n.textContent = odst;
        pomoc.insertAdjacentElement('afterend', n);
      });
      pomoc.appendChild(btnOdstavec);
    }

    const btnJinak = document.createElement('button');
    btnJinak.className = 'pomucka-btn';
    btnJinak.textContent = '🔄 Vysvětlit otázku jinak';
    btnJinak.addEventListener('click', () => {
      btnJinak.disabled = true;
      const n = document.createElement('div');
      n.className = 'napoveda-box';
      n.textContent = this.prepisOtazku(otazka);
      pomoc.insertAdjacentElement('afterend', n);
    });
    pomoc.appendChild(btnJinak);

    karta.appendChild(pomoc);

    const odeslat = document.createElement('button');
    odeslat.className = 'tlacitko-hlavni';
    odeslat.textContent = 'Odpovědět';
    odeslat.addEventListener('click', () => this.odpovezNaOtazku(otazka, pole.value, karta, odeslat));
    karta.appendChild(odeslat);

    obsah.appendChild(karta);
    setTimeout(() => pole.focus(), 100);
  },

  prepisOtazku(otazka) {
    switch (otazka.typ) {
      case 'z-textu':
        return 'Tahle odpověď je přímo v textu — stačí ji najít a napsat vlastní větou.';
      case 'vlastnimi-slovy':
        return 'Nejde o to text opsat. Řekni to tak, jak bys to vyprávěla kamarádce.';
      case 'proc-jak':
        return 'Zamysli se nad důvodem. Proč se to tak děje? Co by se stalo, kdyby ne?';
      case 'nazor':
        return 'Tady není správná odpověď. Zajímá mě, co si myslíš ty.';
      default:
        return 'Zkus odpovědět jednou celou větou.';
    }
  },

  odpovezNaOtazku(otazka, hodnota, karta, tlacitko) {
    const vysledek = Cteni.vyhodnot(otazka, hodnota);
    vysledek.text = String(hodnota || '').trim();

    // Prázdnou odpověď nebereme jako pokus — jen jemně vyzveme
    if (vysledek.stav === Cteni.STAV.PRAZDNE) {
      this.ukazHlasku(SUN.reakceNaOdpoved(vysledek.stav, vysledek.chybiVete));
      return;
    }

    tlacitko.disabled = true;
    const zprava = document.createElement('div');
    const kladna = [
      Cteni.STAV.SPRAVNE_CELA_VETA,
      Cteni.STAV.NAZOR_OK,
    ].includes(vysledek.stav);
    zprava.className = 'zpetna-vazba ' + (kladna ? 'kladna' : 'jemna');
    zprava.textContent = SUN.bezpecne(SUN.reakceNaOdpoved(vysledek.stav, vysledek.chybiVete));
    karta.appendChild(zprava);

    if (kladna) Sound.correct();

    // Když chybí jen celá věta, dáme šanci odpověď doplnit
    const muzeDoplnit =
      vysledek.stav === Cteni.STAV.SPRAVNE_NEUPLNA ||
      vysledek.stav === Cteni.STAV.CASTECNE ||
      vysledek.stav === Cteni.STAV.NAZOR_KRATKY;

    if (muzeDoplnit && !this.lekce._uzDoplnovala) {
      const znovu = document.createElement('button');
      znovu.className = 'tlacitko-druhotne';
      znovu.textContent = '✏️ Zkusit to celou větou';
      znovu.addEventListener('click', () => {
        this.lekce._uzDoplnovala = true;
        znovu.remove();
        zprava.remove();
        tlacitko.disabled = false;
        karta.querySelector('.vstup-veta').focus();
      });
      karta.appendChild(znovu);
    }

    const dal = document.createElement('button');
    dal.className = 'tlacitko-hlavni';
    dal.textContent = 'Další ➜';
    dal.addEventListener('click', () => {
      this.lekce._uzDoplnovala = false;
      this.lekce.odpovedi[this.lekce.otazkaIndex] = vysledek;
      this.lekce.otazkaIndex = (this.lekce.otazkaIndex || 0) + 1;
      this.ulozPrubeh();
      this.zobrazKrok('otazky');
    });
    karta.appendChild(dal);
  },

  // ═══════════════════════════════════════════════════════════════════════
  // KROK 5 — PSANÍ
  // ═══════════════════════════════════════════════════════════════════════

  krokPsani(obsah) {
    const zadani = this.lekce.psaciZadani;
    obsah.appendChild(this.bublinaSUN(SUN.uvodPsani()));

    const karta = document.createElement('div');
    karta.className = 'karta';
    karta.innerHTML = `
      <div class="karta-nadpis">Dnešní psaní</div>
      <div class="zadani-psani">${zadani.text}</div>
      <div class="zadani-pomoc">${zadani.pomoc}</div>
    `;

    // Přepínač: psát rovnou, nebo vyfotit papír
    const prepinac = document.createElement('div');
    prepinac.className = 'volby-radek';
    prepinac.innerHTML = `
      <button class="volba-zpusob aktivni" data-zpusob="text">⌨️ Napíšu to tady</button>
      <button class="volba-zpusob" data-zpusob="foto">📷 Napíšu na papír</button>
    `;
    karta.appendChild(prepinac);

    // Varianta A — psaní do aplikace
    const boxText = document.createElement('div');
    boxText.className = 'psani-varianta';
    const pole = document.createElement('textarea');
    pole.className = 'vstup-veta velky';
    pole.rows = 6;
    pole.placeholder = 'Piš sem…';
    pole.setAttribute('aria-label', zadani.text);
    boxText.appendChild(pole);

    const pocitadlo = document.createElement('div');
    pocitadlo.className = 'pocitadlo-slov';
    boxText.appendChild(pocitadlo);
    pole.addEventListener('input', () => {
      const slov = pole.value.trim().split(/\s+/).filter(Boolean).length;
      const vet = Psani.vety(pole.value).length;
      pocitadlo.textContent = slov ? `${slov} slov · ${vet} ${vet === 1 ? 'věta' : 'věty'}` : '';
    });
    karta.appendChild(boxText);

    // Varianta B — fotka papíru
    const boxFoto = document.createElement('div');
    boxFoto.className = 'psani-varianta';
    boxFoto.hidden = true;
    boxFoto.innerHTML = `
      <p class="karta-text">Napiš úkol na papír a vyfoť ho. Fotka se uloží tak,
      že ji uvidíš jen ty a rodiče.</p>
      <label class="foto-tlacitko">
        📷 Vyfotit nebo vybrat fotku
        <input type="file" accept="image/*" capture="environment" id="vstup-foto" hidden>
      </label>
      <div id="foto-nahled" class="foto-nahled" hidden></div>
    `;
    karta.appendChild(boxFoto);

    if (!this.stav.nastaveni.povolitFotky) {
      prepinac.querySelector('[data-zpusob="foto"]').hidden = true;
    }

    prepinac.querySelectorAll('.volba-zpusob').forEach((btn) => {
      btn.addEventListener('click', () => {
        prepinac.querySelectorAll('.volba-zpusob').forEach((b) => b.classList.remove('aktivni'));
        btn.classList.add('aktivni');
        const jeFoto = btn.dataset.zpusob === 'foto';
        boxText.hidden = jeFoto;
        boxFoto.hidden = !jeFoto;
      });
    });

    boxFoto.querySelector('#vstup-foto').addEventListener('change', (e) => {
      this.nahrajFotkuPsani(e.target.files[0], boxFoto, karta);
    });

    const odeslat = document.createElement('button');
    odeslat.className = 'tlacitko-hlavni';
    odeslat.textContent = 'Hotovo ➜';
    odeslat.addEventListener('click', () => {
      if (!boxText.hidden) this.odevzdejPsaniText(pole.value, zadani, karta, odeslat);
      else if (!this.lekce.psani) this.ukazHlasku('Zatím tu žádná fotka není. Vyfoť papír, nebo přepni na psaní.');
      else this.pokracujPoPsani();
    });
    karta.appendChild(odeslat);

    // Psaní se dá i přeskočit — nemá smysl tlačit
    const preskocit = document.createElement('button');
    preskocit.className = 'tlacitko-textove';
    preskocit.textContent = 'Dneska psát nebudu';
    preskocit.addEventListener('click', () => {
      this.lekce.psani = Psani.souhrn(zadani, { odevzdano: false });
      this.ulozPrubeh();
      this.dalsiKrok();
    });
    karta.appendChild(preskocit);

    obsah.appendChild(karta);
  },

  odevzdejPsaniText(hodnota, zadani, karta, tlacitko) {
    const vysledek = Psani.vyhodnot(hodnota, zadani);
    if (vysledek.prazdne) {
      this.ukazHlasku(vysledek.oprava);
      return;
    }

    tlacitko.disabled = true;
    this.lekce.psani = Psani.souhrn(zadani, vysledek);
    this.zapamatujPsaciZadani(zadani.klic);
    this.ulozPrubeh();
    Sound.correct();

    // Zpětná vazba v pořadí: co se povedlo → jedna oprava → povzbuzení
    const box = document.createElement('div');
    box.className = 'zpetna-vazba-psani';
    // Než přijde hodnocení, SUN si všimne něčeho konkrétního na textu
    const vsimla = SUN.vsimniSiPsani(vysledek.text);
    if (vsimla) {
      const v = document.createElement('p');
      v.className = 'vazba-povzbuzeni';
      v.textContent = vsimla;
      box.appendChild(v);
    }
    SUN.zpetnaVazbaPsani(vysledek).forEach((radek, i) => {
      const p = document.createElement('p');
      p.className = i === 0 ? 'vazba-kladna' : i === 1 && vysledek.oprava ? 'vazba-oprava' : 'vazba-povzbuzeni';
      p.textContent = radek;
      box.appendChild(p);
    });
    karta.appendChild(box);

    const dal = document.createElement('button');
    dal.className = 'tlacitko-hlavni';
    dal.textContent = 'Pokračovat ➜';
    dal.addEventListener('click', () => this.pokracujPoPsani());
    karta.appendChild(dal);
  },

  async nahrajFotkuPsani(soubor, boxFoto, karta) {
    const kontrola = Psani.zkontrolujSoubor(soubor);
    if (!kontrola.ok) {
      this.ukazHlasku(kontrola.chyba);
      return;
    }

    const nahled = boxFoto.querySelector('#foto-nahled');
    nahled.hidden = false;
    nahled.innerHTML = '<div class="nacitani">Ukládám fotku…</div>';

    const zmenseny = await Psani.zmensi(soubor);
    const vysledek = await Storage.nahrajFotku(zmenseny);

    if (!vysledek.ok) {
      nahled.innerHTML = `<div class="zpetna-vazba jemna">${vysledek.chyba}</div>`;
      return;
    }

    this.lekce.psani = Psani.souhrn(this.lekce.psaciZadani, Psani.vysledekFotky(vysledek.id, this.lekce.psaciZadani));
    this.zapamatujPsaciZadani(this.lekce.psaciZadani.klic);
    this.ulozPrubeh();
    Sound.correct();

    const url = URL.createObjectURL(zmenseny);
    nahled.innerHTML = `
      <img src="${url}" alt="Tvoje napsaná práce" class="foto-obrazek">
      <div class="zpetna-vazba kladna">${vysledek.cekaNaOdeslani
        ? 'Fotku mám. Odešlu ji, jakmile bude internet.'
        : SUN.fotkaUlozena()}</div>
    `;
  },

  zapamatujPsaciZadani(klic) {
    const p = this.stav.profil;
    p.posledniPsaci = [klic, ...(p.posledniPsaci || [])].slice(0, 5);
  },

  pokracujPoPsani() {
    this.dalsiKrok();
  },

  // ═══════════════════════════════════════════════════════════════════════
  // KROK 6 — MATEMATIKA (po třech úlohách)
  // ═══════════════════════════════════════════════════════════════════════

  krokMatika(obsah) {
    const ulohy = this.lekce.matUlohy || [];
    const i = this.lekce.matIndex || 0;

    if (i >= ulohy.length) {
      this.sestavMatematickySouhrn();
      return this.dalsiKrok();
    }

    if (i === 0) obsah.appendChild(this.bublinaSUN(SUN.uvodMatiky(ulohy.length)));

    // Po každé trojici krátká pauza s přehledem
    if (i > 0 && i % 3 === 0 && !this.lekce._pauzaZobrazena) {
      this.lekce._pauzaZobrazena = true;
      return this.zobrazMeziPauzu(obsah, i, ulohy.length);
    }
    this.lekce._pauzaZobrazena = false;

    const uloha = ulohy[i];
    obsah.appendChild(this.vykresliUlohu(uloha, i, ulohy.length));
  },

  zobrazMeziPauzu(obsah, hotovo, celkem) {
    const spravne = this.lekce.matOdpovedi.filter((o) => o && o.spravne).length;
    const karta = document.createElement('div');
    karta.className = 'karta zvyraznena';
    karta.innerHTML = `
      <div class="karta-nadpis">Máš za sebou ${hotovo} úloh</div>
      <p class="karta-text">Zatím správně: ${spravne} z ${hotovo}. Zbývá ${celkem - hotovo}.</p>
    `;
    const dal = document.createElement('button');
    dal.className = 'tlacitko-hlavni';
    dal.textContent = 'Jdeme dál ➜';
    dal.addEventListener('click', () => this.zobrazKrok('matika'));
    karta.appendChild(dal);
    obsah.appendChild(karta);
  },

  vykresliUlohu(uloha, index, celkem) {
    const karta = document.createElement('div');
    karta.className = 'karta uloha-karta';
    karta.innerHTML = `<div class="pocitadlo-maly">Úloha ${index + 1} z ${celkem}</div>`;

    // Slovní úlohy se nejdřív rozeberou: co víme → co zjistit → jaká operace
    if (uloha.typ === 'slovni' || uloha.typ === 'volba-operace') {
      return this.vykresliSlovniUlohu(uloha, karta, index, celkem);
    }

    const zadani = document.createElement('div');
    zadani.className = 'uloha-zadani';
    zadani.textContent = uloha.zadani;
    karta.appendChild(zadani);

    if (uloha.typ === 'volba') {
      const volby = document.createElement('div');
      volby.className = 'volby-radek';
      uloha.volby.forEach((v) => {
        const btn = document.createElement('button');
        btn.className = 'volba-znak';
        btn.textContent = v;
        btn.addEventListener('click', () => this.odpovezMatika(uloha, v, karta));
        volby.appendChild(btn);
      });
      karta.appendChild(volby);
    } else {
      const obal = document.createElement('div');
      obal.className = 'vstup-cislo-obal';
      const pole = document.createElement('input');
      pole.type = 'number';
      pole.inputMode = 'numeric';
      pole.className = 'vstup-cislo';
      pole.setAttribute('aria-label', uloha.zadani);
      obal.appendChild(pole);

      const odeslat = document.createElement('button');
      odeslat.className = 'tlacitko-hlavni';
      odeslat.textContent = 'Odpovědět';
      odeslat.addEventListener('click', () => {
        if (pole.value === '') return;
        this.odpovezMatika(uloha, pole.value, karta);
      });
      pole.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && pole.value !== '') this.odpovezMatika(uloha, pole.value, karta);
      });

      karta.appendChild(obal);
      karta.appendChild(odeslat);
      setTimeout(() => pole.focus(), 100);
    }

    karta.appendChild(this.vykresliNapovedy(uloha, karta));
    return karta;
  },

  vykresliSlovniUlohu(uloha, karta, index, celkem) {
    const zadani = document.createElement('div');
    zadani.className = 'uloha-slovni';
    zadani.textContent = uloha.zadani;
    karta.appendChild(zadani);

    const cist = document.createElement('button');
    cist.className = 'pomucka-btn';
    cist.textContent = '🔊 Přečti mi zadání';
    cist.addEventListener('click', () => this.precti(uloha.zadani));
    karta.appendChild(cist);

    // Krok 1 — co už víme
    const krok1 = document.createElement('div');
    krok1.className = 'slovni-krok';
    krok1.innerHTML = `<div class="krok-titulek">Co už víme?</div>
      <ul class="krok-seznam">${(uloha.podotazky.coVime || []).map((v) => `<li>${v}</li>`).join('')}</ul>
      <div class="krok-titulek">Co máme zjistit?</div>
      <p class="krok-text">${uloha.podotazky.coZjistit}</p>`;
    karta.appendChild(krok1);

    // Krok 2 — jaká operace
    const krok2 = document.createElement('div');
    krok2.className = 'slovni-krok';
    krok2.innerHTML = '<div class="krok-titulek">Budeme přidávat, ubírat, tvořit stejné skupiny, nebo rozdělovat?</div>';
    const volby = document.createElement('div');
    volby.className = 'volby-sloupec';
    ['přidávat', 'ubírat', 'tvořit stejné skupiny', 'rozdělovat'].forEach((op) => {
      const btn = document.createElement('button');
      btn.className = 'volba-operace';
      btn.textContent = op;
      btn.addEventListener('click', () => this.zvolOperaci(uloha, op, karta, volby));
      volby.appendChild(btn);
    });
    krok2.appendChild(volby);
    karta.appendChild(krok2);

    karta.appendChild(this.vykresliNapovedy(uloha, karta));
    return karta;
  },

  zvolOperaci(uloha, zvolena, karta, volby) {
    const spravna = uloha.operace;
    const ok = Matika.zkontrolujOperaci(uloha, zvolena);

    volby.querySelectorAll('.volba-operace').forEach((b) => {
      b.disabled = true;
      if (b.textContent === spravna) b.classList.add('spravne');
      else if (b.textContent === zvolena) b.classList.add('nespravne');
    });

    this.lekce.spravnaOperace = (this.lekce.spravnaOperace || 0) + (ok ? 1 : 0);
    Pokrok.zaznamenej(this.stav.pokrok, 'volba-operace', { spravne: ok, stupenNapovedy: 0 });

    const zprava = document.createElement('div');
    zprava.className = 'zpetna-vazba ' + (ok ? 'kladna' : 'jemna');
    zprava.textContent = ok
      ? 'Ano, přesně tak. Teď to spočítáme.'
      : `Tady budeme ${spravna}. Pojďme to spolu spočítat.`;
    karta.appendChild(zprava);

    // Teprve teď se počítá
    const obal = document.createElement('div');
    obal.className = 'vstup-cislo-obal';
    const pole = document.createElement('input');
    pole.type = 'number';
    pole.inputMode = 'numeric';
    pole.className = 'vstup-cislo';
    pole.setAttribute('aria-label', 'Výsledek');
    obal.appendChild(pole);
    karta.appendChild(obal);

    const odeslat = document.createElement('button');
    odeslat.className = 'tlacitko-hlavni';
    odeslat.textContent = 'Odpovědět';
    odeslat.addEventListener('click', () => {
      if (pole.value === '') return;
      this.odpovezMatika(uloha, pole.value, karta);
    });
    karta.appendChild(odeslat);
    setTimeout(() => pole.focus(), 100);
  },

  // ─── Nápovědy: tři stupně ────────────────────────────────────────────────

  vykresliNapovedy(uloha, karta) {
    const box = document.createElement('div');
    box.className = 'napovedy-blok';
    let stupen = 0;

    const btn = document.createElement('button');
    btn.className = 'pomucka-btn napoveda-tlacitko';
    btn.textContent = '💡 Poradíš mi?';
    btn.addEventListener('click', () => {
      stupen++;
      this.lekce._stupenNapovedy = stupen;
      this.lekce.pouziteNapovedy = (this.lekce.pouziteNapovedy || 0) + 1;
      this.ulozPrubeh();

      this.vyrazSUN('napoveda');
      const napoveda = uloha.napovedy[stupen - 1];
      const el = document.createElement('div');
      el.className = 'napoveda-box';

      if (napoveda && napoveda.typ === 'podobny') {
        el.innerHTML = `<div class="napoveda-titulek">${SUN.uvodNapovedy(3)}</div>
                        <div class="podobny-priklad">${napoveda.priklad}</div>
                        <div class="podobny-vysvetleni">${napoveda.vysvetleni}</div>`;
      } else {
        el.innerHTML = `<div class="napoveda-titulek">${SUN.uvodNapovedy(stupen)}</div>
                        <div>${napoveda}</div>`;
      }
      box.insertBefore(el, btn);

      // Po druhém stupni nabídneme názornou ukázku, pokud ji úloha má
      if (stupen === 2 && uloha.vizualizace) {
        const viz = this.vykresliVizualizaci(uloha.vizualizace);
        if (viz) box.insertBefore(viz, btn);
      }

      if (stupen >= 3) {
        btn.disabled = true;
        btn.textContent = 'Víc už neporadím — zkus to 🙂';
      } else {
        btn.textContent = stupen === 1 ? '💡 Ještě první krok' : '💡 Ukaž podobný příklad';
      }
    });

    box.appendChild(btn);
    return box;
  },

  // ─── Názorné vizualizace ─────────────────────────────────────────────────

  vykresliVizualizaci(viz) {
    const box = document.createElement('div');
    box.className = 'vizualizace';

    switch (viz.druh) {
      case 'desitka': {
        // Krabička na deset vajíček — kolik je plných a kolik chybí
        box.innerHTML = '<div class="viz-titulek">Krabička na deset</div>';
        const mrizka = document.createElement('div');
        mrizka.className = 'viz-desitka';
        for (let i = 0; i < 10; i++) {
          const p = document.createElement('div');
          p.className = 'viz-policko' + (i < viz.zaklad ? ' plne' : '');
          mrizka.appendChild(p);
        }
        box.appendChild(mrizka);
        const popis = document.createElement('div');
        popis.className = 'viz-popis';
        popis.textContent = `Plných je ${viz.zaklad}, prázdných zbývá ${10 - viz.zaklad}.`;
        box.appendChild(popis);
        return box;
      }

      case 'prechod-nahoru': {
        box.innerHTML = `
          <div class="viz-titulek">Cesta přes desítku</div>
          <div class="viz-kroky">
            <div class="viz-krok">${viz.a} + <strong>${viz.doDesitky}</strong> = 10</div>
            <div class="viz-sipka">↓</div>
            <div class="viz-krok">10 + <strong>${viz.zbytek}</strong> = ?</div>
          </div>
          <div class="viz-popis">Z ${viz.b} si vezmeme ${viz.doDesitky} na desítku, zbyde ${viz.zbytek}.</div>`;
        return box;
      }

      case 'prechod-dolu': {
        box.innerHTML = `
          <div class="viz-titulek">Nejdřív dolů na desítku</div>
          <div class="viz-kroky">
            <div class="viz-krok">${viz.a} − <strong>${viz.naDesitku}</strong> = ${viz.mezikrok}</div>
            <div class="viz-sipka">↓</div>
            <div class="viz-krok">${viz.mezikrok} − <strong>${viz.zbytek}</strong> = ?</div>
          </div>`;
        return box;
      }

      case 'rozklad-druheho':
      case 'rozklad-druheho-minus': {
        const znak = viz.druh === 'rozklad-druheho' ? '+' : '−';
        const mezi = viz.druh === 'rozklad-druheho' ? viz.a + viz.desB : viz.a - viz.desB;
        box.innerHTML = `
          <div class="viz-titulek">Po desítkách, potom po jednotkách</div>
          <div class="viz-kroky">
            <div class="viz-krok">${viz.a} ${znak} <strong>${viz.desB}</strong> = ${mezi}</div>
            <div class="viz-sipka">↓</div>
            <div class="viz-krok">${mezi} ${znak} <strong>${viz.jedB}</strong> = ?</div>
          </div>`;
        return box;
      }

      case 'desitky': {
        box.innerHTML = `<div class="viz-titulek">Počítáme po desítkách</div>`;
        const radek = document.createElement('div');
        radek.className = 'viz-desitky';
        for (let i = 0; i < viz.a; i++) radek.appendChild(this._sloupecDeseti('a'));
        const plus = document.createElement('div');
        plus.className = 'viz-znak';
        plus.textContent = '+';
        radek.appendChild(plus);
        for (let i = 0; i < viz.b; i++) radek.appendChild(this._sloupecDeseti('b'));
        box.appendChild(radek);
        const popis = document.createElement('div');
        popis.className = 'viz-popis';
        popis.textContent = `${viz.a} desítky a ${viz.b} desítky je ${viz.a + viz.b} desítek.`;
        box.appendChild(popis);
        return box;
      }

      case 'skupiny': {
        box.innerHTML = `<div class="viz-titulek">${viz.pocetSkupin}× po ${viz.vSkupine}</div>`;
        const mrizka = document.createElement('div');
        mrizka.className = 'viz-skupiny';
        for (let s = 0; s < viz.pocetSkupin; s++) {
          const skupina = document.createElement('div');
          skupina.className = 'viz-skupina';
          for (let k = 0; k < viz.vSkupine; k++) {
            const tecka = document.createElement('span');
            tecka.className = 'viz-tecka';
            skupina.appendChild(tecka);
          }
          mrizka.appendChild(skupina);
        }
        box.appendChild(mrizka);
        return box;
      }

      case 'rozdeleni': {
        box.innerHTML = `<div class="viz-titulek">${viz.celkem} rozdělíme po ${viz.doSkupin}</div>`;
        const mrizka = document.createElement('div');
        mrizka.className = 'viz-skupiny';
        const skupin = viz.celkem / viz.doSkupin;
        for (let s = 0; s < skupin; s++) {
          const skupina = document.createElement('div');
          skupina.className = 'viz-skupina';
          for (let k = 0; k < viz.doSkupin; k++) {
            const tecka = document.createElement('span');
            tecka.className = 'viz-tecka';
            skupina.appendChild(tecka);
          }
          mrizka.appendChild(skupina);
        }
        box.appendChild(mrizka);
        const popis = document.createElement('div');
        popis.className = 'viz-popis';
        popis.textContent = 'Spočítej, kolik skupin ti vyšlo.';
        box.appendChild(popis);
        return box;
      }

      case 'dopocitani': {
        box.innerHTML = `
          <div class="viz-titulek">Obráceně: kolik přidat?</div>
          <div class="viz-kroky">
            <div class="viz-krok">${viz.mensi} + ? = ${viz.vetsi}</div>
          </div>
          <div class="viz-popis">Když najdeš, kolik chybí, máš výsledek.</div>`;
        return box;
      }

      case 'rozklad': {
        box.innerHTML = `
          <div class="viz-titulek">Celek a jeho části</div>
          <div class="viz-rozklad">
            <div class="viz-celek">${viz.celek}</div>
            <div class="viz-sipky">╱ ╲</div>
            <div class="viz-casti"><span>${viz.cast}</span><span>?</span></div>
          </div>`;
        return box;
      }

      case 'osa': {
        box.innerHTML = `<div class="viz-titulek">Číselná osa</div>`;
        const osa = document.createElement('div');
        osa.className = 'viz-osa';
        for (let i = 0; i < viz.pocet; i++) {
          const bod = document.createElement('div');
          bod.className = 'viz-bod' + (i === viz.pozice ? ' hledany' : '');
          bod.textContent = i === viz.pozice ? '?' : viz.start + i * viz.krok;
          osa.appendChild(bod);
        }
        box.appendChild(osa);
        return box;
      }

      default:
        return null;
    }
  },

  _sloupecDeseti(trida) {
    const s = document.createElement('div');
    s.className = 'viz-sloupec ' + trida;
    for (let i = 0; i < 10; i++) {
      const t = document.createElement('span');
      t.className = 'viz-tecka mala';
      s.appendChild(t);
    }
    return s;
  },

  // ─── Vyhodnocení matematické odpovědi ────────────────────────────────────

  odpovezMatika(uloha, odpoved, karta) {
    const spravne = Matika.zkontroluj(uloha, odpoved);
    const stupenNapovedy = this.lekce._stupenNapovedy || 0;
    const uzChybovala = !!this.lekce._chybaVTeto;

    karta.querySelectorAll('button, input').forEach((el) => (el.disabled = true));

    if (spravne) {
      Sound.correct();
      this.lekce._serie = (this.lekce._serie || 0) + 1;

      // Oprava po vlastní chybě se počítá zvlášť — je to dovednost
      if (uzChybovala) this.lekce.opraveneChyby = (this.lekce.opraveneChyby || 0) + 1;

      Pokrok.zaznamenej(this.stav.pokrok, uloha.dovednost, { spravne: true, stupenNapovedy });

      this.lekce.matOdpovedi[this.lekce.matIndex] = {
        dovednost: uloha.dovednost,
        spravne: true,
        stupenNapovedy,
        poOprave: uzChybovala,
      };

      const zprava = document.createElement('div');
      zprava.className = 'zpetna-vazba kladna';
      zprava.textContent = SUN.bezpecne(
        uzChybovala ? SUN.poOpraveChyby() : SUN.spravneMatika(this.lekce._serie, stupenNapovedy === 0)
      );
      karta.appendChild(zprava);
      this.vyrazSUN(this.lekce._serie >= 3 ? 'serie' : 'spravne');

      // Občas se zeptáme na postup — zvlášť když to šlo bez nápovědy
      const zeptatSe = stupenNapovedy === 0 && Math.random() < 0.18 && !this.lekce._uzSeptalaNaPostup;
      if (zeptatSe) {
        this.lekce._uzSeptalaNaPostup = true;
        return this.zeptejSeNaPostup(uloha, karta);
      }

      this.pokracujVMatice(karta);
    } else {
      Sound.wrong();
      this.lekce._serie = 0;
      this.lekce._chybaVTeto = true;

      const typChyby = Matika.rozpoznejChybu(uloha, odpoved);
      Pokrok.zaznamenej(this.stav.pokrok, uloha.dovednost, { spravne: false, stupenNapovedy });

      this.lekce.chybneDovednosti = this.lekce.chybneDovednosti || [];
      this.lekce.chybneDovednosti.push(uloha.dovednost);

      const zprava = document.createElement('div');
      zprava.className = 'zpetna-vazba jemna';
      zprava.textContent = SUN.bezpecne(SUN.chybaMatika(typChyby));
      karta.appendChild(zprava);
      this.vyrazSUN('chyba');

      // Vždycky dostane možnost to zkusit znovu — chyba nikdy nezablokuje
      const znovu = document.createElement('button');
      znovu.className = 'tlacitko-hlavni';
      znovu.textContent = '🔄 Zkusit znovu';
      znovu.addEventListener('click', () => {
        const obsah = document.getElementById('krok-obsah');
        obsah.innerHTML = '';
        obsah.appendChild(this.vykresliUlohu(uloha, this.lekce.matIndex, this.lekce.matUlohy.length));
      });
      karta.appendChild(znovu);

      // Nebo jít dál, když už toho má dost
      const dal = document.createElement('button');
      dal.className = 'tlacitko-textove';
      dal.textContent = 'Ukázat výsledek a jít dál';
      dal.addEventListener('click', () => {
        const vysledek = document.createElement('div');
        vysledek.className = 'napoveda-box';
        vysledek.textContent = `Správně je ${uloha.spravne}. Na tenhle typ se ještě podíváme příště.`;
        karta.appendChild(vysledek);
        dal.remove();
        znovu.remove();
        this.lekce.matOdpovedi[this.lekce.matIndex] = {
          dovednost: uloha.dovednost,
          spravne: false,
          stupenNapovedy,
        };
        this.pokracujVMatice(karta);
      });
      karta.appendChild(dal);
    }
    this.ulozPrubeh();
  },

  zeptejSeNaPostup(uloha, karta) {
    const box = document.createElement('div');
    box.className = 'postup-dotaz';
    box.innerHTML = `<div class="karta-nadpis">${SUN.otazkaNaPostup()}</div>`;

    const volby = document.createElement('div');
    volby.className = 'volby-sloupec';
    [
      { klic: 'hlava', text: 'Spočítala jsem to z hlavy' },
      { klic: 'trik', text: 'Použila jsem trik s desítkou' },
      { klic: 'prsty', text: 'Pomohla jsem si prsty' },
      { klic: 'nevim', text: 'Nevím, prostě mě to napadlo' },
    ].forEach((m) => {
      const btn = document.createElement('button');
      btn.className = 'volba-velka';
      btn.textContent = m.text;
      btn.addEventListener('click', () => {
        if (m.klic === 'trik' || m.klic === 'hlava') {
          this.lekce.vysvetlilaPostup = (this.lekce.vysvetlilaPostup || 0) + 1;
        }
        if (m.klic === 'prsty') {
          this.lekce.pocitalaNaPrstech = (this.lekce.pocitalaNaPrstech || 0) + 1;
        }
        const odpoved = document.createElement('div');
        odpoved.className = 'zpetna-vazba kladna';
        odpoved.textContent =
          m.klic === 'prsty' ? SUN.oPrstech() : 'Díky, že jsi mi to řekla. Zajímá mě, jak přemýšlíš.';
        box.appendChild(odpoved);
        volby.querySelectorAll('button').forEach((b) => (b.disabled = true));
        setTimeout(() => this.pokracujVMatice(karta), 1600);
      });
      volby.appendChild(btn);
    });

    box.appendChild(volby);
    karta.appendChild(box);
  },

  pokracujVMatice(karta) {
    const dal = document.createElement('button');
    dal.className = 'tlacitko-hlavni';
    dal.textContent = 'Další úloha ➜';
    dal.addEventListener('click', () => {
      this.lekce.matIndex = (this.lekce.matIndex || 0) + 1;
      this.lekce._stupenNapovedy = 0;
      this.lekce._chybaVTeto = false;
      this.ulozPrubeh();
      this.zobrazKrok('matika');
    });
    karta.appendChild(dal);
    dal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },

  sestavMatematickySouhrn() {
    const odpovedi = this.lekce.matOdpovedi.filter(Boolean);
    this.lekce.matika = {
      ulohy: this.lekce.matUlohy.map((u) => ({
        dovednost: u.dovednost,
        zadani: u.zadani,
        spravne: u.spravne,
      })),
      spravne: odpovedi.filter((o) => o.spravne).length,
      bezNapovedy: odpovedi.filter((o) => o.spravne && o.stupenNapovedy === 0).length,
      sNapovedou: odpovedi.filter((o) => o.spravne && o.stupenNapovedy > 0).length,
      poOprave: odpovedi.filter((o) => o.poOprave).length,
      vysvetlilaPostup: this.lekce.vysvetlilaPostup || 0,
      spravnaOperace: this.lekce.spravnaOperace || 0,
      pocitalaNaPrstech: this.lekce.pocitalaNaPrstech || 0,
      chybneDovednosti: this.lekce.chybneDovednosti || [],
      odpovedi,
    };
    this.ulozPrubeh();
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ZÁVĚR
  // ═══════════════════════════════════════════════════════════════════════

  sestavLekciProHodnoceni() {
    return {
      dokoncena: this.lekce.dokoncena,
      energie: this.lekce.energie,
      opraveneChyby: this.lekce.opraveneChyby || 0,
      pouziteNapovedy: this.lekce.pouziteNapovedy || 0,
      cteni: this.lekce.cteni,
      psani: this.lekce.psani,
      matika: this.lekce.matika,
      datum: this.lekce.datum,
    };
  },

  dokonciLekci() {
    this.lekce.dokoncena = true;
    this.lekce.konec = new Date().toISOString();
    const minut = Math.round(
      (Date.parse(this.lekce.konec) - Date.parse(this.lekce.zacatek)) / 60000
    );
    this.lekce.trvaniMinut = minut;

    const proHodnoceni = this.sestavLekciProHodnoceni();
    const zaver = Hodnoceni.zaver(proHodnoceni, this.stav);

    // Uložení výsledků
    const zaznam = {
      ...proHodnoceni,
      dokoncena: true,
      trvaniMinut: minut,
      hvezdicky: zaver.hvezdicky.celkem,
      znamka: zaver.znamka.znamka,
      zaverecneShrnuti: {
        povedlo: zaver.povedlo,
        trenovat: zaver.trenovat,
        pokrok: zaver.pokrok,
        zprava: zaver.zprava,
      },
    };

    this.stav.lekce = [zaznam, ...(this.stav.lekce || [])].slice(0, 120);
    this.stav.profil.celkemHvezdicek = zaver.celkemHvezdicek;
    this.stav.profil.prectene = this.stav.profil.prectene || {};
    this.stav.profil.prectene[this.lekce.textId] = Date.now();
    zaver.milniky.forEach((m) => {
      if (!this.stav.profil.milniky.includes(m.klic)) this.stav.profil.milniky.push(m.klic);
    });

    // Posun čtenářské úrovně — dítěti se o něm nic neříká
    const posun = Pokrok.vyhodnotCtenarskouUroven(this.stav);
    if (posun.zmena !== 0) {
      this.stav.profil.ctenarskaUroven = Math.max(
        1,
        Math.min(5, (this.stav.profil.ctenarskaUroven || 1) + posun.zmena)
      );
    }

    this.stav.rozpracovana = null;
    Storage.uloz();

    this.vykresliZaver(zaver);
  },

  vykresliZaver(zaver) {
    const box = document.getElementById('zaver-obsah');
    const jmeno = this.stav.profil.jmeno;
    box.innerHTML = '';

    // Hlavička
    const hlavicka = document.createElement('div');
    hlavicka.className = 'zaver-hlavicka';
    hlavicka.innerHTML = `
      <div class="sun-avatar velky" id="sun-zaver" data-velikost="128"></div>
      <h1 class="zaver-nadpis">Jak nám to dnes šlo</h1>
      <div class="zaver-hvezdicky">${'⭐'.repeat(zaver.hvezdicky.celkem)}${'☆'.repeat(10 - zaver.hvezdicky.celkem)}</div>
      <div class="zaver-pocet">Dnes jsi získala ${zaver.hvezdicky.celkem} z 10 hvězdiček.</div>
    `;
    box.appendChild(hlavicka);

    // Rozpis hvězdiček po kategoriích
    const rozpis = document.createElement('div');
    rozpis.className = 'karta';
    rozpis.innerHTML = '<div class="karta-nadpis">Za co jsi je dostala</div>';
    const NAZVY = {
      cteni: '📖 Čtení',
      porozumeni: '💬 Porozumění',
      psani: '✏️ Psaní',
      matika: '🧮 Počítání',
      vytrvalost: '💪 Vytrvalost',
    };
    Object.entries(zaver.hvezdicky.casti).forEach(([klic, cast]) => {
      const radek = document.createElement('div');
      radek.className = 'rozpis-radek';
      radek.innerHTML = `
        <div class="rozpis-nazev">${NAZVY[klic]}</div>
        <div class="rozpis-hvezdy">${'⭐'.repeat(cast.ziskano)}${'☆'.repeat(cast.max - cast.ziskano)}</div>
        <div class="rozpis-duvod">${cast.duvody.join(' · ') || '—'}</div>
      `;
      rozpis.appendChild(radek);
    });
    box.appendChild(rozpis);

    // Co se povedlo
    const povedlo = document.createElement('div');
    povedlo.className = 'karta';
    povedlo.innerHTML = `<div class="karta-nadpis">Co se dnes povedlo</div>
      <ul class="seznam-odrazky">${zaver.povedlo.map((p) => `<li>${p}</li>`).join('')}</ul>`;
    box.appendChild(povedlo);

    // Co příště trénovat
    if (zaver.trenovat.length) {
      const trenovat = document.createElement('div');
      trenovat.className = 'karta';
      trenovat.innerHTML = `<div class="karta-nadpis">Co budeme příště trénovat</div>
        <ul class="seznam-odrazky">${zaver.trenovat.map((t) => `<li>${t}</li>`).join('')}</ul>`;
      box.appendChild(trenovat);
    }

    // Známka
    const znamka = document.createElement('div');
    znamka.className = 'karta znamka-karta';
    if (zaver.znamka.znamka) {
      znamka.innerHTML = `
        <div class="karta-nadpis">Známka od SUN</div>
        <div class="znamka-cislo">${zaver.znamka.znamka}</div>
        <div class="karta-text">${zaver.znamka.text}</div>`;
    } else {
      znamka.innerHTML = `<div class="karta-text">${zaver.znamka.text}</div>`;
    }
    box.appendChild(znamka);

    // Pokrok
    const pokrok = document.createElement('div');
    pokrok.className = 'karta';
    pokrok.innerHTML = `<div class="karta-nadpis">Jak to jde</div>
      <ul class="seznam-odrazky">${zaver.pokrok.map((p) => `<li>${p}</li>`).join('')}</ul>`;
    box.appendChild(pokrok);

    // Nové milníky
    if (zaver.milniky.length) {
      const m = document.createElement('div');
      m.className = 'karta zvyraznena';
      m.innerHTML = `<div class="karta-nadpis">Nový odznak!</div>` +
        zaver.milniky.map((x) =>
          `<div class="milnik-velky"><span class="milnik-ikona">${x.emoji}</span>
           <div><strong>${x.nazev}</strong><div class="karta-text">${x.popis}</div></div></div>`
        ).join('');
      box.appendChild(m);
      Sound.truhla();
    } else {
      Sound.correct();
    }

    // Osobní zpráva
    const zprava = document.createElement('div');
    zprava.className = 'karta sun-zprava';
    const avatarZpravy = document.createElement('div');
    avatarZpravy.className = 'sun-avatar';
    Postava.vloz(avatarZpravy, 'klid', 56);
    const textZpravy = document.createElement('p');
    textZpravy.textContent = zaver.zprava;
    zprava.appendChild(avatarZpravy);
    zprava.appendChild(textZpravy);
    box.appendChild(zprava);

    const hotovo = document.createElement('button');
    hotovo.className = 'tlacitko-hlavni';
    hotovo.textContent = 'Hotovo ➜';
    hotovo.addEventListener('click', () => {
      this.ukazHlasku(SUN.rozlouceni(jmeno, true));
      this.zobrazDomov();
    });
    box.appendChild(hotovo);

    this.prepni('screen-zaver');

    // Velká SUN na závěr — nadšená, když se den povedl
    Postava.vloz(
      document.getElementById('sun-zaver'),
      zaver.hvezdicky.celkem >= 8 ? 'nadseni' : 'radost',
      128
    );
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PAUZA
  // ═══════════════════════════════════════════════════════════════════════

  nabidniPauzu() {
    const obsah = document.getElementById('krok-obsah');
    const stary = document.querySelector('.pauza-box');
    if (stary) {
      stary.remove();
      return;
    }

    const box = document.createElement('div');
    box.className = 'karta zvyraznena pauza-box';
    box.innerHTML = `<div class="karta-nadpis">Pauza</div>
                     <p class="karta-text">${SUN.nabidkaPauzy()}</p>`;

    const pokracovat = document.createElement('button');
    pokracovat.className = 'tlacitko-hlavni';
    pokracovat.textContent = 'Ještě pokračuju';
    pokracovat.addEventListener('click', () => box.remove());

    const skoncit = document.createElement('button');
    skoncit.className = 'tlacitko-druhotne';
    skoncit.textContent = 'Dost pro dnešek';
    skoncit.addEventListener('click', () => {
      this.ulozPrubeh();
      this.ukazHlasku(SUN.konecBezDokonceni());
      setTimeout(() => this.zobrazDomov(), 2200);
    });

    box.appendChild(pokracovat);
    box.appendChild(skoncit);
    obsah.insertBefore(box, obsah.firstChild);
    box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  // ═══════════════════════════════════════════════════════════════════════
  // POMOCNÉ PRVKY
  // ═══════════════════════════════════════════════════════════════════════

  // Bublina s SUN. Výraz se volí podle situace, aby postava reagovala na to,
  // co se právě děje, a nebyla jen obrázek u textu.
  bublinaSUN(text, situace = 'start') {
    const el = document.createElement('div');
    el.className = 'sun-bublina';
    const avatar = document.createElement('div');
    avatar.className = 'sun-avatar';
    avatar.dataset.velikost = '56';

    // Když Ami řekla, že je unavená, zůstane SUN ztišená po celou lekci —
    // ne jen na tu jednu sekundu po odpovědi. Radost a povzbuzení ale
    // zůstávají, ty se hodí vždycky.
    let vyraz = Postava.vyrazPro(situace);
    const klidoveSituace = ['start', 'cteni', 'otazka'];
    if (this.lekce && this.lekce.energie === 'unavena' && klidoveSituace.includes(situace)) {
      vyraz = 'unaveni';
    }
    Postava.vloz(avatar, vyraz, 56);
    const p = document.createElement('p');
    p.innerHTML = `<span class="sun-jmeno">SUN</span>${SUN.bezpecne(text)}`;
    el.appendChild(avatar);
    el.appendChild(p);
    this._posledniBublina = avatar;
    return el;
  },

  // Přemluví poslední vykreslenou SUN na jiný výraz — používá se, když se
  // během kroku něco stane (správná odpověď, chyba, nápověda).
  vyrazSUN(situace) {
    if (this._posledniBublina) {
      Postava.zmenVyraz(this._posledniBublina, Postava.vyrazPro(situace), 56);
    }
  },

  // Krátká hláška, která se sama schová
  ukazHlasku(text) {
    const stara = document.querySelector('.hlaska');
    if (stara) stara.remove();
    const el = document.createElement('div');
    el.className = 'hlaska';
    el.textContent = SUN.bezpecne(text);
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('viditelna'), 10);
    setTimeout(() => {
      el.classList.remove('viditelna');
      setTimeout(() => el.remove(), 300);
    }, 2600);
  },

  vykresliQR() {
    const box = document.getElementById('about-qr');
    if (!box || box.dataset.hotovo) return;
    try {
      const platba =
        'SPD*1.0*ACC:CZ8262106701002211168451*AM:30.00*CC:CZK*MSG:Podpora Curiko';
      const qr = qrcode(0, 'M');
      qr.addData(platba);
      qr.make();
      box.innerHTML = qr.createImgTag(5, 8);
      box.dataset.hotovo = '1';
    } catch (e) {}
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());
