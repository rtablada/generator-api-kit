// Module dependencies.
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var api = {};

// ALL
api.profiles = function(req, res) {
  User.findById(req.user).exec((err, model) => {
    if (err) {
      return res.status(500).send(err);
    }

    req.store.renderItem(model, 'Profile');
  });
};

router.get('/profiles', api.profiles);

module.exports = router;
