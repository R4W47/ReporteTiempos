// Service Worker mínimo para que el sitio sea instalable como PWA.
// No cachea las llamadas al Worker/API (siempre deben ir a internet en vivo,
// ya que dependen de datos actualizados). Solo cachea el "cascarón" de la app
// para que cargue más rápido y funcione algo básico sin internet.

const CACHE_NAME = 'sistema-ventas-v1';

const APP_SHELL = [
  './index.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Nunca cachear las llamadas al Worker (deben ser siempre en vivo)
  if (url.includes('workers.dev') || url.includes('api.github.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});