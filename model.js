const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
  userId: { type: String, trim: true, required: true },
  restaurantId: { type: String, trim: true, required: true },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Stock', stockSchema)
