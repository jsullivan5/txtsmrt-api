const User = require('../models/user/model');

class UserService {
  constructor () {
    this.user = User;
  }

  async getUser (userId) {
    return this.user.findOne({ '_id': new ObjectId(userId) })
      .select('_id phoneNumber firstName lastName email');
  }
}

module.exports = exports = new UserService();
