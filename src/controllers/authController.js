const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secretKey, expiresIn } = require("../db_jwt/jwt");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create(name, email, hashedPassword);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};
