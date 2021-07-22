const getParcelsByActionCode = require('./parcels')
const { getStandardsSummary, createNewApplication } = require('../api/crown-hosting')
const standards = require('./standards')
const standardsCodes = require('./standards-codes')
const filterStandardsSummary = require('./filter')

const buildStandards = async (callerId, applicationId, standardsSummary) => {
  for (const standard of standards) {
    const standardsCode = standardsCodes.find(a => a.code === standard.code).standardCode
    const actionCodes = filterStandardsSummary(standardsSummary, standardsCode)
    await getParcelsByActionCode(callerId, applicationId, actionCodes, standard)
  }

  return { standards, applicationId }
}

const getStandards = async (callerId, sbi, applicationId) => {
  applicationId = applicationId ?? await createNewApplication(callerId, sbi)
  const standardsSummary = await getStandardsSummary(callerId, applicationId)
  return buildStandards(callerId, applicationId, standardsSummary)
}

module.exports = getStandards
