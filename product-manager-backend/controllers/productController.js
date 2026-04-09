import Product from "../models/Product.js";


// =======================
// CREATE PRODUCT
// =======================
export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const newProduct = new Product({
      name,
      price,
      description
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =======================
// GET ALL PRODUCTS
// =======================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get Product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// UPDATE PRODUCT
// =======================
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =======================
// DELETE PRODUCT
// =======================
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};