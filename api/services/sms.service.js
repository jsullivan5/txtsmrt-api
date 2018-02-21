const Sms = require('../models/sms.model');
const logger = require('../util/logger');

class SmsService {
  async insertMessage (message, user) {
    const newMessage = this._formatMessage(message, user);

    return newMessage.save((error) => {
      if (error) { logger.error('Error adding message'); }

      logger.debug(`Message [${message.MessageSid}] added`);
    });
  }

  _formatMessage (message, user) {
    return new Sms({
      to: message.To,
      from: message.From,
      text: message.Body,
      smsId: message.MessageSid,
      userId: user._id
    });
  }
}

module.exports = exports = new SmsService();
