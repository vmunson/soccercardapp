var express = require('express');
var router = express.Router();
var User = require('../models/Users');
var jwt = require("jsonwebtoken")
const config = require("../config/auth.js");

router.post("/signup", (req, res)=>{
  const user=new User({
    email: req.body.user.email,
    password: req.body.user.password,
    name: req.body.user.name
  }).save((err, response)=>{
    if(err){
      res.status(400).send(err)
    }
    else{
      var token = jwt.sign({ id: response._id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
  
      res.send({user:response._id, name:response.name, accessToken:token})
    }
    
  })
})

router.post("/signin", (req, res)=>{
  let email = req.body.user.email
  let password = req.body.user.password
  User.findOne({'email':email}, (err, user)=>{
    if(!user){
      res.json({message: 'Email or password is incorrect'})
    }
    user.comparePassword(password, (err, isMatch)=>{
      if(err){
        console.log(err)
      }
      if(!isMatch){
        return res.status(400).json({message: 'Email or password is incorrect'})
      }

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.send({user:user._id, name:user.name, accessToken:token})
    })
  })
})

module.exports = router