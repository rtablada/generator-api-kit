/* jshint camelcase: false */
var express = require('express');
var router = express.Router();
var User = require('mongoose').model('User');
var oauth = require('../../../oauth');

function createUser(req, res, next) {
  // jscs: disable
  var email = req.body.username;
  var password = req.body.password;
  var userData = JSON.parse(req.body.user_data);
  userData.email = email;
  userData.password = password;
  req.body.grant_type = req.body.grant_type || 'password';
  // jscs: enable

  User.create(userData, function(err) {
    if (err && err.code === 11000) {
      return res.status(400)
        .send('A user already exists with this email.');
    } else if (err) {
      return res.send(err);
    } else {
      next();
    }
  });
}

/* GET login form. */
router.post('/', createUser, oauth.grant());

module.exports = router;
