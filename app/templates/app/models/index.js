var models = require('auto-loader').load(__dirname);

module.exports = {
  oauth: {
    AccessTokens: models.oauth['access-tokens'],
    RefreshToken: models.oauth['access-refresh-tokens'],
    Client: models.oauth.clients,
  },
  Book: models.book,
  NewsArticle: models['news-article'],
  User: models.user,
};
