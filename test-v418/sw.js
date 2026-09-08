/* TEST BUILD of V4.18 for background-audio comparison.
   IMPORTANT: this SW must NEVER delete the main app's caches. It only manages its
   own uniquely-named cache, so running this test cannot wipe the real app's files. */
const CACHE='malgussi-test418-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./dog_default.png','./profile_default.png','./app-icon.png','./app-icon-192.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(keys=>Promise.all(
    // Only remove OLD copies of THIS test cache. Leave every other cache alone.
    keys.filter(k=>k!==CACHE && k.startsWith('malgussi-test418')).map(k=>caches.delete(k))
  )).then(()=>self.clients.claim())
));
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(x=>x.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(c=>c||caches.match('./'))))});
