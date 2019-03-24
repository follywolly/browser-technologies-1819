const mapbox = require('./mapbox.js')


const utils = {
  async retrieve(query) {
    const location = await mapbox.search(query) // returns location info
    if (!location) return false
    const directions = await mapbox.route(location.features[0].center) // returns waypoints and routes
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
