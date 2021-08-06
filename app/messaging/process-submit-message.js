const submit = require('../submit')

async function processSubmitMessage (message, receiver) {
  try {
    const { callerId, agreement, agreementNumber } = message.body
    console.info('Received submitted agreement', message.body)
    await submit(callerId, agreement.standards, agreementNumber)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processSubmitMessage
