const dayjs = require("dayjs");
const TransactionService = require("../services/transactionService");
const UserService = require("../services/userService");

exports.transactionViewOnce = async (transaction) => {
  const {
    _id,
    user_id,
    bank_id,
    target_id,
    nominal,
    type,
    admin_fee,
    status,
    vr_account,
    created_at,
    updated_at,
  } = transaction;

  const target = await TransactionService.findTargetById(target_id);
  const bank = await TransactionService.findBankById(bank_id);

  return {
    id: _id,
    receipent_name: target.name,
    bank: bank.name,
    type_currency: "IDR to IDR",
    type_transaction: type,
    receipent_norek: target.norek,
    virtual_account: vr_account,
    total: parseInt(nominal) + parseInt(admin_fee),
    nominal,
    status,
    admin_fee,
    transaction_date: dayjs(created_at).format("DD MMMM YYYY HH:mm:ss"),
  };
};