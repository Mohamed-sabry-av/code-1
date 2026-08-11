const Product = require("../models/products.model");
// Create Product
exports.createProduct = async (req, res) => {
  // please enter the following {title,price,desc,stock}
  try {
    const productData = { ...req.body };
    console.log(req.body, req.file);

    if (req.file) {
      productData.imageURL = `/uploads/${req.file.filename}`; //
    }

    const newProduct = await Product.create(productData);
    res.status(201).json({
      status: "sucess",
      data: newProduct,
    });
  } catch (err) {
    res.status(406).json({
      message: "Failed to create a product",
      ErrMessage: err.message,
    });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const getProducts = await Product.find();
    res.status(200).json({
      status: "success",
      products: getProducts,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Get one Product By ID
exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const getProductByID = await Product.findById(id);

    res.status(200).json({
      sucess: true,
      product: getProductByID,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const DeleteProduct = await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "Deleted",
      deleted: DeleteProduct,
    });
  } catch (err) {
    res.status(406).json({
      status: "Error",
      message: err.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const newBody = req.body;
    const updateProduct = await Product.findByIdAndUpdate(id, newBody);

    res.status(200).json({
      status: "Updated",
    }); // stock -1
    // stock + 500
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: err.message,
    });
  }
};