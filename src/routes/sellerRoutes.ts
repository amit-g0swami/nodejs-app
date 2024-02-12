import { Router } from 'express'
import {
  sellerGetOrdersMiddleware,
  sellerMiddleware
} from '../middleware/sellerMiddleware'
import {
  createSellerOrder,
  getOrdersByDate,
  searchSellerById
} from '../controllers/sellerControllers'
import { SELLER_ROUTE } from '../types/seller.interface'

const router = Router()

router.post(SELLER_ROUTE.CREATE_ORDER, sellerMiddleware, createSellerOrder)
router.get(SELLER_ROUTE.SEARCH_SELLER_BY_ID, searchSellerById)
router.get(SELLER_ROUTE.SELLER, sellerGetOrdersMiddleware, getOrdersByDate)

export default router
