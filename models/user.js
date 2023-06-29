const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  password: { type: String, required: true, min: 15 },
  email: { type: String, required: true, min: 8 },
  id: { type: String, required: true, min: 3 },
  asked_questions_id: { type: Array, required: false },
});

module.exports = mongoose.model("User", taskSchema);
