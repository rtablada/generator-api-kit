var express = require('express');
var router = express.Router();
var apiRouter = express.Router();
var oauth = require('../oauth');

var resources = require('auto-loader').load(__dirname + '/resources');

// Namespaces API resources to /api
router.use('/api', apiRouter);

apiRouter.use('/register', resources.register);
apiRouter.use('/books', oauth.authorise(), resources.books);

module.exports = router;
