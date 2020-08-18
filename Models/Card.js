const mongoose = require('mongoose')

const CardSchema = mongoose.Schema({
  player: {
    type: String,
    trim: true
  },
  cardType: {
    type: String,
    trim: true
  },
  numbered: Boolean,
  quantity: Number,
  grade: Number,
  comments: {
    type: String,
    trim: true
  },
  userId: ObjectId
})

module.exports = mongoose.model('Card', CardSchema)