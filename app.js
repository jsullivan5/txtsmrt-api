require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./api/util/config');
const logger = require('./api/util/logger');

const index = require('./api/routes/index');
const sms = require('./api/routes/sms.route');

const app = express();
const server = require('http').Server(app);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', index);
app.use('/sms', sms);

server.listen(config.port, () => {
  logger.info(`txtSmrt API listening on port ${config.port}`);
});
