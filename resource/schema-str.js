module.exports = function(schemaFields) {
  return schemaFields.map(function(field) {
    var key = field.split(':')[0];
    var schemaType = field.split(':')[1];
    var ref = field.split(':')[2];

    switch (schemaType) {
      case 'Date':
        return `${key}: { type: ${schemaType}, default: Date.now }`;
      case 'ObjectId':
        return `${key}: { type: ${schemaType}, ref: ${ref} }`;
      case 'Array':
        return `${key}: [{ type: ${ref} }]`;
      default:
        return `${key}: { type: ${schemaType} }`;
    }
  }).join(',\n  ') + ',';
};
