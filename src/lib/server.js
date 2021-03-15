'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 3333;

// Esoteric Resources
const errorHandler = require('../middleware/500');
const notFound = require('../middleware/404');
const authRoutes = require('../routes/routes.js');
 

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

// Catchalls
app.use(notFound);
app.use(errorHandler);

function start(port) {
  app.listen(port, () => console.log(`Server up on port ${port}`))
}

module.exports = {
  app: app,
  start: start
};