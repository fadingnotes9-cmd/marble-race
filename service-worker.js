// ============================================
// Service Worker - Marble Race PWA
// ============================================
// Fungsi: cache aset + offline support + auto-update

const CACHE_VERSION = 'marble-race-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './manifest.json',
    './js/matter.min.js',
    './js/game.js',
    './js/firebase-config.js',
    './js/firebase.js',
    './assets/icon-192.png',
    './assets/icon-512.png',
    './assets/icon.svg'
];

// ============================================
// INSTALL: Cache aset saat pertama kali
// ============================================
self.addEventListener('install', (event) => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_VERSION).then((cache) => {
            console.log('[SW] Caching assets...');
            return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
                console.warn('[SW] Partial cache fail:', err);
            });
        }).then(() => self.skipWaiting())
    );
});

// ============================================
// ACTIVATE: Hapus cache lama
// ============================================
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_VERSION)
                    .map((key) => {
                        console.log('[SW] Removing old cache:', key);
                        return caches.delete(key);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// ============================================
// FETCH: Ambil dari cache dulu, fallback ke network
// ============================================
self.addEventListener('fetch', (event) => {
    // Skip Firebase API requests (biar realtime tetap jalan)
    const url = event.request.url;
    if (url.includes('firebasedatabase.app') || 
        url.includes('firebasejs') ||
        url.includes('googleapis.com')) {
        return; // biarkan lewat network
    }

    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) {
                // Ambil dari cache, update di background
                fetch(event.request).then((response) => {
                    if (response && response.status === 200) {
                        caches.open(CACHE_VERSION).then((cache) => {
                            cache.put(event.request, response.clone());
                        });
                    }
                }).catch(() => {});
                return cached;
            }
            // Belum di cache, ambil dari network
            return fetch(event.request);
        })
    );
});
