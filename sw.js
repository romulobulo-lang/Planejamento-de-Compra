// Service Worker melhorado para PWA
const CACHE_NAME = 'setup-planner-v2';
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'offline.html',
  'icons/icon-192.jpeg',
  'icons/icon-512.jpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;

  // Para navegações (páginas HTML) - network-first com fallback para offline
  if (req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept') && req.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(req).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return response;
      }).catch(() => caches.match('offline.html'))
    );
    return;
  }

  // Para requests estáticos: cache-first, depois network
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(response => {
        // cachear respostas same-origin para melhorar offline
        try {
          if (req.url.startsWith(self.location.origin)) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          }
        } catch (e) {
          // ignore
        }
        return response;
      }).catch(() => {
        // fallback simples: retornar ícone se for imagem
        if (req.destination === 'image') {
          return caches.match('icons/icon-192.jpeg');
        }
      });
    })
  );
});