const CACHE_NAME = "age-calc-v2";
const ASSETS = [
  "/",
  "index.html",
  "style.css",
  "index.js",
  "manifest.json",
  "icon-512 copy.png"
];

// Install: cache app shell and activate immediately
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activate: remove old caches and take control of clients
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: stale-while-revalidate strategy for GET requests
self.addEventListener("fetch", (e) => {
  if (e.request.method !== 'GET') return;

  e.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(e.request);

    // Try network in background and update the cache
    const networkPromise = fetch(e.request).then((networkResponse) => {
      if (networkResponse && networkResponse.ok) {
        cache.put(e.request, networkResponse.clone());
      }
      return networkResponse;
    }).catch(() => {});

    // Return cached if available, else wait for network
    return cachedResponse || networkPromise;
  })());
});

// Listen for messages from the page (e.g., SKIP_WAITING)
self.addEventListener('message', (e) => {
  if (!e.data) return;
  if (e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});