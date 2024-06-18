// controllers/product.controller.js
const Product = require('../models/product.model');

module.exports.getAllProducts = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    //next();
    const products = await Product.find();
    res.json(products);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    //res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteAllProducts = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    await Product.deleteMany({});
    res.json({ message: 'All products deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.findProductsByName = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    const products = await Product.find({ name: new RegExp(req.query.name, 'i') });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
