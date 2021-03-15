'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//App secret to sign our token
const SECRET = process.env.APP_SECRET || 'cool';

const users = new mongoose.Schema({
  username: {type: String, required: true, unique:true},
  password: {type: String, required: true}
}, { toJson: {virtuals: true}})


users.virtual('token').get (function() {
  let token = {
    username:this.username,
  }

  return jwt.sign(token, SECRET);//Creates token for us and adds Secret as extra verification 
});


//Mongoose "pre" hook to run "before" the save  method is called
//Pre is a hook and says before you do an action do this action first
users.pre('save', async function(){//before you save my user grab the password from user and has the crap out of it then set the password as the hashed browns 
  this.password = await bcrypt.hash(this.password, 15);
})


//statics means it runs on every user instance 
users.statics.authenticateBasic = async function (username, password){
  const user = await this.findOne({ username});
  const valid = await bcrypt.compare(password, user.password);//plain text against hashed pwd or uncrackable password
  if(valid){return user};
  throw new Error('Invalid username or password');
}

users.statics.authenticateToken = async function (token) {
  try{
    const parsed = jwt.verify(token, SECRET);
    const user = this.findOne({username: parsed.username})
    if(user) {return user}
    throw new Error('user was not found');
  } catch(event){ 
    throw new Error(event.message);
  }
}


//Exporting entire collection
module.exports = mongoose.model('users', users);