const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: { type: String, index: true, required: true },
  token: { type: String, index: true, required: true },
});

tokenSchema.index({ title: "text", userId: "text", token: "text" });

module.exports = mongoose.model("token", tokenSchema);
