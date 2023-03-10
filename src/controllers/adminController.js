const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const asyncWrapper = require("../middleware/asycnWrapper");
const adminService = require("../services/adminService");
const userService = require("../services/userService");
const dummyService = require("../services/dummyService");
const transactionService = require("../services/transactionService");

const { createRandomUser } = require("../utils/createDataDummy");
const { createUsersView, createUserDetailView } = require("../views/UserView");
const TransactionView = require("../views/TransactionView");

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
  const usersView = users
    .filter((user) => user.is_disabled === false)
    .map((user) => createUsersView(user));

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

  return res.status(200).json({ ...usersView });
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
    message: "user disabled!",
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

  if (existEmail && userId != existEmail._id) {
    return res.status(400).json({
      message: "email already registered!",
      userId,
      // existEmail,
    });
  }

  if (existPhone && userId != existPhone._id) {
    return res.status(400).json({
      message: "phone already registered!",
      userId,
      // existPhone,
    });
  }

  const updatedUser = {
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

exports.getAllTransaction = asyncWrapper(async (req, res) => {
  const { from, to, nominalStart = 0, nominalEnd = 1000000 } = req.query;
  const start = dayjs
    .utc(from)
    .set("hour", 0)
    .set("minute", 0)
    .set("second", 0)
    .toISOString();
  const end = dayjs
    .utc(to)
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59)
    .toISOString();

  const transactions = await transactionService.getAllTransaction();

  if (from) {
    const transactions = await transactionService.getFilteredTransaction(
      start,
      end,
      nominalStart,
      nominalEnd
    );

    const transactionFormatted = await TransactionView.transactionViewAll(
      transactions,
      async (val) => {
        return TransactionView.transactionViewOnce(val);
      }
    );

    return res.status(200).json(transactionFormatted);
  }

  const transactionFormatted = await TransactionView.transactionViewAll(
    transactions,
    async (val) => {
      return TransactionView.transactionViewOnce(val);
    }
  );

  return res.status(200).json(transactionFormatted);
});

exports.updateTransactionStatus = asyncWrapper(async (req, res) => {
  const { status } = req.body;
  const { transaction_id } = req.params;

  if (!status) {
    return res
      .status(400)
      .json({ status: "failed", message: "status required" });
  }

  const transaction = await transactionService.updateTransactionStatus(
    transaction_id,
    status
  );

  if (!transaction) {
    return res
      .status(404)
      .json({ status: "failed", message: "transaction not found" });
  }

  return res
    .status(200)
    .json({ status: "success", message: "transaction updated" });
});

exports.getSummary = asyncWrapper(async (req, res) => {
  const users = await userService.getAllUser();
  const transactions = await transactionService.getAllTransaction();

  // const filteredUser = users.filter((user) => user.is_disabled === false);
  const user_male = users.filter(
    (user) => user.sex.toLowerCase() === "male"
  ).length;
  const user_female = users.filter(
    (user) => user.sex.toLowerCase() === "female"
  ).length;

  const what = users.filter(
    (user) =>
      user.sex.toLowerCase() !== "male" && user.sex.toLowerCase() !== "female"
  );

  const last_transactions = await transactionService.getAllTransaction();
  const transactionFormatted = await TransactionView.transactionViewAll(
    last_transactions.slice(0, 5),
    async (val) => {
      return TransactionView.transactionViewOnce(val);
    }
  );

  const TransactionThisYear = transactions.filter((transaction) => {
    const year = dayjs.utc(transaction.created_at).year();
    return year == dayjs.utc().year();
  });

  const transactionToday = transactions.filter((transaction) => {
    const date = dayjs.utc(transaction.created_at).date();
    return date == dayjs.utc().date();
  });

  const transactionThisWeek = transactions.filter((transaction) => {
    const date = dayjs.utc(transaction.created_at).date();
    const week = Math.floor((date - 1) / 7) + 1;
    return week == Math.floor((dayjs.utc().date() - 1) / 7) + 1;
  });

  const transactionThisMonth = transactions.filter((transaction) => {
    const month = dayjs.utc(transaction.created_at).month();
    return month == dayjs.utc().month();
  });

  // const perYear = [...new Set(year)];
  // const yearAverage = TransactionThisYear.length / 1;
  // const monthAverage = TransactionThisYear.length / 12;
  // const weekAverage = TransactionThisYear.length / 48;
  // const dayAverage = TransactionThisYear.length / 360;

  let date = dayjs.utc().startOf("year");
  let monthGroup = {};

  for (let i = 0; i < 12; i++) {
    monthGroup[date.format("MMMM")] = 0;
    date = date.add(1, "month");
  }

  const months = users.map((user) => dayjs(user.created_at).format("MMMM"));

  months.forEach((item) => {
    let month = item;
    if (!monthGroup[month]) {
      monthGroup[month] = 0;
    }

    monthGroup[month]++;
  });

  const applicationUsage = Object.keys(monthGroup).map((month) => {
    return { name: month, value: monthGroup[month] };
  });

  return res.status(200).json({
    applicationUsage,
    total_users: {
      total: users.length,
      male: user_male,
      female: user_female,
      what,
    },
    transactions_average: {
      perYear: TransactionThisYear.length,
      perMonth: transactionThisMonth.length,
      perDay: transactionToday.length,
      perWeek: transactionThisWeek.length,
    },
    last_transactions: transactionFormatted,
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
