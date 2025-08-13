const CACHE_NAME = 'minhas-compras-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Adicione aqui outros arquivos se você os separar no futuro (CSS, JS, imagens)
  // A fonte externa não será cacheada por este método simples, mas o app funcionará.
];

// Evento de instalação: abre o cache e armazena os arquivos principais do app.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de fetch: intercepta as requisições de rede.
self.addEventListener('fetch', event => {
  event.respondWith(
    // Tenta encontrar a resposta no cache primeiro.
    caches.match(event.request)
      .then(response => {
        // Se encontrar no cache, retorna a resposta do cache.
        if (response) {
          return response;
        }
        // Se não, faz a requisição à rede.
        return fetch(event.request);
      })
  );
});

// Evento de ativação: limpa caches antigos se houver uma nova versão.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

