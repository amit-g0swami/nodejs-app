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
import { customerService } from '../services/customer.service'

export const createCustomerOrder = async (
  req: Request,
  res: Response<ICustomerResponse>
) => {
  try {
    const sellerId = req.params.id

    const {
      userId,
      buyerDetails,
      orderPlaced,
      orderDetails,
      packageDetails,
      paymentDetails,
      isSavedToShiprocket
    } = req.body

    const createdOrder = await customerService.createCustomerOrder(
      userId,
      sellerId,
      buyerDetails,
      orderPlaced,
      orderDetails,
      packageDetails,
      paymentDetails,
      isSavedToShiprocket
    )

    res.status(HTTP_STATUS_CODE.CREATED).json(createdOrder)
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
      !customerService.validateSellerId(sellerId) ||
      !customerService.validateSellerId(userId)
    ) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.INVALID_PAYLOAD,
        status: HTTP_STATUS_CODE.BAD_REQUEST
      })
    }

    const seller = await customerService.findUserById(sellerId)
    if (!seller || seller.createdAs !== CREATED_AS.SELLER) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.SELLER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND
      })
    }

    const user = await customerService.findUserById(userId)

    if (user.sellerId) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.SELLER_ALREADY_ASSIGNED,
        status: HTTP_STATUS_CODE.BAD_REQUEST
      })
    }

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
