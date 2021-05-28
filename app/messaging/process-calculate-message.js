const cache = require('../cache')

async function processCalculateMessage (message, receiver) {
  try {
    console.info('received request for calculation')
    cache.set('calculation', message.correlationId, message.body)
    console.info(`request for calculation stored in cache, correlation Id: ${message.correlationId}`)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processCalculateMessage
