module.exports = exports = {
  port: process.env.PORT || 8080,
  twilioSID: process.env.TWILIO_SID || null,
  twilioToken: process.env.TWILIO_TOKEN || null,
  twilioNumber: process.env.TWILIO_NUMBER || null
};
