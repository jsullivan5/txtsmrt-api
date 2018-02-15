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
          logger.debug('Tones received from Watson');
          resolve(response);
        }
      });
    });
  }

  formatToneArray (toneArray) {
    return toneArray.sort((a, b) => (b.score * 100) - (a.score * 100))
      .map(tone => (`${tone.tone_name} : ${(tone.score * 100).toFixed(2)}%`));
  }

  getIntroText (toneArray) {
    const sorted = toneArray.sort((a, b) => (b.score * 100) - (a.score * 100));

    if (sorted[0].score === 0) {
      return 'Try a longer message.';
    }

    switch (sorted[0].tone_name) {
    case 'Joy':
      return 'You sound mostly joyful.';
    case 'Anger':
      return 'You sound mostly angry.';
    case 'Sadness':
      return 'You sound mostly sad.';
    case 'Fear':
      return 'You sound mostly afraid.';
    case 'Disgust':
      return 'You sound mostly disgusted.';
    default:
      return '';
    }
  }
}

module.exports = exports = new ToneService();
