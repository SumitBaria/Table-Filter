const express = require("express");
const Product = require("../models/product");

const router = express.Router();

// Getting All Products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    return res.json({ error: "Products are not getting" });
  }
});

// Creatingm New Product
router.post("/product/create", async (req, res) => {
  try {
    const { name, menufacturer, price, quantity, stock } = req.body;

    const product = new Product({
      product_name: name,
      product_menu: menufacturer,
      product_price: price,
      product_quantity: quantity,
      product_stock: stock,
    });

    const savedProducts = product.save();

    res.json(savedProducts);
  } catch (error) {
    return res.json({ error: "Product is Not created" + error });
  }
});

module.exports = router;
