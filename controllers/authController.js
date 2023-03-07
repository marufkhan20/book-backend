const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../services/emailService");
const emailTemplate = require("../services/emailTemplate");

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

        await newUser.save();

        if (newUser?._id) {
          // send verification email
          const verifyLink = `${process.env.SITE_URL}/verify-account/${newUser._id}`;
          // const verifyLink = "https://youtube.com";

          sendMail({
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: "Verify Your Account.",
            html: emailTemplate(verifyLink),
          });
        }

        res.status(201).json(newUser);
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

    if (!user?.verified) {
      return res.status(400).json({
        error: {
          logEmail: "Please verify your account!!",
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

// verify account controller
const verifyAccountController = async (req, res) => {
  try {
    const { id } = req.params || {};
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { verified: true } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  verifyAccountController,
};
