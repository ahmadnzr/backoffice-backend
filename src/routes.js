const router = require("express").Router();
const userController = require("./controllers/userController");

// user router
router.get("/users", userController.getAllUser);
router.get("/randomUser", userController.createRandomUser);

module.exports = router;
