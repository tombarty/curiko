// ═══════════════════════════════════════════════════════════════════════════
// lekce.mjs — serverová vrstva pro Denní lekce se SUN
//
// Data jsou uložená v Netlify Blobs pod "rodinným klíčem" — dlouhým náhodným
// řetězcem, který si vygeneruje prohlížeč při prvním spuštění. Bez klíče se
// k datům nikdo nedostane; klíč se nikde neindexuje ani nevypisuje.
//
// Endpointy (vše přes /api/lekce):
//   GET  ?akce=stav&klic=K              → { profil, pokrok, lekce[], nastaveni }
//   POST ?akce=stav&klic=K              → uloží celý stav (tělo = JSON stavu)
//   POST ?akce=foto&klic=K&id=F         → uloží fotku (tělo = binární data)
//   GET  ?akce=foto&klic=K&id=F         → vrátí fotku
//   DELETE ?akce=foto&klic=K&id=F       → smaže fotku
//   DELETE ?akce=vse&klic=K             → smaže profil včetně všech fotek
// ═══════════════════════════════════════════════════════════════════════════

import { getStore } from '@netlify/blobs';

const MAX_FOTO_BYTU = 4 * 1024 * 1024;      // 4 MB na fotku
const MAX_STAV_BYTU = 2 * 1024 * 1024;      // 2 MB na datový soubor
const POVOLENE_TYPY = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

const hlavicky = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};

function chyba(zprava, kod = 400) {
  return Response.json({ chyba: zprava }, { status: kod, headers: hlavicky });
}

// Klíč musí vypadat jako náš vygenerovaný — brání to průchodu cizích cest
// (napříkad "../" nebo prázdné hodnoty) do názvu blobu.
function klicOk(k) {
  return typeof k === 'string' && /^[a-z0-9]{24,64}$/.test(k);
}

function idOk(i) {
  return typeof i === 'string' && /^[a-z0-9-]{8,64}$/.test(i);
}

function prazdnyStav() {
  return {
    verze: 1,
    profil: null,      // vyplní se při prvním spuštění
    nastaveni: null,
    pokrok: {},        // dovednost → { uroven, pokusy, spravne, ... }
    lekce: [],         // dokončené lekce (nejnovější první)
    rozpracovana: null,
    zalozeno: null,
  };
}

export default async (req) => {
  try {
    const url = new URL(req.url);
    const akce = url.searchParams.get('akce');
    const klic = url.searchParams.get('klic');

    if (!klicOk(klic)) return chyba('Neplatný rodinný klíč.', 403);

    const store = getStore('curiko-lekce');
    const cestaStavu = `${klic}/stav.json`;

    // ─── STAV ───────────────────────────────────────────────────────────────
    if (akce === 'stav') {
      if (req.method === 'GET') {
        const raw = await store.get(cestaStavu);
        const stav = raw ? JSON.parse(raw) : prazdnyStav();
        return Response.json(stav, { headers: hlavicky });
      }

      if (req.method === 'POST') {
        const text = await req.text();
        if (text.length > MAX_STAV_BYTU) return chyba('Data jsou příliš velká.', 413);

        let stav;
        try {
          stav = JSON.parse(text);
        } catch {
          return chyba('Data nejsou platný JSON.');
        }
        if (!stav || typeof stav !== 'object' || Array.isArray(stav)) {
          return chyba('Data musí být objekt.');
        }

        stav.ulozeno = new Date().toISOString();
        if (!stav.zalozeno) stav.zalozeno = stav.ulozeno;

        await store.set(cestaStavu, JSON.stringify(stav));
        return Response.json({ ok: true, ulozeno: stav.ulozeno }, { headers: hlavicky });
      }

      return chyba('Nepodporovaná metoda.', 405);
    }

    // ─── FOTKY ──────────────────────────────────────────────────────────────
    if (akce === 'foto') {
      const id = url.searchParams.get('id');
      if (!idOk(id)) return chyba('Neplatné id fotky.');
      const cestaFotky = `${klic}/foto/${id}`;

      if (req.method === 'POST') {
        const typ = (req.headers.get('content-type') || '').split(';')[0].trim();
        if (!POVOLENE_TYPY.includes(typ)) {
          return chyba('Povolené jsou jen obrázky (JPEG, PNG, WebP, HEIC).', 415);
        }

        const data = await req.arrayBuffer();
        if (data.byteLength === 0) return chyba('Fotka je prázdná.');
        if (data.byteLength > MAX_FOTO_BYTU) {
          return chyba('Fotka je větší než 4 MB. Zkus ji vyfotit znovu.', 413);
        }

        await store.set(cestaFotky, data, {
          metadata: { typ, nahrano: new Date().toISOString() },
        });
        return Response.json({ ok: true, id }, { headers: hlavicky });
      }

      if (req.method === 'GET') {
        const vysledek = await store.getWithMetadata(cestaFotky, { type: 'arrayBuffer' });
        if (!vysledek) return chyba('Fotka nenalezena.', 404);
        const typ = (vysledek.metadata && vysledek.metadata.typ) || 'image/jpeg';
        return new Response(vysledek.data, {
          headers: { ...hlavicky, 'Content-Type': typ },
        });
      }

      if (req.method === 'DELETE') {
        await store.delete(cestaFotky);
        return Response.json({ ok: true }, { headers: hlavicky });
      }

      return chyba('Nepodporovaná metoda.', 405);
    }

    // ─── SMAZÁNÍ VŠEHO ──────────────────────────────────────────────────────
    if (akce === 'vse' && req.method === 'DELETE') {
      const seznam = await store.list({ prefix: `${klic}/` });
      for (const polozka of seznam.blobs) {
        await store.delete(polozka.key);
      }
      return Response.json({ ok: true, smazano: seznam.blobs.length }, { headers: hlavicky });
    }

    return chyba('Neznámá akce.', 404);
  } catch (err) {
    return Response.json(
      { chyba: 'Chyba serveru.', detail: String(err && err.message ? err.message : err) },
      { status: 500, headers: hlavicky }
    );
  }
};

export const config = {
  path: '/api/lekce',
};
