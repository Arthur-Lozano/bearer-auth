'use strict';

const express = require('express');
const authRouter = express.Router();


const User = require('../auth/models/usersmodel.js');
const basicAuthentication = require('../auth/middleware/basic.js');
const bearerAuth = require('../auth/middleware/bearer.js');




//Initiate new user and this comes from our usermodel we required above which has methods and hooks defined already
authRouter.post('/signup', (req, res) => {
  const user = new User(req.body);//contains username and pwd

  user.save()//prehook(hash) happens before user is saved
    .then(user => {
      res.status(200).send(user);
    })
});

//Sign in for existing user
authRouter.post('/signin', basicAuthentication, (req, res) => {
  res.status(200).json({ msg: 'Sign in successful', user:req.user});
});

authRouter.get('/user', bearerAuth, (req, res) => {
  res.status(200).json({ msg: 'User is authorized to access route', user:req.user});
});


module.exports = authRouter;