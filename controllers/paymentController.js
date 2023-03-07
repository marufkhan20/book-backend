const PaymentMethod = require("../models/PaymentMethod");

const getPaymentMethodController = async (req, res) => {
  try {
    const { _id } = req.user || {};
    const paymentMethod = await PaymentMethod.findOne({ user: _id });
    res.status(200).json(paymentMethod);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "server error occurred",
    });
  }
};

const updatePaymentMethodController = async (req, res) => {
  try {
    const { _id } = req.user || {};

    const paymentMethod = await PaymentMethod.findOne({ user: _id });

    if (paymentMethod?._id) {
      const updatePaymentMethod = await PaymentMethod.findByIdAndUpdate(
        paymentMethod?._id,
        { $set: req.body },
        { new: true }
      );

      return res.status(200).json(updatePaymentMethod);
    }

    const newPaymentMethod = new PaymentMethod({ user: _id, ...req.body });
    await newPaymentMethod.save();
    res.status(200).json(newPaymentMethod);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "server error occurred",
    });
  }
};

module.exports = {
  getPaymentMethodController,
  updatePaymentMethodController,
};
