require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./api/util/config');
const logger = require('./api/util/logger');

const index = require('./api/routes/index');
const sms = require('./api/routes/sms.route');
const tone = require('./api/routes/tone.route');
const user = require('./api/routes/user.route');

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

const sess = {
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {}
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// TODO: Add connect-mongo for session store
app.use(session(sess));
app.use(cors({
  'methods': 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  'optionsSuccessStatus': 200,
  'origin': true,
  preflightContinue: true
}));

// Routes
app.use('/healthcheck', index);
app.use('/sms', sms);
app.use('/tone', tone);
app.use('/user', user);

// Error Handler
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500)
    .send(err.message || 'Internal Server Error');
});

server.listen(config.port, () => {
  logger.info(`txtSmrt API listening on port ${config.port}`);
});
