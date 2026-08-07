const express = require("express");
const router = express.Router();
const {
  login,
  refreshToken,
  logout,
} = require("../controllers/auth.controller");
const { protect } = require("../middelwares/auth.middelware");

router.post("/login", login);
router.post("/logout", protect, logout);
router.post("/refresh-token", refreshToken);

module.exports = router;
