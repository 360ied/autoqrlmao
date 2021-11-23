self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open("main")
      .then((cache) =>
        cache.addAll([
          "index.html",
          "style.css",
          "app.js",
          "check-circle.svg",
          "qrcode.min.js",
        ])
      )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
