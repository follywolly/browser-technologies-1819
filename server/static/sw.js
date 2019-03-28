var CACHE = 'core-cache';

self.addEventListener('install', e => {
  e.waitUntil(precache())
})

self.addEventListener('fetch', async e => {
  const request = e.request
  e.respondWith(caches
    .open(CACHE)
    .then(cache => cache.match(request))
    .then(res => {
      if (res) {
        // get from cache
        return res
      } else {
        // get from server
        return fetch(request)
          .then(response => caches
            .open(CACHE)
            .then(cache => cache.put(request, response.clone()))
            .then(() => response)
          )
          .catch(err => caches
            .open(CACHE)
            .then(cache => cache.match('/offline')
              .then(res => res)
            )
          )
      }
    })
  )

  e.waitUntil(update(e.request))
})

function precache() {
  return caches.open(CACHE)
    .then(cache => cache
      .addAll([
        '/',
        '/offline',
        '/css/styles.css',
        '/js/index.js'
      ])
    )
    .then(() => self.skipWaiting())
}

function update(request) {
  return caches.open(CACHE)
    .then(cache => fetch(request)
      .then(response => cache.put(request, response))
    )
    .catch(console.error)
}
