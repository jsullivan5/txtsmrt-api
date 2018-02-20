const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.statics.authenticate = function (phoneNumber, password, callback) {
  User.findOne({ phoneNumber: phoneNumber })
    .exec(function (error, user) {
      if (error) {
        return callback(error);
      } else if (!user) {
        const error = new Error('User nor found.');
        error.status = 401;
        return callback(error);
      }
      bcrypt.compare(password, user.password, function (error, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback(error);
        }
      });
    });
};

UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (error, hash) {
    if (error) {
      return next(error);
    }
    user.password = hash;
    next();
  });
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
