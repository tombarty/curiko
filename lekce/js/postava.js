// ═══════════════════════════════════════════════════════════════════════════
// postava.js — SUN jako kreslená postava
//
// SUN není emoji v kolečku. Je to starší kamarádka, která se dívá, usmívá,
// zamýšlí a raduje. Výraz se mění podle toho, co se v lekci právě děje —
// díky tomu má dítě pocit, že na druhé straně někdo je.
//
// Kreslí se ze základních tvarů (kruhy, elipsy, krátké cesty), aby se dala
// snadno upravit a nebyla to nečitelná hromada souřadnic.
//
// Výrazy:
//   klid       — výchozí, mírný úsměv
//   radost     — po správné odpovědi, přivřené oči
//   povzbuzeni — když se nepovedlo, chápavý pohled
//   zamysleni  — když vysvětluje nebo se ptá
//   nadseni    — u odměn a milníků
//   unaveni    — když dítě řekne, že je unavené
// ═══════════════════════════════════════════════════════════════════════════

const Postava = {
  // Barvy postavy — ladí s paletou aplikace, ale drží se vlastní
  // Tlumené barvy. Postava má být sympatická, ne svítivá — na světlém
  // podkladu by sytá paleta bila do očí a přetahovala pozornost od textu.
  BARVY: {
    plet: '#EDC7A6',
    pletStin: '#D8AA85',
    vlasy: '#2A2733',
    vlasyLesk: '#3D3949',
    pramen: '#8B7BB8',         // jediné barevné místo, a i to tlumeně
    pramen2: '#A695C9',
    sponka: '#4E7C6B',
    ocnibelmo: '#FFFFFF',
    zornice: '#22202A',
    usta: '#B4626B',
    tvare: '#D69A9A',
    triko: '#3E4C9B',
    trikoLem: '#5A67B0',
    sluchatka: '#2A2733',
    sluchatkaLesk: '#9AA3C4',
  },

  // ─── Hlavní kreslení ──────────────────────────────────────────────────────

  // velikost = šířka i výška v pixelech, vyraz = klíč z výčtu výše
  svg(vyraz = 'klid', velikost = 96) {
    const b = this.BARVY;
    const oci = this._oci(vyraz);
    const usta = this._usta(vyraz);
    const oboci = this._oboci(vyraz);

    return `
<svg viewBox="0 0 120 120" width="${velikost}" height="${velikost}"
     class="sun-postava sun-vyraz-${vyraz}" role="img" aria-label="SUN, tvoje průvodkyně">
  <defs>
    <clipPath id="sun-hlava-vyrez">
      <ellipse cx="60" cy="58" rx="34" ry="36"/>
    </clipPath>
  </defs>

  <!-- krk a ramena -->
  <path d="M52 88 L52 98 Q60 102 68 98 L68 88 Z" fill="${b.pletStin}"/>
  <path d="M24 120 Q26 99 44 94 Q60 104 76 94 Q94 99 96 120 Z" fill="${b.triko}"/>
  <path d="M44 94 Q60 104 76 94 L74.5 97.5 Q60 106 45.5 97.5 Z" fill="${b.trikoLem}" opacity="0.9"/>

  <!-- vlasy vzadu: delší, ostřejší silueta -->
  <path d="M18 58 Q16 92 24 104 Q26 78 32 66 Z" fill="${b.vlasy}"/>
  <path d="M102 58 Q104 92 96 104 Q94 78 88 66 Z" fill="${b.vlasy}"/>
  <ellipse cx="60" cy="58" rx="41" ry="41" fill="${b.vlasy}"/>

  <!-- tvář -->
  <ellipse cx="60" cy="58" rx="33" ry="35.5" fill="${b.plet}"/>

  <!-- ofina s ostrou diagonálou a neonovým pramenem.
       Pramen leží uvnitř výřezu, jinak by ho clip-path odstřihl. -->
  <g clip-path="url(#sun-hlava-vyrez)">
    <path d="M25 48 Q28 20 60 17 Q92 20 95 48 Q86 28 58 33 Q38 34 25 48 Z" fill="${b.vlasy}"/>
    <path d="M60 17 Q42 21 31 46 Q41 29 60 29 Q79 29 89 47 Q80 21 60 17 Z" fill="${b.vlasyLesk}"/>
    <path d="M68 22 Q80 30 84 52 Q78 34 63 27 Z" fill="${b.pramen}"/>
    <path d="M71 24 Q80 32 83 48 Q79 35 67 28 Z" fill="${b.pramen2}" opacity="0.6"/>
  </g>

  <!-- sluchátka na hlavě: hned čitelná a dělají postavu starší -->
  <path d="M27 56 Q28 22 60 20 Q92 22 93 56" stroke="${b.sluchatka}" stroke-width="6"
        stroke-linecap="round" fill="none"/>
  <path d="M31 52 Q32 27 60 25 Q88 27 89 52" stroke="${b.sluchatkaLesk}" stroke-width="1.6"
        stroke-linecap="round" fill="none" opacity="0.75"/>
  <rect x="18" y="52" width="17" height="25" rx="8.5" fill="${b.sluchatka}"/>
  <rect x="85" y="52" width="17" height="25" rx="8.5" fill="${b.sluchatka}"/>
  <rect x="22" y="57" width="9" height="15" rx="4.5" fill="${b.sluchatkaLesk}" opacity="0.9"/>
  <rect x="89" y="57" width="9" height="15" rx="4.5" fill="${b.sluchatkaLesk}" opacity="0.9"/>

  <!-- tvářičky, jen naznačené -->
  <ellipse cx="38" cy="67" rx="6" ry="3.6" fill="${b.tvare}" opacity="0.35"/>
  <ellipse cx="82" cy="67" rx="6" ry="3.6" fill="${b.tvare}" opacity="0.35"/>

  ${oboci}
  ${oci}
  ${usta}
</svg>`.trim();
  },

  // ─── Oči ──────────────────────────────────────────────────────────────────

  _oci(vyraz) {
    const b = this.BARVY;

    // Zavřené, spokojeně přivřené oči
    if (vyraz === 'radost' || vyraz === 'nadseni') {
      return `
  <path d="M42 56 Q48 50 54 56" stroke="${b.zornice}" stroke-width="3"
        stroke-linecap="round" fill="none"/>
  <path d="M66 56 Q72 50 78 56" stroke="${b.zornice}" stroke-width="3"
        stroke-linecap="round" fill="none"/>`;
    }

    // Ospalé oči: horní víčko spadlé přes polovinu, pohled dolů
    if (vyraz === 'unaveni') {
      return `
  <ellipse cx="48" cy="58" rx="7.5" ry="6.5" fill="${b.ocnibelmo}"/>
  <ellipse cx="72" cy="58" rx="7.5" ry="6.5" fill="${b.ocnibelmo}"/>
  <circle cx="48" cy="60" r="3.8" fill="${b.zornice}"/>
  <circle cx="72" cy="60" r="3.8" fill="${b.zornice}"/>
  <path d="M40.5 58 Q48 50.5 55.5 58 Z" fill="${b.plet}"/>
  <path d="M64.5 58 Q72 50.5 79.5 58 Z" fill="${b.plet}"/>
  <path d="M40.5 57.5 Q48 51.5 55.5 57.5" stroke="${b.zornice}" stroke-width="2"
        stroke-linecap="round" fill="none"/>
  <path d="M64.5 57.5 Q72 51.5 79.5 57.5" stroke="${b.zornice}" stroke-width="2"
        stroke-linecap="round" fill="none"/>`;
    }

    // Zamyšlení: pohled zřetelně do strany a vzhůru, jako když člověk hledá slovo
    if (vyraz === 'zamysleni') {
      return `
  <ellipse cx="48" cy="56" rx="7.5" ry="8" fill="${b.ocnibelmo}"/>
  <ellipse cx="72" cy="56" rx="7.5" ry="8" fill="${b.ocnibelmo}"/>
  <circle cx="51.5" cy="54" r="4.2" fill="${b.zornice}"/>
  <circle cx="75.5" cy="54" r="4.2" fill="${b.zornice}"/>
  <circle cx="53" cy="51.8" r="1.4" fill="#FFFFFF"/>
  <circle cx="77" cy="51.8" r="1.4" fill="#FFFFFF"/>`;
    }

    return `
  <ellipse cx="48" cy="56" rx="7.5" ry="8" fill="${b.ocnibelmo}"/>
  <ellipse cx="72" cy="56" rx="7.5" ry="8" fill="${b.ocnibelmo}"/>
  <circle cx="48" cy="57" r="4.2" fill="${b.zornice}"/>
  <circle cx="72" cy="57" r="4.2" fill="${b.zornice}"/>
  <circle cx="49.6" cy="54.6" r="1.5" fill="#FFFFFF"/>
  <circle cx="73.6" cy="54.6" r="1.5" fill="#FFFFFF"/>`;
  },

  // ─── Obočí ────────────────────────────────────────────────────────────────

  _oboci(vyraz) {
    const b = this.BARVY;
    const s = `stroke="${b.vlasy}" stroke-width="2.8" stroke-linecap="round" fill="none"`;

    switch (vyraz) {
      case 'zamysleni':
        // jedno nadzvednuté — přemýšlí
        return `
  <path d="M41 45 Q48 42 55 44" ${s}/>
  <path d="M65 42 Q72 38 79 41" ${s}/>`;
      case 'povzbuzeni':
        // mírně nahoru u vnitřních konců — účast
        return `
  <path d="M41 46 Q48 43 55 45" ${s}/>
  <path d="M65 45 Q72 43 79 46" ${s}/>`;
      case 'nadseni':
        return `
  <path d="M41 42 Q48 38 55 41" ${s}/>
  <path d="M65 41 Q72 38 79 42" ${s}/>`;
      case 'unaveni':
        // Skoro rovné a posazené výš. Ospalost nesou přivřené oči — jakékoli
        // zalomení obočí by z ní udělalo mrzutou, a to SUN nikdy není.
        return `
  <path d="M41 45.5 Q48 44.5 55 45.5" ${s}/>
  <path d="M65 45.5 Q72 44.5 79 45.5" ${s}/>`;
      default:
        return `
  <path d="M41 44 Q48 41 55 43" ${s}/>
  <path d="M65 43 Q72 41 79 44" ${s}/>`;
    }
  },

  // ─── Ústa ─────────────────────────────────────────────────────────────────

  _usta(vyraz) {
    const b = this.BARVY;

    switch (vyraz) {
      case 'radost':
        return `
  <path d="M50 70 Q60 79 70 70" stroke="${b.usta}" stroke-width="3.2"
        stroke-linecap="round" fill="none"/>`;
      case 'nadseni':
        // otevřený úsměv
        return `
  <path d="M49 69 Q60 82 71 69 Q60 74 49 69 Z" fill="${b.usta}"/>
  <path d="M52 70 Q60 72 68 70" stroke="#FFFFFF" stroke-width="2"
        stroke-linecap="round" fill="none" opacity="0.7"/>`;
      case 'povzbuzeni':
        return `
  <path d="M52 72 Q60 76 68 72" stroke="${b.usta}" stroke-width="3"
        stroke-linecap="round" fill="none"/>`;
      case 'zamysleni':
        // našpulená pusa posunutá na stranu — hledá to správné slovo
        return `
  <ellipse cx="63" cy="72.5" rx="4.2" ry="3.2" fill="none"
           stroke="${b.usta}" stroke-width="2.8"/>`;
      case 'unaveni':
        return `
  <path d="M53.5 73.5 Q60 74.5 66.5 73.5" stroke="${b.usta}" stroke-width="2.6"
        stroke-linecap="round" fill="none"/>`;
      default:
        return `
  <path d="M52 71 Q60 77 68 71" stroke="${b.usta}" stroke-width="3"
        stroke-linecap="round" fill="none"/>`;
    }
  },

  // ─── Pomůcky pro aplikaci ─────────────────────────────────────────────────

  // Vloží postavu do prvku a umí ji později přemluvit na jiný výraz
  vloz(prvek, vyraz = 'klid', velikost = 96) {
    if (!prvek) return;
    prvek.innerHTML = this.svg(vyraz, velikost);
    prvek.dataset.vyraz = vyraz;
  },

  zmenVyraz(prvek, vyraz, velikost) {
    if (!prvek || prvek.dataset.vyraz === vyraz) return;
    const v = velikost || parseInt(prvek.dataset.velikost, 10) || 96;
    prvek.innerHTML = this.svg(vyraz, v);
    prvek.dataset.vyraz = vyraz;
    // krátké pohnutí, aby změna nálady byla vidět i koutkem oka
    prvek.classList.remove('prave-reagovala');
    void prvek.offsetWidth;
    prvek.classList.add('prave-reagovala');
  },

  // Který výraz se hodí k jaké situaci
  vyrazPro(situace) {
    const M = {
      start: 'klid',
      spravne: 'radost',
      serie: 'nadseni',
      chyba: 'povzbuzeni',
      napoveda: 'zamysleni',
      otazka: 'zamysleni',
      odmena: 'nadseni',
      unava: 'unaveni',
      rozlouceni: 'radost',
      cteni: 'klid',
    };
    return M[situace] || 'klid';
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = { Postava };
