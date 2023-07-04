const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  answer_id: { type: String, required: false, min: 3 },
  comment_text: { type: String, required: true, min: 3 },
});

module.exports = mongoose.model("Comment", taskSchema);
