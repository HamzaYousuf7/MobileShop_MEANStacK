const jwt = require("jsonwebtoken");

const HttpError = require("../util/HttpErrorModel");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed! please login in");
    }
    const decodedToken = jwt.verify(token, "SUPERSECRET_DONT_SHARE_ADMIN");
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed! please login in", 403);
    return next(error);
  }
};
