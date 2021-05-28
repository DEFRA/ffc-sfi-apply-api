const cache = require('../cache')
const api = require('../api')

async function processValidateMessage (message, receiver) {
  try {
    console.info('received request for validation')
    cache.set('validation', message.correlationId, message.body)
    console.info(`request for validation stored in cache, correlation Id: ${message.correlationId}`)
    const { payload } = await api.post('/validate')
    cache.update('validation', message.correlationId, payload)
    console.info(`response available for validation check, correlation Id: ${message.correlationId}`)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processValidateMessage
