const Note = require("../models/note");

// createNote(userId, noteObj) - should create a note for the given user
module.exports.createNote = (userId, noteObj) => {
    try {
      return Note.create(userId, noteObj);
    } catch (e) {
      next(e);
    }
  };

// getNote(userId, noteId) - should get note for userId and noteId (_id)

module.exports.getNote = (userId, noteId) => {
    try {
      return Note.findOne({ userId, noteId }).lean();
    } catch (e) {
      next(e);
    }
  };
// getUserNotes(userId) - should get all notes for userId

module.exports.getUserNotes = (userId) => {
    try {
      return User.find({ userId }).lean();
    } catch (e) {
      next(e);
    }
  };

module.exports = {};
