const Book = require("../models/Book");
const Jimp = require("jimp");
const path = require("path");

// get all books controller
const getAllBooksController = async (req, res) => {
  try {
    const books = await Book.find().sort({ updatedAt: -1 });
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// get book controller
const getBookController = async (req, res) => {
  try {
    const { id } = req.params || {};

    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// create new Book controller
const createNewBookController = async (req, res) => {
  try {
    const { title, price, stock, bookImage, category, description, featured } =
      req.body || {};

    // upload book image
    let imagePath;

    if (bookImage) {
      // upload image
      const buffer = Buffer.from(
        bookImage?.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, ""),
        "base64"
      );

      imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

      try {
        const jimpResp = await Jimp.read(buffer);
        jimpResp.write(
          path.resolve(__dirname, `../public/storage/books/${imagePath}`)
        );
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          error: "Could not process the image!!",
        });
      }
    }

    const newBook = new Book({
      title,
      price,
      stock,
      bookImage: `/storage/books/${imagePath}`,
      category,
      description,
      featured,
    });
    await newBook.save();
    res.status(200).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// delete Book controller
const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params || {};

    const deletedBook = await Book.findByIdAndDelete(id);
    res.status(200).json(deletedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// update Book controller
const updateBookController = async (req, res) => {
  try {
    const { id } = req.params || {};

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

module.exports = {
  getAllBooksController,
  getBookController,
  createNewBookController,
  deleteBookController,
  updateBookController,
};
