const router = require("express").Router();
const { getUserController } = require("../controllers/userController");
const checkAuth = require("../middlewares/authMiddleware");

router.get("/single-user", checkAuth, getUserController);

module.exports = router;
