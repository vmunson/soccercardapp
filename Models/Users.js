const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8
  },
  name: {
    type: String
  }
})

UserSchema.pre('save', function(next){
  let user = this
  if(user.isModified('password')){
    bcrypt.genSalt(10, function(err, salt){
      if(err){
        return next(err)
      }
      bcrypt.hash(user.password, 10, function(err, hash){
        if(err){
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  }else{
    next()
  }
})

UserSchema.plugin(uniqueValidator);

UserSchema.methods.comparePassword = function(candidatePassword, checkPassword){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err){
      return checkPassword(err)
    }
    checkPassword(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)