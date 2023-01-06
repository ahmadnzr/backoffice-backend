const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  _id: String,
  username: String,
  password: String,
  fullname: String,
});

module.exports = mongoose.model("Admin", adminSchema);
