const express = require('express');
const twilioService = require('../services/twilio.service');
const logger = require('../util/logger');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const message = await twilioService.formatMessage(req.body.Body);

  logger.debug(message);
  logger.debug(req.body);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(message);
});

module.exports = router;
