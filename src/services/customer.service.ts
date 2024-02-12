import mongoose from 'mongoose'
import User from '../models/User'
import {
  CREATED_AS,
  ERROR_MESSAGE,
  HTTP_STATUS_CODE,
  PAYMENT_TYPE
} from '../types/shared.interface'
import CustomerOrder from '../models/CustomerOrder'
import {
  CUSTOMER_MESSAGE,
  ICustomerResponse
} from '../types/customer.interface'
import { IUserData } from '../types/auth.interface'
import {
  IBuyerDetails,
  IOrderDetail,
  IOrderPlaced,
  IPackageDetails
} from '../types/seller.interface'

const findUserById = async (userId: string) => {
  return await User.findById(userId)
}

const validateSellerId = (sellerId: string) => {
  return mongoose.Types.ObjectId.isValid(sellerId)
}

const validateUserType = (user: IUserData) => {
  return user.createdAs === CREATED_AS.CUSTOMER
}

const createCustomerOrder = async (
  userId: string,
  sellerId: string,
  buyerDetails: IBuyerDetails,
  orderPlaced: IOrderPlaced,
  orderDetails: IOrderDetail,
  packageDetails: IPackageDetails,
  paymentDetails: { paymentMode: PAYMENT_TYPE },
  isSavedToShiprocket: boolean
): Promise<ICustomerResponse> => {
  try {
    const createdOrder = new CustomerOrder({
      userId,
      sellerId,
      buyerDetails,
      orderPlaced,
      orderDetails,
      packageDetails,
      paymentDetails,
      isSavedToShiprocket
    })

    await createdOrder.save()

    return {
      message: CUSTOMER_MESSAGE.ORDER_CREATED,
      order: createdOrder,
      status: HTTP_STATUS_CODE.CREATED
    }
  } catch (error) {
    throw new Error(ERROR_MESSAGE.INTERNAL_SERVER_ERROR)
  }
}

export const customerService = {
  findUserById,
  validateSellerId,
  validateUserType,
  createCustomerOrder
}
