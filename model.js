const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userId: { type: String, trim: true, required: true },
  restaurantId: { type: String, trim: true, required: true },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now },
})

schema.index({ userId: 1, restaurantId: 1 }, { unique: true })

module.exports = mongoose.model('Stock', schema)
