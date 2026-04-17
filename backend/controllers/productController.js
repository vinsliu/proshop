const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Produit introuvable" });
  }
};

module.exports = {
  getProducts,
  getProductById,
};
