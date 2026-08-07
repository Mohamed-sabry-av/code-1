const express = require('express')
const router = express.Router();
const { createProduct, getProducts, getProductById, deleteProduct, updateProduct } = require('../controllers/products.controller')
const { protect, restrectTo } = require("../middelwares/auth.middelware")

router.post('/', protect, restrectTo("admin"), createProduct)   // role <- === admin
router.get('/', protect, restrectTo("admin", "user"), getProducts) // http://localhost:3000/product (GET)
router.get('/:id', getProductById) // http://localhost:3000/product/12345 (GET) 
router.delete('/:id', protect, restrectTo("admin"), deleteProduct)
router.put("/:id", protect, restrectTo("admin"), updateProduct)

module.exports = router

