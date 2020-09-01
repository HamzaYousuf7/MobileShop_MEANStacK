const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  orderProducts: [
    {
      productID: { type: String, required: true },
      name: { type: String, required: true },
      brandName: { type: String, required: true },
      price: { type: Number, required: true },
      availableColor: { type: String, required: true },
      quantity: { type: Number, required: true },
      userID: { type: String, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Cart", cartSchema);
