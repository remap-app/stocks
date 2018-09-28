const { STATUS_CODES } = require('http')
const { send } = require('micro')
const { createError } = require('micro-errors')
const mongoose = require('mongoose')
const Stock = require('../model')

module.exports = async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw createError(400, STATUS_CODES[400])
  }

  const result = await Stock
    .findOneAndDelete({ _id: id, userId: req.auth.uid })
    .exec()
    .catch(error => {
      if (error instanceof mongoose.Error.CastError) {
        throw createError(400, STATUS_CODES[400])
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

  send(res, 204)
}
