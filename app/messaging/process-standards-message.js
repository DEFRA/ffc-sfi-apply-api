async function processStandardsMessage (message, receiver) {
  try {
    console.log('processStandardsMessage', message.body)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processStandardsMessage
