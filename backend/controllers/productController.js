const { validationResult } = require("express-validator");

//local imp
const Product = require("../models/productModel");
//local import
const printMessage = require("../util/printMessage");
const HttpError = require("../util/HttpErrorModel");

exports.getAllProducts = async (req, res, next) => {
  //INIT VAR
  let fetchProducts;
  let maxProductCount;

  //extracting queriParams
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;
  let isHomePage = req.query.isHomePage;

  //getting the max count of products collection
  try {
    maxProductCount = await Product.find().countDocuments();
  } catch (error) {
    printMessage("error when try fetch all the product ", error);
    return next(
      new HttpError("Could not fetch all products try again later", 500)
    );
  }

  //getting the products
  try {
    if (pageSize && currentPage) {
      fetchProducts = await Product.find()
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    } else if (isHomePage) {
      fetchProducts = await Product.find().limit(8);
    }
  } catch (error) {
    printMessage("error when try fetch all the product ", error);
    return next(
      new HttpError("Could not fetch all products try again later", 500)
    );
  }

  //if we dont find any product
  if (!fetchProducts) {
    return next(
      new HttpError("Could not fetch all products try again later", 500)
    );
  }

  res.status(200).json({
    message: "successfully fetch all products",
    products: fetchProducts,
    maxProductCount,
  });
};

exports.getSingleProduct = async (req, res, next) => {};

exports.addNewProduct = async (req, res, next) => {
  //VAR INI
  let newProdResult;

  //VALIDATION
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    let errorMessage = validationRes.errors[0].msg;
    printMessage("Error occur in validation ", errorMessage);
    return next(new HttpError(errorMessage, 422));
  }

  //Extracting the body
  const {
    name,
    brandName,
    price,
    description,
    rating,
    availableColor,
  } = req.body;

  const tempNewProp = new Product({
    name,
    brandName,
    price,
    description,
    rating,
    availableColor,
    mainImg: req.files.mainImg[0].path,
    additionalImages: [
      req.files.additionalImages[0].path,
      req.files.additionalImages[1].path,
      req.files.additionalImages[2].path,
      req.files.additionalImages[3].path,
    ],
  });

  //saving the product
  //Now saving into data base
  try {
    newProdResult = await tempNewProp.save();
  } catch (error) {
    printMessage(
      "error occur when try to create new product in data base",
      error
    );
    return next(new HttpError("Could not create new product try again ", 500));
  }

  if (!newProdResult) {
    return next(new HttpError("Could not create new product try again ", 500));
  }
  printMessage("result of new product added ", newProdResult);
  res.json({ message: "successfully added new product" });
};

exports.updateProduct = async (req, res, next) => {};

exports.deleteProduct = async (req, res, next) => {
  //VAR INI
  let resultOfDeletion;
  const productID = req.params.productID;

  try {
    resultOfDeletion = await Product.findByIdAndRemove(productID);
  } catch (error) {
    printMessage("error occur when try to delete a product", error);
    return next(new HttpError("Could not delete  product try again ", 500));
  }

  if (!resultOfDeletion) {
    return next(
      new HttpError(
        "Could not delete  product try again maybe product does not exist",
        500
      )
    );
  }
  printMessage("result of deletion", resultOfDeletion);
  res.status(200).json({
    message: "successfully deleted the product",
  });
};
