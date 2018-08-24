const { STATUS_CODES } = require('http')
const { createError } = require('micro-errors')
const authenticatoin = require('./services/authentication')
const { parseAuthToken } = require('./utils')

module.exports = fn => async (req, res, ...rest) => {
  const { authorization } = req.headers
  if (!authorization) {
    res.setHeader('WWW-Authenticate', 'Bearer realm=""')
    throw createError(401, STATUS_CODES[401])
  }

  const idToken = parseAuthToken(authorization)
  if (!idToken) {
    res.setHeader('WWW-Authenticate', 'Bearer error="invalid_request"')
    throw createError(400, STATUS_CODES[400], null, { detail: 'Invalid token format' })
  }

  const { uid: userId } = await authenticatoin(idToken)
  if (!userId) {
    res.setHeader('WWW-Authenticate', 'Bearer error="invalid_token"')
    throw createError(401, STATUS_CODES[401], null, { detail: 'Invalid token' })
  }

  req.userId = userId
  return fn(req, res, ...rest)
}
