const Token = require("../models/token");
const { v4: uuidv4 } = require("uuid");
const { json } = require("express");

module.exports = {};

module.exports.assignToken = async (userId) => {
    token = uuidv4();
    const exists = Token.findOne({ userId }).lean();
    try {
    if (!exists) {
      return await Token.create({ userId: userId, token: token });
    } else {
      return (token)
      // return await Token.update({ userId }, { $push: { token: token } });
    }
  } catch (e) { next (e)}
};


module.exports.findTokenByUser = async (userId) => {
  return await Token.findOne({ userId: userId }).lean();

};
