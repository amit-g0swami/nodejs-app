const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", authMiddleware, authController.login);

module.exports = router;
