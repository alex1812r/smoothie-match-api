const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Smoothies = new Schema({
  name: {
    type: String,
    required: 'La Malteada necesita un nombre!',
    unique: true,
    trim: true
  },
  fruits: [{
    type: Schema.ObjectId,
    ref: 'fruits'
  }],
  liquid: {
    type: Schema.ObjectId,
    ref: 'liquids',
    required: 'La Malteada necesita tener liquido'
  },
  protein: {
    type: Schema.ObjectId,
    ref: 'proteins',
  },
  taste: {
    type: Number,
    min: [0, 'Lo minimo de Sabor es de 0'],
    max: [100, 'Lo maximo de sabor es de 100'],
    default: 0
  },
});

module.exports = mongoose.model('smoothies', Smoothies);