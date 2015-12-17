var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var tokenBroker = require('./../../services/token-broker');

var flashError = function(req, res, message) {
  req.flash('danger', message);

  res.withInput().redirectBack();
};

/* GET login form. */
router.get('/', function(req, res) {
  res.render('password-reset/create');
});

/* POST submit login */
router.post('/', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err || !user) {
      flashError(req, res, 'The user with your email was not found.');
      return;
    }

    var token = tokenBroker.create(user);
    var resetUrl = req.protocol + '://' + req.get('host') + '/reset/' + token;

    res.mailer.send('emails/reset-password', {
      to: user.email,
      resetUrl: resetUrl,
      subject: 'Password Reset',
    }, function(err) {
      if (err) {
        console.log(err);
        res.send('There was an error sending the email');
      } else {
        res.send('email sent');
      }
    });
  });
});

router.get('/:token', function(req, res) {
  res.render('password-reset/update', {token: req.params.token});
});

router.post('/:token', function(req, res) {
  if (req.params.token !== req.body.token) {
    flashError(req, res, 'Invalid token');
    return;
  }

  if (!(req.body.email && req.body.password && req.body.passwordConfirmation)) {
    flashError(req, res, 'All fields are required.');
    return;
  }

  if (req.body.password && req.body.password !== req.body.passwordConfirmation) {
    flashError(req, res, 'Password and password confirmation do not match.');
    return;
  }

  User.findOne({email: req.body.email}, function(err, user) {
    if (err || !user) {
      flashError(req, res, 'This user does not exist.');
    }

    tokenBroker.validate(user.email, req.params.token, function(err) {
      if (err) {
        flashError(req, res, 'Your token has expired or does not match, please request a new one.');
        return;
      } else {
        user.set('password', req.body.password);
        user.save(function(err) {
          if (err) {
            console.log(err);
            flashError(req, res, 'There was an unexpected error setting your password.');
            return;
          }

          tokenBroker.expire(req.params.token);
          req.flash('success', 'You have reset your password, please login.');

          return res.redirect('/login');
        });
      }
    });
  });
});

module.exports = router;
