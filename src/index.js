const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

// Create app/server
const app = express();

// Connect Database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}, function(error) {
  if(error) {
    console.log(error);
    throw new Error('ERROR AL CONECTAR CON LA BASE DE DATOS');
  } 
  console.log('CONECTADO CON LA BASE DE DATOS');
});

// Enbaled body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
// Permited Domains List
const whiteList = [process.env.FRONTEND_URL];
// Enabeld CORS
app.use(cors({
  origin: (origin, callback) => {
    const exist = whiteList.some(domain => domain === origin);
    if(exist)
      callback(null, true);
    else
      callback((new Error('No permitido por CORS')));
  }
}));

// Enabled Routes in /api
app.use('/api', routes());

// settings for HOST and PORT
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log('SERVIDOR INICIADO\nHOST : ', host, '\nPORT : ', port);
});

