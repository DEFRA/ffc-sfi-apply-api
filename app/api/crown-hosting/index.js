const { getStandardsSummary } = require('./standards')
const { createNewApplication } = require('./application')
const { getParcelLevelAction } = require('./parcel')
const { submitApplication, submitParcelLevelAction, getSubmitApplication } = require('./submit')

module.exports = {
  getStandardsSummary,
  createNewApplication,
  getParcelLevelAction,
  submitApplication,
  submitParcelLevelAction,
  getSubmitApplication
}
