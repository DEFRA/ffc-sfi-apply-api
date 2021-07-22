const { get } = require('./base')

const getParcelLevelAction = async (callerId, applicationId, actionCode) => {
  const url = `api/v1/sfi/applications/${applicationId}/parcel-level-actions/${actionCode}`
  return get(url, callerId)
}

module.exports = {
  getParcelLevelAction
}
