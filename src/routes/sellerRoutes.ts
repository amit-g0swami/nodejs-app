import { Router } from "express";
import { sellerMiddleware } from "../middleware/sellerMiddleware";
import { createOrder } from "../controllers/sellerControllers";

const router = Router();

router.post("/:id/order", sellerMiddleware, createOrder);

export default router;
