var mongoose = require('mongoose');
var Schema= mongoose.Schema;
var ObjectId = Schema.ObjectId;
var bcrypt   = require('bcrypt-nodejs');
var Book = require('./book');

// create model user
var UserSchema = new Schema( {
  name: String,
  user_url: String,
  local : {
      email: {
      type: String,
      match: /.+\@.+\..+/,
      unique: true,
      required: true
    }, // end user email
    password: {
      type: String,
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)./,
      required: true
    } // end user password
  },
  // books: [ {type: Schema.ObjectId, ref: "Book"} ]
  books: [ Book.schema ],
} );


UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
