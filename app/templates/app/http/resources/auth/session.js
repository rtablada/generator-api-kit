var express = require('express');
var router = express.Router();
var passport = require('passport');

var loginError = function(req, res) {
  req.flash('danger', 'The user email and password do not match');

  res.withInput().redirectBack();
};

/* GET login form. */
router.get('/login', function(req, res) {
  res.render('login');
});

/* POST submit login */
router.post('/login', function(req, res) {
  passport.authenticate('local', function(err, user) {
    if (user) {
      req.logIn(user, function(err) {
        if (err) {
          res.send(err);
        }

        req.flash('success', 'You have logged in.');

        res.redirect('/admin');
      });
    } else {
      loginError(req, res);
    }
  })(req, res);
});

router.all('/logout', function(req, res) {
  req.logOut();
  req.flash('success', 'You have logged out');

  res.redirect('/login');
});

module.exports = router;
