var Mystique = require('mystique');

var <%= capSchemaName %>Transformer = Mystique.Transformer.extend({
  resourceName: '<%= schemaName %>',
  mapOut: function(<%= schemaName %>) {
    return {
      id: <%= schemaName %>.id,
      <%= mapInProps %>
    };
  },

  mapIn(req) {
    return {
      <%- mapOutProps %>
    };
  },
});

Mystique.registerTransformer('<%= capSchemaName %>', <%= capSchemaName %>Transformer);
