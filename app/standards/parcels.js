const { getParcelLevelAction } = require('../api/crown-hosting')

const dedupelication = (parcels) => {
  return parcels.map(parcel => parcel.id)
    .map((parcel, i, final) => final.indexOf(parcel) === i && i)
    .filter(parcel => parcels[parcel])
    .map(parcel => parcels[parcel])
}

const getParcelsByActionCode = async (callerId, applicationId, actionCodes, standard) => {
  const promises = []
  const actionCodesLength = actionCodes.length

  for (let i = 0; i < actionCodesLength; i++) {
    promises.push(getParcelLevelAction(callerId, applicationId, actionCodes[i]))
  }

  standard.parcels = []
  let standardParcels = []

  await Promise.all(promises).then(results => {
    results.map(result => {
      const parcels = result?.payload?.parcels?.map(parcel => ({
        id: `${parcel.sheetNumber}${parcel.parcelNumber}`,
        area: parcel.claimableArea,
        warnings: []
      }))

      standardParcels = [...parcels, ...standardParcels]
    })
  })

  standard.parcels = [...dedupelication(standardParcels), ...standard.parcels]
}

module.exports = getParcelsByActionCode
