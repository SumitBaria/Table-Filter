const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    product_menu: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    product_price: {
      type: Number,
      required: true,
      maxlength: 8,
    },
    product_quantity: {
      type: Number,
      required: true,
      maxlength: 8,
    },
    product_stock: {
      type: Number,
      required: true,
      maxlength: 8,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
