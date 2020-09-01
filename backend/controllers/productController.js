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
  const isAdmin = req.query.isAdmin;

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
    } else if (isAdmin) {
      fetchProducts = await Product.find();
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

exports.getSingleProduct = async (req, res, next) => {
  //VAR INI
  let fetchProduct;

  const productID = req.params.productID;

  try {
    fetchProduct = await Product.findById(productID);
  } catch (error) {
    printMessage("error occur when try to fetching single  product", error);
    return next(
      new HttpError("Could not fetch single  product try again ", 500)
    );
  }

  if (!fetchProduct) {
    return next(
      new HttpError(
        "Could not fetch single  product try again may be product does not exist",
        500
      )
    );
  }
  printMessage("result of fetching single product", fetchProduct);
  res.status(200).json({
    message: "successfully fetch single product",
    product: fetchProduct,
  });
};

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

exports.updateProduct = async (req, res, next) => {
  //VAR INI
  let updateProduct;
  let mainImgPath, additionalImagesPath;
  const productID = req.params.productID;

  //VALIDATION
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    let errorMessage = validationRes.errors[0].msg;
    printMessage("Error occur in validation ", errorMessage);
    return next(new HttpError(errorMessage, 422));
  }

  //Now fetching that product
  try {
    updateProduct = await Product.findById(productID);
  } catch (error) {
    printMessage(
      "error occur when try to fetching single  product for update",
      error
    );
    return next(new HttpError("Could not update   product try again ", 500));
  }

  //! if does not exist product
  if (!updateProduct) {
    return next(new HttpError("Could not update   product try again ", 500));
  }

  //! either we're going to have new image or old img path as a string
  if (req.files) {
    console.log("RUN 1");
    mainImgPath = req.files.mainImg[0].path;
    additionalImagesPath = [
      req.files.additionalImages[0].path,
      req.files.additionalImages[1].path,
      req.files.additionalImages[2].path,
      req.files.additionalImages[3].path,
    ];
    printMessage("what we're getting when we upload files", "");
    console.log("main img", mainImgPath);
    console.log("addtional  imgages", additionalImagesPath);
  } else {
    console.log("RUN 2");
    mainImgPath = req.body.mainImg;
    additionalImagesPath = req.body.additionalImages;
    printMessage("what we're getting when we upload path ", "");
    console.log("main img", mainImgPath);
    console.log("addtional  imgages", additionalImagesPath);
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

  //updating its value
  updateProduct.name = name;
  updateProduct.brandName = brandName;
  updateProduct.price = price;
  updateProduct.description = description;
  updateProduct.rating = rating;
  updateProduct.availableColor = availableColor;
  updateProduct.mainImg = mainImgPath;
  updateProduct.additionalImages = additionalImagesPath;

  //saving into data base
  try {
    await updateProduct.save();
  } catch (error) {
    printMessage(
      "error occur when try to fetching single  product for update",
      error
    );
    return next(new HttpError("Could not update   product try again ", 500));
  }

  res.json({
    message: "product updated successfully",
  });
};

exports.deleteProduct = async (req, res, next) => {
  //VAR INI
  let deleteProduct;
  const productID = req.params.productID;

  try {
    deleteProduct = await Product.findById(productID);
  } catch (error) {
    printMessage("error occur when try to fetch product for deletion", error);
    return next(new HttpError("Could not delete  product try again ", 500));
  }

  try {
    await deleteProduct.remove();
  } catch (error) {
    printMessage("error occur when try to delete a product", error);
    return next(new HttpError("Could not delete  product try again ", 500));
  }

  printMessage("result of deletion", deleteProduct);
  res.status(200).json({
    message: "successfully deleted the product",
  });
};
