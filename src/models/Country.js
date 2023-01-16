const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const countrySchema = new Schema({
  _id: String,
  name: String,
  code: String,
});

module.exports = mongoose.model("Country", countrySchema);
