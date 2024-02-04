import Joi, { ValidationError } from "joi";
import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";

enum CREATED_AS {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
}

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(30).required(),
  createdAs: Joi.string()
    .valid(CREATED_AS.CUSTOMER, CREATED_AS.SELLER)
    .required(),
});

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authSchema.validateAsync(req.body, { abortEarly: false });
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
