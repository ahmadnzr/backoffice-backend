const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const asyncWrapper = require("../middleware/asycnWrapper");
const adminService = require("../services/adminService");
const userService = require("../services/userService");
const dummyService = require("../services/dummyService");

const { createRandomUser } = require("../utils/createDataDummy");
const { createUsersView, createUserDetailView } = require("../views/UserView");

const TOKEN_AGE = 60 * 60 * 24 * 5; // 5 day

exports.loginAdmin = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;

  const admin = await adminService.loginAdmin(username, password);

  if (!admin) {
    return res.status(403).json({
      status: "failed to login",
      message: "username or password invalid",
    });
  }

  const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: TOKEN_AGE,
  });

  return res.json({
    accessToken: token,
    expiresIn: TOKEN_AGE,
    user: { id: admin._id, username: admin.username, fullname: admin.fullname },
  });
});

exports.createRandomUser = asyncWrapper(async (req, res) => {
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
    async (i) => {
      const user = createRandomUser();
      await userService.createUser(user);
    }
  );

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

  const existEmail = await userService.getUserByEmail(email);
  const existPhone = await userService.getUserByPhone(phone_number);

  if (existEmail) {
    return res.status(400).json({
      message: "email already registered!",
    });
  }

  if (existPhone) {
    return res.status(400).json({
      message: "phone already registered!",
    });
  }

  const user = {
    _id: uuidv4(),
    email,
    doc_type: doc_type.toLowerCase(),
    doc_number,
    firstname,
    lastname,
    birth_place,
    birth_date,
    sex: sex.toLowerCase(),
    password,
    address,
    phone_number,
  };

  await userService.createUser(user);

  return res.status(201).json({
    message: "user created!",
  });
});

exports.getAllUser = asyncWrapper(async (req, res) => {
  const { search } = req.query;

  if (search) {
    const users = await userService.getUserByName(search);
    const usersView = users.map((user) => createUsersView(user));
    return res.status(200).json({ users: usersView });
  }

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

  const existEmail = await userService.getUserByEmail(email);
  const existPhone = await userService.getUserByPhone(phone_number);

  if (existEmail) {
    return res.status(400).json({
      message: "email already registered!",
    });
  }

  if (existPhone) {
    return res.status(400).json({
      message: "phone already registered!",
    });
  }

  const updatedUser = {
    _id: uuidv4(),
    email,
    doc_type: doc_type.toLowerCase(),
    doc_number,
    firstname,
    lastname,
    birth_place,
    birth_date,
    sex: sex.toLowerCase(),
    password,
    address,
    phone_number,
  };

  await userService.updateByUserId(updatedUser, userId);

  return res.status(200).json({
    message: "user updated!",
  });
});

// dummy data
exports.createBank = asyncWrapper(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "bank name required" });
  }
  const bank = {
    _id: uuidv4(),
    country_id: "22680b2c-9d29-466d-bfd6-09c42a2aaddc",
    name,
  };

  await dummyService.createBank(bank);
  return res.status(201).json({ message: "bank created" });
});

exports.createCountry = asyncWrapper(async (req, res) => {
  const { name, code } = req.body;
  if (!name || !code) {
    return res.status(400).json({ message: "country name and code required" });
  }

  await dummyService.createCountry({ _id: uuidv4(), name, code });
  return res.status(201).json({ message: "country created" });
});

exports.createTarget = asyncWrapper(async (req, res) => {
  const { name, norek, bank_id } = req.body;

  if (!name || !norek || !bank_id) {
    return res.status(400).json({ message: "required field" });
  }

  const target = {
    _id: uuidv4(),
    name,
    norek,
    bank_id,
  };
  await dummyService.createTarget(target);
  return res.status(201).json({ message: "target created" });
});
