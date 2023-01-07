const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pinSchema = new Schema({
  _id: String,
  pin: Number,
  userId: String,
});

module.exports = mongoose.model("Pin", pinSchema);
