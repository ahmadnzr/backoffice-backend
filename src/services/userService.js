const UserModel = require("../models/User");

exports.getAllUser = async () => {
  return await UserModel.find().sort({ created_at: "desc" });
};

exports.createUser = async (user) => {
  return await UserModel.create(user);
};

exports.getUserById = async (userId) => {
  return await UserModel.findById(userId);
};

exports.deleteByUserId = async (userId) => {
  return await UserModel.deleteOne({ _id: userId });
};
