const api = require('../api')

async function processWithdrawMessage (message, receiver) {
  try {
    console.info('Received withdraw agreement request')
    await api.post('/withdraw', message.body)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processWithdrawMessage
