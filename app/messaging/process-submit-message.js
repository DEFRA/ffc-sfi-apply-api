const api = require('../api')

async function processSubmitMessage (message, receiver) {
  try {
    console.info('Received submitted agreement', message.body)
    await api.post('/submit', message.body, true)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
  }
}

module.exports = processSubmitMessage
