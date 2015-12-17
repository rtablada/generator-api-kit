var Mystique = require('mystique');

var <%= capSchemaName %>Transformer = Mystique.Transformer.extend({
  resourceName: '<%= lowSchemaName %>',
  mapOut: function(<%= lowSchemaName %>) {
    return {
      id: <%= lowSchemaName %>.id,
      <%= mapInProps %>
    };
  },

  mapIn(req) {
    return {
      <%= mapOutProps %>
    };
  },
});

Mystique.registerTransformer('<%= capSchemaName %>', <%= capSchemaName %>Transformer);
