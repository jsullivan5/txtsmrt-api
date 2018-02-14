require('dotenv').config();
/* eslint-disable no-unused-expressions */

describe('twilioService', () => {
  let twilioService;

  beforeEach('get a fresh service', () => {
    twilioService = require('../api/services/twilio.service');
  });

  afterEach('destroy service', () => {
    twilioService = undefined;
  });

  describe('constructor', (done) => {
    it('should instantiate a Twilio client', () => {
      expect(twilioService.twilioClient).to.exist;
    });
  });
});
