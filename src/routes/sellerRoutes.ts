import { Router } from "express";
import { sellerMiddleware } from "../middleware/sellerMiddleware";
import {
  createOrder,
  searchSellerById,
} from "../controllers/sellerControllers";
import { SELLER_ROUTE } from "../types/seller.interface";

const router = Router();

router.post(SELLER_ROUTE.CREATE_ORDER, sellerMiddleware, createOrder);
router.get(SELLER_ROUTE.SEARCH_SELLER_BY_ID, searchSellerById);

export default router;
