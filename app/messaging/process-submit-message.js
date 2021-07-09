const api = require('../api')
const sendMessage = require('./send-message')
const config = require('../config')

async function processSubmitMessage (message, receiver) {
  try {
    console.info('Received submitted agreement', message.body)
    await api.post('/submit', message.body, true)
    await sendMessage(message.body, 'uk.gov.sfi.payment.request', message.correlationId, config.paymentTopic)
    console.info('Payment requested')
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processSubmitMessage
