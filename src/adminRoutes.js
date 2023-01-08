const router = require("express").Router();
const adminController = require("./controllers/adminController");
const { checkAuth } = require("./middleware/checkAdminAuth");

/** admin backoffice routes  */

router.post("/login", adminController.loginAdmin);

router.post("/createRandomUser", checkAuth, adminController.createRandomUser);
router.get("/users", checkAuth, adminController.getAllUser);
router.post("/users", checkAuth, adminController.createUser);
router.get("/users/:userId", checkAuth, adminController.getUserById);
router.delete("/users/:userId", checkAuth, adminController.deleteByUserId);
router.put("/users/:userId", checkAuth, adminController.updateByUserId);

module.exports = router;
