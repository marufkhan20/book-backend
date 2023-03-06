const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    books: {
      type: Object,
    },
    totalPrice: Number,
    totalQty: Number,
    status: {
      type: String,
      default: "pending",
    },
    orderDate: Number,
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = Order;
