const Token = require("../models/token");

// getTokenForUserId(userId) - should be an async function that returns a string after creating a Token record
module.exports.getTokenForUserId = (userId) => {
  try {
    return Token.findOne({ userId }).lean();
  } catch (e) {
    next(e);
  }
};
// getUserIdFromToken(tokenString) - should be an async function that returns a userId string using the tokenString to get a Token record

module.exports.getUserIdFromToken = (userId) => {
  try {
    const user = Token.findOne({ userId }).lean();

    return user.token;
  } catch (e) {
    next(e);
  }
};

// removeToken(tokenString) - an async function that deletes the corresponding Token record
module.exports.removeToken = (userId) => {
  try {
    return Token.deleteOne({ userId }).lean();
  } catch (e) {
    next(e);
  }
};

module.exports = {};
