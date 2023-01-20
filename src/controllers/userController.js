const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const dayjs = require("dayjs");

const userService = require("../services/userService");
const pinService = require("../services/pinService");
const asyncWrapper = require("../middleware/asycnWrapper");
const { verifyToken } = require("../middleware/checkAdminAuth");

const OTP_CODE = process.env.OTP_CODE;
const TOKEN_AGE = 60 * 60 * 24 * 5; // 5 day

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

  if (sex.toLowerCase() != "male" && sex.toLowerCase() != "female") {
    return res.status(400).json({
      message: "gender must be 'male' or 'female'",
      sex: sex == "male",
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

exports.loginUser = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.loginUser(email, password);

  if (!user) {
    return res.status(400).json({
      status: "failed to login",
      message: "email or password invalid",
    });
  }

  if (user.is_disabled === true) {
    return res.status(400).json({
      status: "failed to login",
      message: "user blocked, please contact admin",
    });
  }

  const userPin = await pinService.findPinWithUserId(user._id);

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: TOKEN_AGE,
  });

  const fullname = user.firstname + " " + user.lastname;

  return res.json({
    accessToken: token,
    expiresIn: TOKEN_AGE,
    user: {
      id: user._id,
      email: user.email,
      fullname,
      userPin: userPin ? true : false,
    },
  });
});

exports.updateUserPassword = asyncWrapper(async (req, res) => {
  const { password, email } = req.body;

  const findUser = await userService.getUserByEmail(email);

  if (!findUser) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  if (!password) {
    return res.status(404).json({
      message: "new password required",
    });
  }

  const updated = await userService.updateUserPassword(password, findUser._id);
  return res.status(200).json({
    status: "succes",
    message: "password updated!",
    updated,
  });
});
