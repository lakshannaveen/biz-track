self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force new service worker to activate immediately
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName); // Clear all old caches
        })
      );
    }).then(() => {
      return self.clients.claim(); // Take control immediately
    })
  );
});