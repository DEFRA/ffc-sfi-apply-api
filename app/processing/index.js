const processEligibilityRequests = require('./process-eligibility-requests')
const config = require('../config')

const start = async () => {
  try {
    await processEligibilityRequests()
  } catch (err) {
    console.error(err)
  } finally {
    setTimeout(start, config.processingInterval)
  }
}

module.exports = {
  start
}
