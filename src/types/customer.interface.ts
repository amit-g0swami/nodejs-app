import { ValidationError } from 'joi'
import { ERROR_MESSAGE, HTTP_STATUS_CODE } from './shared.interface'
import { ISellerOrderDocument } from './seller.interface'
import { IUserDataDocument } from './auth.interface'
import { Document } from 'mongoose'

export enum CUSTOMER_MESSAGE {
  ORDER_CREATED = 'Order created successfully',
  INVALID_SELLER_ID = 'Invalid Seller ID',
  SELLER_NOT_FOUND = 'Seller not found',
  USER_ID_REQUIRED = 'User ID is required',
  INVALID_PAYLOAD = 'Invalid payload',
  USER_NOT_FOUND = 'User not found',
  SELLER_ID_ADDED_SUCCESSFULLY = 'Seller ID added successfully',
  SELLER_NOT_ASSIGNED = 'Seller not assigned',
  SELLER_ALREADY_ASSIGNED = 'Seller already assigned'
}

export enum CUSTOMER_ROUTE {
  CREATE_ORDER = '/order/:id',
  ADD_SELLER_ID = '/:userId/sellerId'
}

export interface ICreateCustomerOrder extends Document, ISellerOrderDocument {
  userId: string
}

export interface ICustomerResponse {
  message: CUSTOMER_MESSAGE | ERROR_MESSAGE
  order?: ICreateCustomerOrder
  errors?: ValidationError
  status?: HTTP_STATUS_CODE
  user?: IUserDataDocument
}
