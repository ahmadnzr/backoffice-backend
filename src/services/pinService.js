const PinModel = require("../models/Pin");

exports.createUserPin = async (pin) => {
  return await PinModel.create(pin);
};

exports.findPinWithUserId = async (userId) => {
  return await PinModel.findOne({ userId });
};
