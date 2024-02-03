const { Router } = require("express");
const loginController = require("../controllers/loginControllers");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.post("/login", authMiddleware, loginController.login);

module.exports = router;
