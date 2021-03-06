const { STATUS_CODES } = require('http')
const { createError } = require('micro-errors')
const mongoose = require('mongoose')
const Stock = require('../model')

module.exports = async req => {
  const { id } = req.params
  if (!id) {
    throw createError(404, STATUS_CODES[404])
  }

  const result = await Stock
    .findOne({ _id: id, userId: req.auth.uid })
    .select('restaurantId createdAt updatedAt')
    .exec()
    .catch(error => {
      if (error instanceof mongoose.Error.CastError) {
        throw createError(404, STATUS_CODES[404])
      }
      throw createError(500, STATUS_CODES[500], error, null, {
        dbErrorName: error.name,
        dbErrorMessage: error.message,
        dbErrorCode: error.code,
      })
    })
  
  if (!result) {
    throw createError(404, STATUS_CODES[404])
  }

  return {
    id: result.id,
    restaurant_id: result.restaurantId,
    created_at: result.createdAt,
    updated_at: result.updatedAt,
  }
}
