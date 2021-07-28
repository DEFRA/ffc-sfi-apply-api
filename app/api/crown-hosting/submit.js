const { post, put, get } = require('./base')

const submitParcelLevelAction = async (callerId, applicationId, actionCode, claimedParcels) => {
  const url = `/api/v1/sfi/applications/${applicationId}/parcel-level-actions/${actionCode}`
  const response = await put(url, claimedParcels, callerId)
  return response
}

const submitApplication = async (callerId, applicationId) => {
  const url = `/api/v1/sfi/applications/${applicationId}/submit`
  const response = await post(url, {}, callerId)
  return response?.payload
}

const getSubmitApplication = async (callerId, applicationId) => {
  const url = `/api/v1/sfi/applications/${applicationId}/submit`
  const response = await get(url, callerId)
  return response?.payload
}

module.exports = {
  submitApplication,
  submitParcelLevelAction,
  getSubmitApplication
}
