const fetch = require('node-fetch')

const url = (endpoint, config) => {
  config.insert = config.insert ? config.insert : ''
  config.adjacent = config.adjacent ? config.adjacent + '&' : ''
  return `https://api.mapbox.com/${endpoint}/${config.insert}?${config.adjacent}access_token=${process.env.MAPBOX_API_KEY}`
}
const request = url => new Promise((resolve, reject) => {
    fetch(url)
      .then(raw => raw.json())
      .then(resolve)
      .catch(reject)
  }
)

const end = [4.909457, 52.359849]

const mapbox = {
  end,
  search(query) {
    return request(url('geocoding/v5/mapbox.places', {insert: `${query}.json`}))
  },

  route(start, profile = 'mapbox/walking') {
    return request(url(`directions/v5/${profile}`, {insert: `${start[0]},${start[1]};${end[0]},${end[1]}`, adjacent: 'steps=true'}))
  }
}


module.exports = mapbox
