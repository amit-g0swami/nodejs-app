import { Router } from "express";
import { sellerMiddleware } from "../middleware/sellerMiddleware";
import { createOrder } from "../controllers/sellerControllers";
import { SELLER_ROUTE } from "../types/seller.interface";

const router = Router();

router.post(SELLER_ROUTE.CREATE_ORDER, sellerMiddleware, createOrder);

export default router;
