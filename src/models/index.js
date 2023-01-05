const { UserModel } = require("./User");

const createCollection = async () => {
  await UserModel.createCollection();
};

module.exports = { createCollection };
