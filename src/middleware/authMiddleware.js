const authMiddleware = async (req, res, next) => {
  const { email, name, createdAs } = req.body;
  if (!email || !name || !createdAs) {
    return res.status(201).json({ message: "Invalid Credentials", user: null });
  }
  next();
};

module.exports = authMiddleware;
