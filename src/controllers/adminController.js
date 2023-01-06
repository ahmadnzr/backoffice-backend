const { v4: uuidv4 } = require("uuid");

const asyncWrapper = require("../middleware/asycnWrapper");
const adminService = require("../services/adminService");
const userService = require("../services/userService");
const { createRandomUser } = require("../utils/createDataDummy");
const { createUsersView, createUserDetailView } = require("../views/UserView");

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

exports.createUser = asyncWrapper(async (req, res) => {
  const {
    email,
    doc_type,
    doc_number,
    firstname,
    lastname,
    birth_place,
    birth_date,
    address,
    sex,
    password,
    phone_number,
  } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "field required!",
    });
  }

  const existUser = await userService.getUserByEmail(email);
  if (existUser) {
    return res.status(400).json({
      message: "email already registered!",
    });
  }

  const user = {
    _id: uuidv4(),
    email,
    doc_type: doc_type.toLowerCase(),
    doc_number,
    name: { first: firstname, last: lastname },
    birth_place,
    birth_date,
    sex: sex.toLowerCase(),
    password,
    address,
    phone_number: { code: "ID", value: phone_number },
  };

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

exports.getUserById = asyncWrapper(async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId);

  if (!userId || !user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  const usersView = createUserDetailView(user);

  return res.status(200).json({ user: usersView });
});

exports.deleteByUserId = asyncWrapper(async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId);

  if (!userId || !user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  await userService.deleteByUserId(userId);

  return res.status(200).json({
    message: "user deleted!",
  });
});

exports.updateByUserId = asyncWrapper(async (req, res) => {
  const { userId } = req.params;
  const {
    email,
    doc_type,
    doc_number,
    firstname,
    lastname,
    birth_place,
    birth_date,
    address,
    sex,
    password,
    phone_number,
  } = req.body;

  const user = await userService.getUserById(userId);

  if (!userId || !user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "field required!",
    });
  }

  const existUser = await userService.getUserByEmail(email);
  if (existUser._id !== userId) {
    return res.status(400).json({
      message: "email already registered!",
    });
  }

  const updatedUser = {
    email,
    doc_type: doc_type.toLowerCase(),
    doc_number,
    name: { first: firstname, last: lastname },
    birth_place,
    birth_date,
    sex: sex.toLowerCase(),
    password,
    address,
    phone_number: { code: "ID", value: phone_number },
  };
  await userService.updateByUserId(updatedUser, userId);

  return res.status(200).json({
    message: "user updated!",
  });
});
