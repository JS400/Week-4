const mongoose = require("mongoose");

// A user's email should not appear more than once in your collection (i.e. use a unique index)

const userSchema = new mongoose.Schema({
  email: { type: String, index: true, required: true, unique: true },
  password: { type: String, index: true, required: true },
});

module.exports = mongoose.model("users", userSchema);
