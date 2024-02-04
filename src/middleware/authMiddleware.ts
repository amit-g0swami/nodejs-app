import Joi, { ValidationError } from "joi";
import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import {
  CREATED_AS,
  ERROR_MESSAGE,
  HTTP_STATUS_CODE,
} from "../types/shared.interface";
import { IAuthResponse, IUserDocument } from "../types/auth.interface";

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(30).required(),
  createdAs: Joi.string()
    .valid(CREATED_AS.CUSTOMER, CREATED_AS.SELLER)
    .required(),
});

export const authMiddleware = async (
  req: Request,
  res: Response<IAuthResponse<IUserDocument>>,
  next: NextFunction
) => {
  try {
    await authSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error: Error | any) {
    const validationErrors = error.details.map(
      (detail: ValidationError) => detail.message
    );
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      message: ERROR_MESSAGE.VALIDATION_ERROR,
      errors: validationErrors,
    });
  }
};
