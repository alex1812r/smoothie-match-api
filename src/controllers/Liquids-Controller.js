const Liquids = require('../models/Liquids');
const { handleValidatorErrors } = require('../helpers/mongoose');

exports.getAll = async (req, res) => {
  try {
    const liquids = await Liquids.find();
    res.json({ liquids });
  }catch(error) {
    console.log('Error insesperado al consultar Liquidos\n', error);
    res.status(500).send('Error insesperado al consultar Liquidos');
  }
}

exports.add = async (req, res) => {
  try {
    const loquid = new Liquids(req.body);
    await loquid.save();
    res.status(201).send('El Liquido se ha registrado con exito!');

  }catch(error) {
    console.log('Error inesperado al registrar el Liquido\n', error);
    if(error.code === 11000)
      return res.status(400).send('El Liquido ya se encuentra registrado'); 
    
    let errors = [];
    if(error.errors)
      errors = handleValidatorErrors(error.errors);

    if(errors.length)
      res.status(400).json({ errors });
    else 
      res.status(500).send('Error inesperado al registrar el Liquido');
  }
}