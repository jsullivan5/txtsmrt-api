const Sms = require('../models/sms.model');

class MessageService {
  constructor () {
    this.sms = Sms;
  }

  async getAllMessagesByUserId (userId) {
    return this.sms.find({ userId: userId });
  }
}

module.exports = exports = new MessageService();
