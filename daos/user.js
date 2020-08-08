const User = require("../models/user");
const Token = require("../models/token");

const { v4: uuidv4 } = require("uuid");

module.exports = {};

module.exports.create = async (user) => {
  return await User.create(user);
};

module.exports.findEmail = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    return user;
  } else {
    return false;
  }
};

module.exports.updatePassword = async (user) => {
  return await User.update(user);
};
