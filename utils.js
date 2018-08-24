const { STATUS_CODES } = require('http')
const { createError } = require('micro-errors')

const createInternalServerError = module.exports.createInternalServerError = error => createError(500, STATUS_CODES[500], error)
module.exports.throwInternalServerError = error => {
  throw createInternalServerError(error)
}

module.exports.parseAuthToken = auth => auth.trim().split('Bearer ')[1]
