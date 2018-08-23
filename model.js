const { Schema, model } = require('mongoose')

const stockSchema = new Schema({
  userId: { type: String, trim: true, required: true },
  restaurantId: { type: String, trim: true, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
})

module.exports = model('Stock', stockSchema)
