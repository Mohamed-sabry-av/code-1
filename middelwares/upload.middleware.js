const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqeSuffix = Date.now() + "-" + Math.round(Math.random() * 13);
    cb(null, uniqeSuffix + path.extname(file.originalname)); // D:\Moh. Sabry\Courses\NTI\online\code-1\uploads\12062026-456789+png
  },
});

const fileFilter = (req, file, cb) => {
  // jpg . png . webp . jpeg . svg
  const allowedTypes = /jpg | png | webp | jpeg | svg/;
  const isValidExt = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const isValidMime = allowedTypes.test(file.mimetype);

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error("Only Image Files are Allowed "));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5mb
});

module.exports = upload

