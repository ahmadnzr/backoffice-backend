const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const targetSchema = new Schema({
  _id: String,
  name: String,
  norek: String,
  bank_id: String,
});

module.exports = mongoose.model("Target", targetSchema);
