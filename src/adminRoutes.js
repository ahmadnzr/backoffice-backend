const router = require("express").Router();
const adminController = require("./controllers/adminController");

/** admin backoffice router  */

router.post("/login", adminController.loginAdmin);

module.exports = router;
