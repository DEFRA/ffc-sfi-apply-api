const wreck = require('@hapi/wreck')
const config = require('../../config')

async function get (url, callerId) {
  return wreck.get(`${config.chApiGateway}${url}`, { headers: { callerId: callerId }, json: true, rejectUnauthorized: false })
}

async function post (url, data, callerId) {
  const { payload } = await wreck.post(`${config.chApiGateway}${url}`, {
    payload: data,
    ...getConfiguration(callerId)
  })
  return payload
}

async function put (url, data, callerId) {
  const { payload } = await wreck.put(`${config.chApiGateway}${url}`, {
    payload: data,
    ...getConfiguration(callerId)
  })
  return payload
}

const getConfiguration = (callerId) => {
  return {
    headers: {
      callerId: callerId
    },
    json: true,
    rejectUnauthorized: false
  }
}

module.exports = {
  get,
  post,
  put
}
