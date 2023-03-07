const User = require("../models/User");

// get all users controller
const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find().sort({ updatedAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// get user controller
const getUserController = async (req, res) => {
  try {
    const { _id } = req.user || {};

    const user = await User.findById(_id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

module.exports = {
  getAllUsersController,
  getUserController,
};
