const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// نفك ال JWT
// condition if role == admin -> create Product
//  if not -> 401 forbidden

// اتأكد إن اليوزر دا مدخل Token
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "No Token Provided, Please Login First",
      });
    }

    // verify the toekn's scecret is correct
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET); 

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({
        status: "Failed",
        message: "User belongin to this token no longer exist",
      });
    }

    req.user = currentUser;

    next();
  } catch (err) {
    return res.status(401).json({
      status: "Failed",
      message: "Invablid or expired Token",
    });
  }
};

// لو اليوزر دا حاطط توكن في الهيدر خليه يشغل الفانكشن

exports.restrectTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "Failed",
        message: "you dont have the premission to access",
      });
    }
    next();
  };
}; 

// req -> user
//
