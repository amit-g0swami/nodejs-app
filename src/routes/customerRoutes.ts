import { Router } from "express";
import { createAddress, getAddress } from "../controllers/customerControllers";
import { customerMiddleware } from "../middleware/customerMiddleware";

const router = Router();

router.post("/address/:id", customerMiddleware, createAddress);
router.get("/address", getAddress);

export default router;
