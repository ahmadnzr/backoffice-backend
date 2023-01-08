const { v4: uuidv4 } = require("uuid");

const userService = require("../services/userService");
const pinService = require("../services/pinService");
const asyncWrapper = require("../middleware/asycnWrapper");
const { verifyToken } = require("../middleware/checkAdminAuth");

exports.createUserPin = asyncWrapper(async (req, res) => {
  const { pin } = req.body;
  const { authorization } = req.headers;

  const user = verifyToken(authorization);

  if (!user || !pin) {
    return res.status(400).json({
      status: "failed",
      message: "invalid userId or pin",
    });
  }

  const alreadyHavePin = await pinService.findPinWithUserId(user.userId);
  if (alreadyHavePin) {
    return res.status(201).json({
      status: "failed",
      message: "user already have pin!",
    });
  }

  const userPin = {
    _id: uuidv4(),
    pin: parseInt(pin),
    userId: user.userId,
  };

  await pinService.createUserPin(userPin);

  return res.status(201).json({
    status: "success",
    message: "pin created!",
  });
});

exports.updateUserPin = asyncWrapper(async (req, res) => {
  const { pin } = req.body;
  const { authorization } = req.headers;

  const user = verifyToken(authorization);

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

  await pinService.updateUserPin(pin, user.userId);
  return res.status(200).json({
    status: "success",
    message: "pin updated!",
  });
});
