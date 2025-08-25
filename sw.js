const CACHE_NAME = 'mussoorie-cab-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/UserContext.tsx',
  '/services/geminiService.ts',
  '/components/AdminPanel.tsx',
  '/components/BookingConfirmation.tsx',
  '/components/BookingForm.tsx',
  '/components/CarSelection.tsx',
  '/components/constants.tsx',
  '/components/FareDetails.tsx',
  '/components/Header.tsx',
  '/components/IconComponents.tsx',
  '/components/InstallPWAButton.tsx',
  '/components/Loader.tsx',
  '/components/Login.tsx',
  '/components/PaymentForm.tsx',
  '/icon-192x192.png',
  '/icon-512x512.png'
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
  // We only want to cache GET requests
  if (event.request.method !== 'GET') {
      return;
  }
  
  // For requests to external CDNs (like tailwindcss or aistudiocdn), use a "stale-while-revalidate" strategy.
  if (event.request.url.includes('cdn.tailwindcss.com') || event.request.url.includes('aistudiocdn.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          // Return cached response immediately, and update cache in the background.
          return response || fetchPromise;
        });
      })
    );
    return;
  }

  // For all other requests, use a "cache-first" strategy.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // If not in cache, fetch from network
        return fetch(event.request);
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
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});