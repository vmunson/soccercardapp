var express = require('express');
var router = express.Router();
var Card = require('../models/Cards');

router.post("/saveCard", (req, res) => {
  console.log(`hello`);
  const card = new Card({
    player: req.body.data.player,
    cardType: req.body.data.cardType,
    numbered: req.body.data.numbered,
    quantity: req.body.data.quantity,
    grade: req.body.data.grade,
    comments: req.body.data.comments,
    userId: req.body.data.userId
  }).save((err, data) => {
    if(err){
      res.status(400).send(err)
    }
    else {
      res.send({id:data._id, name:data.player})
    }
  })
})

module.exports = router