const User = require("../models/User");


module.exports.login = async (req, res) => {
  try {
    const { email, name, createdAs } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.createdAs === createdAs) {
      return res.status(201).json({ message: 'User already exists', user: existingUser });
    }
    const newUser = new User({
      email,
      name,
      createdAs,
    });
    await newUser.save();
    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
  

