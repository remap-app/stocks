const authenticateMiddleware = require('@remap/authenticate-middleware')

module.exports = () => {
  let opts
  if (process.env.NODE_ENV !== 'production') {
    const remap = new (require('@remap/services').ReMap)({
      AUTHENTICATION_SERVICE_ORIGIN: process.env.REMAP_AUTHENTICATION_SERVICE_ORIGIN || 'http://localhost:52578'
    })
    opts = { authenticate: remap.authenticate.bind(remap) }
  }
  return authenticateMiddleware(opts)
}
