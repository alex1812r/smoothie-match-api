const Proteins = require('../models/Proteins');

exports.getAll = async (req, res) => {
  try {
    const proteins = await Proteins.find();
    res.json({ proteins });

  }catch(error) {
    console.log('Error indesperado el consultar Proteinas\n', error);
    res.status(500).send('Error indesperado el consultar Proteinas');
  }
}

exports.add = async (req, res) => {
  try {
    const protein = new Proteins(req.body);
    await protein.save();
    res.status(201).send('La Proteina se ha registrado con exito!');

  }catch(error) {
    console.log('Error inesperado al registrar la Proteina\n', error);
    if(error.code === 11000)
      return res.status(400).send('La Proteina ya se encuentra registrada'); 
    
    let errors = [];
    if(error.errors)
      errors = handleValidatorErrors(error.errors);

    if(errors.length)
      res.status(400).json({ errors });
    else 
      res.status(500).send('Error inesperado al registrar la Proteina');
  }
}