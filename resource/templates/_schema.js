'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var fields = {
  <%= schemaProps %>
};

var <%= lowSchemaName %>Schema = new Schema(fields);

module.exports = mongoose.model('<%= capSchemaName %>', <%= lowSchemaName %>Schema);
