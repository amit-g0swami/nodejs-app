const { Router } = require("express");
const loginController = require("../controllers/loginControllers");
const router = Router();

router.post("/login", loginController.login);

module.exports = router;
