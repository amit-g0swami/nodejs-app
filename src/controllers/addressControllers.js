const Address = require("../models/Address");

module.exports.createAddress = async (req, res) => {
  try {
    const { streetAddress, city, state, zipCode, userId } = req.body;
    if (!streetAddress || !city || !state || !zipCode || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const sellerId = req.params.id;
    const existingAddress = await Address.findOne({ userId });
    if (existingAddress && existingAddress.sellerId === sellerId) {
      return res.status(400).json({ message: "Address already exists" });
    }
    const newAddress = new Address({
      userId,
      streetAddress,
      city,
      state,
      zipCode,
      sellerId,
    });
    await newAddress.save();
    res
      .status(201)
      .json({ message: "Address created successfully", address: newAddress });
  } catch (error) {
    console.error("Error creating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const address = await Address.find({ userId });
    res.status(200).json({ message: "Address fetched successfully", address });
  } catch (error) {
    console.error("Error getting address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
