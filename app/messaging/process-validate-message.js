const cache = require('../cache')
const api = require('../api')

async function processValidateMessage (message, receiver) {
  try {
    console.info('Received request for validation')
    await cache.clear('validation', message.correlationId)
    await cache.set('validation', message.correlationId, message.body)
    console.info(`Request for validation stored in cache, correlation Id: ${message.correlationId}`)
    const payload = await api.post('/validate', message.body)
    await cache.update('validation', message.correlationId, payload)
    console.info(`Response available for validation check, correlation Id: ${message.correlationId}`)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processValidateMessage
