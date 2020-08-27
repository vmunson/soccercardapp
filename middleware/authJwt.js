const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const User = require("../models/Users");

module.exports = function(req, res, next) {
  var sessionToken = req.headers.authorization;
    console.log(sessionToken)
    if (!req.body.user && sessionToken) {
        jwt.verify(sessionToken, config.secret, function (err, decoded) {
            console.log(err)
            if (decoded) {
                User.findOne({ where: { _id: decoded.id } }).then(
                    function (user) {
                        // console.log("User is:")
                        // console.log(user)
                        req.user = user;
                        next();
                    },
                    function () {
                        res.status(401).send({ error: 'Not authorized' });
                    }
                );
            } else {
                res.status(401).send({ error: 'Not token not decoded' });
            }
        });
    } else {
        next();
    }
};
