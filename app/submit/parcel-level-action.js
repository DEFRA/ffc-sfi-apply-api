const { submitParcelLevelAction } = require('../api/crown-hosting')

const splitParcelId = (claimedParcel) => {
  const parcelIds = claimedParcel.id.match(/.{1,6}/g)
  return { sheetNumber: parcelIds[0], parcelNumber: parcelIds[1] }
}

const updateParcelLevelAction = async (callerId, applicationId, actionCode, claimedParcels) => {
  const buildClaimedParcelsPayload = []
  const claimedParcelsLength = claimedParcels.length

  for (let i = 0; i < claimedParcelsLength; i++) {
    buildClaimedParcelsPayload.push(splitParcelId(claimedParcels[i]))
  }

  await submitParcelLevelAction(callerId, applicationId, actionCode, { claimedParcels: buildClaimedParcelsPayload })
}

module.exports = updateParcelLevelAction
