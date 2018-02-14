const express = require('express');
const router = express.Router();
const toneService = require('../services/tone.service');

router.post('/', async (req, res, next) => {
  const message = req.body.message;

  const tone = await toneService.getTone(message);
  res.status(200).send(tone);
});

module.exports = router;
