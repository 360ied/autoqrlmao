let cacheURLs = [
  "index.html",
  "style.css",
  "app.js",
  "check-circle.svg",
  "qrcode.js",
  "chevron-left.svg",
  "sun.svg",
  "heart_outline.svg",
  "heart_solid.svg",
];

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.open("main").then((cache) => cache.addAll(cacheURLs)));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
