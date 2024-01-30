const {Router} = require("express");
const addressController = require("../controllers/addressControllers");
const router = Router();

router.post("/address/:id", addressController.createAddress);
router.get("/address", addressController.getAddress);

module.exports = router;