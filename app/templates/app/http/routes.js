var express = require('express');
var router = express.Router();
var apiRouter = express.Router();
var oauth = require('../oauth');

var resources = require('auto-loader').load(__dirname + '/resources');

var register = require('./resources/register');

apiRouter.use('/register', resources.register);

apiRouter.use('/books', oauth.authorise(), resources.books);

router.use('/api', apiRouter);

module.exports = router;
