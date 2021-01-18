'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Carrega as Rotas
const creditCardRoute = require('./routes/credit-card-route');

app.use(bodyParser.json({
  limit: '50mb',
}));
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-locale-lang, Authorization, PropertyId');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/credit-card', creditCardRoute);

module.exports = app;
