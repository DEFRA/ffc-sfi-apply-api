const { get } = require('../api/crown-hosting/base')

const getParcelsByActionCode = async (callerId, applicationId, actionCodes, standard) => {
  const promises = []
  const actionCodesLength = actionCodes.length

  for (let i = 0; i < actionCodesLength; i++) {
    const url = `api/v1/sfi/applications/${applicationId}/parcel-level-actions/${actionCodes[i]}`
    promises.push(get(url, callerId))
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
