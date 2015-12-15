require('./../bootstrap/mongo');
require('./../app/models');
var rand = require('random-gen');

var prompt = require('prompt');
var mongoose = require('mongoose');
var OAuthClients = mongoose.model('OAuthClients');

prompt.message = '';
prompt.delimiter = '';

prompt.start();

var clientPromptSchema = [
  {
    name: 'clientId',
    description: 'Enter ClientId: '.green,
    type: 'string',
    required: true,
  },
];

function createClient() {
  prompt.get(clientPromptSchema, function(err, input) {
    if (!err) {
      input.clientSecret = rand.any(20);

      OAuthClients.create(input, function(err) {
        if (err) {
          console.log('An unexpected error occured.');
        } else {
          console.log('Oauth Client created succesfully!');
        }
      });
    }
  });
}

createClient();
