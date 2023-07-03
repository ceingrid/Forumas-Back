const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  comment_text: { type: String, required: true, min: 3 },
});

module.exports = mongoose.model("Comment", taskSchema);
