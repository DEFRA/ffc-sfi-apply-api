const hoek = require('@hapi/hoek')
const config = require('../config').cacheConfig
let eligibilityCache
let standardsCache
let validationCache
let calculationCache

const setup = (server) => {
  eligibilityCache = server.cache({
    expiresIn: config.eligibilitySegment.expiresIn,
    segment: config.eligibilitySegment.name
  })
  standardsCache = server.cache({
    expiresIn: config.standardsSegment.expiresIn,
    segment: config.standardsSegment.name
  })
  validationCache = server.cache({
    expiresIn: config.validationSegment.expiresIn,
    segment: config.validationSegment.name
  })
  calculationCache = server.cache({
    expiresIn: config.calculationSegment.expiresIn,
    segment: config.calculationSegment.name
  })
}

const get = (cacheName, key) => {
  const cache = getCache(cacheName)
  const object = cache.get(key)
  return object ?? {}
}

const set = (cacheName, key, value) => {
  const cache = getCache(cacheName)
  cache.set(key, value)
}

const update = (cacheName, key, object) => {
  const existing = get(cacheName, key)
  hoek.merge(existing, object, { mergeArrays: false })
  set(cacheName, key, existing)
}

const clear = (cacheName, key) => {
  const cache = getCache(cacheName)
  cache.drop(key)
}

const getCache = (cacheName) => {
  switch (cacheName) {
    case 'eligibility':
      return eligibilityCache
    case 'standards':
      return standardsCache
    case 'validation':
      return validationCache
    case 'calculation':
      return calculationCache
    default:
      throw new Error(`Cache ${cacheName} does not exist`)
  }
}

module.exports = {
  setup,
  get,
  set,
  update,
  clear
}
