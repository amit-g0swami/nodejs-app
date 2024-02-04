const mongoose = require("mongoose");
const User = require("../models/User");

const customerMiddleware = async (req, res, next) => {
  const sellerId = req.params.id;

  if (!sellerId) {
    return res.status(201).json({ message: "Seller ID is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(sellerId)) {
    return res.status(201).json({ message: "Invalid Seller ID format" });
  }

  try {
    const user = await User.findById(sellerId);

    if (!user) {
      return res.status(201).json({ message: "Seller not found" });
    }

    next();
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = customerMiddleware;
