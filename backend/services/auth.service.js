const AuthModel = require("../model/auth.model");
const User = require("../model/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUpService = async (req, res, next) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    const hash = await bcrypt.hash(req.body.password, 10);

    const auth = new AuthModel({
      fullName: req.body.fullName,
      password: hash,
      email: req.body.email,
    });
    const response = await auth.save();
    res.status(200).json({
      message: "signup successful",
    });

  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.loginService = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            email: user.email,
            password: user.password,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );

        return res.status(200).json({
          message: "Login successful.",
          token: token,
          id: user._id,
        });
      } else {
        throw new Error("Password does not match");
      }
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message ?? "Something went wrong",
    });
  }
};
