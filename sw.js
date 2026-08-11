const CACHE='malgussi-v3-27-recent-folder';
const CORE=['./','./index.html','./manifest.webmanifest','./dog_default.png','./app-icon.png','./app-icon-192.png'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isAppShell =
    url.pathname.endsWith('/index.html') ||
    url.pathname.endsWith('/manifest.webmanifest') ||
    url.pathname.endsWith('/sw.js');

  if (isAppShell) {
    event.respondWith(
      fetch(event.request, {cache:'no-store'})
        .then(response => {
          if (response.ok) caches.open(CACHE).then(c => c.put(event.request, response.clone()));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok && url.origin === location.origin) {
          caches.open(CACHE).then(c => c.put(event.request, response.clone()));
        }
        return response;
      });
    })
  );
});
