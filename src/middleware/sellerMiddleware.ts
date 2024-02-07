import mongoose from "mongoose";
import User from "../models/User";
import Joi, { ValidationError } from "joi";
import { NextFunction, Request, Response } from "express";
import {
  CREATED_AS,
  ERROR_MESSAGE,
  HTTP_STATUS_CODE,
  PAYMENT_TYPE,
} from "../types/shared.interface";
import { ISellerResponse, SELLER_MESSAGE } from "../types/seller.interface";

const orderSchema = Joi.object({
  buyerDetails: Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string()
      .pattern(/^\d{10}$/)
      .required(),
  }).required(),
  orderPlaced: Joi.object({
    completeAddress: Joi.string().required(),
    landMark: Joi.string().required(),
    pinCode: Joi.string()
      .pattern(/^\d{6}$/)
      .required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  orderDetails: Joi.array()
    .items(
      Joi.object({
        productName: Joi.string().required(),
        quantity: Joi.number().required(),
        unitPrice: Joi.number().required(),
        totalAmount: Joi.number().required(),
      })
    )
    .required(),
  packageDetails: Joi.object({
    deadWeight: Joi.number().required(),
    packageDimension: Joi.object({
      length: Joi.number().required(),
      width: Joi.number().required(),
      height: Joi.number().required(),
    }).required(),
  }).required(),
  paymentDetails: Joi.object({
    paymentMode: Joi.string()
      .valid(PAYMENT_TYPE.COD, PAYMENT_TYPE.PREPAID)
      .required(),
  }).required(),
});

const sellerIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const sellerMiddleware = async (
  req: Request,
  res: Response<ISellerResponse>,
  next: NextFunction
) => {
  try {
    const sellerId = req.params.id;

    await orderSchema.validateAsync(req.body, { abortEarly: false });
    await sellerIdSchema.validateAsync(req.params, { abortEarly: false });

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: SELLER_MESSAGE.INVALID_SELLER_ID,
        status: HTTP_STATUS_CODE.BAD_REQUEST,
      });
    }

    const user = await User.findById(sellerId);
    if (!user || user.createdAs !== CREATED_AS.SELLER) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        message: SELLER_MESSAGE.SELLER_NOT_FOUND,
        status: HTTP_STATUS_CODE.NOT_FOUND,
      });
    }

    next();
  } catch (error: Error | any) {
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
