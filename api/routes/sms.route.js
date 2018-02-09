const express = require('express');
const twilioService = require('../services/twilio.service');
const smsService = require('../services/sms.service');
const logger = require('../util/logger');

const router = express.Router();

router.post('/', async (req, res, next) => {
  let message;

  try {
    message = await twilioService.formatMessage(req.body.Body);
    await smsService.insertMessage(req.body);
    logger.debug(`Message inserted: [${req.body.Body}]`);
  } catch (error) {
    logger.error(`Error receiving SMS: [${error}]`);
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(message);
});

module.exports = router;
