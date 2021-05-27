const hoek = require('@hapi/hoek')

const get = (request, key) => {
  const object = request.yar.get(key)
  return object ?? {}
}

const set = (request, key, value) => {
  request.yar.set(key, value)
}

const update = (request, key, object) => {
  const existing = this.get(request, key)
  hoek.merge(existing, object, { mergeArrays: false })
  set(request, key, existing)
}

const clear = (request, key) => {
  request.yar.clear(key)
}

module.exports = {
  get,
  set,
  update,
  clear
}
