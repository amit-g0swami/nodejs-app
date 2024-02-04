const { Router } = require("express");
const router = Router();
const customerController = require("../controllers/customerControllers");
const customerMiddleware = require("../middleware/customerMiddleware");

router.post(
  "/address/:id",
  customerMiddleware,
  customerController.createAddress
);
router.get("/address", customerController.getAddress);

module.exports = router;
