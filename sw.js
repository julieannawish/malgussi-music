const CACHE='malgussi-v3-21-dog-album-scroll';
const CORE=['./','./index.html','./manifest.webmanifest','./dog_default.png','./app-icon.png','./app-icon-192.png'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    caches.match(e.request).then(cached=>{
      const network=fetch(e.request).then(r=>{
        if(r.ok) caches.open(CACHE).then(c=>c.put(e.request,r.clone()));
        return r;
      }).catch(()=>cached);
      return cached || network;
    })
  );
});
