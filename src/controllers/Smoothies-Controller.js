const Smoothies = require('../models/Smoothies');
const { handleValidatorErrors } = require('../helpers/mongoose');

exports.getAll = async (req, res) => {
  try {
    const smoothies = await Smoothies.find()
      .populate('fruits')
      .populate('liquid')
      .populate('protein');
      
    res.json({ smoothies });
    
  }catch(error) {
    console.log('Error al consultar Malteadas\n', error);
    res.status(500).send('Error inesperado al consultar Malteadas');
  }
}

exports.get = async (req, res) => {
  const { id } = req.params;
  try {
    const smoothie = await Smoothies.findById(id)
      .populate('fruits')
      .populate('liquid')
      .populate('protein');
      
    if(!smoothie)
      return res.status(404).send('La Malteada no existe');

    res.json({ smoothie });
  }catch(error) {
    console.log('Error al consultar Malteada\n', error);
    res.status(500).send('Error inesperado al consultar Malteada');
  }
}

exports.add = async (req, res) => {
  try {
    const smoothie = new Smoothies(req.body);
    await smoothie.save();
    res.status(201).send('La Malteada se ha Registrado con exito!');

  }catch(error) {
    console.log('Error Inesperado al registrar la Malteada\n', error);
    if(error.code === 11000)
      return res.status(400).send('La Malteada ya se encuentra registrada');

    let errors = [];
    if(error.errors)
      errors = handleValidatorErrors(error.errors);

    if(errors.length)
      res.status(400).json({ errors });
    else 
      res.status(500).send('Error inesperado al registrar la Malteada');
  }
}

