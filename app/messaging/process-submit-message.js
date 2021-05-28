const api = require('../api')

async function processSubmitMessage (message, receiver) {
  try {
    console.info('received submitted agreement')
    await api.post('/submit', message.body)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processSubmitMessage
