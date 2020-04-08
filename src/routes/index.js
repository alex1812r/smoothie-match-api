const router = require('express').Router();

// Routes Controllers
const SmoothiesController = require('../controllers/Smoothies-Controller');
const FruitsController = require('../controllers/Fruits-Controller');
const LiquidsController = require('../controllers/Liquids-Controller');
const ProteinsController = require('../controllers/Proteins-Controller');

module.exports = function() {

  // Smoothies Routes
  router.get('/smoothies', SmoothiesController.getAll);
  router.get('/smoothies/:id', SmoothiesController.get);
  router.post('/smoothies', SmoothiesController.add);

  // Fruits Routes
  router.get('/fruits', FruitsController.getAll);
  router.post('/fruits', FruitsController.add);

  // Liquids Routes
  router.get('/liquids', LiquidsController.getAll);
  router.post('/liquids', LiquidsController.add);
  
  // Proteins Routes
  router.get('/proteins', ProteinsController.getAll);
  router.post('/proteins', ProteinsController.add);

  return router;
}