const CACHE_NAME = 'salva-la-tua-casa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/admin.html',
  '/manifest.json',
  '/icona-app.png'
];

// Installazione del service worker e caching dei file principali
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta e files aggiunti');
        return cache.addAll(urlsToCache);
      })
  );
});

// Attivazione del service worker
self.addEventListener('activate', event => {
  console.log('Service Worker attivato');
});

// Intercetta richieste e risponde con cache se disponibile
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
