const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bankSchema = new Schema({
  _id: String,
  name: String,
  countryId: String,
});

module.exports = mongoose.model("Bank", bankSchema);
