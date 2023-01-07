const router = require("express").Router();
const userController = require("./controllers/userController");
const pinController = require("./controllers/pinController");

router.post("/otp_verification", userController.otpVerification);
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

router.post("/pin", pinController.createUserPin);

module.exports = router;
