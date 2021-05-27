async function processSubscriptionMessage (message, receiver) {
  try {
    console.log('processSubscriptionMessage', message)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processSubscriptionMessage
