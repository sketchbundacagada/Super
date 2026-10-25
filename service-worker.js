// Permite abrir o app sem internet. Ao atualizar o comprovantes.html, troque o número da versão abaixo.
const CACHE_NOME = 'comprovantes-v1';
const ARQUIVOS = ['./', './comprovantes.html', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NOME).then(c => c.addAll(ARQUIVOS))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ns => Promise.all(ns.filter(n => n !== CACHE_NOME).map(n => caches.delete(n)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return; // envios ao Google passam direto
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE_NOME).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
});
