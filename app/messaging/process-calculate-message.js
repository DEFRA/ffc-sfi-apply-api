const cache = require('../cache')
const calculatePaymentRates = require('../calculation')

async function processCalculateMessage (message, receiver) {
  try {
    const { body, correlationId } = message
    const { code, parcels, callerId } = body
    console.info('Received request for calculation')
    await cache.clear('calculation', correlationId)
    await cache.set('calculation', correlationId, body)
    console.info(`Request for calculation stored in cache, correlation Id: ${message.correlationId}`)
    const application = await cache.get('application', message.correlationId)
    const paymentRates = await calculatePaymentRates(callerId, application.applicationId, parcels, code)
    await cache.update('calculation', message.correlationId, { paymentRates })
    console.info(`Response available for calculation, correlation Id: ${correlationId}`)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processCalculateMessage
