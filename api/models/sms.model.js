const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SmsSchema = new Schema({
  to: String,
  from: String,
  text: String,
  smsId: String,
  userId: String
});

module.exports = mongoose.model('Sms', SmsSchema);
