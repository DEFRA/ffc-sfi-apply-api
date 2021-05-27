async function processValidateMessage (message, receiver) {
  try {
    console.log('processSubscriptionMessage', message.body)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processValidateMessage
