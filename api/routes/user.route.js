const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
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
      req.session.userId = user._id;
      delete user.password;
      return res.cookie('userId', user._id, { maxAge: 900000, httpOnly: true })
        .status(200).send(user);
    }
  });
});

router.get('/login', async (req, res, next) => {
  const userId = req.session.userId;
  if (req.session && userId) {
    const user = await User.findOne({ '_id': new ObjectId(userId) })
      .select('_id phoneNumber firstName lastName email');
    res.status(200).send(user);
  } else {
    res.end();
  }
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
      delete user.password;
      return res.status(200).send(user);
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
