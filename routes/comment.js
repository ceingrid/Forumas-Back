const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {
  INSERT_COMMENT,
  DELETE_COMMENT,
  GET_ALL_COMMENTS
} = require("../controllers/comment");

router.post("/question/:id/comment", authMiddleware, INSERT_COMMENT);
router.delete("/comment/:answer_id", authMiddleware, DELETE_COMMENT);
router.get("/comments", GET_ALL_COMMENTS)

module.exports = router;
