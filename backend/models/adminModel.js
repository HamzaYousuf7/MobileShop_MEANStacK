const mongoose = require("mongoose");
const emailUniqueValidator = require("mongoose-unique-validator");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

mongoose.plugin(emailUniqueValidator);

module.exports = mongoose.model("Admin", adminSchema);
