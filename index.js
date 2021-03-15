'use strict';


const server = require('./src/lib/server.js');
require('dotenv').config();

// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
const MONGODB_URI = process.env.MONGODB_URI;

// Start the web server

mongoose.connect(MONGODB_URI, options)
  .then(() => {
  server.start(process.env.PORT || 3333);
});
