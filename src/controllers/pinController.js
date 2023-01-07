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

exports.updateUserPin = asyncWrapper(async (req, res) => {
  const { pin } = req.body;
  const { userid } = req.headers;

  const user = await userService.getUserById(userid);

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  if (!pin) {
    return res.status(404).json({
      message: "new pin required",
    });
  }

  await pinService.updateUserPin(pin, userid);
  return res.status(200).json({
    status: "success",
    message: "pin updated!",
  });
});
