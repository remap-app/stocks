const { STATUS_CODES } = require('http')
const { json, send } = require('micro')
const { createError } = require('micro-errors')
const Stock = require('../model')
const { throwInternalServerError } = require('../utils')

module.exports = async (req, res) => {
  const { restaurant_id: restaurantId } = await json(req).catch(throwInternalServerError)
  if (!restaurantId) {
    throw createError(400, STATUS_CODES[400], null, null, { detail: '`restaurant_id` must be required' })
  }

  const stock = new Stock({ restaurantId, userId: req.auth.uid })
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
