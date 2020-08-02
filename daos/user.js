const User = require("../models/user");
const Token = require("../models/token");

const { v4: uuidv4 } = require("uuid");

module.exports = {};

// getUser(email) - should get a user record using their email

module.exports.getByEmail = (email) => {
  try {
    return User.findOne({ email }).lean();
  } catch (e) {
    next(e);
  }
};

// createUser(userObj) - should store a user record
module.exports.create = (userData) => {
  try {
    return User.create(userData);
  } catch (e) {
    next(e);
  }
};

// updateUserPassword(userId, password) - should update the user's password field

module.exports.updatePassword = (newObj) => {
  try {
    module.exports.updateById = (userId, newObj) => {
      return User.update({ userId }, newObj);
    };
  } catch (e) {
    return e;
  }
};

module.exports.assignToken = (userId) => {
  try {
    token = uuidv4();
    const exists = Token.findOne({ userId }).lean();

    if (!exists) {
      return Token.create({ userId: userId, token: token });
      return token;
    } else {
      Token.update({ userId }, { $push: { token: token } });
      return token;
    }
  } catch (e) {
    return e;
  }
};
