const express = require('express');
const router = express.Router();
const messageService = require('../services/message.service');
const logger = require('../util/logger');

router.get('/list', async (req, res, next) => {
  const { userId } = req.session;

  try {
    const messages = await messageService.getAllMessagesByUserId(userId);
    logger.debug(messages);
    return res.status(200).send(messages);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
});

module.exports = router;
