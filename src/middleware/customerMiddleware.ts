import mongoose from "mongoose";
import User from "../models/User";
import Address from "../models/Address";
import Joi, { ValidationError } from "joi";
import { Request, Response, NextFunction } from "express";
import {
  CREATED_AS,
  ERROR_MESSAGE,
  HTTP_STATUS_CODE,
} from "../types/shared.interface";
import {
  CUSTOMER_MESSAGE,
  ICustomerResponse,
} from "../types/customer.interface";

const customerSchema = Joi.object({
  streetAddress: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string()
    .pattern(/^\d{6}$/)
    .required(),
  userId: Joi.string().required(),
});

const sellerIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const customerMiddleware = async (
  req: Request,
  res: Response<ICustomerResponse>,
  next: NextFunction
) => {
  try {
    await customerSchema.validateAsync(req.body, { abortEarly: false });
    await sellerIdSchema.validateAsync(req.params, { abortEarly: false });

    const sellerId = req.params.id;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.INVALID_SELLER_ID,
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    const seller = await User.findById(sellerId);
    const user = await User.findById(userId);

    if (!seller || seller.createdAs !== CREATED_AS.SELLER) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.SELLER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND,
      });
    }

    if (!user) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.USER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND,
      });
    }

    if (user.createdAs !== CREATED_AS.CUSTOMER) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.USER_NOT_FOUND,
        status: HTTP_STATUS_CODE.FORBIDDEN,
      });
    }

    if (user.sellerId === (seller as unknown)) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.INVALID_SELLER_ID,
        status: HTTP_STATUS_CODE.CONFLICT,
      });
    }

    const existingAddress = await Address.findOne({ userId });

    if (existingAddress) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: CUSTOMER_MESSAGE.ADDRESS_ALREADY_SUBMITTED,
        status: HTTP_STATUS_CODE.NOT_FOUND,
      });
    }

    next();
  } catch (error) {
    const validationErrors = error.details.map(
      (detail: ValidationError) => detail.message
    );
    return res.status(HTTP_STATUS_CODE.OK).json({
      message: ERROR_MESSAGE.VALIDATION_ERROR,
      errors: validationErrors,
      status: HTTP_STATUS_CODE.BAD_REQUEST,
    });
  }
};
