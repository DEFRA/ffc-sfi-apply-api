const cache = require('../cache')
const submit = require('../submit')

async function processSubmitMessage (message, receiver) {
  try {
    const { callerId, agreement } = message.body
    console.info('Received submitted agreement', message.body)
    const application = await cache.get('application', message.correlationId)
    console.log(application)
    await submit(callerId, agreement.standards, application.applicationId)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processSubmitMessage
