const { STATUS_CODES } = require('http')
const { json, send } = require('micro')
const { createError } = require('micro-errors')
const Stock = require('../model')
const authenticatoin = require('../services/authentication')
const { parseAuthToken, throwInternalServerError } = require('../utils')

module.exports = async (req, res) => {
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

  const { restaurant_id: restaurantId } = await json(req).catch(throwInternalServerError)
  const stock = new Stock({ restaurantId, userId })
  const result = await stock.save().catch(error => {
    throw createError(500, STATUS_CODES[500], error, null, {
      dbErrorName: error.name,
      dbErrorMessage: error.message,
      dbErrorCode: error.code,
    })
  })

  res.setHeader('Location', `${process.env.API_BASE_URL}/${result.id}`)
  send(res, 201)
}
