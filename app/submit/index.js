const paymentRateCodes = require('../calculation/payment-rate-codes')
const { submitApplication, getSubmitApplication } = require('../api/crown-hosting')
const updateParcelLevelAction = require('./parcel-level-action')

const submit = async (callerId, standards, applicationId) => {
  for (const standard of standards) {
    const submitResults = await getSubmitApplication(callerId, applicationId)
    if (!submitResults.success) {
      const actionCode = paymentRateCodes.find(
        code => code.standardCode === standard.id &&
        code.ambitionLevel === standard.ambitionLevel).code
      await updateParcelLevelAction(callerId, applicationId, actionCode, standard.parcels)
      await submitApplication(callerId, applicationId)
      console.info(`Application Submitted: ${applicationId}`)
    }
  }
}

module.exports = submit
