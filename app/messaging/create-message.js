function createMessage (body, type, correlationId) {
  return {
    body,
    type,
    source: 'ffc-sfi-apply-api',
    correlationId
  }
}

module.exports = createMessage
