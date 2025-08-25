
const CACHE_NAME = 'mussoorie-cab-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/metadata.json'
];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a stream and can only be consumed once.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            // We don't cache non-GET requests or requests to third-party CDNs in this basic setup.
            if (!response || response.status !== 200 || event.request.method !== 'GET') {
              return response;
            }
            
            // We also avoid caching chrome-extension URLs
            if (event.request.url.startsWith('chrome-extension://')) {
                return response;
            }

            // Clone the response because it's also a stream.
            const responseToCache = response.clone();
            
            // Only cache responses from our own origin for simplicity
            if (self.location.origin === new URL(event.request.url).origin) {
                 caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  });
            }

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});