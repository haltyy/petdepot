var cacheName = 'petstore-v1';
var cacheFiles =[
    'pet-depot2.html',
    'products.js',
    'petsttore1.webmanifest',
    'images/image3.jpg',
    'images/image4.jpg',
    'images/img.jpg',
    'images/icon-store-512.png',


];
self.addEventListener('install',(e) =>{
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache)=>{
            console.log('[Service Worker] caching all the files');
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('fetch', function (e) {

    e.respondWith(

        caches.match(e.request).then(function (r) {

            // Download the file if it is not in the cache,

            return r || fetch(e.request).then(function (response) {

                // add the new file to cache

                return caches.open(cacheName).then(function (cache) {

                    cache.put(e.request, response.clone());

                    return response;

                });

            });

        })

    );

});