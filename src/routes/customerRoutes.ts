import { Router } from 'express'
import {
  addSellerId,
  createCustomerOrder
} from '../controllers/customerControllers'
import { customerMiddleware } from '../middleware/customerMiddleware'
import { CUSTOMER_ROUTE } from '../types/customer.interface'

const router = Router()

router.post(
  CUSTOMER_ROUTE.CREATE_ORDER,
  customerMiddleware,
  createCustomerOrder
)
router.put(CUSTOMER_ROUTE.ADD_SELLER_ID, addSellerId)

export default router
