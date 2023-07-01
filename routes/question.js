const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {
  INSERT_QUESTION,
} = require("../controllers/question");

router.post("/question", INSERT_QUESTION);

module.exports = router;