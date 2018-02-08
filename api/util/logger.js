const log4js = require('log4js');

const logger = log4js.getLogger('api');
logger.levbel = 'DEBUG';

module.exports = logger;
