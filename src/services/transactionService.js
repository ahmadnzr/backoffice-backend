const TransactionModel = require("../models/Transaction");

exports.createTransaction = async (transfer) => {
  return await TransactionModel.create(transfer);
};
