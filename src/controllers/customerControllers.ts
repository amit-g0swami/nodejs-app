import mongoose from 'mongoose'
import User from '../models/User'
import { Request, Response } from 'express'
import {
  CREATED_AS,
  ERROR_MESSAGE,
  HTTP_STATUS_CODE
} from '../types/shared.interface'
import {
  CUSTOMER_MESSAGE,
  ICustomerResponse
} from '../types/customer.interface'
import CustomerOrder from '../models/CustomerOrder'

export const createCustomerOrder = async (
  req: Request,
  res: Response<ICustomerResponse>
) => {
  try {
    const sellerId = req.params.id
    const userId = req.body.userId

    const {
      buyerDetails,
      orderPlaced,
      orderDetails,
      packageDetails,
      paymentDetails
    } = req.body

    const newOrder = new CustomerOrder({
      userId,
      sellerId,
      buyerDetails,
      orderPlaced,
      orderDetails,
      packageDetails,
      paymentDetails
    })

    await newOrder.save()

    res.status(HTTP_STATUS_CODE.CREATED).json({
      message: CUSTOMER_MESSAGE.ADDRESS_CREATED,
      order: newOrder,
      status: HTTP_STATUS_CODE.CREATED
    })
  } catch (error) {
    res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }
}

export const addSellerId = async (
  req: Request,
  res: Response<ICustomerResponse>
) => {
  try {
    const { userId } = req.params
    const { sellerId } = req.body

    if (!userId || !sellerId) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.INVALID_PAYLOAD,
        status: HTTP_STATUS_CODE.BAD_REQUEST
      })
    }

    if (
      !mongoose.Types.ObjectId.isValid(sellerId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.INVALID_PAYLOAD,
        status: HTTP_STATUS_CODE.BAD_REQUEST
      })
    }

    const seller = await User.findById(sellerId)
    if (!seller || seller.createdAs !== CREATED_AS.SELLER) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.SELLER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND
      })
    }

    const user = await User.findById(userId)
    if (!user || user.createdAs !== CREATED_AS.CUSTOMER) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.USER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND
      })
    }

    user.sellerId = sellerId
    await user.save()

    return res.status(HTTP_STATUS_CODE.OK).json({
      message: CUSTOMER_MESSAGE.SELLER_ID_ADDED_SUCCESSFULLY,
      status: HTTP_STATUS_CODE.UPDATED,
      user: user
    })
  } catch (error) {
    res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }
}
