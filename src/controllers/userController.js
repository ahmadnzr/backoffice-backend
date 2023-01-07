const { v4: uuidv4 } = require("uuid");

const userService = require("../services/userService");
const asyncWrapper = require("../middleware/asycnWrapper");

const OTP_CODE = process.env.OTP_CODE;

exports.otpVerification = asyncWrapper((req, res) => {
  const { otp_code } = req.body;

  if (!otp_code || otp_code != parseInt(OTP_CODE)) {
    return res.status(400).json({
      status: "failed",
      message: "otp verification error!",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "otp verification success!",
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

exports.loginUser = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.loginUser(email, password);

  if (!user) {
    return res.status(400).json({
      status: "failed to login",
      message: "username or password invalid",
    });
  }

  const fullname = user.name.first + " " + user.name.last;

  return res.json({
    token: "randomToken2023",
    user: { id: user._id, email: user.email, fullname },
  });
});

exports.updateUserPassword = asyncWrapper(async (req, res) => {
  const { password } = req.body;
  const { userid } = req.headers;

  const user = await userService.getUserById(userid);

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  if (!password) {
    return res.status(404).json({
      message: "new password required",
    });
  }

  await userService.updateUserPassword(password, userid);
  return res.status(200).json({
    status: "succes",
    message: "password updated!",
  });
});
