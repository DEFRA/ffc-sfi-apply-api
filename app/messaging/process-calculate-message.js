const cache = require('../cache')
const calculatePaymentRates = require('../calculation')

async function processCalculateMessage (message, receiver) {
  try {
    const { body, correlationId } = message
    const { code, parcels, callerId, agreementNumber } = body
    console.info('Received request for calculation')
    await cache.clear('calculation', correlationId)
    await cache.set('calculation', correlationId, body)
    console.info(`Request for calculation stored in cache, correlation Id: ${message.correlationId}`)
    await cache.update('calculation', message.correlationId, { ready: false })
    const paymentRates = await calculatePaymentRates(callerId, agreementNumber, parcels, code)
    await cache.update('calculation', message.correlationId, { paymentRates, ready: true })
    console.info(`Response available for calculation, correlation Id: ${correlationId}`)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processCalculateMessage
