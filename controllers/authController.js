const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register controller
const registerController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // check user already existing
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: {
          regEmail: "Email is already exist, Please try to another email!",
        },
      });
    }

    // password hash
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }

        // Create New User
        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hash,
        });

        let user = await newUser.save();

        res.status(201).json(user);
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// login controller
const loginController = async (req, res) => {
  const { email, password } = req.body;

  // check user available
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      error: {
        logEmail: "User not found! Please try again!!",
      },
    });
  }

  // check password correct or incorrect
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      return res.status(500).json({
        error: "Server Error Occurred!",
      });
    }

    if (!result) {
      return res.status(400).json({
        error: {
          logPassword: "Email or Password Incorrect!",
        },
      });
    }

    // prepare the user object to generate token
    const userObject = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role || "user",
    };

    // generate token
    const token = jwt.sign(userObject, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    res.status(200).json({
      user: userObject,
      token,
    });
  });
};

module.exports = {
  registerController,
  loginController,
};
