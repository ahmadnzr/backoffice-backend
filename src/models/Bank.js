const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bankSchema = new Schema({
  _id: String,
  name: String,
  code: String,
  country_id: String,
});

module.exports = mongoose.model("Bank", bankSchema);
