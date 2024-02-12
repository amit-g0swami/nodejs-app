import { Router } from 'express'
import {
  createSellerOrderMiddleware,
  sellerGetOrdersMiddleware
} from '../middleware/sellerMiddleware'
import {
  createSellerOrder,
  getOrdersByDate,
  searchSellerById
} from '../controllers/sellerControllers'
import { SELLER_ROUTE } from '../types/seller.interface'

const router = Router()

router.post(
  SELLER_ROUTE.CREATE_ORDER,
  createSellerOrderMiddleware,
  createSellerOrder
)
router.get(SELLER_ROUTE.SEARCH_SELLER_BY_ID, searchSellerById)
router.get(
  SELLER_ROUTE.GET_SELLER_ORDERS,
  sellerGetOrdersMiddleware,
  getOrdersByDate
)

export default router
