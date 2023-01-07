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

exports.updateByUserId = async (user, userId) => {
  return await UserModel.updateOne({ _id: userId }, user);
};

exports.getUserByEmail = async (email) => {
  return await UserModel.findOne({ email });
};

exports.loginUser = async (email, password) => {
  return await UserModel.findOne({ email, password });
};

exports.updateUserPassword = async (password, userId) => {
  return await UserModel.updateOne({ _id: userId }, { password });
};
