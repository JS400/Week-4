const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: String, index: true },
});

noteSchema.index({ title: "text", userId: "text" });

module.exports = mongoose.model("note", noteSchema);
