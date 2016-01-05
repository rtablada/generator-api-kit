var Mystique = require('mystique');

var ProfileTransformer = Mystique.Transformer.extend({
  resourceName: 'profile',
  mapOut: function(profile) {
    return {
      id: profile.id,
    };
  },

  mapIn(req) {
    return {
    };
  },
});

Mystique.registerTransformer('Profile', ProfileTransformer);
