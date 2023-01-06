const router = require("express").Router();
const userController = require("./controllers/userController");

/** admin backoffice router  */

// auth
// router.post('/login')
// router.post('')
router.get("/users", userController.getAllUser);
router.get("/randomUser", userController.createUser);

module.exports = router;
