const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {
  INSERT_QUESTION,
  DELETE_QUESTION,
  GET_ALL_QUESTIONS,
} = require("../controllers/question");

router.post("/question", authMiddleware, INSERT_QUESTION);
router.delete("/question/:id", authMiddleware, DELETE_QUESTION);
router.get("/questions", GET_ALL_QUESTIONS);


module.exports = router;