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
  },
  passwordConf: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', (next) => {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) {
      return next(error);
    }
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', UserSchema);
