const config = require('../config')
module.exports = {
  plugin: require('@hapi/yar'),
  options: {
    storeBlank: true,
    maxCookieSize: 0,
    cache: {
      cache: config.cacheName,
      expiresIn: config.sessionTimeoutMinutes * 60 * 1000
    }
  }
}
