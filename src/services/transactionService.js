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
  return TargetModel.findById(id);
};
