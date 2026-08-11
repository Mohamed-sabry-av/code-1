const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/products.controller");
const { protect, restrectTo } = require("../middelwares/auth.middelware");
const upload = require("../middelwares/upload.middleware");

router.post(
  "/",
  protect,
  restrectTo("admin"),
  upload.single("imageURL"),
  createProduct,
);
// router.get("/", protect, getProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", protect, restrectTo("admin"), deleteProduct);
router.put("/:id", protect, restrectTo("admin"), updateProduct);

module.exports = router;

// -------------------------
// req.body ->
// req.file ->
