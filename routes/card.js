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
  }).save((err, data) => {
    if(err){
      res.status(400).send(err)
    }
    else {
      res.send({id:data._id, name:data.player})
    }
  })
})

router.get("/allCards", (req, res) => {
  Card.find(req.body, (err, data) => {
    if(err){
      res.status(400).send(err)
    }
    else {
      res.send({data})
    }
  })
});


router.put("/updateCard", (req, res) => {
  let id = {_id : req.body.playerId}
  let update = req.body.data

  Card.findOneAndUpdate(id, update, {new : true}, (err, data) => {
    if(err){
      res.status(400).send(err)
    }
    else {
      res.send(data)
    }
  })
})

router.delete("/deleteCard/:id", (req, res) => {
  Card.findOneAndDelete(req.params.id, (err, data) => {
    if(err){
      res.status(400).send(err)
    }
    else {
      res.send(data)
    }
  })
})

module.exports = router