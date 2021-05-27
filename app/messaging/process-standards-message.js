async function processStandardsMessage (message, receiver) {
  try {
    console.log('processStandardsMessage', message)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processStandardsMessage
