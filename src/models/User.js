const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: String,
  email: String,
  doc_type: String,
  doc_number: Number,
  name: {
    first: String,
    last: String,
  },
  birth_place: String,
  birth_date: Number,
  address: String,
  sex: String,
  password: String,
  phone_number: { code: String, value: Number },
  verified_email: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
