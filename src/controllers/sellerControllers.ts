import mongoose from 'mongoose'
import Order from '../models/Order'
import User from '../models/User'
import { Request, Response } from 'express'
import {
  CREATED_AS,
  ERROR_MESSAGE,
  HTTP_STATUS_CODE
} from '../types/shared.interface'
import {
  IResBody,
  ISellerQueryRequest,
  ISellerResponse,
  SELLER_MESSAGE
} from '../types/seller.interface'

export const createOrder = async (
  req: Request,
  res: Response<ISellerResponse>
) => {
  try {
    const sellerId = req.params.id

    const {
      buyerDetails,
      orderPlaced,
      orderDetails,
      packageDetails,
      paymentDetails
    } = req.body

    const newOrder = new Order({
      sellerId,
      buyerDetails,
      orderPlaced,
      orderDetails,
      packageDetails,
      paymentDetails
    })

    await newOrder.save()
    res.status(HTTP_STATUS_CODE.CREATED).json({
      message: SELLER_MESSAGE.ORDER_CREATED,
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

export const searchSellerById = async (
  req: Request,
  res: Response<ISellerResponse>
) => {
  try {
    const sellerId = req.params.id

    if (!sellerId) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: SELLER_MESSAGE.INVALID_PAYLOAD,
        status: HTTP_STATUS_CODE.BAD_REQUEST,
        seller: []
      })
    }

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: SELLER_MESSAGE.INVALID_PAYLOAD,
        status: HTTP_STATUS_CODE.BAD_REQUEST,
        seller: []
      })
    }

    const sellers = await User.find({
      _id: sellerId,
      createdAs: CREATED_AS.SELLER
    })

    return res.status(HTTP_STATUS_CODE.OK).json({
      message: SELLER_MESSAGE.SELLERS_FETCHED,
      status: HTTP_STATUS_CODE.OK,
      seller: sellers
    })
  } catch (error) {
    res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }
}

export const getOrdersByDate = async (
  req: Request<{}, {}, IResBody, ISellerQueryRequest>,
  res: Response<ISellerResponse>
) => {
  try {
    const { filters } = req.query
    const { id } = req.body

    if (!filters) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: SELLER_MESSAGE.INVALID_PAYLOAD,
        status: HTTP_STATUS_CODE.BAD_REQUEST
      })
    }

    const dateFilter = filters.split(':')[1]
    const date = new Date(dateFilter)

    const startDate = new Date(date)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(date)
    endDate.setHours(23, 59, 59, 999)

    const query = {
      createdAt: {
        $gte: startDate,
        $lte: endDate
      },
      sellerId: id
    }

    const sellerOrders = await Order.find(query)
    // const customerOrders = await Order.find(query)
    const customerOrders = []

    const orders = [...sellerOrders, ...customerOrders]

    res.status(HTTP_STATUS_CODE.OK).json({
      message: SELLER_MESSAGE.ORDERS_FETCHED,
      status: HTTP_STATUS_CODE.OK,
      orders
    })
  } catch (error) {
    res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }
}
