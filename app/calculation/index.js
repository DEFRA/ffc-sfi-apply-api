const filterStandardsSummary = require('../standards/filter')
const standardsCodes = require('../standards/standards-codes')
const paymentRateCodes = require('./payment-rate-codes')
const { getStandardsSummary } = require('../api/crown-hosting')

const getParcelPaymentValues = (standardsSummary, standardsCode) => {
  const actions = filterStandardsSummary(standardsSummary, standardsCode)
  return actions.filter(p => p.claimAtLevel === 'PARCEL')
    .map(a => {
      return {
        ambitionLevel: paymentRateCodes.find(x => x.code === a.code).ambitionLevel,
        paymentRate: a.paymentRate
      }
    })
}

const calculatePaymentRates = async (callerId, applicationId, parcels, code) => {
  const standardsSummary = await getStandardsSummary(callerId, applicationId)
  const standardsCode = standardsCodes.find(a => a.code === code).standardCode
  const actionCodes = getParcelPaymentValues(standardsSummary, standardsCode)
  const totalArea = parcels.reduce((a, b) => a + (b.area || 0), 0)

  const calculate = { paymentRates: {} }

  for (const key in actionCodes) {
    const ambitionRate = actionCodes[key].paymentRate || 0
    const ambitionLevel = actionCodes[key].ambitionLevel
    calculate.paymentRates[ambitionLevel] = {
      rate: ambitionRate,
      paymentAmount: (totalArea * ambitionRate).toFixed(2)
    }
  }

  return calculate
}

module.exports = calculatePaymentRates
