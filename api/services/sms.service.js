const Sms = require('../models/sms.model');
const logger = require('../util/logger');

class SmsService {
  async insertMessage (message) {
    const newMessage = this._formatMessage(message);

    return newMessage.save((error) => {
      if (error) { logger.error('Error adding message'); }

      logger.debug(`Message [${message.MessageSid}] added`);
    });
  }

  _formatMessage (message) {
    return new Sms({
      to: message.To,
      from: message.From,
      text: message.Body,
      smsId: message.MessageSid
    });
  }
}

module.exports = exports = new SmsService();
