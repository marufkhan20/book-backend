const Order = require("../models/Order");
const User = require("../models/User");
const pdfMake = require("pdfmake");
const pdf = require("html-pdf");
const jsPDF = require("jspdf");
const PDFDocument = require("pdfkit");

const stripe = require("stripe")(
  "sk_test_51LRnDyH3L9RCLevZoGrUbNqVAl445o6nt2MVPw8bwOyvYbJbQV5AKDsQ2Hj4XEG2Mhz6aiYtMZpj8KryafbcZVue00ebStF5jd"
);

// get all order controller
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find().sort({ updatedAt: -1 }).populate("user");
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "server error occurred",
    });
  }
};

// get all orders by user controller
const getAllOrdersByUserController = async (req, res) => {
  try {
    const { _id } = req.user || {};
    const orders = await Order.find({ user: _id })
      .sort({ updatedAt: -1 })
      .populate("user");
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "server error occurred",
    });
  }
};

// create new order controller
const createNewOrderController = async (req, res) => {
  try {
    const { totalPrice, totalQty, books, stripeToken } = req.body || {};
    const { _id } = req.user || {};

    // create new order
    const newOrder = new Order({
      user: _id,
      totalPrice,
      totalQty,
      books,
      orderDate: Date.now(),
    });

    await newOrder.save();

    if (newOrder?._id && stripeToken) {
      // const payment = await stripe.paymentIntents.create({
      //   amount: Number(totalPrice) * 100,
      //   currency: "USD",
      //   description: "this is payment description",
      //   payment_method: stripeToken,
      //   confirm: true,
      // });

      // if (payment) {
      // update user data
      await User.findByIdAndUpdate(_id, { $set: req.body });

      res.status(201).json(newOrder);
      // }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      erro: "Server error occurred",
    });
  }
};

// udpate order status controller
const updateOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params || {};
    const { status } = req.body || {};

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// download order report controller
const downloadOrderReportController = async (req, res) => {
  try {
    const orders = await Order.find().sort({ updatedAt: -1 }).populate("user");

    console.log(orders);

    // Create the HTML content for the PDF
    const html = `
      <h1 style="text-align: center;">Order Reports</h1>
      
      ${orders?.map(
        (order) =>
          `<h1>Order #${order?._id}</h1>
          <p>Order Date: ${order?.orderDate}</p>
          <p>Customer Name: ${order?.user?.firstName} ${
            order?.user?.lastName
          }</p>
          <p>Total Price: $${order?.totalPrice}</p>
          <p>Total Qty: $${order?.totalQty}</p>
          <h2>Order Items:</h2>
          <ul>
            ${Object.keys(order?.books)?.map(
              (key) =>
                `<li style="width: 100%; display: flex; justify-content: space-between">
                <span>${order?.books[key]?.item?.title}</span>
                <span>--</span>
                <span>${order?.books[key]?.type}</span>
                <span>--</span>
                <span>${order?.status}</span>
              </li>`
            )}
          </ul>`
      )}
    `;

    setTimeout(() => {
      // Create the PDF document
      const options = {
        format: "Letter",
      };
      pdf.create(html, options).toStream((err, stream) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=order-maruf.pdf`
        );
        stream.pipe(res);
      });
    }, 200);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

module.exports = {
  getAllOrdersController,
  getAllOrdersByUserController,
  createNewOrderController,
  updateOrderStatusController,
  downloadOrderReportController,
};
