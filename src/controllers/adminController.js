const asyncWrapper = require("../middleware/asycnWrapper");
const adminService = require("../services/adminService");

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
