const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, index: true, required: true, unique: true },
  password: { type: String, index: true, required: true },
});

userSchema.index({ title: "text", email: "text" });

module.exports = mongoose.model("user", userSchema);
