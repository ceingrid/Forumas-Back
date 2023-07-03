const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {
  INSERT_COMMENT,
} = require("../controllers/comment");

router.post("/comment", authMiddleware, INSERT_COMMENT);


module.exports = router;
