const { getParcelLevelAction } = require('../api/crown-hosting')

const getParcelsByActionCode = async (callerId, applicationId, actionCodes, standard) => {
  const promises = []
  const actionCodesLength = actionCodes.length

  for (let i = 0; i < actionCodesLength; i++) {
    promises.push(getParcelLevelAction(callerId, applicationId, actionCodes[i]))
  }

  standard.parcels = []

  await Promise.all(promises).then(results => {
    results.map(result => {
      const parcels = result?.payload?.parcels?.map(parcel => ({
        id: `${parcel.sheetNumber}${parcel.parcelNumber}`,
        area: parcel.claimableArea,
        warnings: []
      }))

      standard.parcels = [...parcels, ...standard.parcels]
    })
  })
}

module.exports = getParcelsByActionCode
