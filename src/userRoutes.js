const router = require("express").Router();
const userController = require("./controllers/userController");
const pinController = require("./controllers/pinController");
const { checkAuth } = require("./middleware/checkAdminAuth");

router.post("/otp_verification", userController.otpVerification);
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/new_password", checkAuth, userController.updateUserPassword);

router.post("/pin", checkAuth, pinController.createUserPin);
router.post("/new_pin", checkAuth, pinController.updateUserPin);

module.exports = router;
