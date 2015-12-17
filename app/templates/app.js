var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cors = require('cors');

var app = express();

// Allow CORS, you may want to configure this for your domains
app.use(cors());

require('./bootstrap/middleware')(app);

// Mail isn't needed. If you want it THERE BE DRAGONS
// require('./bootstrap/mail')(app);

require('./bootstrap/mongo');
require('./app/models');
require('./app/transformers');
app.use(require('./app/middleware/xmen'));
app.use(require('./app/middleware/origin-signing'));

app.oauth = require('./app/oauth');

app.all('/oauth/token', app.oauth.grant());
var routes = require('./app/http/routes');
app.use('/', routes);

require('./bootstrap/errors')(app);

app.use(app.oauth.errorHandler());

module.exports = app;
