const User = require("../models/User");

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      console.log(email, password)
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      if (password !== user.password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      res.status(200).json({ user });
      console.log("Login successful");
    } catch (error) {
      console.error("Login failed: ", error);
      res.status(500).json({ error: "Failed to Login" });
    }
};