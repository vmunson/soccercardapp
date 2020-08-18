var express = require('express');
var router = express.Router();
var User = require('../models/Users');

router.post("/signup", (req, res)=>{
  const user=new User({
    email: req.body.data.email,
    password: req.body.data.password,
    name: req.body.data.name
  }).save((err, response)=>{
    if(err){
      res.status(400).send(err)
    }
    res.send({user:response._id, name:response.name})
  })
})

router.post("/signin", (req, res)=>{
  let email = req.body.data.email
  let password = req.body.data.password
  let message = 'Have fun counting!'
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

      res.send({user:user._id, name:user.name})
    })
  })
})

module.exports = router