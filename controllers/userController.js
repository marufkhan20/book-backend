const User = require("../models/User");

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
  getUserController,
};
