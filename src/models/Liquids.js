const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Liquids = new Schema({
  name: {
    type: String,
    required: 'El Liquido necesita un nombre!',
    unique: true,
    trim: true
  },
  value: {
    type: Number,
    min: [0, 'El minimo valor de la Fruta es de 0'],
    default: 0,
  }
});

module.exports = mongoose.model('liquids', Liquids);