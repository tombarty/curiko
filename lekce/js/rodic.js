// ═══════════════════════════════════════════════════════════════════════════
// rodic.js — přehled pro rodiče
//
// Cílem není zaplavit grafy, ale odpovědět na tři otázky:
//   • Jak to jde?
//   • Kde konkrétně to drhne?
//   • Co s tím dělat?
//
// Všechna čísla vycházejí z reálně uložených lekcí. Když data nejsou,
// přehled to řekne, místo aby si něco domýšlel.
// ═══════════════════════════════════════════════════════════════════════════

const Rodic = {
  stav: null,

  async init() {
    this.stav = await Storage.nacti();
    this.napoj();

    const pin = this.stav.nastaveni && this.stav.nastaveni.pin;
    if (!pin) {
      // První vstup — PIN se teprve zakládá
      document.getElementById('pin-popis').textContent =
        'Zvolte PIN, kterým se budete do přehledu přihlašovat.';
      document.getElementById('pin-label').textContent = 'Nový PIN (4 číslice)';
      document.getElementById('btn-pin').textContent = 'Nastavit PIN';
    }
  },

  napoj() {
    document.getElementById('form-pin').addEventListener('submit', (e) => {
      e.preventDefault();
      this.overPin();
    });
    document.getElementById('zalozky').addEventListener('click', (e) => {
      const btn = e.target.closest('.zalozka');
      if (btn) this.prepniPanel(btn.dataset.panel);
    });
    document.getElementById('btn-detail-zpet').addEventListener('click', () => {
      this.prepni('screen-prehled');
    });
  },

  overPin() {
    const zadany = document.getElementById('vstup-pin').value.trim();
    const chyba = document.getElementById('pin-chyba');
    const ulozeny = this.stav.nastaveni && this.stav.nastaveni.pin;

    if (!/^\d{4}$/.test(zadany)) {
      chyba.hidden = false;
      chyba.textContent = 'PIN musí být čtyři číslice.';
      return;
    }

    if (!ulozeny) {
      this.stav.nastaveni.pin = zadany;
      Storage.uloz();
      this.otevri();
      return;
    }

    if (zadany !== ulozeny) {
      chyba.hidden = false;
      chyba.textContent = 'PIN nesouhlasí.';
      document.getElementById('vstup-pin').value = '';
      return;
    }

    chyba.hidden = true;
    this.otevri();
  },

  otevri() {
    const p = this.stav.profil;
    document.getElementById('rodic-jmeno').textContent = p
      ? `${p.jmeno}, ${p.vek} let, ${p.trida}. třída`
      : 'Profil ještě nebyl vytvořen.';

    this.vykresliSouhrn();
    this.vykresliCteni();
    this.vykresliMatiku();
    this.vykresliPsani();
    this.vykresliHistorii();
    this.vykresliNastaveni();

    this.prepni('screen-prehled');
  },

  prepni(id) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
  },

  prepniPanel(klic) {
    document.querySelectorAll('.zalozka').forEach((z) => {
      z.classList.toggle('aktivni', z.dataset.panel === klic);
    });
    document.querySelectorAll('.panel').forEach((p) => {
      p.classList.toggle('aktivni', p.id === 'panel-' + klic);
    });
    window.scrollTo(0, 0);
  },

  // ─── Pomocné ─────────────────────────────────────────────────────────────

  lekce() {
    return (this.stav.lekce || []).filter((l) => l.dokoncena);
  },

  vPosledních(dnu) {
    const hranice = Date.now() - dnu * 86400000;
    return this.lekce().filter((l) => Date.parse(l.datum || 0) > hranice);
  },

  datum(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
  },

  karta(nadpis, obsahHtml) {
    return `<div class="karta"><div class="karta-nadpis">${nadpis}</div>${obsahHtml}</div>`;
  },

  bezDat(co) {
    return `<p class="karta-text">${co} Data se objeví, jakmile Ami dokončí první lekce.</p>`;
  },

  // Jednoduchý sloupcový graf z divů — žádná knihovna, funguje i offline
  graf(hodnoty, popisky, maximum) {
    const max = maximum || Math.max(1, ...hodnoty);
    const sloupce = hodnoty
      .map((h, i) => {
        const vyska = Math.round((h / max) * 100);
        return `<div class="graf-sloupec-obal">
                  <div class="graf-hodnota">${h}</div>
                  <div class="graf-sloupec" style="height:${Math.max(3, vyska)}%"></div>
                  <div class="graf-popisek">${popisky[i]}</div>
                </div>`;
      })
      .join('');
    return `<div class="graf">${sloupce}</div>`;
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SOUHRN
  // ═══════════════════════════════════════════════════════════════════════

  vykresliSouhrn() {
    const box = document.getElementById('panel-souhrn');
    const lekce = this.lekce();
    const p = this.stav.profil || {};

    if (!lekce.length) {
      box.innerHTML = this.karta('Zatím bez dat', this.bezDat('Žádná dokončená lekce.'));
      return;
    }

    const za7 = this.vPosledních(7);
    const za30 = this.vPosledních(30);
    const prumernaDelka = Math.round(
      lekce.reduce((s, l) => s + (l.trvaniMinut || 0), 0) / lekce.length
    );
    const posledni = lekce[0];

    let html = '';

    // Hlavní čísla
    html += `<div class="dlazdice-mrizka">
      ${this.dlazdice(lekce.length, 'dokončených lekcí')}
      ${this.dlazdice(za7.length, 'za posledních 7 dní')}
      ${this.dlazdice(za30.length, 'za posledních 30 dní')}
      ${this.dlazdice(Hodnoceni.serie(this.stav.lekce), 'dní v řadě')}
      ${this.dlazdice(p.celkemHvezdicek || 0, 'hvězdiček celkem')}
      ${this.dlazdice(prumernaDelka + ' min', 'průměrná lekce')}
    </div>`;

    // Poslední lekce
    html += this.karta(
      'Poslední lekce',
      `<div class="radek-info"><span>Datum</span><strong>${this.datum(posledni.datum)}</strong></div>
       <div class="radek-info"><span>Hvězdičky</span><strong>${posledni.hvezdicky} z 10</strong></div>
       <div class="radek-info"><span>Známka od SUN</span><strong>${posledni.znamka || 'nedávána'}</strong></div>
       <div class="radek-info"><span>Jak se cítila</span><strong>${this.popisEnergie(posledni.energie)}</strong></div>
       <div class="radek-info"><span>Trvání</span><strong>${posledni.trvaniMinut || '?'} min</strong></div>`
    );

    // Úrovně
    html += this.karta(
      'Aktuální úroveň',
      `<div class="radek-info"><span>Čtení</span>
         <strong>úroveň ${p.ctenarskaUroven || 1} z 5 — texty ${this.delkaTextu(p.ctenarskaUroven || 1)} slov</strong></div>
       <div class="radek-info"><span>Matematika</span>
         <strong>${this.popisMatematickeUrovne()}</strong></div>`
    );

    // Co potřebuje pozornost — nejdůležitější část celého přehledu
    const pozornost = Pokrok.potrebujePozornost(this.stav.pokrok, 4);
    if (pozornost.length) {
      html += this.karta(
        'Co potřebuje pozornost',
        `<p class="karta-text">Tyto dovednosti Ami zvládá nejméně jistě. Aplikace je
         sama zařazuje častěji.</p>` +
          pozornost
            .map(
              (d) => `<div class="radek-dovednost">
                <div class="dovednost-nazev">${d.nazev}</div>
                <div class="pruh-obal"><div class="pruh" style="width:${d.jistota}%"></div></div>
                <div class="dovednost-cislo">${d.jistota} %</div>
              </div>`
            )
            .join('')
      );
    }

    // Doporučení
    html += this.karta('Doporučení na příští týden', this.doporuceni());

    box.innerHTML = html;
  },

  dlazdice(cislo, popis) {
    return `<div class="prehled-dlazdice">
      <div class="dlazdice-cislo">${cislo}</div>
      <div class="dlazdice-popis">${popis}</div>
    </div>`;
  },

  popisEnergie(klic) {
    return { hodne: 'hodně energie', pohoda: 'v pohodě', unavena: 'trochu unavená' }[klic] || '—';
  },

  delkaTextu(uroven) {
    const r = Pokrok.DELKY_TEXTU[uroven];
    return r ? `${r[0]}–${r[1]}` : '?';
  },

  popisMatematickeUrovne() {
    const p = this.stav.pokrok || {};
    const zvladnute = Object.entries(p).filter(([, z]) => z.jistota >= 0.7).length;
    const celkem = Object.keys(p).length;
    if (!celkem) return 'zatím bez dat';
    return `${zvladnute} z ${celkem} procvičovaných dovedností zvládá jistě`;
  },

  doporuceni() {
    const lekce = this.lekce();
    const rady = [];

    // Frekvence
    const za7 = this.vPosledních(7).length;
    if (za7 === 0) rady.push('Tento týden zatím žádná lekce — stačí i jedna krátká.');
    else if (za7 <= 2) rady.push('Zkuste přidat jednu lekci navíc. Krátce a častěji funguje lépe než jednou dlouho.');
    else rady.push(`Tempo ${za7} lekcí za týden je dobré, držte ho.`);

    // Celé věty
    const posledni3 = lekce.slice(0, 3);
    const vetyProm =
      posledni3.reduce((s, l) => s + ((l.cteni && l.cteni.celychVet) || 0), 0) /
      Math.max(1, posledni3.length);
    if (vetyProm < 3) {
      rady.push('Odpovědi celou větou jsou pořád slabší místo — pomůže ptát se doma stejně („Řekni mi to celou větou.“).');
    }

    // Počítání na prstech
    const prsty = lekce.slice(0, 5).reduce((s, l) => s + ((l.matika && l.matika.pocitalaNaPrstech) || 0), 0);
    if (prsty >= 3) {
      rady.push('U počítání si často pomáhá prsty. Nezakazujte to — jen občas nabídněte cestu přes desítku.');
    }

    // Nápovědy
    const napovedy = lekce.slice(0, 3).reduce((s, l) => s + (l.pouziteNapovedy || 0), 0);
    if (napovedy > 15) {
      rady.push('Nápověd bylo poslední dobou hodně. Možná je látka o stupeň napřed — obtížnost se sama upraví.');
    }

    // Slabé dovednosti
    const slabe = Pokrok.potrebujePozornost(this.stav.pokrok, 2);
    if (slabe.length) {
      rady.push(`Doma se dá bez tlaku procvičit: ${slabe.map((s) => s.nazev.toLowerCase()).join(', ')}.`);
    }

    return `<ul class="seznam-odrazky">${rady.map((r) => `<li>${r}</li>`).join('')}</ul>`;
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ČTENÍ
  // ═══════════════════════════════════════════════════════════════════════

  vykresliCteni() {
    const box = document.getElementById('panel-cteni');
    const lekce = this.lekce().filter((l) => l.cteni);

    if (!lekce.length) {
      box.innerHTML = this.karta('Čtení', this.bezDat('Zatím žádné čtení.'));
      return;
    }

    let html = '';
    const poslednich8 = lekce.slice(0, 8).reverse();

    // Vývoj délky textu
    html += this.karta(
      'Délka textů',
      `<p class="karta-text">Kolik slov měl text v posledních lekcích. Roste jen tehdy,
       když Ami tři lekce po sobě zvládne porozumění.</p>` +
        this.graf(
          poslednich8.map((l) => l.cteni.pocetSlov || 0),
          poslednich8.map((l) => this.kratkeDatum(l.datum))
        )
    );

    // Porozumění
    html += this.karta(
      'Porozumění textu',
      `<p class="karta-text">Správně odpovězených otázek z pěti.</p>` +
        this.graf(
          poslednich8.map((l) => l.cteni.spravnychOtazek || 0),
          poslednich8.map((l) => this.kratkeDatum(l.datum)),
          5
        )
    );

    // Celé věty
    html += this.karta(
      'Odpovědi celou větou',
      `<p class="karta-text">Kolik z pěti odpovědí bylo celou větou.</p>` +
        this.graf(
          poslednich8.map((l) => l.cteni.celychVet || 0),
          poslednich8.map((l) => this.kratkeDatum(l.datum)),
          5
        )
    );

    // Nápovědy
    html += this.karta(
      'Potřebná pomoc',
      `<p class="karta-text">Kolikrát Ami při čtení požádala o nápovědu. Menší číslo
       znamená větší samostatnost — ale nula nemusí být cíl.</p>` +
        this.graf(
          poslednich8.map((l) => l.cteni.napovedy || 0),
          poslednich8.map((l) => this.kratkeDatum(l.datum))
        )
    );

    // Záměna písmen
    const zamena = this.stav.pokrok && this.stav.pokrok['zamena-pismen'];
    if (zamena && zamena.pokusy) {
      const uspesnost = Math.round((zamena.spravne / zamena.pokusy) * 100);
      html += this.karta(
        'Rozlišování podobných písmen',
        `<p class="karta-text">Cvičení Slovní detektiv míří na dvojice, které Ami plete —
         a/o, p/b/d, i/e.</p>
         <div class="radek-info"><span>Úspěšnost</span><strong>${uspesnost} %</strong></div>
         <div class="radek-info"><span>Pokusů celkem</span><strong>${zamena.pokusy}</strong></div>
         <div class="radek-info"><span>Trend</span><strong>${Pokrok._popisTrendu(zamena)}</strong></div>`
      );
    }

    // Obtížná slova
    const slova = {};
    lekce.forEach((l) => {
      (l.cteni.tezkaSlova || []).forEach((s) => (slova[s] = (slova[s] || 0) + 1));
      (l.cteni.prehranaSlova || []).forEach((s) => (slova[s] = (slova[s] || 0) + 1));
    });
    const seznam = Object.entries(slova).sort((a, b) => b[1] - a[1]).slice(0, 15);
    if (seznam.length) {
      html += this.karta(
        'Slova, se kterými si nebyla jistá',
        `<div class="znacky">${seznam
          .map(([s, n]) => `<span class="znacka">${s}${n > 1 ? ` (${n}×)` : ''}</span>`)
          .join('')}</div>`
      );
    }

    // Přečtená témata
    const temata = {};
    lekce.forEach((l) => {
      if (l.cteni.tema) temata[l.cteni.tema] = (temata[l.cteni.tema] || 0) + 1;
    });
    html += this.karta(
      'Přečtená témata',
      `<div class="znacky">${Object.entries(temata)
        .map(([t, n]) => `<span class="znacka">${this.nazevTematu(t)} (${n})</span>`)
        .join('')}</div>`
    );

    box.innerHTML = html;
  },

  nazevTematu(klic) {
    return {
      zvirata: 'zvířata', hudba: 'hudba', vesmir: 'vesmír', predmety: 'předměty',
      profese: 'profese', 'deti-sveta': 'děti světa', veda: 'věda', pohadka: 'pohádky',
    }[klic] || klic;
  },

  kratkeDatum(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return `${d.getDate()}.${d.getMonth() + 1}.`;
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MATEMATIKA
  // ═══════════════════════════════════════════════════════════════════════

  vykresliMatiku() {
    const box = document.getElementById('panel-matika');
    const lekce = this.lekce().filter((l) => l.matika);

    if (!lekce.length) {
      box.innerHTML = this.karta('Matematika', this.bezDat('Zatím žádné počítání.'));
      return;
    }

    let html = '';
    const poslednich8 = lekce.slice(0, 8).reverse();

    // Úspěšnost
    html += this.karta(
      'Úspěšnost v čase',
      `<p class="karta-text">Kolik úloh z celkového počtu Ami vyřešila správně.</p>` +
        this.graf(
          poslednich8.map((l) =>
            l.matika.ulohy.length ? Math.round((l.matika.spravne / l.matika.ulohy.length) * 100) : 0
          ),
          poslednich8.map((l) => this.kratkeDatum(l.datum)),
          100
        )
    );

    // Samostatnost
    html += this.karta(
      'Bez nápovědy',
      `<p class="karta-text">Kolik úloh zvládla úplně sama.</p>` +
        this.graf(
          poslednich8.map((l) => l.matika.bezNapovedy || 0),
          poslednich8.map((l) => this.kratkeDatum(l.datum))
        )
    );

    // Přehled po oblastech
    const oblasti = ['scitani', 'odcitani', 'nasobeni', 'deleni', 'slovni'];
    const NAZVY = {
      scitani: 'Sčítání', odcitani: 'Odčítání', nasobeni: 'Násobení',
      deleni: 'Dělení', slovni: 'Slovní úlohy',
    };
    html += this.karta(
      'Jak jde která oblast',
      oblasti
        .map((o) => {
          const p = Pokrok.prumerOblasti(this.stav.pokrok, o);
          if (p === null) return `<div class="radek-info"><span>${NAZVY[o]}</span><strong>zatím bez dat</strong></div>`;
          const proc = Math.round(p * 100);
          return `<div class="radek-dovednost">
            <div class="dovednost-nazev">${NAZVY[o]}</div>
            <div class="pruh-obal"><div class="pruh" style="width:${proc}%"></div></div>
            <div class="dovednost-cislo">${proc} %</div>
          </div>`;
        })
        .join('')
    );

    // Všechny dovednosti podrobně
    const dovednosti = Pokrok.prehledDovednosti(this.stav.pokrok).filter((d) => d.oblast !== 'cteni');
    if (dovednosti.length) {
      html += this.karta(
        'Jednotlivé dovednosti',
        `<p class="karta-text">Seřazené od těch, které jdou nejhůř. „Bez nápovědy“ ukazuje
         skutečnou samostatnost.</p>
        <div class="tabulka-obal"><table class="tabulka">
          <thead><tr><th>Dovednost</th><th>Úroveň</th><th>Pokusy</th><th>Správně</th><th>Bez nápovědy</th><th>Trend</th></tr></thead>
          <tbody>${dovednosti
            .map(
              (d) => `<tr>
                <td>${d.nazev}</td>
                <td>${d.uroven}</td>
                <td>${d.pokusy}</td>
                <td>${d.uspesnost} %</td>
                <td>${d.uspesnostBezNapovedy} %</td>
                <td>${d.trend}</td>
              </tr>`
            )
            .join('')}</tbody>
        </table></div>`
      );
    }

    // Počítání na prstech
    const prsty = lekce.reduce((s, l) => s + (l.matika.pocitalaNaPrstech || 0), 0);
    const postup = lekce.reduce((s, l) => s + (l.matika.vysvetlilaPostup || 0), 0);
    html += this.karta(
      'Jak počítá',
      `<div class="radek-info"><span>Přiznala počítání na prstech</span><strong>${prsty}×</strong></div>
       <div class="radek-info"><span>Vysvětlila postup z hlavy</span><strong>${postup}×</strong></div>
       <p class="karta-text">Prsty se nezakazují. Cílem je, aby druhé číslo postupně rostlo.</p>`
    );

    box.innerHTML = html;
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PSANÍ
  // ═══════════════════════════════════════════════════════════════════════

  vykresliPsani() {
    const box = document.getElementById('panel-psani');
    const lekce = this.lekce().filter((l) => l.psani && l.psani.odevzdano);

    if (!lekce.length) {
      box.innerHTML = this.karta('Psaní', this.bezDat('Zatím žádný odevzdaný psací úkol.'));
      return;
    }

    let html = '';

    // Čekající na hodnocení
    const cekajici = lekce.filter((l) => l.psani.cekaNaRodice && !l.psani.hodnoceniRodice);
    if (cekajici.length) {
      html += this.karta(
        `Čeká na vaše hodnocení (${cekajici.length})`,
        `<p class="karta-text">U fotek nedokáže aplikace text přečíst. Podívejte se na ně
         a připište krátkou zpětnou vazbu — Ami ji uvidí u příští lekce.</p>`
      );
    }

    // Vývoj počtu vět
    const sTextem = lekce.filter((l) => l.psani.zpusob === 'text').slice(0, 8).reverse();
    if (sTextem.length >= 2) {
      html += this.karta(
        'Kolik vět napsala',
        this.graf(
          sTextem.map((l) => l.psani.pocetVet || 0),
          sTextem.map((l) => this.kratkeDatum(l.datum))
        )
      );
    }

    // Jednotlivé odevzdané práce
    html += lekce
      .slice(0, 20)
      .map((l, i) => {
        const ps = l.psani;
        let telo = `<div class="radek-info"><span>Datum</span><strong>${this.datum(l.datum)}</strong></div>
                    <div class="zadani-psani-maly">${ps.zadani}</div>`;

        if (ps.zpusob === 'text') {
          telo += `<blockquote class="citace">${this.ochran(ps.text)}</blockquote>
                   <div class="karta-text">${ps.pocetVet} věty · ${ps.pocetSlov} slov</div>`;
          if (ps.povedlo) telo += `<div class="zpetna-vazba kladna">${ps.povedlo}</div>`;
          if (ps.oprava) telo += `<div class="zpetna-vazba jemna">${ps.oprava}</div>`;
        } else if (ps.idFotky) {
          telo += `<img src="${Storage.urlFotky(ps.idFotky)}" alt="Napsaná práce z ${this.datum(l.datum)}"
                        class="foto-obrazek" loading="lazy">`;
        }

        // Hodnocení rodiče
        if (ps.hodnoceniRodice) {
          telo += `<div class="zpetna-vazba kladna"><strong>Vaše hodnocení:</strong> ${this.ochran(ps.hodnoceniRodice)}</div>`;
        } else {
          telo += `<div class="hodnoceni-formular" data-index="${i}">
            <label class="pole">
              <span class="pole-popis">Vaše zpětná vazba pro Ami</span>
              <textarea class="vstup-veta" rows="2" placeholder="Co se povedlo a co zkusit příště…"></textarea>
            </label>
            <button class="tlacitko-druhotne" data-ulozit="${i}">Uložit hodnocení</button>
          </div>`;
        }

        return this.karta(ps.zpusob === 'foto' ? '📷 Napsáno na papír' : '⌨️ Napsáno v aplikaci', telo);
      })
      .join('');

    box.innerHTML = html;

    // Napojení ukládání hodnocení
    box.querySelectorAll('[data-ulozit]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.ulozit, 10);
        const formular = btn.closest('.hodnoceni-formular');
        const text = formular.querySelector('textarea').value.trim();
        if (!text) return;
        this.ulozHodnoceniPsani(lekce[i], text);
        formular.innerHTML = `<div class="zpetna-vazba kladna"><strong>Vaše hodnocení:</strong> ${this.ochran(text)}</div>`;
      });
    });
  },

  ulozHodnoceniPsani(lekceZaznam, text) {
    // Najde tutéž lekci v uloženém stavu a doplní hodnocení
    const cil = (this.stav.lekce || []).find((l) => l.datum === lekceZaznam.datum);
    if (cil && cil.psani) {
      cil.psani.hodnoceniRodice = text;
      cil.psani.cekaNaRodice = false;
      Storage.uloz();
    }
  },

  // Text od uživatele se nikdy nevkládá do stránky jako HTML
  ochran(text) {
    const div = document.createElement('div');
    div.textContent = String(text == null ? '' : text);
    return div.innerHTML;
  },

  // ═══════════════════════════════════════════════════════════════════════
  // HISTORIE
  // ═══════════════════════════════════════════════════════════════════════

  vykresliHistorii() {
    const box = document.getElementById('panel-historie');
    const lekce = this.lekce();

    if (!lekce.length) {
      box.innerHTML = this.karta('Historie', this.bezDat('Zatím žádná lekce.'));
      return;
    }

    // Týdenní shrnutí po každé sedmé lekci
    let html = '';
    if (lekce.length >= 7) {
      html += this.karta('Týdenní shrnutí', this.tydenniShrnuti());
    }

    html += `<div class="karta">
      <div class="karta-nadpis">Všechny lekce (${lekce.length})</div>
      <p class="karta-text">Klikněte na lekci pro podrobnosti — text, odpovědi, příklady i použité nápovědy.</p>
      <div class="seznam-lekci">
        ${lekce
          .map(
            (l, i) => `<button class="lekce-radek" data-lekce="${i}">
              <div class="lekce-datum">${this.datum(l.datum)}</div>
              <div class="lekce-hvezdy">${'⭐'.repeat(l.hvezdicky || 0)}</div>
              <div class="lekce-znamka">${l.znamka || '—'}</div>
              <div class="lekce-sipka">›</div>
            </button>`
          )
          .join('')}
      </div>
    </div>`;

    // Export pro učitelku
    html += this.karta(
      'Export pro učitelku nebo speciálního pedagoga',
      `<p class="karta-text">Vytvoří stručný přehled pozorovaných dat a procvičovaných
       oblastí. Neobsahuje žádné hodnocení ani diagnózu — jen to, co se skutečně naměřilo.</p>
       <button class="tlacitko-druhotne" id="btn-export">📄 Zobrazit přehled k vytištění</button>`
    );

    box.innerHTML = html;

    box.querySelectorAll('[data-lekce]').forEach((btn) => {
      btn.addEventListener('click', () => this.zobrazDetail(lekce[parseInt(btn.dataset.lekce, 10)]));
    });
    const exportBtn = box.querySelector('#btn-export');
    if (exportBtn) exportBtn.addEventListener('click', () => this.zobrazExport());
  },

  tydenniShrnuti() {
    const za7 = this.vPosledních(7);
    if (!za7.length) return '<p class="karta-text">Tento týden zatím žádná lekce.</p>';

    const hvezdicek = za7.reduce((s, l) => s + (l.hvezdicky || 0), 0);
    const vetyCelkem = za7.reduce((s, l) => s + ((l.cteni && l.cteni.celychVet) || 0), 0);
    const napovedy = za7.reduce((s, l) => s + (l.pouziteNapovedy || 0), 0);
    const opravy = za7.reduce((s, l) => s + (l.opraveneChyby || 0), 0);

    // Největší zlepšení — hledá se v datech, nevymýšlí se
    const zlepseni = [];
    if (za7.length >= 2) {
      const prvni = za7[za7.length - 1];
      const posledni = za7[0];
      const vetyRozdil = ((posledni.cteni && posledni.cteni.celychVet) || 0) -
                         ((prvni.cteni && prvni.cteni.celychVet) || 0);
      if (vetyRozdil > 0) zlepseni.push(`o ${vetyRozdil} celých vět víc než na začátku týdne`);
      const bezRozdil = ((posledni.matika && posledni.matika.bezNapovedy) || 0) -
                        ((prvni.matika && prvni.matika.bezNapovedy) || 0);
      if (bezRozdil > 0) zlepseni.push(`o ${bezRozdil} úloh víc bez nápovědy`);
    }

    return `<div class="radek-info"><span>Lekcí tento týden</span><strong>${za7.length}</strong></div>
      <div class="radek-info"><span>Hvězdiček</span><strong>${hvezdicek}</strong></div>
      <div class="radek-info"><span>Odpovědí celou větou</span><strong>${vetyCelkem}</strong></div>
      <div class="radek-info"><span>Použitých nápověd</span><strong>${napovedy}</strong></div>
      <div class="radek-info"><span>Opravených chyb</span><strong>${opravy}</strong></div>
      ${zlepseni.length
        ? `<div class="zpetna-vazba kladna">Největší zlepšení: ${zlepseni.join(', ')}.</div>`
        : ''}`;
  },

  zobrazDetail(l) {
    const box = document.getElementById('detail-obsah');
    let html = `<h1 class="rodic-nadpis">Lekce ${this.datum(l.datum)}</h1>`;

    html += this.karta(
      'Průběh',
      `<div class="radek-info"><span>Trvání</span><strong>${l.trvaniMinut || '?'} min</strong></div>
       <div class="radek-info"><span>Jak se cítila</span><strong>${this.popisEnergie(l.energie)}</strong></div>
       <div class="radek-info"><span>Hvězdičky</span><strong>${l.hvezdicky} z 10</strong></div>
       <div class="radek-info"><span>Známka</span><strong>${l.znamka || 'nedávána'}</strong></div>
       <div class="radek-info"><span>Použité nápovědy</span><strong>${l.pouziteNapovedy || 0}</strong></div>
       <div class="radek-info"><span>Opravené chyby</span><strong>${l.opraveneChyby || 0}</strong></div>`
    );

    // Čtení a odpovědi
    if (l.cteni) {
      const c = l.cteni;
      html += this.karta(
        'Čtení',
        `<div class="radek-info"><span>Text</span><strong>${c.nadpis}</strong></div>
         <div class="radek-info"><span>Délka</span><strong>${c.pocetSlov} slov (úroveň ${c.uroven})</strong></div>
         <div class="radek-info"><span>Správných otázek</span><strong>${c.spravnychOtazek} z 5</strong></div>
         <div class="radek-info"><span>Celých vět</span><strong>${c.celychVet} z 5</strong></div>
         ${(c.tezkaSlova || []).length
           ? `<div class="radek-info"><span>Těžká slova</span><strong>${c.tezkaSlova.join(', ')}</strong></div>`
           : ''}`
      );

      if ((c.odpovedi || []).length) {
        html += this.karta(
          'Odpovědi na otázky',
          c.odpovedi
            .map(
              (o) => `<div class="odpoved-blok">
                <div class="odpoved-otazka">${this.ochran(o.otazka)}</div>
                <blockquote class="citace">${this.ochran(o.text) || '<em>bez odpovědi</em>'}</blockquote>
                <div class="odpoved-stav">${this.popisStavu(o.stav)}${o.celaVeta ? ' · celá věta' : ''}</div>
              </div>`
            )
            .join('')
        );
      }
    }

    // Psaní
    if (l.psani && l.psani.odevzdano) {
      let telo = `<div class="zadani-psani-maly">${l.psani.zadani}</div>`;
      if (l.psani.zpusob === 'text') {
        telo += `<blockquote class="citace">${this.ochran(l.psani.text)}</blockquote>`;
      } else if (l.psani.idFotky) {
        telo += `<img src="${Storage.urlFotky(l.psani.idFotky)}" alt="Napsaná práce" class="foto-obrazek" loading="lazy">`;
      }
      if (l.psani.hodnoceniRodice) {
        telo += `<div class="zpetna-vazba kladna"><strong>Vaše hodnocení:</strong> ${this.ochran(l.psani.hodnoceniRodice)}</div>`;
      }
      html += this.karta('Psaní', telo);
    }

    // Matematika — všechny příklady
    if (l.matika) {
      const m = l.matika;
      html += this.karta(
        'Matematika',
        `<div class="radek-info"><span>Správně</span><strong>${m.spravne} z ${m.ulohy.length}</strong></div>
         <div class="radek-info"><span>Bez nápovědy</span><strong>${m.bezNapovedy}</strong></div>
         <div class="radek-info"><span>S nápovědou</span><strong>${m.sNapovedou || 0}</strong></div>
         <div class="radek-info"><span>Správně po opravě</span><strong>${m.poOprave || 0}</strong></div>
         <div class="tabulka-obal"><table class="tabulka">
           <thead><tr><th>Zadání</th><th>Správně</th><th>Jak to šlo</th></tr></thead>
           <tbody>${m.ulohy
             .map((u, i) => {
               const o = (m.odpovedi || [])[i];
               const stav = !o ? '—' : o.spravne
                 ? (o.stupenNapovedy ? `ano (nápověda ${o.stupenNapovedy})` : 'ano, sama')
                 : 'zatím ne';
               return `<tr><td>${u.zadani || u.dovednost}</td><td>${u.spravne}</td><td>${stav}</td></tr>`;
             })
             .join('')}</tbody>
         </table></div>`
      );
    }

    // Závěrečné shrnutí od SUN
    if (l.zaverecneShrnuti) {
      const z = l.zaverecneShrnuti;
      html += this.karta(
        'Co SUN napsala Ami',
        `${(z.povedlo || []).length ? `<div class="karta-nadpis maly">Co se povedlo</div>
          <ul class="seznam-odrazky">${z.povedlo.map((p) => `<li>${p}</li>`).join('')}</ul>` : ''}
         ${(z.trenovat || []).length ? `<div class="karta-nadpis maly">Co trénovat</div>
          <ul class="seznam-odrazky">${z.trenovat.map((p) => `<li>${p}</li>`).join('')}</ul>` : ''}
         ${z.zprava ? `<div class="zpetna-vazba kladna">${z.zprava}</div>` : ''}`
      );
    }

    box.innerHTML = html;
    this.prepni('screen-detail');
  },

  popisStavu(stav) {
    return {
      'spravne-cela-veta': 'správně, celou větou',
      'spravne-neuplna': 'správný obsah, ne celá věta',
      castecne: 'částečně',
      mimo: 'míjí otázku',
      prazdne: 'bez odpovědi',
      'nazor-ok': 'vlastní názor',
      'nazor-kratky': 'názor, krátce',
    }[stav] || stav;
  },

  zobrazExport() {
    const box = document.getElementById('detail-obsah');
    const lekce = this.lekce();
    const p = this.stav.profil;
    const dovednosti = Pokrok.prehledDovednosti(this.stav.pokrok);

    let html = `<h1 class="rodic-nadpis">Přehled procvičování</h1>
      <p class="karta-text">Vytvořeno ${this.datum(new Date().toISOString())}.
      Dokument obsahuje pouze pozorovaná data z domácího procvičování.
      Neobsahuje hodnocení schopností ani diagnostické závěry.</p>`;

    html += this.karta(
      'Základní údaje',
      `<div class="radek-info"><span>Věk</span><strong>${p.vek} let</strong></div>
       <div class="radek-info"><span>Ročník</span><strong>${p.trida}. třída</strong></div>
       <div class="radek-info"><span>Dokončených lekcí</span><strong>${lekce.length}</strong></div>
       <div class="radek-info"><span>Období</span><strong>${
         lekce.length ? `${this.datum(lekce[lekce.length - 1].datum)} – ${this.datum(lekce[0].datum)}` : '—'
       }</strong></div>
       <div class="radek-info"><span>Průměrná délka lekce</span><strong>${
         Math.round(lekce.reduce((s, l) => s + (l.trvaniMinut || 0), 0) / Math.max(1, lekce.length))
       } min</strong></div>`
    );

    html += this.karta(
      'Čtení',
      `<div class="radek-info"><span>Délka textů</span><strong>${this.delkaTextu(p.ctenarskaUroven || 1)} slov</strong></div>
       <div class="radek-info"><span>Porozumění (průměr)</span><strong>${
         (lekce.reduce((s, l) => s + ((l.cteni && l.cteni.spravnychOtazek) || 0), 0) / Math.max(1, lekce.length)).toFixed(1)
       } z 5 otázek</strong></div>
       <div class="radek-info"><span>Odpovědi celou větou (průměr)</span><strong>${
         (lekce.reduce((s, l) => s + ((l.cteni && l.cteni.celychVet) || 0), 0) / Math.max(1, lekce.length)).toFixed(1)
       } z 5</strong></div>`
    );

    if (dovednosti.length) {
      html += this.karta(
        'Procvičované oblasti',
        `<div class="tabulka-obal"><table class="tabulka">
          <thead><tr><th>Oblast</th><th>Pokusů</th><th>Úspěšnost</th><th>Bez nápovědy</th></tr></thead>
          <tbody>${dovednosti
            .map((d) => `<tr><td>${d.nazev}</td><td>${d.pokusy}</td><td>${d.uspesnost} %</td><td>${d.uspesnostBezNapovedy} %</td></tr>`)
            .join('')}</tbody>
        </table></div>`
      );
    }

    html += `<button class="tlacitko-hlavni" onclick="window.print()">🖨️ Vytisknout</button>`;

    box.innerHTML = html;
    this.prepni('screen-detail');
  },

  // ═══════════════════════════════════════════════════════════════════════
  // NASTAVENÍ
  // ═══════════════════════════════════════════════════════════════════════

  vykresliNastaveni() {
    const box = document.getElementById('panel-nastaveni');
    const n = this.stav.nastaveni;

    box.innerHTML =
      this.karta(
        'Lekce',
        `${this.prepinacCislo('cilovaDelkaMin', 'Cílová délka lekce (minuty)', n.cilovaDelkaMin, 10, 60, 5)}
         ${this.prepinacCislo('pocetMatUloh', 'Počet matematických úloh', n.pocetMatUloh, 6, 24, 3)}
         ${this.prepinacVolba('slovniDetektivCasto', 'Jak často Slovní detektiv', n.slovniDetektivCasto, [
           ['nikdy', 'nikdy'], ['obcas', 'občas'], ['casto', 'často'],
         ])}
         ${this.prepinacAno('vikendy', 'Lekce i o víkendu', n.vikendy)}`
      ) +
      this.karta(
        'Co je povolené',
        `${this.prepinacAno('povolitFotky', 'Fotografování napsaných úkolů', n.povolitFotky)}
         ${this.prepinacAno('hlasoveCteni', 'Předčítání zadání nahlas', n.hlasoveCteni)}
         <p class="karta-text">Nahrávání hlasu aplikace nepoužívá — mikrofon není potřeba.</p>`
      ) +
      this.karta(
        'Čitelnost',
        `${this.prepinacVolba('velikostPisma', 'Velikost písma', n.velikostPisma, [
           ['male', 'malé'], ['stredni', 'střední'], ['velke', 'velké'], ['hodneVelke', 'hodně velké'],
         ])}
         ${this.prepinacVolba('radkovani', 'Řádkování', n.radkovani, [
           ['stredni', 'střední'], ['siroke', 'široké'],
         ])}
         ${this.prepinacAno('tmavyRezim', 'Tmavé pozadí (na čtení večer)', n.tmavyRezim)}
         ${this.prepinacAno('vypnoutAnimace', 'Vypnout animace', n.vypnoutAnimace)}`
      ) +
      this.karta(
        'Témata textů',
        `<p class="karta-text">Vypnutá témata se v textech neobjeví.</p>
         <div class="znacky">${['zvirata', 'hudba', 'vesmir', 'predmety', 'profese', 'deti-sveta', 'veda', 'pohadka']
           .map((t) => {
             const vypnute = (n.vypnutaTemata || []).includes(t);
             return `<button class="znacka prepinatelna ${vypnute ? 'vypnuta' : ''}"
                      data-tema="${t}">${this.nazevTematu(t)}${vypnute ? ' ✕' : ''}</button>`;
           })
           .join('')}</div>`
      ) +
      this.karta(
        'Ruční zásah do procvičování',
        `<p class="karta-text">Když víte, že něco dělá potíže, můžete to označit —
         aplikace to bude zařazovat častěji.</p>
         <div class="znacky">${Matika.DOVEDNOSTI.slice(0, 26)
           .map((d) => {
             const z = (this.stav.pokrok || {})[d.klic];
             const oznaceno = z && z.rucneOznaceno;
             return `<button class="znacka prepinatelna ${oznaceno ? 'zvyraznena' : ''}"
                      data-dovednost="${d.klic}">${d.nazev}${oznaceno ? ' ●' : ''}</button>`;
           })
           .join('')}</div>`
      ) +
      this.karta(
        'Rodinný klíč',
        `<p class="karta-text">Tímto klíčem se dostanete ke stejným datům z jiného
         zařízení. Nikomu ho neposílejte.</p>
         <div class="klic-box" id="klic-box">••••••••••••••••</div>
         <button class="tlacitko-druhotne" id="btn-zobraz-klic">Zobrazit klíč</button>
         <label class="pole">
           <span class="pole-popis">Přenést data z jiného zařízení — vložte jeho klíč</span>
           <input type="text" class="vstup" id="vstup-klic" placeholder="vložte rodinný klíč">
         </label>
         <button class="tlacitko-druhotne" id="btn-zmen-klic">Použít vložený klíč</button>`
      ) +
      this.karta(
        'Změna PINu',
        `<label class="pole">
           <span class="pole-popis">Nový PIN (4 číslice)</span>
           <input type="password" class="vstup" id="vstup-novy-pin" inputmode="numeric" maxlength="4" placeholder="••••">
         </label>
         <button class="tlacitko-druhotne" id="btn-zmen-pin">Změnit PIN</button>`
      ) +
      this.karta(
        'Smazání dat',
        `<p class="karta-text">Smaže profil, všechny lekce i fotky — na serveru
         i v tomto prohlížeči. Tohle nelze vzít zpět.</p>
         <button class="tlacitko-druhotne nebezpecne" id="btn-smaz">Smazat všechna data</button>`
      );

    this.napojNastaveni();
  },

  prepinacAno(klic, popis, hodnota, obracene) {
    return `<label class="prepinac-radek">
      <span>${popis}</span>
      <input type="checkbox" class="prepinac" data-klic="${klic}"
             ${obracene ? 'data-obracene="1"' : ''} ${hodnota ? 'checked' : ''}>
    </label>`;
  },

  prepinacVolba(klic, popis, hodnota, moznosti) {
    return `<label class="prepinac-radek">
      <span>${popis}</span>
      <select class="vstup uzky" data-klic="${klic}">
        ${moznosti.map(([v, t]) => `<option value="${v}" ${v === hodnota ? 'selected' : ''}>${t}</option>`).join('')}
      </select>
    </label>`;
  },

  prepinacCislo(klic, popis, hodnota, min, max, krok) {
    return `<label class="prepinac-radek">
      <span>${popis}</span>
      <input type="number" class="vstup uzky" data-klic="${klic}"
             value="${hodnota}" min="${min}" max="${max}" step="${krok}">
    </label>`;
  },

  napojNastaveni() {
    const box = document.getElementById('panel-nastaveni');

    box.querySelectorAll('[data-klic]').forEach((el) => {
      el.addEventListener('change', () => {
        const klic = el.dataset.klic;
        let hodnota;
        if (el.type === 'checkbox') {
          hodnota = el.dataset.obracene ? !el.checked : el.checked;
        } else if (el.type === 'number') {
          hodnota = parseInt(el.value, 10);
        } else {
          hodnota = el.value;
        }
        this.stav.nastaveni[klic] = hodnota;
        Storage.uloz();
        this.oznam('Uloženo.');
      });
    });

    box.querySelectorAll('[data-tema]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tema = btn.dataset.tema;
        const seznam = this.stav.nastaveni.vypnutaTemata || [];
        const i = seznam.indexOf(tema);
        if (i >= 0) seznam.splice(i, 1);
        else seznam.push(tema);
        this.stav.nastaveni.vypnutaTemata = seznam;
        Storage.uloz();
        this.vykresliNastaveni();
      });
    });

    box.querySelectorAll('[data-dovednost]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const klic = btn.dataset.dovednost;
        const z = Pokrok.zaznam(this.stav.pokrok, klic);
        z.rucneOznaceno = !z.rucneOznaceno;
        // Ruční označení sníží jistotu, takže se dovednost začne vracet častěji
        if (z.rucneOznaceno) z.jistota = Math.min(z.jistota, 0.4);
        Storage.uloz();
        this.vykresliNastaveni();
      });
    });

    const zobrazKlic = box.querySelector('#btn-zobraz-klic');
    if (zobrazKlic) {
      zobrazKlic.addEventListener('click', () => {
        box.querySelector('#klic-box').textContent = Storage.klic();
        zobrazKlic.remove();
      });
    }

    const zmenKlic = box.querySelector('#btn-zmen-klic');
    if (zmenKlic) {
      zmenKlic.addEventListener('click', async () => {
        const novy = box.querySelector('#vstup-klic').value.trim();
        if (!/^[a-z0-9]{24,64}$/.test(novy)) {
          this.oznam('Tohle nevypadá jako platný klíč.');
          return;
        }
        if (!confirm('Přepnout na vložený klíč? Data z tohoto zařízení se přestanou používat.')) return;
        Storage.nastavKlic(novy);
        location.reload();
      });
    }

    const zmenPin = box.querySelector('#btn-zmen-pin');
    if (zmenPin) {
      zmenPin.addEventListener('click', () => {
        const novy = box.querySelector('#vstup-novy-pin').value.trim();
        if (!/^\d{4}$/.test(novy)) {
          this.oznam('PIN musí být čtyři číslice.');
          return;
        }
        this.stav.nastaveni.pin = novy;
        Storage.uloz();
        box.querySelector('#vstup-novy-pin').value = '';
        this.oznam('PIN změněn.');
      });
    }

    const smaz = box.querySelector('#btn-smaz');
    if (smaz) {
      smaz.addEventListener('click', async () => {
        if (!confirm('Opravdu smazat všechna data? Tohle nelze vzít zpět.')) return;
        if (!confirm('Naposledy: smazat profil, všechny lekce a fotky?')) return;
        await Storage.smazVse();
        location.href = 'index.html';
      });
    }
  },

  oznam(text) {
    const stara = document.querySelector('.hlaska');
    if (stara) stara.remove();
    const el = document.createElement('div');
    el.className = 'hlaska';
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('viditelna'), 10);
    setTimeout(() => {
      el.classList.remove('viditelna');
      setTimeout(() => el.remove(), 300);
    }, 2000);
  },
};

document.addEventListener('DOMContentLoaded', () => Rodic.init());
