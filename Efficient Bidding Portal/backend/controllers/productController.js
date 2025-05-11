const Product = require('../models/productSchema');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, category, description } = req.body;
    const newProduct = new Product({ name, category, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) return res.status(404).json({ msg: 'No products found' });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ msg: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ msg: 'Product not found' });
    res.status(200).json({ msg: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};
