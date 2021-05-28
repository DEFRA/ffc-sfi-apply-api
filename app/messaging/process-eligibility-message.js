const cache = require('../cache')
const api = require('../api')

async function processEligibilityMessage (message, receiver) {
  try {
    console.info('received request for eligibility check')
    cache.set('eligibility', message.correlationId, message.body)
    console.info(`request for eligibility check stored in cache, correlation Id: ${message.correlationId}`)
    const { payload } = await api.post('/check-eligibility')
    cache.update('eligibility', message.correlationId, payload)
    console.info(`response available for eligibility check, correlation Id: ${message.correlationId}`)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processEligibilityMessage
