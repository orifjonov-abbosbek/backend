const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAll(); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

