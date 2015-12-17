'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var relationship = require('mongoose-relationship');

var fields = {
  <%- schemaProps %>
};

var <%= lowSchemaName %>Schema = new Schema(fields);

<%- relationships %>

module.exports = mongoose.model('<%= capSchemaName %>', <%= lowSchemaName %>Schema);
