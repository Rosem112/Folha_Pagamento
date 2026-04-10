// ============================================================
// SERVICE WORKER - RCONT-SCT Folha de Pagamento PWA
// v1.0.0 - Cache-First Strategy + Offline Support
// ============================================================

const CACHE_NAME = 'rcont-sct-v1.0.0';
const CACHE_STATIC = 'rcont-sct-static-v1';
const CACHE_CDN    = 'rcont-sct-cdn-v1';

// Arquivos locais para cache imediato (app shell)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/img/logo.png',
  '/img/icon-192.png',
  '/img/icon-512.png',
];

// Recursos CDN para cache lazy
const CDN_ORIGINS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdn.jsdelivr.net',
  'cdnjs.cloudflare.com',
];

// ─── INSTALL ────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SW] Alguns assets estáticos não foram cacheados:', err);
      });
    })
  );
  self.skipWaiting();
});

// ─── ACTIVATE ───────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_STATIC && k !== CACHE_CDN)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ─── FETCH ──────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora requisições não-GET e extensões do Chrome
  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // CDN: stale-while-revalidate
  if (CDN_ORIGINS.some(origin => url.hostname.includes(origin))) {
    event.respondWith(staleWhileRevalidate(request, CACHE_CDN));
    return;
  }

  // Arquivos locais: cache-first com fallback de rede
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request, CACHE_STATIC));
    return;
  }
});

// ─── ESTRATÉGIAS ────────────────────────────────────────────
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    // Offline fallback
    const fallback = await caches.match('/index.html');
    return fallback || new Response('Você está offline. Abra o app enquanto estiver conectado para cachear os recursos.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => null);

  return cached || await fetchPromise;
}

// ─── BACKGROUND SYNC (reservado para futuro) ────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-folha') {
    console.log('[SW] Background sync: sync-folha');
  }
});
