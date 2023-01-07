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
