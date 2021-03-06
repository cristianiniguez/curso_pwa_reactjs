/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

self.__precacheManifest = [].concat(self.__precacheManifest || [], self.__WB_MANIFEST || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute('/index.html');

workbox.googleAnalytics.initialize();

// Google Fonts Caching
workbox.routing.registerRoute(
  /^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [new workbox.expiration.Plugin({ maxAgeSeconds: 30 * 24 * 3600 })],
  }),
  'GET',
);

// Api images Caching
workbox.routing.registerRoute(
  /^https?:\/\/www.themealdb.com\/images\/.*/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images-cache',
    plugin: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
        maxEntries: 20,
      }),
    ],
  }),
);

// Api request Caching
workbox.routing.registerRoute(
  /^https?:\/\/www.themealdb.com\/api\/.*/,
  new workbox.strategies.StaleWhileRevalidate(),
  'GET',
);

// Default Caching
workbox.routing.registerRoute(/^https?.*/, new workbox.strategies.NetworkFirst(), 'GET');
