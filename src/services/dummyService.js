const TargetModel = require("../models/Target");
const BankModel = require("../models/Bank");
const CountryModel = require("../models/Country");

exports.createTarget = async (user) => {
  return await TargetModel.create(user);
};

exports.createBank = async (bank) => {
  return await BankModel.create(bank);
};

exports.createCountry = async (cn) => {
  return await CountryModel.create(cn);
};
