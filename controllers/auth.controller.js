const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN, //15m
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN, //7d
  });
};

const sendRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    max: 7 * 24 * 60 * 60 * 1000,
  });
};

exports.refreshToken = async (req, res) => {
  try {
    // const { refreshToken } = req.body;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        status: "Failed",
        message: "Invalid refresh token",
      });
    }

    const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET); //id

    const user = await User.findById(decode.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        status: "Failed",
        message: "Invalid refresh token",
      });
    }
    const newAccessToken = generateAccessToken(user._id);

    res.status(200).json({
      status: "success",
      newAccessToken,
    });
  } catch (err) {
    return res.status(401).json({
      status: "Failed",
      message: "Invalid or expired refresh token",
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "Failed",
        message: "Please Provide a correct email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: "Failed",
        message: "Incorrect email or password",
      });
    }

    const token = generateAccessToken(user._id);
    const RefreshToken = generateRefreshToken(user._id);

    user.refreshToken = RefreshToken;
    await user.save();

    sendRefreshTokenCookie(res, RefreshToken);

    res.status(200).json({
      sucess: "success",
      data: {
        email: user.email,
        role: user.role,
        token: token,
      },
      // refreshToken: RefreshToken,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    if (!req.user.refreshToken) {
      res.status(400).json({
        status: "Failed",
        message: err.message,
      });
    }
    req.user.refreshToken = undefined;
    await req.user.save();

    res.clearCookie("refreshToken");

    res.status(200).json({
      status: "Success",
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};
