var oauthserver = require('oauth2-server');
var mongoose = require('mongoose');

var AccessToken = mongoose.model('OAuthAccessTokens');
var RefreshToken = mongoose.model('OAuthRefreshTokens');
var Client = mongoose.model('OAuthClients');
var User = mongoose.model('User');

var model = require('oauth-kit')(AccessToken, RefreshToken, Client, User);

module.exports = oauthserver({
  model,
  grants: ['password', 'refresh_token'],
  debug: true,
});
