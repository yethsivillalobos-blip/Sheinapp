const CACHE_NAME = 'flete-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instalación del Service Worker y guardado en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones para que funcione offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve la versión en caché si existe, sino hace la petición a la red
        return response || fetch(event.request);
      })
  );
});
