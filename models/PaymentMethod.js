const { Schema, model } = require("mongoose");

const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cardNumber: String,
    cvcCode: String,
    expireDate: String,
    zipCode: String,
  },
  { timestamps: true }
);

const PaymentMethod = model("PaymentMethod", paymentSchema);

module.exports = PaymentMethod;
