async function processSubmitMessage (message, receiver) {
  try {
    console.log('processSubmitMessage', message)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processSubmitMessage
