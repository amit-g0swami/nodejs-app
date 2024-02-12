import { Router } from 'express'
import {
  addSellerId,
  createCustomerOrder
} from '../controllers/customerControllers'
import { createCustomerMiddleware } from '../middleware/customerMiddleware'
import { CUSTOMER_ROUTE } from '../types/customer.interface'

const router = Router()

router.post(
  CUSTOMER_ROUTE.CREATE_ORDER,
  createCustomerMiddleware,
  createCustomerOrder
)
router.put(CUSTOMER_ROUTE.ADD_SELLER_ID, addSellerId)

export default router
