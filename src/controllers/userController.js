const userService = require("../services/userService");
const adminService = require("../services/adminService");
const asyncWrapper = require("../middleware/asycnWrapper");
const {
  createRandomUser,
  createRandomAdmin,
} = require("../utils/createDataDummy");

exports.getAllUser = asyncWrapper(async (req, res) => {
  const users = await userService.getAllUser();
  return res.status(200).json({ data: users, message: "success" });
});

exports.createRandomUser = asyncWrapper(async (req, res) => {
  const user = createRandomUser();
  await userService.createUser(user);

  return res.status(201).json({
    message: "user created!",
  });
});

exports.createUser = asyncWrapper(async (req, res) => {
  const admin = createRandomAdmin();

  await adminService.createAdmin(admin);

  return res.json(admin);
});
