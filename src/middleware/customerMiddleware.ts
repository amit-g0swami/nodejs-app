import mongoose from "mongoose";
import User from "../models/User";
import Address from "../models/Address";
import Joi, { ValidationError } from "joi";
import { Request, Response, NextFunction } from "express";
import { CREATED_AS } from "../shared/shared.interface";

const customerSchema = Joi.object({
  streetAddress: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string()
    .pattern(/^\d{6}$/)
    .required(),
  userId: Joi.string().required(),
});

export const customerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sellerId = req.params.id;
  const { userId } = req.body;

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

  const existingAddress = await Address.findOne({ userId });

  if (existingAddress) {
    return res.status(400).json({ message: "Address already exists" });
  }

  try {
    await customerSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const validationErrors = error.details.map(
      (detail: ValidationError) => detail.message
    );
    return res
      .status(400)
      .json({ message: "Validation error", errors: validationErrors });
  }
};
