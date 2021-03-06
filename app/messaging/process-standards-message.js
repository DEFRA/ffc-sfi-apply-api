const cache = require('../cache')
const getStandards = require('../standards')

async function processStandardsMessage (message, receiver) {
  try {
    const { sbi, callerId } = message.body
    console.info('Received request for available standards', message.body)
    await cache.clear('standards', message.correlationId)
    await cache.set('standards', message.correlationId, message.body)
    console.info(`Request for standards stored in cache, correlation Id: ${message.correlationId}`)
    await cache.update('standards', message.correlationId, { ready: false })
    const application = await cache.get('application', message.correlationId)
    const applicationId = application.callerId === callerId ? application.applicationId : null
    const standards = await getStandards(callerId, sbi, applicationId)
    console.info(`Application id: ${standards.applicationId}`)
    await cache.update('standards', message.correlationId, { standards: standards.standards, agreementNumber: standards.applicationId, ready: true })
    await cache.update('application', message.correlationId, { applicationId: standards.applicationId, callerId })

    console.info(`Response available for standards request, correlation Id: ${message.correlationId}`)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processStandardsMessage
