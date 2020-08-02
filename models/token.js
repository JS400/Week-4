const mongoose = require("mongoose");

// A user should be able to have multiple tokens, which allows them to log in and out on multiple browsers/devices at the same time (i.e. do not use a unique index)

const tokenSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  token: { type: String, required: true },
});

module.exports = mongoose.model("token", tokenSchema);
