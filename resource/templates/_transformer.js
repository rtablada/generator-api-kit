var Mystique = require('mystique');

var <%= capSchemaName %>Transformer = Mystique.Transformer.extend({
  resourceName: '<%= lowSchemaName %>',
  mapOut: function(<%= lowSchemaName %>) {
    return {
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
