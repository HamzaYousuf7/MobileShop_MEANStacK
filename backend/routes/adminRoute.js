const express = require("express");
const { check } = require("express-validator");

//local imp
const adminController = require("../controllers/adminController");

//!start
const route = express.Router();

route.post(
  "/login",
  [
    check("email").not().isEmpty().withMessage("email is required"),
    check("password").not().isEmpty().withMessage("password is required"),
  ],
  adminController.adminLogin
);
route.post(
  "/singup",
  [
    check("email").not().isEmpty().withMessage("email is required"),
    check("password").not().isEmpty().withMessage("password is required"),
  ],
  adminController.adminSingup
);

module.exports = route;
