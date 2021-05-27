async function processValidateMessage (message, receiver) {
  try {
    console.log('processSubscriptionMessage', message)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processValidateMessage
