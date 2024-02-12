import mongoose from 'mongoose'
import User from '../models/User'
import Joi, { ValidationError } from 'joi'
import { Request, Response, NextFunction } from 'express'
import {
  CREATED_AS,
  ERROR_MESSAGE,
  HTTP_STATUS_CODE,
  PAYMENT_TYPE
} from '../types/shared.interface'
import {
  CUSTOMER_MESSAGE,
  ICustomerResponse
} from '../types/customer.interface'

const orderSchema = Joi.object({
  userId: Joi.string().required(),
  buyerDetails: Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string()
      .pattern(/^\d{10}$/)
      .required()
  }).required(),
  orderPlaced: Joi.object({
    completeAddress: Joi.string().required(),
    landMark: Joi.string(),
    pinCode: Joi.string()
      .pattern(/^\d{6}$/)
      .required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required()
  }).required(),
  orderDetails: Joi.array()
    .items(
      Joi.object({
        productName: Joi.string().required(),
        quantity: Joi.number().required(),
        unitPrice: Joi.number().required(),
        totalAmount: Joi.number().required()
      })
    )
    .required(),
  packageDetails: Joi.object({
    deadWeight: Joi.number().required(),
    packageDimension: Joi.object({
      length: Joi.number().required(),
      width: Joi.number().required(),
      height: Joi.number().required()
    }).required()
  }).required(),
  paymentDetails: Joi.object({
    paymentMode: Joi.string()
      .valid(PAYMENT_TYPE.COD, PAYMENT_TYPE.PREPAID)
      .required()
  }).required(),
  isSavedToShiprocket: Joi.boolean()
})

const sellerIdSchema = Joi.object({
  id: Joi.string().required()
})

export const customerMiddleware = async (
  req: Request,
  res: Response<ICustomerResponse>,
  next: NextFunction
) => {
  try {
    await orderSchema.validateAsync(req.body, { abortEarly: false })
    await sellerIdSchema.validateAsync(req.params, { abortEarly: false })

    const sellerId = req.params.id
    const { userId } = req.body

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.INVALID_SELLER_ID,
        status: HTTP_STATUS_CODE.BAD_REQUEST
      })
    }

    const seller = await User.findById(sellerId)
    const user = await User.findById(userId)

    if (!seller || seller.createdAs !== CREATED_AS.SELLER) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.SELLER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND
      })
    }

    if (!user) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.USER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND
      })
    }

    if (user.createdAs !== CREATED_AS.CUSTOMER) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.USER_NOT_FOUND,
        status: HTTP_STATUS_CODE.FORBIDDEN
      })
    }

    if (user.sellerId === (seller as unknown)) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.INVALID_SELLER_ID,
        status: HTTP_STATUS_CODE.CONFLICT
      })
    }

    next()
  } catch (error) {
    const validationErrors = error.details.map(
      (detail: ValidationError) => detail.message
    )
    return res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.VALIDATION_ERROR,
      errors: validationErrors,
      status: HTTP_STATUS_CODE.BAD_REQUEST
    })
  }
}
