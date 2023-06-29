const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

const {
  SIGN_UP,
  LOGIN,
} = require("../controllers/user");

router.post("/user", SIGN_UP);
router.post("/login", LOGIN);

module.exports = router;
