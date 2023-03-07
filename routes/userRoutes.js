const router = require("express").Router();
const {
  getUserController,
  getAllUsersController,
} = require("../controllers/userController");
const checkAuth = require("../middlewares/authMiddleware");
const checkAdminAuth = require("../middlewares/adminAuthMiddleware");

// get all users
router.get("/", checkAdminAuth, getAllUsersController);

// get single user
router.get("/single-user", checkAuth, getUserController);

module.exports = router;
