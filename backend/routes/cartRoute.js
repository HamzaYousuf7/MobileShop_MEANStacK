const express = require("express");

//local import
const cartController = require("../controllers/cartController");

//START
const router = express.Router();

router.post("/placeOrder", cartController.addProductInCart);

module.exports = router;
