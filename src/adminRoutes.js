const router = require("express").Router();
const adminController = require("./controllers/adminController");

/** admin backoffice router  */

router.post("/login", adminController.loginAdmin);
router.post("/createRandomUser", adminController.createRandomUser);
router.get("/users", adminController.getAllUser);

module.exports = router;
