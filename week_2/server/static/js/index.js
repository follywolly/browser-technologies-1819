import config from './secret.js'

if ('localStorage' in window) {
  console.log('localStorage possible');
}
if ('geolocation' in navigator) {
  handleGeo()
}

var loaded = false

var mapContainer = document.querySelector('#map')

if (mapContainer) {
  handleMap()
}

setTimeout(function(){
  if (loaded) {
    console.log('on time');
  } else {
    console.log('too late');

  }
}, 2000)

function handleGeo() {
  var form = document.querySelector('#search__form')
  var input = document.querySelector('#query')
  input.placeholder = 'Use current location'

  if (!form) return
  form.addEventListener('submit', function(e) {
    e.preventDefault()
    console.log('trying to get current location');
    if (query.value === '') {
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          console.log(pos.coords.latitude + ',' + pos.coords.longitude)
          useCurrentLocation(pos)
        }
      )
    } else {
      getLocation(query.value)
    }

  })
}

function handleMap() {
  document.querySelector('body').classList.add('map')
  mapContainer.classList.add('show')
  var center = window.location.search.split('=')[1].split('&')[0].split(',')
  var endCenter = [4.909457, 52.359849]

  var container = document.querySelector('#result')

  mapboxgl.accessToken = config.key
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/fjvdpol/cjtpkzlcg055r1fm34nwdnxw1', // stylesheet location
    center: center,
    zoom: 14, // starting zoom
    pitch: 80

  })
  var marker = document.createElement('div')
  marker.classList.add('marker')

  var endMarker = document.createElement('div')
  endMarker.classList.add('marker')
  endMarker.classList.add('end')


  new mapboxgl.Marker(marker)
    .setLngLat(center)
    .addTo(map)

  new mapboxgl.Marker(endMarker)
    .setLngLat(endCenter)
    .addTo(map)

  container.classList.add('hidden')

  map.on('load', function(){
    getRoute(center, endCenter, map)

    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }))
    setTimeout(
      function(){
        var button = document.querySelectorAll('#map .mapboxgl-ctrl-geolocate')[0]
        if (button) {
          eventFire(button, 'click')
        }

        var listButton = document.querySelector('#list-button')
        listButton.classList.add('show')
        listButton.addEventListener('click', function(e) {
          console.log('clickity')
          if (container.classList.contains('hidden')) {
            listButton.innerText = 'Switch to map view'
            mapContainer.classList.remove('show')
            container.classList.remove('hidden')
            document.body.classList.remove('map')
            if ('scrollTo' in window) {
              window.scrollTo(0,0)
            }
          } else {
            listButton.innerText = 'Switch to list view'
            mapContainer.classList.add('show')
            container.classList.add('hidden')
            document.querySelector('body').classList.add('map')

          }
        })
      },
      1000
    )



  })



  loaded = true
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

function getRoute(start, end, map) {
  var xhttp = new XMLHttpRequest()


  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      var res = xhttp.responseText
      var data = JSON.parse(res)
      data.routes[0].geometry.coordinates.push(end)
      drawRoute(data.routes[0], map)
    }
  }
  xhttp.open('GET', 'https://api.mapbox.com/directions/v5/mapbox/walking/'+start[0]+','+start[1]+';'+end[0]+','+end[1]+'?steps=true&geometries=geojson&access_token='+config.key, true)
  xhttp.send()

}
function drawRoute(data, map) {
  var route = data.geometry.coordinates;
  var geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route
    }
  };
  // if the route already exists on the map, reset it using setData
  if (map.getSource('route')) {
    map.getSource('route').setData(geojson);
  } else { // otherwise, make a new request
    console.log('should draw map')
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        lineMetrics: true,
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        }
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#f09819',
        'line-gradient': [
          'interpolate',
          ['linear'],
          ['line-progress'],
          0, "#f09819",
          1, "#ff5858"
        ],
        'line-width': 5,
        'line-opacity': 1
      }
    });
  }
}

function useCurrentLocation(location) {
  console.log(window.location);
  window.location.href = window.location.origin + '/result?c=' + location.coords.longitude + ',' + location.coords.latitude + '&q=Current location'
}

function getLocation(location) {
  var xhttp = new XMLHttpRequest()

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      var res = xhttp.responseText
      res = JSON.parse(res)
      genOptions(res)
    }
  }
  xhttp.open('GET', 'http://cors-anywhere.herokuapp.com/https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token='+config.key, true)
  xhttp.send()
}


function genOptions(res) {
  var routes = res.features
  var container = document.querySelector('#result')
  container.innerHTML = ''
  var list = document.createElement('ol')
  container.appendChild(list)
  var item, link;
  for (var i = 0; i < routes.length; i++) {
    item = document.createElement('li')
    link = document.createElement('a')
    link.href = '/result?c=' + routes[i].center + '&q=' + routes[i].text
    item.appendChild(link)
    link.innerText = routes[i].place_name
    list.appendChild(item)
  }
  var loader = document.querySelector('.loader')
}
