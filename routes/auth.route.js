const express = require("express");
const router = express.Router();
const {
  login,
  refreshToken,
  logout,
} = require("../controllers/auth.controller");
const { protect } = require("../middelwares/auth.middelware");
const { loginLimiter } = require("../middelwares/rateLimit.middleware");

// router.post("/login", loginLimiter, login); // for testing the rate limit middleware, you can uncomment this line and comment the next one
router.post("/login", login);
router.post("/logout", protect, logout);
router.post("/refresh-token", refreshToken);

module.exports = router;