const User = require("../models/user_models");
const generateToken = require("../src/config/jwt");
const bcrypt = require("bcryptjs");

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
