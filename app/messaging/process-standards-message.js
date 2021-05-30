const cache = require('../cache')
const api = require('../api')

async function processStandardsMessage (message, receiver) {
  try {
    console.info('Received request for available standards')
    await cache.set('standards', message.correlationId, message.body)
    console.info(`Request for standards stored in cache, correlation Id: ${message.correlationId}`)
    const payload = await api.get('/standards', message.body)
    await cache.update('standards', message.correlationId, payload)
    console.info(`Response available for standards request, correlation Id: ${message.correlationId}`)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processStandardsMessage
