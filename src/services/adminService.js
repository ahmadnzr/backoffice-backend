const AdminModel = require("../models/Admin");

exports.createAdmin = async (admin) => {
  return await AdminModel.create(admin);
};

exports.loginAdmin = async (username, password) => {
  const admin = await AdminModel.findOne({ username, password });

  return admin;
};
