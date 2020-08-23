const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

//local import
const printMessage = require("../util/printMessage");
const HttpError = require("../util/HttpErrorModel");
const Admin = require("../models/adminModel");

exports.adminLogin = async (req, res, next) => {
  //INI VAR
  let loginAdmin, isPasswordValid, token;

  //VALIDATION
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    let errorMessage = validationRes.errors[0].msg;
    printMessage("Error occur in validation ", errorMessage);
    return next(new HttpError(errorMessage, 422));
  }

  //extracting data from body
  const { email, password } = req.body;

  //finding the admin
  try {
    loginAdmin = await Admin.findOne({ email });
  } catch (error) {
    printMessage("error when try find admin by email login", error);
    return next(
      new HttpError("Could not login check your credentials and try again", 500)
    );
  }

  //!checking if we have a valid admin
  if (!loginAdmin) {
    //this means we dont have a valid email
    return next(
      new HttpError("Could not login check your credentials and try again", 500)
    );
  }

  //validating the password
  try {
    isPasswordValid = await bcrypt.compare(password, loginAdmin.password);
  } catch (error) {
    printMessage("error when try to compare password", error);
    return next(
      new HttpError("Could not login check your credentials and try again", 500)
    );
  }

  //is password valid
  if (!isPasswordValid) {
    return next(
      new HttpError("Invalid password check your password and try again", 401)
    );
  }

  //creating  the token
  try {
    token = jwt.sign(
      { adminID: loginAdmin._id, email: loginAdmin.email },
      "SUPERSECRET_DONT_SHARE_ADMIN",
      { expiresIn: "1h" }
    );
  } catch (error) {
    printMessage("error when try to create json web token", error);
    return next(
      new HttpError("Could not login check your credentials and try again", 500)
    );
  }

  res.status(200).json({ message: "successfully login", token });
};

exports.adminSingup = async (req, res, next) => {
  //INI VAR
  let resultOfSave, isEmailUnique, hashPassowrd, token;

  //VALIDATION
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    let errorMessage = validationRes.errors[0].msg;
    printMessage("Error occur in validation ", errorMessage);
    return next(new HttpError(errorMessage, 422));
  }

  //extracting data from body
  const { email, password } = req.body;

  //! now first checking email is unique or not
  try {
    isEmailUnique = await Admin.findOne({ email: email });
  } catch (error) {
    printMessage(
      "error when try to check is email already exsit or not",
      error
    );
    return next(
      new HttpError(
        "Could not singup check your credentials and try again",
        500
      )
    );
  }

  //if we already have  a user with this email
  if (isEmailUnique) {
    return next(
      new HttpError(
        "Sorry email is already used Try login or singup with different email",
        500
      )
    );
  }

  //hasing the password
  try {
    hashPassowrd = await bcrypt.hash(password, 12);
  } catch (error) {
    printMessage("Error when try to hash password", error);
    return next(
      new HttpError(
        "Could not singup check your credentials and try again",
        500
      )
    );
  }

  //creating the new admin
  const newAdmin = new Admin({ email, password: hashPassowrd });

  //Now saving into data base
  try {
    resultOfSave = await newAdmin.save();
  } catch (error) {
    printMessage("error occur when try to create new user", error);
    return next(
      new HttpError(
        "Could not singup check your credentials and try again",
        500
      )
    );
  }

  //!now creating json web token
  try {
    token = jwt.sign(
      { adminID: resultOfSave._id, email: resultOfSave.email },
      "SUPERSECRET_DONT_SHARE_ADMIN",
      { expiresIn: "1h" }
    );
  } catch (error) {
    printMessage("error when try to create json web token ", error);
    return next(
      new HttpError(
        "Could not singup please check your credentials and try again",
        500
      )
    );
  }

  printMessage("result of save new user", resultOfSave);
  res.status(200).json({
    message: "Created new admin Successfully",
    token,
  });
};
