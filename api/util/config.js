module.exports = exports = {
  port: process.env.PORT || 8080,
  twilioSID: process.env.TWILIO_SID || null,
  twilioToken: process.env.TWILIO_TOKEN || null,
  twilioNumber: process.env.TWILIO_NUMBER || null,
  mongoUri: process.env.MONGO_URI || null,
  watsonUserName: process.env.WATSON_USER_NAME || null,
  watsonPassword: process.env.WATSON_PASSWORD || null,
  watsonUrl: process.env.WATSON_URL || null
};
