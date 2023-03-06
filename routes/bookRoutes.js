const router = require("express").Router();
const {
  getAllBooksController,
  createNewBookController,
  updateBookController,
  deleteBookController,
  getBookController,
} = require("../controllers/bookController");
const checkAdminAuth = require("../middlewares/adminAuthMiddleware");

// get all books
router.get("/", getAllBooksController);

// get all books
router.get("/:id", getBookController);

// create a new book
router.post("/", checkAdminAuth, createNewBookController);

// udpate the book
router.patch("/:id", checkAdminAuth, updateBookController);

// delete the book
router.delete("/:id", checkAdminAuth, deleteBookController);

module.exports = router;
