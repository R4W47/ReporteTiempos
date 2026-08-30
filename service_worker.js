// Service Worker mínimo, SOLO para que el sitio sea "instalable" como PWA.
// No guarda nada en caché — siempre va a la red por la versión más reciente,
// para evitar mostrar contenido viejo (este sistema depende de datos en vivo).

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Siempre red, nunca caché
  event.respondWith(fetch(event.request));
});