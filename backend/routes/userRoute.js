const express = require("express");
const { check } = require("express-validator");
//local import
const userController = require("../controllers/userController");
//start
const route = express.Router();

route.post(
  "/login",
  [
    check("email").not().isEmpty().withMessage("Email is required"),
    check("password").not().isEmpty().withMessage("password is required"),
  ],
  userController.userLogin
);
route.post(
  "/singup",
  [
    check("firstname").not().isEmpty().withMessage("first name is required"),
    check("lastname").not().isEmpty().withMessage("last name is required"),
    check("email").not().isEmpty().withMessage("Email is required"),
    check("password").not().isEmpty().withMessage("password is required"),
    check("phone").not().isEmpty().withMessage("phone is required"),
    check("gender").not().isEmpty().withMessage("gender is required"),
  ],
  userController.userSingup
);

module.exports = route;
