import Joi from 'joi'
import { PAYMENT_TYPE } from '../types/shared.interface'

export const sellerCreateOrderSchema = Joi.object({
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
  orderDetails: Joi.object({
    productName: Joi.string().required(),
    quantity: Joi.number().required(),
    unitPrice: Joi.number().required(),
    totalAmount: Joi.number().required()
  }).required(),
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
