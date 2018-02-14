const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const config = require('../util/config');
const logger = require('../util/logger');

class ToneService {
  constructor () {
    this.toneAnalyzer = new ToneAnalyzerV3({
      username: config.watsonUserName,
      password: config.watsonPassword,
      version: '2016-05-19',
      url: config.watsonUrl
    });
  }

  getTone (message) {
    const params = {
      tone_input: message,
      content_type: 'text/plain'
    };

    return this.toneAnalyzer.tone(params, (error, response) => {
      if (error) {
        logger.error('error:', error);
      } else {
        logger.dubug(JSON.stringify(response, null, 2));
        return response;
      }
    });
  }
}

module.exports = exports = new ToneService();
