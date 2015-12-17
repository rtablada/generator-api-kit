var express = require('express');
var router = express.Router();
var apiRouter = express.Router();
var protectedRouter = express.Router();
var oauth = require('../oauth');
var loader = require('flat-load');

var resources = require('auto-loader').load(__dirname + '/resources');

// Namespaces all API Resources to /api
router.use('/api', apiRouter);

// Protects Protected Routes using OAuth2 Filter
protectedRouter.use(oauth.authorise());

// Allows User Registration
apiRouter.use('/register', resources.auth.register);

// Auto Load Public Resources
loader(__dirname + '/resources/public').forEach((route) => {
  apiRouter.use(route);
});

// Auto Load Protected Resources
loader(__dirname + '/resources/protected').forEach((route) => {
  protectedRouter.use(route);
});

// Merges Protected Routes into API Router
apiRouter.use(protectedRouter);

module.exports = router;
