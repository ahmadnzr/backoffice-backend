const UserModel = require("../models/User");

exports.getAllUser = async () => {
  return await UserModel.find();
};

exports.createUser = async (user) => {
  return await UserModel.create(user);
};
