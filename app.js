require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./api/util/config');
const logger = require('./api/util/logger');

const index = require('./api/routes/index');
const sms = require('./api/routes/sms.route');

const mongoose = require('mongoose');
mongoose.connect(config.mongoUri);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', logger.error
  .bind(logger, 'MongoDb connection error:'));
db.once('open', () => {
  logger.info('Conected to database');
});

const app = express();
const server = require('http').Server(app);

app.use('/', express.static('public'));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  'methods': 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  'optionsSuccessStatus': 200,
  'origin': true,
  preflightContinue: true
}));

// Routes
app.use('/healthcheck', index);
app.use('/sms', sms);

// Error Handler
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500)
    .send(err.message || 'Internal Server Error');
});

server.listen(config.port, () => {
  logger.info(`txtSmrt API listening on port ${config.port}`);
});
