const config = require('../util/config');
const twilioClient = require('twilio')(
  config.twilioSID,
  config.twilioToken
);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const toneService = require('./tone.service');

class TwilioService {
  constructor () {
    this.twilioClient = twilioClient;
  }

  async formatMessage (toneResponse) {
    const toneMessage = this._formatToneMessage(toneResponse);
    const twiml = new MessagingResponse();
    twiml.message(toneMessage);

    return twiml.toString();
  }

  _formatToneMessage (tones) {
    const introText = toneService.getIntroText(tones);
    const formattedTones = toneService.formatToneArray(tones);

    return (`
      ${introText.toString()}

      ${formattedTones[0].toString()}
      ${formattedTones[1].toString()}
      ${formattedTones[2].toString()}
      ${formattedTones[3].toString()}
      ${formattedTones[4].toString()}
    `);
  }
}

module.exports = exports = new TwilioService();
