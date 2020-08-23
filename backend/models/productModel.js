const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brandName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  rating: { type: String, required: true },
  availableColor: { type: String, required: true },
  mainImg: { type: String, required: true },
  additionalImages: [{ type: String, required: true }],
});

module.exports = mongoose.model("Product", productSchema);
