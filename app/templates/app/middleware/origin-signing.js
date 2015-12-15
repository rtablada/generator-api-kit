var config = require('config');
var signingOrigins = config.get('oauth.signingOrigins') || [];
var mongoose = require('mongoose');
var OAuthClient = mongoose.model('OAuthClients');

module.exports = function(req, res, next) {
  var origin = req.get('origin');

  var signedOrigin = signingOrigins.reduce(function(carry, signingOrigin) {
    if (signingOrigin.origin === origin) {
      return signingOrigin;
    }

    return carry;
  }, false);

  if (!signedOrigin) {
    return next();
  }

  return OAuthClient.findOne({clientId: signedOrigin.clientId}, function(err, client) {
    if (err) {
      return res.send(err);
    }

    if (client) {
      req.body.client_id = client.clientId;
      req.body.client_secret = client.clientSecret;
    }

    return next();
  });
};
