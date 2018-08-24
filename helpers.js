const mapObj = require('map-obj')
const camelCase = require('lodash.camelcase')
const snakeCase = require('lodash.snakecase')

const transformKeys = (object, transformer, deep = true) => mapObj(object, (k, v) => [transformer(k), v], { deep })

module.exports.camelCaseKeys = object => transformKeys(object, camelCase)
module.exports.snakeCaseKeys = object => transformKeys(object, snakeCase)
