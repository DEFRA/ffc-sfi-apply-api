async function processEligibilityMessage (message, receiver) {
  try {
    console.log('processEligibilityMessage', message.body)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processEligibilityMessage
