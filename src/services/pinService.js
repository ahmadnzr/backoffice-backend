const PinModel = require("../models/Pin");

exports.createUserPin = async (pin) => {
  return await PinModel.create(pin);
};

exports.findPinWithUserId = async (userId) => {
  return await PinModel.findOne({ userId });
};

exports.updateUserPin = async (pin, userId) => {
  return await PinModel.updateOne({ userId }, { pin: parseInt(pin) });
};
