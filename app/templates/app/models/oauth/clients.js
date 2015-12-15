var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OAuthClientsSchema = new Schema({
  clientId: { type: String },
  clientSecret: { type: String },
  redirectUri: { type: String },
});

module.exports = mongoose.model('OAuthClients', OAuthClientsSchema);
