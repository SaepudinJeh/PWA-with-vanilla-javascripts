const CACHE_NAME = 'submission-v-2';
const DINAMIC_CACHE = 'dinamic-cache-v1';

const urlsToCache = [
    "/", 
    "/index.html",
    "/manifest.json",
    "/sw.js",
    "/css/materialize.min.css",
    "/css/style.css",
    "/img/icon-192x192.png",
    "/img/icon-512x512.png",
    "/img/maskable-icon.png",
    "/js/api.js",
    "/js/bookmark.js",
    "/js/db.js",
    "/js/detail.js",
    "/js/idb.js",
    "/js/index.js",
    "/js/materialize.min.js",
    "/js/standings.js",
    "/js/teams.js",
    "/pages/bookmark.html",
    "/pages/detail.html",
    "/pages/standings.html"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
      })
    );
});

self.addEventListener('fetch', event => {
   event.respondWith(
       caches.match(event.request).then(cacheRes => {
           return cacheRes || fetch(event.request).then( fetchRes => {
               return caches.open(DINAMIC_CACHE).then( cache => {
                   cache.put(event.request.url, fetchRes.clone());
                   return fetchRes;
               })
           })
       })
   );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    if (cacheName != CACHE_NAME) {
                        console.log(`Service Worker: ${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    )
})

self.addEventListener('push', event => {
    let body;

    if(event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }

    const options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
})