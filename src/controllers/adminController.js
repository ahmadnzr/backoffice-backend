const asyncWrapper = require("../middleware/asycnWrapper");
const adminService = require("../services/adminService");
const userService = require("../services/userService");
const { createRandomUser } = require("../utils/createDataDummy");
const createUsersView = require("../views/UserView");

exports.loginAdmin = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;

  const admin = await adminService.loginAdmin(username, password);

  if (!admin) {
    return res.status(400).json({
      status: "failed to login",
      message: "username or password invalid",
    });
  }

  return res.json({
    token: "randomToken2022",
    user: { id: admin._id, username: admin.username, fullname: admin.fullname },
  });
});

exports.createRandomUser = asyncWrapper(async (req, res) => {
  const user = createRandomUser();
  await userService.createUser(user);

  return res.status(201).json({
    message: "user created!",
  });
});

exports.getAllUser = asyncWrapper(async (req, res) => {
  const users = await userService.getAllUser();
  const usersView = users.map((user) => createUsersView(user));

  return res.status(200).json({ users: usersView });
});
