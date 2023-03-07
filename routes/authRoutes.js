const {
  registerController,
  loginController,
  verifyAccountController,
} = require("../controllers/authController");

const router = require("express").Router();

// register user
router.post("/register", registerController);

// login user
router.post("/login", loginController);

// verify account
router.patch("/verify-account/:id", verifyAccountController);

module.exports = router;
