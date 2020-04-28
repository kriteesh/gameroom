
// self.addEventListener('install', function(e) {
//     e.waitUntil(
//       caches.open('airhorner').then(function(cache) {
//         return cache.addAll([
//           '/assets/icon.png',
//           '/assets/iconMain.png',
//           '/manifest.json', 
//           '/index.html',
//           '/css/style.css',
//           '/js/common.js',
//           '/js/main.js',
//           '/js/kenken.js',
//           '/js/sweetAlert.min.js',
//           '/assets/waterclick.mp3'
//         ]);
//       })
//     );
//    });

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
   
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
   });