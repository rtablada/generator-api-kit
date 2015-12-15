var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  books: [{type: Schema.Types.ObjectId, ref: 'Book'}],
});

UserSchema.path('password').set(function(value) {
  if (!value) {
    return this.password;
  }

  var salt = bcrypt.genSaltSync();

  return bcrypt.hashSync(value, salt);
});

UserSchema.methods.checkPassword = function(value, success, failure) {
  bcrypt.compare(value, this.password, function(err, result) {
    if (result) {
      success();
    } else {
      failure(err);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
