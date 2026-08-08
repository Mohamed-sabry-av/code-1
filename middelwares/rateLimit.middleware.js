const rateLimit = require("express-rate-limit");

//Limit global API
exports.globalLimiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  limit: 100,
  message: {
    status: "Failed",
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
});

exports.loginLimiter = rateLimit({
  windowMS: 15 * 60 * 1000,
  limit: 5,
  message: {
    status: "Failed",
    message: "Too many login attempts, please try again after 15 minutes",
  },
});
