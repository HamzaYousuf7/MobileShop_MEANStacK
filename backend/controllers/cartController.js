const Cart = require("../models/cartModel");
const printMessage = require("../util/printMessage");
const HttpError = require("../util/HttpErrorModel");

exports.addProductInCart = async (req, res, next) => {
  // var ini
  let resultOfAddProd;
  const testBody = req.body;
  console.log(testBody);
  const { orderProducts, totalPrice } = req.body; // extracting the props from obj

  //creating the cart obj and adding all the value
  const tempCart = new Cart({
    orderProducts,
    totalPrice,
  });

  //saving it
  try {
    resultOfAddProd = await tempCart.save();
  } catch (error) {
    printMessage("error occur when try to save save cart product", error);
    return next(
      new HttpError("Sorry unable to place your order please try again", 500)
    );
  }

  if (!resultOfAddProd) {
    return next(
      new HttpError("Sorry unable to place your order please try again", 500)
    );
  }

  printMessage("result when product get added in cart", resultOfAddProd);
  res.status(200).json({ message: "Your order is placed successfully " });
};
