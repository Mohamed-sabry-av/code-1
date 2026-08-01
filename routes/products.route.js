const express = require('express')
const router = express.Router();
const { createProduct, getProducts, getProductById, deleteProduct, updateProduct } = require('../controllers/products.controller')
// /
router.post('/', createProduct)
router.get('/', getProducts) // http://localhost:3000/product (GET)
router.get('/:id', getProductById) // http://localhost:3000/product/12345 (GET) 
router.delete('/:id', deleteProduct)
router.put("/:id", updateProduct)

module.exports = router

