const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/signup', async (req, res, next) => {
  const { phoneNumber, email, firstName, lastName, password, passwordConf } = req.body;
  let userData;

  if (phoneNumber && email && firstName && lastName && password && passwordConf) {
    userData = {
      phoneNumber,
      email,
      firstName,
      lastName,
      password,
      passwordConf
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

module.exports = router;
