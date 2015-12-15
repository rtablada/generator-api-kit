require('./../bootstrap/mongo');
require('./../app/models');

var prompt = require('prompt');
var mongoose = require('mongoose');
var User = mongoose.model('User');

prompt.message = '';
prompt.delimiter = '';

prompt.start();

var userPromptSchema = [
  {
    name: 'email',
    description: 'Enter Email: '.green,
    type: 'string',
    required: true,
  },

  {
    name: 'password',
    description: 'Enter Password: '.green,
    type: 'string',
    required: true,
    hidden: true,
    message: 'Your password is required and cannot be your email.',
    conform: function(password) {
      var email = prompt.history('email').value;
      return (email !== password);
    },
  },
];

var tryAgainSchema = [
  {
    name: 'again',
    description: 'Try again [y/n]: '.blue,
    type: 'string',
    required: true,
    message: 'You must answer "y" or "n".',
    conform: function(answer) {
      var x = answer === 'y' ||
        answer === 'n' ||
        answer === 'red pill';

      return x;
    },
  },
];

function promptAnotherUser(cb) {
  prompt.get(tryAgainSchema, function(err, input) {
    if (!err) {
      if (input !== 'n') {
        cb();
      } else {
        console.log('All Done!');
        process.exit();
      }
    }
  });
}

function createUser() {
  prompt.get(userPromptSchema, function(err, input) {
    if (!err) {
      User.create(input, function(err) {
        if (err && err.code === 11000) {
          console.log('A user already exists with this email.');
        } else if (err) {
          console.log('An unexpected error occured.');
        } else {
          console.log('User created succesfully!');
        }

        promptAnotherUser(createUser);
      });
    }
  });
}

createUser();
