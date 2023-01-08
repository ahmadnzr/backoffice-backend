const router = require("express").Router();
const adminController = require("./controllers/adminController");
const { checkAdminAuth } = require("./middleware/checkAdminAuth");

/** admin backoffice routes  */

router.post("/login", adminController.loginAdmin);
router.get("/profile", checkAdminAuth, adminController.loggedUser);

router.post(
  "/createRandomUser",
  checkAdminAuth,
  adminController.createRandomUser
);
router.get("/users", checkAdminAuth, adminController.getAllUser);
router.post("/users", checkAdminAuth, adminController.createUser);
router.get("/users/:userId", checkAdminAuth, adminController.getUserById);
router.delete("/users/:userId", checkAdminAuth, adminController.deleteByUserId);
router.put("/users/:userId", checkAdminAuth, adminController.updateByUserId);

module.exports = router;
