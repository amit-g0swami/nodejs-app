const User = require("../models/User");

const addressMiddleware = async (req, res, next) => {
  const sellerId = req.params.id;
  if (!sellerId) {
    return res.status(201).json({ message: "Seller ID is required" });
  }
  const users = await User.find({ _id: sellerId });
  if (users.length === 0) {
    return res.status(201).json({ message: "Not Authorized" });
  }
  next();
};

module.exports = addressMiddleware;
