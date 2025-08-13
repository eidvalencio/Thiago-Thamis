'use strict';
const CACHE_NAME = 'lista-cache-' + self.registration.scope.replace(/[^a-zA-Z0-9]/g, '') + '-v2';
const urlsToCache = [ './', 'index.html', 'manifest.json', 'icon-192x192.png', 'icon-512x512.png' ];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache))));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(n => Promise.all(n.map(c => (c.startsWith('lista-cache-') && c !== CACHE_NAME) ? caches.delete(c) : null)))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));