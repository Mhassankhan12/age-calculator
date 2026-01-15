const CACHE_NAME = "age-calc-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./index.js",
  "./manifest.json"
];

// 1. Install Service Worker & Cache Files
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Serve Files from Cache (Offline Mode)
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});