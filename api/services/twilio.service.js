const config = require('../util/config');
const twilioClient = require('twilio')(
  config.twilioSID,
  config.twilioToken
);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

class TwilioService {
  constructor () {
    this.twilioClient = twilioClient;
  }

  async formatMessage (message) {
    const twiml = new MessagingResponse();
    twiml.message(`You said: ${message}, YO`);

    return twiml.toString();
  }
}

module.exports = exports = new TwilioService();
