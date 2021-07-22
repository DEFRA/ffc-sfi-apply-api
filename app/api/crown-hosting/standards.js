const { get } = require('./base')

const getStandardsSummary = async (callerId, applicationId) => {
  const url = `/api/v1/sfi/applications/${applicationId}`
  const response = await get(url, callerId)
  return response?.payload?.assets
}

module.exports = {
  getStandardsSummary
}
