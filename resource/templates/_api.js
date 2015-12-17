// Module dependencies.
var express = require('express');
var router = express.Router();
var api = {};

// ALL
api.<%= pluralName %> = function(req) {
  return req.store.recordCollection('<%= capSchemaName %>');
};

// GET
api.<%= lowSchemaName %> = function(req) {
  return req.store.recordItemById('<%= capSchemaName %>', req.params.id);
};

// POST
api.add<%= capSchemaName %> = function(req) {
  return req.store.createRecord('<%= capSchemaName %>');
};

// PUT
api.edit<%= capSchemaName %> = function(req) {
  return req.store.updateRecord('<%= capSchemaName %>', req.params.id);
};

// DELETE
api.delete<%= capSchemaName %> = function(req) {
  return req.store.destroyRecord('<%= capSchemaName %>', req.params.id);
};

router.get('/<%= pluralName %>', api.<%= pluralName %>);
router.post('/<%= lowSchemaName %>', api.add<%= capSchemaName %>);

router.route('/<%= lowSchemaName %>/:id')
  .get(api.<%= lowSchemaName %>)
  .put(api.edit<%= capSchemaName %>)
  .delete(api.delete<%= capSchemaName %>);

module.exports = router;