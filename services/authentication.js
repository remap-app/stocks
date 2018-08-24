const { STATUS_CODES } = require('http')
const fetch = require('node-fetch')
const { createError } = require('micro-errors')
const { throwInternalServerError } = require('../utils')

module.exports = async idToken => {
  const res = await fetch(process.env.AUTHENTICATION_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ id_token: idToken }),
    mode: 'cors',
  })

  const json = await res.json().catch(throwInternalServerError)

  if (res.ok) {
    return json
  }

  throw createError(res.status, STATUS_CODES[res.status])
}
