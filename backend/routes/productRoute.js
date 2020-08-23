const express = require("express");
const { check } = require("express-validator");

//local import
const productContoller = require("../controllers/productController");
const fileUpload = require("../middleware/fileUpload");

//start
const route = express.Router();

route.get("/", productContoller.getAllProducts);

route.get("/:productID", productContoller.getSingleProduct);

route.post(
  "/",
  fileUpload.fields([
    { name: "mainImg", maxCount: 1 },
    { name: "additionalImages", maxCount: 4 },
  ]),
  [
    check("name").not().isEmpty().withMessage("name is required"),
    check("brandName").not().isEmpty().withMessage("brandName is required"),
    check("price").not().isEmpty().withMessage("price is required"),
    check("description").not().isEmpty().withMessage("description is required"),
    check("rating").not().isEmpty().withMessage("rating is required"),
    check("availableColor")
      .not()
      .isEmpty()
      .withMessage("availableColor is required"),
  ],
  productContoller.addNewProduct
);

route.put(
  "/:productID",
  fileUpload.fields([
    { name: "mainImg", maxCount: 1 },
    { name: "additionalImages", maxCount: 4 },
  ]),
  [
    check("name").not().isEmpty().withMessage("name is required"),
    check("brandName").not().isEmpty().withMessage("brandName is required"),
    check("price").not().isEmpty().withMessage("price is required"),
    check("description").not().isEmpty().withMessage("description is required"),
    check("rating").not().isEmpty().withMessage("rating is required"),
    check("availableColor")
      .not()
      .isEmpty()
      .withMessage("availableColor is required"),
  ],
  productContoller.updateProduct
);

route.delete("/:productID", productContoller.deleteProduct);

module.exports = route;
