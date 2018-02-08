require('dotenv').config();

const express = require('express');
const bodyParser = require('bodyParser');
const config = require('./api/util/config');
const logger = require('./api/util/logger');

const app = express();
const server = require('http').Server(app);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

server.listen(config.port, () => {
  logger.info(`txtSmrt API listening on port ${config.port}`);
});
