import SellerOrder from '../models/SellerOrder'
import { Request, Response } from 'express'
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from '../types/shared.interface'
import {
  ISellerResBody,
  ISellerQueryRequest,
  ISellerResponse,
  SELLER_MESSAGE
} from '../types/seller.interface'
import { customerService } from '../services/customer.service'
import {
  findSellersById,
  getDateRange,
  getOrdersByQuery,
  parseDateFilter
} from '../services/seller.service'

export const createSellerOrder = async (
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

    const createdSellerOrder = new SellerOrder({
      sellerId,
      buyerDetails,
      orderPlaced,
      orderDetails,
      packageDetails,
      paymentDetails
    })

    await createdSellerOrder.save()
    res.status(HTTP_STATUS_CODE.CREATED).json({
      message: SELLER_MESSAGE.ORDER_CREATED,
      order: createdSellerOrder,
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

    if (!customerService.validateSellerId(sellerId)) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: SELLER_MESSAGE.INVALID_PAYLOAD,
        status: HTTP_STATUS_CODE.BAD_REQUEST,
        seller: []
      })
    }

    const searchedSellers = await findSellersById(sellerId)

    return res.status(HTTP_STATUS_CODE.OK).json({
      message: SELLER_MESSAGE.SELLERS_FETCHED,
      status: HTTP_STATUS_CODE.OK,
      seller: searchedSellers
    })
  } catch (error) {
    res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
    })
  }
}

export const getOrdersByDate = async (
  req: Request<
    {
      id: string
    },
    {},
    ISellerResBody,
    ISellerQueryRequest
  >,
  res: Response<ISellerResponse>
) => {
  try {
    const id = req.params.id
    const filters = req.query.filters

    if (!filters || !id) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: SELLER_MESSAGE.INVALID_PAYLOAD,
        status: HTTP_STATUS_CODE.BAD_REQUEST
      })
    }

    const date = parseDateFilter(filters)
    const { startDate, endDate } = getDateRange(date)

    const query = {
      createdAt: {
        $gte: startDate,
        $lte: endDate
      },
      sellerId: id
    }

    const orders = await getOrdersByQuery(query)

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
