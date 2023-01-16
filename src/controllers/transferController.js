const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker");

const TransactionService = require("../services/transactionService");
const TransactionView = require("../views/TransactionView");

const asyncWrapper = require("../middleware/asycnWrapper");

exports.createTransaction = async (req, res) => {
  const { nominal, bank_code, no_rekening, pin } = req.body;
  const user = req.user;

  const bank = TransactionService.findBankByCode(bank_code);
  const target = await TransactionService.findTargetByNorek(no_rekening);
  const cPin = await TransactionService.checkUserPin(pin, user.userId);

  if (!nominal) {
    return res.status(400).json({ message: "nominal required" });
  }

  if (!bank) {
    return res.status(404).json({ message: "bank not found" });
  }

  if (!target || target.bank_id !== bank._id) {
    return res.status(404).json({ message: "no_rekening wrong" });
  }

  if (!cPin) {
    return res.status(404).json({ message: "pin wrong", cPin, user });
  }

  const vr_account = faker.phone.number("####-####-####-####-###");

  const transaction = {
    _id: uuidv4(),
    user_id: user.userId,
    bank_id: bank._id,
    target_id: target._id,
    nominal,
    vr_account,
  };

  const data = await TransactionService.createTransaction(transaction);
  return res.status(200).json({
    status: "ok",
    message: "transaction created",
    data: { transaction_id: data._id },
  });
};

exports.getTransactionById = asyncWrapper(async (req, res) => {
  const { transaction_id } = req.params;

  const transaction = await TransactionService.getTransactionById(
    transaction_id
  );

  if (!transaction_id || !transaction) {
    return res.status(404).json({ message: "transaction not found" });
  }

  const trasactionView = await TransactionView.transactionViewOnce(transaction);

  return res.status(200).json({
    ...trasactionView,
  });
});
