module.exports = {
  schemaProps(schemaFields) {
    return schemaFields.map(function(field) {
      var key = field.split(':')[0];
      var schemaType = field.split(':')[1];
      var ref = field.split(':')[2];
      var childPath = field.split(':')[3];

      switch (schemaType) {
        case 'Date':
          return `${key}: { type: ${schemaType}, default: Date.now }`;
        case 'ObjectId':
          return `${key}: { type: ${schemaType}, ref: ${ref} }`;
        case 'BelongsTo':
          return `${key}: { type: ObjectId, ref: '${ref}', childPath: '${childPath}' }`;
        case 'HasMany':
          return `${key}: [{ type: ObjectId, ref: '${ref}' }]`;
        case 'Array':
          return `${key}: [{ type: ${ref} }]`;
        default:
          return `${key}: { type: ${schemaType} }`;
      }
    }).join(',\n  ') + ',';
  },

  relationships(modelName, schemaFields) {
    return schemaFields.map(function(field) {
      var key = field.split(':')[0];
      var schemaType = field.split(':')[1];

      if (schemaType === 'BelongsTo') {
        return `${modelName}Schema.plugin(relationship, {relationshipPathName: '${key}'})`;
      }
    }).filter(function(schema) {
      return schema;
    }).join(';') + ';';
  },
};
