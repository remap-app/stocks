require('dotenv').config()

const { router, get, post, del } = require('microrouter')
const compose = require('micro-compose')
const { handleErrors } = require('micro-errors')
const cors = require('micro-cors-multiple-allow-origin')
const UrlPattern = require('url-pattern')
const authenticateMiddleware = require('@remap/authenticate-middleware')
const { Authentication } = require('@remap/services')
const { connect } = require('./db')
const create = require('./routes/create')
const getList = require('./routes/getList')
const getById = require('./routes/getById')
const deleteById = require('./routes/deleteById')

connect(`mongodb://${process.env.DATABASE_HOSTNAME}:${process.env.DATABASE_PORT}/${process.env.DATABASE_COLLECTION_NAME}`)

module.exports = compose(
  handleErrors({ debug: process.env.NODE_ENV !== 'production' }),
  cors({
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    origin: process.env.CORS_ALLOWED_ORIGINS.split(','),
  }),
  authenticateMiddleware({ authenticate: Authentication.authenticate.bind(Authentication) }),
)(
  router(
    post('/', create),
    get('/', getList),
    get(new UrlPattern(/^\/([\w-]+)$/, ['id']), getById),
    del(new UrlPattern(/^\/([\w-]+)$/, ['id']), deleteById)
  )
)
