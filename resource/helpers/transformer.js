module.exports = {
  mapInProps: function(schemaName, schemaFields) {
    return schemaFields.map(function(field) {
      var key = field.split(':')[0];

      return `${key}: ${schemaName}.${key}`;
    }).join(',\n      ') + ',';
  },

  mapOutProps: function(schemaName, schemaFields) {
    return schemaFields.map(function(field) {
      var key = field.split(':')[0];

      return `${key}: req.body.${schemaName}.${key}`;
    }).join(',\n      ') + ',';
  },
};
