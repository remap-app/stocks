const mongoose = require('mongoose')

module.exports.connect = url => {
  mongoose.connect(url)

  if (process.env.NODE_ENV !== 'production') {
    const db = mongoose.connection
    /* eslint-disable no-console */
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.log('successful connection')
    })
    /* eslint-enable no-console */
  }
}
