import mongoose from 'mongoose'
import User from '../models/User'
import {
  CREATED_AS,
  HTTP_STATUS_CODE,
  PAYMENT_TYPE
} from '../types/shared.interface'
import CustomerOrder from '../models/CustomerOrder'
import { Response } from 'express'
import {
  CUSTOMER_MESSAGE,
  ICustomerResponse
} from '../types/customer.interface'
import { IUserData, IUserDataDocument } from '../types/auth.interface'
import {
  IBuyerDetails,
  IOrderDetail,
  IOrderPlaced,
  IPackageDetails
} from '../types/seller.interface'

const findUserById = async (
  userId: string
): Promise<IUserDataDocument | null> => {
  const user = await User.findById(userId)
  return user
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
}

const isUserIdAndSellerIdExist = <T>(
  userId: string,
  sellerId: string,
  res: Response<T>
) => {
  if (!userId || !sellerId) {
    return res.status(HTTP_STATUS_CODE.OK).json({
      message: CUSTOMER_MESSAGE.INVALID_PAYLOAD,
      status: HTTP_STATUS_CODE.BAD_REQUEST
    } as T)
  }
}

export const customerService = {
  findUserById,
  validateSellerId,
  validateUserType,
  createCustomerOrder,
  isUserIdAndSellerIdExist
}
