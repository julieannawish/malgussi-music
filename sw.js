const CACHE='malgussi-v3-51-video-single-frame';
const CORE=['./','./index.html','./manifest.webmanifest','./dog_default.png','./app-icon.png','./app-icon-192.png'];

self.addEventListener('message', event=>{
  if(event.data && event.data.type==='SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('install', event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(CORE))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin) return;

  const isShell =
    url.pathname.endsWith('/') ||
    url.pathname.endsWith('/index.html') ||
    url.pathname.endsWith('/manifest.webmanifest') ||
    url.pathname.endsWith('/sw.js');

  if(isShell){
    event.respondWith(
      fetch(event.request,{cache:'no-store'})
        .then(resp=>{
          if(resp.ok) caches.open(CACHE).then(c=>c.put(event.request,resp.clone()));
          return resp;
        })
        .catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached=>{
      if(cached) return cached;
      return fetch(event.request).then(resp=>{
        if(resp.ok) caches.open(CACHE).then(c=>c.put(event.request,resp.clone()));
        return resp;
      });
    })
  );
});
