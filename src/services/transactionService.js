const TransactionModel = require("../models/Transaction");
const BankModel = require("../models/Bank");
const TargetModel = require("../models/Target");
const PinModel = require("../models/Pin");

exports.createTransaction = async (transfer) => {
  return await TransactionModel.create(transfer);
};

exports.getTransactionById = async (id) => {
  return await TransactionModel.findById(id);
};

exports.findBankByCode = async (code) => {
  return await BankModel.findOne({ code });
};

exports.findBankById = async (id) => {
  return await BankModel.findById(id);
};

exports.findTargetByNorek = async (norek) => {
  return await TargetModel.findOne({ norek: norek });
};

exports.checkUserPin = async (pin, userId) => {
  return await PinModel.findOne({
    pin: parseInt(pin),
    userId,
  });
};

exports.findTargetById = async (id) => {
  return await TargetModel.findById(id);
};

exports.getTransactionByUserId = async (id) => {
  return await TransactionModel.find({ user_id: id });
};

exports.getTargetBankAndNorek = async (bank_id, norek) => {
  return await TargetModel.findOne({ bank_id, norek });
};

exports.getAllTransaction = async () => {
  return await TransactionModel.find().sort({ created_at: "desc" });
};

exports.updateTransactionStatus = async (id, status) => {
  return await TransactionModel.findOneAndUpdate(
    { _id: id },
    { status, updated_at: new Date() }
  );
};

exports.getAllBank = async () => {
  return await BankModel.find();
};

exports.getTargetByBank = async (bank_id) => {
  return await TargetModel.find({ bank_id });
};
