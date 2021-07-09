const cache = require('../cache')
const api = require('../api')

async function processCalculateMessage (message, receiver) {
  try {
    console.info('Received request for calculation')
    await cache.clear('calculation', message.correlationId)
    await cache.set('calculation', message.correlationId, message.body)
    console.info(`Request for calculation stored in cache, correlation Id: ${message.correlationId}`)
    const payload = await api.post('/calculate', message.body, true)
    await cache.update('calculation', message.correlationId, payload)
    console.info(`Response available for calculation, correlation Id: ${message.correlationId}`)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processCalculateMessage
