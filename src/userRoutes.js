const router = require("express").Router();
const userController = require("./controllers/userController");

router.post("/otp_verification", userController.otpVerification);

module.exports = router;
