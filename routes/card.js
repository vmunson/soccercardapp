var express = require('express');
var router = express.Router();
var Card = require('../models/Cards');

router.post("/saveCard", (req, res) => {
  const card = new Card({
    player: req.body.data.player,
    cardType: req.body.data.cardType,
    numbered: req.body.data.numbered,
    quantity: req.body.data.quantity,
    grade: req.body.data.grade,
    comments: req.body.data.comments,
    userId: req.body.data.userId
  }).save((err, res) => {
    if(err){
      res.status(400).send(err)
    }
    res.send({id:res._id, name:res.player})
  })
})

module.exports = router