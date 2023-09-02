/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'calculadora-espol-precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  'index.html',
  '/',
  'index.css',
  'index.js',
  'promedioMateria.css',
  'promedioMateria.js',
  'images/approved.png',
  'images/github-ico.png',
  'images/linkedin-ico.png',
  'images/logoESPOL.svg',
  'images/sad.svg',
  'pages/promedio-general/promedioGeneral.html',
  'pages/promedio-general/promedioGeneral.css',
  'pages/promedio-general/promedioGeneral.js'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName)
        );
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then((cache) => {
          return fetch(event.request).then((response) => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});

// // Call install Event
// self.addEventListener('install', (e) => {
//   // Wait until promise is finished
//   e.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       // console.log(`Service Worker: Caching Files: ${cache}`);
//       cache
//         .addAll(assetsToCache)
//         // When everything is set
//         .then(() => self.skipWaiting());
//     })
//   );
// });

// // Call Activate Event
// self.addEventListener('activate', (e) => {
//   // console.log('Service Worker: Activated');
//   // Clean up old caches by looping through all of the
//   // caches and deleting any old caches or caches that
//   // are not defined in the list
//   e.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cache) => {
//           if (cache !== CACHE_NAME) {
//             // console.log('Service Worker: Clearing Old Cache');
//             return caches.delete(cache);
//           }
//         })
//       );
//     })
//   );
// });

// // Call Fetch Event
// self.addEventListener('fetch', (e) => {
//   // console.log('Service Worker: Fetching');
//   e.respondWith(
//     fetch(e.request)
//       .then((res) => {
//         // The response is a stream and in order the browser
//         // to consume the response and in the same time the
//         // cache consuming the response it needs to be
//         // cloned in order to have two streams.
//         const resClone = res.clone();
//         // Open cache
//         caches.open(CACHE_NAME).then((cache) => {
//           // Add response to cache
//           cache.put(e.request, resClone);
//         });
//         return res;
//       })
//       .catch((err) => caches.match(e.request).then((res) => res))
//   );
// });
