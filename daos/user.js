const User = require("../models/user");
const Token = require("../models/token");

const { v4: uuidv4 } = require("uuid");

module.exports = {};

module.exports.create = async (user) => {
  return await User.create(user);
};

module.exports.findByEmail = async (email) => {
 return await User.findOne({ email: email }).lean();
};

module.exports.updatePassword = async (user) => {
  return await User.updateOne(user);
};
