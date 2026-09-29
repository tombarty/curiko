// ═══════════════════════════════════════════════════════════════════════════
// storage.js — ukládání dat lekcí
//
// Primární úložiště je server (Netlify Blobs), ale všechno se zároveň drží
// v localStorage. Když vypadne internet uprostřed lekce, Ami může dokončit
// a data se odešlou, jakmile se spojení vrátí.
// ═══════════════════════════════════════════════════════════════════════════

const Storage = {
  API: '/api/lekce',
  KLIC_ULOZISTE: 'lekce_rodinny_klic',
  DATA_ULOZISTE: 'lekce_data',
  FRONTA_ULOZISTE: 'lekce_fronta_fotek',

  stav: null,
  online: true,
  cekaNaOdeslani: false,
  _casovac: null,

  // ─── Rodinný klíč ─────────────────────────────────────────────────────────

  klic() {
    let k = null;
    try {
      k = localStorage.getItem(this.KLIC_ULOZISTE);
    } catch (e) {}
    if (!k) {
      k = this.novyKlic();
      this.nastavKlic(k);
    }
    return k;
  },

  novyKlic() {
    // 32 znaků z bezpečného generátoru — nezhádnutelné
    const pole = new Uint8Array(20);
    (window.crypto || window.msCrypto).getRandomValues(pole);
    return Array.from(pole)
      .map((b) => b.toString(36).padStart(2, '0'))
      .join('')
      .slice(0, 32);
  },

  nastavKlic(k) {
    try {
      localStorage.setItem(this.KLIC_ULOZISTE, k);
    } catch (e) {}
  },

  maKlic() {
    try {
      return !!localStorage.getItem(this.KLIC_ULOZISTE);
    } catch (e) {
      return false;
    }
  },

  // ─── Výchozí stav ─────────────────────────────────────────────────────────

  vychozi() {
    return {
      verze: 1,
      profil: null,
      nastaveni: this.vychoziNastaveni(),
      pokrok: {},
      lekce: [],
      rozpracovana: null,
      zalozeno: null,
    };
  },

  vychoziNastaveni() {
    return {
      pin: null,                  // PIN k rodičovskému přehledu
      cilovaDelkaMin: 30,
      povolitFotky: true,
      hlasoveCteni: true,         // předčítání zadání (ne nahrávání)
      velikostPisma: 'stredni',   // male | stredni | velke | hodneVelke
      radkovani: 'stredni',       // stredni | siroke
      vypnoutAnimace: false,
      tmavyRezim: false,
      slovniDetektivCasto: 'obcas', // nikdy | obcas | casto
      pocetMatUloh: 15,
      vikendy: true,
      vypnutaTemata: [],
      poznamkyRodice: [],
    };
  },

  // ─── Načtení ──────────────────────────────────────────────────────────────

  async nacti() {
    const lokalni = this.nactiLokalne();

    try {
      const odpoved = await fetch(`${this.API}?akce=stav&klic=${this.klic()}`, {
        method: 'GET',
      });
      if (!odpoved.ok) throw new Error('server ' + odpoved.status);
      const ze_serveru = await odpoved.json();
      this.online = true;

      // Kdyby lokální data byla novější (nedokončená synchronizace), použij je
      if (lokalni && this.novejsi(lokalni, ze_serveru)) {
        this.stav = lokalni;
        this.naplanujOdeslani();
      } else {
        this.stav = { ...this.vychozi(), ...ze_serveru };
        if (!this.stav.nastaveni) this.stav.nastaveni = this.vychoziNastaveni();
      }
    } catch (e) {
      // Bez internetu jedeme z lokální zálohy
      this.online = false;
      this.stav = lokalni || this.vychozi();
    }

    this.ulozLokalne();
    return this.stav;
  },

  novejsi(a, b) {
    const ta = Date.parse((a && a.ulozeno) || 0) || 0;
    const tb = Date.parse((b && b.ulozeno) || 0) || 0;
    return ta > tb;
  },

  nactiLokalne() {
    try {
      const raw = localStorage.getItem(this.DATA_ULOZISTE);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  ulozLokalne() {
    try {
      localStorage.setItem(this.DATA_ULOZISTE, JSON.stringify(this.stav));
    } catch (e) {
      // Plné úložiště — zkus uvolnit místo zahozením starších lekcí
      if (this.stav && this.stav.lekce && this.stav.lekce.length > 30) {
        this.stav.lekce = this.stav.lekce.slice(0, 30);
        try {
          localStorage.setItem(this.DATA_ULOZISTE, JSON.stringify(this.stav));
        } catch (e2) {}
      }
    }
  },

  // ─── Ukládání ─────────────────────────────────────────────────────────────

  // Uloží okamžitě lokálně a s malým zpožděním na server, aby se rychlé
  // změny po sobě (odpověď za odpovědí) neodesílaly jako desítky požadavků.
  uloz() {
    this.stav.ulozeno = new Date().toISOString();
    this.ulozLokalne();
    this.naplanujOdeslani();
  },

  naplanujOdeslani() {
    this.cekaNaOdeslani = true;
    clearTimeout(this._casovac);
    this._casovac = setTimeout(() => this.odesli(), 1500);
  },

  async odesli() {
    if (!this.stav) return false;
    try {
      const odpoved = await fetch(`${this.API}?akce=stav&klic=${this.klic()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.stav),
      });
      if (!odpoved.ok) throw new Error('server ' + odpoved.status);
      this.online = true;
      this.cekaNaOdeslani = false;
      this.odesliFrontuFotek();
      return true;
    } catch (e) {
      this.online = false;
      // Zkusíme to znovu za chvíli
      clearTimeout(this._casovac);
      this._casovac = setTimeout(() => this.odesli(), 20000);
      return false;
    }
  },

  // Uloží stav i při zavírání stránky (iPad uspaný uprostřed lekce)
  ulozIhnedSynchronne() {
    if (!this.stav) return;
    this.stav.ulozeno = new Date().toISOString();
    this.ulozLokalne();
    try {
      const data = new Blob([JSON.stringify(this.stav)], { type: 'application/json' });
      navigator.sendBeacon(`${this.API}?akce=stav&klic=${this.klic()}`, data);
    } catch (e) {}
  },

  // ─── Fotky ────────────────────────────────────────────────────────────────

  noveIdFotky() {
    const pole = new Uint8Array(8);
    (window.crypto || window.msCrypto).getRandomValues(pole);
    return (
      'f' +
      Array.from(pole)
        .map((b) => b.toString(36))
        .join('')
        .slice(0, 15)
    );
  },

  async nahrajFotku(soubor) {
    const id = this.noveIdFotky();
    try {
      const odpoved = await fetch(`${this.API}?akce=foto&klic=${this.klic()}&id=${id}`, {
        method: 'POST',
        headers: { 'Content-Type': soubor.type || 'image/jpeg' },
        body: soubor,
      });
      if (!odpoved.ok) {
        const t = await odpoved.json().catch(() => ({}));
        return { ok: false, chyba: t.chyba || 'Nahrání se nepovedlo.' };
      }
      return { ok: true, id };
    } catch (e) {
      // Bez internetu si fotku podržíme v prohlížeči a pošleme ji později
      const ulozeno = await this.doFrontyFotek(id, soubor);
      return ulozeno
        ? { ok: true, id, cekaNaOdeslani: true }
        : { ok: false, chyba: 'Fotku se nepodařilo uložit.' };
    }
  },

  async doFrontyFotek(id, soubor) {
    try {
      const base64 = await this.souborNaBase64(soubor);
      const fronta = this.nactiFrontuFotek();
      fronta.push({ id, typ: soubor.type || 'image/jpeg', data: base64 });
      localStorage.setItem(this.FRONTA_ULOZISTE, JSON.stringify(fronta));
      return true;
    } catch (e) {
      return false;
    }
  },

  nactiFrontuFotek() {
    try {
      const raw = localStorage.getItem(this.FRONTA_ULOZISTE);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  async odesliFrontuFotek() {
    const fronta = this.nactiFrontuFotek();
    if (!fronta.length) return;
    const zbyva = [];
    for (const polozka of fronta) {
      try {
        const blob = this.base64NaBlob(polozka.data, polozka.typ);
        const odpoved = await fetch(
          `${this.API}?akce=foto&klic=${this.klic()}&id=${polozka.id}`,
          { method: 'POST', headers: { 'Content-Type': polozka.typ }, body: blob }
        );
        if (!odpoved.ok) zbyva.push(polozka);
      } catch (e) {
        zbyva.push(polozka);
      }
    }
    try {
      if (zbyva.length) {
        localStorage.setItem(this.FRONTA_ULOZISTE, JSON.stringify(zbyva));
      } else {
        localStorage.removeItem(this.FRONTA_ULOZISTE);
      }
    } catch (e) {}
  },

  urlFotky(id) {
    return `${this.API}?akce=foto&klic=${this.klic()}&id=${id}`;
  },

  souborNaBase64(soubor) {
    return new Promise((splneno, chyba) => {
      const ctecka = new FileReader();
      ctecka.onload = () => splneno(String(ctecka.result).split(',')[1]);
      ctecka.onerror = chyba;
      ctecka.readAsDataURL(soubor);
    });
  },

  base64NaBlob(base64, typ) {
    const binarni = atob(base64);
    const pole = new Uint8Array(binarni.length);
    for (let i = 0; i < binarni.length; i++) pole[i] = binarni.charCodeAt(i);
    return new Blob([pole], { type: typ });
  },

  // ─── Smazání ──────────────────────────────────────────────────────────────

  async smazVse() {
    try {
      await fetch(`${this.API}?akce=vse&klic=${this.klic()}`, { method: 'DELETE' });
    } catch (e) {}
    try {
      localStorage.removeItem(this.DATA_ULOZISTE);
      localStorage.removeItem(this.FRONTA_ULOZISTE);
      localStorage.removeItem(this.KLIC_ULOZISTE);
    } catch (e) {}
    this.stav = this.vychozi();
  },
};

// Při zavření nebo uspání stránky dolož data na server
if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', () => Storage.ulozIhnedSynchronne());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') Storage.ulozIhnedSynchronne();
  });
  window.addEventListener('online', () => {
    if (Storage.cekaNaOdeslani) Storage.odesli();
    Storage.odesliFrontuFotek();
  });
}

if (typeof module !== 'undefined' && module.exports) module.exports = { Storage };
