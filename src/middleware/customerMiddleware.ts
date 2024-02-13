import { ValidationError } from 'joi'
import { Request, Response, NextFunction } from 'express'
import {
  CREATED_AS,
  ERROR_MESSAGE,
  HTTP_STATUS_CODE
} from '../types/shared.interface'
import {
  CUSTOMER_MESSAGE,
  ICustomerResponse
} from '../types/customer.interface'
import {
  customerCreateOrderSchema,
  sellerIdSchema
} from '../schemas/customer.schema'
import { customerService } from '../services/customer.service'

export const createCustomerMiddleware = async (
  req: Request,
  res: Response<ICustomerResponse>,
  next: NextFunction
) => {
  try {
    await customerCreateOrderSchema.validateAsync(req.body, {
      abortEarly: false
    })
    await sellerIdSchema.validateAsync(req.params, { abortEarly: false })

    const sellerId = req.params.id
    const { userId } = req.body

    if (!customerService.validateSellerId(sellerId)) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.INVALID_SELLER_ID,
        status: HTTP_STATUS_CODE.BAD_REQUEST
      })
    }

    const seller = await customerService.findUserById(sellerId)
    const user = await customerService.findUserById(userId)

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

    if (!customerService.validateUserType(user)) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.USER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND
      })
    }

    if (!user.sellerId || user.sellerId.toString() !== seller._id.toString()) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.SELLER_NOT_ASSIGNED,
        status: HTTP_STATUS_CODE.NOT_FOUND
      })
    }

    next()
  } catch (error) {
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
