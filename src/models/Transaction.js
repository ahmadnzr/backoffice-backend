const dayjs = require("dayjs");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  _id: String,
  user_id: String,
  bank_id: String,
  target_id: String,
  nominal: Number,
  type: { type: String, default: "Lokal" },
  admin_fee: { type: Number, default: 5000 },
  status: { type: String, default: "In Progress" },
  vr_account: String,
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
  expired_at: { type: Date, default: dayjs().add(1, "day") },
});

module.exports = mongoose.model("Transaction", transactionSchema);
