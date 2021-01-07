const mongoose = require('mongoose') 

const CardsSchema = mongoose.Schema({
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
  userId: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('Cards', CardsSchema)