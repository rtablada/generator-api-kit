var Mystique = require('mystique');

var UserTransformer = new Mystique.Transformer({
  resourceName: 'user',
  map: function(user) {
    return {
      id: user.id,
      email: user.email,
    };
  },
});

Mystique.registerTransformer('User', UserTransformer);
