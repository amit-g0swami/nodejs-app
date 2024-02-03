const { Router } = require("express");
const addressController = require("../controllers/addressControllers");
const addressMiddleware = require("../middleware/addressMiddleware");
const router = Router();

router.post("/address/:id", addressMiddleware, addressController.createAddress);
router.get("/address", addressController.getAddress);

module.exports = router;
