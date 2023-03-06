const router = require("express").Router();
const {
  createNewOrderController,
  getAllOrdersController,
  updateOrderStatusController,
  getAllOrdersByUserController,
} = require("../controllers/orderController");
const checkAuth = require("../middlewares/authMiddleware");
const checkAdminAuth = require("../middlewares/adminAuthMiddleware");

// get all orders
router.get("/", checkAdminAuth, getAllOrdersController);

router.get("/by-user", checkAuth, getAllOrdersByUserController);

// create new order
router.post("/", checkAuth, createNewOrderController);

// update order status
router.patch("/update-status/:id", checkAdminAuth, updateOrderStatusController);

module.exports = router;
