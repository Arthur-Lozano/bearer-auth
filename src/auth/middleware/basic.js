'use strict';


const User = require('../models/usersmodel.js');
const base64 = require('base-64');


module.exports = (req, res, next) => {
if(!req.headers.authorization){
  console.log(req.headers.authorization)
  next('not authorized');
  return;
}

let basic = req.headers.authorization.split(' ').pop();
let [user, pass] = base64.decode(basic).split(':');


User.authenticateBasic(user, pass)
.then(user => {
  req.user = user;
  next();
})
.catch(e => next('Invalid user'));
}