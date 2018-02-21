const User = require('../models/user.model');

class UserService {
  constructor () {
    this.user = User;
  }

  async getUserByPhoneNumber (phoneNumber) {
    return this.user.findOne({ phoneNumber: phoneNumber })
      .select('_id phoneNumber firstName lastName email');
  }
}

module.exports = exports = new UserService();
