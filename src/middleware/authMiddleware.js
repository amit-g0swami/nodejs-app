const authMiddleware = (_req, res, next) => {
    const isAuthenticated = true;
    isAuthenticated ? next() : res.status(401).json({ message: "Unauthorized" });
};

module.exports = authMiddleware;
