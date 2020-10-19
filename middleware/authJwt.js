const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const User = require("../models/Users");
const ObjectId = require('mongodb').ObjectID

module.exports = function(req, res, next) {
  var sessionToken = req.headers.authorization;
    console.log(sessionToken)
    if (!req.body.user && sessionToken) {
        jwt.verify(sessionToken, config.secret, function (err, decoded) {
            console.log(err)
            if (decoded) {
                User.findById(decoded.id, (err, user) => {
                    console.log(err);
                    if(user) {
                        // console.log("User is:")
                        // console.log(user)
                        user = user;
                        next();
                    }
                    else {
                        res.status(401).send({ error: 'Not authorized' });
                    }
                })
            } else {
                res.status(401).send({ error: 'Not token not decoded' });
            }
        });
    } else {
        next();
    }
};
