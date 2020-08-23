const mongoose = require("mongoose");
const emailUniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
});

mongoose.plugin(emailUniqueValidator);

module.exports = mongoose.model("User", userSchema);
