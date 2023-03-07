const router = require("express").Router();
const checkAuth = require("../middlewares/authMiddleware");
const {
  updatePaymentMethodController,
  getPaymentMethodController,
} = require("../controllers/paymentController");

// get single payment method
router.get("/single-payment", checkAuth, getPaymentMethodController);

// add or update payment method
router.post("/", checkAuth, updatePaymentMethodController);

module.exports = router;
