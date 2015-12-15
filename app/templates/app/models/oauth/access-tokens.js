var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OAuthAccessTokensSchema = new Schema({
  accessToken: { type: String },
  clientId: { type: String },
  expires: { type: Date },
  user: { type: String, ref: 'User' },
});

module.exports = mongoose.model('OAuthAccessTokens', OAuthAccessTokensSchema);
