'use strict';

const users = require('../models/usersmodel.js');

module.exports = (req, res, next) => {
  if(!req.headers.authorization) {next ('Invalid')};
  let token = req.headers.authorization.split(' ').pop();

  users.authenticateToken(token)
  .then(user => {
    req.user = user;
    next();
  })
  .catch(e => next('Invalid token'));
}