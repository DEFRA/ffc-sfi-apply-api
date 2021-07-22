const getApplicableStandards = (standardsSummary, code) => {
  return standardsSummary
    .map(a => a.standards)
    .flat()
    .filter(s => s.code === code)
}

const getAmbitions = (applicableStandards) => {
  return applicableStandards.map(s => s.ambitions)
    .flat()
}

const getActions = (ambitions) => {
  return ambitions.map(s => s.actions)
    .flat()
}

const getParcelClaimActions = (actions) => {
  return actions.filter(p => p.claimAtLevel === 'PARCEL')
    .map(a => a.code)
}

const filterStandardsSummary = (standardsSummary, code) => {
  const applicableStandards = getApplicableStandards(standardsSummary, code)
  const ambitions = getAmbitions(applicableStandards)
  const actions = getActions(ambitions)
  return getParcelClaimActions(actions)
}

module.exports = filterStandardsSummary
