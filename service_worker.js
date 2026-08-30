// Service Worker mínimo, SOLO para que el sitio sea "instalable" como PWA.
// No intercepta ni cachea absolutamente nada — cada petición (páginas y
// llamadas a la API) va siempre directo a la red, sin pasar por aquí.
// Esto evita cualquier interferencia con las peticiones en vivo del sistema.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// A propósito, no hacemos nada aquí (ni event.respondWith, ni caché).
// Con solo tener este listener registrado, el navegador ya considera
// instalable la app, y todas las peticiones siguen su camino normal.
self.addEventListener('fetch', () => {});