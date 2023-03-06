const {
  registerController,
  loginController,
} = require("../controllers/authController");

const router = require("express").Router();

// register user
router.post("/register", registerController);

// login user
router.post("/login", loginController);

module.exports = router;
