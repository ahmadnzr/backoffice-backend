const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: String,
  email: String,
  doc_type: String,
  doc_number: Number,
  firstname: String,
  lastname: String,
  birth_place: String,
  birth_date: String,
  address: String,
  sex: String,
  password: String,
  phone_number: String,
  verified_email: { type: Boolean, default: false },
  created_at: { type: Date, default: new Date() },
});

module.exports = mongoose.model("User", userSchema);
