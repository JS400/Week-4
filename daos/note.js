const Note = require("../models/note");

module.exports = {};

module.exports.create = async (note) => {
  return await Note.create(note);
};

module.exports.findById = async (id) => {
  const note = await Note.findOne({ id });

  if (note) {
    return note;
  } else {
    return false;
  }
};

module.exports.find = async () => {
  return await Note.find();
};
