const CACHE='malgussi-v429';
const ASSETS=['./','./index.html','./manifest.webmanifest','./dog_default.png','./profile_default.png','./app-icon.png','./app-icon-192.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
// V4.26: only purge OLD APP-SHELL caches (malgussi-vNNN). NEVER delete the track
// file cache (malgussi-track-cache-*) — that holds the user's saved MP3/MP4 bytes.
// The old filter deleted every 'malgussi-*' cache except the shell, so each version
// deploy wiped the saved files and playlist items reverted to '원본 없음'.
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE && k.startsWith('malgussi-') && !k.startsWith('malgussi-track-cache')).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(x=>x.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(c=>c||caches.match('./'))))});
