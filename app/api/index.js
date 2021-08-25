const wreck = require('@hapi/wreck')
const config = require('../config')

function getEndpoint (useMock) {
  return config.apiGatewayEndpoint
}

async function get (url, token, useMock) {
  const { payload } = await wreck.get(`${getEndpoint(useMock)}${url}`, getConfiguration(token))
  return payload
}

async function post (url, data, useMock, token) {
  const { payload } = await wreck.post(`${getEndpoint(useMock)}${url}`, {
    payload: data,
    ...getConfiguration(token)
  })
  return payload
}

function getConfiguration (token) {
  return {
    headers: {
      Authorization: token ?? ''
    },
    json: true
  }
}

module.exports = {
  get,
  post
}
