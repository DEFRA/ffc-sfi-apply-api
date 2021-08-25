const cache = require('../cache')
const api = require('../api')


const processEligibilityRequests = async () => {
  const eligibilityRequests = await getPendingEligibilityRequests()
  for (const eligibilityRequest of eligibilityRequests) {
  }
}

module.exports = processEligibilityRequests
