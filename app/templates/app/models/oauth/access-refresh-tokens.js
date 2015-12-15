var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OAuthRefreshTokensSchema = new Schema({
  refreshToken: { type: String },
  clientId: { type: String },
  userId: { type: String },
  expires: { type: Date },
});

module.exports = mongoose.model('OAuthRefreshTokens', OAuthRefreshTokensSchema);
