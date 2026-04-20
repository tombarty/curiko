// Počítadlo sessions — trvalé úložiště v Netlify Blobs
// GET /api/counter           → vrátí aktuální počet { count: N }
// GET /api/counter?action=up → zvýší o 1 a vrátí nový počet

import { getStore } from '@netlify/blobs';

export default async (req) => {
  try {
    const store = getStore('curiko-counter');
    const raw = await store.get('sessions');
    let count = parseInt(raw || '0', 10);
    if (!Number.isFinite(count)) count = 0;

    const url = new URL(req.url);
    if (url.searchParams.get('action') === 'up') {
      count++;
      await store.set('sessions', String(count));
    }

    return Response.json(
      { count },
      {
        headers: {
          'Cache-Control': 'no-store',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
};

export const config = {
  path: '/api/counter'
};
