const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

//local import
const printMessage = require("../util/printMessage");
const HttpError = require("../util/HttpErrorModel");
const User = require("../models/userModel");

//START
exports.userLogin = async (req, res, next) => {
  //VAR INI
  let loginUser, isValidPassword, token;
  const { email, password } = req.body;

  const validationRes = validationResult(req);

  if (!validationRes.isEmpty()) {
    let errorMessage = validationRes.errors[0].msg;
    printMessage("Error occur in validation ", errorMessage);
    return next(new HttpError(errorMessage, 422));
  }

  //finding user by email
  try {
    loginUser = await User.findOne({ email: email });
  } catch (error) {
    printMessage("error when try find user by email login", error);
    return next(
      new HttpError("Could not login check your credentials and try again", 500)
    );
  }

  //if we dont find any user
  printMessage("what are we getting in the loginUser ", loginUser);
  if (!loginUser) {
    return next(
      new HttpError(
        "Could not login please check your credentials and try again ",
        500
      )
    );
  }

  //comparing the password
  try {
    isValidPassword = await bcrypt.compare(password, loginUser.password);
  } catch (error) {
    printMessage("error when try to compare password", error);
    return next(
      new HttpError(
        "Could not login please check your credentials and try again",
        500
      )
    );
  }

  //checking password comparing result
  if (!isValidPassword) {
    return next(
      new HttpError("Invalid password check your password and try again", 401)
    );
  }

  //!now creating json web token
  try {
    token = jwt.sign(
      { userID: loginUser._id, email: loginUser.email },
      "SUPERSECRET_DONT_SHARE",
      { expiresIn: "1h" }
    );
  } catch (error) {
    printMessage("error when try to create json web token ", error);
    return next(
      new HttpError(
        "Could not login please check your credentials and try again",
        500
      )
    );
  }

  res.status(200).json({ message: "successfully login", token });
};

exports.userSingup = async (req, res, next) => {
  //VAR init;
  let resultOfSave, isEmailUnique, hashPassowrd, token;

  const { firstname, lastname, email, password, phone, gender } = req.body;
  const validationRes = validationResult(req);

  //validation of fileds
  if (!validationRes.isEmpty()) {
    let errorMessage = validationRes.errors[0].msg;
    printMessage("Error occur in validation ", errorMessage);
    return next(new HttpError(errorMessage, 422));
  }

  //! now first checking email is unique or not
  try {
    isEmailUnique = await User.findOne({ email: email });
  } catch (error) {
    printMessage(
      "error when try to check is email already exsit or not",
      error
    );
    return next(new HttpError("Error when try to check is email uniqe", 500));
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

  //creating the new user
  const tempUser = new User({
    firstname,
    lastname,
    email,
    password: hashPassowrd,
    phone,
    gender,
  });

  //Now saving into data base
  try {
    resultOfSave = await tempUser.save();
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
      { userID: resultOfSave._id, email: resultOfSave.email },
      "SUPERSECRET_DONT_SHARE",
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
    message: "Created new user Successfully",
    token,
  });
};
