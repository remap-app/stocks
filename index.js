require('dotenv').config()

const { router, get, post, del } = require('microrouter')
const compose = require('micro-compose')
const { handleErrors } = require('micro-errors')
const cors = require('micro-cors-multiple-allow-origin')
const UrlPattern = require('url-pattern')
const { connect } = require('./db')
const authenticate = require('./authenticate')
const create = require('./routes/create')
const getList = require('./routes/getList')
const getById = require('./routes/getById')
const deleteById = require('./routes/deleteById')

connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_COLLECTION_NAME}`)

module.exports = compose(
  handleErrors({ debug: process.env.NODE_ENV !== 'production' }),
  cors({
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    origin: process.env.CORS_ALLOWED_ORIGINS.split(','),
  }),
  authenticate
)(
  router(
    post('/', create),
    get('/', getList),
    get(new UrlPattern(/^\/([\w-]+)$/, ['id']), getById),
    del(new UrlPattern(/^\/([\w-]+)$/, ['id']), deleteById)
  )
)
