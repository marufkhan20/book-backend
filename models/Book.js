const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: String,
    price: Number,
    stock: Number,
    bookImage: String,
    category: String,
    description: String,
    featured: Boolean,
    orders: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);

const Book = model("Book", bookSchema);

module.exports = Book;
