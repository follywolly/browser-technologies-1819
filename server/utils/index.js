const mapbox = require('./mapbox.js')


const utils = {
  async locations(query) {
    if (!query) return undefined
    const locations = await mapbox.search(query) // returns location info
    console.log(locations.features)
    if (locations.features.length === 0) return undefined
    return locations.features
  },
  async steps(query) {
    if (!query) return undefined
    const location = query.split(',')
    const directions = await mapbox.route(location) // returns waypoints and routes
    if (directions.routes.length === 0) return []

    const steps = directions.routes[0].legs[0].steps.map(step => ({
      mod: step.maneuver.modifier,
      type: step.maneuver.type,
      distance: step.distance,
      instruction: step.maneuver.instruction,
      full: step
    }))
    console.log('step: ', steps[0].full);
    return steps
  }
}

module.exports = utils
