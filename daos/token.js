const Token = require("../models/token");

module.exports = {};

module.exports.create = async (token) => {
  return await Token.create(token);
};

module.exports.findTokenByUser = async (userId) => {
  const token = await Token.findOne({ userId });

  if (token) {
    return token;
  } else {
    return false;
  }
};
