import { NextFunction, Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import mongoose from "mongoose";
import User from "../models/User";
import { CREATED_AS, PAYMENT_TYPE } from "../shared/shared.interface";

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

export const sellerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sellerId = req.params.id;

  if (!sellerId) {
    return res.status(201).json({ message: "Seller ID is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(sellerId)) {
    return res.status(201).json({ message: "Invalid Seller ID format" });
  }

  const user = await User.findById(sellerId);
  if (!user || user.createdAs !== CREATED_AS.SELLER) {
    return res.status(201).json({ message: "Seller not found" });
  }

  try {
    await orderSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error: Error | any) {
    const validationErrors = error.details.map(
      (detail: ValidationError) => detail.message
    );
    return res
      .status(400)
      .json({ message: "Validation error", errors: validationErrors });
  }
};
