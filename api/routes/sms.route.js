const express = require('express');
const twilioService = require('../services/twilio.service');
const smsService = require('../services/sms.service');
const toneService = require('../services/tone.service');
const userService = require('../services/user.service');
const logger = require('../util/logger');

const router = express.Router();

router.post('/', async (req, res, next) => {
  let toneMessage;

  try {
    const user = await userService.getUserByPhoneNumber(req.body.From);
    const tones = await toneService.getTone(req.body.Body);
    toneMessage = await twilioService.formatMessage(
      tones.document_tone.tone_categories[0].tones
    );
    await smsService.insertMessage(req.body, user);
    logger.debug(`Message inserted: [${req.body.Body}]`);
  } catch (error) {
    logger.error(`Error receiving SMS: [${error}]`);
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(toneMessage);
});

module.exports = router;
