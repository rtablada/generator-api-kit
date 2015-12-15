var Mystique = require('mystique');

var UserTransformer = new Mystique.Transformer({
  resourceName: 'user',
  map: function(user) {
    return {
      _id: user.id,
      email: user.email,
    };
  },
});

Mystique.registerTransformer('User', UserTransformer);
