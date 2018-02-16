const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/signup', async (req, res, next) => {
  const { phoneNumber, email, firstName, lastName, password, passwordConf } = req.body;
  let userData;

  if (password !== passwordConf) {
    const error = new Error('Passwords do not match.');
    error.status = 400;
    res.send('Passwords do not match');
    return next(error);
  }

  if (phoneNumber && email && firstName && lastName && password && passwordConf) {
    userData = {
      phoneNumber,
      email,
      firstName,
      lastName,
      password
    };
  }

  User.create(userData, (err, user) => {
    if (err) {
      return next(err);
    } else {
      return res.status(200).send('User Created');
    }
  });
});

router.post('/login', (req, res, next) => {
  const { phoneNumber, password } = req.body;
  User.authenticate(phoneNumber, password, function (error, user) {
    if (error || !user) {
      const err = new Error('Phone number or password incorrect');
      err.status = 401;
      return next(err);
    } else {
      req.session.userId = user._id;
      return res.send(user);
    }
  });
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        return next(error);
      } else {
        return res.send('Logged out');
      }
    });
  }
});

module.exports = router;
