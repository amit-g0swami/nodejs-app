import { Router } from 'express'
import {
  addSellerId,
  createAddress,
  getAddress
} from '../controllers/customerControllers'
import { customerMiddleware } from '../middleware/customerMiddleware'
import { CUSTOMER_ROUTE } from '../types/customer.interface'

const router = Router()

router.post(CUSTOMER_ROUTE.CREATE_ADDRESS, customerMiddleware, createAddress)
router.get(CUSTOMER_ROUTE.GET_ADDRESS, getAddress)
router.put(CUSTOMER_ROUTE.ADD_SELLER_ID, addSellerId)

export default router
