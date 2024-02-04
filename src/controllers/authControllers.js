const User = require("../models/User");

module.exports.login = async (req, res) => {
  try {
    const { email, name, createdAs } = req.body;

    const users = await User.find({ email });

    if (users.length === 0) {
      const newUser = new User({
        email,
        name,
        createdAs,
      });
      await newUser.save();
      return res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    }

    if (users.length === 1) {
      if (users.filter((user) => user.createdAs !== createdAs)) {
        const newUser = new User({
          email,
          name,
          createdAs,
        });
        await newUser.save();
        return res
          .status(201)
          .json({ message: "User created successfully", user: newUser });
      } else {
        return res
          .status(201)
          .json({ message: "User already exists", user: users[0] });
      }
    }

    if (users.length >= 2) {
      const filteredUser = users.filter((user) => user.createdAs === createdAs);
      return res
        .status(201)
        .json({ message: "User already exists", user: filteredUser[0] });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
