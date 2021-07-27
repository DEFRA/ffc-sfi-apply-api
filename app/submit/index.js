const paymentRateCodes = require('../calculation/payment-rate-codes')
const { submitApplication, getSubmitApplication } = require('../api/crown-hosting')
const updateParcelLevelAction = require('./parcel-level-action')

const submit = async (callerId, standards, applicationId) => {
  for (const standard of standards) {
    const submitResults = await getSubmitApplication(callerId, applicationId)
    console.log(submitResults, applicationId)
    const actionCode = paymentRateCodes.find(
      code => code.standardCode === standard.id &&
      code.ambitionLevel === standard.ambitionLevel).code
    const response = updateParcelLevelAction(callerId, applicationId, actionCode, standard.parcels)
    !response?.code ?? await submitApplication(callerId, applicationId)
  }
}

module.exports = submit
