const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  asked_questions_id: { type: String, required: true, min: 3 },
  question_text: { type: String, required: true, min: 15 },
  answers_id: { type: Array, required: false },
});

module.exports = mongoose.model("Question", taskSchema);
