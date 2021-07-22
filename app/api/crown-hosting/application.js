const { post } = require('./base')

const createNewApplication = async (callerId, sbi) => {
  const url = '/api/v1/sfi/applications'
  const response = await post(url, { sbi }, callerId)
  return response?.id
}

module.exports = {
  createNewApplication
}
