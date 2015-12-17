var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var relationship = require('mongoose-relationship');

var BookSchema = new Schema({
  title: {type: String, required: true},
  year: {type: Number, required: true},
  data: {
    isbn: {type: String, required: true, unique: true},
  },
  author: {type: Schema.Types.ObjectId, ref: 'User', childPath: 'books'},
});

BookSchema.plugin(relationship, {relationshipPathName: 'author'});

module.exports = Mongoose.model('Book', BookSchema);
