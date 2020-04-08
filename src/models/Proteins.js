const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Proteins = new Schema({
  name: {
    type: String,
    required: 'La Proteina necesita un nombre!',
    unique: true,
    trim: true
  },
});

module.exports = mongoose.model('proteins', Proteins);