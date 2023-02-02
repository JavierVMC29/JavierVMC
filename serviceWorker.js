const staticCalculadoraEspol = 'calculadora-espol-site-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/index.js',
  '/images/approved.png',
  '/images/github-ico.png',
  '/images/linkedin-ico.png',
  '/images/logoESPOL.svg',
  '/images/sad.svg'
];

self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticCalculadoraEspol).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
