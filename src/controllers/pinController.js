const { v4: uuidv4 } = require("uuid");

const userService = require("../services/userService");
const pinService = require("../services/pinService");
const asyncWrapper = require("../middleware/asycnWrapper");

exports.createUserPin = asyncWrapper(async (req, res) => {
  const { pin } = req.body;
  const { userid } = req.headers;

  const validUserId = await userService.getUserById(userid);
  if (!validUserId || !pin) {
    return res.status(400).json({
      status: "failed",
      message: "invalid userId or pin",
      userid,
    });
  }

  const alreadyHavePin = await pinService.findPinWithUserId(userid);
  if (alreadyHavePin) {
    return res.status(201).json({
      status: "failed",
      message: "user already have pin!",
    });
  }

  const userPin = {
    _id: uuidv4(),
    pin: parseInt(pin),
    userId: userid,
  };

  await pinService.createUserPin(userPin);

  return res.status(201).json({
    status: "success",
    message: "pin created!",
  });
});
