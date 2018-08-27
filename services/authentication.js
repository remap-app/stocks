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

  if (res.ok) {
    return await res.json().catch(throwInternalServerError)
  }

  throw createError(res.status, STATUS_CODES[res.status])
}
