const router = require("express").Router();
const userController = require("./controllers/userController");
const pinController = require("./controllers/pinController");
const transferController = require("./controllers/transferController");
const { checkAuth } = require("./middleware/checkAdminAuth");
const BankModel = require("../src/models/Bank");

router.post("/otp_verification", userController.otpVerification);
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/new_password", userController.updateUserPassword);

router.post("/pin", checkAuth, pinController.createUserPin);
router.put("/new_pin", checkAuth, pinController.updateUserPin);

router.post("/transactions", checkAuth, transferController.createTransaction);
router.get(
  "/transactions/:transaction_id",
  checkAuth,
  transferController.getTransactionById
);

router.get(
  "/myTransaction",
  checkAuth,
  transferController.getTransactionByUserId
);

router.get("/receipent", transferController.getTargetName);

router.get("/bank", transferController.getAllBank);

module.exports = router;
