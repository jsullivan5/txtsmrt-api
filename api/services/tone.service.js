const config = require('../util/config');
const logger = require('../util/logger');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const toneAnalyzer = new ToneAnalyzerV3({
  username: config.watsonUserName,
  password: config.watsonPassword,
  version_date: '2016-05-19',
  url: config.watsonUrl
});

class ToneService {
  constructor () {
    this.toneAnalyzer = toneAnalyzer;
  }

  async getTone (message) {
    const params = {
      tone_input: message,
      content_type: 'text/plain'
    };

    return new Promise((resolve, reject) => {
      this.toneAnalyzer.tone(params, (error, response) => {
        if (error) {
          logger.error('error:', error);
          reject(error);
        } else {
          const parsedResponse = JSON.stringify(response, null, 2);
          logger.debug(parsedResponse);
          resolve(parsedResponse);
        }
      });
    });
  }
}

module.exports = exports = new ToneService();
