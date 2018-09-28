const { STATUS_CODES } = require('http')
const { parse: parseUrl } = require('url')
const { createError } = require('micro-errors')
const toNubmer = require('lodash.tonumber')
const _isNaN = require('lodash.isnan')
const Stock = require('../model')

module.exports = async req => {
  const { query } = parseUrl(req.url, true)
  const page = toNubmer(query.page || '1')
  const perPage = toNubmer(query.per_page || '10')

  if (
    _isNaN(page) ||
    _isNaN(perPage) ||
    page < 1 ||
    perPage > 10
  ) {
    throw createError(400, STATUS_CODES[400])
  }

  const results = await Stock
    .find({ userId: req.auth.uid })
    .sort({ createdAt: -1 })
    .limit(perPage)
    .skip((page - 1) * perPage)
    .select('restaurantId createdAt updatedAt')
    .exec()
    .catch(error => {
      throw createError(500, STATUS_CODES[500], error, null, {
        dbErrorName: error.name,
        dbErrorMessage: error.message,
        dbErrorCode: error.code,
      })
    })

  return results.map(stock => {
    return {
      id: stock.id,
      restaurant_id: stock.restaurantId,
      created_at: stock.createdAt,
      updated_at: stock.updatedAt,
    }
  })
}
