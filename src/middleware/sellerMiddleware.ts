import { ValidationError } from 'joi'
import { NextFunction, Request, Response } from 'express'
import {
  CREATED_AS,
  ERROR_MESSAGE,
  HTTP_STATUS_CODE
} from '../types/shared.interface'
import {
  ISellerQueryRequest,
  ISellerReqParams,
  ISellerResponse,
  SELLER_MESSAGE
} from '../types/seller.interface'
import { sellerIdSchema } from '../schemas/customer.schema'
import { sellerCreateOrderSchema } from '../schemas/seller.schema'
import { customerService } from '../services/customer.service'

export const createSellerOrderMiddleware = async (
  req: Request,
  res: Response<ISellerResponse>,
  next: NextFunction
) => {
  try {
    const sellerId = req.params.id

    await sellerCreateOrderSchema.validateAsync(req.body, { abortEarly: false })
    await sellerIdSchema.validateAsync(req.params, { abortEarly: false })

    if (!customerService.validateSellerId(sellerId)) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: SELLER_MESSAGE.INVALID_SELLER_ID,
        status: HTTP_STATUS_CODE.BAD_REQUEST
      })
    }

    const user = await customerService.findUserById(sellerId)
    if (!user || user.createdAs !== CREATED_AS.SELLER) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: SELLER_MESSAGE.SELLER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND
      })
    }

    next()
  } catch (error: Error | any) {
    const validationErrors = error?.details?.map(
      (detail: ValidationError) => detail.message
    )
    return res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.VALIDATION_ERROR,
      errors: validationErrors,
      status: HTTP_STATUS_CODE.BAD_REQUEST
    })
  }
}

export const sellerGetOrdersMiddleware = async (
  req: Request<ISellerReqParams, {}, {}, ISellerQueryRequest>,
  res: Response<ISellerResponse>,
  next: NextFunction
) => {
  try {
    await sellerIdSchema.validateAsync(req.params, { abortEarly: false })
    next()
  } catch (error: Error | any) {
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
