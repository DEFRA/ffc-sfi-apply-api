const cache = require('../cache')

async function processStandardsMessage (message, receiver) {
  try {
    console.info('received request for available standards')
    cache.set('standards', message.correlationId, message.body)
    console.info(`request for standards stored in cache, correlation Id: ${message.correlationId}`)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processStandardsMessage
