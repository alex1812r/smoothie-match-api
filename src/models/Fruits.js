const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Fruits = new Schema({
  name: {
    type: String,
    required: 'La Fruta necesita un nombre!',
    unique: true,
    trim: true
  },
  value: {
    type: Number,
    default: 0,
    minlength: 0
  }
});

module.exports = mongoose.model('fruits', Fruits);