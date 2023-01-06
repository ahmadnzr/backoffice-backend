const router = require("express").Router();
const adminController = require("./controllers/adminController");

/** admin backoffice router  */

router.post("/login", adminController.loginAdmin);

router.post("/createRandomUser", adminController.createRandomUser);
router.get("/users", adminController.getAllUser);
router.post("/users", adminController.createUser);
router.get("/users/:userId", adminController.getUserById);
router.delete("/users/:userId", adminController.deleteByUserId);
router.put("/users/:userId", adminController.updateByUserId);

module.exports = router;
