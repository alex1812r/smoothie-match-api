const Fruits = require('../models/Fruits');
const { handleValidatorErrors } = require('../helpers/mongoose');

exports.getAll = async (req, res) => {
  try {
    const fruits = await Fruits.find();
    res.json({ fruits });
    
  }catch(error) {
    console.log('Error insesperado al consultar Frutas\n', error);
    res.status(500).send('Error insesperado al consultar Frutas');
  }
}

exports.add = async (req, res) => {
  try {
    const fruit = new Fruits(req.body);
    await fruit.save();
    res.status(201).send('La Fruta se ha registrado con exito!');

  }catch(error) {
    console.log('Error Inesperado al registrar la Fruta', error);
    if(error.code === 11000)
      return res.status(400).send('La Fruta ya se encuentra registrada'); 
    
    let errors = [];
    if(error.errors)
      errors = handleValidatorErrors(error.errors);

    if(errors.length)
      res.status(400).json({ errors });
    else 
      res.status(500).send('Error inesperado al registrar la Fruta');
  }
}